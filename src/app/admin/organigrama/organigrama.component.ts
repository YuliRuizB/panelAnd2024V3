import { Component, OnInit, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { RoutesService } from '../../shared/services/routes.service';
import { UsersService } from '../../shared/services/users.service';
import { GeoPoint } from 'firebase/firestore';
import { CustomersService } from '../../customers/services/customers.service';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { AccountsService } from '../../shared/services/accounts.service';


export interface IStopPoint {
  id: string;
  active: boolean;
  description: string;
  geopoint: GeoPoint;
  imageUrl: string;
  name: string;
  order: number;
  rounds:  IRound;
}
interface IRound {
  round1?: string;
  round2?: string;
  round3?: string;
  round4?: string;
}

interface DataItem {
  turno: string;
  roundTrip: string;
  displayName: string;  
  studentId: string;
  phoneNumber: string;
  email:string;
  status: string ;
}
interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
}

@Component({
  selector: 'app-organigrama',
  templateUrl: './organigrama.component.html',
  styleUrls: ['./organigrama.component.css']
})
export class OrganigramaComponent implements OnInit {
  customers:any = [];
  cCollection: AngularFirestoreCollection<any> | undefined;
  cDocument: AngularFirestoreDocument<any> | undefined;
  usersCollection: AngularFirestoreCollection<any> | undefined;

