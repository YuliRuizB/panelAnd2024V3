import { Component, OnInit, OnDestroy, Input, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { columnDefs, rowGroupPanelShow } from '../../../../customers/classes/customers';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { map } from 'rxjs/operators';
//import { map, take, tap } from 'rxjs/operators';
//import * as firebase from 'firebase/app';
import { query, where, getDocs } from 'firebase/firestore';
import { RolService } from '../../../services/roles.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { CustomersService } from '../../../../customers/services/customers.service';
@Component({
  selector: 'app-shared-users-list',
  templateUrl: './list.component.html'
})
export class SharedUsersListComponent implements OnInit, OnDestroy {
  customersService = inject(CustomersService);
  @Input() accountId: string = '';
  @Input() accountName: string = '';
  rolService = inject(RolService);
  authService = inject(AuthenticationService);
  sub!: Subscription;
  usersList: any = [];
  columnDefs = columnDefs;
  rowGroupPanelShow = rowGroupPanelShow;
  popupParent: any;
  pageSize: number = 10;
  //Modal
  isVisible: boolean = false;
  isConfirmLoading: boolean = false;
  //Wizard
  current = 0;
  index = 'First-content';
  //Ngx CSV Parser
  csvRecords: any[] = [];
  header = true;
  isSavingUsers: boolean = false;
  isDone: boolean = false;
  gridApi: any;
  gridColumnApi: any;
  infoLoad: any = [];
  userlevelAccess!: string;
  user: any;
  accountsList: any;
  usersService = inject(CustomersService);

  constructor(
    private afs: AngularFirestore,
    private msg: NzMessageService,
    private ngxCsvParser: NgxCsvParser) {

    this.authService.user.subscribe((user) => {      
      if (user) {
        this.user = user;
      if (this.user !== null && this.user !== undefined && this.user.rolId !== undefined) {                
        this.rolService.getRol(this.user.rolId).valueChanges().subscribe(item => {
          this.infoLoad = item;
          this.userlevelAccess = this.infoLoad.optionAccessLavel;
        });
      }}
    });
    this.popupParent = document.querySelector("body");
  }

  ngOnInit() {
    this.getSubscriptions();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getSubscriptions() {
    this.sub = this.usersService.getAccountUsers(this.accountId).pipe(
      map((actions: any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      }))
    ).subscribe((users) => {
      this.usersList = users;
    });
  }

  repairUsers() {
    this.usersList.forEach((user: any) => {
      const currentUserLocation = this.afs.doc(`/users/${user.id}`);
      const expectedUserLocation = this.afs.doc(`/users/${user.uid}`);

      if (user.uid == user.id) {
      } else {
        expectedUserLocation.set(user, { merge: true }).then(() => {
          currentUserLocation.delete();
        });
      }

    });
  }

  sendMessage(type: string, message: string): void {
    this.msg.create(type, message);
  }

  deleteUsers() {
    if (this.userlevelAccess == "1") {
      this.usersList.forEach((user: any) => {
        this.usersService.deleteUser(user.id);
      });
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para borrar datos, favor de contactar al administrador.");
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  setPaginationPageSize(pageSize: number = 10) {
    this.pageSize = pageSize;
    this.gridApi.paginationSetPageSize(Number(pageSize));
  }

  getContextMenuItems(params: any) {
    var result = [
      {
        name: "Ver detalles de " + params.node.data.firstName,
        action: () => {
          let context = params.context.thisComponent;
          const notification = context.afs.collection('testFCM').doc(params.value);
          notification.set({ name: 'hola' });
        },
        icon: '<nz-avatar nzIcon="user"></nz-avatar>',
        cssClasses: ["redFont", "bold"]
      },

      "separator",
      {
        name: "Checked",
        checked: true,
        action: function () {
        },
        icon: '<img src="../images/skills/mac.png"/>'
      },
      "copy",
      "separator"
    ];
    return result;
  }

  //Modal
  showModal(): void {
    this.isVisible = true;
    this.isDone = false;
    this.isSavingUsers = false;
  }

  handleOk(): void {
    this.isSavingUsers = false;
    this.isVisible = false;
    this.csvRecords = [];
    this.current = 0;
    this.isDone = false;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.csvRecords = [];
    this.current = 0;
    this.isDone = false;
  }

  //Wizard
  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    this.isSavingUsers = true;

    if (this.userlevelAccess != "3") {
      this.csvRecords.forEach(user => {
        this.usersService.createUserWithoutApp(this.makeUserObject(user)).then((response: any) => {
          const userCreateBoardingPass = user.createBoardingPass //.toLowerCase() == 'true'          
          if (userCreateBoardingPass) {
            user.uid = response;
            this.makeBoardingPassObject(user);
          }
          user.result = 'Creado'
        }).catch(err => {
          this.sendMessage('error', err);
          user.result = err.message;
        })

      });
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
    this.isDone = true;
  }

  async makeBoardingPassObject(user: any) {
    let service: any;
    let route: any;
    let stopPoint: any;
    const servicesRef: AngularFirestoreCollection<any> = this.afs.collection('customers').doc(this.accountId).collection('products');
    const actualService = servicesRef.ref.where('name', '==', user.service);

    const routeRef = this.afs.collection('customers').doc(this.accountId).collection('routes');
    const actualRoute = routeRef.ref.where('name', '==', user.routeName);

    if (this.userlevelAccess != "3") {
      actualService.get().then(serviceQuerySnapshot => {
        const count = serviceQuerySnapshot.size;
        if (count > 0) {
          serviceQuerySnapshot.forEach(doc => {
            const id = doc.id;
            const data = doc.data() as any;
            service = { id, ...data }
          });
        } else {
          return;
        }

        actualRoute.get().then(querySnapshot => {
          const count = querySnapshot.size;
          if (count > 0) {
            querySnapshot.forEach(doc => {
              const id = doc.id;
              const data = doc.data() as any;
              route = { id, ...data }
              const stopPointRef = this.afs.collection('customers').doc(this.accountId).collection('routes').doc(route.id).collection('stops').ref;
              const actualStop = query(stopPointRef, where('order', '==', +user.stop));

              getDocs(actualStop).then((stopQuerySnapshot) => {
                const count = stopQuerySnapshot.size;

                if (count > 0) {
                  stopQuerySnapshot.forEach((doc) => {
                    const id = doc.id;
                    const data = doc.data();
                    const stopPoint = { id, ...data };
                    // Do something with stopPoint
                  });
                  let boardingPassObject = {
                    active: user.validated,
                    amount: service.price,
                    authorization: '',
                    category: service.category,
                    conciliated: false,
                    creation_date: new Date().toISOString(),
                    currency: 'MXN',
                    customer_id: this.accountId,
                    date_created: new Date().toISOString(),
                    description: service.description,
                    due_date: new Date(service.validTo.toDate()).toISOString(),
                    name: service.name,
                    price: service.price,
                    product_description: service.description,
                    product_id: service.id,
                    realValidTo: new Date((service.validTo).toDate()).toISOString(),
                    error_message: "",
                    fee: {
                      amount: 0,
                      currency: "MXN",
                      tax: 0
                    },
                    isOpenpay: false,
                    isTaskIn: true,
                    isTaskOut: true,
                    is_courtesy: false,
                    method: "cash",
                    operation_date: new Date().toISOString(),
                    operation_type: "in",
                    order_id: "",
                    paidApp: "web",
                    payment_method: {
                      barcode_url: "",
                      reference: "",
                      type: "cash"
                    },
                    round: user.round,
                    routeId: route.id,
                    routeName: route.name,
                    status: 'completed',
                    stopDescription: stopPoint.description,
                    stopId: stopPoint.id,
                    stopName: stopPoint.name,
                    transaction_type: 'charge',
                    validFrom: service.validFrom,
                    validTo: service.validTo
                  };
                  this.customersService.saveBoardingPassToUserPurchaseCollection(user.uid, boardingPassObject)
                    .then((success) => {
                      this.isVisible = false;
                      this.isConfirmLoading = false;
                    }).catch((err) => { this.isConfirmLoading = false; });
                  return;

                } else {
                  return;
                }
              });
            })
          } else {
            return;
          }

        })
      })
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
    return;

  }

  makeUserObject(user: any) {
    let userObj = {
      _isEditMode: false,
      customerId: this.accountId,
      customerName: this.accountName,
      disabled: false,
      displayName: user.firstName + ' ' + user.lastName,
      email: user.email || '',
      emailVerified: false,
      firstName: user.firstName,
      lastName: user.lastName,
      lastUpdatedAt: new Date(),
      occupation: 'user',
      paid: false,
      phone: user.phone,
      phoneNumber: user.phone,
      photoURL: '',
      roles: ['user'],
      studentId: user.employeeId,
      uid: '',
      username: user.firstName,
      userRegisteredBy: 'fromWizard'
    }
    return userObj;
  }

  handleChange(event: NzUploadChangeParam): void {
    const status = event.file.status;
    if (event.fileList.length == 0) {
      this.csvRecords = [];
    }
    if (status !== 'uploading') { }
    if (status === 'done') {
      this.msg.success(`${event.file.name} Se ha cargado con éxito.`);
      if (event.file.originFileObj) {
        this.parser(event.file.originFileObj);
      }
    } else if (status === 'error') {
      this.msg.error(`${event.file.name} no ha podido ser cargado.`);
    }
  }

  parser(file: File) {
    setTimeout(() => {
      this.ngxCsvParser.parse(file, { header: this.header, delimiter: ',' })
        .subscribe(
          (value: any[] | NgxCSVParserError) => { // Specify the union type for the value parameter
            if (value instanceof NgxCSVParserError) {
            } else {
              const result: any[] = value;
              this.csvRecords = result;
            }
          }
        );
    }, 100);
  }
  sanitizeResults(results: any) {
    let sanitizedResults = [];
    for (const result of results) {
      const createBoardingPass = result.createBoardingPass.toLowerCase() === 'true';
      const newResult = Object.assign(result);
      newResult.createBoardingPass = createBoardingPass;
      sanitizedResults.push(newResult);
    }
    this.csvRecords = sanitizedResults;
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

}