import { DatePipe } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ProgramService } from '../../shared/services/program.service';
import { Observable, Subject, map, take, takeUntil, tap } from 'rxjs';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { RolService } from '../../shared/services/roles.service';
import { AccountsService } from '../../shared/services/accounts.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RoutesService } from '../../shared/services/routes.service';
import { UsersService } from '../../shared/services/users.service';
import { DashboardService } from '../../shared/services/admin/dashboard.service';
import { throws } from 'assert';
import { log } from 'console';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrl: './center.component.scss'
})
export class CenterComponent {
  programService = inject(ProgramService);
  authService = inject(AuthenticationService);
  rolService = inject(RolService);
  routesService = inject(RoutesService);
  accountsService = inject(AccountsService);
  dashboardService = inject(DashboardService);
  userService = inject(UsersService);
  dateFilterForm: UntypedFormGroup;
  dateFilterFormI: UntypedFormGroup;
  dateFilterFormO: UntypedFormGroup;
  user: any;
  infoSegment: any = [];
  mejorasData: any;
  mfData: any[] = [];
  mfDataM: any[] = [];
  incidenteData: any;
  opData: any;
  userlevelAccess: string | undefined;
  loadingmejorasData = false;
  loadingincidenteData = false;
  loadingopData = false;
  infoLoad: any = [];
  stopSubscription$: Subject<any> = new Subject();
  routeNames: { [key: string]: string } = {};
  isProgramModalVisible = false;
  isSeguimientoVisible = false;
  isUserModalVisible = false;
  modalData: any = {}; // Initialize as an object
  modalDataUser: any = {};
  selectedDataUser: any = [];
  selectedStatus: string | null = null;
  response: string | null = null;
  errorMessage: string | null = null;
  selectedUserToken: string = "";
  selectHelpCenterIdTicket: string = "";
  selectedUidUser: string = "";
  customersList: any[] = [];
  selectedOption: any;

