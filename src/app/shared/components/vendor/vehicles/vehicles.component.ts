import { Component, OnInit, Input, OnDestroy, inject } from '@angular/core';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IVehicle, columnDefs } from '../../../interfaces/vehicle.type';
import * as _ from 'lodash';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationService } from '../../../services/authentication.service';
import { RolService } from '../../../services/roles.service';
import { DevicesService } from '../../../services/devices.service';
import { ColDef } from 'ag-grid-community';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';

@Component({
  selector: 'app-shared-vendor-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class SharedVendorVehiclesComponent implements OnInit {
  devicesService = inject(DevicesService);
  @Input() vendorId!: string;
  devicesList!: IVehicle[];
  loadedDevicesList: IVehicle[] = [];
  view: string = 'cardView';
  loading: boolean = true;
  stopSubscriptions$: Subject<boolean> = new Subject();
  searchValue: string = "";
  isVisible: boolean = false;
  isOkLoading: boolean = false;
  columnDefs : ColDef[] = [
    { headerName: 'Id', sortable: true, filter: true, field: 'chassis' },
    { headerName: 'Vehículo', sortable: true, filter: true, field: 'name' },
    { headerName: 'Placas', sortable: true, filter: true, field: 'licensePlate' },
    { headerName: 'PR', sortable: true, filter: true, field: 'driver' },
    { headerName: 'Carrocería', sortable: true, filter: true, field: 'carMaker' },
    { headerName: 'Puertas', sortable: true, filter: true, field: 'doors' },
    { headerName: 'Asientos', sortable: true, filter: true, field: 'seats' },
    { headerName: 'Modelo', sortable: true, filter: true, field: 'model' },
    { headerName: 'Motor', sortable: true, filter: true, field: 'engineType' },
    { headerName: 'Emisiones', sortable: true, filter: true, field: 'emissions' },
    { headerName: 'Combustible', sortable: true, filter: true, field: 'fuelType' },
    { headerName: 'Póliza Seguro', sortable: true, filter: true, field: 'insuranceId' },
    { headerName: 'Póliza Vence', sortable: true, filter: true, field: 'insuranceDateDue', cellRenderer: (params: any) => {
        if(!params.value) return '';
        return format((params.value).toDate(), 'dd MMMM yyyy', {
          locale: esLocale
        });
      }
    },
    { headerName: 'Activo', sortable: true, filter: true, field: 'active', cellRenderer: (params: any) => {
        if(!params.value) return '';
        return !!params.value ? 'Si' : 'No'
      }
    },
    { headerName: 'Deshabilitado', sortable: true, filter: true, field: 'disabled', cellRenderer: (params: any) => {
        if(!params.value) return 'No';
        return !!params.value ? 'Si' : 'No'
      }
    },
  ];;
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
      })
    ).subscribe(user => {
      this.user = user;
      if (this.user !== null && this.user !== undefined && this.user.rolId !== undefined) {
        this.rolService.getRol(this.user.rolId).valueChanges().subscribe(item => {
          this.infoLoad = item;
          this.userlevelAccess = this.infoLoad.optionAccessLavel;
        });
      }
    });
  }

  ngOnDestroy() {
    this.stopSubscriptions$.next(false);
    this.stopSubscriptions$.complete();
  }

  getSubscriptions(vendorId: any) {
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
      console.log(this.devicesList);
    })
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
    console.log(this.vehicleForm.value);
    console.log(this.vehicleForm.valid);
    if (this.userlevelAccess != "3") {
      this.devicesService.addDevice(this.vendorId, this.vehicleForm.value).then(() => {
        this.isOkLoading = false;
        this.isVisible = false;
      })
        .catch(err => {
          this.isOkLoading = false;
          console.log(err);
        });
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para agregar datos, favor de contactar al administrador.");
    }

  }

  deletePermission(data: any) {
    if (this.userlevelAccess == "1") {
      this.devicesService.deleteDevice(this.vendorId, data.id);
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para borrar datos, favor de contactar al administrador.");
    }


  }

  cancelDelete() {
    console.log('do not delete device');
  }

  getContextMenuItems(params: any) {
    params.context = this;
    var result = [
      {
        name: 'Editar ' + params.node.data.name,
        action: () => {
          console.log(params);
          // this.router.navigate([`vehicle/edit/${params.node.data.name}`]);
        },
        cssClasses: ['redFont', 'bold'],
      },
      'separator',
      {
        name: 'Eliminar ' + params.node.data.name,
        action: function () {
          console.log(params);
          window.alert('Alerting about ' + params.value);
        },
        cssClasses: ['redFont', 'bold'],
      },
      {
        name: 'Desactivar',
        checked: true,
        action: function () {
          console.log('Checked Selected');
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
