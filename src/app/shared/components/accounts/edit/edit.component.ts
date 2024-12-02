import { Component, OnInit, Input, OnDestroy, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, Subscription, Observable, of } from 'rxjs';
import { takeUntil, map, tap, finalize } from 'rxjs/operators';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountsService } from '../../../services/accounts.service';
import { RolService } from '../../../services/roles.service';
import { UsersService } from '../../../services/users.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { VendorService } from '../../../../shared/services/vendor.service';

@Component({
  selector: 'app-shared-account-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class SharedAccountEditComponent implements OnInit, OnDestroy {

  @Input('accountId') accountId!: string ;
  objectForm!: UntypedFormGroup;
  stopSubscription$: Subject<boolean> = new Subject();
  loading: boolean = true;
  record: any;
  recordId: any;
  infoLoad: any = [];
  userlevelAccess:string | undefined;
 user: any;  
 accountsSubscription!: Subscription;

 rolService = inject(RolService);
 authService = inject(AuthenticationService);
 accountsService = inject(AccountsService);
 userService= inject(UsersService);
 infoSegment: any = [];
 jobType: any;
 usersList: any;
 avatarUrl: string = "http://themenate.com/applicator/dist/assets/images/avatars/thumb-13.jpg";
 uploading: boolean = false;
 bucketPath: string = 'customers/';
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
  images!: Observable<any[]>;
  vendorService= inject(VendorService);

  constructor(   
    private messageService: NzMessageService, 
    private bucketStorage: AngularFireStorage,      
    private fb: UntypedFormBuilder
  ) {
    this.authService.user.subscribe((user) => {
      this.user = user;
      if (this.user !== null && this.user !== undefined && this.user.rolId !== undefined) {            
          this.rolService.getRol(this.user.rolId).valueChanges().subscribe(item => {
              this.infoLoad = item;
              this.userlevelAccess = this.infoLoad.optionAccessLavel;                 
          });

        this.accountsSubscription = this.accountsService.getJobType().pipe(
          map((actions:any) => actions.map((a:any) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { id: id, ...data }
          }))
        ).subscribe( (jobTypeList) => {
          this.jobType = jobTypeList;  
        });

        this.accountsSubscription = this.accountsService.getUsersByCustomer(this.accountId).pipe(
          map((actions:any) => actions.map((a:any) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { id: id, ...data }
          }))
        ).subscribe( (usersList) => {
          this.usersList = usersList;  
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
   }

  ngOnInit() {
    this.createForm();
    this.getSubscription();
  }

  createForm() {
    this.objectForm = this.fb.group({
      active: [false, [Validators.required]],
      imageUrl: [''],
      address: [''],
      paymentResponsible: [1, [Validators.required]], // 0: Account, 1: User
      name: ['', [Validators.required]],
      socialName: [''],
      rfc: [''],
      addressNumber: [''],
      address2: [''],
      address3: [''],
      zip: [''],
      city: [''],
      state: [''],
      forceStopPoints: [true],
      forceRoute: [true],
      forceRound: [true],
      website: [''],
      phoneNumber: [''],
      jobTypeID:[''],
      custConsecutive:[''],
      primaryContact: [''],
      responsableUser: ['']
    })
  }

  patchForm(record: any) {
  //  console.log(record);
    this.objectForm.patchValue({
      active: record.active || false,
      imageUrl: record.imageUrl || '',
      address: record.address || '',
      addressNumber: record.addressNumber || '',
      name: record.name || '',
      paymentResponsible: record.paymentResponsible || 1,
      socialName:record.socialName || '',
      rfc:record.rfc || '',
      address2:record.address2 || '',
      address3:record.address3 || '',
      zip:record.zip || '',
      city:record.city || '',
      state:record.state || '',
      forceStopPoints:record.forceStopPoints || true,
      forceRoute:record.forceRoute || true,
      forceRound:record.forceRound || true,
      website: record.website || '',
      phoneNumber: record.phoneNumber || '',
      jobTypeID: record.jobTypeID || '',
      custConsecutive: record.custConsecutive || '',
      primaryContact: record.primaryContact || '',
      responsableUser: record.responsableUser || ''
    });

  }

  ngOnDestroy() {
    this.stopSubscription$.next(false);
    this.stopSubscription$.complete();
  }

  getSubscription() {  
    this.accountsService.getAccount(this.accountId).pipe(
      takeUntil(this.stopSubscription$),
      map((a:any) => {
        const id = a.payload.id;
        const data = a.payload.data() as any;
        return { id, ...data }
      }),
      tap(record => {
       // console.log(record);
        this.patchForm(record);
        this.record = record;
        this.loading = false;
        return record;
      })
    ).subscribe();
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

  handleChange(info: { file: NzUploadFile }): void {
    console.log(info);
    if (info.file.originFileObj) {
    this.getBase64(info.file.originFileObj, (img: string) => {
      this.avatarUrl = img;
    //  console.log(img);
    const fileName = info.file.name;
    const filePath = `${this.bucketPath}/${fileName}`;
    
    const fileRef = this.bucketStorage.ref(filePath); 
      this.task = this.bucketStorage.ref(filePath).putString(img, 'data_url');

      // observe percentage changes
      this.uploadPercent = this.task.percentageChanges() as Observable<number>;
      console.log(filePath);
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

      console.log("started updatePhotoURL with url: ", url);
      this.objectForm.controls['imageUrl'].patchValue(url);
  
      if (this.userlevelAccess != "3") {
        console.log("update");
        this.accountsService.updateAvatarAccount(this.accountId, url);
        console.log("afdter");
      } else {
        this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
      }
    }
  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
}
  onSubmit() {
    if (this.userlevelAccess != "3") {
      console.log(this.objectForm.value);
      this.accountsService.updateAccount(this.accountId, this.objectForm.value).then(() => {
       // console.log('ok')
      }, err => {
        console.log('err: ', err)
      }).catch((err) => console.log(err))
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }    
  }

  onJobTypeSelected(event:any){
   // console.log(event);   
    const searchJob = this.jobType.filter((job:any) => job.uid === event);
    if (searchJob.length > 0) {
       // console.log(searchJob);
        let consecutive = searchJob[0].consecutive;
        consecutive = parseInt(consecutive, 10) + 1;
        consecutive =consecutive.toString().padStart(4, '0');        
        // Now custConsecutive contains the original value incremented by 1 digit
        //console.log( searchJob[0].type + consecutive);
        this.objectForm.controls['custConsecutive'].setValue( searchJob[0].type + consecutive); 
    } 
  }

 

}
