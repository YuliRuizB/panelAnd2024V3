
import { format, fromUnixTime } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import * as firebase from 'firebase/app';


export interface IActivityLog {
    actualKey?: string;
    code?: string;
    created: string;
    description: string;
    driver?: string;
    event: string;
    format?: string;
    icon?: string;
    location?: string;
    program: string;
    round: string;
    route: string;
    studentId: string;
    studentName: string;
    type: string;
    updateData?: boolean;
    valid?: boolean;
    validUsage?: boolean;
    vehicle?: string;
    customerName?: string;
    time?: string;
    routeName:string;
    routeid?:string;
    vehicleName:string;
    driverName?:string;
    customerId?:string;
    id?:string;
    endedAt?:string;
    startedAt?:string;
    allowedOnBoard:boolean;
  }

  export interface IFileInfo {
    folder?: string;
    fileName?: string;
    fileUrl?: string;
    creation_date?: Date;
  }

  export var ColumnDefs = [
    { headerName: 'Fecha',  floatingFilter:true,   filter:true, field: 'created', cellRenderer: (params: any ) => { 
      if (params && params.value) {
        return format( fromUnixTime(params.value.seconds), 'MM/dd/yyyy HH:mm', { locale: esLocale })
      } else { return ''}
    }},
    // { headerName: 'Fecha', field: 'created' },
    { headerName: 'Alumno', floatingFilter:true, field: 'studentName', sortable: true ,filter:true},
    { headerName: 'Identificación',  floatingFilter:true, field: 'studentId', sortable: true, filter:true, enableValue: true, allowedAggFuncs: ['count'] },
   // { headerName: 'Ingreso con',flex: 4, field: 'studentId', sortable: true, enableValue: true, filter:true, allowedAggFuncs: ['count'] },
    { headerName: 'Evento',field: 'event', floatingFilter:true,  filter:true, sortable: true   
    },
   // { headerName: 'Tipo',flex: 3, field: 'type', sortable: true,filter:true, enableRowGroup: true },
   // { headerName: 'Descripción', flex: 6, field: 'description', filter:true, sortable: true },
    { headerName: 'Operación',field: 'route',rowGroup: true, filter:true,  floatingFilter:true },
    { headerName: 'Turno', field: 'round', filter:true,  floatingFilter:true },
    { headerName: 'Programa', field: 'program',filter:true,  floatingFilter:true },
    //{ headerName: 'Vehículo', flex: 4,field: 'vehicle', filter:true, enableRowGroup: true },
    { headerName: '¿Subió?',  field: 'allowedOnBoard',filter:true, floatingFilter:true}
  ];
 export var LiveProgramColumnsDef =[
  { headerName: '--',width:90, cellStyle: {color: 'blue'}, field: 'editMode',pinned: 'left', 
  enableCellChangeFlash:true 
  ,valueGetter: (params : any ) => {
    if(params && params.node) {     
      return  "Editar"
    } else { return ''}
  }},
  { headerName: 'Inicia', width:115, field: 'time', 
    valueGetter: (params : any ) => {
      if(params && params.node && params.node.data.time) {
        return format( fromUnixTime(params.node.data.time.seconds), 'HH:mm a', { locale: esLocale })
      } else { return ''}
  } },
  { headerName: 'Empresa',width:170, field: 'customerName', enableCellChangeFlash:true },
  { headerName: 'Operación', width:130,field: 'routeName',  enableCellChangeFlash:true },
  { headerName: 'Programa / Turno',width:175, field: 'round', valueGetter: (params : any ) => {
    if(params && params.node) {     
      return  params.node.data.round + " / " + params.node.data.program
    } else { return ''}
  }},
  { headerName: 'PR', width:210,field: 'driver',  enableCellChangeFlash:true },
  { headerName: 'Vehículo',width:120, field: 'vehicleName',  enableCellChangeFlash:true },
  { headerName: 'Inició', width:115, field: 'startedAt',  
  valueGetter: (params  : any ) => {
    if(params && params.node && params.node.data.startAt) {
      if(params.node.data.started){
      return format( fromUnixTime(params.node.data.startedAt.seconds), 'HH:mm a', { locale: esLocale })
    } else {
      return "No"
    }
    } else { return ''}
  }},
  { headerName: 'Finalizó',width:115, field: 'endedAt',
  valueGetter: (params: any ) => {
    if(params && params.node) {
      if (params.node.data.hasEnded) {
      return format( fromUnixTime(params.node.data.endedAt.seconds), 'HH:mm a', { locale: esLocale })
    } else {
      return "No"
    }
    } else { return ''}
  }}
 ];