  constructor(
    private afs: AngularFirestore,
    private messageService: NzMessageService,
    private datePipe: DatePipe,
    private fb: UntypedFormBuilder) {

    this.authService.user.subscribe((user: any) => {
      if (user) {
        this.user = user;
        if (this.user !== null && this.user !== undefined && this.user.rolId !== undefined) {
          this.rolService.getRol(this.user.rolId).valueChanges().subscribe((item: any) => {
            this.infoLoad = item;
            this.userlevelAccess = this.infoLoad.optionAccessLavel;
          });
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

    this.dateFilterForm = this.fb.group({
      selectedOption: [null], // 'selectedDate' is the name of the form control
      status: []
    });

    this.dateFilterFormI = this.fb.group({
      selectedOption: [null], // 'selectedDate' is the name of the form control
      status: []
    });

    this.dateFilterFormO = this.fb.group({
      selectedOption: [null], // 'selectedDate' is the name of the form control
      status: []
    });
    this.getCustomersList();
  }

  ngOnDestroy() {
    this.stopSubscription$.next(undefined);
    this.stopSubscription$.complete();
  }

  ngOnInit() {
  }

  onDateChange(mode: string) {
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual 
    }
    else {
      if (mode == "1") {
        const selectedOptionValue = this.dateFilterForm.get('selectedOption')!.value;
        const statusSelected = this.dateFilterForm.get('status')!.value;

        if (selectedOptionValue && statusSelected) {
          this.programService.getHelpCenterAll("Mejora", selectedOptionValue, statusSelected).pipe(
            map((actions: any) => actions.map((a: any) => {
              const id = a.payload.doc.id;
              const data = a.payload.doc.data() as any;
              return { id: id, ...data }
            }))
          ).subscribe((data: any) => {
            if (data.length > 0) {
              this.mfDataM = data;
              this.mfData.forEach(data2 => {
                if (data.routeId) {
                  this.getRouteNameById(data2.routeId, data2.customerId);  // Assume `customerId` is part of `data`
                }
              });
            }
          });

          this.programService.getHelpCenterAll("Felicitacion", selectedOptionValue, statusSelected).pipe(
            map((actions: any) => actions.map((a: any) => {
              const id = a.payload.doc.id;
              const data = a.payload.doc.data() as any;
              return { id: id, ...data }
            }))
          ).subscribe((data: any) => {
            if (data.length > 0) {
              this.mfData = data;
              this.mfData.forEach(data2 => {
                if (data.routeId) {
                  this.getRouteNameById(data2.routeId, data2.customerId);  // Assume `customerId` is part of `data`
                }
              });
            }
          });
        } else {
          this.sendMessage("error", "Los criterios son requeridos para la busqueda");
        }

      } else if (mode == "2") {
        const selectedOptionValue = this.dateFilterFormI.get('selectedOption')!.value;
        const statusSelected = this.dateFilterFormI.get('status')!.value;
        if (selectedOptionValue && statusSelected) {
          this.programService.getHelpCenterAll("Incidente", selectedOptionValue, statusSelected).pipe(
            map((actions: any) => actions.map((a: any) => {
              const id = a.payload.doc.id;
              const data = a.payload.doc.data() as any;
              return { id: id, ...data }
            }))
          ).subscribe((data: any) => {
            if (data.length > 0) {
              this.incidenteData = data;
              this.incidenteData.forEach((data2: any) => {
                if (data.routeId) {
                  this.getRouteNameById(data2.routeId, data2.customerId);  // Assume `customerId` is part of `data`
                }
              });
            } else {
              this.sendMessage("info", "No existen registros con estos criterios");
            }
          });
        } else {
          this.sendMessage("error", "Los criterios son requeridos para la busqueda");
        }
      } else {
        const selectedOptionValue = this.dateFilterFormO.get('selectedOption')!.value;
        const statusSelected = this.dateFilterFormO.get('status')!.value;
        if (selectedOptionValue && statusSelected) {
          this.programService.getHelpCenterAll("Objeto Perdido", selectedOptionValue, statusSelected).pipe(
            map((actions: any) => actions.map((a: any) => {
              const id = a.payload.doc.id;
              const data = a.payload.doc.data() as any;
              return { id: id, ...data }
            }))
          ).subscribe((data: any) => {
            if (data.length > 0) {
              this.opData = data;
              this.opData.forEach((data2: any) => {
                if (data.routeId) {
                  this.getRouteNameById(data2.routeId, data2.customerId);  // Assume `customerId` is part of `data`
                }
              });
            } else {
              this.sendMessage("info", "No existen registros con estos criterios");
            }
          });
        } else {
          this.sendMessage("error", "Los criterios son requeridos para la busqueda");
        }
      }
    }
  }

  getCustomersList() {
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      const customersCollection = this.afs.collection('customers', ref => ref
        .where('customerId', '==', this.user.customerId).orderBy('name'));
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

  getRouteNameById(routeId: string, customerId: string): string {
    if (this.routeNames[routeId]) {
      return this.routeNames[routeId];
    }
    this.routesService.getRoute(customerId, routeId).pipe(
      take(1),
      map((a: any) => {
        const data = a.payload.data() as any;
        const routeName = data ? data.name : 'Pendiente..';
        this.routeNames[routeId] = routeName;
        return routeName;
      })
    ).subscribe();
    return 'Loading...'; // Return a loading text until the data is available
  }

  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
  }
  openProgramModal(programId: string, customerId: string): void {
    this.isProgramModalVisible = true;
    this.loadProgramData(programId, customerId);
  }

  openSeguimientoModal(ticketId: string, token: string, userId: string): void {
    this.isSeguimientoVisible = true;
    this.selectedUserToken = token;
    this.selectHelpCenterIdTicket = ticketId;
    this.selectedUidUser = userId;
    this.loadUserInfo(this.selectedUidUser);
  }
  handleOk(): void {
    if (!this.selectedStatus || !this.response) {
      this.errorMessage = 'Por favor, complete todos los campos antes de enviar.';
    } else {
      this.errorMessage = null;
      // Add your submission logic here
      if (!this.selectedUserToken || !this.selectHelpCenterIdTicket || !this.selectedUidUser || !this.selectedDataUser) {
        this.errorMessage = 'Falta información por cargar. Validar nuevamente.';
      } else {
        let userNotificationToken = this.selectedUserToken || '';
        this.programService.updateTicketHelpCenter(this.selectHelpCenterIdTicket, this.selectedStatus);
        if (userNotificationToken) {
          const dataMessage = {
            createdAt: new Date(),
            from: 'FyXKSXsUbYNtAbWL7zZ66o2f1M92',
            fromName: 'El Ticket generado tiene un status de :' + this.selectedStatus,
            msg: this.response,
            requestId: 'suhB7YFAh6PYXCRuJhfD',
            token: userNotificationToken,
            uid: this.selectedUidUser,
            email: this.selectedDataUser.email,
            title: 'Apps And Informa General',
            body: this.response
          }
          const notifMessage = {
            timestamp: new Date(),
            title: 'El Ticket generado tiene un status de :' + this.selectedStatus,
            email: this.selectedDataUser.email,
            body: this.response,
            token: userNotificationToken,
            uid: this.selectedUidUser
          }

          this.dashboardService.setChatMessage(dataMessage);
          this.dashboardService.setMessage(notifMessage, this.selectedUidUser);
          this.isSeguimientoVisible = false;
          this.response = "";
        } else {
          this.sendMessage("error", 'Null token :' + this.selectedUidUser + "// " + this.modalDataUser.customerName);
        }
      }
    }
  }

  closeProgramModal(): void {
    this.isProgramModalVisible = false;
    this.isSeguimientoVisible = false;
    this.isUserModalVisible = false;
    this.selectedUserToken = "";
    this.selectHelpCenterIdTicket = "";
    this.selectedUidUser = "";
  }

  loadProgramData(programId: string, customerId: string): void {
    this.programService.getProgrambyCustomer(programId, customerId).subscribe({
      next: (action) => {
        if (action.payload) {
          const data = action.payload.data() as { [key: string]: any }; // Type assertion for index signature

          const startAt = data['startAt'] ? data['startAt'].toDate() : new Date(); // Ensure startAt is a Timestamp
          const endAt = data['endAt'] ? data['endAt'].toDate() : new Date();
          const formattedDate = this.datePipe.transform(startAt, 'dd-MM-yyyy HH:mm');
          const formatendAt = this.datePipe.transform(endAt, 'dd-MM-yyyy HH:mm');
          this.modalData = {
            customerName: data['customerName'],
            driver: data['driver'],
            startAt: formattedDate,
            round: data['round'],
            endAt: formatendAt,
            vehicleName: data['vehicleName']
          };
        } else {
          this.sendMessage("error", "Registro no encontrado");
        }
      },
      error: (error) => {
        this.sendMessage("error", error);
      }
    });
  }

  loadUserInfoPanel(uidUser: string) {
    this.isUserModalVisible = true;
    this.loadUserInfo(uidUser);
  }

  loadUserInfo(uidUser: string) {
    this.userService.getUserInfo(uidUser).subscribe({
      next: (action) => {
        if (action.payload) {
          const data = action.payload.data() as { [key: string]: any }; // Type assertion for index signature
          this.selectedDataUser = data;
          this.modalDataUser = {
            customerName: data['customerName'],
            displayName: data['displayName'],
            email: data['email'],
            phoneNumber: data['phoneNumber'],
            token: data['token']
          };
        } else {
          this.sendMessage("error", "Registro no encontrado");
        }
      },
      error: (error) => {
        this.sendMessage("error", error);
      }
    });
  }
}
