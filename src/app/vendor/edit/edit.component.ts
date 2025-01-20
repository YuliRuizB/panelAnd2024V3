import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map, takeWhile, debounceTime, finalize } from 'rxjs/operators';
import { IVendor } from '../../shared/interfaces/vendor.type';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { RolService } from '../../shared/services/roles.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { VendorService } from '../../shared/services/vendor.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponentVendor implements OnInit {

  objectForm!: UntypedFormGroup;
  objectSubscription!: Subscription;
  authService = inject(AuthenticationService);
  recordId: any;
  selectedIndex: number = 0;
  record: any = {};
  avatarUrl: string = "http://themenate.com/applicator/dist/assets/images/avatars/thumb-13.jpg";
  selectedCountry: any;
  selectedLanguage: any;
  autosave: boolean = true;
  uploading: boolean = false;
  bucketPath: string = 'vendors/';
  rolService = inject(RolService);
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
  infoLoad: any = [];
  userlevelAccess!: string;
  user: any;
  vendorService = inject(VendorService);

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private message: NzMessageService,
    private bucketStorage: AngularFireStorage
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

  sendMessage(type: string, message: string): void {
    this.message.create(type, message);
  }
  ngOnInit() {
    this.objectSubscription = this.route.params.subscribe(params => {
      this.recordId = params['id']; // (+) converts string 'id' to a number
      this.selectedIndex = params['index']; // (+) converts string 'id' to a number      
      this.bucketPath += this.recordId;
      this.getSubscriptions();
    });
    this.createForm();
    this.autoSave();
  }

  ngOnDestroy(): void {
    this.objectSubscription.unsubscribe();
    this.autosave = false;
  }

  autoSave() {
  }

  createForm() {
    this.objectForm = this.fb.group({
      active: ['', [Validators.required]],
      address: this.fb.group({
        street: [''],// [Validators.required]],
        number: [''],// [Validators.required]],
        address2: [''],// [Validators.required]],
        address3: [''],// [Validators.required]],
        city: [''],// [Validators.required]],
        state: [''],// [Validators.required]],
        zipcode: [''],// [Validators.required]],
      }),
      name: ['', [Validators.required]],
      avatar: [''],// [Validators.required]],
      deleted: [''],// [Validators.required]],
      legalName: [''],// [Validators.required]],
      primaryContact: [''],// [Validators.required]],
      rfc: [''],// [Validators.required]],
      status: [''],// [Validators.required]],
      website: [''],// [Validators.required]],
      primaryEmail: ['', [Validators.required]],
      primaryPhone: ['', [Validators.required]]
    })
  }

  patchForm(record: IVendor) {
    this.objectForm.patchValue({ ...record })
  }

  getSubscriptions() {
    this.vendorService.getVendor(this.recordId).pipe(
      map((a: any) => {
        const id = a.payload.id;
        const data = a.payload.data() as any;
        return { id: id, ...data }
      })
    ).subscribe((vendor: IVendor) => {
      this.record = vendor;
      this.patchForm(vendor);
    })
  }

  submitForm(): void {
    for (const i in this.objectForm.controls) {
      this.objectForm.controls[i].markAsDirty();
      this.objectForm.controls[i].updateValueAndValidity();
    }
    if (this.objectForm.valid) {
      if (this.userlevelAccess != "3") {
        this.vendorService.updateVendor(this.recordId, this.objectForm.value);
      } else {
        this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
      }
    } else {

    }
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (reader.result !== null && typeof reader.result === 'string') {
        callback(reader.result);
      } else {
        // Handle the case where reader.result is null or not a string
        console.error('Invalid result from FileReader');
      }
    });
    reader.readAsDataURL(img);
  }

  beforeUpload(): Observable<boolean> {
    // Simplemente devuelve un valor booleano envuelto en un Observable
    return of(true);
  }
  handleChange(info: { file: NzUploadFile }): void {
    if (info.file.originFileObj) {
      this.getBase64(info.file.originFileObj, (img: string) => {
        this.avatarUrl = img;
        const fileName = info.file.name;
        const filePath = `${this.bucketPath}/${fileName}`;
        const fileRef = this.bucketStorage.ref(filePath);
        this.task = this.bucketStorage.ref(filePath).putString(img, 'data_url');
        // observe percentage changes
        this.uploadPercent = this.task.percentageChanges() as Observable<number>;
        this.uploadPercent.pipe(
          map(a => {
            return Number((a / 100).toFixed(2));
          })
        ).subscribe((value) => {
          this.uploading = value != 0;
          this.uploadvalue = value;
        })
        // get notified when the download URL is available
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
      this.vendorService.updateVendorAvatar(this.recordId, url);
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
  }
}
