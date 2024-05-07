import { Component, OnInit, Input, OnDestroy, inject } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as _ from 'lodash';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationService } from '../../../services/authentication.service';
import { RolService } from '../../../services/roles.service';
import { ProgramService } from '../../../services/program.service';
import { DriversService } from '../../../services/drivers.service';
import { VehiclesService } from '../../../services/vehicles.service';
import { RoutesService } from '../../../services/routes.service';

@Component({
  selector: 'app-shared-vehicle-assignments',
  templateUrl: './vehicle-assignments.component.html',
  styleUrls: ['./vehicle-assignments.component.css']
})
export class SharedVehicleAssignmentsComponent implements OnInit, OnDestroy {
   @Input() vendorId!: string;
  @Input() customerId!: string;
  @Input() customerName!: string;
  @Input() assignmentId!: string;
  @Input() routeId!: string;
  @Input() routeName!: string;
  rolService = inject(RolService);
  authService = inject(AuthenticationService);
  stopSubscription$: Subject<boolean> = new Subject();
  loading: boolean = true;
  isModalVisible: boolean = false;
  isSelectDayVisible: boolean = false;
  selectedAssignment: any;
  programSelectedDate: Date = new Date();
  vehicleAssignmentsList: any[] = [];
  vehicleAssignmentSubscription!: Subscription;  
  vehiclesList: any[] = [];
  vehiclesSubscription!: Subscription;
  driversList: any[] = [];
  driversSubscription!: Subscription;
  assignmentForm!: UntypedFormGroup;
  infoLoad: any = [];
  userlevelAccess!:string;
 user: any;
  constructor(  
    private driversService : DriversService,
    private programService: ProgramService,
    private vehiclesService: VehiclesService,
    private routesService: RoutesService,
  private messageService: NzMessageService,
    private fb: UntypedFormBuilder
    ) { 
      this.authService.user.subscribe((user) => {
        this.user = user;
        if (this.user !== null && this.user !== undefined && this.user.rolId !== undefined) {
            this.rolService.getRol(this.user.rolId).valueChanges().subscribe(item => {
                this.infoLoad = item;
                this.userlevelAccess = this.infoLoad.optionAccessLavel;                 
            });
        }
    });

    }

  ngOnInit() {
    
    this.getSubscriptions();
    this.createForm();
  }

  ngOnDestroy() {
    this.stopSubscription$.next(false);
    this.stopSubscription$.complete();
  }

  createForm() {
    this.assignmentForm = this.fb.group({
      active: [true, [ Validators.required ]],
      customerId: [this.customerId, [Validators.required ]],
      vendorId: [this.vendorId, [Validators.required ]],
      routeId: [ this.routeId, [Validators.required ]],
      assignmentId: [this.assignmentId, [Validators.required ]],
      vehicleId: ['', [Validators.required ]],
      vehicleName: ['', [Validators.required ]],
      vehicleCapacity: [0],
      driverId: ['', [Validators.required ]],
      driverName: ['', [Validators.required ]],

    })
  }
  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
}
  getSubscriptions() {
    this.vehicleAssignmentSubscription = this.routesService.getRouteVehicleAssignments(this.customerId, this.routeId, this.assignmentId, this.vendorId).pipe(
      takeUntil(this.stopSubscription$),
      map((actions:any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data}
      }))
    ).subscribe( assignments => {    
      this.vehicleAssignmentsList = assignments;
      this.loading = false;
    });

    this.vehiclesSubscription = this.vehiclesService.getVendorVehicles(this.vendorId).pipe(
      takeUntil(this.stopSubscription$),
      map((actions:any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data}
      }))
    ).subscribe( vehicles => {
      this.vehiclesList = vehicles;
     // console.log(vehicles);
      this.loading = false;
    });

    this.driversSubscription = this.driversService.getDrivers(this.vendorId).pipe(
      takeUntil(this.stopSubscription$),
      map((actions:any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data}
      }))
    ).subscribe( drivers => {
      this.driversList = drivers;
     // console.log(drivers);
      this.loading = false;
    });

  }

  showModal() {
    this.isModalVisible = true;
  }

  handleCancel() {
    this.isModalVisible = false;
    this.isSelectDayVisible = false;
  }

  handleOk() {
   // console.log(this.assignmentForm.value);
    if (this.userlevelAccess != "3") {
      if(this.assignmentForm.valid) {
        this.routesService.setRouteVehicleAssignments(this.customerId, this.routeId, this.assignmentForm.value);
        this.isModalVisible = false;
      } else {
        console.log('form is invalid');
      }
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }  
    
  }

  toggleActive(data: any) {
    this.loading = true;
    this.routesService.toggleRouteVehicleAssignment(this.customerId, this.routeId, data.id, data).then( () => {
      this.loading = false;
    })
    .catch( err => console.log(err));
  }

  selectProgramDay(data: any) {
    this.selectedAssignment = data;
    this.isSelectDayVisible = true;
    this.selectedAssignment.date = new Date();
  }

  onSelectedDayChange(date: any) {
    this.selectedAssignment.date = date;
  }

  makeProgram() {
    let data = this.selectedAssignment;
    data.vendorId = this.vendorId;
    data.customerId = this.customerId;
    data.assignmentId = this.assignmentId;
    data.routeId = this.routeId;
    data.customerName = this.customerName;
    data.routeName = this.routeName;
    console.log('full data is: ', data);
    
    this.programService.setProgram(data);
    this.selectedAssignment = null;
    this.isSelectDayVisible = false;
  }

  deleteAssignment(data: any) {
    this.loading = true;
    if (this.userlevelAccess == "1") {
      this.routesService.deleteRouteVehicleAssignments(this.customerId, this.routeId, data.id).then( () => {
        this.loading = false;
      })
      .catch( err => console.log(err));
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para borrar datos, favor de contactar al administrador.");
    }
    
   
  }

  onDriverSelected(event: any, field: any) {
    if(event) {
      const recordArray = _.filter(this.driversList, s => {
        return s.id == event;
      });
      const record = recordArray[0];
   //   console.log(record);
      this.assignmentForm.controls[field].setValue(record.displayName);
    }
  }

  onVehicleSelected(event: any, field: any) {
    if(event) {
      const recordArray = _.filter(this.vehiclesList, s => {
        return s.id == event;
      });
      const record = recordArray[0];
     // console.log(record);
      this.assignmentForm.controls[field].setValue(record.name);
      this.assignmentForm.controls['vehicleCapacity'].setValue(record.seats);
    }
  }

}
