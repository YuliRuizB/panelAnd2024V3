import { Component, OnInit, inject } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection ,AngularFirestoreCollectionGroup,AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import {  UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RoutesService } from '../../shared/services/routes.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { ProductsService } from '../../shared/services/products.service';
import { UsersService } from '../../shared/services/users.service';
import { GeoPoint } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore'; 
import { AccountsService } from '../../shared/services/accounts.service';
import { Product } from '../../shared/interfaces/product.type';
import { CustomersService } from '../../customers/services/customers.service';

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

interface IRound {
  round1?: string;
  round2?: string;
  round3?: string;
  round4?: string;
}

@Component({
  templateUrl: './reports-dashboard.component.html',
  styleUrls: ['./reports-dashboard.component.css']
})
export class ReportsDashboardComponent implements OnInit {
  authService = inject(AuthenticationService);
  usersService= inject(UsersService); 
  usersServices = inject(CustomersService);
  routesService = inject(RoutesService);
  productsService = inject(ProductsService);
  accountsService= inject(AccountsService);
  stopSubscription$: Subject<any> = new Subject();
  gridApi :any;
  gridColumnApi: any;
  defaultColDef: any;
  userRoutes:any;
  sumOfField = 0;
  detailCellRendererParams : any;
  detailCellRendererParamsPagos: any;
  columnProgram: any;
  rowData: any = [];
  rowDataPay: any = [];
  rowDataPayTurn:any= [];
  rowDataPayCV:any= [];
  rowDataPayCVByR: any  = [];
  TotalUsers:number =0;
  TotalMPP :number=  0;
  TotalMPByRoute:number=0;
  user: any;
  usersList: any = [];
  usersListA: any = [];
  usersListCV : any = [];
  usersListCVByR! : any [];
  usersListCVByRDetalle!:any [];
  FusersListCVByRDetalle!:any [];
  routesList: any = [];
  products: any = [];
  amountCV:number=0;
  priceCV:number=0;
  productsSubscription?: Subscription;
  accountId$ = new Subject<string>();
  joined$: Observable<any> | undefined;
  cCollection: AngularFirestoreCollectionGroup<any> | undefined;
  productsListV:any =[];
  validateForm: UntypedFormGroup;
  validateFormO: UntypedFormGroup;
  validateFormTurn:UntypedFormGroup;
  validateFormPase: UntypedFormGroup;
  validateFormAnticipos:UntypedFormGroup;
  validateFormCV:UntypedFormGroup;
  validateFormCVByRoute:UntypedFormGroup;
  signupForm: UntypedFormGroup;
  signupFormCV:UntypedFormGroup;
  shift: any = [];
  public rowSelection: 'multiple' | undefined;
  isModalVisible: boolean = false;
  isModalVisibleCV:boolean = false;
  accountsSubscription?: Subscription;
 routeSubscription?: Subscription;
 routes:any;
 routeIdSelected!:string;
 customersList: any[] = [];
 checkOptionsOne: any[] = [];
 infoSegment: any  =[];
 userCustomerId: string = "";
 selectedOption: any;
 sub?: Subscription;

  constructor( 
      private fb: UntypedFormBuilder,
      private msg: NzMessageService,
      private afs: AngularFirestore) { 
     

        this.validateForm = this.fb.group({
          id: [null], // Initialize the product_id control
          customerId: [null]
        });

        this.validateFormO = this.fb.group({
          id: [null], // Initialize the product_id control
          customerId: [null]
        });        
        this.validateFormPase = this.fb.group({
          id: [null], // Initialize the product_id control
          customerId: [null]
        });
        this.validateFormTurn = this.fb.group({
          id: [null], // Initialize the product_id control
          turno: [""],
          customerId: [null]
        });
        this.validateFormAnticipos = this.fb.group({
          id: [null], // Initialize the product_id control
          turno: [""],
          customerId: [null]
        });

        this.validateFormCV =  this.fb.group({
          id: [null] ,
          customerId: [null]
        });
        
        this.validateFormCVByRoute =  this.fb.group({
          id: [null] ,
          routeId:[""],
          customerId: [null]
        });

        this.signupForm = this.fb.group({
          id: [],
          customerName: [''],
          defaultRound: [''],
          defaultRouteName: [''],
          displayName: [''],
          email:[''],
          firstName: [''],
          lastName:[''],
          phone: [''],
          studentId: ['']
          });

          this.signupFormCV = this.fb.group({
            id: [],
            customerName: [''],
            defaultRound: [''],
            defaultRouteName: [''],
            displayName: [''],
            email:[''],
            firstName: [''],
            lastName:[''],
            phone: [''],
            studentId: ['']
            });
  
        this.shift = [
          { id: 'Día', name: 'Día' },
          { id: 'Tarde', name: 'Tarde' },
          { id: 'Noche', name: 'Noche' }
        ];

    this.validateForm.get('id')?.valueChanges.subscribe(selectedProductId => {
         console.log('Selected Product ID:', selectedProductId);
    });

    this.authService.user.subscribe(user => {   
      this.user = user; 
          
      if(this.user) {      
        this.userCustomerId = this.user.customerId;  
       
        this.accountsService.getSegmentLevel(this.user.idSegment).pipe(
          map((a: any) => {
            if (a && a.payload) {
              const id = a.payload.id;
              const data = a.payload.data ? a.payload.data() : {}; // Maneja el caso cuando data es undefined
             // console.log(a);
              return { id, ...data };
            } else {
              console.warn('Unexpected payload structure:', a);
              return {};
            }
          })
        ).subscribe((record: any) => {        
          this.infoSegment = record;      
          this.getCustomersList();
        }) 
      }    
    });   
  }

