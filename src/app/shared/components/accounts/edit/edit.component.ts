import { Component, OnInit, Input, OnDestroy, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountsService } from '../../../services/accounts.service';
import { RolService } from '../../../services/roles.service';
import { UsersService } from '../../../services/users.service';
import { AuthenticationService } from '../../../services/authentication.service';

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

  constructor(   
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

        this.accountsSubscription = this.accountsService.getJobType().pipe(
          map((actions:any) => actions.map((a:any) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { id: id, ...data }
          }))
        ).subscribe( (jobTypeList) => {
          this.jobType = jobTypeList;  
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
      primaryContact: ['']
    })
  }

  patchForm(record: any) {
  //  console.log(record);
    this.objectForm.patchValue({
      active: record.active || false,
      imageUrl: record.avatar || '',
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
      primaryContact: record.primaryContact || ''
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

  handleChange() {

  }
  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
}
  onSubmit() {
    if (this.userlevelAccess != "3") {
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
