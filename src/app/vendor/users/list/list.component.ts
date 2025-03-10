import { Component, OnInit, NgZone, OnDestroy, inject } from '@angular/core';

//AMCharts 4
import * as am4core from "@amcharts/amcharts4/core";
am4core.options.autoSetClassName = true;
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import _ from 'lodash';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { UsersService } from '../../../shared/services/users.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { globalImputs } from '../../../shared/directives/global-imputs';
import { NzMessageService } from 'ng-zorro-antd/message';
/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class VendorUsersListComponent implements OnInit, OnDestroy {
  authService = inject(AuthenticationService);
  usersService= inject(UsersService);
  search!: any;
  private chart! : any;
  stopSubscription$: Subject<any> = new Subject();
  user: any;
  usersList: any = [];
  routesList: any = [];

  gridApi: any;
  gridColumnApi: any;
  columnDefs;
  columnProgram;
  defaultColDef;
  detailCellRendererParams;
  rowData: any = [];
  usersColumnDefs;

  constructor(
    private messageService: NzMessageService,
    private zone: NgZone   
  ) {
    this.columnDefs = [
      {
        headerName: 'Empresa', field: 'customerName',
        cellRenderer: 'agGroupCellRenderer', sortable: true
      },
      { headerName: 'Operación', sortable: true, field: 'routeName' },
      { headerName: 'Usuarios Mete', field: 'customerName', cellRenderer: (params: any) => {
        const passes = params.data.passes;
        const isTaskIn = _.filter(passes, (p) => {
          return !!p.isTaskIn;
        })
        return isTaskIn.length;
      }},
      { headerName: 'Usuarios Saca', field: 'customerName', cellRenderer: (params: any) => {
        const passes = params.data.passes;
        const isTaskOut = _.filter(passes, (p) => {
          return !!p.isTaskOut;
        })
        return isTaskOut.length;
      }},
      { headerName: 'Activa', field: 'permission', cellRenderer: (params: any) => {
        return !!params.value ? 'Si' : 'No'
      }}
    ];
    this.columnProgram = [
      {
        headerName: 'Inicia', field: 'time',
        cellRenderer: 'agGroupCellRenderer', sortable: true
      },
      { headerName: 'Empresa', sortable: true, field: 'customerName' },
      { headerName: 'Operación', sortable: true, field: 'routeName'},
      { headerName: 'Programa / Turno', Field: 'round'},
      { headerName: 'PR', sortable: true, field: 'driver'},
      { headerName: 'Vehículo', sortable: true, field: 'vehicleName'},
      { headerName: 'Inició', sortable: true, field: 'startedAt'},
      { headerName: 'Finalizó', sortable: true, field: 'endedAt'}
    ];

    this.usersColumnDefs = [
      { headerName: 'Empresa', field: 'customerName', enableRowGroup: true },
      { headerName: 'Operación', field: 'routeName', enableRowGroup: true },
      { headerName: 'Turno', field: 'round', enableRowGroup: true },
      { headerName: 'Estación', field: 'stopName', enableRowGroup: true },
      { headerName: 'Pase', field: 'name' },
      { headerName: 'Mete', field: 'isTaskIn', cellRenderer: (params: any) => {
        return !!params.value ? 'Si' : 'No'
      }},
      { headerName: 'Saca', field: 'isTaskOut', cellRenderer: (params: any) => {
        return !!params.value ? 'Si' : 'No'
      }},
      { headerName: 'Pase Cortesía', field: 'is_courtesy', cellRenderer: (params: any) => {
        return !!params.value ? 'Si':'No'
      }},
      { headerName: 'Válido desde', field: 'validFrom', cellRenderer: (params: any) => {
        const date = (params.value).toDate();
        return format(date, 'MMMM dd yyyy', {
          locale: es
        })
      }},
      { headerName: 'Válido hasta', field: 'validTo', cellRenderer: (params: any) => {
        const date = (params.value).toDate();
        return format(date, 'MMMM dd yyyy', {
          locale: es
        })
      }}
    ];
    
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      filter: true,
      sortable: true,
      resizable: true,
     };
    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          { headerName: 'Pase', field: 'name' },
          { headerName: 'Mete', field: 'isTaskIn', cellRenderer: (params: any) => {
            return !!params.value ? 'Si' : 'No'
          }},
          { headerName: 'Saca', field: 'isTaskOut', cellRenderer: (params: any) => {
            return !!params.value ? 'Si' : 'No'
          }},
          { headerName: 'Pase Cortesía', field: 'is_courtesy', cellRenderer: (params: any) => {
            return !!params.value ? 'Si':'No'
          }},
          { headerName: 'Estación', field: 'stopName' },
          { headerName: 'Válido desde', field: 'validFrom', cellRenderer: (params: any) => {
            const date = (params.value).toDate();
            return format(date, 'MMMM dd yyyy', {
              locale: es
            })
          }},
          { headerName: 'Válido hasta', field: 'validTo', cellRenderer: (params: any) => {
            const date = (params.value).toDate();
            return format(date, 'MMMM dd yyyy', {
              locale: es
            })
          }}
        ],
        defaultColDef: { flex: 1 },
      },
      getDetailRowData: function (params: any) {
        params.successCallback(params.data.passes);
      },
    };
  }

  onFirstDataRendered(params: any) {
    setTimeout(function () {
      params.api.getDisplayedRowAtIndex(1).setExpanded(false);
    }, 0);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.routesList;
  }

  ngOnInit() {
    this.authService.user.subscribe((user: any) => { 
      if (user) {
        this.user = user;    
      this.getSubscriptions();     
      }      
    });

  }

  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
  }

  ngOnDestroy() {
    this.stopSubscription$.next(undefined);
    this.stopSubscription$.complete();
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  getSubscriptions() {
    this.usersService.getBoardingPassesByRoute().pipe(
      takeUntil(this.stopSubscription$)
    ).subscribe(data => {      
      this.rowData = data;
      this.createNestedTableData(data);
      this.createChart(data);
    })
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

  createChart(data: any) {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
      let networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());
      networkSeries.maxLevels = 2;
      networkSeries.minRadius = 20;
      networkSeries.maxRadius = 90;
      let chartData: any = [];
      chartData = [{
        name: 'Usuarios',
        children: []
      }];
      data.forEach((route: any) => {
        let object: any = {};
        const passes = route.passes;
        const round1 = _.filter(passes, (p: any) => {
          return p.round == 'Día'
        });
        const round2 = _.filter(passes, (p: any) => {
          return p.round == 'Tarde'
        });
        const stopsRound1 = _(round1)
          .groupBy('stopName')
          .map((items: string | any[], name: any) => ({ name, value: items.length }))
          .value();

        const stopsRound2 = _(round2)
          .groupBy('stopName')
          .map((items: string | any[], name: any) => ({ name, value: items.length }))
          .value();

        object = {
          name: `${route.customerName} ${passes[0].routeName}`,
          children: [
            {
              name: 'Día',
              children: [...stopsRound1]
            },
            {
              name: 'Tarde',
              children: [...stopsRound2]
            }
          ]
        };
        chartData[0].children.push(object);
      });

      chart.data = chartData;
      networkSeries.dataFields.value = "value";
      networkSeries.dataFields.name = "name";
      networkSeries.dataFields.children = "children";
      networkSeries.nodes.template.tooltipText = "{name}:{value}";
      networkSeries.nodes.template.fillOpacity = 1;
      networkSeries.nodes.template.label.text = "{name}"
      networkSeries.fontSize = 10;
      networkSeries.links.template.strokeWidth = 1;
      let hoverState = networkSeries.links.template.states.create("hover");
      hoverState.properties.strokeWidth = 3;
      hoverState.properties.strokeOpacity = 1;
      networkSeries.nodes.template.events.on("over", function (event) {
        event.target.dataItem.childLinks.each(function (link) {
          link.isHover = true;
        })
        if (event.target.dataItem.parentLink) {
          event.target.dataItem.parentLink.isHover = true;
        }
      })
      networkSeries.nodes.template.events.on("out", function (event) {
        event.target.dataItem.childLinks.each(function (link) {
          link.isHover = false;
        })
        if (event.target.dataItem.parentLink) {
          event.target.dataItem.parentLink.isHover = false;
        }
      })
      this.chart = chart;
    });
  }

}
