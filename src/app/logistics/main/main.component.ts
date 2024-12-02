import { Component, OnInit, ViewChild, ElementRef, NgZone, inject } from '@angular/core'
import { LogisticsService } from '../services.service';
import { IActivityLog } from '../classes';
import { GeoJson, FeatureCollection } from '../map';
import { map, takeUntil, tap } from 'rxjs/operators';
import { startOfToday, endOfToday, format, fromUnixTime } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import * as _ from 'lodash';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { AccountsService } from '../../shared/services/accounts.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-main',
   templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class LogisticsMainComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  lat = 37.75;
  lng = -122.41;
  loading = false;
  // mapData
  //map: any = mapboxgl.Map;
  source: any;
  markers: any;  
  rowData?: IActivityLog[];
  activityList: IActivityLog[] | undefined;
  startDate: Date;
  endDate: Date;
  //private chart: am4charts.XYChart | undefined;
  chartData: any;
  gridApi: any;
  gridColumnApi: any;
/* 
  ColumnDefs : ColDef[] = [
    { headerName: 'Fecha', field: 'created', cellRenderer: (params: any ) => { 
      if (params && params.value) {
        return format( fromUnixTime(params.value.seconds), 'MM/dd/yyyy HH:mm', { locale: esLocale })
      } else { return ''}
    }},
    { headerName: 'Alumno', field: 'studentName', sortable: true },
    { headerName: 'Identificación', field: 'studentId', sortable: true, enableValue: true, allowedAggFuncs: ['count'] },
    { headerName: 'Ingreso con', field: 'studentId', sortable: true, enableValue: true, allowedAggFuncs: ['count'] },
    { headerName: 'Evento', field: 'event', sortable: true, enableRowGroup: true },
    { headerName: 'Tipo', field: 'type', sortable: true, enableRowGroup: true },
    { headerName: 'Descripción', field: 'description', sortable: true },
    { headerName: 'Operación', field: 'route', enableRowGroup: true },
    { headerName: 'Turno', field: 'round', enableRowGroup: true },
    { headerName: 'Programa', field: 'program', enableRowGroup: true },
    { headerName: 'Vehículo', field: 'vehicle', enableRowGroup: true },
    { headerName: '¿Subió?', field: 'allowedOnBoard', enableRowGroup: true }
  ]; */
  map: any;
  authService= inject(AuthenticationService);
  infoSegment: any = [];
  accountsService = inject(AccountsService); 
  user: any;
  stopSubscription$: Subject<boolean> = new Subject();


  constructor(
    private logisticsService: LogisticsService,
    private zone: NgZone
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
              return record;
            })
          ).subscribe();
        }      
    });

    this.markers = [] as GeoJson[];
    this.startDate = startOfToday()
    this.endDate = endOfToday();
  }

  ngOnInit() {
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      this.markers = this.logisticsService.getMarkersByCustomer(this.startDate, this.endDate , this.user.customerId);    
    } else {
      this.markers = this.logisticsService.getMarkers(this.startDate, this.endDate);
    }
 
    //this.loadData();
   // this.initializeMap();
  }

  ngAfterViewInit() {
    // Add data
    // chart.data = this.chartData;
    // Create axes
   // let chart = am4core.create("chartdiv", am4charts.SankeyDiagram);
/* 
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
        console.log(result);
        // this.chartData = _.countBy(result, 'country');
        this.zone.runOutsideAngular(() => {          
          chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
          let groupA = [...result.reduce((r: { get: (arg0: string) => any; set: (arg0: string, arg1: any) => any; }, o: { round: string; program: string; value: any; }) => {
            const key = o.round + '-' + o.program;
            
            const item = r.get(key) || Object.assign({}, o, {
              from: o.round,
              to: o.program,
              values: 0
            });
            
            item.values += o.value;
            
            return r.set(key, item);
          }, new Map).values()];

          let groupB = [...result.reduce((r: { get: (arg0: string) => any; set: (arg0: string, arg1: any) => any; }, o: { round: string; program: string; route: string; value: any; }) => {
            const key = o.round + '-' + o.program + '-' + o.route;
            
            const item = r.get(key) || Object.assign({}, o, {
              from: o.program,
              to: o.route,
              values: 0
            });
            
            item.values += o.value;
            
            return r.set(key, item);
          }, new Map).values()];

          let groupC = [...result.reduce((r: { get: (arg0: string) => any; set: (arg0: string, arg1: any) => any; }, o: { round: string; program: string; route: string; vehicle: string; value: any; }) => {
            const key = o.round + '-' + o.program + '-' + o.route + '-' + o.vehicle;
            
            const item = r.get(key) || Object.assign({}, o, {
              from: o.route,
              to: o.vehicle,
              values: 0
            });
            
            item.values += o.value;
            
            return r.set(key, item);
          }, new Map).values()];

          let groupD = [...result.reduce((r: { get: (arg0: string) => any; set: (arg0: string, arg1: any) => any; }, o: { round: string; program: string; route: string; vehicle: string; value: any; }) => {
            const key = o.round + '-' + o.program + '-' + o.route + '-' + o.vehicle;
            
            const item = r.get(key) || Object.assign({}, o, {
              from: o.vehicle,
              to: o.program == 'M' ? 'Prepa 2' : 'Salida',
              values: 0
            });
            
            item.values += o.value;
            
            return r.set(key, item);
          }, new Map).values()];
          chart.data = groupA.concat(groupB, groupC, groupD);        
          let hoverState = chart.links.template.states.create("hover");
          hoverState.properties.fillOpacity = 0.6;

          chart.dataFields.fromName = "from";
          chart.dataFields.toName = "to";
          chart.dataFields.value = "values";

          // for right-most label to fit
          chart.paddingRight = 60;

          // make nodes draggable
          let nodeTemplate = chart.nodes.template;
          nodeTemplate.inert = true;
          nodeTemplate.readerTitle = "Drag me!";
          nodeTemplate.showSystemTooltip = true;
          nodeTemplate.width = 20;

          // make nodes draggable
          // let nodeTemplate = chart.nodes.template;
          nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange";
          nodeTemplate.showSystemTooltip = true;
          nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer
        });
      }); */
  }

  ngOnDestroy() {
   /*  this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    }); */
  }

  initializeMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
      });
    }
    this.buildMap()

  }

  formatDate(date:any ) {
    return format(fromUnixTime(date.seconds), 'HH:mm', { locale: esLocale });
  }

  buildMap() {
   /*  (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: this.mapElement.nativeElement,
      style: 'mapbox://styles/mapbox/light-v10',
      zoom: 10,
      pitch: 45,
      bearing: -17.6,
      center: [this.lng, this.lat]
    });


    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    /// Add realtime firebase data on map load
    this.map.on('load', () => {
      this.map.resize();
      /// register source
      this.map.addSource('firebase', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      /// get source
      this.source = this.map.getSource('firebase')

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
        .subscribe((markers:any) => {
          console.log(markers);
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
          'icon-image': 'rocket-15',
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
    this.map.flyTo({
      center: data.geometry.coordinates
    })
  }

  loadMap() {
   /*  (mapboxgl as any).accessToken = environment.mapbox.accessToken;
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
          return actions.map((a:any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return data;
          });
        })
      )
        .subscribe((result:IActivityLog[]) => {
          console.log(result);
          this.rowData = result;
          this.activityList = this.rowData.slice(0, 5);
          this.chartData =  this.rowData.map(x => {//_.map(x => {
            return { country: x.vehicle, visits: x.studentId }
          })
        });
    } else {
      this.logisticsService.getActivityLog(this.startDate, this.endDate).pipe(
        map((actions:any) => {
          return actions.map((a:any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return data;
          });
        })
      )
        .subscribe((result:IActivityLog[]) => {
          console.log(result);
          this.rowData = result;
          this.activityList = this.rowData.slice(0, 5);
          this.chartData =  this.rowData.map(x => {//_.map(x => {
            return { country: x.vehicle, visits: x.studentId }
          })
        });
    }
    
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
}

}