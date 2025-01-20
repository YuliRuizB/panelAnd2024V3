import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { IVehicle, columnDefs } from '../../shared/interfaces/vehicle.type';
import * as _ from 'lodash';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RolService } from '../../shared/services/roles.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { DevicesService } from '../../shared/services/devices.service';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css']
})
export class FleetComponent implements OnInit, OnDestroy {
  authService = inject(AuthenticationService);
  devicesService = inject(DevicesService);
  devicesList!: IVehicle[];
  loadedDevicesList: IVehicle[] = [];
  view: string = 'cardView';
  loading: boolean = true;
  stopSubscriptions$: Subject<boolean> = new Subject();
  searchValue: string = "";
  isVisible: boolean = false;
  isOkLoading: boolean = false; 
  vehicleForm!: UntypedFormGroup;
  user: any;
  infoLoad: any = [];
  userlevelAccess!: string;
  rolService = inject(RolService);
  popupParent: any;

  constructor(
    private fb: UntypedFormBuilder, 
    private messageService: NzMessageService,    
    private router: Router) {
    this.popupParent = document.querySelector('body');
  }

  ngOnInit() {
    this.authService.user.pipe(
      takeUntil(this.stopSubscriptions$),
      tap((user: any) => {
        this.createForm();
      }),
      switchMap((user: any) => {
        this.user = user;
        if (this.user && this.user.rolId) {
          return this.rolService.getRol(this.user.rolId).valueChanges().pipe(
            tap((item: any) => {
              this.infoLoad = item;
              this.userlevelAccess = this.infoLoad.optionAccessLavel;
            }),
            map(() => user) // Pass user to the next switchMap
          );
        } else {
          return of(user); // Return user as is if rolId is not available
        }
      }),
      tap((user: any) => {
        this.getSubscriptions(user.vendorId);
      })
    ).subscribe();
  }

  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
  }

  ngOnDestroy() {
    this.stopSubscriptions$.next(false);
    this.stopSubscriptions$.complete();
  }

  getSubscriptions(vendorId: any) {
    if (vendorId != undefined) { 
      this.devicesService.getDevices(vendorId).pipe(
        takeUntil(this.stopSubscriptions$),
        map((actions:any) => actions.map((a: any) => {
          const data = a.payload.doc.data() as IVehicle;
          const id = a.payload.doc.id;
          const route = { ...data, id }; // Spread data and add id
          return route;
        }))
      ).subscribe((devices: IVehicle[]) => {
        this.devicesList = devices;
        this.loadedDevicesList = _.sortBy(devices, ['name', 'asc']);      
      })
    }
  }

  searchByValue() {
    this.initializeList();
    const searchTerm = this.searchValue
    if (!searchTerm) {
      return;
    }
    this.devicesList = this.devicesList.filter((device: IVehicle) => {
      if (device.name && searchTerm) {
        if (device.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    });
  }

  initializeList(): void {
    this.devicesList = this.loadedDevicesList;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  createForm() {
    this.vehicleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      licensePlates: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      seats: [0, [Validators.required]],
      active: [true],
      disabled: [false]
    })
  }

  submitForm() {
    this.isOkLoading = true;
    if (this.userlevelAccess != "3") {
      if (this.user.vendorId != '') { 
      this.devicesService.addDevice(this.user.vendorId, this.vehicleForm.value).then(() => {
        this.isOkLoading = false;
        this.isVisible = false;
      })
        .catch(err => {
          this.isOkLoading = false;
          this.sendMessage('error',err);
        });
      } else {
        this.sendMessage('error', 'VendorId no esta establecido favor de validar con administración');
      }
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para agregar datos, favor de contactar al administrador.");
    }
  }

  getContextMenuItems(params: any) {
    params.context = this;
    var result = [
      {
        name: 'Editar ' + params.node.data.name,
        action: () => {          
          // this.router.navigate([`vehicle/edit/${params.node.data.name}`]);
        },
        cssClasses: ['redFont', 'bold'],
      },
      'separator',
      {
        name: 'Eliminar ' + params.node.data.name,
        action: function () {         
          window.alert('Alerting about ' + params.value);
        },
        cssClasses: ['redFont', 'bold'],
      },
      {
        name: 'Desactivar',
        checked: true,
        action: function () {          
        },
        icon: '<img src="../images/skills/mac.png"/>',
      },
      'copy',
      'separator',
      'chartRange',
    ];
    return result;
  }
}