  accountId$ = new Subject<string>();
  routeId$ = new Subject<string>();
  validateForm!: UntypedFormGroup ;
  validateFormP!: UntypedFormGroup;
  stopSubscription$: Subject<any> = new Subject();
  routes: any ;
  routesP : any;
  rowDataPay: any = [];
  rowData: any =[];
  //columnDefsPagosGenerados;
  gridApi: any;
  gridColumnApi: any;
  users: any;
  customerSubscription: Subscription | undefined;
  userSubscription: Subscription | undefined;
  userRoute: boolean = false;
  userRouteP: boolean= false;
  submitPayment: boolean = true;
contenedores:string = "";
contenedoresPay:string = "";
rowDataPre: any = [];
rowDataPush: any  = [];
customersService = inject(CustomersService);
routesService = inject(RoutesService);
usersService= inject(UsersService);
authService = inject(AuthenticationService);
accountsService = inject(AccountsService);
user: any;
infoSegment: any  = [];
listOfColumns: ColumnItem[] = [
  {
    name: 'Turno',
    sortOrder: null,
    sortFn: (a: DataItem, b: DataItem) => a.turno.localeCompare(b.turno),
    listOfFilter: [ ], 
    filterFn: (list: string[], item: DataItem) => 
      list.some(name => item.turno.indexOf(name) !== -1)
  },
  {
    name: 'Tipo de Viaje',
    sortOrder: null,
    sortFn: (a: DataItem, b: DataItem) => a.roundTrip.localeCompare(b.roundTrip),
    listOfFilter: [ ], 
    filterFn: (list: string[], item: DataItem) => 
      list.some(name => item.roundTrip.indexOf(name) !== -1)
  },
  {
    name: 'Nombre',
    sortOrder: null,
    sortFn: (a: DataItem, b: DataItem) => a.displayName.localeCompare(b.displayName),
    listOfFilter: [ ], 
    filterFn: (list: string[], item: DataItem) => 
      list.some(name => item.displayName.indexOf(name) !== -1)
  },  
  {
    name: 'Matricula',
    sortOrder: null,
    sortFn:null,
    listOfFilter: [ ], 
    filterFn: null
  },
  {
    name: 'Telefono',
    sortOrder: null,
    sortFn: null,
    listOfFilter: [ ], 
    filterFn: null
  }, 
  {
    name: 'Email',
    sortOrder: null,
    sortFn: null,
    listOfFilter: [ ], 
    filterFn: null
  },
  {
    name: 'Estatus',
    sortOrder: null,
    sortFn: null,
    listOfFilter: [ ], 
    filterFn: null
  },
];
  constructor( private afs: AngularFirestore,
    private fb: UntypedFormBuilder
 ) { 
  this.authService.user.subscribe(user => {   
    this.user = user;
   // console.log(this.user); /idSegment
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
            this.fillData;         
            return record;
          })
        ).subscribe();
      }      
  });

  }

  ngOnInit() {
  
      this.validateForm = this.fb.group({       
        customerId: ['', [Validators.required]],   
        customerName: [],  
        routeId: ['', [Validators.required]],
        routeName: ['', [Validators.required]],
        round: ['', [Validators.required]]       
      });

      this.validateFormP = this.fb.group({       
        customerId: ['', [Validators.required]], 
        customerName: [],      
        routeId: ['', [Validators.required]],
        routeName: ['', [Validators.required]],
        round: ['', [Validators.required]]       
      });
  }

  fillData() {
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      this.cDocument = this.afs.collection('customers').doc(this.user.customerId);
      this.customerSubscription = this.cDocument.snapshotChanges().pipe(
        map(action => {
          const id = action.payload.id;
          const data = action.payload.data() as any;
          return { id, ...data };
        })
      ).subscribe(customers => {
        this.customers = customers;
      });
    } else {
      this.cCollection = this.afs.collection<any>('customers', ref => ref.where('active','==',true));
      this.customerSubscription  = this.cCollection.snapshotChanges().pipe(
        map((actions:any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe(customers => {
        this.customers = customers;      
      });
  }
  }
  
  onCustomerSelectedC(event: null, customers: any) {   
    if (event != null && !this.userRoute) {
      this.userRoute = true;      
      this.routes = [];
      this.contenedores= "";
      this.rowDataPay = [];   
      const recordArray = _.filter(customers, r => {
        return r.id == event;
      });      
      const record = recordArray[0];          
      
      this.validateForm.controls['customerName'].setValue(record.name);    
      this.validateForm.controls['customerId'].setValue(record.id);        
      this.fillCustomerRoute(record.id); 
    }

  }
  onCustomerSelectedP(event: null, customers: any) {    
    if (event != null && !this.userRouteP) {
      this.userRouteP = true;
      this.routesP = [];
      this.contenedoresPay= "";  
      this.rowDataPre = [];   
      this.rowData = []; 
      const recordArray = _.filter(customers, r => {
        return r.id == event;
      });
      const record = recordArray[0];

      this.validateFormP.controls['customerName'].setValue(record.name);
      this.validateFormP.controls['customerId'].setValue(record.id);    
       this.fillCustomerRouteP(record.id);     
    }

  }

  ngOnDestroy() {
    this.stopSubscription$.next(undefined);
    this.stopSubscription$.complete();
  }

  fillCustomerRoute(customerID: string) {   
    this.routesService.getRoutes(customerID).pipe(
      takeUntil(this.stopSubscription$),
      map((actions:any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      })))
      .subscribe((routes: IStopPoint[]) => {
        this.routes = routes;       
      });
  }

  fillCustomerRouteP(customerID: string) {   
    this.routesService.getRoutes(customerID).pipe(
      takeUntil(this.stopSubscription$),
      map((actions:any) => actions.map((a:any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      })))
      .subscribe((routes: IStopPoint[]) => {
        this.routesP = routes;       
      });
  }


  onRouteSelected(event: string, routes: any) {   
    this.routeId$.next(event);
    const recordArray = _.filter(routes, r => {
      return r.routeId == event;
    });
    const record = recordArray[0];   
    this.validateForm.controls['routeName'].setValue(record.name);

  }
  onRouteSelectedP(event: string, routesP: any) {   
    this.routeId$.next(event);
    const recordArray = _.filter(routesP, r => {
      return r.routeId == event;
    });
    const record = recordArray[0];   
    this.validateFormP.controls['routeName'].setValue(record.name);

  }

  submitFormUnPaid(): void {
    this.userRoute = false;      
    this.rowDataPay= [];
    const customerID = this.validateForm.controls['customerId'].value;
    const routeID = this.validateForm.controls['routeId'].value;  
    const round = this.validateForm.controls['round'].value;
    let defaultRoundValue = "";
    if (round == 1) {
      defaultRoundValue = "Día";
    } else if(round == 2) {
      defaultRoundValue = "Tarde";
    } else {
      defaultRoundValue = "Nocturno";
    }       
    this.usersCollection = this.afs.collection<any>('users', ref => 
      ref.where('status', '==', 'preRegister')
      .where('customerId', '==', customerID)
     .where('turno','==', round)
      .where('defaultRoute','==',routeID)
      .orderBy('displayName'));    
    this.userSubscription = this.usersCollection.snapshotChanges().pipe(
      map((actions:any) => actions.map((a: { payload: { doc: { id: any; data: () => any; }; }; }) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      }))
    ).subscribe(users => {     
      this.loadUsers(users);
    });
  }

  loadUsers(users:any){   
    this.rowDataPay = users;  
     if (users.length <= 14) {
      this.contenedores = this.organigrama(users.length,13,19,40);
    } else { if (users.length <= 19) {
      this.contenedores = this.organigrama(users.length,14,17,40);
    } else {
      this.contenedores = this.organigrama(users.length,14,19,40);
    }
    }   
  }

  loadUsersP(user:any){   
    this.contenedoresPay= "";    
    this.rowData = user;
     if (this.rowData.length <= 14) {
      this.contenedoresPay = this.organigrama(this.rowData.length,13,19,40);
    } else { if (this.rowData.length <= 19) {
      this.contenedoresPay = this.organigrama(this.rowData.length,14,17,40);
    } else {
      this.contenedoresPay = this.organigrama(this.rowData.length,14,19,40);
    }
    }   
  }

  onRoundSelected(): void {      
    if (this.submitPayment){
    
    this.submitPayment= false;
    this.userRouteP = false;      
    this.rowData= [];
    this.rowDataPre = [];
    const customerID = this.validateFormP.controls['customerId'].value;
    const routeID = this.validateFormP.controls['routeId'].value;     
    const round = parseInt(this.validateFormP.controls['round'].value, 10);
    let defaultRoundValue = "";
    if (round == 1) {
      defaultRoundValue = "Día";
    } else if(round == 2) {
      defaultRoundValue = "Tarde";
    } else {
      defaultRoundValue = "Nocturno";
    }    

    this.usersCollection = this.afs.collection<any>('users', ref => 
      ref.where('customerId', '==', customerID)
     .where('defaultRound','==', defaultRoundValue)
     .where('defaultRoute','==',routeID).orderBy('displayName')
    );    
    this.userSubscription = this.usersCollection.snapshotChanges().pipe(
      map((actions:any) => actions.map((a: { payload: { doc: { id: any; data: () => any; }; }; }) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      }))
    ).subscribe(users => {   
      this.rowData = users;     
      this.load();
    }); 
    }
  }

 load(){
  if (this.rowData.length >= 1) {
    this.rowDataPush =[];
    this.rowData.forEach((user: { id: any; }) => {
      const userId = user.id;
         this.afs.collection(`users/${userId}/boardingPasses`, ref =>
        ref.where('active', '==', true).limit(1) // Limita a 1 documento para eficiencia
        ).get().subscribe(boardingPassessDetailSnapshot => {            
          if (!boardingPassessDetailSnapshot.empty) {
            // El usuario tiene una subcolección 'boardingPassessDetail' con al menos un documento 'active' = true
            // Realiza la acción necesaria aquí (puede ser agregar a otra lista, etc.)
            console.log(`El usuario con ID ${userId} tiene un boardingPassessDetail activo.`);
            this.rowDataPush.push({...user});             
          }
      });      
    });     
  }else {     
    this.contenedoresPay = "No existen coincidencias!";
  }
 }
  submitFormPaid() {   
    this.submitPayment= true;
    this.rowDataPre = this.rowDataPush;
    this.loadUsersP(this.rowDataPre);

  }

  organigrama(numero: number, c1:number,c2:number,c3:number) {
    let contenedor13 = 0;
  let contenedor17 = 0;
  let contenedor36 = 0;
  let sobrante = 0;
  let contenedorinicial:boolean = false;

  while (numero > 0) {
    if (numero >= c3) {
      contenedor36++;
      numero -= c3;
    } else if (numero >= c2) {
      contenedor17++;
      numero -= c2;
    } else if (numero >= c1) {
      contenedor13++;
      numero -= c1;
    } else {
      sobrante = numero;
      break; // Salir del bucle ya que no se puede almacenar más en contenedores
    }
  }
  
  let contenedor = '';

  if (contenedor13 > 0) {
    contenedor += `${contenedor13} camiones de 14 pasajeros, `;
    contenedorinicial = true;
  }

  if (contenedor17 > 0) {
    contenedor += `${contenedor17} camiones de 19 pasajeros, `;
    contenedorinicial = true;
  }

  if (contenedor36 > 0) {
    contenedor += `${contenedor36} camiones de 40 pasajeros, `;
    contenedorinicial = true;
  }

  if (sobrante > 0) {
    contenedor += `y restan ${sobrante} pasajeros sin asignacion, `;
  }

  if (contenedor !== '') {
    if(!contenedorinicial) {
      contenedor = `Se necesitan 0 camiones  ${contenedor} en total.`;
    } else{
      contenedor = `Se necesitan ${contenedor} en total.`;
    }
    
  } else {
    contenedor = 'No se necesitan camiones.';
  }
  return contenedor;
}

