import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, formatCurrency, formatNumber } from '@angular/common';
import { map } from 'rxjs/operators';
import { RoutesService } from '../../shared/services/routes.service';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponentVendor implements OnInit {

  user: any;
  routesList: any;
  recordSelected = false;
  gridOptions: any;
  rowGroupPanelShow = "always";
  authService = inject(AuthenticationService);
  routesService = inject(RoutesService);

  columnDefs = [
      { headerName: '#', checkboxSelection: true, suppressSizeToFit: true, suppressSorting: true },
      { headerName: 'Id', field: 'id', hide: true },
      { headerName: 'Nombre', field: 'name', enableRowGroup: true },
      { headerName: 'Recorrido', field: 'description', enableRowGroup: true, filter: 'text' },
      { headerName: 'Tipo', field: 'routeType', enableRowGroup: true, filter: 'text' },
      { headerName: 'Clima', field: 'has_ac', enableRowGroup: true, filter: 'text',
        cellRenderer: function(params: any) {
            let color = params.value === true ? 'color--behance' : 'ag-faded';
            let cellContent: string = '';
            cellContent = `<i class="material-icons ${color}">ac_unit</i>`;
            return cellContent;
        }
      },
      {
        headerName: 'Control de operación', headerClass: 'centered',
        children: [
          { headerName: 'Kmz', field: 'kmzUrl',
            cellRenderer: function(params: any) {
              let icon = typeof(params.value) != 'undefined' && params.value != 'no route designated' ? 'check_circle' : 'cancel';
              let color = typeof(params.value) != 'undefined' && params.value != 'no route designated' ? 'color--success' : 'color--dark';
              let cellContent: string = '';
              cellContent = `<i class="material-icons ${color}">${icon}</i>`;
              return cellContent;
            }
          },
          { headerName: 'Geocerca partida', field: 'geofenceBegin',
            cellRenderer: function(params: any) {
              let icon = typeof(params.value) != 'undefined' && (params.value).length > 0 ? 'check_circle' : 'cancel';
              let color = typeof(params.value) != 'undefined' && (params.value).length > 0 ? 'color--success' : 'color--dark';
              let cellContent: string = '';
              cellContent = `<i class="material-icons ${color}">${icon}</i>`;
              return cellContent;
            }
          },
          { headerName: 'Geocerca destino', field: 'geofenceEnd',
            cellRenderer: function(params: any) {
              let icon = typeof(params.value) != 'undefined' && (params.value).length > 0 ? 'check_circle' : 'close-circle';
              let color = typeof(params.value) != 'undefined' && (params.value).length > 0 ? 'color--success' : 'color--dark';
              let cellContent: string = '';
              cellContent = `<i nz-icon nzType="${icon}" nzTheme="outline"></i>`;
              return cellContent;
            }
          },
          {
            headerName: 'Activa',
            field: 'active',
            cellEditor: 'popupSelect',
            editable: true,
            cellRenderer: function (params: any) {
              let icon = typeof (params.value) == 'undefined' ? 'cancel' : params.value ? 'check_circle' : 'cancel';
              let color = typeof (params.value) == 'undefined' ? 'color-dark' : params.value ? 'color--success' : 'color--dark';
              let cellContent: string = '';
              cellContent = `<i class="material-icons ${color}">${icon}</i>`;
              return cellContent;
            },
            cellEditorParams: {
              values: ['Si', 'No']
            }
          }
        ]
      }
  ];
  selectedRows: number | undefined;
  currentRecord: any;
  gridApi: any;
  gridColumnApi: any;

  constructor() {
    this.authService.user.subscribe((user: any) => {
      this.user = user;     
      this.getRoutes();
      this.initializeGrid();
     
    });
  }

  ngOnInit() {
  }

  initializeGrid() {
    this.rowGroupPanelShow = this.rowGroupPanelShow;
    this.initializeGridOptions();
  }

  initializeGridOptions() {
    this.gridOptions = {
      columnDefs: this.columnDefs,
      rowData: null,
      rowSelection: 'single',
      pagination: true,
      enableFilter: true,
      enableStatusBar: true,
      alwaysShowStatusBar: false, //status bar can be be fixed
      enableRangeSelection: true,
      paginationPageSize: 50,
      localeText: {
        // for filter panel
        page: 'página',
        more: 'más',
        to: 'a',
        of: 'de',
        next: 'siguiente',
        last: 'último',
        first: 'primero',
        previous: 'anterior',
        loadingOoo: 'Cargando ...',
        // for set filter
        selectAll: 'Seleccionar todo',
        searchOoo: 'Buscar ...',
        blanks: 'Blanco',
        // for number filter and text filter
        filterOoo: 'Filtrar ...',
        applyFilter: 'Aplicar filtro ...',
        // for number filter
        equals: 'igual',
        notEqual: 'no es igual',
        lessThanOrEqual: 'menor que o igual',
        greaterThanOrEqual: 'mayor que o igual',
        inRange: 'en un rango',
        lessThan: 'menor que',
        greaterThan: 'mayor que',
        // for text filter
        contains: 'contiene',
        notContains: 'no contiene',
        startsWith: 'inicia con',
        endsWith: 'termina con',
        // the header of the default group column
        group: 'grupo',
        // tool panel
        columns: 'columnas',
        rowGroupColumns: 'Columnas pivote',
        rowGroupColumnsEmptyMessage: 'por favor arrastre las columnas al grupo',
        valueColumns: 'Columnas valor',
        pivotMode: 'Modo pivote',
        groups: 'grupos',
        values: 'valores',
        pivots: 'pivotes',
        valueColumnsEmptyMessage: 'arrastre columnas para agregar',
        pivotColumnsEmptyMessage: 'arrastre aquí para pivotes',
        // other
        noRowsToShow: 'no hay información',
        // enterprise menu
        pinColumn: 'anclar columna',
        valueAggregation: 'valor agregación',
        autosizeThiscolumn: 'autojustar columna',
        autosizeAllColumns: 'autoajustar todas las columnas',
        groupBy: 'agrupar por',
        ungroupBy: 'desagrupar por',
        resetColumns: 'resetear columnas',
        expandAll: 'expandir todo',
        collapseAll: 'colapsar todo',
        toolPanel: 'panel de herramientas',
        // enterprise menu pinning
        pinLeft: 'anclar <<',
        pinRight: 'anclar >>',
        noPin: 'desanclar <>',
        // enterprise menu aggregation and status panel
        sum: 'sum',
        min: 'min',
        max: 'max',
        none: 'nada',
        count: 'conteo',
        average: 'promedio',
        // standard menu
        copy: 'copiar',
        copyWithHeaders: 'copiar con encabezados',
        ctrlC: 'ctrl-C',
        paste: 'pegar',
        ctrlV: 'ctrl-V',
        export: 'Exportar',
        csvExport: 'Exportar a CSV',
        excelExport: 'Exportar a Excel'
      }
    };
  }

  onSelectionChanged() {
    this.selectedRows = this.gridOptions.api.getSelectedRows().length;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.autoSizeAll();
  }

  private autoSizeAll() {
    var allColumnIds: any[] = [];
    this.gridColumnApi.getAllColumns().forEach(function (column :any) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }

  getRoutes() {
    this.routesService.getRoutes(this.user.customerId).pipe(
      map((actions:any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id: id, ...data }
      }))
    ).subscribe((routes) => {    
      this.routesList = routes;
    });
  }
}

function currencyFormatter(params: any) {
  let number = typeof params.value != 'undefined' ? params.value : 0;
    return formatCurrencyNumber(number);
}

function formatCurrencyNumber(number: number) {
  return formatCurrency(number, 'en', '$', 'MXN');
}

function numberFormatter(params: any){
  let number = typeof params.value != 'undefined' ? params.value : 0;
    return formatNumberNumber(number);
}

function formatNumberNumber(number: any ){
return formatNumber(number, 'en', '1.2-2');
}