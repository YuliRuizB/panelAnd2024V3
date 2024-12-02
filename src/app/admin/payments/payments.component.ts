import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UsersService } from '../../shared/services/users.service';
import { AccountsService } from '../../shared/services/accounts.service';
import { Observable, Subject, Subscription, map, switchMap, take, takeUntil, tap } from 'rxjs';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { ICard, ICustomer, IFee, IPaymentMethod } from '../../customers/classes/customers';
import { Timestamp } from 'firebase/firestore';
import { DashboardService } from '../../shared/services/admin/dashboard.service';
import { CustomersService } from '../../customers/services/customers.service';
import { ProductsService } from '../../shared/services/products.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ProgramService } from '../../shared/services/program.service';
import { RoutesService } from '../../shared/services/routes.service';
import _ from 'lodash';
import { IStopPoint } from '../../shared/models/ColumItem';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class AdminPaymentsComponent implements OnInit {
  dataEjecutores: any;
  dataUsuarios: any;
  dataTransfer: any;
  dataUsuariosList: Array<any> = [];
  dataEjecutoresList: Array<any> = [];
  dataTransferList: Array<any> = [];
  isEditModal: boolean = false;
  isEditModalE: boolean = false;
  isViewInfo: boolean = false;
  isVisible1: boolean = false;
  signupForm!: UntypedFormGroup;
  signupFormE!: UntypedFormGroup;
  viewDetalle!: FormGroup;
  dashboardService = inject(DashboardService);
  authService = inject(AuthenticationService);
  usersService = inject(UsersService);
  accountsService = inject(AccountsService);
  customersService = inject(CustomersService);
  productsService = inject(ProductsService);
  routesService = inject(RoutesService);
  customerSubscription: Subscription | undefined;
  cCollection: AngularFirestoreCollection<any> | undefined;
  user: any;
  stopSubscription$: Subject<boolean> = new Subject();
  infoSegment: any;
  size: NzButtonSize = 'large';
  @ViewChild('searchBar', { static: false }) searchbar: any;
  @ViewChild('searchBarE', { static: false }) searchbarE: any;
  listOfCustomer: any;
  readytoGenerateBoardinPass: boolean = false;
  currentUserSelected: any = [];
  validateForm!: UntypedFormGroup;
  products: any = [];
  customers: any[] | undefined;
  routes: any;
  stopPoints: any = [];
  paymentSelected: string = "";
  productSelected: any = [];
  isConfirmLoading = false;
  disabledDate = (current: Date): boolean => false;
  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');
  formatterDollar = (value: number) => `$ ${value}`;
  parserDollar = (value: string) => value.replace('$ ', '');
  isAnticipo: boolean = false;
  isValidDescriptionPaymentType: boolean = false;
  currentLine: string = "";
  stopIdValue: string = ""

  constructor(private fb: UntypedFormBuilder,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
      // console.log(this.user); /idSegment
      if (this.user !== null && this.user !== undefined && this.user.idSegment !== undefined) {

        this.accountsService.getSegmentLevel(this.user.idSegment).pipe(
          takeUntil(this.stopSubscription$),
          map((a: any) => {
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

    this.signupForm = this.fb.group({
      status: [''],
      id: ['']
    });

    this.signupFormE = this.fb.group({
      status: [''],
      id: [''],
      customerId: [''],
      customerName: ['']
    });

    this.viewDetalle = this.fb.group({
      status: [''],
      id: [''],
      customerId: [''],
      customerName: [''],
      email: [''],
      phoneNumber: [''],
      studentId: [''],
      defaultRouteName: [''],
      defaultRound: ['']
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
      fileURL: [''],
      frequencies: ['']
    });
    const currentDate = new Date();
    this.validateForm.controls['promiseDate'].setValue(currentDate);
    this.validateForm.controls['validTo'].setValue('');
    this.validateForm.controls['validFrom'].setValue(currentDate);

    this.validateForm.get('stopId')!.valueChanges.subscribe(event => {
      this.onStopPointSelected(event, this.stopPoints);
    });
  }

  fillData() {

    if (this.dataUsuariosList.length <= 1) {
      if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
        this.usersService.getPreRegisterInfoByCustomer(this.user.customerId).subscribe((data) => {
          this.dataUsuarios = data as any[];
          this.dataUsuariosList = this.dataUsuarios;
        });



      } else {
        this.usersService.getPreRegisterInfo().subscribe((data) => {
          this.dataUsuarios = data as any[];
          this.dataUsuariosList = this.dataUsuarios;
        });

      }

    }
  }

  fillDataT() {
    if (this.dataTransferList.length <= 1) {
      if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual        
        this.usersService.getTransferInfoByCustomer(this.user.customerId).subscribe((data) => {
          this.dataTransfer = data as any[];
          this.dataTransferList = this.dataTransfer;
        });
        this.accountsService.getAccountsByCustomer(this.user.customerId).pipe(
          takeUntil(this.stopSubscription$),
          map((actions: any) => actions.map((a: any) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { id, ...data }
          })))
          .subscribe((customers: any) => {
            this.customers = customers;
          });


        this.routesService.getProducts(this.user.customerId).pipe(
          takeUntil(this.stopSubscription$),
          map((actions: any) => actions.map((a: any) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { id, ...data }
          })))
          .subscribe((products: any) => {
            this.products = products;
          });


      } else {
        this.usersService.getTransferInfo().subscribe((data) => {
          this.dataTransfer = data as any[];
          this.dataTransferList = this.dataTransfer;
          //console.log(this.dataTransfer);
          this.cCollection = this.afs.collection<any>('customers', ref => ref.where('active', '==', true));
          this.customerSubscription = this.cCollection.snapshotChanges().pipe(
            map((actions: any) => actions.map((a: any) => {
              const id = a.payload.doc.id;
              const data = a.payload.doc.data() as any;
              return { id, ...data }
            }))
          ).subscribe(customers => {
            this.customers = customers;
            console.log(this.customers);
          });

        });
      }
    }
  }


  fillDataE() {

    if (this.dataEjecutoresList.length <= 1) {
      if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
        this.usersService.getPreRegisterInfoEByCustomer(this.user.customerId).subscribe((data) => {
          this.dataEjecutores = data as any[];
          this.dataEjecutoresList = this.dataEjecutores;
        });
      } else {
        this.usersService.getPreRegisterInfoE().subscribe((data) => {
          this.dataEjecutores = data as any[];
          this.dataEjecutoresList = this.dataEjecutores;
        });
      }
    }
    if (this.infoSegment.nivelNum == 1) { //Individual
      this.accountsService.getAccountsByCustomer(this.user.customerId).pipe(
        takeUntil(this.stopSubscription$),
        map((a:any) => {
          const id = a.payload.id;
          const data = a.payload.data() as any;
          return { id, ...data }
        }),
      ).subscribe((accounts) => {
        this.listOfCustomer = [accounts];       
      });


    } else {
      this.accountsService.getAccounts().pipe(
        takeUntil(this.stopSubscription$),
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe((accounts) => {
       this.listOfCustomer = accounts;       
      });
     }
  }

  ngOnDestroy() {
    this.stopSubscription$.next(false);
    this.stopSubscription$.complete();
    this.dataUsuariosList = [];
    this.dataEjecutoresList = [];
  }
  showModalInE(data: any) {
    this.signupFormE.controls['status'].setValue(data.status);
    this.signupFormE.controls['id'].setValue(data.uid);
    this.isEditModalE = true;
  }
  showModalIn(data: any) {
    this.signupForm.controls['id'].setValue(data.uid);
    this.signupForm.controls['status'].setValue(data.status);
    this.isEditModal = true;
  }

  openModal(userid: any) {
    this.isViewInfo = true;
    console.log(userid);
    this.usersService.getUserInfo(userid).subscribe(action => {
      const data = action.payload.data() as UserData;
      //console.log(data);
      this.currentUserSelected = data;
      //console.log(this.viewDetalle.value);
      if (data) {
        const userObj = {
          id: data['displayName'],
          studentId: data['studentId'],
          phoneNumber: data['phoneNumber'],
          email: data['email'],
          customerName: data['customerName'],
          customerId: data['customerId'],
          defaultRouteName: data['defaultRouteName'],
          defaultRound: data['defaultRound']
        };
        this.viewDetalle.patchValue({ ...userObj });
      }
      console.log(this.viewDetalle.value);
    });
  }

  handleCancelEdit() {
    this.isEditModal = false;
  }
  handleCancelView() {
    this.isViewInfo = false;
  }
  handleCancelEditE() {
    this.isEditModalE = false;
  }

  handleOKEdit() {
    // let data = this.signupForm.value;
    //console.log('full data is: ',  this.signupForm.value); //userId: string, status: string) {   
    this.usersService.updateUserPreRegister(this.signupForm.controls['id'].value, this.signupForm.controls['status'].value);

    this.isEditModal = false;
  }

  handleOKEditE() {
    let data = this.signupFormE.value;
    //console.log('full data is: ', this.signupFormE.value); //userId: string, status: string) {   
    this.usersService.updateUserPreRegisterE(this.signupFormE.controls['id'].value
      , this.signupFormE.controls['status'].value,
      this.signupFormE.controls['customerId'].value,
      this.signupFormE.controls['customerName'].value);
    this.isEditModalE = false;
  }
  handleCancel(): void {
    this.isVisible1 = false;

  }
  handleOk(): void {
    this.isConfirmLoading = true;

    setTimeout(() => {
      this.isVisible1 = false;
      this.isConfirmLoading = false;
    }, 3000);
  }


  initializeItems() {
    this.dataUsuarios = this.dataUsuariosList;
    this.dataEjecutores = this.dataEjecutoresList;
    this.dataTransfer = this.dataTransferList;
  }

  getItems(searchbar: any) {
    const q = searchbar; // Assuming `searchbar` is an input element and you want to extract its value    
    if (!q) {
      // If the search query is empty, reset the devicesList to its original state
      this.dataUsuarios = this.dataUsuariosList.slice();
      return;
    }
    const text = q.toLowerCase(); // Using `toLowerCase()` instead of `toLower()` for lowercase conversion   
    this.dataUsuarios = this.dataUsuariosList.filter((object: any) => {
      // Check if any property of the object contains the search text
      return Object.values(object).some((value: any) => {
        // Convert the property value to lowercase and check if it includes the search text
        return String(value).toLowerCase().includes(text);
      });
    });
  }
  getItemsE(searchbar: any) {
    const q = searchbar; // Assuming `searchbar` is an input element and you want to extract its value    
    if (!q) {
      // If the search query is empty, reset the devicesList to its original state
      this.dataEjecutores = this.dataEjecutoresList.slice();
      return;
    }
    const text = q.toLowerCase(); // Using `toLowerCase()` instead of `toLower()` for lowercase conversion   
    this.dataEjecutores = this.dataEjecutoresList.filter((object: any) => {
      // Check if any property of the object contains the search text
      return Object.values(object).some((value: any) => {
        // Convert the property value to lowercase and check if it includes the search text
        return String(value).toLowerCase().includes(text);
      });
    });
  }
  getItemsT(searchbar: any) {
    const q = searchbar; // Assuming `searchbar` is an input element and you want to extract its value    
    if (!q) {
      // If the search query is empty, reset the devicesList to its original state
      this.dataTransfer = this.dataTransferList.slice();
      return;
    }
    const text = q.toLowerCase(); // Using `toLowerCase()` instead of `toLower()` for lowercase conversion   
    this.dataTransfer = this.dataTransferList.filter((object: any) => {
      // Check if any property of the object contains the search text
      return Object.values(object).some((value: any) => {
        // Convert the property value to lowercase and check if it includes the search text
        return String(value).toLowerCase().includes(text);
      });
    });
  }

  validarPago(data: any) {
    this.usersService.updateTransfer(data, "accepted");
    this.readytoGenerateBoardinPass = true;
  }
  rechazarPago(data: any) {
    this.usersService.updateTransfer(data.uid, "rejected");
    this.readytoGenerateBoardinPass = false;

    //notificar! // userId
  }

  onAmountChange(amount: number) {
    if (amount > 0) {
      this.validateForm.controls['is_courtesy'].setValue(false);
    }
  }
  onProductSelected(event: any, products: any) {
    console.log(event);
    this.productSelected = [];
    const recordArray = _.filter(products, p => {
      return p.id == event;
    });
    const record = recordArray[0];
    this.productSelected = record;
    console.log(this.productSelected);
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
    this.validateForm.controls['frequencies'].setValue(record.frequencies);
  }

  generarPase(userId: any, currentLine: string) {

    this.usersService.getUserInfo(userId).subscribe(action => {
      const data = action.payload.data() as UserData;
    //  console.log(data);
      this.currentUserSelected = data;
      this.currentLine = currentLine;
      //console.log('aqui');

      this.isVisible1 = true;
    });

  }
  submitForm() {

    console.log(this.validateForm);
    var purchaseRequest: object;
    var amountTrips: number = 0;
    const validTo = this.validateForm.controls['validTo'].value || new Date();
    const isCourtesy = this.validateForm.controls['is_courtesy'].value || false;
    var promiseDateValue = this.validateForm.controls['promiseDate'].value || "";
    var creation_date = this.validateForm.controls['creation_date'].value.toString(); // this.validateForm.controls['creation_date'].value;
    const typePaymentValue = this.validateForm.controls['typePayment'].value; // Transferencia, efectivo, Sistema
    this.validateForm.controls['customer_id'].setValue(this.currentUserSelected.customerId);
    this.validateForm.controls['customerId'].setValue(this.currentUserSelected.customerId);
    let amount = this.validateForm.controls['amount'].value; //Total a pagar
    const paymentSelected = this.validateForm.controls['payment'].value;  //Mensualidad, Anticipo , Liquidacion
    if (paymentSelected == "Anticipo") {
      amount = this.validateForm.controls['amountPayment'].value; //Cantidad a Pagar.
    }
    //console.log(this.validateForm.value)
    const frequencies = this.validateForm.controls['frequencies'].value || 0;
    //console.log( frequencies + '/' + amountTrips  + '/' + frequencies.length);
    if (frequencies > 0) {
      amountTrips = Number(frequencies) * 80;
    }
    const weeks = this.productSelected?.weeks || 0;
    const rangeWeeksGroup = this.fb.group({});

    const rangeWeeks = this.productSelected?.rangeWeeks || {}; // Provide a default empty object if null or undefined

    for (const [key, value] of Object.entries(rangeWeeks)) {
      rangeWeeksGroup.addControl(key, this.fb.control(value));
    }
    if (paymentSelected == "Mensualidad") {
      //if is mensualidad the promiseDate sould be last of month
      const validTo = this.validateForm.controls['validTo'].value || new Date();
      promiseDateValue = validTo;
    }
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
      status: this.validateForm.controls['status'].value,
      conciliated: false,
      creation_date: creation_date,// new Date().toISOString(),          
      operation_date: new Date().toISOString(),
      description: "Transfer validada  a traves de portal",
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
      product: {
        product_id: this.validateForm.controls['product_id'].value,
        amountTrips: amountTrips,
        frequencies: frequencies,
        rangeWeeks: rangeWeeksGroup.value,
        weeks: weeks,
        name: this.validateForm.controls['product_description'].value
      },
      customerId: this.currentUserSelected.customerId,
      active: true,
      category: "permanente",
      date_created: new Date().toISOString(),
      product_description: "Transfer validada  a traves de portal",
      product_id: this.validateForm.controls['product_id'].value,
      name: this.validateForm.controls['name'].value,
      isTaskIn: 'false',
      isTaskOut: 'false',
      type: "Servicio",
      isOpenpay: false,
      paidApp: 'portal',
      price: this.validateForm.controls['price'].value,
      round: this.validateForm.controls['round'].value,
      routeId: this.validateForm.controls['routeId'].value,
      routeName: this.validateForm.controls['routeName'].value,
      stopDescription: '',
      stopId: this.stopIdValue,
      stopName: this.validateForm.controls['stopDescription'].value,
      validFrom: this.validateForm.controls['validFrom'].value,
      validTo: validTo,
      idBoardingPass: this.currentUserSelected.uid,
      idPurchasteRequest: '',
      is_courtesy: isCourtesy,
      typePayment: paymentSelected,
      amountTrips: amountTrips,
      currentTrips: 0
    }
    //   console.log(send);
    // console.log(this.currentUserSelected.uid);
    this.customersService.saveBoardingPassToUserPurchaseCollection(this.currentUserSelected.uid, send) // this.validateForm.value)
      .then((success) => {
        this.isConfirmLoading = false;
        console.log(success);
        this.customersService.getLatestValidUserPurchasesAdvance(this.currentUserSelected.uid, 2, promiseDateValue, paymentSelected, creation_date).pipe(
          take(1),
          map((actions: any) =>
            actions.map((a: any) => {
              const data = a.payload.doc.data() as any;
              const id = a.payload.doc.id;
              return { id, ...data };
            })
          )
        )
          .subscribe((routes) => {
            //  console.log(routes[0].id);               
            this.customersService.saveBoardingPassDetailToUserPurchaseCollection(this.currentUserSelected.uid, routes[0].id, send)
              .then((success) => {
                //   console.log("last" + success);                
                this.customersService.createPurchaseCloud(send, this.currentUserSelected, routes[0].id);
                // console.log("lastsas");
                // console.log(send);
                this.usersService.updateTransfer(this.currentLine, "complete");
                //console.log("fin");

              }).catch((err) => { console.log("error"); });
          }, (error) => {
            console.log(error);
          })
      }).catch((err) => { });
  }

  enviarMensajeConfirmacion(uidUser: string, token: string) {
    const dataMessage = {
      createdAt: new Date(),
      from: 'FyXKSXsUbYNtAbWL7zZ66o2f1M92',
      fromName: 'Apps And Informa',
      msg: "Se confirmó la información y se creo el pase de abordar con éxito.",
      requestId: 'suhB7YFAh6PYXCRuJhfD',
      token: token,
      uid: uidUser,
      result: ""
    }
    const notifMessage = {
      timestamp: new Date(),
      title: 'Apps And Informa General',
      from: 'FyXKSXsUbYNtAbWL7zZ66o2f1M92',
      requestId: 'suhB7YFAh6PYXCRuJhfD',
      body: "Se confirmó la información y se creo el pase de abordar con éxito.",
      token: token, // 'dXf-sDaPH4U:APA91bGiTZ1H8jzNXEexZW65A8QUzNOqV77-vKquP6qZ535IyWWQ7m0PUFCI-3g-qXRvrvuo8-VJgkwF317YHegZh6oNUCHlylU1PoA_aM_5bJw44xNUChtV1sO30ge4VSx6MK2InIzr',//eachUserMessage.token,
      uid: uidUser//'RgNnO7ElJgdThoKh8rUvrpb2EhH2'
    }
    this.dashboardService.setMessage(notifMessage, uidUser);

    this.dashboardService.setChatMessage(dataMessage)
      .then(() => {

      });
  }

  onCustomerSelected(event: any) {

    const customerIdValue = this.validateForm.get('customerId')!.value;


    this.routesService.getProducts(customerIdValue).pipe(
      takeUntil(this.stopSubscription$),
      map((actions: any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      })))
      .subscribe((products: any) => {
        this.products = products;
        //  console.log( this.products) ;
      });

    this.routesService.getRoutes(customerIdValue).pipe(
      takeUntil(this.stopSubscription$),
      map((actions: any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      })))
      .subscribe((routes: IStopPoint[]) => {
        this.routes = routes;
      });



  }

  onRouteSelected(event: any, routes: any) {
    const recordArray = _.filter(routes, r => {
      return r.routeId == event;
    });
    const record = recordArray[0];
    this.validateForm.controls['routeName'].setValue(record.name);

    const customerIdValue = this.validateForm.get('customerId')!.value;

    this.accountsService.getStopsByCustomer(customerIdValue, event).pipe(
      takeUntil(this.stopSubscription$),
      map((actions: any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      }))).subscribe((stopPoints: any) => {
        this.stopPoints = stopPoints;
      });

  }
  onChangeValidTo(result: Date): void {
    const validDateFrom = this.validateForm.controls['validFrom'].value;

  }
  onCourtesyChange(isCourtesy: boolean) {
    if (isCourtesy) {
      this.validateForm.controls['amount'].setValue(0);
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
  onStopPointSelected(event: any, stoppoints: any) {
    const recordArray = _.filter(this.stopPoints, s => s.stopPointId === event);
    const record = recordArray[0];

    if (record) {
      this.stopIdValue = record.id;
      this.validateForm.patchValue({
        //  stopId: record.uid,
        stopName: record.name,
        stopDescription: record.description
      });
    }
    console.log(this.stopIdValue);
    console.log(this.validateForm.value);
  }

}

interface UserData {
  displayName: string;
  studentId: string;
  phoneNumber: string;
  email: string;
  status: string;
  customerName: string;
  customerId: string;
  defaultRouteName: string;
  defaultRound: string;
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
  amountPayment?: string;
  typePayment?: string;
  payment?: string;
  baja?: boolean;
  idBoardingPass?: string;
}