import { Component, OnInit, Input, OnDestroy, inject } from '@angular/core';
import { Subject } from 'rxjs';

import { takeUntil, map } from 'rxjs/operators';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { IBaseProgram } from '../../../interfaces/program.type';
import { IStopPoint } from '../../../interfaces/route.type';
import * as _ from 'lodash';
import { AssignmentType } from '../../../interfaces/assignment.type';
import { IVendor } from '../../../interfaces/vendor.type';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';
import { addMinutes, set } from 'date-fns';
import { VendorService } from '../../../services/vendor.service';
import { RolService } from '../../../services/roles.service';
import { RoutesService } from '../../../services/routes.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-shared-customer-vendor-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class SharedCustomerVendorAssignmentsComponent implements OnInit {

  @Input() accountId!: string;
  rolService = inject(RolService);
  authService = inject(AuthenticationService);
  vendorsService = inject(VendorService);
  routesService = inject(RoutesService);
  //temp var
  routeId: any;
  loading: boolean = true;
  pageSize: number = 10;
  stopSubscription$: Subject<any> = new Subject();
  programsList: any = [];
  routesList: any = [];
  stopPointsList: any = [];
  vendorsList: any = [];
  isCreateVisible: boolean = false;
  isEditMode: boolean = false;
  currentSelectedId!: string;
  currentSelected: any;
  programForm!: UntypedFormGroup;
  assigmentType!: AssignmentType
  infoLoad: any = [];
  userlevelAccess!: string;
  user: any;
  time: any;
  stopBeginHourT: any;
  stopEndHourT: any;

  constructor(
    private notification: NzNotificationService,
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
    this.createForm();
  }

  ngOnInit() {
    this.getSubscriptions();
  }

  ngOnDestroy() {
    this.stopSubscription$.next(undefined);
    this.stopSubscription$.complete();
  }

  getSubscriptions() {
    this.routesService.getRoutes(this.accountId).pipe(
      takeUntil(this.stopSubscription$),
      map((actions: any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      })))
      .subscribe((routes: IStopPoint[]) => {
        this.routesList = routes;
        this.loading = false;
      });

    this.routesService.getCustomerVendorAssignments(this.accountId).pipe(
      takeUntil(this.stopSubscription$),
      map((actions: any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as IBaseProgram;
        return { ...data, id }; // Include id property only once  
      })))
      .subscribe((programs: IBaseProgram[]) => {
        this.programsList = programs;
        this.loading = false;
      });

    this.vendorsService.getVendors().pipe(
      takeUntil(this.stopSubscription$),
      map((actions: any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as IVendor;
        return { ...data, id }; // Include id property only once  
      })))
      .subscribe((vendors: IVendor[]) => {
        this.vendorsList = vendors;
        this.loading = false;
      });
  }

  getRouteName(routeId: string) {
    let routeName = '';
    if (this.routesList.length > 0) {
      let selectedRoute = _.filter(this.routesList, r => {
        return r.id == routeId
      });
      if (selectedRoute.length > 0) {
        routeName = selectedRoute[0].name;
      }
    }
    return routeName;
  }

  createForm() {
    this.programForm = this.fb.group({
      active: [false, [Validators.required]],
      acRequired: [false, [Validators.required]],
      isSunday: [false, [Validators.required]],
      isMonday: [true, [Validators.required]],
      isTuesday: [true, [Validators.required]],
      isWednesday: [true, [Validators.required]],
      isThursday: [true, [Validators.required]],
      isFriday: [true, [Validators.required]],
      isSaturday: [false, [Validators.required]],
      program: ['', [Validators.required]],
      round: ['', [Validators.required]],
      stopBeginId: ['', [Validators.required]],
      stopBeginName: ['', [Validators.required]],
      stopBeginHour: ['', [Validators.required]],
      stopBeginHourT: [''],
      stopEndId: ['', [Validators.required]],
      stopEndName: ['', [Validators.required]],
      stopEndHour: ['', [Validators.required]],
      stopEndHourT: [''],
      time: [new Date(), [Validators.required]],
      type: [this.assigmentType, [Validators.required]],
      customerName: ['', [Validators.required]],
      customerId: [this.accountId, [Validators.required]],
      vendorName: ['', [Validators.required]],
      vendorId: ['', [Validators.required]],
      routeId: ['', [Validators.required]]
    })
  }

  patchForm(data: any) {
    const stopBeginHourArray = data.stopBeginHour.split(':');
    const stopEndHourArray = data.stopEndHour.split(':');
    this.programForm.patchValue({
      active: data.active,
      acRequired: data.acRequired,
      isSunday: data.isSunday,
      isMonday: data.isMonday,
      isTuesday: data.isTuesday,
      isWednesday: data.isWednesday,
      isThursday: data.isThursday,
      isFriday: data.isFriday,
      isSaturday: data.isSaturday,
      program: data.program,
      round: data.round,
      stopBeginId: data.stopBeginId,
      stopBeginName: data.stopBeginName,
      stopBeginHour: data.stopBeginHour,
      stopBeginHourT: data.stopBeginHour,//set(data.time.toDate(), { hours: stopBeginHourArray[0], minutes: stopBeginHourArray[1] }),
      stopEndId: data.stopEndId,
      stopEndName: data.stopEndName,
      stopEndHour: data.stopEndHour,
      stopEndHourT: data.stopEndHour,//set(data.time.toDate(), { hours: stopEndHourArray[0], minutes: stopEndHourArray[1] }),
      time: data.time,// (data.time).toDate(),
      type: data.type,
      customerName: data.customerName,
      customerId: this.accountId,
      vendorName: data.vendorName,
      vendorId: data.vendorId,
      routeId: data.routeId
    });
  }

  toggleActive(data: any) {
    this.routesService.toggleRouteAssignment(this.accountId, data.routeId, data.id, data).then(() => {
      this.isCreateVisible = false;
      this.isEditMode = false;
    })
      .catch(err => this.sendMessage('error', err));
  }

  showCreateModal() {
    this.programForm.reset();
    this.isCreateVisible = true;
    this.currentSelectedId = "";
    this.currentSelected = null;
  }

  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
  }

  showModalDelete(data: any) {

    if (this.userlevelAccess == "1") {
      this.routesService.deleteRouteAssignments(this.accountId, data.routeId, data.id).then(() => {
        this.isCreateVisible = false;
        this.isEditMode = false;
      })
        .catch(err => this.sendMessage('error', err));
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para borrar datos, favor de contactar al administrador.");
    }
  }

  showModalEdit(data: any) {
    this.currentSelectedId = data.id;
    this.currentSelected = data;
    this.patchForm(data);
    setTimeout(() => {
      this.isCreateVisible = true;
    }, 100);
    this.isEditMode = true;
  }

  handleCancel() {
    this.isCreateVisible = false;
    this.isEditMode = false;
    this.currentSelectedId = "";
  }

  createProgram() {
    if (this.programForm !== null && this.programForm !== undefined) {
      this.programForm.get('customerId')!.setValue(this.accountId);
    }
    const stopBeginHourDate = new Date(this.programForm.controls['stopBeginHourT'].value);
    const stopEndHourDate = new Date(this.programForm.controls['stopEndHourT'].value);
    const stopBeginHour = [stopBeginHourDate.getHours(), String(stopBeginHourDate.getMinutes()).padStart(2, '0')].join(':');
    const stopEndHour = [stopEndHourDate.getHours(), String(stopEndHourDate.getMinutes()).padStart(2, '0')].join(':');

    this.programForm.controls['stopBeginHour'].setValue(stopBeginHour);
    this.programForm.controls['stopEndHour'].setValue(stopEndHour);
    const stopBeginHour1: any = this.programForm.get('stopBeginHour');
    const stopEndHour1: any = this.programForm.get('stopEndHour');
    if (stopBeginHour1 == '' || stopEndHour1 == '') {
      this.notification.create(
        'error',
        'Problema con la información',
        'No están definidos los tiempos entre estación de esta operación para el turno seleccionado'
      );
      return; // Add return statement here
    }

    if (!this.isEditMode) {
      if (this.userlevelAccess != "3") {
        const routeIdControl: any = this.programForm.get('routeId');
        if (routeIdControl) {
          this.routesService.setRouteAssignments(this.accountId, routeIdControl.value, this.programForm.value).then(() => {
            this.isCreateVisible = false;
            this.isEditMode = false;
          })
            .catch(err => this.sendMessage('error', err));
          return; // Add return statement here
        }
      } else {
        this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
        return; // Add return statement here
      }
    } else {
      if (this.userlevelAccess != "3") {
        const routeIdControl: any = this.programForm.get('routeId');
        if (routeIdControl) {
          this.routesService.updateRouteAssignment(this.accountId, routeIdControl, this.currentSelectedId, this.programForm.value).then(() => {
            this.isCreateVisible = false;
            this.isEditMode = false;
            this.currentSelectedId = "";
          })
            .catch(err => this.sendMessage('error', err));
          return; // Add return statement here
        }
      } else {
        this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
        return; // Add return statement here
      }
    }
  }


  checkChange(formControl: string, event: boolean) {
    this.programForm.controls[formControl].setValue(event);
  }

  onRouteSelected(routeId: string) {
    this.routesService.getRouteStopPoints(this.accountId, routeId).pipe(
      takeUntil(this.stopSubscription$),
      map((actions: any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as IStopPoint;
        return { ...data, id }; // Include id property only once       
      })))
      .subscribe((stopPoints: IStopPoint[]) => {
        this.stopPointsList = stopPoints;
        this.loading = false;
      });
  }

  onStopPointSelected(event: any, field: any, timeSelection: any) {
    const commitmentTime = this.programForm.controls['time'].value;
    const program = this.programForm.controls['program'].value;
    const selector = field;
    let time = '';
    if (program == 'M') {
      if (selector == 'stopBeginName') {
        time = 'stopBeginHourT';
      } else {
        time = 'stopEndHourT';
      }
    } else {
      if (selector == 'stopEndName') {
        time = 'stopBeginHourT';
      } else {
        time = 'stopEndHourT';
      }
    }

    if (event) {
      const recordArray = _.filter(this.stopPointsList, s => {
        return s.id == event;
      });
      const record = recordArray[0];
      let round = this.programForm.controls['round'].value;
      this.programForm.controls[field].setValue(record.name);

      switch (round) {
        case 'Día':
          this.programForm.controls[time].setValue(addMinutes(commitmentTime, record.round1MinutesSinceStart));
          break;
        case 'Tarde':
          this.programForm.controls[time].setValue(addMinutes(commitmentTime, record.round2MinutesSinceStart));
          break;
        case 'Noche':
          this.programForm.controls[time].setValue(addMinutes(commitmentTime, record.round3MinutesSinceStart));
          break;
        default:
          this.programForm.controls[time].setValue(addMinutes(commitmentTime, record.round1MinutesSinceStart));
          break;
      }
    }
  }

  onVendorSelected(event: any, field: any) {
    if (event) {
      const recordArray = _.filter(this.vendorsList, s => {
        return s.id == event;
      });
      const record = recordArray[0];
      this.programForm.controls[field].setValue(record.name);
    }
  }
}
