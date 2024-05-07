import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import * as _ from 'lodash';
import { Firestore } from 'firebase/firestore'; 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { toLower, some } from 'lodash';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { filter, finalize, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { differenceInCalendarDays } from 'date-fns';
import { GeoPoint } from 'firebase/firestore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Timestamp } from 'firebase/firestore';
import { UsersService } from '../../shared/services/users.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { RolService } from '../../shared/services/roles.service';
import { RoutesService } from '../../shared/services/routes.service';
import { DashboardService } from '../../shared/services/admin/dashboard.service';
import { ProductsService } from '../../shared/services/products.service';
import { CustomersService } from '../../customers/services/customers.service';
import { AccountsService } from '../../shared/services/accounts.service';


export interface IFee {
  amount: number;
  currency: number;
  tax: number;
}

export interface IPaymentMethod {
  barcode_url: string;
  reference: string;
  type: string;
}
export interface ICard {
  address: string;
  allows_charge: boolean;
  allows_payouts: boolean;
  bank_code: string;
  bank_name: string;
  brand: string;
  card_number: string;
  expiration_month: number;
  expiration_year: number;
  holder_name: string;
  points_card?: boolean;
  points_type?: string;
  type: string;
}

export interface ICustomer {
  address: string;
  clabe: string;
  creation_date: Date;
  email: string;
  external_id: string;
  last_name: string;
  name: string;
  phone_number: string;
}
export interface IBoardingPass {
  active: boolean;
  amount: number;
  authorization: number;
  card?: ICard;
  category: string;
  conciliated: boolean;
  creation_date: Date;
  promiseDate: Date;
  currency: string;
  customer_id?: string;
  customer?: ICustomer;
  date_created: Timestamp;
  due_date?: Date;
  description: string;
  error_message: string;
  fee?: IFee;
  is_courtesy?: boolean;
  method: string;
  name: string;
  operation_date: Date;
  operation_type: string;
  order_id: string;
  payment_method?: IPaymentMethod;
  price: number;
  product_description: string;
  product_id: string;
  round: string;
  routeId: string;
  routeName: string;
  status: string;
  stopDescription: string;
  stopId: string;
  stopName: string;
  transaction_type: string;
  validFrom: Timestamp;
  validTo: Timestamp;
  realValidTo?: Date;
  isTaskIn: boolean;
  isTaskOut: boolean;
  isOpenpay?: boolean;
  paidApp?: string;
  id?: string;
  amountPayment?:string;
  typePayment?:string;
  payment?:string; 
  baja?:boolean;
  idBoardingPass?:string;
}


interface IRound {
  round1?: string;
  round2?: string;
  round3?: string;
  round4?: string;
}

export interface IStopPoint {
  id: string;
  active: boolean;
  description: string;
  geopoint:GeoPoint;
  imageUrl: string;
  name: string;
  order: number;
  rounds: IRound;

}
export const months = {
  0: 'Enero',
  1: 'Febrero',
  2: 'Marzo',
  3: 'Abril',
  4: 'Mayo',
  5: 'Junio',
  6: 'Julio',
  7: 'Agosto',
  8: 'Septiembre',
  9: 'Octubre',
  10: 'Noviembre',
  11: 'Diciembre'
};
@Component({
  templateUrl: './default-dashboard.component.html'//,
  //styles: ['./default-dashboard.component.css']
})

export class DefaultDashboardComponent implements OnInit, OnDestroy {
  @ViewChild('download', { static: false }) download!: ElementRef;    
  authService = inject(AuthenticationService);
  userService= inject(UsersService);
  routesService = inject(RoutesService);
  dashboardService = inject(DashboardService);
  productsService = inject(ProductsService);
  customersService = inject(CustomersService);
  size:number = 40;
  @ViewChild('searchBar', { static: false }) searchbar: any;

  search: any;
  rolService = inject(RolService);
  usersCollection: AngularFirestoreCollection<any> | undefined;
  users: any;
  hasBeenFiltered = false;
  displayData: any;
  devicesList: any;
  loadedDevicesList: Array<any> = [];
  usersCollection1: AngularFirestoreCollection<any> | undefined;


  //Modal MessageCenter
  newMessage = "";
  userChatMessageData: any;
  loadingChatMessages = false;

  // modal Bulk create boardingPasses
  current = 0;
  isDone: boolean = false;
  isCreatingBoardingPasses: boolean = false;
  isCreatingCredentials: boolean = false;

  sendUser:any; 
  idBoardingPass! : string;


  //Modal Bulk table
  listOfSelection = [
    {
      text: 'Seleccionar todas las páginas',
      onSelect: () => {
        this.checkAllData(true);
      }
    },
    {
      text: 'Deseleccionar todas las páginas',
      onSelect: () => {
        this.checkAllData(false);
        this.refreshStatus();
      }
    }
  ];

  listOfCredentialsSelection = [
    {
      text: 'Seleccionar todas las páginas',
      onSelect: () => {
        this.checkCredentialsAllData(true);
      }
    },
    {
      text: 'Deseleccionar todas las páginas',
      onSelect: () => {
        this.checkCredentialsAllData(false);
        this.refreshCredentialsStatus();
      }
    }
  ];

  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData = [];
  mapOfCheckedId: { [key: string]: boolean } = {};

  isCredentialsAllDisplayDataChecked = false;
  isCredentialsIndeterminate = false;
  listOfCredentialsDisplayData = [];
  listOfCredentialsAllData = [];
  mapOfCredentialsCheckedId: { [key: string]: boolean } = {};

  isContentOpen = false;
  isUserSelected = false;
  isLoadingUsers = false;
  currentUserSelected!: { uid: string ; studentId: string;
                     paymentId: string; disabled: any; 
                    customerId: string; firstName: any; 
                    emailVerified:any ; lastName: any; 
                    email: any; phoneNumber: any;
                    status: string; id: string; 
                    token: any; defaultRoute: any; 
                    displayName: any; photoURL:any;
                    userName: any; customerName: any; 
                    defaultRound: any; defaultRouteName: any; 
                    defaultStopName: any; defaultStopId: any;
                    turno: string; roundTrip: string;
                  } ;
  currentSelectedCustomerId: string | undefined;
  loadingLastPurchase = false;
  lastPurchase?: IBoardingPass ;
  isBoardingPassSelected = false;
  isCredentialSelected = false;
  isLoadingPayments = false;
  payments: any;
  hasBeenLoaded = false;
  latestBoardingPassesCollection: AngularFirestoreCollection<any> | undefined;
  latestBoardingPasses: any;
  loadingLatestBoardingPasses: boolean | undefined;

  latestUserPurchasesCollection: AngularFirestoreCollection<any> | undefined;
  latestPurchases: null | undefined;
  latestPurRequest: null | undefined;
  lastestPurchaseDetail: any;
  userCredentials: null | undefined;
  loadingUserCredentials = false;
  loadingLatestPurchases = false;
  loadinglatestPurRequest = false;

  isVisible = false;
  isProductVisible = false;
  isEditUserVisible = false;
  isModalCredentialVisible = false;
  isConfirmLoading = false;
  productSelectedValue: string = "";



  validateForm!: UntypedFormGroup;
  credentialForm!: UntypedFormGroup;
  validateEditForm!: UntypedFormGroup;
  validateLiqForm!: UntypedFormGroup;
  checked = false;
  routes: any = [];
  userRoutes: any = [];
  products: any = [];
  stopPoints: any = [];
  stopPointsList: any = [];
  usersByAccount: any = [];
  productsReference: any = [];
  customers: any[] | undefined;
  newCustomerIdEditMode: string = "";
  resetClientEditInfo: boolean = false;
  newRouteIdEditeMode: string = "";
  newStepIdEditeMode: string = "";

  routesSubscription!: Subscription;
  productsSubscription!: Subscription;
  stopPointsSubscription!: Subscription;
  customerSuscription!: Subscription;
  userSubscription!: Subscription;

  accountId$ = new Subject<string>();
  routeId$ = new Subject<string>();

  canUpdatePayment = false;
  canUpdateValidTo = false;

  elementType = 'url';

  customersList: any[] = [];
  stopSubscription$: Subject<any> = new Subject();

  isVisibleBulk: boolean = false;
  isLoadingBulk: boolean = false;
  isConfirmLoadingBulk: boolean = false;

  isVisibleBulkCredentials: boolean = false;
  isLoadingBulkCredentials: boolean = false;
  isConfirmLoadingBulkCredentials: boolean = false;
  isConfirmPagoLoading: boolean = false;

  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');
  formatterDollar = (value: number) => `$ ${value}`;
  parserDollar = (value: string) => value.replace('$ ', '');
  actualSelectedRows!: number;
  selectedUsersForCredentials: any = [];
  ifValidPayment: boolean = false;
  ifValidLiqPayment: boolean = false;
  isValidDescriptionPaymentType: boolean = false;
  paymentSelected: string = "";
  isAnticipo: boolean = false;
  fileListInfo: any = [];
  // disabledDate: any;
  disabledDate = (current: Date): boolean => false;

  fileUrl: string = "http://themenate.com/applicator/dist/assets/images/avatars/thumb-13.jpg";
  autosave: boolean = true;
  uploading: boolean = false;
  bucketPath: string = 'dashboard/';
  // Upload Task 
  task: AngularFireUploadTask | undefined;
  // Progress in percentage
  uploadPercent!: Observable<number>;
  uploadvalue: number = 0;
  downloadURL!: Observable<string>;
  // Snapshot of uploading file
  snapshot: Observable<any> | undefined;
  // Uploaded File URL
  UploadedFileURL!: Observable<string>;
  infoLoad: any = [];
  userlevelAccess: string | undefined;
  user: any;
  purchaseActive :boolean = false;
  isVisiblePurchasePay:boolean = false;
  accountsService= inject(AccountsService);
  infoSegment: any  =[];

  constructor(
    private afs: AngularFirestore,
    public modalService: NzModalService,
    private fb: UntypedFormBuilder,        
    private aff: AngularFireFunctions,
    private bucketStorage: AngularFireStorage,
    private msg: NzMessageService
  ) { 
    this.authService.user.subscribe(user => {   
      this.user = user;
      //console.log(this.user); //idSegment
        if (this.user !== null && this.user !== undefined && this.user.idSegment !== undefined) { 
          
          this.accountsService.getSegmentLevel(this.user.idSegment).pipe(
            takeUntil(this.stopSubscription$),
            map((a:any) => {
              const id = a.payload.id;
              const data = a.payload.data() as any;
              return { id, ...data }
            }),
            tap(record => {             
              this.infoSegment = record;  
              //console.log("dentro del info");          
             // console.log(this.infoSegment);
              this.filldata();
              return record;
            })
          ).subscribe()
        }      
    });
  }

  filldata(){
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual     
    
      const customerSuscription: Observable<any>  = this.accountId$.pipe(
        switchMap(async (accountId) => this.afs.collection('customers').doc(accountId)));

        customerSuscription.subscribe((customers: any) => {
          this.customers = customers;
        });

    } else {
      const customerSuscription: Observable<any>  = this.accountId$.pipe(
        switchMap(accountId => this.afs.collection('customers', ref => ref.where('active', '==', true)).valueChanges({ idField: 'uid' })
        ));  

        customerSuscription.subscribe((customers: any) => {
          this.customers = customers;
        });
    }
    const routesObservable: Observable<any>  = this.accountId$.pipe(
      switchMap(accountId => this.afs.collection('customers').doc(accountId).collection('routes', ref => ref.where('active', '==', true)).valueChanges({ idField: 'routeId' })
      ));

    // subscribe to changes
    routesObservable.subscribe((routes: any) => {
      this.routes = routes;
    });

    const routeEditUserObservable: Observable<any>  = this.accountId$.pipe(
      switchMap(accountId => this.afs.collection('customers').doc(accountId).collection('products', ref => ref.where('active', '==', true)).valueChanges({ idField: 'productId' })
      ));

    const productsObservable: Observable<any>  = this.accountId$.pipe(
      switchMap(accountId => this.afs.collection('customers').doc(accountId).collection('products', ref => ref.where('active', '==', true)).valueChanges({ idField: 'productId' })
      ));

    const usersObservable: Observable<any>  = this.accountId$.pipe(
      switchMap(accountId => this.afs.collection('users', ref => ref.where('customerId', '==', accountId).orderBy('studentId')).valueChanges({ idField: 'uid' })
      ));

    const stopPointsObservable: Observable<any>  = this.routeId$.pipe(
      switchMap(routeId => this.afs.collection('customers').doc(this.currentSelectedCustomerId).collection('routes').doc(routeId).collection('stops', ref => ref.orderBy('order', 'asc').where('active', '==', true)).valueChanges({ idField: 'stopPointId' })
      ));

  

        // subscribe to changes
      productsObservable.subscribe((products: any) => {
        this.products = products;
      });


      stopPointsObservable.subscribe((stopPoints: any) => {
        this.stopPoints = stopPoints;
      });

      usersObservable.subscribe((usersByAccount: any) => {
        this.usersByAccount = usersByAccount;
      })
    this.getUsersList();
    this.getCustomersList();

  }

  ngOnInit() {      

    this.credentialForm = this.fb.group({
      active: [true, [Validators.required]],
      validFrom: [new Date(), [Validators.required]],
      validTo: [new Date(), [Validators.required]]
    });

    this.validateForm = this.fb.group({
      active: [true, [Validators.required]],
      amount: [0, [Validators.required]],
      authorization: [''],
      category: ['', [Validators.required]],
      conciliated: [false, [Validators.required]],
      creation_date: [new Date().toISOString(), [Validators.required]],
      currency: ['MXN', [Validators.required]],      
      customer_id: ['', [Validators.required]],
      customerId: [''],
      date_created: [new Date(), [Validators.required]],
      due_date: [new Date(), [Validators.required]],
      description: ['', [Validators.required]],
      error_message: [''],
      fee: this.fb.group({
        amount: [0],
        currency: ['MXN'],
        tax: [0]
      }),
      is_courtesy: [false],
      method: ['cash', [Validators.required]],
      name: ['', [Validators.required]],
      operation_date: [new Date().toISOString(), [Validators.required]],
      operation_type: ['in', [Validators.required]],
      order_id: [''],
      payment_method: this.fb.group({
        barcode_url: [''],
        reference: [''],
        type: ['cash']
      }),
      price: [0, [Validators.required]],
      product_description: ['', [Validators.required]],
      product_id: ['', [Validators.required]],
      round: ['', [Validators.required]],
      routeId: ['', [Validators.required]],
      routeName: ['', [Validators.required]],
      status: ['completed', [Validators.required]],
      stopDescription: ['', [Validators.required]],
      stopId: ['', [Validators.required]],
      stopName: ['', [Validators.required]],
      transaction_type: ['charge', [Validators.required]],
      validFrom: [new Date(), [Validators.required]],
      validTo: [new Date(), [Validators.required]],
      isTaskIn: [false, [Validators.required]],
      isTaskOut: [false, [Validators.required]],
      isOpenpay: [false, [Validators.required]],
      paidApp: ['web', [Validators.required]],
      realValidTo: [],
      payment: ['', [Validators.required]],
      amountPayment: [0, [Validators.required]],
      typePayment: [''],
      promiseDate: [new Date()],
      baja: [''],
      fileURL: ['']
    });
    const currentDate = new Date();
    this.validateForm.controls['promiseDate'].setValue(currentDate);
    this.validateForm.controls['validTo'].setValue('');
    this.validateForm.controls['validFrom'].setValue(currentDate);

    this.validateEditForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      displayName: [''],
      userName: ['', [Validators.required]],
      studenId: ['', [Validators.required]],
      email: ['', [Validators.required]],
      customerName: ['', [Validators.required]],
      defaultRoute: ['', [Validators.required]],
      defaultRouteName: [''],
      defaultRound: [''],
      routeId: ['', [Validators.required]],
      customerId: [''],
      phoneNumber: [''],
      defaultStopId: [''],
      defaultStopName: ['']
    });

    this.validateLiqForm = this.fb.group({
      customerId: [''],
      amount: new FormControl({value: '', disabled: true}),
      productSelected: [''],
      alreadyPayment: new FormControl({value: '', disabled: true}),
      completeAmount: new FormControl({value: '', disabled: true}),
      validFrom: [''],
      validTo: [''],
      typePayment: [''],
      fileURL: ['']
    });
  }

  sendMessage(type: string, message: string): void {
    this.msg.create(type, message);
  }
  ngOnDestroy() {
    this.hasBeenLoaded = false;
    this.loadedDevicesList = [];
    if (this.users) {
      this.users.unsubscribe();
    }
    if (this.routesSubscription) {
      this.routesSubscription.unsubscribe();
    }
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
    this.stopSubscription$.next(undefined);
    this.stopSubscription$.complete();

    if (this.customerSuscription) {
      this.customerSuscription.unsubscribe();
    }

  }

  //#region  Credenciales
  showModalCredential(): void {
    this.isModalCredentialVisible = true;
  }

  onBulkCredentialsSelected(customerId: string) {
    this.accountId$.next(customerId);
    this.currentSelectedCustomerId = customerId;
    this.isVisibleBulkCredentials = true;
  }

  createCredential() {
    if (this.credentialForm.valid) {
      const validFrom = this.credentialForm.controls['validFrom'].value || new Date();
      const validTo = this.credentialForm.controls['validTo'].value || new Date();
      const active = this.credentialForm.controls['active'].value || false;

      if (this.userlevelAccess != "3") {
        if (this.currentUserSelected && this.currentUserSelected.uid) {
          this.isCreatingCredentials = true;
        this.customersService.createCredential(this.currentUserSelected.uid, this.currentUserSelected.studentId, validFrom, validTo, active).then((response: any) => {
          this.isModalCredentialVisible = false;
        });
        this.isCreatingCredentials = false;
        this.isDone = true;
        } else {
          console.error('currentUserSelected or uid is null or undefined');
        }
        
       
      } else {
        this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
      }
    }
  }

  activateCredential(credentialId: string, paid: boolean) {
    if (this.userlevelAccess != "3") {
      if (this.currentUserSelected && this.currentUserSelected.uid) {
        this.customersService.activateCredential(this.currentUserSelected.uid, credentialId, paid);
        this.currentUserSelected.paymentId = credentialId;
      } else {
        console.error('currentUserSelected or uid is null or undefined');
      }     
    
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
  }

  deleteCredential(credentialId: string) {
    if (this.userlevelAccess == "1") {
      if (this.currentUserSelected && this.currentUserSelected.uid) {
        this.customersService.deleteCredential(this.currentUserSelected.uid, credentialId);
      this.isBoardingPassSelected = false;
      } else {
        console.error('currentUserSelected or uid is null or undefined');
      }
      
     
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para borrar datos, favor de contactar al administrador.");
    }
  }


  getUserCredentials(userId: string) {
    this.loadingUserCredentials = true;
    this.customersService.getUserCredentials(userId)
      .subscribe(userCredentials => {

        this.userCredentials = userCredentials;
        this.loadingUserCredentials = false;
      }, err => {
        this.userCredentials = null;
        this.loadingUserCredentials = false;
      });
  }

  currentCredentialsPageDataChange($event: any): void {
    this.listOfCredentialsDisplayData = $event;
    this.refreshCredentialsStatus();
  }

  refreshCredentialsStatus(): void {
    this.isCredentialsAllDisplayDataChecked = this.usersByAccount.every((item: { uid: string | number; }) => this.mapOfCredentialsCheckedId[item.uid]);
    this.isCredentialsIndeterminate =
      this.usersByAccount.some((item: { uid: string | number; }) => this.mapOfCredentialsCheckedId[item.uid]) && !this.usersByAccount;
  }

  checkCredentialsAllData(value: boolean): void {
    this.usersByAccount.forEach((item: { uid: string | number; }) => (this.mapOfCredentialsCheckedId[item.uid] = value));
  }

  checkCredentialsValidBoardingPass(value: boolean): void {
    this.usersByAccount.forEach((item: { uid: string; }) => {
      this.customersService.getLatestValidUserPurchases(item.uid).pipe(
        take(1),
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        })),
        tap((boardingPasses:any) => {
          this.mapOfCredentialsCheckedId[item.uid] = boardingPasses.length > 0;
        })
      ).subscribe();
    });
  }


  createMultipleCredentials() {
    this.current++;
    const validFrom = this.credentialForm.controls['validFrom'].value || new Date();
    const validTo = this.credentialForm.controls['validTo'].value || new Date();
    const active = this.credentialForm.controls['active'].value || false;

    if (this.userlevelAccess != "3") {
      this.isCreatingCredentials = true;
      this.selectedUsersForCredentials.forEach((user:any) => {
        this.customersService.createCredential(user.uid, user.studentId, validFrom, validTo, active).then((response: any) => {

        });
      });
      this.isCreatingCredentials = false;
      this.isDone = true;
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
  }
  //#endregion

  //#region Products and users methods
  showModalProduct(): void {
    this.isProductVisible = true;
  }


  onProductSelected(event: any, products: any) {
    const recordArray = _.filter(products, p => {
      return p.productId == event;
    });
    const record = recordArray[0];
    this.validateForm.controls['name'].setValue(record.name);
    this.validateForm.controls['description'].setValue(record.description);
    this.validateForm.controls['product_description'].setValue(record.description);
    this.validateForm.controls['amount'].setValue(record.price);
    this.validateForm.controls['is_courtesy'].setValue(false);
    this.validateForm.controls['price'].setValue(record.price);
    this.validateForm.controls['category'].setValue(record.category);
    this.validateForm.controls['validFrom'].setValue(record.validFrom.toDate());
    this.validateForm.controls['validTo'].setValue(record.validTo.toDate());
    this.validateForm.controls['realValidTo'].setValue((record.validTo.toDate()).toISOString());
    this.validateForm.controls['isTaskIn'].setValue(record.isTaskIn);
    this.validateForm.controls['isTaskOut'].setValue(record.isTaskOut);
  }

  getUsersList() {
    this.isLoadingUsers = true;   
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      this.usersCollection = this.afs.collection<any>('users', ref => 
        ref.where('customerId', '==', this.user.customerId).orderBy('displayName'));
      this.users = this.usersCollection.snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe(users => {
        this.loadUsers(users);
      });
    } else {  
      this.usersCollection = this.afs.collection<any>('users', ref => ref.orderBy('displayName'));
      this.users = this.usersCollection.snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe(users => {
        this.loadUsers(users);
      });
  }
  
  }


  setUserDisabled(disabled: boolean) {
    if (this.userlevelAccess != "3") {
      if (this.currentUserSelected && this.currentUserSelected.uid) {
        this.customersService.setUserDisabled(this.currentUserSelected.uid, disabled);
        this.currentUserSelected.disabled = disabled;
      } else {
        console.error('currentUserSelected or uid is null or undefined');
      }     
    
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
  }


  loadUsers(users: any) {
    if (this.loadedDevicesList.length <= 1) {
      this.displayData = users;
      this.devicesList = users.slice().sort((a: any, b: any) => {
        return a.displayName.localeCompare(b.displayName);
      });
      this.loadedDevicesList = this.devicesList;
      
    }
  }

  userSelected(data: { uid: string; studentId: string; paymentId: string; disabled: any; customerId: string; firstName: any; photoURL:any;
    lastName: any; email: any; phoneNumber: any; status: string; id: string; token: any; defaultRoute: any; emailVerified:any ;
    turno: string; roundTrip: string;
     displayName: any; userName: any; customerName: any; defaultRound: any; defaultRouteName: any; defaultStopName: any; defaultStopId: any; } ) {   
    this.currentUserSelected = data;
    this.currentSelectedCustomerId = this.currentUserSelected.customerId;

    this.accountId$.next(this.currentUserSelected.customerId);
    this.isUserSelected = true;
    this.isBoardingPassSelected = false;
    this.getLatestPurchases(data.uid);
    this.getLastestPurchaseRequest(data.uid);
    this.getUserCredentials(data.uid);
    this.getUserChatMessages(data.uid);
    this.lastPurchase = undefined;
    this.productsReference = null;

  }

  copyDataToUserCollection() {
    if (this.userlevelAccess != "3") {
      if (this.currentUserSelected && this.currentUserSelected.uid) {
        this.customersService.saveOldBoardingPassToUserCollection(this.currentUserSelected.paymentId);
      } else {
        console.error('currentUserSelected or uid is null or undefined');
      }
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
  }

  getUserChatMessages(userId: string) {
    this.loadingChatMessages = true;
    this.dashboardService.getUserChatMessages(userId, 10)
      .subscribe(userChatMsn => {
        this.userChatMessageData = userChatMsn;
      });
  }

  //#endregion


  //#region  Purchases and Payments
  onBulkBoardingPassSelected(customerId: string ) {
    this.accountId$.next(customerId);
    this.currentSelectedCustomerId = customerId;
    this.isVisibleBulk = true;
  }

  onCourtesyChange(isCourtesy: boolean) {
    if (isCourtesy) {
      this.validateForm.controls['amount'].setValue(0);
    }
  }

  onAmountChange(amount: number) {
    if (amount > 0) {
      this.validateForm.controls['is_courtesy'].setValue(false);
    }
  }

  onCanUpdatePayment() {
    this.canUpdatePayment = true;

    //Send info to liquidacion 
    if (this.lastPurchase !== undefined) {
      var amountPayment = Number(this.lastPurchase.amountPayment);
      var amount = Number(this.lastPurchase.amount);
      this.validateLiqForm.controls['productSelected'].setValue(this.lastPurchase.name);
      this.validateLiqForm.controls['alreadyPayment'].setValue(amountPayment);
      this.validateLiqForm.controls['amount'].setValue(amount);
  
      this.validateLiqForm.controls['completeAmount'].setValue(amount - amountPayment);
      this.validateLiqForm.controls['validFrom'].setValue(this.lastPurchase.validFrom.toDate());
      this.productSelectedValue = this.lastPurchase.name;
  } else {
      console.error('lastPurchase is undefined');
  }   
  }

  createLiquidacion() {
    // this.msg.info("Creacion de Complemento de Pago");

    const validTo = this.validateLiqForm.controls['validTo'].value || new Date();
    const typePayment = this.validateLiqForm.controls['typePayment'].value;
  
    if (this.lastPurchase !== undefined) {
      const purchId = this.lastPurchase ? String(this.lastPurchase.id) : undefined;
      
    if (validTo == "") {
      this.msg.error("Se requiere  seleccionar una fecha de terminación de pase de abordar.");
    } else {
      if (typePayment == "") {
        //TODO  create document. for file.
        this.msg.error("Se requiere  seleccionar un tipo de referencia.");
      } else {
        if (this.currentUserSelected && this.currentUserSelected.uid) {
          var advanceForm: object;
        var fileinfoURL = this.validateLiqForm.controls['fileURL'].value || "";

        const send = {
         
          authorization: "portalAuth",
          operation_type: "in",
          method: this.validateLiqForm.controls['payment'].value,
          transaction_type: "charge",
          card:
          {
            type: '',
            brand: '',
            address: '',
            card_number: '',
            holder_name: '',
            expiration_year: '',
            expiration_month: '',
            allows_charges: '',
            allows_payouts: '',
            bank_name: '',
            bank_code: '',
            points_card: '',
            points_type: '',
          },
          status: 'completed',// 'awaiting confirmation',
          conciliated: false,
          creation_date: new Date().toISOString(),
          operation_date: new Date().toISOString(),
          description: "Liquidación a traves del portal",
          error_message: "",
          order_id: "portalOrder",
          currency: "MXN",
          amount: this.validateLiqForm.controls['amountPayment'].value,
          customer:
          {
            name: this.currentUserSelected.firstName,
            last_name: this.currentUserSelected.lastName,
            email: this.currentUserSelected.email,
            phone_number: this.currentUserSelected.phoneNumber,
            address: "",
            creation_date: "",
            external_id: "",
            clabe: ""
          },
          customerId : this.currentUserSelected.customerId ,
          active: true,
          category: "permanente",
          date_created: new Date().toISOString(),
          product_description: "Liquidación a traves del portal",
          product_id: this.validateLiqForm.controls['product_id'].value,
          name: this.validateLiqForm.controls['name'].value,
          isTaskIn: 'false',
          isTaskOut: 'false',
          type: "Servicio",
          isOpenpay: false,
          paidApp: 'portal',
          price: this.lastPurchase.price,
          round: this.validateLiqForm.controls['round'].value,
          routeId: this.validateLiqForm.controls['routeId'].value,
          routeName: this.validateLiqForm.controls['routeName'].value,
          stopDescription: '',
          stopId: this.validateLiqForm.controls['stopId'].value,
          stopName: this.validateLiqForm.controls['stopDescription'].value,
          validFrom: this.validateLiqForm.controls['validFrom'].value,
          validTo: validTo,
          idBoardingPass: this.currentUserSelected.uid,
          idPurchasteRequest: '',
          is_courtesy: false,
          typePayment: typePayment
        }

        advanceForm = {
          active: true,
          amountPayment: this.validateLiqForm.controls['completeAmount'].value,
          payment: "Liquidacion",
          status: this.validateForm.controls['status'].value,
          customer_id: this.currentUserSelected.customerId,
          creation_date: this.validateForm.controls['creation_date'].value,
          name: this.lastPurchase.name,
          price: this.lastPurchase.price,
          operation_date: this.validateForm.controls['operation_date'].value,
          routeId: this.lastPurchase.routeId,
          routeName: this.lastPurchase.routeName,
          round: this.lastPurchase.round,
          stopName: this.validateForm.controls['stopDescription'].value,
          stopId: this.validateForm.controls['stopId'].value,
          typePayment: typePayment,
          validFrom: this.validateForm.controls['validFrom'].value,
          idBoardingPass: this.currentUserSelected.uid,
          idPurchasteRequest: '',
          baja: false,
          validTo: validTo,
          type: "Servicio",
          fileURL: fileinfoURL
        };
         if (this.userlevelAccess != "3") {
          if (purchId !== undefined) {
            this.customersService.saveBoardingPassDetailToUserPurchaseCollection(this.currentUserSelected.uid, purchId, send)
            .then((success) => {
   
             this.msg.success("El registro se hizo con exito");
             if (this.lastPurchase && this.lastPurchase.realValidTo !== undefined) {
              const validTo = new Date(this.lastPurchase.realValidTo);
              this.lastPurchase.validTo = Timestamp.fromDate(validTo);

              this.lastPurchase.status = 'completed';
              this.lastPurchase.active = true;
              
              this.lastPurchase.typePayment = this.validateLiqForm.controls['typePayment'].value;
              this.lastPurchase.status = 'completed';
              this.lastPurchase.price = this.validateLiqForm.controls['amount'].value;
              this.lastPurchase.amountPayment = this.validateLiqForm.controls['amount'].value;
              this.lastPurchase.payment = "Liquidacion";

              let status = this.currentUserSelected.status;             
              if (status == "preRegister") {
                this.userService.updateUserPreRegister(this.currentUserSelected.uid, status);
              }

              this.customersService.createPurchaseCloud(send,this.currentUserSelected, purchId);              
              this.customersService.updateBoardingPassToUserPurchaseCollection(this.currentUserSelected.uid, this.lastPurchase)
                .then((success) => {
                  this.msg.success("Se actualizo el pase de abordar");
                  this.canUpdatePayment = false;
                }).catch((err) => { this.isConfirmLoading = false; });


                console.log("333");
              }
            }).catch((err) => { console.log("error"); });

          // reflect information on fields..
          //TODO
        } else {
            console.error('lastPurchase id is undefined');
        }
         

        } else {
          this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
        } 
        } else {
          console.error('currentUserSelected or uid is null or undefined');
        }
        
       
      }
    }
  } else {
      console.error('lastPurchase is undefined');
  }

  }

  onPaymentUpdated(event: number) {
    if (this.lastPurchase !== undefined) {
    if (+this.lastPurchase.price === event) {

      this.lastPurchase.status = 'completed';
      this.lastPurchase.amount = event;
      this.lastPurchase.active = true;
      if (this.lastPurchase?.realValidTo !== undefined) {
        const validToDate = new Date(this.lastPurchase.realValidTo);
      this.lastPurchase.validTo = Timestamp.fromDate(validToDate);
    }     
    } else {
      this.lastPurchase.amount = event;
    }
    if (this.userlevelAccess != "3") {
      if (this.currentUserSelected && this.currentUserSelected.uid) {
        this.customersService.updateBoardingPassToUserPurchaseCollection(this.currentUserSelected.uid, this.lastPurchase)
        .then((success) => {
          this.isVisible = false;
          this.isConfirmLoading = false;
        }).catch((err) => { this.isConfirmLoading = false; });
      this.canUpdatePayment = false;
      } else {
        console.error('currentUserSelected or uid is null or undefined');
      }      
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
  }
  }

  getLastPurchase(purchaseId: string) {
    this.loadingLastPurchase = true;
    this.lastPurchase = undefined;
    this.customersService.getLastPurchase(purchaseId).valueChanges().subscribe(purchase => {
      this.lastPurchase = purchase;
      this.productsReference = purchase;
      this.loadingLastPurchase = false;
    }, err => {
      this.loadingLastPurchase = false;
      this.lastPurchase = undefined;
      this.productsReference = null;
    });

    // Search for the Route defaul defaultRoute defaultRouteName , 
  }

  activatePurchase(purchaseId: string, paid: boolean) {
    if (this.currentUserSelected && this.currentUserSelected.uid) {       
    this.customersService.activatePurchase(this.currentUserSelected.uid, purchaseId, paid);
    this.currentUserSelected.paymentId = purchaseId;
    } else {
      console.error('currentUserSelected or uid is null or undefined');
    } 
  }

  deletePurchase(purchaseId: string) {   
    if (this.currentUserSelected && this.currentUserSelected.uid) {
      this.customersService.deletePurchase(this.currentUserSelected.uid, purchaseId);
    this.isBoardingPassSelected = false;

    this.userService.updateUserPreRegister(this.currentUserSelected.uid, this.currentUserSelected.status);
    } else {
      console.error('currentUserSelected or uid is null or undefined');
    }
  }
  getLatestPurchases(userId: string) {
    this.loadingLatestPurchases = true;
    this.customersService.getLatestUserPurchases(userId, 10).pipe(
      map((actions:any) => actions.map((a:any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as IBoardingPass;
        return { id, ...data };
      }))
    )
      .subscribe(latestPurchases => {

        this.latestPurchases = latestPurchases;      
        this.loadingLatestPurchases = false;
      }, err => {
        this.latestPurchases = null;
        this.loadingLatestPurchases = false;
      });
  }

  getLastestPurchaseRequest(userId: string){
    this.loadinglatestPurRequest = true;
    this.customersService.getLatestUserPurchasesRequest(userId, 10).pipe(
      map((actions:any) => actions.map((a:any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as IBoardingPass;
        return { id, ...data };
      }))
    )
      .subscribe(latestPurchasesR => {

        this.latestPurRequest = latestPurchasesR;      
        this.loadinglatestPurRequest = false;
      }, err => {
        this.latestPurRequest = null;
        this.loadinglatestPurRequest = false;
      });
  }

  getLatestPurchaseDetail(userId: string, purchaseId: string ) {
    this.customersService.getLatestUserPurchaseDetail(userId, 10, purchaseId).pipe(
      map((actions:any) => actions.map((a:any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as IBoardingPass;
        return { id, ...data };
      }))
    )
      .subscribe(lastestPurchaseDetail => {
        this.lastestPurchaseDetail = lastestPurchaseDetail;
      }, err => {
        this.lastestPurchaseDetail = null;
      });
  }

  reassingBoardingPass(id: any, set: any) {

    if (this.userlevelAccess != "3") {
      if (this.currentUserSelected && this.currentUserSelected.uid) {
        if (this.lastPurchase !== undefined) {
        const purchaseId = this.lastPurchase.id;
        const uid: string = this.currentUserSelected.uid;
        const boardingPassRef = this.afs.collection('users').doc(this.currentUserSelected.id).collection('boardingPasses').doc(this.lastPurchase.id);
        boardingPassRef.set(this.lastPurchase).then((response) => {
          const oldBoardingPassRef = this.afs.collection('users').doc(uid).collection('boardingPasses').doc(purchaseId);
          oldBoardingPassRef.delete();
        });
      }
      } else {
        console.error('currentUserSelected or uid is null or undefined');
      }
      
     
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para borrar datos, favor de contactar al administrador.");
    }
  }

  bajaBoardingPass(id: string, set: any) {
    if (this.currentUserSelected && this.currentUserSelected.uid) {
      const boardingPassRef = this.afs.collection('users').doc(this.currentUserSelected.id).collection('boardingPasses').doc(id);
    const updatedData = {
      baja: true,
    };
    boardingPassRef.update(updatedData).then((response) => {
    }).catch((error) => {
      this.sendMessage('error: ', error);
    });
    } else {
      console.error('currentUserSelected or uid is null or undefined');
    }    
  }
  boardingPassSelected(purchase: IBoardingPass) {
    if (this.currentUserSelected) {
      this.isBoardingPassSelected = true;
      this.lastPurchase = purchase;
      this.productsReference = purchase;
    }
  }


  createMultipleBoardingPasses() {
    this.isCreatingBoardingPasses = true;
    setTimeout(() => {
      this.isCreatingBoardingPasses = false;
      this.isDone = true;
    }, 2000);
  }


  //#endregion

  //#region Multiple Methods
  showModal(): void {
    this.isVisible = true;

  }

  showModalEditUser(currentUserSelected: { firstName: any; lastName: any; displayName: any; userName: any;
     studentId: any; email: any; customerId: any; customerName: any; phoneNumber: any; defaultRound: any; 
     defaultRoute: any; defaultRouteName: any; defaultStopId: any; defaultStopName: any; }) {
    this.isEditUserVisible = true;

    this.validateEditForm.controls['firstName'].setValue(currentUserSelected.firstName);
    this.validateEditForm.controls['lastName'].setValue(currentUserSelected.lastName);
    this.validateEditForm.controls['displayName'].setValue(currentUserSelected.displayName);
    this.validateEditForm.controls['userName'].setValue(currentUserSelected.userName);
    this.validateEditForm.controls['studenId'].setValue(currentUserSelected.studentId);
    this.validateEditForm.controls['email'].setValue(currentUserSelected.email);
    this.validateEditForm.controls['customerId'].setValue(currentUserSelected.customerId);
    this.validateEditForm.controls['customerName'].setValue(currentUserSelected.customerName);
    this.validateEditForm.controls['phoneNumber'].setValue(currentUserSelected.phoneNumber);
    this.validateEditForm.controls['defaultRound'].setValue(currentUserSelected.defaultRound);

    this.fillCustomerRouteEditUser(currentUserSelected.customerId);
    this.fillStopsEditUser(currentUserSelected.customerId, currentUserSelected.defaultRoute);
    this.validateEditForm.controls['routeId'].setValue(currentUserSelected.defaultRoute);
    this.validateEditForm.controls['defaultRoute'].setValue(currentUserSelected.defaultRoute);
    this.validateEditForm.controls['defaultRouteName'].setValue(currentUserSelected.defaultRouteName);
    this.validateEditForm.controls['defaultStopId'].setValue(currentUserSelected.defaultStopId);
    this.validateEditForm.controls['defaultStopName'].setValue(currentUserSelected.defaultStopName);

  }

  fillCustomerRouteEditUser(customerID: string) {
    this.routesService.getRoutes(customerID).pipe(
      takeUntil(this.stopSubscription$),
      map((actions:any) => actions.map((a:any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      })))
      .subscribe((routes: IStopPoint[]) => {
        this.userRoutes = routes;
      });
  }

  fillStopsEditUser(customerId: string, routeId: string) {

    this.routesService.getRouteStopPoints(customerId, routeId).pipe(
      takeUntil(this.stopSubscription$),
      map((actions:any) => actions.map((a:any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as IStopPoint;
        return { ...data, id }; // Ensure id is not spread again       
      })))
      .subscribe((stopPoints: IStopPoint[]) => {
        this.stopPointsList = stopPoints;
      });

  }

  async showModalMessageCenter() {
    if (this.currentUserSelected && this.currentUserSelected.uid) {
      // send menssage to sender..   
    const dataMessage = {
      createdAt: new Date(),
      from: 'FyXKSXsUbYNtAbWL7zZ66o2f1M92',
      fromName: 'Apps And Informa',
      msg: this.newMessage,
      requestId: 'suhB7YFAh6PYXCRuJhfD',
      token: this.currentUserSelected.token,
      uid: this.currentUserSelected.uid,
      result: ""
    }
    const notifMessage = {
      timestamp: new Date(),
      title: 'Apps And Informa General',
      from: 'FyXKSXsUbYNtAbWL7zZ66o2f1M92',
      requestId: 'suhB7YFAh6PYXCRuJhfD',
      body: this.newMessage,
      token: this.currentUserSelected.token, // 'dXf-sDaPH4U:APA91bGiTZ1H8jzNXEexZW65A8QUzNOqV77-vKquP6qZ535IyWWQ7m0PUFCI-3g-qXRvrvuo8-VJgkwF317YHegZh6oNUCHlylU1PoA_aM_5bJw44xNUChtV1sO30ge4VSx6MK2InIzr',//eachUserMessage.token,
      uid: this.currentUserSelected.uid//'RgNnO7ElJgdThoKh8rUvrpb2EhH2'
    }
    this.dashboardService.setMessage(notifMessage, this.currentUserSelected.uid);

    this.dashboardService.setChatMessage(dataMessage)
      .then(() => {
        this.newMessage = "";
      });
    } else {
      console.error('currentUserSelected or uid is null or undefined');
    }
    
  }

  onRouteEditUserSelected(event: string , routes: any) {
    if (event != null && event != '') {
      const recordArray = _.filter(routes, r => {
        return r.routeId == event;
      });
      const record = recordArray[0];
      if (this.currentUserSelected && this.currentUserSelected.uid) {
        this.validateEditForm.controls['defaultRouteName'].setValue(record.name);
        const oldCustomer = this.currentUserSelected.customerId;
        const oldRoute = this.currentUserSelected.defaultRoute;
  
        if (oldCustomer != this.newCustomerIdEditMode && oldRoute != record.routeId) {
          this.newRouteIdEditeMode = record.routeId;
          this.fillStopsEditUser(this.newCustomerIdEditMode, record.routeId);
        }
        else {
          this.newRouteIdEditeMode = oldRoute;
        }
      } else {
        console.error('currentUserSelected or uid is null or undefined');
      }
    }
  }

  onRouteSelected(event: string, routes: any) {
    this.routeId$.next(event);
    const recordArray = _.filter(routes, r => {
      return r.routeId == event;
    });
    const record = recordArray[0];
    this.validateForm.controls['routeName'].setValue(record.name);

  }

  onStopPointEditUserSelected(event: string , stopPointsList: any) {
    if (event != null && event != '') {

      const recordArray = _.filter(stopPointsList, s => {
        return s.id == event;
      });

      const record1 = recordArray[0];
      this.validateEditForm.controls['defaultStopName'].setValue(record1.name);

      if (this.newCustomerIdEditMode != "") {
        this.resetClientEditInfo = true;
      }
    }
  }

  onStopPointSelected(event: any, stoppoints: any) {
    const recordArray = _.filter(stoppoints, s => {
      return s.stopPointId == event;
    });
    const record = recordArray[0];
    this.validateForm.controls['stopName'].setValue(record.name);
    this.validateForm.controls['stopDescription'].setValue(record.description);
  }

  onCustomerSelected(event: any, customers: any) {

    this.resetClientEditInfo = false;
    if (event != null) {
      const recordArray = _.filter(customers, r => {
        return r.uid == event;
      });
      const record = recordArray[0];
      if (this.currentUserSelected && this.currentUserSelected.uid) {
        this.validateEditForm.controls['customerName'].setValue(record.name);
        const oldCustomer = this.currentUserSelected.customerId;
  
        if (oldCustomer != record.uid) {
          this.newCustomerIdEditMode = record.uid;
          this.fillCustomerRouteEditUser(record.uid);
        }
        else {
          this.newCustomerIdEditMode = "";
        }
      } else {
        console.error('currentUserSelected or uid is null or undefined');
      }      
    }
  }


  onCanUpdateValidTo() {
    this.canUpdateValidTo = true;
  }
  onValidToUpdated(event: any) {
    this.canUpdateValidTo = false;
  }
  handleOk(): void {
    this.isConfirmLoading = true;

    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleBulk = false;
    this.isVisibleBulkCredentials = false;
    this.isModalCredentialVisible = false;
    this.isEditUserVisible = false;
    this.isVisiblePurchasePay = false;
    this.canUpdatePayment = false;
  }

  handleCancelProduct(): void {
    this.isProductVisible = false;
  }
  refreshList() {
    this.hasBeenLoaded = false;
    this.getUsersList();
  }


  getItems(searchbar: any) {
    this.initializeItems();
    const q = searchbar;
    if (!q) { return; }
    const text = toLower(q);
    this.devicesList = filter(this.devicesList, (object: any) => {
        return some(object, (string: any) => {
            return toLower(string).includes(text);
        });
    });
}

  initializeItems() {
    this.devicesList = this.loadedDevicesList;
  }

  showDeleteConfirm(): void {
    if (this.currentUserSelected && this.currentUserSelected.uid) {
      const uid: string = this.currentUserSelected.uid;
      this.modalService.confirm({
        nzTitle: '¿Está seguro de eliminar esta cuenta?',
        nzContent: '<b style="color: red;">Toda la información relacionada a esta cuenta será eliminada permanentemente.</b>',
        nzOkText: 'Eliminar',
        nzOnOk: () => {
          this.customersService.deleteUser(uid);
          this.currentUserSelected = {
            uid: '',
            studentId: '',
            emailVerified: '',
            paymentId: '',
            turno: '', 
            roundTrip: '',
            disabled: null,
            customerId: '',
            firstName: '',
            lastName: '',
            email: '',
            photoURL : '',
            phoneNumber: '',
            status: '',
            id: '',
            token: '',
            defaultRoute: '',
            displayName: '',
            userName: '',
            customerName: '',
            defaultRound: '',
            defaultRouteName: '',
            defaultStopName: '',
            defaultStopId: ''
        };
          this.isUserSelected = false;
        },
        nzCancelText: 'No',
        nzOnCancel: () => console.log('Cancel')
      });
    } else {
      console.error('currentUserSelected or uid is null or undefined');
    }   
   
  }
  getCustomersList() {

    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      const customersCollection = this.afs.collection('customers', ref => ref
        .where('customerId', '==', this.user.customerId).orderBy('name'));
      customersCollection.snapshotChanges().pipe(
        takeUntil(this.stopSubscription$),
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        })),
        tap((customers:any) => {
          this.customersList = customers;
          return customers;
        })
      ).subscribe();
        
    } else {
      const customersCollection = this.afs.collection('customers', ref => ref.orderBy('name'));
      customersCollection.snapshotChanges().pipe(
        takeUntil(this.stopSubscription$),
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        })),
        tap((customers:any) => {
          this.customersList = customers;
          return customers;
        })
      ).subscribe();
    }
  }
  currentPageDataChange($event: any ): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.devicesList.every((item: { id: string | number; }) => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.devicesList.some((item: { id: string | number; }) => this.mapOfCheckedId[item.id]) && !this.devicesList;
  }

  checkAllData(value: boolean): void {
    this.devicesList.forEach((item: { id: string | number; }) => (this.mapOfCheckedId[item.id] = value));
  }
  //#endregion

  //#region  Submit forms
  submitForm(): void {

    // Validations
    const resultValidations = this.validateSubmit();

    if (resultValidations) {
      //this.msg.success("result " + resultValidations);
      var advanceForm: object;
      var purchaseRequest: object;
      if (this.currentUserSelected && this.currentUserSelected.uid) {
        const uid: string = this.currentUserSelected.uid;
        this.validateForm.controls['customer_id'].setValue(this.currentUserSelected.customerId);
        this.validateForm.controls['customerId'].setValue(this.currentUserSelected.customerId);
        let amount = this.validateForm.controls['amount'].value; //Total a pagar
        const paymentSelected = this.validateForm.controls['payment'].value;  //Mensualidad, Anticipo , Liquidacion
        if (paymentSelected == "Anticipo") {
          amount = this.validateForm.controls['amountPayment'].value; //Cantidad a Pagar.
        }
        const price = this.validateForm.controls['price'].value;
        const validTo = this.validateForm.controls['validTo'].value || new Date();
        const isCourtesy = this.validateForm.controls['is_courtesy'].value || false;
        this.validateForm.controls['due_date'].setValue(validTo.toISOString());
        if (amount != price && !isCourtesy) {
          this.validateForm.controls['status'].setValue('partial');
        }
        var promiseDateValue = this.validateForm.controls['promiseDate'].value || "";
        var creation_date = this.validateForm.controls['creation_date'].value.toString(); // this.validateForm.controls['creation_date'].value;
        const typePaymentValue = this.validateForm.controls['typePayment'].value; // Transferencia, efectivo, Sistema
  
        if (paymentSelected == "Mensualidad") {
          //if is mensualidad the promiseDate sould be last of month
          const validTo = this.validateForm.controls['validTo'].value || new Date();
          promiseDateValue = validTo;
        }
  
        for (const i in this.validateForm.controls) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
        }
        if (this.validateForm.valid) {  //TODO
          this.isConfirmLoading = true;
          var fileinfoURL = this.validateForm.controls['fileURL'].value || "";
          const send = {
           
            authorization: "portalAuth",
            operation_type: "in",
            method: this.validateForm.controls['payment'].value,
            transaction_type: "charge",
            card:
            {
              type: '',
              brand: '',
              address: '',
              card_number: '',
              holder_name: '',
              expiration_year: '',
              expiration_month: '',
              allows_charges: '',
              allows_payouts: '',
              bank_name: '',
              bank_code: '',
              points_card: '',
              points_type: '',
            },
            status:  this.validateForm.controls['status'].value,
            conciliated: false,
            creation_date: creation_date,// new Date().toISOString(),          
            operation_date: new Date().toISOString(),
            description: "Pago a traves de portal",
            error_message: "",
            order_id: "portalOrder",
            currency: "MXN",
            amount: this.validateForm.controls['amountPayment'].value,
            customer:
            {
              name: this.currentUserSelected.firstName,
              last_name: this.currentUserSelected.lastName,
              email: this.currentUserSelected.email,
              phone_number: this.currentUserSelected.phoneNumber,
              address: "",
              creation_date: "",
              external_id: "",
              clabe: ""
            },
            customerId: this.currentUserSelected.customerId ,
            active: true,
            category: "permanente",
            date_created: new Date().toISOString(),
            product_description: "Pago a traves de portal",
            product_id: this.validateForm.controls['product_id'].value,
            name: this.validateForm.controls['name'].value,
            isTaskIn: 'false',
            isTaskOut: 'false',
            type: "Servicio",
            isOpenpay: false,
            paidApp: 'portal',
            price: price,
            round: this.validateForm.controls['round'].value,
            routeId: this.validateForm.controls['routeId'].value,
            routeName: this.validateForm.controls['routeName'].value,
            stopDescription: '',
            stopId: this.validateForm.controls['stopId'].value,
            stopName: this.validateForm.controls['stopDescription'].value,
            validFrom: this.validateForm.controls['validFrom'].value,
            validTo: validTo,
            idBoardingPass: this.currentUserSelected.uid,
            idPurchasteRequest: '',
            is_courtesy: false,
            typePayment: paymentSelected
          }
  
          if (this.userlevelAccess != "3") {
            advanceForm = {
              active: true,
              amountPayment: amount,
              payment: paymentSelected,
              status: this.validateForm.controls['status'].value,
              customer_id: this.currentUserSelected.customerId,
              customerId: this.currentUserSelected.customerId,
              creation_date: creation_date,
              name: this.validateForm.controls['name'].value,
              price: price,
              operation_date: this.validateForm.controls['operation_date'].value,
              routeId: this.validateForm.controls['routeId'].value,
              routeName: this.validateForm.controls['routeName'].value,
              round: this.validateForm.controls['round'].value,
              stopName: this.validateForm.controls['stopDescription'].value,
              stopId: this.validateForm.controls['stopId'].value,
              typePayment: typePaymentValue,
              validFrom: this.validateForm.controls['validFrom'].value,
              validTo: validTo,
              idBoardingPass: this.currentUserSelected.uid,
              idPurchaseRequest: '',
              baja: false,
              type: "Servicio",
              fileURL: fileinfoURL
            };
            this.customersService.saveBoardingPassToUserPurchaseCollection(this.currentUserSelected.uid, send) // this.validateForm.value)
              .then((success) => {
                this.isVisible = false;
                this.isConfirmLoading = false;
                this.customersService.getLatestValidUserPurchasesAdvance(uid, 2, promiseDateValue, paymentSelected, creation_date).pipe(
                  take(1),
                  map((actions:any) =>
                    actions.map((a:any) => {
                      const data = a.payload.doc.data() as any;
                      const id = a.payload.doc.id;
                      return { id, ...data };
                    })
                  )
                )
                  .subscribe((routes) => {                 
                        this.customersService.saveBoardingPassDetailToUserPurchaseCollection(uid, routes[0].id, send)
                          .then((success) => {
                            this.sendUser = send;
                            console.log(routes[0].id);
                            this.idBoardingPass = routes[0].id;
                            this.purchaseActive = true;
                            
                            this.customersService.createPurchaseCloud(this.sendUser,this.currentUserSelected,this.idBoardingPass);
                            console.log("salio");
                          }).catch((err) => { console.log("error"); });                
                  }, (error) => {
                    console.log(error);
                  })
              }).catch((err) => { this.isConfirmLoading = false; });
          }
          else {
            this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
          }
        }
      } else {
        console.error('currentUserSelected or uid is null or undefined');
      }
      
      
    }
  }


  submitReceipt(){

     // this.customersService.createPurchaseCloud(this.sendUser,this.currentUserSelected,this.idBoardingPass);
  }
  async createPurchaseRequest(userID: string, purchaseDetail: any) {
    const newId = this.afs.createId();
    const user = this.afs.collection('users').doc(userID).collection("purchaseRequests").doc(newId).set(purchaseDetail)
      .then(() => {
        console.log('Purchase Request  successfully written!');
        return newId;
      })
      .catch((error) => {
        console.error('Error writing document: ', error);

        return "";
      });
  }


  validateSubmit() {
    const productSelected = this.validateForm.controls['product_id'].value;
    if (productSelected == "") {
      this.msg.error('Es necesario seleccionar un producto, favor de validar.');
      return false;
    }

    const roundSelected = this.validateForm.controls['round'].value;
    if (roundSelected == "") {
      this.msg.error('Es necesario seleccionar un turno, favor de validar.');
      return false;
    }
    const paymentSelected = this.validateForm.controls['payment'].value;  //Mensualidad, Anticipo , Liquidacion
    if (paymentSelected == "") {
      this.msg.error('Es necesario seleccionar un Tipo de Pago, favor de validar.');
      return false;
    }
    const promiseDateValue = this.validateForm.controls['promiseDate'].value; // TODO


    const validTo = this.validateForm.controls['validTo'].value;
    const validFrom = this.validateForm.controls['validFrom'].value;
    // validate when is anticipo from must be from 1 to max 15 of month selected
    if (paymentSelected == "Anticipo") {
      if (promiseDateValue == "") {
        this.msg.error('Al seleccionar anticipo es necesario proporcionar una fecha compromiso, favor de validar.');
        return false;
      }
    }
    const amountPaymentValue = this.validateForm.controls['amountPayment'].value;
    const amountValue = this.validateForm.controls['amount'].value;
    if (amountPaymentValue == "0") {
      this.msg.error('Es necesario porporcionar una cantidad a pagar, favor de validar.');
      return false;
    } else if (amountValue < amountPaymentValue) {
      this.msg.error('La cantidad a pagar es mayor al total a pagar, favor de validar.');
      return false;
    } else if (paymentSelected == 'Mensualidad' && amountValue != amountPaymentValue) {
      this.msg.error('La cantidad a pagar debe ser igual al total a pagar ya se que selecciono el tipo de pago Mensualidad, favor de validar.');
      return false;
    }
    const typePaymentValue = this.validateForm.controls['typePayment'].value; // Transferencia, efectivo, Sistema
    if (typePaymentValue == "") {
      this.msg.error('Es necesario seleccionar un tipo de Referencia, favor de validar.');
      return false;
    } else if (typePaymentValue == "Sistema" && paymentSelected == "Anticipo") {
      this.msg.error('No puedes seleccionar el tipo de referencia Sistema,si estas generando un anticipo, favor de validar.');
      return false;
    }
    if (typePaymentValue == "Transferencia") {
      if (this.fileListInfo['name'] == undefined) {
        this.msg.error('Es necesario tener un comprobante anexado al pago, favor de agregar uno.');
        return false;
      }
    }
    return true;
  }

  calculateDiff(from: string | number | Date, todate: string | number | Date) {
    let date = new Date(from);
    let currentDate = new Date(todate);

    let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

  submitEditForm(): void {
    if (this.currentUserSelected && this.currentUserSelected.uid) {
     
      const customerId = this.validateEditForm.controls['customerId'].value == undefined ? "" : this.validateEditForm.controls['customerId'].value;
      const customerName = this.validateEditForm.controls['customerName'].value == undefined ? "" : this.validateEditForm.controls['customerName'].value;
      const defaultRound = this.validateEditForm.controls['defaultRound'].value == undefined ? "" : this.validateEditForm.controls['defaultRound'].value;
      const defaultRoute = this.validateEditForm.controls['defaultRoute'].value == undefined ? "" : this.validateEditForm.controls['defaultRoute'].value;
      const defaultRouteName = this.validateEditForm.controls['defaultRouteName'].value == undefined ? "" : this.validateEditForm.controls['defaultRouteName'].value;
      const displayName = this.validateEditForm.controls['displayName'].value == undefined ? "" : this.validateEditForm.controls['displayName'].value;
      const email = this.validateEditForm.controls['email'].value == undefined ? "" : this.validateEditForm.controls['email'].value;
      const firstName = this.validateEditForm.controls['firstName'].value == undefined ? "" : this.validateEditForm.controls['firstName'].value;
      const lastName = this.validateEditForm.controls['lastName'].value == undefined ? "" : this.validateEditForm.controls['lastName'].value;
      const phoneNumber = this.validateEditForm.controls['phoneNumber'].value == undefined ? "" : this.validateEditForm.controls['phoneNumber'].value;
      const studentId = this.validateEditForm.controls['studenId'].value == undefined ? "" : this.validateEditForm.controls['studenId'].value;
      const userName = this.validateEditForm.controls['userName'].value == undefined ? "" : this.validateEditForm.controls['userName'].value;
      const defaultStopId = this.validateEditForm.controls['defaultStopId'].value == undefined ? "" : this.validateEditForm.controls['defaultStopId'].value;
      const defaultStopName = this.validateEditForm.controls['defaultStopName'].value == undefined ? "" : this.validateEditForm.controls['defaultStopName'].value;
  
      const uid = this.currentUserSelected.uid;
  
      let validForm: boolean = true;
  
      if (this.newCustomerIdEditMode != "" && !this.resetClientEditInfo) {
        this.msg.error("Al cambiar de  Empresa es necesario asignar una ruta y estación acorde a la empresa.");
        validForm = false;
      }
      if (userName == "") {
        this.msg.error("El Usuario es un valor requerido, favor de validar.");
        validForm = false;
      }
      if (studentId == "") {
        this.msg.error("La Matrícula es un valor requerido, favor de validar, si no se tiene un valor poner 0");
        validForm = false;
      }
      if (email == "") {
        this.msg.error("El Email es un valor requerido, favor de validar.");
        validForm = false;
      }
      if (customerId == "") {
        this.msg.error("La Empresa es un valor requerido, favor de validar");
        validForm = false;
      }
      if (defaultRoute == "") {
        this.msg.error(" La ruta es un valor requerido, favor de validar");
        validForm = false;
      }
  
  
      const data = {
        uid: uid,
        customerId: customerId,
        customerName: customerName,
        defaultRound: defaultRound,
        defaultRoute: defaultRoute,
        defaultRouteName: defaultRouteName, //ruta
        displayName: displayName,
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        studentId: studentId,
        userName: userName,
        defaultStopId: defaultStopId,
        defaultStopName: defaultStopName
      };
  
  
      if (validForm) {
        this.customersService.updateUser(uid, data).then((response) => {
          this.isEditUserVisible = false;
          this.currentUserSelected.firstName = firstName;
          this.currentUserSelected.lastName = lastName;
          this.currentUserSelected.displayName = displayName;
          this.currentUserSelected.userName = userName;
          this.currentUserSelected.studentId = studentId;
          this.currentUserSelected.email = email;
          this.currentUserSelected.customerId = customerId;
          this.currentUserSelected.customerName = customerName;
          this.currentUserSelected.phoneNumber = phoneNumber;
          this.currentUserSelected.defaultRound = defaultRound;
          this.currentUserSelected.defaultRoute = defaultRoute;
          this.currentUserSelected.defaultRouteName = defaultRouteName;
          this.currentUserSelected.defaultStopName = defaultStopName;
          this.currentUserSelected.defaultStopId = defaultStopId;
  
        });
      }
    } else {
      console.error('currentUserSelected or uid is null or undefined');
    } 
    
  }

  submitFormProduct(): void {
    this.validateForm.controls['customer_id'].setValue(this.currentUserSelected.customerId);
    this.validateForm.controls['customerId'].setValue(this.currentUserSelected.customerId);
    const amount = this.validateForm.controls['amount'].value;
    const price = this.validateForm.controls['price'].value;
    const validTo = this.validateForm.controls['validTo'].value;
    const isCourtesy = this.validateForm.controls['is_courtesy'].value || false;
    this.validateForm.controls['due_date'].setValue(validTo.toISOString());
    if (amount != price && !isCourtesy) {
      this.validateForm.controls['status'].setValue('partial');
    }

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.isConfirmLoading = true;
      if (this.userlevelAccess != "3") {
        this.customersService.saveBoardingPassToUserPurchaseCollection(this.currentUserSelected.uid, this.validateForm.value)
          .then((success) => {
            this.isVisible = false;
            this.isConfirmLoading = false;
          }).catch((err) => { this.isConfirmLoading = false; });
      } else {
        this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
      }
    }
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;

    if (this.current === 2) {
      let selectedUsersCredentials: { uid: string | number; }[] = [];
      this.usersByAccount.forEach((user: { uid: string | number; }) => {
        if (this.mapOfCredentialsCheckedId[user.uid] === true) {

          selectedUsersCredentials.push(user);
        }
      });
      this.actualSelectedRows = selectedUsersCredentials.length;
      this.selectedUsersForCredentials = selectedUsersCredentials;
    }
  }

  done(): void {
    this.isVisibleBulk = false;
    this.isVisibleBulkCredentials = false;
    setTimeout(() => {
      this.current = 0;
      this.isDone = true;
    }, 500);
  }


  nzClicOption() {    
    if (this.productsReference !== null) {
       this.getLatestPurchaseDetail(this.currentUserSelected.uid, this.productsReference.id);
    }   
  }

  nzClicOptionInformacion() {
    this.isBoardingPassSelected = false;
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


handleChange2(event: NzUploadChangeParam): void {
  const status = event.file.status;
  if (status !== 'uploading') {
    const status = event.file.status;     
    this.fileListInfo = event.file;
    if (status === 'done') {
      this.sendMessage('success', `${event.file.name} Archivo cargado satisfactoriamente.`);
    } else if (status === 'error') {
      this.sendMessage('error', `${event.file.name} archivo fallido, favor de validar.`);
    }
    if (event.file.originFileObj) {
      this.getBase64(event.file.originFileObj, (img: string) => {
        this.fileUrl = img;
        const fileRef = this.bucketStorage.ref(this.bucketPath);

        this.task = this.bucketStorage.ref(this.bucketPath).putString(img, 'data_url');

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
              this.updateAdvanceURL(url);
            });
          })
        ).subscribe();
      });
    }
  }
}

  changePayment(event: string) {
    this.validateForm.controls['amountPayment'].setValue(0);

    this.paymentSelected = event;
    if (event == 'Mensualidad') {
      this.isValidDescriptionPaymentType = false;
      this.isAnticipo = false;
      this.validateForm.controls['amountPayment'].setValue(this.validateForm.controls['amount'].value);
    } else if (event == 'Anticipo') {
      this.isValidDescriptionPaymentType = true; //TODO
      this.isAnticipo = true;
      this.validateForm.controls['amountPayment'].setValue(0);

    } else {
      this.isAnticipo = false;
      this.isValidDescriptionPaymentType = true;
      this.validateForm.controls['amountPayment'].setValue(0);
    }
  }

  onChangeValidTo(result: Date): void {
    const validDateFrom = this.validateForm.controls['validFrom'].value;


    if (this.paymentSelected == 'Anticipo') {
      let dateValidTo = this.credentialForm.controls['validTo'].value || new Date();
    }
  }

  changePaymentType(event: string) {
    if (event == 'Sistema' || event == 'Efectivo') {
      this.ifValidPayment = false;
    } else {
      this.ifValidPayment = true;
    }
  }

  changeLiqPaymentType(event: string) {
    if (event == 'Sistema' || event == 'Efectivo') {
      this.ifValidLiqPayment = false;
    } else {
      this.ifValidLiqPayment = true;
    }
  }

  async updateAdvanceURL(url: string) {
    this.validateForm.controls['fileURL'].patchValue(url);
  }

  async updateAdvanceLURL(url: string) {
    this.validateLiqForm.controls['fileURL'].patchValue(url);
  }

  beforeUpload = (file: File) => {
    return false;
  }

  downloadPdf() {
    //pdf generation code HTML table to pdf
    try {

      var doc = new jsPDF();
      html2canvas(document.getElementById("credencial")!).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'pt', 'a4');
        var width = pdf.internal.pageSize.getWidth();
        var height = canvas.height * width / canvas.width;
        pdf.addImage(contentDataURL, 'PNG', 10, 10, width, height);
        pdf.save('credencial.pdf');
      });
    }
    catch (e) {
      console.error(e);
    }
  }
  generatePurchasePDF(id:any) {
    this.isVisiblePurchasePay = true;
    console.log("GenerarPDF");
  }

  bajaCheck () {
    
  }
  downloadImg(): void {
    const canvas = document.getElementById('download')?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
      this.download.nativeElement.href = canvas.toDataURL('image/png');
      this.download.nativeElement.download = 'ng-zorro-antd';
      const event = new MouseEvent('click');
      this.download.nativeElement.dispatchEvent(event);
    }
  }

}