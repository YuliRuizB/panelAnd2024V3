import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { IVendor } from '../../shared/interfaces/vendor.type';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { DriversService } from '../../shared/services/drivers.service';
import { RolService } from '../../shared/services/roles.service';
import { VendorService } from '../../shared/services/vendor.service';
import { AccountsService } from '../../shared/services/accounts.service';

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent implements OnInit {
  driverService = inject(DriversService);
  vendorsService= inject(VendorService);
  accountsService = inject(AccountsService);
  evidenceInfo: any;
  evidenceInfoDriver: any;
  loadingevidenceInfo =false;
  loadingevidenceInfoDriver = false;
  stopSubscription$: Subject<any> = new Subject();
  dateFilterForm: UntypedFormGroup;
  dateFilterFormDriver: UntypedFormGroup;
  userlevelAccess: string | undefined;
  infoLoad: any = [];
  driversList:any;
  user: any;
  vendorsList: any = [];
  rolService = inject(RolService);
  authService = inject(AuthenticationService);
  infoSegment : any  = [];
  constructor(
    private datePipe: DatePipe,
    private fb: UntypedFormBuilder) {

      this.authService.user.subscribe((user: any) => {
        this.user = user;  
        if (this.user !== null && this.user !== undefined && this.user.rolId !== undefined) {
          this.rolService.getRol(this.user.rolId).valueChanges().subscribe((item: any) => {
            this.infoLoad = item;
            this.userlevelAccess = this.infoLoad.optionAccessLavel;
          });
          this.accountsService.getSegmentLevel(this.user.idSegment).pipe(
            takeUntil(this.stopSubscription$),
            map((a:any) => {
              const id = a.payload.id;
              const data = a.payload.data() as any;
              return { id, ...data }
            }),
            tap(record => {             
              this.infoSegment = record;            
              return record;
            })
          ).subscribe();
        }
      });

      this.dateFilterForm = this.fb.group({
        selectedDate: [null], // 'selectedDate' is the name of the form control
      });

      this.dateFilterFormDriver = this.fb.group({
        selectedDate: [null], // 'selectedDate' is the name of the form control
        driverId:[],
        driver:[],
        vendorName:[],
        vendorId: [],
      });

      this.vendorsService.getVendors().pipe(
        takeUntil(this.stopSubscription$),
        map((actions:any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as IVendor;      
         const vendorWithId = { ...data, id }; // Combinar data y id en un nuevo objeto
        return vendorWithId;
        })))
        .subscribe((vendors: IVendor[]) => {
          this.vendorsList = vendors;
        });
  }
  onDateChangeDriver() {
  
    this.evidenceInfoDriver =[];
    this.driversList = [];
  }
  ngOnDestroy() {
    this.stopSubscription$.next(undefined);
    this.stopSubscription$.complete();
  }

  onVendorSelected(event: any, field: any) {
    if (event) {
      this.evidenceInfoDriver =[];
      this.driversList = [];
      const recordArray = _.filter(this.vendorsList, s => {
        return s.id == event;
      });
      const record = recordArray[0];      
     this.fillDataDriver(record.id); 
    }
  }

  fillDataDriver(vendorId: string) {
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      this.driverService.getDriversbyCustomer(vendorId, this.user.customerId).pipe(
        map((actions: any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id: id, ...data }
        }))
      ).subscribe((drivers: any) => {
        console.log(drivers);
        this.driversList = drivers;
      });
    } else {
      this.driverService.getDrivers(vendorId).pipe(
        map((actions: any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id: id, ...data }
        }))
      ).subscribe((drivers: any) => {
        console.log(drivers);
        this.driversList = drivers;
      });
    }
  }

  ngOnInit() {
    
  }

  onDriverSelected(event: any, field: any) {
   
    this.evidenceInfoDriver =[];
    if (event) {
      
      let selectedDateString = "";
      if (this.dateFilterFormDriver) {
       
        selectedDateString = this.dateFilterFormDriver.get('selectedDate')!.value;
        // Haz lo que necesites con selectedDateString
      }
     

     const formattedDate = this.datePipe.transform(selectedDateString, 'dd-MM-yyyy');

     // console.log(formattedDate);
   
      const recordArray = _.filter(this.driversList, s => {
        return s.id == event;
      });
      const record = recordArray[0];
     // console.log("DriveSelected");
   
    console.log(formattedDate + " == " + record.id );
       this.driverService.getEvidenceDriversperDriver(formattedDate!.toString(),record.id).pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id: id, ...data }
        }))
      ).subscribe(evidence2 => {
     
          this.evidenceInfoDriver = evidence2;      
        console.log( this.evidenceInfoDriver);
          this.loadingevidenceInfoDriver = false;
        }, err => {
          this.loadingevidenceInfoDriver = false;
        });   
    }
  }
   
 
  onDateChange() {
    this.loadingevidenceInfo = true;
    const selectedDateValue = this.dateFilterForm.get('selectedDate')!.value;
    if (selectedDateValue !== undefined) {
      const selectedDate = new Date(selectedDateValue);
      if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
        this.driverService.getEvidenceDriversbyCustomer(selectedDate, this.user.customerId).pipe(
          map((actions: any) => actions.map((a: any) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { id: id, ...data }
          }))
        ).subscribe(
          evidenceI => {
            this.evidenceInfo = evidenceI;
            this.loadingevidenceInfo = false;
          },
          err => {
            console.error('Error fetching evidence:', err);
            this.loadingevidenceInfo = false;
          }
        );
      } else {
        this.driverService.getEvidenceDrivers(selectedDate).pipe(
          map((actions: any) => actions.map((a: any) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { id: id, ...data }
          }))
        ).subscribe(
          evidenceI => {
            this.evidenceInfo = evidenceI;
            this.loadingevidenceInfo = false;
          },
          err => {
            console.error('Error fetching evidence:', err);
            this.loadingevidenceInfo = false;
          }
        );
      }
    }

  }
}
