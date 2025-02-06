import { Component, OnInit, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { RoutesService } from '../../shared/services/routes.service';
import { UsersService } from '../../shared/services/users.service';

import { CustomersService } from '../../customers/services/customers.service';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { AccountsService } from '../../shared/services/accounts.service';
import { ColumnItem, DataItem, IStopPoint } from '../../shared/models/ColumItem';
import { ProductsService } from '../../shared/services/products.service';
import { log } from 'console';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-organigrama',
  templateUrl: './organigrama.component.html',
  styleUrls: ['./organigrama.component.css']
})
export class OrganigramaComponent implements OnInit {
  isMederos: boolean = false;
  customers: any = [];
  customerMed: any = [];
  cCollection: AngularFirestoreCollection<any> | undefined;
  cDocument: AngularFirestoreDocument<any> | undefined;
  usersCollection: AngularFirestoreCollection<any> | undefined;

  accountId$ = new Subject<string>();
  routeId$ = new Subject<string>();
  validateForm!: UntypedFormGroup;
  validateFormP!: UntypedFormGroup;
  validateFormM!: UntypedFormGroup;
  stopSubscription$: Subject<any> = new Subject();
  routes: any;
  routesP: any;
  routesM: any;
  products: any;
  rowDataPay: any = [];
  rowData: any = [];
  users: any;
  customerSubscription: Subscription | undefined;
  userSubscription: Subscription | undefined;
  userRoute: boolean = false;
  userRouteP: boolean = false;
  submitPayment: boolean = true;
  contenedores: string = "";
  contenedoresPay: string = "";
  rowDataPre: any = [];
  rowDataPush: any = [];
  customersService = inject(CustomersService);
  routesService = inject(RoutesService);
  usersService = inject(UsersService);
  authService = inject(AuthenticationService);
  accountsService = inject(AccountsService);
  productsService = inject(ProductsService);
  user: any;
  infoSegment: any = [];
  selectedRoute: any;
  initialDataSet: any;
  dataSet = [
    { time: '', lunes: 0, martes: 0, miercoles: 0, jueves: 0, viernes: 0 }
  ];
  dataSetEnd = [
    { time: '', lunes: 0, martes: 0, miercoles: 0, jueves: 0, viernes: 0 },
  ];
  lunesP: number = 0;
  martesP: number = 0;
  miercolesP: number = 0;
  juevesP: number = 0;
  viernesP: number = 0;
  lunesE: number = 0;
  martesE: number = 0;
  miercolesE: number = 0;
  juevesE: number = 0;
  viernesE: number = 0;
  totalLunes: number = 0;
  totalMartes: number = 0;
  totalMiercoles: number = 0;
  totalJueves: number = 0;
  totalViernes: number = 0;
  grantotal: number = 0;
  LunesFinal: number = 0;
  MartesFinal: number = 0;
  MiercolesFinal: number = 0;
  JuevesFinal: number = 0;
  ViernesFinal: number = 0;
  countE: number = 0
  countS: number = 0;
  porcentajeLunes: number = 0;
  porcentajeMartes: number = 0;
  porcentajeMiercoles: number = 0;
  porcentajeJueves: number = 0;
  porcentajeViernes: number = 0;
  sumaTotal: number = 0;
  chkBoardingP: boolean = false;
  totalLunesE: number = 0;
  totalMartesE: number = 0;
  totalMiercolesE: number = 0;
  totalJuevesE: number = 0;
  totalViernesE: number = 0;
  grantotalE: number = 0;
  carro: number = 0;
  asientos: number = 0;
  transportType: string = "";
  camioneta: string = 'Camioneta';
  camion: string = 'Camión';
  listOfColumns: ColumnItem[] = [
    {
      name: 'Turno', sortOrder: null, sortFn: (a: DataItem, b: DataItem) => a.turno.localeCompare(b.turno),
      listOfFilter: [], filterFn: (list: string[], item: DataItem) => list.some(name => item.turno.indexOf(name) !== -1)
    },
    {
      name: 'Tipo de Viaje', sortOrder: null, sortFn: (a: DataItem, b: DataItem) => a.roundTrip.localeCompare(b.roundTrip),
      listOfFilter: [], filterFn: (list: string[], item: DataItem) => list.some(name => item.roundTrip.indexOf(name) !== -1)
    },
    {
      name: 'Nombre', sortOrder: null, sortFn: (a: DataItem, b: DataItem) => a.displayName.localeCompare(b.displayName),
      listOfFilter: [], filterFn: (list: string[], item: DataItem) => list.some(name => item.displayName.indexOf(name) !== -1)
    },
    { name: 'Identificación', sortOrder: null, sortFn: null, listOfFilter: [], filterFn: null },
    { name: 'Telefono', sortOrder: null, sortFn: null, listOfFilter: [], filterFn: null },
    { name: 'Email', sortOrder: null, sortFn: null, listOfFilter: [], filterFn: null },
    { name: 'Estatus', sortOrder: null, sortFn: null, listOfFilter: [], filterFn: null },
  ];

