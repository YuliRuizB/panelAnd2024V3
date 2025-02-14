import { Component, OnInit, ViewChild, ElementRef, NgZone, inject, PLATFORM_ID, Inject } from '@angular/core'
import { takeUntil, map, tap } from 'rxjs/operators';
import { startOfToday, endOfToday, format, fromUnixTime } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import * as _ from 'lodash';
import { ColumnDefs, IActivityLog, LiveProgramColumnDefs } from "../../logistics/classes";
import { GeoJson } from '../../logistics/map';
import { UntypedFormGroup, UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LogisticsService } from '../../logistics/services.service';
import { LiveService } from '../../shared/services/live.service';
import { AccountsService } from '../../shared/services/accounts.service';
import { Subject, Subscription } from 'rxjs';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { RoutesService } from '../../shared/services/routes.service';
import { IStopPoint } from '../../shared/interfaces/route.type';
import { log } from 'node:console';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

import { isPlatformBrowser } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { HttpClient } from '@angular/common/http';

class GeoPoint {
  constructor(public _lat: number, public _long: number) { }
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<IActivityLog> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<IActivityLog> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}


@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.component.html',
  styleUrls: ['./logistics.component.css']
})
export class LogisticsComponent implements OnInit {
  isBrowser: boolean;
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  dateRangeForm: UntypedFormGroup;
  dateRangeFormA: UntypedFormGroup;
  dateRangeFormAct: UntypedFormGroup;
  dateRangeFormMap: UntypedFormGroup;
  accountsSubscription!: Subscription;
  startDate: Date;
  endDate: Date;
  startDateA: Date;
  endDateA: Date;
  startDateAct: Date;
  endDateAct: Date;
  customerIdSelected: string = "";
  customersList: any[] = [];

  visible = false;
  vMessage = false;
  lat = 37.75;
  lng = -122.41;
  loading = false;

  center: google.maps.LatLngLiteral = {
    lat: 37.75,
    lng: -122.41
  }
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerOptions: google.maps.MarkerOptions = {
    icon: '/assets/icon/bluePointer.png'
  };

