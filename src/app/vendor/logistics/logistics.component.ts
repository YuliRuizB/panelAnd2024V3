import { Component, OnInit, ViewChild, ElementRef, NgZone, inject } from '@angular/core'
import { takeUntil, map, tap } from 'rxjs/operators';
import { startOfToday, endOfToday, format, fromUnixTime } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import * as _ from 'lodash';
import { IActivityLog, LiveProgramColumnDefs } from "../../logistics/classes";
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
import { GoogleMap, MapPolyline, MapMarker } from '@angular/google-maps';
import { log } from 'node:console';
class GeoPoint {
  constructor(public _lat: number, public _long: number) { }
}


@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.component.html',
  styleUrls: ['./logistics.component.css']
})
export class LogisticsComponent implements OnInit {

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

    // mapTypeId: 'hybrid',
    // styles:  map3,
    /* 	center: {
        lat: 25.6489848,
        lng: -100.4738091
      } */
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
  sumTotalUsers : number = 0;
  sumTotalUsersRange : number = 0;
  cardTitle: string = '';
  descriptionRoute: string = "";
  driverName: string= "";
  driverConfirmationAt: | Date | undefined | null = null;
  startAt :| Date | undefined | null = null;
  activeRoute : string = "False" ;
  round : string = "";
  vehicleName : string = "";


  logisticsService = inject(LogisticsService);
  liveService = inject(LiveService);
  accountsService = inject(AccountsService);
  authService = inject(AuthenticationService);
  routesService = inject(RoutesService);
  constructor(
    private notification: NzNotificationService,
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
    this.startAt = startOfToday();
    this.driverConfirmationAt = null;

    this.dateRangeForm = this.fb.group({
      startDate: [startOfToday()], // Default to the start of today
      endDate: [endOfToday()]     // Default to the end of today
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
    this.getAccountsMaps();

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

    this.authService.user.subscribe(user => {
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
            return record;
          })
        ).subscribe();
      }
    });

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

    if ( this.dateRangeFormMap.get('routeId')!.value != undefined) {
      const recordArray = _.filter(this.routes, r => {
        return r.id ==  this.dateRangeFormMap.get('routeId')!.value;
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
          this.startAt = markers[0].startAt;
          this.activeRoute = markers[0].active;
          this.round = markers[0].round;
          this.vehicleName = markers[0].vehicleName;
          this.addGeoPointToMarkerPositions(markers[0].geopoint);
        } else {        
          this.notification.create('warning', 'Información', 'No hay operaciones activas en este momento.');
          this.driverName = "";          
          this.driverConfirmationAt = null;
          this.startAt = null;
          this.activeRoute = "False";
          this.round ="";
          this.vehicleName = "";
          this.descriptionRoute = "";
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
          this.startAt = markers[0].startAt;
          this.activeRoute = markers[0].active;
          this.round = markers[0].round;
          this.vehicleName = markers[0].vehicleName;

          this.addGeoPointToMarkerPositions(markers[0].geopoint);
        } else {          
          this.notification.create('warning', 'Información', 'No hay operaciones activas en este momento.');
          this.markerPositions = [];
          this.driverName = "";          
          this.driverConfirmationAt = null;
          this.startAt = null;
          this.activeRoute = "False";
          this.round ="";
          this.vehicleName = "";
          this.descriptionRoute = "";
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

      this.logisticsService.getUsersByCustomerTot( this.customerIdSelected).pipe(
        map((actions: any) => {
          return actions.length;  
        })
      ).subscribe((count: number) => {    
        this.sumTotalUsers  = count;  
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
      this.cardTitle =  "";
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