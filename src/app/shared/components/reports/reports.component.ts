import { Component, inject, Input } from '@angular/core';
import { CustomersService } from '../../../customers/services/customers.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { VendorService } from '../../services/vendor.service';
import { RoutesService } from '../../services/routes.service';
import { IActivityLog } from "../../../logistics/classes";
import { startOfToday, endOfToday } from 'date-fns';
import { log } from 'console';
import { map, Observable, Subject, take, tap, takeUntil, catchError } from 'rxjs';
import * as _ from 'lodash';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { IBaseProgram } from '../../interfaces/program.type';
import { LogisticsService } from '../../../logistics/services.service';
import { LiveService } from '../../services/live.service';
import {
  switchMap, of,
  forkJoin
} from 'rxjs';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {

  @Input() accountId: string = '';
  usersService = inject(CustomersService);
  usrService = inject(UsersService);
  authService = inject(AuthenticationService);
  vendorsService = inject(VendorService);
  routesService = inject(RoutesService);
  user: any;
  dateRangeForm: UntypedFormGroup;
  userData: any[] = [];
  listOfCurrentPageData: any[] = [];
  listOfCurrentPageDataScan: any[] = [];
  pageSize: number = 10;
  routeNamesMap: { [routeId: string]: string } = {};
  selectedRouteId: string = '';
  selectedRouteIdScan: string = '';
  selectedRouteNameScan: string = '';
  filteredUserData: any[] = [];
  filteredUserDataScan: any[] = [];
  private stopSubscription$ = new Subject<void>();
  routesList: any;
  logisticsService = inject(LogisticsService);
  liveService = inject(LiveService);
  rowData!: IActivityLog[];
  filteredData!: IActivityLog[];
  rowFleetData!: any[];
  chartData: any;
  activityList!: IActivityLog[];
  startDate: Date;
  endDate: Date;


  constructor(private notification: NzNotificationService,
    private messageService: NzMessageService,
    private fb: UntypedFormBuilder) {
    this.startDate = startOfToday()
    this.endDate = endOfToday();
    this.authService.user.subscribe((user) => {
      if (user && user.rolId) {
        this.user = user;
      }
    });

    this.dateRangeForm = this.fb.group({
      startDate: [startOfToday()], // Default to the start of today
      endDate: [endOfToday()],    // Default to the end of today
      selectedOption: [null]
    });
  }

  getusers() {
    this.usersService.getAccountUsers(this.accountId).pipe(
      map((actions: any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data };
      }))
    ).subscribe((users: any) => {
      this.userData = users;
      this.filteredUserData = [...this.userData]; // Inicialmente sin filtro
    });
  }

  ngOnInit() {
    // Carga las rutas al iniciar el componente
    this.loadRoutes();

    // Carga los usuarios
    this.getusers();
  }

  filterUsersByRoute() {

    if (this.selectedRouteId) {
      this.filteredUserData = this.userData.filter(user => user.defaultRoute === this.selectedRouteId);
    } else {
      this.filteredUserData = [...this.userData];
    }
  }
  filterUsersByRouteScan() {
  }

  loadRoutes() {
    // Suponiendo que tienes un método en routesService para obtener las rutas por accountId
    this.routesService.getRoutes(this.accountId).pipe(
      takeUntil(this.stopSubscription$),
      map((actions: any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data();
        return { routeId: id, routeName: data.description ?? 'Sin nombre' };
      }))
    ).subscribe(routes => {
      this.routesList = routes;
    });
  }

  export(): void {
    const selectedRouteName = this.routesList.find((route: any) => route.routeId === this.selectedRouteId)?.routeName || 'Todas';


    const dataToExport = this.filteredUserData.map(user => ({
      Nombre: `${user.firstName} ${user.lastName}`,
      Correo: user.email,
      Teléfono: user.phoneNumber,
      Ruta: selectedRouteName,
      Curp: user.curp,
      Edad: user.age,
      Dirección: user.adress,
      Poblacion: user.group
    }));
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Usuarios': worksheet },
      SheetNames: ['Usuarios']
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, `usuarios_exportados_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }
  exportScan(): void {

    const dataToExport = this.filteredUserDataScan.map(user => ({
      Nombre: user.studentName,
      Fecha: user.date,
      Ruta: user.op,
      Turno: user.round,
      Conductor: user.driver,
      Vehiculo: user.vehicleName,
      Email: user.user?.email || '',
      CURP: user.user?.curp || '',
      Teléfono: user.user?.phoneNumber || '',
      CódigoPostal: user.user?.zipCode || '',
      Dirección: user.user?.adress || '',
      Edad: user.user?.age || '',
      NombreCompleto: user.user?.displayName || '',
      NombreUsuario: user.user?.firstName || '',
      Apellido: user.user?.lastName || '',
      Grupo: user.user?.group || '',
      Ocupación: user.user?.occupation || '',
      Username: user.user?.username || '',
      Cliente: user.user?.customerName || '',
      Status: user.user?.status || '',
      RutaDefault: user.user?.defaultRoute || '',
      FechaRegistro: user.user?.dateCreateUserFormat || '',
      ViajeRedondo: user.user?.roundTrip || '',
      Poblacion: user.user?.group || ''

    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const worksheetName = 'Usuarios Escaneados';

    const workbook: XLSX.WorkBook = {
      Sheets: { [worksheetName]: worksheet },
      SheetNames: [worksheetName]
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, `usuarios_scan_exportados_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }



  ngOnDestroy() {
    this.stopSubscription$.next();
    this.stopSubscription$.complete();
  }

  loadData() {
    this.startDate = this.dateRangeForm.get('startDate')!.value;
    this.endDate = this.dateRangeForm.get('endDate')!.value;
    this.startDate = this.dateRangeForm.get('startDate')!.value;
    this.endDate = this.dateRangeForm.get('endDate')!.value;
    const selectedRoute = this.routesList.find((route: any) => route.routeId === this.selectedRouteIdScan);
    this.selectedRouteNameScan = selectedRoute ? selectedRoute.routeName : '';


    if (this.selectedRouteIdScan != "") {
      if (this.startDate && this.endDate) {

        this.logisticsService.getActivityLogByCustomerByRoute(this.startDate, this.endDate, this.accountId, this.selectedRouteIdScan).pipe(
          tap((logs: any[]) => {
          }),
          switchMap((logs: any[]): Observable<any[]> => {
            const enrichedLogs$ = logs.map((logSnap: any) => {
              const logData = logSnap.payload.doc.data();
              const id = logSnap.payload.doc.id;
              const userId = logData.userId;

              return this.usrService.getUserInfoScan(userId).pipe(
                take(1),  // <-- muy importante
                catchError((err: any) => {
                  console.error('Error al obtener usuario', userId, err);
                  return of(null);
                }),
                map((userData: any) => ({
                  ...logData,
                  id,
                  op: this.selectedRouteNameScan,
                  user: userData || {}
                }))
              );
            });

            return enrichedLogs$.length > 0 ? forkJoin(enrichedLogs$) : of([]);
          })
        ).subscribe((enrichedLogs: any[]) => {

          this.filteredUserDataScan = enrichedLogs;
          console.log(enrichedLogs);
        });

      }
      else {
        this.notification.create('error', 'Error', 'Se Requiere un rango de fechas');
        return;
      }
    }

  }

  onDateRangeChange(): void {
    // Access the selected start and end dates from the form group

  }

}