/*  export var LiveAsignColumnDef: (ColDef)[] =[
  { headerName: 'Empresa', field: 'customerName',  headerCheckboxSelection: true, 
  headerCheckboxSelectionFilteredOnly: true, filter: true, checkboxSelection: true, sortable: true, enableRowGroup: true },
   { headerName: 'Operación', field: 'routeName',filter: true, sortable: true,  enableCellChangeFlash:true },
  { headerName: 'Inicia', field: 'stopBeginHour', sortable: true, filter: true
   },
  { headerName: 'Programa / Turno', field: 'round', valueGetter: (params) => {
    if(params && params.node) {     
      return  params.node.data.round + " / " + params.node.data.program
    } else { return ''}
  }},
  { headerName: 'Tipo', field: 'type', sortable: true, enableValue: true, enableCellChangeFlash:true },
  { headerName: 'PR', field: 'driver', filter: true, sortable: true, enableCellChangeFlash:true },
  { headerName: 'Vehículo', field: 'vehicleName', sortable: true, enableCellChangeFlash:true }
 ];
 export var QualityColumnDef: (ColDef)[] =[
  { headerName: '--',width:90, enableRowGroup: true, sortable: true,
  resizable: true, cellStyle: {color: 'blue'}, field: 'editMode',pinned: 'left', enableCellChangeFlash:true 
  ,valueGetter: (params: any) => {
    if(params && params.node) {     
      return  "Detalle"
    } else { return ''} }}, 
   { headerName: 'Folder',  enableRowGroup: true,field: 'folder',filter: true, sortable: true,  enableCellChangeFlash:true },
  { headerName: 'Nombre', enableRowGroup: true, field: 'fileName', sortable: true, filter: true} 
 ];
 */
  export var LiveProgramColumnDefs = [
    { headerName: 'PR', field: 'driver', sortable: true, enableCellChangeFlash:true },
    { headerName: 'Vehículo', field: 'vehicleName', sortable: true, enableCellChangeFlash:true },
    { headerName: 'Empresa', field: 'customerName', sortable: true, enableRowGroup: true },
    { headerName: 'Fecha Inicio', field: 'startAt',
      valueGetter: (params: any ) => {
        if(params && params.node && params.node.data.startAt) {
          return format( fromUnixTime(params.node.data.startAt.seconds), 'MM/dd/yyyy HH:mm', { locale: esLocale })
        }  else { return ''}
      }
    },
    { headerName: 'Fecha Fin', field: 'endAt', valueGetter: (params: any ) => {
      if(params && params.node && params.node.data.endAt) {
        return format( fromUnixTime(params.node.data.endAt.seconds), 'MM/dd/yyyy HH:mm', { locale: esLocale })
      } else { return ''}
    }},
    { headerName: '¿Inició?', field: 'started', enableRowGroup: true, enableCellChangeFlash:true, cellRenderer: (params: any ) => { 
      if (params && params.value) {
        return !!params.value ? 'Si':'No'
      } else { return ''}
    }},
    { headerName: 'Inició el', field: 'startedAt', enableCellChangeFlash:true, valueGetter: (params: any ) => {
      if(params && params.node && params.node.data.startedAt) {
        return format( fromUnixTime(params.node.data.startedAt.seconds), 'MM/dd/yyyy HH:mm', { locale: esLocale })
      } else { return ''}
    }},
    { headerName: '¿Finalizó?', field: 'hasEnded', enableCellChangeFlash:true, enableRowGroup: true, cellRenderer: (params: any ) => { 
      if (params && params.value) {
        return !!params.value ? 'Si':'No'
      } else { return ''}
    }},
    { headerName: 'Finalizó el', field: 'endedAt', enableCellChangeFlash:true, valueGetter: (params: any ) => {
      if(params && params.node && params.node.data.endedAt) {
        return format( fromUnixTime(params.node.data.endedAt.seconds), 'MM/dd/yyyy HH:mm', { locale: esLocale })
      } else { return ''}
    }},
    // { headerName: 'Fecha', field: 'created' },
    { headerName: 'Problemas?', field: 'isWithTrouble', enableCellChangeFlash:true, enableRowGroup: true, cellRenderer: (params: any ) => { 
      if (params && params.value) {
        return !!params.value ? 'Si':'No'
      } else { return ''}
    }},
    { headerName: 'Problema', field: 'troubleMessage', sortable: true, enableValue: true, enableCellChangeFlash:true },
    { headerName: 'Tipo de problema', field: 'troubleType', sortable: true, enableValue: true, enableCellChangeFlash:true },
    { headerName: 'Programa', field: 'program', sortable: true, enableValue: true, enableCellChangeFlash:true },
    { headerName: 'Turno', field: 'round', sortable: true, enableRowGroup: true, enableCellChangeFlash:true },
    { headerName: 'Operación', field: 'routeName', sortable: true, enableRowGroup: true, enableCellChangeFlash:true },
    { headerName: 'Tipo', field: 'type', enableRowGroup: true, enableCellChangeFlash:true },
    { headerName: 'Capacidad', field: 'capacity', enableRowGroup: true },
    { headerName: 'Usuarios', field: 'count', enableRowGroup: true, enableCellChangeFlash:true }
  ]