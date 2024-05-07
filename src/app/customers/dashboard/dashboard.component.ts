import { Component, OnInit, ViewChild, OnDestroy, inject, ElementRef } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import * as _ from 'lodash';
import { filter, toLower } from 'lodash';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Subscription, Subject, Observable } from 'rxjs';
import { IBoardingPass, ICredential } from '../classes/customers';
import { Firestore, serverTimestamp } from 'firebase/firestore'; 
//import * as firebase from 'firebase/compat';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Asegúrate de importar firestore
//import { firestore } from 'firebase-functions/v1';
import { Timestamp }  from 'firebase/firestore';
import { ProductsService } from '../../shared/services/products.service';
import { RolService } from '../../shared/services/roles.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { DashboardService } from '../../shared/services/admin/dashboard.service';
import 'ag-grid-enterprise';
import { CustomersService } from '../services/customers.service';
import { AccountsService } from '../../shared/services/accounts.service';

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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponents implements OnInit, OnDestroy {
  @ViewChild('download', { static: false }) download!: ElementRef;    
  authService = inject(AuthenticationService);
  productsService = inject(ProductsService);
  customersService = inject(CustomersService);
  dashboardService = inject(DashboardService);
  @ViewChild('searchBar', { static: false }) searchbar: any;
  rolService = inject(RolService);
  search: any;

  usersCollection: AngularFirestoreCollection<any> | undefined;
  users: any;
  hasBeenFiltered = false;
  displayData: any;
  devicesList: any;
  loadedDevicesList: Array<any> = [];

  //Modal MessageCenter
  newMessage = "";
  userChatMessageData: any;
  loadingChatMessages = false;

  // modal Bulk create boardingPasses
  current = 0;
  isDone: boolean = false;
  isCreatingBoardingPasses: boolean = false;
  isCreatingCredentials: boolean = false;

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
  listOfAllData = [];
  mapOfCheckedId: { [key: string]: boolean } = {};

  isCredentialsAllDisplayDataChecked = false;
  isCredentialsIndeterminate = false;
  listOfCredentialsDisplayData = [];
  listOfCredentialsAllData = [];
  mapOfCredentialsCheckedId: { [key: string]: boolean } = {};

  isContentOpen = false;
  isUserSelected = false;
  isLoadingUsers = false;
  currentUserSelected!: { token: any; uid: string; studentId: string; customerId: string; id: string; paymentId: string; photoURL:string; displayName:string;
     disabled: boolean; emailVerified:boolean; email:string; };
  currentSelectedCustomerId: string | undefined;
  loadingLastPurchase = false;
  lastPurchase!: IBoardingPass | null;
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
  userCredentials: null | undefined;
  loadingUserCredentials = false;
  loadingLatestPurchases = false;

  isVisible = false;
  isProductVisible = false;
  isModalCredentialVisible = false;
  isConfirmLoading = false;

  validateForm!: UntypedFormGroup;
  credentialForm!: UntypedFormGroup;
  checked = false;
  routes: any = [];
  products: any = [];
  stopPoints: any = [];
  usersByAccount: any = [];

  routesSubscription!: Subscription;
  productsSubscription!: Subscription;
  stopPointsSubscription!: Subscription;

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

  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');
  formatterDollar = (value: number) => `$ ${value}`;
  parserDollar = (value: string) => value.replace('$ ', '');
  actualSelectedRows!: number;
  selectedUsersForCredentials: { uid: string | number; firstName: any; }[] = [];
  infoLoad: any = [];
  userlevelAccess: string | undefined;
  user: any;
  infoSegment: any  = [];
  accountsService = inject(AccountsService);
    
  constructor(
    private afs: AngularFirestore,
    public modalService: NzModalService,
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

    const routesObservable: Observable<any>  = this.accountId$.pipe(
      switchMap(accountId => this.afs.collection('customers').doc(accountId).collection('routes', ref => ref.where('active', '==', true)).valueChanges({ idField: 'routeId' })
      ));

    // subscribe to changes
    routesObservable.subscribe((routes: any) => {
      this.routes = routes;
    });

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
      baja:[false],
      realValidTo: []
    });
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
  }

  showModal(): void {
    this.isVisible = true;
  }

  showModalCredential(): void {
    this.isModalCredentialVisible = true;
  }

  showModalProduct(): void {
    this.isProductVisible = true;
  }

  async showModalMessageCenter() {
    // send menssage to sender..   
    if (this.currentUserSelected && this.currentUserSelected.uid) {
      const uid: string = this.currentUserSelected.uid;
      console.log('token payload created: ', JSON.stringify(this.currentUserSelected.token));
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
  onBulkBoardingPassSelected(customerId: string) {
    this.accountId$.next(customerId);
    this.currentSelectedCustomerId = customerId;
    this.isVisibleBulk = true;
  }

  onBulkCredentialsSelected(customerId: string) {
    this.accountId$.next(customerId);
    this.currentSelectedCustomerId = customerId;
    this.isVisibleBulkCredentials = true;
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
   // console.log(record.validTo, (record.validTo.toDate()).toISOString());
    this.validateForm.controls['isTaskIn'].setValue(record.isTaskIn);
    this.validateForm.controls['isTaskOut'].setValue(record.isTaskOut);
  }

  onRouteSelected(event: string, routes: any) {
  //  console.log('onRouteSelected');
    this.routeId$.next(event);
    const recordArray = _.filter(routes, r => {
      return r.routeId == event;
    });
    const record = recordArray[0];
    console.log('record found is: ', record);
    this.validateForm.controls['routeName'].setValue(record.name);
  }

  onStopPointSelected(event: any, stoppoints: any) {
   // console.log('on stop point selected was clicked');
    const recordArray = _.filter(stoppoints, s => {
      return s.stopPointId == event;
    });
    const record = recordArray[0];
    this.validateForm.controls['stopName'].setValue(record.name);
    this.validateForm.controls['stopDescription'].setValue(record.description);
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
  }
  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
  }

  onPaymentUpdated(event: any) {
 //   console.log(event);
    if (this.currentUserSelected && this.currentUserSelected.uid) {
      if (this.lastPurchase !== null && this.lastPurchase !== undefined) {
        if (+this.lastPurchase.price === event) {
          if (this.lastPurchase && this.lastPurchase.realValidTo) {
            console.log('full price has been reached');
          this.lastPurchase.status = 'completed';
          this.lastPurchase.amount = event;
          this.lastPurchase.active = true;
          this.lastPurchase.validTo = Timestamp.fromDate(new Date(this.lastPurchase.realValidTo));
          } else {
            console.error('lastPurchase or date is null or undefined');
          }      
          
         // this.lastPurchase.validTo =  firestore.Timestamp.fromDate(new Date(this.lastPurchase.realValidTo));//firebase.Timestamp.fromDate(new Date(this.lastPurchase.realValidTo));
        } else {
          this.lastPurchase.amount = event;
        }
      } else {
        console.error('lastPurchase is null or undefined');
      }
      
      if (this.userlevelAccess != "3") {
        this.customersService.updateBoardingPassToUserPurchaseCollection(this.currentUserSelected.uid, this.lastPurchase)
          .then((success) => {
            this.isVisible = false;
            this.isConfirmLoading = false;
          }).catch((err) => { this.isConfirmLoading = false; });
      } else {
        this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
      }
      this.canUpdatePayment = false;

    } else {
      console.error('currentUserSelected or uid is null or undefined');
    }
    
  }

  onCanUpdateValidTo() {
    this.canUpdateValidTo = true;
  }

  onValidToUpdated(event:any) {
    //console.log(event);    
    //console.log(this.lastPurchase);
    this.canUpdateValidTo = false;
  }

  createCredential() {
    if (this.credentialForm.valid) {
      if (this.currentUserSelected && this.currentUserSelected.uid) {
        const uid: string = this.currentUserSelected.uid;
        const validFrom = this.credentialForm.controls['validFrom'].value || new Date();
        const validTo = this.credentialForm.controls['validTo'].value || new Date();
        const active = this.credentialForm.controls['active'].value || false;
  
        console.log(validFrom, validTo, active);
  
        this.isCreatingCredentials = true;
        if (this.userlevelAccess != "3") {
          this.customersService.createCredential(this.currentUserSelected.uid, this.currentUserSelected.studentId, validFrom, validTo, active).then((response: any) => {
            console.log(response);
            this.isModalCredentialVisible = false;
          });
        } else {
          this.sendMessage('error', "El usuario no tiene permisos para crear datos, favor de contactar al administrador.");
        }
  
        this.isCreatingCredentials = false;
        this.isDone = true;
      } else {
        console.error('currentUserSelected or uid is null or undefined');
      }
    
    }
  }

  submitForm(): void {
    if (this.currentUserSelected && this.currentUserSelected.uid) {
      const uid: string = this.currentUserSelected.uid;
      this.validateForm.controls['customer_id'].setValue(this.currentUserSelected.customerId);
      const amount = this.validateForm.controls['amount'].value;
      const price = this.validateForm.controls['price'].value;
      const validTo = this.validateForm.controls['validTo'].value;
      const isCourtesy = this.validateForm.controls['is_courtesy'].value || false;
      this.validateForm.controls['due_date'].setValue(validTo.toISOString());
      if (amount != price && !isCourtesy) {
        this.validateForm.controls['status'].setValue('partial');
      }
 
      // tslint:disable-next-line: forin
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
          this.sendMessage('error', "El usuario no tiene permisos para crear datos, favor de contactar al administrador.");
        }
  
      }
    } else {
      console.error('currentUserSelected or uid is null or undefined');
    }
    
  }

  submitFormProduct(): void {
    if (this.currentUserSelected && this.currentUserSelected.uid) {
      const uid: string = this.currentUserSelected.uid;
      this.validateForm.controls['customer_id'].setValue(this.currentUserSelected.customerId);
      const amount = this.validateForm.controls['amount'].value;
      const price = this.validateForm.controls['price'].value;
      const validTo = this.validateForm.controls['validTo'].value;
      const isCourtesy = this.validateForm.controls['is_courtesy'].value || false;
      this.validateForm.controls['due_date'].setValue(validTo.toISOString());
      if (amount != price && !isCourtesy) {
        this.validateForm.controls['status'].setValue('partial');
      }
      console.log(this.validateForm.valid);
      console.log(this.validateForm.value);
     // this.validateForm.controls['baja'].setValue('false');
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      console.log("this.validateForm.value AQUI");
      console.log(this.validateForm.value);
  
      if (this.validateForm.valid) {
        this.isConfirmLoading = true;
        if (this.userlevelAccess != "3") {
          this.customersService.saveBoardingPassToUserPurchaseCollection(this.currentUserSelected.uid, this.validateForm.value)
            .then((success) => {
              this.isVisible = false;
              this.isConfirmLoading = false;
            }).catch((err) => { this.isConfirmLoading = false; });
        } else {
          this.sendMessage('error', "El usuario no tiene permisos para crear datos, favor de contactar al administrador.");
        }
      }
    } else {
      console.error('currentUserSelected or uid is null or undefined');
    }
    
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
  }

  handleCancelProduct(): void {
    this.isProductVisible = false;
  }

  getUsersList() {
    this.isLoadingUsers = true;


    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      this.usersCollection = this.afs.collection<any>('users', ref => ref
      .where('customerId', '==', this.user.customerId)
      .orderBy('displayName'));
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
    else {
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

  getCustomersList() {    
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      const customersCollection = this.afs.collection('customers', ref => ref
      .where('customerId', '==', this.user.customerId)
      .orderBy('name'));
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

  reassingBoardingPass(id: any, set: any) {
    if (this.currentUserSelected && this.currentUserSelected.uid) {
      if (this.lastPurchase !== null && this.lastPurchase !== undefined) {  
      const purchaseId = this.lastPurchase.id;
      const boardingPassRef = this.afs.collection('users').doc(this.currentUserSelected.id).collection('boardingPasses').doc(this.lastPurchase.id);
      boardingPassRef.set(this.lastPurchase).then((response) => {
        const oldBoardingPassRef = this.afs.collection('users').doc(this.currentUserSelected.uid).collection('boardingPasses').doc(purchaseId);
        oldBoardingPassRef.delete();
      });
      } else {
        console.error('lastPurchase is null or undefined');
      }
    } else {
      console.error('currentUserSelected or uid is null or undefined');
    }
   
  }

  refreshList() {
    this.hasBeenLoaded = false;
    this.getUsersList();
  }
  loadUsers(users: any) {
    if (this.loadedDevicesList.length <= 1) {
      this.displayData = users;
      this.devicesList = users.slice().sort((a: any, b:any ) => {
        return a.displayName.localeCompare(b.displayName);
      });
      this.loadedDevicesList = this.devicesList;
    }
  }

  getItems(searchbar: any) {
    this.initializeItems();
    const q = searchbar;
    if (!q) { return; }
    const text = _.toLower(q);
    this.devicesList = _.filter(this.devicesList, function (object) {
      //return _(object).some(function (string: any) {
        //return _(string).toLower().includes(text);
        return Object.values(object).some(function (string: any) {
          return toLower(string).includes(text);
      });
    });
  }

  initializeItems() {
    this.devicesList = this.loadedDevicesList;
  }

  userSelected(data: any) {
    if (this.currentUserSelected && this.currentUserSelected.uid) {
      const uid: string = this.currentUserSelected.uid;
      if (this.lastPurchase !== null && this.lastPurchase !== undefined) {
        this.currentUserSelected = data;
        this.currentSelectedCustomerId = this.currentUserSelected.customerId;
        this.accountId$.next(this.currentUserSelected.customerId);
        this.isUserSelected = true;
        this.isBoardingPassSelected = false;
        this.getLatestPurchases(data.uid);
        this.getUserCredentials(data.uid);
        this.getUserChatMessages(data.uid);
        this.lastPurchase = null;

      } else {
        console.error('lastPurchase or date is null or undefined');
      }
      
      
    } else {
      console.error('currentUserSelected or uid is null or undefined');
    }
   

  }

  boardingPassSelected(purchase: IBoardingPass) {
    if (this.currentUserSelected) {
      this.isBoardingPassSelected = true;
      this.lastPurchase = purchase;
    }
  }

  copyDataToUserCollection() {
    if (this.userlevelAccess != "3") {
      if (this.currentUserSelected && this.currentUserSelected.uid) {
        const uid: string = this.currentUserSelected.uid;
        this.customersService.saveOldBoardingPassToUserCollection(this.currentUserSelected.paymentId);
      } else {
        console.error('currentUserSelected or uid is null or undefined');
      }
      
    
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
  }

  showDeleteConfirm(): void {
    if (this.currentUserSelected && this.currentUserSelected.uid) {
      const uid: string = this.currentUserSelected.uid;
      this.modalService.confirm({
        nzTitle: '¿Está seguro de eliminar esta cuenta?',
        nzContent: '<b style="color: red;">Toda la información relacionada a esta cuenta será eliminada permanentemente.</b>',
        nzOkText: 'Eliminar',
        nzOnOk: () => {
          if (this.userlevelAccess == "1") {
            this.customersService.deleteUser(this.currentUserSelected.uid);
          } else {
            this.sendMessage('error', "El usuario no tiene permisos para borrar datos, favor de contactar al administrador.");
          }
         // this.currentUserSelected = null;
         this.currentUserSelected = {
          token: null,
          uid: '',
          studentId: '',
          customerId: '',
          id: '',
          paymentId: '',
          disabled: false,
          photoURL: '',
          displayName :'',
          emailVerified:false,
          email:""
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

  getLastPurchase(purchaseId: string) {
    this.loadingLastPurchase = true;
    this.lastPurchase = null;
    this.customersService.getLastPurchase(purchaseId).valueChanges().subscribe(purchase => {
      this.lastPurchase = purchase;
      this.loadingLastPurchase = false;
    }, err => {
      this.loadingLastPurchase = false;
      this.lastPurchase = null;
    });
  }

  activatePurchase(purchaseId: string, paid: boolean) {
    // console.log(this.currentUserSelected.uid, purchaseId, paid);
    if (this.userlevelAccess != "3") {
      if (this.currentUserSelected && this.currentUserSelected.uid) {
        const uid: string = this.currentUserSelected.uid;
        this.customersService.activatePurchase(this.currentUserSelected.uid, purchaseId, paid);
      this.currentUserSelected.paymentId = purchaseId;
      } else {
        console.error('currentUserSelected or uid is null or undefined');
      }
      
     
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
  }

  deletePurchase(purchaseId: string) {
    // console.log(this.currentUserSelected.uid, purchaseId);
    if (this.userlevelAccess == "1") {
      if (this.currentUserSelected && this.currentUserSelected.uid) {        
        this.customersService.deletePurchase(this.currentUserSelected.uid, purchaseId);
      this.isBoardingPassSelected = false;
      } else {
        console.error('currentUserSelected or uid is null or undefined');
      }
      
     
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para borrar datos, favor de contactar al administrador.");
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
      // console.log(this.currentUserSelected.uid, credentialId);
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

  getUserChatMessages(userId: string) {
    this.loadingChatMessages = true;
    this.dashboardService.getUserChatMessages(userId, 10)
      .subscribe(userChatMsn => {
        this.userChatMessageData = userChatMsn;
      });
  }

  //Wizard
  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
    console.log(Object.keys(this.mapOfCheckedId).length);
    if (this.current === 2) {
      let selectedUsersCredentials: { uid: string | number; firstName: any; }[] = [];
      this.usersByAccount.forEach((user: { uid: string | number; firstName: any; }) => {
        if (this.mapOfCredentialsCheckedId[user.uid] === true) {
          console.log('selected user, ', user.firstName, ' ', user.uid);
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

  createMultipleBoardingPasses() {
    this.isCreatingBoardingPasses = true;
    setTimeout(() => {
      this.isCreatingBoardingPasses = false;
      this.isDone = true;
    }, 2000);
  }

  currentPageDataChange($event:any): void {
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
    this.usersByAccount.forEach((item: { uid: string; displayName: any; }) => {
      this.customersService.getLatestValidUserPurchases(item.uid).pipe(
        take(1),
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        })),
        tap((boardingPasses:any) => {
          console.log(item.displayName, ' has a valid BPass ?', boardingPasses.length);

          this.mapOfCredentialsCheckedId[item.uid] = boardingPasses.length > 0;
        })
      ).subscribe();
    });
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
  createMultipleCredentials() {
    this.current++;
    const validFrom = this.credentialForm.controls['validFrom'].value || new Date();
    const validTo = this.credentialForm.controls['validTo'].value || new Date();
    const active = this.credentialForm.controls['active'].value || false;

    //console.log(validFrom, validTo, active);   

    if (this.userlevelAccess != "3") {
      this.isCreatingCredentials = true;
      this.selectedUsersForCredentials.forEach((user:any) => {
        this.customersService.createCredential(user.uid, user.studentId, validFrom, validTo, active).then((response: any) => {
          console.log(response);
        });
      });
      this.isCreatingCredentials = false;
      this.isDone = true;
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
  }
}
