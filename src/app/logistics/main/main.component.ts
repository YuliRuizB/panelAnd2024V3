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
  source: any;
  markers: any;
  rowData?: IActivityLog[];
  activityList: IActivityLog[] | undefined;
  startDate: Date;
  endDate: Date;
  chartData: any;
  gridApi: any;
  gridColumnApi: any;
  map: any;
  authService = inject(AuthenticationService);
  infoSegment: any = [];
  accountsService = inject(AccountsService);
  user: any;
  stopSubscription$: Subject<boolean> = new Subject();

  constructor(
    private logisticsService: LogisticsService,
    private zone: NgZone
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
              return record;
            })
          ).subscribe();
        }
      }
    });
    this.markers = [] as GeoJson[];
    this.startDate = startOfToday()
    this.endDate = endOfToday();
  }

  ngOnInit() {
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      this.markers = this.logisticsService.getMarkersByCustomer(this.startDate, this.endDate, this.user.customerId);
    } else {
      this.markers = this.logisticsService.getMarkers(this.startDate, this.endDate);
    }
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
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

  formatDate(date: any) {
    return format(fromUnixTime(date.seconds), 'HH:mm', { locale: esLocale });
  }

  buildMap() {
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    })
  }

  loadMap() {

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
      )
        .subscribe((result: IActivityLog[]) => {
          this.rowData = result;
          this.activityList = this.rowData.slice(0, 5);
          this.chartData = this.rowData.map(x => {//_.map(x => {
            return { country: x.vehicle, visits: x.studentId }
          })
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
        this.chartData = this.rowData.map(x => {//_.map(x => {
          return { country: x.vehicle, visits: x.studentId }
        })
      });
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

}