  constructor(private afs: AngularFirestore,
    private messageService: NzMessageService,
    private fb: UntypedFormBuilder
  ) {
    this.authService.user.subscribe(user => {
      if (user) {
        this.user = user;
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
              this.fillData();
              return record;
            })
          ).subscribe();
        }
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
    this.validateFormM = this.fb.group({
      customerId: ['', [Validators.required]],
      customerName: [],
      routeId: ['', [Validators.required]],
      productId: ['', [Validators.required]],
      asientos: [0, Validators.required],
      chkBoardingP: [false]
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
        this.isMederos = true;
        this.customers = [customers];
        const carruselCustomers = this.customers.filter((customer: any) => customer.isCarrusel);
        if (carruselCustomers.length > 0) {
          this.customerMed = carruselCustomers;
          this.getRoutesForMed(this.customerMed);
        }
      });
    } else {
      this.cCollection = this.afs.collection<any>('customers', ref => ref.where('active', '==', true));
      this.customerSubscription = this.cCollection.snapshotChanges().pipe(
        map((actions: any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe(customers => {
        this.customers = customers;
        const carruselCustomers = this.customers.filter((customer: any) => customer.isCarrusel);
        if (carruselCustomers.length > 0) {
          this.isMederos = true;
          this.customerMed = carruselCustomers;
          this.getRoutesForMed(this.customerMed);
        }
      });
    }
  }
  getRoutesForMed(customer: any) {
    this.validateFormM.controls['customerName'].setValue(customer[0].name);
    this.validateFormM.controls['customerId'].setValue(customer[0].id);
    this.routesService.getRoutes(customer[0].id).pipe(
      takeUntil(this.stopSubscription$),
      map((actions: any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      })))
      .subscribe((routes: IStopPoint[]) => {
        this.routesM = routes;
      });

    this.productsService.getActiveProducts(customer[0].id).pipe(
      takeUntil(this.stopSubscription$),
      map((actions: any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      })))
      .subscribe((prod: any) => {
        this.products = prod;
      });
  }

  submitM() {
    this.carro = this.validateFormM.get('asientos')?.value;
    if (this.validateFormM.valid) {
      let customerId = this.validateFormM.get('customerId')?.value;
      let routeId = this.validateFormM.get('routeId')?.value;
      if (!this.chkBoardingP) {
        this.routesService.getQuotesByRouteandProgram(customerId, routeId, this.transportType).pipe(
          takeUntil(this.stopSubscription$),
          map((actions: any) => actions.map((a: any) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { ...data, id };
          })))
          .subscribe((data: any) => {
            if (data.length == 0) {
              this.sendMessage("info", "No existen registros con estos criterios.");
            }
            this.createDataSet(data);
          });
      }
      else {
        this.routesService.getQuotesByRouteByBoardingPass(customerId, routeId, this.transportType).pipe(
          takeUntil(this.stopSubscription$),
          map((actions: any) => actions.map((a: any) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { ...data, id };
          })),
          map((data: any[]) => {
            return data.filter(item =>
              item.quotesData &&
              Array.isArray(item.quotesData) &&
              item.quotesData.some((quote: any) => quote.transportType === this.transportType)
            );
          }),
          map((filteredData: any[]) => {
            return filteredData.reduce((acc, item) => {
              const quotes = item.quotesData.filter((quote: any) => quote.transportType === this.transportType);
              return acc.concat(quotes);
            }, []);
          })
        )
          .subscribe((flattenedQuotesData: any[]) => {
            if (flattenedQuotesData.length === 0) {
              this.sendMessage("info", "No existen registros con estos criterios.");
            } else {
              this.createDataSet(flattenedQuotesData);
            }
          });
      }
    } else {
      this.sendMessage("error", "Datos invalidos favor de validar");
    }
  }
  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
  }

  onCheckboxChange(event: any) {
    this.chkBoardingP = this.validateFormM.get('chkBoardingP')?.value;
  }

  createDataSet(data: any) {
    const endTimes = this.selectedRoute.initialEnd;
    const initialTimes = this.selectedRoute.initialStart;
    let endDataSet: any[] = [];
    let initialDataSet: any[] = [];
    initialDataSet = initialTimes.map((time: string) => ({
      time,
      lunes: 0,
      martes: 0,
      miercoles: 0,
      jueves: 0,
      viernes: 0,
    }));
    endDataSet = endTimes.map((time: string) => ({
      time,
      lunes: 0,
      martes: 0,
      miercoles: 0,
      jueves: 0,
      viernes: 0,
    }));
    data.forEach((item: any) => {
      item.daysHour.forEach((hour: any) => {
        const dataSetEntry = initialDataSet.find(entry => entry.time === hour.startInit);
        if (dataSetEntry) {
          switch (hour.day) {
            case 1:
              dataSetEntry.lunes += 1; // or some other value to add
              break;
            case 2:
              dataSetEntry.martes += 1; // or some other value to add
              break;
            case 3:
              dataSetEntry.miercoles += 1; // or some other value to add
              break;
            case 4:
              dataSetEntry.jueves += 1; // or some other value to add
              break;
            case 5:
              dataSetEntry.viernes += 1; // or some other value to add
              break;
            default:
              break;
          }
        }
        const dataSetEnd = endDataSet.find(entry => entry.time === hour.endInit);
        if (dataSetEnd) {
          switch (hour.day) {
            case 1:
              dataSetEnd.lunes += 1; // or some other value to add
              break;
            case 2:
              dataSetEnd.martes += 1; // or some other value to add
              break;
            case 3:
              dataSetEnd.miercoles += 1; // or some other value to add
              break;
            case 4:
              dataSetEnd.jueves += 1; // or some other value to add
              break;
            case 5:
              dataSetEnd.viernes += 1; // or some other value to add
              break;
            default:
              break;
          }
        }
      });
    });
    this.dataSet = initialDataSet;
    this.dataSetEnd = endDataSet;
    this.calculateTotals();
  }

  onProductSelect(productId: any): void {
    this.transportType = productId;
  }

  onRoutesSelect(routeId: string): void {
    const selectedRoute = this.routesM.find((route: any) => route.id === routeId);
    if (selectedRoute) {
      this.selectedRoute = selectedRoute;
    }
  }

  calculateTotals(): void {
    this.totalLunes = this.dataSet.reduce((acc, data) => acc + data.lunes, 0);
    this.totalMartes = this.dataSet.reduce((acc, data) => acc + data.martes, 0);
    this.totalMiercoles = this.dataSet.reduce((acc, data) => acc + data.miercoles, 0);
    this.totalJueves = this.dataSet.reduce((acc, data) => acc + data.jueves, 0);
    this.totalViernes = this.dataSet.reduce((acc, data) => acc + data.viernes, 0);
    this.grantotal = this.totalLunes + this.totalMartes + this.totalMiercoles + this.totalJueves + this.totalViernes;

    this.totalLunesE = this.dataSetEnd.reduce((acc, data) => acc + data.lunes, 0);
    this.totalMartesE = this.dataSetEnd.reduce((acc, data) => acc + data.martes, 0);
    this.totalMiercolesE = this.dataSetEnd.reduce((acc, data) => acc + data.miercoles, 0);
    this.totalJuevesE = this.dataSetEnd.reduce((acc, data) => acc + data.jueves, 0);
    this.totalViernesE = this.dataSetEnd.reduce((acc, data) => acc + data.viernes, 0);
    this.grantotalE = this.totalLunesE + this.totalMartesE + this.totalMiercolesE + this.totalJuevesE + this.totalViernesE;

    const totalRecords = this.dataSet.length * this.carro;
    const totalRecordsE = this.dataSetEnd.length * this.carro;
    this.sumaTotal = totalRecords + totalRecordsE;

    this.LunesFinal = this.totalLunes + this.totalLunesE;
    this.MartesFinal = this.totalMartes + this.totalMartesE;
    this.MiercolesFinal = this.totalMiercoles + this.totalMiercolesE;
    this.JuevesFinal = this.totalJueves + this.totalJuevesE;
    this.ViernesFinal = this.totalViernes + this.totalViernesE;

    this.porcentajeLunes = (this.LunesFinal / this.sumaTotal) * 100;
    this.porcentajeMartes = (this.MartesFinal / this.sumaTotal) * 100;
    this.porcentajeMiercoles = (this.MiercolesFinal / this.sumaTotal) * 100;
    this.porcentajeJueves = (this.JuevesFinal / this.sumaTotal) * 100;
    this.porcentajeViernes = (this.ViernesFinal / this.sumaTotal) * 100;

  }
  onCustomerSelectedC(event: null, customers: any) {
    if (event != null && !this.userRoute) {
      this.userRoute = true;
      this.routes = [];
      this.contenedores = "";
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
      this.contenedoresPay = "";
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

  calculateRemaining(value: number): number {
    return this.carro - value;
  }

  ngOnDestroy() {
    this.stopSubscription$.next(undefined);
    this.stopSubscription$.complete();
  }

  fillCustomerRoute(customerID: string) {
    this.routesService.getRoutes(customerID).pipe(
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

  fillCustomerRouteP(customerID: string) {
    this.routesService.getRoutes(customerID).pipe(
      takeUntil(this.stopSubscription$),
      map((actions: any) => actions.map((a: any) => {
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
    this.rowDataPay = [];
    const customerID = this.validateForm.controls['customerId'].value;
    const routeID = this.validateForm.controls['routeId'].value;
    const round = this.validateForm.controls['round'].value;
    let defaultRoundValue = "";
    if (round == 1) {
      defaultRoundValue = "Día";
    } else if (round == 2) {
      defaultRoundValue = "Tarde";
    } else {
      defaultRoundValue = "Nocturno";
    }
    this.usersCollection = this.afs.collection<any>('users', ref =>
      ref.where('status', '==', 'preRegister')
        .where('customerId', '==', customerID)
        .where('turno', '==', round)
        .where('defaultRoute', '==', routeID)
        .orderBy('displayName'));
    this.userSubscription = this.usersCollection.snapshotChanges().pipe(
      map((actions: any) => actions.map((a: { payload: { doc: { id: any; data: () => any; }; }; }) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      }))
    ).subscribe(users => {
      this.loadUsers(users);
    });
  }

  loadUsers(users: any) {
    this.rowDataPay = users;
    if (users.length <= 14) {
      this.contenedores = this.organigrama(users.length, 13, 19, 40);
    } else {
      if (users.length <= 19) {
        this.contenedores = this.organigrama(users.length, 14, 17, 40);
      } else {
        this.contenedores = this.organigrama(users.length, 14, 19, 40);
      }
    }
  }

  loadUsersP(user: any) {
    this.contenedoresPay = "";
    this.rowData = user;
    if (this.rowData.length <= 14) {
      this.contenedoresPay = this.organigrama(this.rowData.length, 13, 19, 40);
    } else {
      if (this.rowData.length <= 19) {
        this.contenedoresPay = this.organigrama(this.rowData.length, 14, 17, 40);
      } else {
        this.contenedoresPay = this.organigrama(this.rowData.length, 14, 19, 40);
      }
    }
  }

  onRoundSelected(): void {
    if (this.submitPayment) {
      this.submitPayment = false;
      this.userRouteP = false;
      this.rowData = [];
      this.rowDataPre = [];
      const customerID = this.validateFormP.controls['customerId'].value;
      const routeID = this.validateFormP.controls['routeId'].value;
      const round = parseInt(this.validateFormP.controls['round'].value, 10);
      let defaultRoundValue = "";
      if (round == 1) {
        defaultRoundValue = "Día";
      } else if (round == 2) {
        defaultRoundValue = "Tarde";
      } else {
        defaultRoundValue = "Nocturno";
      }
      this.usersCollection = this.afs.collection<any>('users', ref =>
        ref.where('customerId', '==', customerID)
          .where('defaultRound', '==', defaultRoundValue)
          .where('defaultRoute', '==', routeID).orderBy('displayName')
      );
      this.userSubscription = this.usersCollection.snapshotChanges().pipe(
        map((actions: any) => actions.map((a: { payload: { doc: { id: any; data: () => any; }; }; }) => {
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

  load() {
    if (this.rowData.length >= 1) {
      this.rowDataPush = [];
      this.rowData.forEach((user: { id: any; }) => {
        const userId = user.id;
        this.afs.collection(`users/${userId}/boardingPasses`, ref =>
          ref.where('active', '==', true).limit(1) // Limita a 1 documento para eficiencia
        ).get().subscribe(boardingPassessDetailSnapshot => {
          if (!boardingPassessDetailSnapshot.empty) {
            this.rowDataPush.push({ ...user });
          }
        });
      });
    } else {
      this.contenedoresPay = "No existen coincidencias!";
    }
  }
  submitFormPaid() {
    this.rowDataPre = [];
    this.submitPayment = true;
    this.rowDataPre = this.rowDataPush;
    this.loadUsersP(this.rowDataPre);
  }

  organigrama(numero: number, c1: number, c2: number, c3: number) {
    let contenedor13 = 0;
    let contenedor17 = 0;
    let contenedor36 = 0;
    let sobrante = 0;
    let contenedorinicial: boolean = false;
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
      if (!contenedorinicial) {
        contenedor = `Se necesitan 0 camiones  ${contenedor} en total.`;
      } else {
        contenedor = `Se necesitan ${contenedor} en total.`;
      }
    } else {
      contenedor = 'No se necesitan camiones.';
    }
    return contenedor;
  }

  resetFilters(): void {
  }
  resetFiltersPay(): void {
  }

  trackByName(_: number, item: ColumnItem): string {
    return item.name;
  }
  trackByNamePay(_: number, item: ColumnItem): string {
    return item.name;
  }

  sortBPay(): void {
  }

  sortBy(): void {
  }

}

