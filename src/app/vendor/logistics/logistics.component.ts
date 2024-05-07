import { Component, OnInit, ViewChild, ElementRef, NgZone, inject } from '@angular/core'
import { takeUntil, map, tap } from 'rxjs/operators';
import { startOfToday, endOfToday, format, fromUnixTime } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import * as _ from 'lodash';
import { IActivityLog, ColumnDefs, LiveProgramColumnDefs } from "../../logistics/classes";
import { GeoJson } from '../../logistics/map';
import { UntypedFormGroup, UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LogisticsService } from '../../logistics/services.service';
import { LiveService } from '../../shared/services/live.service';import { ColDef } from 'ag-grid-community';
import { AccountsService } from '../../shared/services/accounts.service';
import { Subject, Subscription } from 'rxjs';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { RoutesService } from '../../shared/services/routes.service';
import { IStopPoint } from '../../shared/interfaces/route.type';

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
  dateRangeFormMap:UntypedFormGroup;
  accountsSubscription!: Subscription;
  startDate: Date;
  endDate: Date;
  startDateA: Date;
  endDateA: Date;
  startDateAct: Date;
  endDateAct: Date;
  

  visible = false;
  vMessage = false;
  lat = 37.75;
  lng = -122.41;
  loading = false;

  center!: google.maps.LatLngLiteral;
	options: google.maps.MapOptions = {
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
			center: {
				lat: 25.6489848,
				lng: -100.4738091
			}
	}
  display:any;
  zoom : any;
  accountsList: any = [];
  stopSubscription$: Subject<boolean> = new Subject();
  user: any;
  customerName: string = "Empresa";
  infoSegment: any = [];
  routes : any;
  fillRoutes: boolean = false;
  fillCustomer: boolean = false;
  // mapData
  //map: any = mapboxgl.Map;
  source: any;
  sourceLiveVehicles: any;
  markers: any;
  columnDefs : ColDef[] = [
    { headerName: 'Fecha', field: 'created', cellRenderer: (params: any ) => { 
      if (params && params.value) {
        return format( fromUnixTime(params.value.seconds), 'MM/dd/yyyy HH:mm', { locale: esLocale })
      } else { return ''}
    }},
    // { headerName: 'Fecha', field: 'created' },
    { headerName: 'Alumno', field: 'studentName', sortable: true },
    { headerName: 'Matrícula', field: 'studentId', sortable: true, enableValue: true, allowedAggFuncs: ['count'] },
    { headerName: 'Ingreso con', field: 'studentId', sortable: true, enableValue: true, allowedAggFuncs: ['count'] },
    { headerName: 'Evento', field: 'event', sortable: true, enableRowGroup: true },
    { headerName: 'Tipo', field: 'type', sortable: true, enableRowGroup: true },
    { headerName: 'Descripción', field: 'description', sortable: true },
    { headerName: 'Ruta', field: 'route', enableRowGroup: true },
    { headerName: 'Turno', field: 'round', enableRowGroup: true },
    { headerName: 'Programa', field: 'program', enableRowGroup: true },
    { headerName: 'Vehículo', field: 'vehicle', enableRowGroup: true },
    { headerName: '¿Subió?', field: 'allowedOnBoard', enableRowGroup: true }
  ];;
  columnFleetDefs = LiveProgramColumnDefs;

  defaultColDef = {
    flex: 1,
    cellClass: 'align-right',
    enableCellChangeFlash: true,
    resizable: true,
  };

  rowData!: IActivityLog[];
  rowFleetData!: any[];
  activityList!: IActivityLog[];
  //startDate: Date;
  //endDate: Date;

  //private chart!: am4charts.XYChart;
  chartData: any;
  gridApi: any;
  gridColumnApi: any;
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
      endDate: [endOfToday()]     // Default to the end of today
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
          // Access latitude and longitude from the position object
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          // Assign coordinates to the center object
          this.center = { lat: latitude, lng: longitude };
      }, (error) => {
          // Handle errors if geolocation request fails
          console.error('Error getting geolocation:', error);
      });
  } else {
      // Handle case when geolocation is not supported
      console.error('Geolocation is not supported by this browser.');
  }  
    
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
              return record;
            })
          ).subscribe();
        }      
    });

  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = event.latLng.toJSON();
    }
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
    // Access the selected start and end dates from the form group
    //this.startDateMap = this.dateRangeFormMap.get('startDate')!.value;
    //this.endDateMap= this.dateRangeFormMap.get('endDate')!.value;  
    
    
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      this.markers = this.logisticsService.getMarkersByCustomer(this.startDate, this.endDate, this.user.customerId);    
      this.markers.pipe(
        map((actions: any) => {
          return actions.map((a: any) => {
            const arrayLatLng = (a.payload.doc.data().location).split(',');
            const coordinates = [arrayLatLng[1], arrayLatLng[0]]
            const message = a.payload.doc.data().studentName;
            const newMarker = new GeoJson(coordinates, { message: message });
            return newMarker;
          });
        })
      ).subscribe((markers: any) => {
         console.log(markers);         
        })
    } else {
      this.markers = this.logisticsService.getMarkers(this.startDate, this.endDate);    
      this.markers.pipe(
        map((actions: any) => {
          return actions.map((a: any) => {
            const arrayLatLng = (a.payload.doc.data().location).split(',');
            const coordinates = [arrayLatLng[1], arrayLatLng[0]]
            const message = a.payload.doc.data().studentName;
            const newMarker = new GeoJson(coordinates, { message: message });
            return newMarker;
          });
        })
      ).subscribe((markers: any) => {
         console.log(markers);         
        })
    }
  }
  
  onDateRangeChangeAct(): void {
    // Access the selected start and end dates from the form group
    this.startDateAct = this.dateRangeFormAct.get('startDate')!.value;
    this.endDateAct = this.dateRangeFormAct.get('endDate')!.value; 
    console.log( this.startDateAct);
    console.log( this.endDateAct);
    if (this.startDateAct && this.endDateAct) {
      if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
        this.logisticsService.getChartDatabyCustomer(this.startDate, this.endDate, this.user.customerId).pipe(
          map((actions:any) => {
            return actions.map((a:any) => {
              const data = a.payload.doc.data() as any;
              const id = a.payload.doc.id;
              return { vehicle: data.vehicle, round: data.round, route: data.routeName, program: data.program, value: 1 }
            });
          })
        ).subscribe((result: any) => {          
            console.log("resutl");
            console.log(result);
          });  

      } else {
         this.logisticsService.getChartData(this.startDate, this.endDate).pipe(
        map((actions:any) => {
          return actions.map((a:any) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { vehicle: data.vehicle, round: data.round, route: data.routeName, program: data.program, value: 1 }
          });
        })
      ).subscribe((result: any) => {          
          console.log("resutl");
          console.log(result);
        });  
      }
         
    }
    else {
      this.notification.create('error', 'Error', 'Se Requiere un rango de fechas');
    }
  }
  
  getAccountsMaps() {
    if (this.infoSegment !== null && this.infoSegment !== undefined && this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 3) {        
      this.accountsService.getAccounts().pipe(
        takeUntil(this.stopSubscription$),
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe((accounts) => {             
        this.accountsList = accounts;
        console.log(this.accountsList);
      });
    }
   else  { 
      this.accountsService.getAccount(this.user.customerId).pipe(
        takeUntil(this.stopSubscription$),
        map((a:any) => {       
          const id = a.payload.id;
          const data = a.payload.data() as any;
          return { id, ...data }
        }),
        tap(record => {               
          this.accountsList = [record];
          console.log(this.accountsList);       
          return record;
        })
      ).subscribe();
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
    // Add data
    // chart.data = this.chartData;

    // Create axes
    //let chart = am4core.create("chartdiv", am4charts.SankeyDiagram);
    if (this.infoSegment.nivelNum! == 1) { //Individual
    this.logisticsService.getChartData(this.startDate, this.endDate).pipe(
      map((actions:any) => {
        return actions.map((a: any) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { vehicle: data.vehicle, round: data.round, route: data.routeName, program: data.program, value: 1 }
        });
      })
    )
      .subscribe((result: any) => {
      //  console.log(result);
        // this.chartData = _.countBy(result, 'country');
        this.zone.runOutsideAngular(() => {
        //  chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
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

    } else {
      
    }
  }

  ngOnDestroy() {
   /*  this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }  CIDEB-Mederos   Ruhrpumpen
    }); */  
    if (this.accountsSubscription){
      this.accountsSubscription.unsubscribe();  
    }
    
  }
  
  formatDate(date:any ) {
    return format(fromUnixTime(date.seconds), 'HH:mm', { locale: esLocale });
  }

  buildMap() {
 /*    
      /// get source
      this.source = this.map.getSource('firebase')
      this.sourceLiveVehicles = this.map.getSource('liveVehicles');

      /// subscribe to realtime database and set data source
      this.markers.pipe(
        map((actions: any) => {
          return actions.map((a: any) => {
            const arrayLatLng = (a.payload.doc.data().location).split(',');
            const coordinates = [arrayLatLng[1], arrayLatLng[0]]
            const message = a.payload.doc.data().studentName;
            const newMarker = new GeoJson(coordinates, { message: message });
            return newMarker;
          });
        })
      )
        .subscribe((markers: any) => {
          //.log(markers);
          let data = new FeatureCollection(markers)
          this.source.setData(data)
        })

      const layers = this.map.getStyle().layers;

      let labelLayerId;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      /// create map layers with realtime data
      this.map.addLayer({
        id: 'firebase',
        source: 'firebase',
        type: 'symbol',
        layout: {
          'text-field': '{message}',
          'text-size': 12,
          'icon-image': 'pedestrians',
          'text-offset': [0, 1.5]
        },
        paint: {
          'text-color': '#f16624',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      });

      this.map.addLayer({
        id: 'liveVehicles',
        source: 'liveVehicles',
        type: 'symbol',
        layout: {
          'text-field': '{message}',
          'text-size': 12,
          'icon-image': 'marker_bus',
          'text-offset': [0, 1.5]
        },
        paint: {
          'text-color': '#f16624',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      });

      this.map.addLayer({
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 15,
        paint: {
          'fill-extrusion-color': '#aaa',
          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          'fill-extrusion-height': [
            'interpolate', ['linear'], ['zoom'],
            15, 0,
            15.05, ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate', ['linear'], ['zoom'],
            15, 0,
            15.05, ['get', 'min_height']
          ],
          'fill-extrusion-opacity': .6
        }
      }, labelLayerId);

    }) */

  }

  flyTo(data: GeoJson) {
   /*  this.map.flyTo({
      center: data.geometry.coordinates
    }) */
  }

  loadMap() {
  /*   (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    const map = new mapboxgl.Map({
      container: this.mapElement.nativeElement,
      style: 'mapbox://styles/mapbox/light-v10',
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      center: [this.lng, this.lat]
    });
    // Add map controls
    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {
      map.resize();

      // marker
      new mapboxgl.Marker()
        .setLngLat([this.lng, this.lat])
        .addTo(map);
      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;

      let labelLayerId;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      map.addLayer({
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 15,
        paint: {
          'fill-extrusion-color': '#aaa',
          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          'fill-extrusion-height': [
            'interpolate', ['linear'], ['zoom'],
            15, 0,
            15.05, ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate', ['linear'], ['zoom'],
            15, 0,
            15.05, ['get', 'min_height']
          ],
          'fill-extrusion-opacity': .6
        }
      }, labelLayerId);
    }); */
  }

  loadData() {
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      this.logisticsService.getActivityLogByCustomer(this.startDate, this.endDate, this.user.customerId).pipe(
        map((actions:any) => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return data;
          });
        })
      ).subscribe((result: IActivityLog[]) => {
          console.log(result);
          this.rowData = result;
          this.activityList = this.rowData.slice(0, 5);
          this.chartData = _.map(this.rowData, (x: any) => { // Correct usage of _.map()
            return { country: x.vehicle, visits: x.studentId }
          })
        });

        this.liveService.getLiveProgrambyCustomer(this.user.customerId)
        .subscribe((result: any[]) => {
      //   console.log(result);
          this.rowFleetData = result;
        });
        
    } else {
      this.logisticsService.getActivityLog(this.startDate, this.endDate).pipe(
        map((actions:any) => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return data;
          });
        })
      ).subscribe((result: IActivityLog[]) => {
          console.log(result);
          this.rowData = result;
          this.activityList = this.rowData.slice(0, 5);
          this.chartData = _.map(this.rowData, (x: any) => { // Correct usage of _.map()
            return { country: x.vehicle, visits: x.studentId }
          })
        });

        this.liveService.getLiveProgram()
          .subscribe((result: any[]) => {
        //   console.log(result);
            this.rowFleetData = result;
          });

    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
}
 openMessage() {
  this.vMessage = true;
 }
 closeMessage() {
  this.vMessage = false;
 }

 onCustomerSelected(event: any) { 
    if (event != null) {
     
      const recordArray = _.filter(this.accountsList , r => {
        return r.id == event;
      });
      const record = recordArray[0];           
    if (this.fillCustomer == false) {      
      this.fillCustomer = true;      
      this.dateRangeFormMap.controls['customerName'].setValue(record.name);
      this.dateRangeFormMap.controls['customerId'].setValue(record.id);    
      
      this.fillCustomerRoute(record.id); 
           
    }  else {       
      var customerIDNew =  this.dateRangeFormMap.get('customerName')!.value;           
      if(record.name != customerIDNew )  {        
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
    map((actions:any) => actions.map((a: any) => {
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