import { Component, OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter } from 'lodash';
//import { isTemplateRef } from 'ng-zorro-antd/';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AccountsService } from '../../../services/accounts.service';
import { DashboardService } from '../../../services/admin/dashboard.service';
import { MessageCenterService } from '../../../services/messageCenter.service';
import { RoutesService } from '../../../services/routes.service';
import { CustomersService } from '../../../../customers/services/customers.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { UsersService } from '../../../services/users.service';
import { ConsoleSqlOutline } from '@ant-design/icons-angular/icons';
import { DriversService } from '../../../services/drivers.service';

@Component({
  selector: 'app-shared-messageCenter',
  templateUrl: './messageCenter.component.html',
  styleUrls: ['./messageCenter.component.css']
})
export class MessageCenterComponent implements OnInit {
  customerService = inject(CustomersService);
  accountsService = inject(AccountsService);
  dashboardService = inject(DashboardService);
  routeService = inject(RoutesService);
  userService = inject(UsersService);
  driverService = inject(DriversService);
  accountsSubscription?: Subscription;
  stopSubscription$: Subject<boolean> = new Subject();
  isShowDiv: boolean = false;
  isShowDivGroup: boolean = false;
  isShowDivRoutes: boolean = false;
  filllistRoutes: any[] = [];
  isShowDivCustomer: boolean = false;
  allChecked = false;
  indeterminate = true;
  listOfCustomer: any;
  listOfCustomerGeneral: any;
  listOfRoutes: any;
  listOfSelectedRoutes: any;
  isShowUsers: boolean = false;
  listOfUsers: any;
  listofUsersPreview: any[] = [];
  InputMessage: string = "";
  newMessage: string = "";
  newMessageInd: string = "";
  newMessageG: string = "";
  listofRoutesByRound: any[] = [];
  IdCustomerLive: string = "";
  IdCustomerName: string = "";
  IdCustomerLiveInd: string = "";
  IdCustomerLiveGral: string = "";
  IdCustomerNameInd: string = "";
  listofRecordsAfected: any[] = [];
  listRecordsSeg: any[] = [];
  arrayPreview: any[] = [];
  listOfRound: any[] = [];
  listOfSelectedCustomer: string = "";
  userObj: any[] = [];
  ejecutorObj: any[] = [];
  userObjG: any[] = [];
  ejecutorObjG: any[] = [];
  accountId$ = new Subject<string>();
  routeId$ = new Subject<string>();
  routes: any[] = [];
  ListofUsersIDs: any[] = [];
  FinalList: any[] = [];
  user: any;
  infoSegment: any = [];
  authService = inject(AuthenticationService);
  isEjecutoresSelectedInd: boolean = false;
  isUserSelectedInd: boolean = false;
  isEjecutoresSelectedIndGeneral: boolean = false;
  isUserSelectedIndGeneral: boolean = false;
  isUserSelectedSeg: boolean = false;
  isMessageInd: boolean = false;
  isEjecSelectedSeg : boolean = false;
  selectedCustomer: any[] = [];
  selectedCustomerGral: any[] = [];
  selectedUser: any[] = [];
  selectedEjecutor: any[] = [];
  selectedSearchType: string = "";
  selectedSearchTypeG: string = "";
  newMessageSeg:string = "";
  checkOptionsUnit = [
    { label: 'Unidad', value: 'Unidad', checked: false },
    { label: 'Todas las Unidades', value: 'allUnit', checked: false }
  ];
  checkOptionsRoute = [
    { label: 'De 1 a 10 Operaciones', value: 'Route', checked: false },
    { label: 'Todas las Operaciones', value: 'allRoutes', checked: false }
  ];

  chekOptionsRound = [
    { label: 'Día', value: 'Día', checked: false },
    { label: 'Tarde', value: 'Tarde', checked: false },
    { label: 'Noche', value: 'Noche', checked: false },
    { label: 'Sencillo', value: 'sencillo', checked: false }
  ];
  selectedValue: string = '';

