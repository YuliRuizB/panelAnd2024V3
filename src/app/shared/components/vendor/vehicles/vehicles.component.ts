import { Component, OnInit, Input, OnDestroy, inject } from '@angular/core';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { IVehicle, columnDefs } from '../../../interfaces/vehicle.type';
import * as _ from 'lodash';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationService } from '../../../services/authentication.service';
import { RolService } from '../../../services/roles.service';
import { DevicesService } from '../../../services/devices.service';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';

@Component({
  selector: 'app-shared-vendor-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class SharedVendorVehiclesComponent implements OnInit {
  devicesService = inject(DevicesService);
  @Input() vendorId: string = '';
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
  userlevelAccess!: string;
  infoLoad: any = [];

  popupParent: any;

  constructor(
    private rolService :RolService ,
    private authService: AuthenticationService,
    private fb: UntypedFormBuilder,      
    private messageService: NzMessageService,
    private router: Router) {
    this.popupParent = document.querySelector('body');
  }

  ngOnInit() {
    this.authService.user.pipe(
      takeUntil(this.stopSubscriptions$),
      tap((user: any) => {
        this.getSubscriptions(this.vendorId);
        this.createForm();
      }),
      switchMap(user => {
        this.user = user;
        if (this.user && this.user.rolId) {
          return this.rolService.getRol(this.user.rolId).valueChanges();
        } else {
          return [];
        }
      }),
      tap((item: any) => {
        this.infoLoad = item;
        this.userlevelAccess = this.infoLoad?.optionAccessLevel;
      }),
      catchError(err => {        
        this.sendMessage('error',err);
        return of(null); 
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.stopSubscriptions$.next(false);
    this.stopSubscriptions$.complete();
  }

  getSubscriptions(vendorId: any) {
    if (this.vendorId != '') { 
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
    } else {
      this.sendMessage('error', "VendorId no encontrado , favor de validar");
    }
  }
  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
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
      federalLicencePlates: [null],
      seats: [0, [Validators.required]],
      active: [true],
      disabled: [false],
      model: [0],

    })
  }

  submitForm() {
    this.isOkLoading = true;   
    if (this.userlevelAccess != "3") {
      if (this.vendorId != '') { 
      this.devicesService.addDevice(this.vendorId, this.vehicleForm.value).then(() => {
        this.isOkLoading = false;
        this.isVisible = false;
      })
        .catch(err => {
          this.isOkLoading = false;
          this.sendMessage('error', err);
        });
      } else {
        this.sendMessage('error', 'VendorId no establecido, favor de validar con administración');
      }
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para agregar datos, favor de contactar al administrador.");
    }

  }

  deletePermission(data: any) {
    if (this.userlevelAccess == "1") {
      if (this.vendorId != '') { 
      this.devicesService.deleteDevice(this.vendorId, data.id);
      }else {
        this.sendMessage('error', 'VendorId no establecido, favor de validar con administración');
      }
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para borrar datos, favor de contactar al administrador.");
    }
  }

  cancelDelete() {    
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
