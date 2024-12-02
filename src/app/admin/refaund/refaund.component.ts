import { Component, inject } from '@angular/core';
import { ProgramService } from '../../shared/services/program.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { RolService } from '../../shared/services/roles.service';
import { RoutesService } from '../../shared/services/routes.service';
import { AccountsService } from '../../shared/services/accounts.service';
import { DashboardService } from '../../shared/services/admin/dashboard.service';
import { UsersService } from '../../shared/services/users.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject, map, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-refaund',
  templateUrl: './refaund.component.html',
  styleUrl: './refaund.component.scss'
})
export class RefaundComponent {
  programService = inject(ProgramService);
  authService = inject(AuthenticationService);
  rolService = inject(RolService);
  routesService = inject(RoutesService);
  accountsService = inject(AccountsService);
  dashboardService = inject(DashboardService);
  userService = inject(UsersService);
  dateFilterForm: UntypedFormGroup;
  user: any;
  mfDataM: any[] = [];
  infoSegment: any = [];
  userlevelAccess: string | undefined;
  stopSubscription$: Subject<any> = new Subject();
  infoLoad: any = [];
  customersList: any[] = [];
  selectedOption: any; 
  selectedStatus: string | null = null;
  response: string | null = null;
  errorMessage: string | null = null;
  loadingData = false;
  isSeguimientoVisible = false;
  selectedDataUser: any = [];
  modalDataUser: any = {};

  constructor(
    private afs: AngularFirestore,
    private messageService: NzMessageService,
    private fb: UntypedFormBuilder) {

      this.authService.user.subscribe((user: any) => {
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
      });

      this.dateFilterForm = this.fb.group({
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

    getCustomersList() {
      if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
        const customersCollection = this.afs.collection('customers', ref => ref
          .where('customerId', '==', this.user.customerId).orderBy('name'));
        customersCollection.snapshotChanges().pipe(
          takeUntil(this.stopSubscription$),
          map((actions:any) => actions.map((a:any) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { id, ...data }
          })),
          tap((customers:any) => {
            this.customersList = customers;
            return customers;
          })
        ).subscribe();        
      } else {
        const customersCollection = this.afs.collection('customers', ref => ref.orderBy('name'));
        customersCollection.snapshotChanges().pipe(
          takeUntil(this.stopSubscription$),
          map((actions:any) => actions.map((a:any) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { id, ...data }
          })),
          tap((customers:any) => {
            this.customersList = customers;          
            return customers;
          })
        ).subscribe();
      }
    }

    sendMessage(type: string, message: string): void {
      this.messageService.create(type, message);
    }

    handleOk(): void {
      if (!this.selectedStatus || !this.response) {
        this.errorMessage = 'Por favor, complete todos los campos antes de enviar.';
      } else {
        this.errorMessage = null;    
        console.log(this.selectedDataUser);
        
        // Add your submission logic here
        if (! this.selectedDataUser.token || !this.selectedDataUser.idDoc || !this.selectedDataUser.userUid || !this.selectedDataUser) {
          this.errorMessage = 'Falta información por cargar. Validar nuevamente.';
        } else {
          let userNotificationToken = this.selectedDataUser.token || '';
  
          this.programService.updateTicketRefund(this.selectedDataUser.idDoc, this.selectedStatus);
  
  
          if (userNotificationToken) {
            const dataMessage = {
              createdAt: new Date(),
              from: 'FyXKSXsUbYNtAbWL7zZ66o2f1M92',
              fromName: 'El Ticket generado tiene un status de :' + this.selectedStatus,
              msg: this.response,
              requestId: 'suhB7YFAh6PYXCRuJhfD',
              token: userNotificationToken,
              uid: this.selectedDataUser.userUid,
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
              uid: this.selectedDataUser.userUid
            }         
  
            this.dashboardService.setChatMessage(dataMessage);        
  
            this.dashboardService.setMessage(notifMessage, this.selectedDataUser.userUid);
            this.isSeguimientoVisible = false;
  
            this.response = "";
          } else {
            console.log('Null token :' + this.selectedDataUser.userUid + "// " + this.modalDataUser.customerName);
          }
        }
      } 
    }

    openSeguimientoModal(ticketId: string, token: string, userId: string, data:any): void {
     console.log(ticketId +" / "+ userId + " /// "+ token);
     this.isSeguimientoVisible = true;
      
      if ( data['userFullData']['token'] == undefined) {
        this.errorMessage = "El usuario no cuenta con un token válido para poder dar seguimiento.";
      }
      this.modalDataUser = {
        customerName: data['customer'],
        displayName: data['displayName'],
        benefit:data['benefit'],
        bankCode: data['bankCode'],
        phone:data ['phone'],
        matricula:data['matricula'],
        phoneAlternative: data['phoneAlternative'],
        email: data['email'],    
        token: data['userFullData']['token'],
        turn:data['turn'],
        name: data['route']['name'],
        idDoc:data['idDoc'],
        userUid: data['uid']
      };
      this.selectedDataUser = this.modalDataUser;
      //console.log( this.modalDataUser);
      console.log(this.selectedDataUser);
    }

    onDateChange() {

      if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
  
      }
      else {       
          const selectedOptionValue = this.dateFilterForm.get('selectedOption')!.value;
          const statusSelected =  this.dateFilterForm.get('status')!.value;
        console.log(selectedOptionValue);
        console.log(statusSelected);
        
  
          if (selectedOptionValue && statusSelected) {
            this.programService.getRefund(selectedOptionValue, statusSelected).pipe(
              map((actions: any) => actions.map((a: any) => {
                const id = a.payload.doc.id;
                const data = a.payload.doc.data() as any;
                return { id: id, ...data }
              }))
            ).subscribe((data: any) => {
              if (data.length > 0) {
                this.mfDataM = data;             
              }
            });    
          } else {
            this.sendMessage("error", "Los criterios son requeridos para la busqueda");
          }
  
               
       
      }
    }


  closeProgramModal(): void {
   
    this.isSeguimientoVisible = false;
    this.modalDataUser = {};
  
  }

  

}