  constructor(
    private afs: AngularFirestore,
    private messageCenterService: MessageCenterService,
    private message: NzMessageService) {

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
              this.infoCustomerLoad();
              return record;
            })
          ).subscribe();
        }
      }
    });
  }

  infoCustomerLoad() {
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      this.accountsService.getAccountsByCustomer(this.user.customerId).pipe(
        takeUntil(this.stopSubscription$),
        map((a: any) => {
          const id = a.payload.id;
          const data = a.payload.data() as any;
          return { id, ...data }
        }),
      ).subscribe((accounts) => {
        this.listOfCustomer = [accounts];
        this.listOfCustomerGeneral = [accounts];
      });
    } else {
      this.accountsService.getAccounts().pipe(
        takeUntil(this.stopSubscription$),
        map((actions: any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe((accounts) => {
        this.listOfCustomer = accounts;
        this.listOfCustomerGeneral = accounts;
      });
    }
    const routesObservable: Observable<any> = this.accountId$.pipe(
      switchMap(accountId => this.afs.collection('customers').doc(accountId)
        .collection('routes', ref => ref.where('active', '==', true))
        .valueChanges({ idField: 'routeId' })
      ));
    // subscribe to changes
    routesObservable.subscribe((routes: any) => {
      this.routes = routes;
    });
  }

  ngOnInit() {
  }

  log(value: object[]): void {
  }

  updateSingleCheckedRoute() {
    let itemCustomer = this.IdCustomerLive;
    this.filllistRoutes = [];
    this.listOfRoutes = [];
    if (itemCustomer.length > 0) {
      this.accountId$.next(itemCustomer);
    } else {
      this.checkOptionsRoute.forEach(item => {
        item.checked = false;
      });
      this.createMessage('error', 'No has seleccionado una empresa.');
    }
  }

  sendMessage() {
    if (this.InputMessage) {
      if (this.FinalList.length > 0) {
        // Send message to selected users.
        this.FinalList.forEach(eachUserMessage => {
          let userNotificationToken = eachUserMessage.token || '';
          if (userNotificationToken) {
            const dataMessage = {
              createdAt: new Date(),
              from: 'FyXKSXsUbYNtAbWL7zZ66o2f1M92',
              fromName: 'Apps And Informa General',
              msg: this.InputMessage,
              requestId: 'suhB7YFAh6PYXCRuJhfD',
              token: eachUserMessage.token,
              uid: eachUserMessage.uid,
              email: eachUserMessage.email,
              title: 'Apps And Informa General',
              body: this.InputMessage
            }
            const notifMessage = {
              timestamp: new Date(),
              title: 'Apps And Informa General',
              email: eachUserMessage.email,
              body: this.InputMessage,
              token: eachUserMessage.token,
              uid: eachUserMessage.uid
            }
            this.dashboardService.setChatMessage(dataMessage);
            this.dashboardService.setMessage(notifMessage, eachUserMessage.idUser);
          } else {
            this.createMessage('error', 'Token Invalido :' + eachUserMessage.uid + "// " + eachUserMessage.name);
          }
        })
        this.createMessage('sucess', "Concluyo el envio");
      } else {
        this.createMessage('warning', 'Se tiene que seleccionar una Operación para envio de mensajes.');
      }
    } else {
      this.createMessage('warning', 'El campo mensaje no puede estar vacío.');
    }
  }

  updateSingleCheckedRound() {
    if (this.chekOptionsRound.every(item => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.chekOptionsRound.every(item => item.checked)) {
      this.allChecked = true;
    } else {
      this.chekOptionsRound.forEach(singlecheck => {
        if (singlecheck.checked) {

          this.arrayListAfterRound(singlecheck.value);
        }
      });
    }
  }

  updateAllChecked() {
    this.indeterminate = false;
    if (this.allChecked) {
      this.chekOptionsRound = this.chekOptionsRound.map(item => ({
        ...item,
        checked: true
      }));
      this.arrayListAfterRound('Día');
      this.arrayListAfterRound('Tarde');
      this.arrayListAfterRound('Noche');
    } else {
      this.chekOptionsRound = this.chekOptionsRound.map(item => ({
        ...item,
        checked: false
      }));
      this.listOfRound = [];
    }
  }

  arrayListAfterRound(round: string) {
    let singleItemChecked = this.checkOptionsRoute.find(res => res.value == 'Route');
    if (singleItemChecked!.checked) {
      this.isShowDivRoutes = true;
    }
    const DuplicateRound = this.listOfRound.find(find => find.idRound == round);
    if (!DuplicateRound) {
      this.listOfRound.push({ idRound: round });
    }
  }
  applyFilterSeg () {
      if (this.selectedValue === 'usuarios') {        
          this.messageCenterService.getUserByRoundCustomer("", this.listOfSelectedRoutes, this.listOfSelectedCustomer)
          .snapshotChanges() // Convertir a Observable
          .pipe(
            take(1),
            map((actions: any) => {
              return actions
                .map((a: any) => {
                  const data = a.payload.doc.data() as any;
                  const id = a.payload.doc.id;
                  const path = a.payload.doc.ref.parent.path;
                  const pathArray = path.split('/');
                  const VuserID = pathArray[1];
                  return { id, ...data, VuserID };
                })
                .filter((user: any ) => user.token !== ""); // Filtrar usuarios con token diferente de ""
            }),
            tap((userF) => {                
              if (userF) {
                this.isUserSelectedSeg = true;
                this.isEjecSelectedSeg = false;
                let routeAded = {
                  route: this.getSelectedRouteName(this.listOfSelectedRoutes),
                  users: userF.length }
                  this.listRecordsSeg.push(routeAded);
                this.isShowUsers= true;
                userF.forEach((sRound : any) => {
                  const DuplicateAddRecord = this.userObj.find(duplicate => duplicate.routeId == sRound.routeId &&
                    duplicate.customerId == sRound.customerId );
                  if (!DuplicateAddRecord) {
                    let userObj = {
                      active: true,
                      id: sRound.uid,
                      label: sRound['firstName'] + ' ' + sRound['lastName'] + ' // ' + sRound['email'],
                      phoneNumber: sRound['phone'],
                      firstName: sRound['firstName'],
                      lastName: sRound['lastName'],
                      email: sRound['email'],
                      displayName: sRound['displayName'],
                      token: sRound['token']
                    }
                    this.userObj.push(userObj);              
                
              }});
            }})
          )
          .subscribe();
        
        } else  {
    
        }    
  
  }

  applyFilter() {
    this.changesOverRoutesSelected();
    if (this.arrayPreview.length > 0) {

      this.listofRecordsAfected = [...this.arrayPreview];
      this.isShowUsers = true;

      this.ListofUsersIDs = [];
      this.listofRecordsAfected.forEach(singleRow => {
        this.messageCenterService.getUserByRouteRound(singleRow.round, singleRow.routeId).snapshotChanges().pipe(
          take(1),
          map((actions: any) => {
            if (actions.toString()) {
              return actions.map((a: any) => {
                const data = a.payload.doc.data() as any;
                const id = a.payload.doc.id;
                const path = a.payload.doc.ref.parent.path as any;
                const pathArray = path.split('/');
                const VuserID = pathArray[1];
                return { id, ...data, VuserID };
              });
            } else {
              return false;
            }
          }),
          tap((userF) => {
            if (userF) {
              this.userFillFinal(userF);
             
            }
          })
        ).subscribe();
      });
    } else {
      this.createMessage('warning', 'No se ha seleccionado un filtro a agregar, favor de validar.');
    }
  }
  removeRecord(index: number): void {
    this.listofRecordsAfected.splice(index, 1);
    this.listofRecordsAfected = [...this.listofRecordsAfected]; // Para que Angular detecte el cambio
  }
  getSelectedRouteName(recordId:string): string | undefined {
    const selectedRoute = this.routes.find(route => route.routeId === recordId);
    return selectedRoute ? selectedRoute.name : undefined;
  }
  
  changesOverRoutesSelected() {
    let singleItemChecked = this.checkOptionsRoute.find(res => res.value == 'Route');
    if (singleItemChecked!.checked) {
      //singleRoute
      const eachRoute = this.listOfSelectedRoutes;
      const recordArray = filter(this.routes, r => {
        return r.routeId == this.listOfSelectedRoutes;
      });
      const record = recordArray[0];
      if (record) {
        if (this.listOfRound.length > 0) {
          this.listOfRound.forEach(sRound => {
            const DuplicateAddRecord = this.listofRecordsAfected.find(duplicate => duplicate.routeId == eachRoute &&
              duplicate.customerId == record.customerId &&
              duplicate.round == sRound.idRound);
            if (!DuplicateAddRecord) {
              this.arrayPreview.push({
                customerName: record.description,
                routeId: eachRoute,
                customerId: record.customerId,
                round: sRound.idRound,
                routeName: record.name
              });
            }
          });
        } else {
          this.createMessage('warning', 'No se ha seleccionado un turno a elegir, favor de validar');
        }
      }
    } else {
      //all routes selected
      this.routes.forEach(singleRow => {
        if (this.listOfRound.length > 0) {
          this.listOfRound.forEach(sRound => {
            const DuplicateAddRecord = this.listofRecordsAfected.find(duplicate => duplicate.routeId == singleRow.routeId &&
              duplicate.customerId == singleRow.customerId &&
              duplicate.round == sRound.idRound);
            if (!DuplicateAddRecord) {
              this.arrayPreview.push({
                customerName: singleRow.description,
                routeId: singleRow.routeId,
                customerId: singleRow.customerId,
                round: sRound.idRound,
                routeName: singleRow.name
              });
            } else {
              this.createMessage('warning', 'Ya existe un registro con este criterio');
            }
          });
        } else {
          this.createMessage('warning', 'No se ha seleccionado un turno a elegir, favor de validar');
        }
      });
    }
  }

  userFillFinal(responseFill: any) {
    responseFill.forEach((element: any) => {
      // call the token and id per row
      const findUser = this.ListofUsersIDs.find(find => find.idUser == element.VuserID && find.round == element.round);
      if (!findUser) {        
        this.ListofUsersIDs.push({
          idUser: element.VuserID,
          routeId: element.routeId,
          customer_id: element.customer_id,
          round: element.round
        });
      }
    });
    // step 2 process the token and user 
    this.ListofUsersIDs.forEach(User => {

      this.customerService.getUser(User.idUser).valueChanges().subscribe(item => {
        const findUserToken = this.FinalList.find(find => find.token == item.token && find.uid == item.uid);
        if (!findUserToken) {
          this.FinalList.push({ token: item.token, uid: item.uid, email: item.email, idUser: User.idUser, displayName: User.displayName })
        }
      });
    });
  }

  ngOnDestroy() {
    this.stopSubscription$.next(false);
    this.stopSubscription$.complete();
    if (this.accountsSubscription) {
      this.accountsSubscription.unsubscribe();
    }
  }

  sendGeneralMessage() {
    if (this.isUserSelectedIndGeneral) {
      if (this.newMessageG != "") {
        this.userObjG.forEach(eachUserMessage => {

          const dataMessage = {
            createdAt: new Date(),
            from: 'FyXKSXsUbYNtAbWL7zZ66o2f1M92',
            fromName: 'Apps And Informa General',
            msg: this.newMessageG,
            requestId: 'suhB7YFAh6PYXCRuJhfD',
            token: eachUserMessage.token,
            uid: eachUserMessage.id,
            email: eachUserMessage.email,
            title: 'Apps And Informa General',
            body: this.newMessageG
          }
          const notifMessage = {
            timestamp: new Date(),
            title: 'Apps And Informa General',
            email: eachUserMessage.email,
            body: this.newMessageG,
            token: eachUserMessage.token,
            uid: eachUserMessage.id
          }
          this.dashboardService.setChatMessage(dataMessage);
          this.dashboardService.setMessage(notifMessage, eachUserMessage.id);
          //  this.dashboardService.sendToDeviceMessage(dataMessage);
        })
        this.createMessage('sucess', "El mensaje se a enviado a todos los destinatarios");
      } else {
        this.createMessage('warning', 'El campo mensaje no puede estar vacío.');
      }
    }
    else {
      if (this.newMessageG != "") {
        this.ejecutorObjG.forEach(eachUserMessage => {
          const dataMessage = {
            createdAt: new Date(),
            from: 'FyXKSXsUbYNtAbWL7zZ66o2f1M92',
            fromName: 'Apps And Informa General',
            msg: this.newMessageG,
            requestId: 'suhB7YFAh6PYXCRuJhfD',
            token: eachUserMessage.token,
            uid: eachUserMessage.id,
            email: eachUserMessage.email,
            title: 'Apps And Informa General',
            body: this.newMessageG
          }
          const notifMessage = {
            timestamp: new Date(),
            title: 'Apps And Informa General',
            email: eachUserMessage.email,
            body: this.newMessageG,
            token: eachUserMessage.token,
            uid: eachUserMessage.id
          }
          this.dashboardService.setChatMessage(dataMessage);
          this.dashboardService.setMessage(notifMessage, eachUserMessage.id);
         // this.dashboardService.sendToDeviceMessage(dataMessage);
        })
        this.createMessage('sucess', "Se a enviado el mensaje a todos los destinatarios");
        this.newMessageG = "";
      } else {
        this.createMessage('warning', 'El campo mensaje no puede estar vacío.');
      }

    }
    this.newMessageG = "";
  }

  sendIndMessage() {
    if (this.isUserSelectedInd) {
      const selectedUser = this.userObj.find(user => user.id === this.selectedUser);
      if (this.newMessageInd != "") {
        const dataMessage = {
          createdAt: new Date(),
          from: 'FyXKSXsUbYNtAbWL7zZ66o2f1M92',
          fromName: 'Apps And Informa General',
          msg: this.newMessageInd,
          requestId: 'suhB7YFAh6PYXCRuJhfD',
          token: selectedUser.token,
          uid: selectedUser.id,
          email: selectedUser.email,
          title: 'Apps And Informa General',
          body: this.newMessageInd
        }
        const notifMessage = {
          timestamp: new Date(),
          title: 'Apps And Informa General',
          email: selectedUser.email,
          body: this.newMessageInd,
          token: selectedUser.token,
          uid: selectedUser.id
        }
        this.dashboardService.setChatMessage(dataMessage);
        this.dashboardService.setMessage(notifMessage, selectedUser.id);
        this.createMessage('success', 'El mensaje fue enviado con éxito.');
        this.newMessageInd = "";
      } else {
        this.createMessage('warning', 'El campo mensaje no puede estar vacío.');
      }
    } else {
      const selectedUser = this.ejecutorObj.find(user => user.id === this.selectedEjecutor);
      if (this.newMessageInd != "") {
        const dataMessage = {
          createdAt: new Date(),
          from: 'FyXKSXsUbYNtAbWL7zZ66o2f1M92',
          fromName: 'Apps And Informa General',
          msg: this.newMessageInd,
          requestId: 'suhB7YFAh6PYXCRuJhfD',
          token: selectedUser.token,
          uid: selectedUser.id,
          email: selectedUser.email,
          title: 'Apps And Informa General',
          body: this.newMessageInd
        }
        const notifMessage = {
          timestamp: new Date(),
          title: 'Apps And Informa General',
          email: selectedUser.email,
          body: this.newMessageInd,
          token: selectedUser.token,
          uid: selectedUser.id
        }
        this.dashboardService.setChatMessage(dataMessage);
        this.dashboardService.setMessage(notifMessage, selectedUser.id);

        this.createMessage('success', 'El mensaje fue enviado con éxito.');

      } else {
        this.createMessage('warning', 'El campo mensaje no puede estar vacío.');
      }
    }
    this.newMessageInd = "";
  }

  sendSeg(){    
    if (this.isUserSelectedSeg) {
      if (this.newMessageSeg != "") {        
        this.userObj.forEach(eachUserMessage => {
          const dataMessage = {
            createdAt: new Date(),
            from: 'FyXKSXsUbYNtAbWL7zZ66o2f1M92',
            fromName: 'Apps And Informa General',
            msg: this.newMessageSeg,
            requestId: 'suhB7YFAh6PYXCRuJhfD',
            token: eachUserMessage.token,
            uid: eachUserMessage.id,
            email: eachUserMessage.email,
            title: 'Apps And Informa General',
            body: this.newMessageSeg
          }
          const notifMessage = {
            timestamp: new Date(),
            title: 'Apps And Informa General',
            email: eachUserMessage.email,
            body: this.newMessageSeg,
            token: eachUserMessage.token,
            uid: eachUserMessage.id
          }
          
          this.dashboardService.setChatMessage(dataMessage);
          this.dashboardService.setMessage(notifMessage, eachUserMessage.id);
         // this.dashboardService.sendToDeviceMessage(dataMessage);
        })
        this.createMessage('sucess', "El mensaje se a enviado a todos los destinatarios");
      } else {
        this.createMessage('warning', 'El campo mensaje no puede estar vacío.');
      }
    }
    else {
      if (this.newMessageSeg != "") {
        this.ejecutorObjG.forEach(eachUserMessage => {
          const dataMessage = {
            createdAt: new Date(),
            from: 'FyXKSXsUbYNtAbWL7zZ66o2f1M92',
            fromName: 'Apps And Informa General',
            msg: this.newMessageSeg,
            requestId: 'suhB7YFAh6PYXCRuJhfD',
            token: eachUserMessage.token,
            uid: eachUserMessage.id,
            email: eachUserMessage.email,
            title: 'Apps And Informa General',
            body: this.newMessageSeg
          }
          const notifMessage = {
            timestamp: new Date(),
            title: 'Apps And Informa General',
            email: eachUserMessage.email,
            body: this.newMessageSeg,
            token: eachUserMessage.token,
            uid: eachUserMessage.id
          }         
          this.dashboardService.setChatMessage(dataMessage);
          this.dashboardService.setMessage(notifMessage, eachUserMessage.id);
         // this.dashboardService.sendToDeviceMessage(dataMessage);
        })
        this.createMessage('sucess', "Se a enviado el mensaje a todos los destinatarios");
        this.newMessageG = "";
      } else {
        this.createMessage('warning', 'El campo mensaje no puede estar vacío.');
      }

    }
    this.newMessageG = "";
  }
  

  changesOverClient(event: any) {

    this.listOfRound = [];
    this.IdCustomerLive = event;
    this.chekOptionsRound.forEach(item => {
      item.checked = false;
    });
    if (this.listofRecordsAfected.length < 0) {
      this.isShowUsers = false;
    }
    this.listOfUsers = [];
    this.listofUsersPreview = [];
    this.isShowDivRoutes = false;
    this.updateSingleCheckedRoute();
  }

  changesOverClientGral(event: any) {
    this.IdCustomerLiveGral = event;
  }

  changesOverClientInd(event: any) {
    this.IdCustomerLiveInd = event;
  }

  userSelectedInd(event: any) {
    this.isMessageInd = true;
    this.selectedUser = event;
  }

  userEjecutorInd(event: any) {
    this.isMessageInd = true;
    this.selectedEjecutor = event;

  }

  selectedCriteriaG(event: any) {    
    
    if (event == "usuarios") {
      this.isUserSelectedIndGeneral = true;
      this.isEjecutoresSelectedIndGeneral = false;
      this.accountsSubscription = this.userService.getUserByAccount(this.IdCustomerLiveGral).subscribe((data1: any[]) => {
       
        
        data1.forEach(action => {
          const data = action.payload.doc.data();
          if (data["token"] != "") {
            let userObj = {
              active: true,
              id: data['uid'],
              label: data['firstName'] + ' ' + data['lastName'] + ' // ' + data['email'],
              phoneNumber: data['phoneNumber'],
              firstName: data['firstName'],
              lastName: data['lastName'],
              email: data['email'],
              displayName: data['displayName'],
              token: data['token']
            }
            this.userObjG.push(userObj);
          }
        });
      });
    } else { // Selecciono Ejecutores
      this.isEjecutoresSelectedIndGeneral = true;
      this.isUserSelectedIndGeneral = false;      
      this.accountsSubscription = this.driverService.getDriversByCustomer(this.IdCustomerLiveGral).subscribe((data1: any[]) => {
        data1.forEach(action => {
          const data = action.payload.doc.data();
          if (data["token"] != "") {
            let userObj = {
              active: true,
              id: data['uid'],
              label: data['firstName'] + ' ' + data['lastName'] + ' // ' + data['email'],
              phoneNumber: data['phone'],
              firstName: data['firstName'],
              lastName: data['lastName'],
              email: data['email'],
              displayName: data['displayName'],
              token: data['token']
            }
            this.ejecutorObjG.push(userObj);
          }
        });
      });
    }
  }

  selectedCriteriaSeg(event:any) {
    
  }
  selectedCriteria(event: any) {
    
    if (event == "usuarios") {
      this.isUserSelectedInd = true;
      this.isUserSelectedSeg = true;
      this.isEjecSelectedSeg = false;
      this.isShowUsers = true;
      this.isEjecutoresSelectedInd = false;       
      this.accountsSubscription = this.userService.getUserByAccount(this.listOfSelectedCustomer).subscribe((data1: any[]) => {
        data1.forEach(action => {
          const data = action.payload.doc.data();
          if (data["token"] !== "") {
            const exists = this.userObj.some(user => user.id === data['uid']);      
            if (!exists) {
              let userObj = {
                active: true,
                id: data['uid'],
                label: `${data['firstName']} ${data['lastName']} // ${data['email']}`,
                phoneNumber: data['phoneNumber'],
                firstName: data['firstName'],
                lastName: data['lastName'],
                email: data['email'],
                displayName: data['displayName'],
                token: data['token']
              };
              this.userObj.push(userObj);
            }
          }
        });
      });
    } else { // Selecciono Ejecutores
      this.isEjecutoresSelectedInd = true;
      this.isUserSelectedSeg = false;
      this.isEjecSelectedSeg = true;
      this.isUserSelectedInd = false;
      this.isShowUsers = false;
      this.accountsSubscription = this.driverService.getDriversByCustomer(this.IdCustomerLiveInd).subscribe((data1: any[]) => {        
        data1.forEach(action => {
          const data = action.payload.doc.data();
          if (data["token"] !== "") {
            const exists = this.ejecutorObj.some(user => user.id === data['uid']);            
            if (!exists) {
              let ejecutorObj = {
                active: true,
                id: data['uid'],
                label: `${data['firstName']} ${data['lastName']} // ${data['email']}`,
                phoneNumber: data['phone'],
                firstName: data['firstName'],
                lastName: data['lastName'],
                email: data['email'],
                displayName: data['displayName'],
                token: data['token']
              };
              this.ejecutorObj.push(ejecutorObj);
            }
          }
        });
      });
    }
  }
  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  Cancel() {
    this.isUserSelectedInd = false;
    this.isEjecutoresSelectedInd = false;
    this.listOfSelectedCustomer = "";
    this.isShowDivRoutes = false;
    this.isShowUsers = false;
    this.listOfUsers = [];
    this.listofUsersPreview = [];
    this.chekOptionsRound.forEach(item => {
      item.checked = false;
    });
    this.arrayPreview = [];
    this.checkOptionsRoute.forEach(item => {
      item.checked = false;
    });
    this.ListofUsersIDs = [];
    this.listOfRound = [];
    this.InputMessage = "";
    this.isMessageInd = false;
  }
}
