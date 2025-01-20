import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UntypedFormBuilder, UntypedFormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountsService } from '../../shared/services/accounts.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { SummarizeService } from '../../shared/services/summarize.service';
import { RolService } from '../../shared/services/roles.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  rolService = inject(RolService);
  summarizedService = inject(SummarizeService);
  authService = inject(AuthenticationService);
  accountsService = inject(AccountsService);
  selectedRecord = false;
  accountsSubscription!: Subscription;
  accountsList: any = [];
  summarizedSubscription!: Subscription;
  summarized: any = [];
  userSubscription!: Subscription;
  user: any;
  loading = true;
  isVisibleAdd = false;
  isDeleteVisible = false;
  isOkLoading = false;
  validateForm!: UntypedFormGroup;
  infoLoad: any = [];
  userlevelAccess:string | undefined;
  jobType: any;
  infoSegment: any  =[];
  stopSubscription$: Subject<boolean> = new Subject();
  isDisabled = true;
  currentConsecutive: string  = ""; 
  currentJobType:string = "";


  constructor(      
    private messageService: NzMessageService,
    public modalService: NzModalService,   
    private fb: UntypedFormBuilder
    ) { }

  ngOnInit() {
    this.userSubscription = this.authService.getUser().subscribe( (user) => {      
      this.user = user;
    
      if (this.user !== null && this.user !== undefined && this.user.rolId !== undefined) {          
        this.rolService.getRol(this.user.rolId).valueChanges().subscribe(item => {
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
            this.getSubscriptions();          
            return record;
          })
        ).subscribe();
      }
    });   

    this.validateForm = this.fb.group({
      name: [null, [Validators.minLength(5), Validators.maxLength(40), Validators.required]],
      address: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      website: [null, [Validators.required]],
      active: [false],
      canShowDevices: [true],
      showFromHour: [5],
      jobTypeID: [null, [Validators.required]],
      custConsecutive: [null, [Validators.required]],
      showToHour: [20]
    });
    
  }

  ngOnDestroy() {
    if (this.accountsSubscription) {
    this.accountsSubscription.unsubscribe();  
    }
   // this.summarizedSubscription.unsubscribe();              
   if (this.userSubscription) {
    this.userSubscription.unsubscribe();
   }
    if (this.stopSubscription$) {
       this.stopSubscription$.unsubscribe();
    }
   
  }

  submitForm(): void {
    this.isOkLoading = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    
    if (this.userlevelAccess != "3") {
      const submitForm = this.accountsService.setAccount(this.validateForm.value, this.currentConsecutive);
      submitForm.then( (result) => {
       
        if (this.currentJobType.length > 0) {       

          this.accountsService.updateJobType(this.currentJobType, this.currentConsecutive).then(() => {     
           }, err => {             
             this.sendMessage('error',err);
           }).catch((err: any) =>   this.sendMessage('error',err))
        }
        this.isVisibleAdd = false;
        this.isOkLoading = false;
      }).catch( err =>   this.sendMessage('error',err));
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
  }

  toggleAccountActive(accountId: string, active: boolean) {
    this.accountsService.toggleAccountActive(accountId, active);
  }

  deleteAccount(account: any) {
    this.isOkLoading = true;
    if (this.userlevelAccess == "1") {
      const deleteAccount = this.accountsService.deleteAccount(account.id);
      deleteAccount.then( (result) => {
        this.isOkLoading = false;
      }).catch( err => this.sendMessage('error', err));
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para borrar datos, favor de contactar al administrador.");
    }
    
   
  }

  getSubscriptions() {
    this.loading = true;
    if (this.infoSegment  !== undefined && this.infoSegment.nivelNum == 1) { //Individual
   
      this.accountsSubscription = this.accountsService.getAccountsByCustomer(this.user.customerId).pipe(
        map((a:any) => {
          const id = a.payload.id;
          const data = a.payload.data() as any;
          return { id, ...data }
        }),
      ).subscribe((accounts) => {
        this.accountsList = [accounts];       
        this.loading = false;      
      });
    } else {
      this.accountsSubscription = this.accountsService.getAccounts().pipe(
        map((actions: any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id: id, ...data }
        }))
      ).subscribe((accounts) => {
        this.accountsList = accounts;
        this.loading = false;
      });
    }
  }

  deleteAccountModal(account: any) {
    this.modalService.warning({
      nzTitle: '¿Está seguro?',
      nzContent: 'Eliminará toda la información de ' + account.name,
      nzCancelText: 'Cancelar',
      nzOkText: 'Eliminar',
      nzOkLoading: this.isOkLoading,
      nzOnOk: () => {
        this.deleteAccount(account);
      }
    }); 
  }

  createBasicMessage(recordCount: number): void {
    this.messageService.success(`Se encontraron ${recordCount} registros.`, {
      nzDuration: 3000
    });
  }

  showModalAdd(): void {       
    this.isVisibleAdd = true;        
    //Fill jobTypeID
    this.accountsSubscription = this.accountsService.getJobType().pipe(
      map((actions:any) => actions.map((a:any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id: id, ...data }
      }))
    ).subscribe( (jobTypeList) => {
      this.jobType = jobTypeList;  
    }); 
  }

  handleCancel(): void {
    this.isVisibleAdd = false;
  }
  
    sendMessage(type: string, message: string): void {
      this.messageService.create(type, message);
  }
    onJobTypeSelected(event:any){
      const searchJob = this.jobType.filter((job:any) => job.uid === event);
      if (searchJob.length > 0) {
          let consecutive = searchJob[0].consecutive;
          this.currentJobType = event;
          consecutive = parseInt(consecutive, 10) + 1;
          consecutive =consecutive.toString().padStart(4, '0');         
          this.validateForm.controls['custConsecutive'].setValue( searchJob[0].type + consecutive); 
          this.currentConsecutive =  consecutive;
      } 
    }
}