  mapOptions: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    panControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  }

  vertices: google.maps.LatLngLiteral[] = [];
  display: any;
  zoom: any;
  accountsList: any = [];
  stopSubscription$: Subject<boolean> = new Subject();
  user: any;
  customerName: string = "Empresa";
  infoSegment: any = [];
  routes: any;
  fillRoutes: boolean = false;
  fillCustomer: boolean = false;
  source: any;
  sourceLiveVehicles: any;
  markers: any;
  rowData!: IActivityLog[];
  filteredData!: IActivityLog[];
  rowFleetData!: any[];
  activityList!: IActivityLog[];
  chartData: any;
  gridColumnApi: any;
  resultLiveRoundD: any;
  resultLiveRoundT: any;
  resultLiveRoundN: any;

  resultLiveRoundDLevel2: any;
  resultLiveRoundTLevel2: any;
  resultLiveRoundNLevel2: any;
  resultUsers: any;
  sumD: string = "0";
  sumT: string = "0";
  sumN: string = "0";
  sumTotalUsers: number = 0;
  sumTotalUsersRange: number = 0;
  cardTitle: string = '';
  descriptionRoute: string = "";
  driverName: string = "";
  driverConfirmationAt: | Date | undefined | null = null;
  startedAt: | Date | undefined | null = null;
  lastUpdatedAt: | Date | undefined | null = null;
  isConfirmed: boolean = false;
  isRejected: boolean = false;
  hasEnded: boolean = false;

  activeRoute: string = "False";
  round: string = "";
  vehicleName: string = "";
  selectedOption: any;
  logisticsService = inject(LogisticsService);
  liveService = inject(LiveService);
  accountsService = inject(AccountsService);
  authService = inject(AuthenticationService);
  routesService = inject(RoutesService);
  // estructura de la tabla.
  listOfColumns: ColumnItem[] = [
    {
      name: 'Fecha',
      sortOrder: null,
      sortFn: (a: IActivityLog, b: IActivityLog) => a.created.localeCompare(b.created),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim', byDefault: true }
      ],
      filterFn: (list: string[], item: IActivityLog) => list.some(name => item.created.indexOf(name) !== -1)
    },
    {
      name: 'Alumno',
      sortOrder: null,
      sortFn: (a: IActivityLog, b: IActivityLog) => a.studentName.localeCompare(b.studentName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim', byDefault: true }
      ],
      filterFn: (list: string[], item: IActivityLog) => list.some(name => item.studentName.indexOf(name) !== -1)
    },
    {
      name: 'Identificación',
      sortOrder: null,
      sortFn: (a: IActivityLog, b: IActivityLog) => a.studentId.localeCompare(b.studentId),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim', byDefault: true }
      ],
      filterFn: (list: string[], item: IActivityLog) => list.some(name => item.studentId.indexOf(name) !== -1)
    },
    {
      name: 'Ingreso con',
      sortOrder: null,
      sortFn: (a: IActivityLog, b: IActivityLog) => a.studentId.localeCompare(b.studentId),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim', byDefault: true }
      ],
      filterFn: (list: string[], item: IActivityLog) => list.some(name => item.studentId.indexOf(name) !== -1)
    },
    {
      name: 'Evento',
      sortOrder: null,
      sortFn: (a: IActivityLog, b: IActivityLog) => a.event.localeCompare(b.event),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim', byDefault: true }
      ],
      filterFn: (list: string[], item: IActivityLog) => list.some(name => item.event.indexOf(name) !== -1)
    },
    {
      name: 'Tipo',
      sortOrder: null,
      sortFn: (a: IActivityLog, b: IActivityLog) => a.type.localeCompare(b.type),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim', byDefault: true }
      ],
      filterFn: (list: string[], item: IActivityLog) => list.some(name => item.type.indexOf(name) !== -1)
    },
    {
      name: 'Descripción',
      sortOrder: null,
      sortFn: (a: IActivityLog, b: IActivityLog) => a.description.localeCompare(b.description),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim', byDefault: true }
      ],
      filterFn: (list: string[], item: IActivityLog) => list.some(name => item.description.indexOf(name) !== -1)
    },
    {
      name: 'Operación',
      sortOrder: null,
      sortFn: (a: IActivityLog, b: IActivityLog) => a.route.localeCompare(b.route),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim', byDefault: true }
      ],
      filterFn: (list: string[], item: IActivityLog) => list.some(name => item.route.indexOf(name) !== -1)
    },
    {
      name: 'Turno',
      sortOrder: null,
      sortFn: (a: IActivityLog, b: IActivityLog) => a.round.localeCompare(b.round),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim', byDefault: true }
      ],
      filterFn: (list: string[], item: IActivityLog) => list.some(name => item.round.indexOf(name) !== -1)
    },
    {
      name: 'Programa',
      sortOrder: null,
      sortFn: (a: IActivityLog, b: IActivityLog) => a.program.localeCompare(b.program),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim', byDefault: true }
      ],
      filterFn: (list: string[], item: IActivityLog) => list.some(name => item.program.indexOf(name) !== -1)
    },
    {
      name: 'Vehículo',
      sortOrder: null,
      sortFn: (a: IActivityLog, b: IActivityLog) => a.vehicleName.localeCompare(b.vehicleName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim', byDefault: true }
      ],
      filterFn: (list: string[], item: IActivityLog) => list.some(name => item.vehicleName.indexOf(name) !== -1)
    },
    {
      name: '¿Subió?',
      sortOrder: null,
      sortFn: null,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Si', value: true },
        { text: 'No', value: false, byDefault: true }
      ],
      filterFn: null
    }

  ];
  columnDefs: ColDef[];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private notification: NzNotificationService,
    private afs: AngularFirestore,
    private fb: UntypedFormBuilder,
    private zone: NgZone
  ) {
    this.markers = [] as GeoJson[];
    this.startDate = startOfToday()
    this.endDate = endOfToday();
    this.startDateA = startOfToday()
    this.endDateA = endOfToday();
    this.startDateAct = startOfToday()
    this.endDateAct = endOfToday();
    this.startedAt = startOfToday();
    this.lastUpdatedAt =null;
    this.driverConfirmationAt = null;

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
              this.getAccountsMaps();
              this.getCustomersList();
              return record;
            })
          ).subscribe();
        }
      }
    });

    this.dateRangeForm = this.fb.group({
      startDate: [startOfToday()], // Default to the start of today
      endDate: [endOfToday()],    // Default to the end of today
      selectedOption: [null]
    });

    this.dateRangeFormA = this.fb.group({
      startDate: [startOfToday()], // Default to the start of today
      endDate: [endOfToday()]     // Default to the end of today
    });

    this.dateRangeFormAct = this.fb.group({
      startDate: [startOfToday()], // Default to the start of today
      endDate: [endOfToday()],     // Default to the end of today
      customerId: [],
    });
    this.dateRangeFormMap = this.fb.group({
      customerId: [],
      customerName: [],
      routeId: [],
      routeName: []
    });
  

    if (typeof window !== 'undefined' && window.navigator && window.navigator.geolocation) {
      // Get current position
      window.navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.center = { lat: latitude, lng: longitude };
      }, (error) => {
        console.error('Error getting geolocation:', error);
      });
    } else {
      // Handle case when geolocation is not supported
      console.error('Geolocation is not supported by this browser.');
    }
   
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.columnDefs = [
      {
        headerName: 'Fecha', floatingFilter: true, filter: true, field: 'created', cellRenderer: (params: any) => {
          if (params && params.value) {
            return format(fromUnixTime(params.value.seconds), 'MM/dd/yyyy HH:mm', { locale: esLocale })
          } else { return '' }
        }
      },
      { headerName: 'Alumno', field: 'studentName', filter: true, floatingFilter: true },
      { headerName: 'Identificación', field: 'studentId', filter: true, floatingFilter: true },
      { headerName: 'Ingreso con', field: 'studentId', floatingFilter: true, enableValue: true, filter: true, allowedAggFuncs: ['count'] },
      { headerName: 'Evento', field: 'event', filter: true, floatingFilter: true },
      { headerName: 'Tipo', field: 'type', filter: true, floatingFilter: true },
      { headerName: 'Descripción', field: 'description', filter: true, floatingFilter: true },
      { headerName: 'Operación', field: 'route', filter: true, floatingFilter: true },
      { headerName: 'Turno', field: 'round', filter: true, floatingFilter: true },
      { headerName: 'Programa', field: 'program', filter: true, floatingFilter: true },
      { headerName: 'Vehículo', field: 'vehicle', filter: true, floatingFilter: true },
      { headerName: '¿Subió?', field: 'allowedOnBoard', filter: true, floatingFilter: true }
    ];
  }

  getCustomersList() {
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      const customersCollection = this.afs.collection('customers').doc(this.user.customerId);
      customersCollection.snapshotChanges().pipe(
        takeUntil(this.stopSubscription$),
        map((action: any) => {
          const id = action.payload.id;
          const data = action.payload.data() as any;
          return { id, ...data };
        }),
        tap((customers: any) => {
          this.customersList = [customers];
          return customers;
        })
      ).subscribe();
    } else {
      const customersCollection = this.afs.collection('customers', ref => ref.orderBy('name'));
      customersCollection.snapshotChanges().pipe(
        takeUntil(this.stopSubscription$),
        map((actions: any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        })),
        tap((customers: any) => {
          this.customersList = customers;
          return customers;
        })
      ).subscribe();
    }
  }

  moveMap(event: google.maps.MapMouseEvent) {
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = event.latLng.toJSON();
    }
  }

  onDateRangeChange(): void {
    // Access the selected start and end dates from the form group
    this.startDate = this.dateRangeForm.get('startDate')!.value;
    this.endDate = this.dateRangeForm.get('endDate')!.value;
    if (this.startDate && this.endDate) {
      this.loadData();
    }
    else {
      this.notification.create('error', 'Error', 'Se Requiere un rango de fechas');
    }
  }

  onDateRangeChangeA(): void {
    // Access the selected start and end dates from the form group
    this.startDateA = this.dateRangeFormA.get('startDate')!.value;
    this.endDateA = this.dateRangeFormA.get('endDate')!.value;
    if (this.startDateA && this.endDateA) {
      this.loadData();
    }
    else {
      this.notification.create('error', 'Error', 'Se Requiere un rango de fechas');
    }
  }

  onDateRangeChangeMap(): void {

    if (this.dateRangeFormMap.get('routeId')!.value != undefined) {
      const recordArray = _.filter(this.routes, r => {
        return r.id == this.dateRangeFormMap.get('routeId')!.value;
      });
      const record = recordArray[0];
      this.cardTitle = record.name;
      this.descriptionRoute = record.description
    }
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      this.markers = this.logisticsService.getliveBusses(this.dateRangeFormMap.get('customerId')!.value, this.dateRangeFormMap.get('routeId')!.value);
      this.markers.pipe(
        map((actions: any) => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data }
          });
        })
      ).subscribe((markers: any) => {
        if (markers && markers.length > 0 && markers[0].geopoint) {
          this.driverName = markers[0].driver;
          this.driverConfirmationAt = markers[0].driverConfirmationAt;
          this.startedAt = markers[0].startAted;
          this.activeRoute = markers[0].active;
          this.isConfirmed = markers[0].isConfirmed;          
          this.isRejected = markers[0].isRejected;
          this.hasEnded = markers[0].hasEnded;
          this.lastUpdatedAt = markers[0].lastUpdatedAt;
          this.round = markers[0].round;
          this.vehicleName = markers[0].vehicleName;
          this.addGeoPointToMarkerPositions(markers[0].geopoint);
        } else {
          this.notification.create('warning', 'Información', 'No hay operaciones activas en este momento.');
          this.driverName = "";
          this.driverConfirmationAt = null;
          this.startedAt = null;
          this.lastUpdatedAt= null;
          this.activeRoute = "False";
          this.isConfirmed = false;
          this.isRejected = false;
          this.hasEnded = false;
          this.round = "";
          this.vehicleName = "";
          this.descriptionRoute = "";
          this.lastUpdatedAt =null;
          this.markerPositions = [];
        }
      })
    } else {
      this.markers = this.logisticsService.getliveBusses(this.dateRangeFormMap.get('customerId')!.value, this.dateRangeFormMap.get('routeId')!.value);
      this.markers.pipe(
        map((actions: any) => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            const arrayLatLng = (a.payload.doc.data().geopoint);
            return { id, arrayLatLng, ...data }
          });
        })
      ).subscribe((markers: any) => {        
        if (markers && markers.length > 0 && markers[0].geopoint) {          
          this.driverName = markers[0].driver;
          this.driverConfirmationAt = markers[0].driverConfirmationAt;
          this.startedAt = markers[0].startedAt;
          this.lastUpdatedAt = markers[0].lastUpdatedAt;
          this.activeRoute = markers[0].active;          
          this.isConfirmed = markers[0].isConfirmed; 
          this.hasEnded = markers[0].hasEnded;         
          this.isRejected = markers[0].isRejected;
          this.round = markers[0].round;
          this.vehicleName = markers[0].vehicleName;

          this.addGeoPointToMarkerPositions(markers[0].geopoint);
        } else {
          this.notification.create('warning', 'Información', 'No hay operaciones activas en este momento.');
          this.markerPositions = [];
          this.driverName = "";
          this.driverConfirmationAt = null;
          this.startedAt = null;
          this.lastUpdatedAt = null;
          this.activeRoute = "False";
          this.isConfirmed = false;
          this.isRejected = false;
          this.hasEnded = false;
          this.round = "";
          this.vehicleName = "";
          this.descriptionRoute = "";
          this.lastUpdatedAt = null;
          this.markerPositions = [];
        }
      })
    }
  }
  transformToHoursAndMinutes(timestamp: { seconds: number; nanoseconds: number } | Date | undefined | null): string {
    if (!timestamp) {
      return 'NA'; // Return 'NA' if the timestamp is null or undefined
    }

    let date: Date;

    if (timestamp instanceof Date) {
      // If it's a Date object, use it directly
      date = timestamp;
    } else {
      // If it's a Firestore-like timestamp, convert it
      date = new Date(timestamp.seconds * 1000);
    }

    // Extract hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the time with leading zeros for minutes
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }
  addGeoPointToMarkerPositions(geoPoint: GeoPoint) {
    this.markerPositions = [];
    if (geoPoint?._lat !== undefined && geoPoint?._long !== undefined) {
      this.markerPositions.push({ lat: geoPoint._lat, lng: geoPoint._long });
    } else {
      console.error('Invalid GeoPoint object:', geoPoint);
    }
  }
  isActiveRoute(): boolean {
    // Convertir 'activeRoute' a un valor booleano
    if (typeof this.activeRoute === 'string') {
      return this.activeRoute.toLowerCase() === 'true';  // Si es una cadena, la convierte en booleano
    }
    return !!this.activeRoute;  // Si ya es booleano, se asegura de que sea true o false
  }

  onDateRangeChangeAct(): void {
    this.startDateAct = this.dateRangeFormAct.get('startDate')!.value;
    this.endDateAct = this.dateRangeFormAct.get('endDate')!.value;
    this.customerIdSelected = this.dateRangeFormAct.get('customerId')!.value;
    if (this.startDateAct && this.endDateAct && this.customerIdSelected) {
      this.logisticsService.getChartDatabyCustomer(this.startDate, this.endDate, this.customerIdSelected).pipe(
        map((actions: any) => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { vehicle: data.vehicle, round: data.round, route: data.routeName, program: data.program, value: 1 }
          });
        })
      ).subscribe((result: any) => {
        this.getSums(result);
      });

      this.logisticsService.getUsersByCustomer(this.startDate, this.endDate, this.customerIdSelected).pipe(
        map((actions: any) => {
          return actions.length;
        })
      ).subscribe((count: number) => {
        this.sumTotalUsersRange = count;
      });

      this.logisticsService.getUsersByCustomerTot(this.customerIdSelected).pipe(
        map((actions: any) => {
          return actions.length;
        })
      ).subscribe((count: number) => {
        this.sumTotalUsers = count;
      });
    }
    else {
      this.notification.create('error', 'Error', 'Se Requiere un rango de fechas');
    }
  }

  getSums(result: any) {

    this.resultLiveRoundD = result.filter((item: any) => item.round === 'Día');
    this.resultLiveRoundT = result.filter((item: any) => item.round === 'Tarde');
    this.resultLiveRoundN = result.filter((item: any) => item.round === 'Noche');
    let roundSumsD: any = {};
    let roundSumsT: any = {};
    let roundSumsN: any = {};

    this.resultLiveRoundD.forEach((item: any) => {
      if (roundSumsD.hasOwnProperty(item.route)) {
        roundSumsD[item.route] += item.value;
      } else {
        roundSumsD[item.route] = item.value;
      }
    });
    this.resultLiveRoundT.forEach((item: any) => {
      if (roundSumsT.hasOwnProperty(item.route)) {
        roundSumsT[item.route] += item.value;
      } else {
        roundSumsT[item.route] = item.value;
      }
    });
    this.resultLiveRoundN.forEach((item: any) => {
      if (roundSumsN.hasOwnProperty(item.route)) {
        roundSumsN[item.route] += item.value;
      } else {
        roundSumsN[item.route] = item.value;
      }
    });

    this.resultLiveRoundDLevel2 = Object.entries(roundSumsD).map(([route, sum]) => ({ route, sum }));
    this.resultLiveRoundTLevel2 = Object.entries(roundSumsT).map(([route, sum]) => ({ route, sum }));
    this.resultLiveRoundNLevel2 = Object.entries(roundSumsN).map(([route, sum]) => ({ route, sum }));

    // list of totals
    this.sumD = this.resultLiveRoundD.reduce((total: any, currentItem: any) => total + currentItem.value, 0);
    this.sumT = this.resultLiveRoundT.reduce((total: any, currentItem: any) => total + currentItem.value, 0);
    this.sumN = this.resultLiveRoundN.reduce((total: any, currentItem: any) => total + currentItem.value, 0);

  }

  getAccountsMaps() {
    if (this.infoSegment !== null && this.infoSegment !== undefined && this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 3) {
      this.accountsService.getAccounts().pipe(
        takeUntil(this.stopSubscription$),
        map((actions: any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe((accounts) => {
        this.accountsList = accounts;
      });
    }
    else {
      if (this.user && this.user.customerId) {
        this.accountsService.getAccount(this.user.customerId).pipe(
          takeUntil(this.stopSubscription$),
          map((a: any) => {
            const id = a.payload.id;
            const data = a.payload.data() as any;
            return { id, ...data }
          }),
          tap(record => {
            this.accountsList = [record];
            return record;
          })
        ).subscribe();
      }
    }
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Aquí va el código relacionado con Ag-Grid o window
     // console.log('Esto se ejecuta solo en el navegador');
    }
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  ngAfterViewInit() {
    if (this.infoSegment.nivelNum! == 1) { //Individual
      this.logisticsService.getChartData(this.startDate, this.endDate).pipe(
        map((actions: any) => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { vehicle: data.vehicle, round: data.round, route: data.routeName, program: data.program, value: 1 }
          });
        })
      )
        .subscribe((result: any) => {
          this.zone.runOutsideAngular(() => {
            let groupA = [...result.reduce((r: any, o: any) => {
              const key = o.round + '-' + o.program;

              const item = r.get(key) || Object.assign({}, o, {
                from: o.round,
                to: o.program,
                values: 0
              });

              item.values += o.value;

              return r.set(key, item);
            }, new Map).values()];

            let groupB = [...result.reduce((r: any, o: any) => {
              const key = o.round + '-' + o.program + '-' + o.route;
              const item = r.get(key) || Object.assign({}, o, {
                from: o.program,
                to: o.route,
                values: 0
              });
              item.values += o.value;
              return r.set(key, item);
            }, new Map).values()];

            let groupC = [...result.reduce((r: any, o: any) => {
              const key = o.round + '-' + o.program + '-' + o.route + '-' + o.vehicle;

              const item = r.get(key) || Object.assign({}, o, {
                from: o.route,
                to: o.vehicle,
                values: 0
              });
              item.values += o.value;
              return r.set(key, item);
            }, new Map).values()];

            let groupD = [...result.reduce((r: any, o: any) => {
              const key = o.round + '-' + o.program + '-' + o.route + '-' + o.vehicle;
              const item = r.get(key) || Object.assign({}, o, {
                from: o.vehicle,
                to: o.program == 'M' ? 'Prepa 2' : 'Salida',
                values: 0
              });
              item.values += o.value;

              return r.set(key, item);
            }, new Map).values()];

          });
        });
    }
  }

  ngOnDestroy() {
    if (this.accountsSubscription) {
      this.accountsSubscription.unsubscribe();
    }

  }

  formatDate(date: any) {
    return format(fromUnixTime(date.seconds), 'HH:mm', { locale: esLocale });
  }

  loadData() {
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      this.logisticsService.getActivityLogByCustomer(this.startDate, this.endDate, this.user.customerId).pipe(
        map((actions: any) => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return data;
          });
        })
      ).subscribe((result: IActivityLog[]) => {
        this.rowData = result;
        console.log(this.rowData);

        this.activityList = this.rowData.slice(0, 5);
        this.chartData = _.map(this.rowData, (x: any) => {
          return { country: x.vehicle, visits: x.studentId }
        })
      });

      this.liveService.getLiveProgrambyCustomer(this.user.customerId)
        .subscribe((result: any[]) => {
          this.rowFleetData = result;
        });

    } else {
      this.logisticsService.getActivityLog(this.startDate, this.endDate).pipe(
        map((actions: any) => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return data;
          });
        })
      ).subscribe((result: IActivityLog[]) => {
        this.rowData = result;
        console.log(this.rowData);
        this.activityList = this.rowData.slice(0, 5);
        this.chartData = _.map(this.rowData, (x: any) => { // Correct usage of _.map()
          return { country: x.vehicle, visits: x.studentId }
        })
      });

      this.liveService.getLiveProgram()
        .subscribe((result: any[]) => {
          this.rowFleetData = result;
        });

    }
  }

  openMessage() {
    this.vMessage = true;
  }
  closeMessage() {
    this.vMessage = false;
  }

  onCustomerSelected(event: any) {
    if (event != null) {
      const recordArray = _.filter(this.accountsList, r => {
        return r.id == event;
      });
      const record = recordArray[0];
      this.cardTitle = "";
      if (this.fillCustomer == false) {
        this.fillCustomer = true;
        this.dateRangeFormMap.controls['customerName'].setValue(record.name);
        this.dateRangeFormMap.controls['customerId'].setValue(record.id);
        this.fillCustomerRoute(record.id);
      } else {
        var customerIDNew = this.dateRangeFormMap.get('customerName')!.value;
        if (record.name != customerIDNew) {
          this.dateRangeFormMap.controls['customerName'].setValue(record.name);
          this.dateRangeFormMap.controls['customerId'].setValue(record.id);
          this.fillCustomerRoute(record.id);
        }
      }
    }
  }

  fillCustomerRoute(customerID: string) {
    this.fillRoutes = true;
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

  formatCreated(created: any): string {
    if (created) {
      return format(fromUnixTime(created.seconds), 'MM/dd/yyyy HH:mm', { locale: esLocale });
    } else {
      return "No";
    }
  }



}