resetFilters(): void {
 /*  this.listOfColumns.forEach(item => {
    if (item.name === 'Name') {
      item.listOfFilter = [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' }
      ];
    } else if (item.name === 'Address') {
      item.listOfFilter = [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' }
      ];
    }
  }); */
}
resetFiltersPay(): void {
  /*  this.listOfColumns.forEach(item => {
     if (item.name === 'Name') {
       item.listOfFilter = [
         { text: 'Joe', value: 'Joe' },
         { text: 'Jim', value: 'Jim' }
       ];
     } else if (item.name === 'Address') {
       item.listOfFilter = [
         { text: 'London', value: 'London' },
         { text: 'Sidney', value: 'Sidney' }
       ];
     }
   }); */
 }
 

trackByName(_: number, item: ColumnItem): string {
  return item.name;
}
trackByNamePay(_: number, item: ColumnItem): string {
  return item.name;
}


sortBPay(): void {
  /*  this.listOfColumns.forEach(item => {
     if (item.name === 'Age') {
       item.sortOrder = 'descend';
     } else {
       item.sortOrder = null;
     }
   }); */
 }

sortBy(): void {
 /*  this.listOfColumns.forEach(item => {
    if (item.name === 'Age') {
      item.sortOrder = 'descend';
    } else {
      item.sortOrder = null;
    }
  }); */
}

}

