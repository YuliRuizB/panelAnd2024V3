import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { IVendor } from '../../shared/interfaces/vendor.type';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { DriversService } from '../../shared/services/drivers.service';
import { RolService } from '../../shared/services/roles.service';
import { VendorService } from '../../shared/services/vendor.service';
import { AccountsService } from '../../shared/services/accounts.service';
import { RoutesService } from '../../shared/services/routes.service';
import { CustomersService } from '../../customers/services/customers.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ProgramService } from '../../shared/services/program.service';
import { startOfToday, startOfDay } from 'date-fns';

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent implements OnInit {
  driverService = inject(DriversService);
  vendorsService= inject(VendorService);
  accountsService = inject(AccountsService);
  customersService = inject(CustomersService);
  routesService = inject(RoutesService);
  programService = inject(ProgramService);
  evidenceInfo: any;
  evidenceInfoDriver: any;
  evidenceInfoByProgram: any;
  evidenceInfoByRoute: any;
  loadingevidenceInfo =false;
  loadingevidenceInfoByProgram =false;
  loadingevidenceInfoDriver = false;
  stopSubscription$: Subject<any> = new Subject();
  dateFilterForm: UntypedFormGroup;
  dateFilterFormProgram: UntypedFormGroup;
  dateFilterFormProgramRoute: UntypedFormGroup;
  dateFilterFormDriver: UntypedFormGroup;
  userlevelAccess: string | undefined;
  infoLoad: any = [];
  driversList:any;
  customerList: any = [];
  programList:any = [];
  customerListRoute:any = [];
  RouteList:any = [];
  user: any;
  vendorsList: any = [];
  rolService = inject(RolService);
  authService = inject(AuthenticationService);
  infoSegment : any  = [];
  cDocument: AngularFirestoreDocument<any> | undefined;
  cCollection: AngularFirestoreCollection<any> | undefined;
  customerSubscription: Subscription | undefined;
  date: any = startOfToday();
  dateRoute: any = startOfToday();

  constructor(
    private afs: AngularFirestore,
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

      this.dateFilterFormProgram = this.fb.group({
        selectedDate: [null], 
        customerId: [],
        programId: [],
        name: []
      });
      
      this.dateFilterFormProgramRoute = this.fb.group({
        selectedDate: [null], 
        customerId: [],
        routeId: [],
        name: []
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

      const recordArray = _.filter(this.driversList, s => {
        return s.id == event;
      });
      const record = recordArray[0];
//    console.log(formattedDate + " == " + record.id );
       this.driverService.getEvidenceDriversperDriver(formattedDate!.toString(),record.id).pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id: id, ...data }
        }))
      ).subscribe(evidence2 => {     
          this.evidenceInfoDriver = evidence2;      
        //console.log( this.evidenceInfoDriver);
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

  onDateChangeProgram(event: any ){

  this.date = startOfDay(new Date(event));

    //fill customer
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      this.cDocument = this.afs.collection('customers').doc(this.user.customerId);
      this.customerSubscription = this.cDocument.snapshotChanges().pipe(
        map(action => {
          const id = action.payload.id;
          const data = action.payload.data() as any;
          return { id, ...data };
        })
      ).subscribe(customers => {
        this.customerList = [customers];
      });
    } else {      
      this.cCollection = this.afs.collection<any>('customers', ref => ref.where('active','==',true));
      this.customerSubscription  = this.cCollection.snapshotChanges().pipe(
        map((actions:any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe(customers => {        
        this.customerList = customers; 
      });
    }   
  }

  onDateChangeProgramRoute(event:any){

  this.dateRoute = startOfDay(new Date(event));

  //fill customer
  if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
    this.cDocument = this.afs.collection('customers').doc(this.user.customerId);
    this.customerSubscription = this.cDocument.snapshotChanges().pipe(
      map(action => {
        const id = action.payload.id;
        const data = action.payload.data() as any;
        return { id, ...data };
      })
    ).subscribe(customers => {
      this.customerListRoute = [customers];
    });
  } else {      
    this.cCollection = this.afs.collection<any>('customers', ref => ref.where('active','==',true));
    this.customerSubscription  = this.cCollection.snapshotChanges().pipe(
      map((actions:any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      }))
    ).subscribe(customers => {        
      this.customerListRoute = customers; 
    });
  }   
  }

  onCustomerSelected(event: any){
   
    const customerIdValue = this.dateFilterFormProgram.get('customerId')!.value;

    if (this.date !== undefined && customerIdValue !== undefined ) {
      if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
        this.programService.getProgramsByDaybyCustomer(  this.date, this.user.customerId).pipe(
          take(1),
          map((actions:any) => actions.map((a: any) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { id, ...data }
          })),
          tap((data:any) => {        
            this.programList = data;           
          })
        ).subscribe();
      } else {
        this.programService.getProgramsByDay(this.date).pipe(
          take(1),
          map((actions: any) => actions.map((a: any) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { id, ...data };
          })),
          map((programs: any[]) => {
            // Create a Set to store unique names
            const uniqueNames = new Set();
            // Filter the programs to include only unique names
            return programs.filter(program => {
              if (uniqueNames.has(program.name)) {
                return false; // Skip this program as its name is already in the set
              }
              uniqueNames.add(program.name); // Add the name to the set and include this program
              return true;
            });
          }),
          tap((data: any) => {
            this.programList = data;          
          })
        ).subscribe();
      }
     }
  }

  onCustomerSelectedRoute (event:any){
    const customerIdValue = this.dateFilterFormProgramRoute.get('customerId')!.value;
   
    if (this.dateRoute !== undefined && customerIdValue !== undefined ) {    
    
        this.programService.getRoutesbyCustomer(customerIdValue).pipe(
          take(1),
          map((actions:any) => actions.map((a: any) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { id, ...data }
          })),
          tap((data:any) => {        
            this.RouteList = data;     
           // console.log(this.RouteList);         
          })
        ).subscribe();
     }
  }
  onProgramSelected() {  
    this.loadingevidenceInfoByProgram = true;
    const programIdValue = this.dateFilterFormProgram.get('programId')!.value;
    console.log('programIdValue' + programIdValue);
    if ( programIdValue !== undefined ) {
      this.driverService.getEvidenceByProgram(programIdValue).pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id: id, ...data }
        }))
      ).subscribe(evidence2 => {     
          this.evidenceInfoByProgram = evidence2;      
        console.log( this.evidenceInfoByProgram);
        });   
    }
  } 

  onRouteSelected(){
    const routeIdValue = this.dateFilterFormProgramRoute.get('routeId')!.value;
    //console.log('routeIdValue' + routeIdValue);
    if ( routeIdValue !== undefined ) {
      this.driverService.getEvidenceByRoute(routeIdValue).pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id: id, ...data }
        }))
      ).subscribe(evidence2 => {     
          this.evidenceInfoByRoute = evidence2;      
        console.log( this.evidenceInfoByRoute);
        });   
    }
  }


//
}