  getCustomersList() {

    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      console.log( this.userCustomerId);
      
      const customersCollection = this.afs.collection('customers').doc(this.userCustomerId);
      customersCollection.snapshotChanges().pipe(
        takeUntil(this.stopSubscription$),
        map((action: any) => {
          const id = action.payload.id;
          const data = action.payload.data() as any;
          return { id, ...data };
        }),
        tap((customer: any) => {
          console.log(customer);
          
          this.customersList = [customer];  // Asigna un array con un único objeto
          
          this.checkOptionsOne = [{
            value: customer.id,
            label: customer.name
          }];
          console.log(this.checkOptionsOne);
          
          return customer;
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
          this.checkOptionsOne = customers.map((customer: any) => ({
            value: customer.id,
            label: customer.name
          }));
       //   console.log(this.checkOptionsOne);
          return customers;
        })
      ).subscribe();
    }
  }

 
  ngOnInit() {  
  }

  onFirstDataRendered(params: any) {
    setTimeout(function () {
     // params.api.getDisplayedRowAtIndex(1).setExpanded(false);
    }, 0);
  }
 
  ngOnDestroy() {
   
    if (this.stopSubscription$) {
      this.stopSubscription$.next(undefined);
    this.stopSubscription$.complete();
    }
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
    if (this.accountsSubscription) {
    this.accountsSubscription.unsubscribe();
  }
  }
 
  getSubscriptionsByRoute(vendorId: string, customerId:string) {   
    this.usersService.getBoardingPassesByRoutebyCustomerId(vendorId, customerId).pipe(
      takeUntil(this.stopSubscription$)
    ).subscribe(data => {    
      this.rowData = data;     
    })
  }

  getSubscriptionsByTurn(productId: string, turno: string ) {   

    
   this.usersService.getBoardingPassesByTurn(productId, turno).pipe(
      takeUntil(this.stopSubscription$)
    ).subscribe(data => {
      this.rowDataPayTurn = data;
      console.log(this.rowDataPayTurn);
      this.TotalUsers = this.sumAllPasses(this.rowDataPayTurn);
     // console.log('Total Sum of Passes:',   this.TotalUsers );
     // this.createNestedTableData(data);
    }); 
  }
 
    
  sumAllPasses(rowDataPayTurn: any[]): number {
    let totalSum = 0;  
    // Iterate through each object in the rowDataPayTurn array
    rowDataPayTurn.forEach((row) => {
      if (row && Array.isArray(row.passes)) {
        // Extract the 'passes' array from the object
        const passesArray = row.passes.length;  
        // Calculate the sum of 'passes' array
       // const passesSum = passesArray.reduce((acc, pass) => acc + pass, 0);  
        // Add the sum of 'passes' to the total
        totalSum +=  row.passes.length;
      }
    });  
    return totalSum;
  }

  sumAllCV(rowDataPayCV: any[]): number {
    let totalSum = 0;  
    // Iterate through each object in the rowDataPayCV array
    rowDataPayCV.forEach((row) => {
      if (row && Array.isArray(row.passes)) {
        // Extract the 'passes' array from the object
        row.passes.forEach((inRow:any) =>{
          this.amountCV =inRow.amountPayment;
          this.priceCV =inRow.amount;
          const passesArray =  this.priceCV  - this.amountCV ;  
          // Calculate the sum of 'passes' array
         // const passesSum = passesArray.reduce((acc, pass) => acc + pass, 0);  
          // Add the sum of 'passes' to the total         
          totalSum +=  passesArray;
        })
        
      }
    });     
    return totalSum;
  }

  sumAllCVByR(rowDataPayCVByR: any[]): number {
    let totalSum = 0;  
    // Iterate through each object in the rowDataPayCVByR array
    rowDataPayCVByR.forEach((row) => {
      if (row && Array.isArray(row.passes)) {
        // Extract the 'passes' array from the object
        row.passes.forEach((inRow: any) =>{
          this.amountCV =inRow.amountPayment;
          this.priceCV =inRow.amount;
          const passesArray =  this.priceCV  - this.amountCV ;  
          // Calculate the sum of 'passes' array
         // const passesSum = passesArray.reduce((acc, pass) => acc + pass, 0);  
          // Add the sum of 'passes' to the total         
          totalSum +=  passesArray;
        })
        
      }
    });     
    return totalSum;
  }
  

  getSubscriptions(productId: string) {   
    this.usersService.getBoardingPassesByProduct(productId).pipe(
      takeUntil(this.stopSubscription$)
    ).subscribe(data => {
      //console.log("data Result");
      //console.log(data);f
      this.rowDataPay = data;
      //this.createNestedTableData(data);
    })
  } 

  getSubscriptionsPase(productId: string) {   
    this.usersService.getBoardingPassesByProduct(productId).pipe(
      takeUntil(this.stopSubscription$)
    ).subscribe(data => {
      this.createNestedTableData(data);
    })
  }

  getSubscriptionsAnticipos(productId: string) {   
    this.usersService.getBoardingPassesByAnticipos(productId).pipe(
      takeUntil(this.stopSubscription$)
    ).subscribe(data => {
      this.createNestedTableDataA(data);
    })
  } 

  getSubscriptionsCV(productId: string) {       
    this.usersService.getBoardingPassesByCV(productId).pipe(
      takeUntil(this.stopSubscription$)
    ).subscribe(data => {   
      //console.log(data);
      this.rowDataPayCV = data;
      this.TotalMPP = this.sumAllCV(this.rowDataPayCV);
      this.createNestedTableDataCV(data);
    })   
  } 

  getSubscriptionsCVByRoute(productId: string) {
    this.usersService.getBoardingPassBySingleRoute(productId, this.routeIdSelected).pipe(
      takeUntil(this.stopSubscription$)
    ).subscribe(data => {   
      console.log(data);
      this.rowDataPayCVByR = data;
      this.TotalMPByRoute = this.sumAllCVByR(this.rowDataPayCVByR);
      this.createNestedTableDataCVByRoute(data);
    })   
  }

  createNestedTableDataA(data: any) {   
    this.usersListA = [];
    for (let i = 0; i < data.length; ++i) {
      data[i].key = i;
      data[i].expand = false;
      data[i].routeName = data[i].passes[0].routeName;
      for (let x = 0; x < data[i].passes.length; ++x) {
        data[i].passes[x].key = i;
        data[i].passes[x].customerName = data[i].customerName;
        this.usersListA.push(data[i].passes[x]);
      }
    }
    
  }
  createNestedTableDataCV(data: any) {   
    this.usersListCV = [];
    for (let i = 0; i < data.length; ++i) {
      data[i].key = i;
      data[i].expand = false;
      data[i].routeName = data[i].passes[0].routeName;
      for (let x = 0; x < data[i].passes.length; ++x) {
        data[i].passes[x].key = i;
        data[i].passes[x].customerName = data[i].customerName;
        this.usersListCV.push(data[i].passes[x]);
      }
    }
     
  }
  createNestedTableDataCVByRoute(data: any) { 
    this.usersListCVByR = [];
    for (let i = 0; i < data.length; ++i) {
      data[i].key = i;
      data[i].expand = false;
      data[i].routeName = data[i].passes[0].routeName;
      for (let x = 0; x < data[i].passes.length; ++x) {
        data[i].passes[x].key = i;
        data[i].passes[x].customerName = data[i].customerName;
        this.usersListCVByR.push(data[i].passes[x]);
      }
    }
    if ( this.usersListCVByR.length > 0) {
      this.usersListCVByRDetalle= [];
      console.log(this.usersListCVByR);
      for (const user of this.usersListCVByR) {      
        this.usersService.getUserInfo(user.uid).subscribe((data: any) => {
        const record = {
           displayName: data.payload.data()['displayName'],
           studentId: data.payload.data()['studentId'],
           phone: data.payload.data()['phone'],
           email: data.payload.data()['email'],
           amountPayment: user.amountPayment,
           amount: user.amount,
           promiseDate:user.promiseDate
           };           
           const recordExists = this.usersListCVByRDetalle.some(existingRecord => existingRecord.studentId === data.payload.data()['studentId']);
            if (!recordExists) {             
              this.usersListCVByRDetalle.push(record);
            }           
         });
        }
    }
     
  }

  createNestedTableData(data: any) {
    this.routesList = [];
    this.usersList = [];
    for (let i = 0; i < data.length; ++i) {
      data[i].key = i;
      data[i].expand = false;
      data[i].routeName = data[i].passes[0].routeName;
      for (let x = 0; x < data[i].passes.length; ++x) {
        data[i].passes[x].key = i;
        data[i].passes[x].customerName = data[i].customerName;
        this.usersList.push(data[i].passes[x]);
      }
    }
     this.routesList = data;
  }

  onProductSelect(selectedProductId: any) {
    // Handle the selected product here
    console.log('Selected Product ID s:', selectedProductId);  
    // You can perform additional actions based on the selected product
  }
  onProductSelectByRoute(selectedProductId: any) {
    // Search the routes related!
    this.routeIdSelected = "";
    this.routes = [];  
      this.routeSubscription = this.usersService.getBoardingPassRoute(selectedProductId).pipe(
        takeUntil(this.stopSubscription$)       
      ).subscribe(routes => {        
        this.routes = routes;
        console.log( this.routes);
      });
  }
  onRouteSelectByRoute(routeID: any) {
    // Search the routes related! 
    this.routeIdSelected = routeID;   
  }

  submitFormO(){
    const idCust = this.validateFormO.controls['customerId'].value;
    this.getSubscriptionsByRoute(this.user.vendorId, idCust);
  }
  
  submitForm() {    
    console.log(this.selectedOption);
    
    if (this.validateForm.valid) {
      console.log('Form Submitted:', this.validateForm.value);
      this.rowDataPay= [];
      const idProduct = this.validateForm.controls['id'].value;
      this.getSubscriptions(idProduct);

    } else {
      console.error('Form is invalid');
    }
  
   //console.log(amount);  
  }
   submitFormTurn(){    
    this.rowDataPayTurn= [];
    this.TotalUsers = 0;
    const idProduct = this.validateFormTurn.controls['id'].value;
    const turno =  this.validateFormTurn.controls['turno'].value;
    this.getSubscriptionsByTurn(idProduct, turno);
   }
   submitFormPase(){
    this.rowDataPay= [];
    const idProduct = this.validateFormPase.controls['id'].value;
    this.getSubscriptionsPase(idProduct);
   }

   submitFormAnticipos(){
    this.usersListA= [];
    const idProduct = this.validateFormAnticipos.controls['id'].value;
    this.getSubscriptionsAnticipos(idProduct);
   }

   submitFormCV() {
    this.usersListCV= [];
    const idProduct = this.validateFormCV.controls['id'].value;   
   // console.log("Producto: " + idProduct);
    this.TotalMPP =0;
    this.getSubscriptionsCV(idProduct);
   }  
   submitFormCVByRoute() {   
    const idProduct = this.validateFormCVByRoute.controls['id'].value;     
    this.TotalMPByRoute =0;
    this.getSubscriptionsCVByRoute(idProduct);
    this.usersListCVByRDetalle =[];
    this.FusersListCVByRDetalle = [];
   
   
   } 

   onRowClicked(event: any) {
    //console.log('Row clicked:', event.data.uid); // This will log the clicked row data to the console
  
    this.accountsSubscription =  this.usersService.getUserInfo(event.data.uid).subscribe((data: any) => {
     //console.log(data.payload.data()['customerName']); // Extract user information
    this.signupForm.reset();
     this.signupForm.controls['customerName'].setValue(data.payload.data()['customerName']);
      this.signupForm.controls['defaultRound'].setValue(data.payload.data()['defaultRound']);
      this.signupForm.controls['defaultRouteName'].setValue(data.payload.data()['defaultRouteName']);
      this.signupForm.controls['displayName'].setValue(data.payload.data()['displayName']);
      this.signupForm.controls['email'].setValue(data.payload.data()['email']);
      this.signupForm.controls['firstName'].setValue(data.payload.data()['firstName']);
      this.signupForm.controls['lastName'].setValue(data.payload.data()['lastName']);
      this.signupForm.controls['phone'].setValue(data.payload.data()['phone']);
      this.signupForm.controls['studentId'].setValue(data.payload.data()['studentId']); 
      this.isModalVisible = true;
    });
  }  

  onRowClickedCV(event: any) {
    //log('Row clicked:', event.data.uid); // This will log the clicked row data to the console
  
    this.accountsSubscription =  this.usersService.getUserInfo(event.data.uid).subscribe((data: any) => {
     //console.log(data.payload.data()['customerName']); // Extract user information
    this.signupFormCV.reset();
     this.signupFormCV.controls['customerName'].setValue(data.payload.data()['customerName']);
      this.signupFormCV.controls['defaultRound'].setValue(data.payload.data()['defaultRound']);
      this.signupFormCV.controls['defaultRouteName'].setValue(data.payload.data()['defaultRouteName']);
      this.signupFormCV.controls['displayName'].setValue(data.payload.data()['displayName']);
      this.signupFormCV.controls['email'].setValue(data.payload.data()['email']);
      this.signupFormCV.controls['firstName'].setValue(data.payload.data()['firstName']);
      this.signupFormCV.controls['lastName'].setValue(data.payload.data()['lastName']);
      this.signupFormCV.controls['phone'].setValue(data.payload.data()['phone']);
      this.signupFormCV.controls['studentId'].setValue(data.payload.data()['studentId']); 
      this.isModalVisibleCV = true;
    });
  }  

  detalleCVbyR() {
    if (this.TotalMPByRoute == 0) {
      this.sendMessage('error', "Se requiere seleccionar un producto y operación para detallar.");
    } else {
      //Show detail of the process  
    this.FusersListCVByRDetalle = this.usersListCVByRDetalle;
    }
    //this.FusersListCVByRDetalle = this.usersListCVByRDetalle;
    
  }
  
  sendMessage(type: string, message: string): void {
    this.msg.create(type, message);
  }

  handleOK() { 
    this.isModalVisible = false;
    this.isModalVisibleCV =false;
  }
  handleCancel () { // cancel.
    this.isModalVisible = false;
    this.isModalVisibleCV = false;
  }

  customCellRenderer(params: { data: { passes: any; }; }): string {
    const passes = params.data.passes;
    const rowCount = passes.reduce((accumulator: number) => {
      return accumulator + 1;
    }, 0);
    return rowCount.toString(); // Convert the result to a string
  }

  customCellRendererMonto(params: { data: { passes: any; }; }): string {
    const passes = params.data.passes;
    const totalAmount = passes.reduce((accumulator: any, currentValue: { amount: any; }) => {
      return accumulator + currentValue.amount;
    }, 0);
    const formattedAmount = totalAmount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD' // Change 'USD' to the appropriate currency code if needed
    });

    return formattedAmount; 
  }

  formatPermission(value: any): string {
    return !!value ? 'Si' : 'No';
  }
  formatValidTo(value: any): string {
    //console.log(value);
    
    if (!value) return ''; // Handle case when value is null or undefined
    const date = new Date(value.seconds * 1000); // Convierte los segundos a milisegundos
  
  // Formatea la fecha utilizando date-fns
  return format(date, 'MMMM dd yyyy', { locale: es });
  }

  formatMeteSacaCortesia(data: any): string {
    const meteSacaText = !!data.isTaskIn ? 'Si' : 'No';
    const sacaText = !!data.isTaskOut ? 'Si' : 'No';
    const cortesiaText = !!data.is_courtesy ? 'Si' : 'No';
    return `${meteSacaText} / ${sacaText} / ${cortesiaText}`;
  }

  calculateDaysDifference(promiseDate: Timestamp): string {
   // console.log(promiseDate);
    if (!promiseDate) return '';
    const promiseTimestamp = promiseDate; // Firestore Timestamp    
    const promiseDateObj = promiseTimestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
    const today: Date = new Date(); // Get today's date
    const timeDifference = promiseDateObj.getTime() - today.getTime(); // Calculate the time difference in milliseconds
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return daysDifference + ' días';
  }
  
  formatPromiseDate(value: any): string {
    if (!value) return ''; // Handle case when value is null or undefined
    const date = new Date(value); // Assuming value is a valid date string or Date object
    return format(date, 'MMMM dd yyyy', { locale: es });
  }
  calculatePendingPayment(data: { amount: number; amountPayment: number }): string {
    const totalAmount = data.amount - data.amountPayment;
    const formattedAmount = totalAmount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD' // Change 'USD' to the appropriate currency code if needed
    });
    return formattedAmount;
  }

  log(value:any): void {
    //this.selectedOption = value; 
   console.log(value);
   this.sub = this.usersServices.getAccountProducts(value).pipe(
    map((actions:any) => actions.map((a: any) => {
      const id = a.payload.doc.id;
    const data = a.payload.doc.data() as Product;
    return { ...data, id }; // Include id property only once
    }))
  ).subscribe((products: Product[]) => {

    this.products = products;    
    if (this.products.length === 0){
      this.sendMessage('error', "No hay productos relacionados a este cliente.");
   
    }
  });    

  }

  
}