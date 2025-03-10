import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subscription, Observable, Subject, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { map, takeWhile, debounceTime, finalize, takeUntil, tap, switchMap, catchError } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { IVehicle } from '../../../shared/interfaces/vehicle.type';
import { RolService } from '../../../shared/services/roles.service';
import { DriversService } from '../../../shared/services/drivers.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { VehiclesService } from '../../../shared/services/vehicles.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class VehicleEditComponent implements OnInit, OnDestroy {
  rolService = inject(RolService);
  authService = inject(AuthenticationService);
  vehicleService= inject(VehiclesService);
  objectForm!: UntypedFormGroup;
  objectSubscription!: Subscription;
  recordId: any;
  vendorId: any ='';
  driversList: any = [];
  selectedIndex: number = 0;
  record: any = {};
  avatarUrl: string = "http://themenate.com/applicator/dist/assets/images/avatars/thumb-13.jpg";
  selectedCountry: any;
  selectedLanguage: any;
  autosave: boolean = true;
  uploading: boolean = false;
  bucketPath: string = 'vendors/';

  // Upload Task 
  task!: AngularFireUploadTask;
  // Progress in percentage
  uploadPercent!: Observable<number>;
  uploadvalue: number = 0;
  downloadURL!: Observable<string>;
  // Snapshot of uploading file
  snapshot!: Observable<any>;
  // Uploaded File URL
  UploadedFileURL!: Observable<string>;
  //Uploaded Image List
  images!: Observable<any[]>;
  user: any;
  stopSubscriptions$: Subject<boolean> = new Subject();
  infoLoad: any = [];
  userlevelAccess!: string;
  driversService = inject(DriversService);
  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private bucketStorage: AngularFireStorage,
    private messageService: NzMessageService
  ) {
  }

  ngOnInit() {
    this.authService.user.pipe(
      takeUntil(this.stopSubscriptions$),
      tap((user: any) => {
        this.user = user;
      }),
      switchMap((user: any) => {
        if (user && user.rolId) {
          return this.rolService.getRol(user.rolId).valueChanges().pipe(
            tap((item: any) => {
              this.infoLoad = item;
              this.userlevelAccess = this.infoLoad.optionAccessLavel;
            }),
            catchError(error => {
              console.error('Error fetching role:', error);
              return of(null); // Handle error and return a fallback value
            })
          );
        } else {
          return of(null); // Return a fallback observable if rolId is not available
        }
      })
    ).subscribe();

    this.objectSubscription = this.route.params.pipe(
      takeUntil(this.stopSubscriptions$)
    ).subscribe(params => {
      this.recordId = params['vehicleid']; // (+) converts string 'id' to a number
      this.vendorId = params['accountid'];
      this.bucketPath += this.recordId;
      this.getSubscriptions(this.vendorId);
    });
    this.createForm();

    // this.autoSave();
  }

  ngOnDestroy(): void {
    this.stopSubscriptions$.next(false);
    this.stopSubscriptions$.complete();
    this.autosave = false;
  }

  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
  }
  autoSave() {
    this.objectForm.statusChanges.pipe(
      debounceTime(2000),
      takeWhile(() => this.autosave)
    ).subscribe((values) => {
      if (this.objectForm.valid) {       
        if (this.userlevelAccess != "3") {
          if (this.vendorId != '') { 
          this.vehicleService.updateVehicle(this.vendorId, this.recordId, this.objectForm.value);
          } else {
            this.sendMessage('error', 'VendorId no esta establecido, favor de validar con administración');
          }
        } else {
          this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
        }

      }
    })
  }

  createForm() {
    this.objectForm = this.fb.group({
      active: [''],// [Validators.required]],
      name: [''],// [Validators.required]],
      ac: [false],
      avatar: [''],
      carMaker: [''],
      chassis: [''],
      deviceId: [''],
      doors: [''],// [Validators.required]],
      driver: [''],
      driverId: [''],
      emissions: [''],
      engineType: [''],
      fuelTankCapacity: [''],
      fuelType: [''],
      horsePower: [''],
      insuranceAgent: [''],
      insuranceValidFrom: [''],
      insuranceValidTo: [''],
      insuranceId: [''],
      insuranceAgentPhone: [''],
      lastService: [''],
      licensePlate: [''], //[Validators.required]],
      model: [''],
      seats: [''],// [Validators.required]],
      type: [''],
      vendor: [''],
      year: [''],
    })
  }

  patchForm(record: IVehicle) {
    this.objectForm.patchValue({
      active: record.active || false,
      ac: record.ac || false,
      name: record.name,
      avatar: record.avatar || '',
      carMaker: record.carMaker || '',
      chassis: record.chassis || '',
      deviceId: record.deviceId || '',
      disabled: record.disabled || false,
      doors: record.doors || 1,
      driver: record.driver || '',
      driverId: record.driverId || '',
      emissions: record.emissions || '',
      engineType: record.engineType || '',
      fuelTankCapacity: record.fuelTankCapacity || '',
      fuelType: record.fuelType || '',
      horsePower: record.horsePower || '',
      insuranceAgent: record.insuranceAgent || '',
      insuranceValidFrom: record.insuranceValidFrom || '',
      insuranceValidTo: record.insuranceValidTo || '',
      insuranceId: record.insuranceId || '',
      insuranceAgentPhone: record.insuranceAgentPhone || '',
      lastService: record.lastService || '',
      licensePlate: record.licensePlate || '',
      model: record.model || '',
      seats: record.seats || '',
      type: record.type || '',
      vendor: record.vendor || '',
      year: record.year || ''
    });
  }

  getSubscriptions(vendorId: string) {
    if (vendorId != '') { 
    this.vehicleService.getVehicle(vendorId, this.recordId).pipe(
      takeUntil(this.stopSubscriptions$),
      map((a:any) => {
        const id = a.payload.id;
        const data = a.payload.data() as any;
        return { id: id, ...data }
      })
    ).subscribe((vehicle: IVehicle) => {
      this.record = vehicle;
      this.patchForm(vehicle);    
    })
    this.driversService.getDrivers(vendorId).pipe(
      takeUntil(this.stopSubscriptions$),
      map((actions:any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id: id, ...data }
      }))
    ).subscribe((drivers: any) => {
      this.driversList = drivers;      
    })
    } else {
      this.sendMessage('error','VendorId no esta establecido, favor de validar con administración');
    }
  }

  submitForm(): void {
    for (const i in this.objectForm.controls) {
      this.objectForm.controls[i].markAsDirty();
      this.objectForm.controls[i].updateValueAndValidity();
    }

    if (this.objectForm.valid) {
      if (this.userlevelAccess != "3") {
        if (this.vendorId != '') { 
        this.vehicleService.updateVehicle(this.vendorId, this.recordId, this.objectForm.value);
        } else {
          this.sendMessage('error','VendorId no esta establecido, favor de validar con administración');
        }
      } else {
        this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
      }
    } else {
      this.sendMessage('error', 'La forma no es valida');
    }
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        if (reader.result !== null && typeof reader.result === 'string') {
            callback(reader.result);
        } else {            
            console.error('Invalid result from FileReader');
        }
    });
    reader.readAsDataURL(img);
}

beforeUpload(): Observable<boolean> { 
  return of(true);
}
  handleChange(info: { file: NzUploadFile }): void {
    if (info.file.originFileObj) {
    this.getBase64(info.file.originFileObj, (img: string) => {
      this.avatarUrl = img;    
      const fileRef = this.bucketStorage.ref(this.bucketPath);
      this.task = this.bucketStorage.ref(this.bucketPath).putString(img, 'data_url');      
      this.uploadPercent = this.task.percentageChanges() as Observable<number>;    
      this.uploadPercent.pipe(
        map(a => {
          return Number((a / 100).toFixed(2));
        })
      ).subscribe((value) => {
        this.uploading = value != 0;
        this.uploadvalue = value;
      })     
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.uploading = false;
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(async (url) => {
            this.updatePhotoURL(url);
          });
        })
      ).subscribe();
    });
    }
  }

  async updatePhotoURL(url: any) {   
    this.objectForm.controls['avatar'].patchValue(url);
    if (this.userlevelAccess != "3") {
      if (this.vendorId != '') { 
      this.vehicleService.updateVehicleAvatar(this.vendorId, this.recordId, url);
    } else {
      this.sendMessage('error','VendorId no esta establecido, favor de validar con administración');
    }
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
  }
}
