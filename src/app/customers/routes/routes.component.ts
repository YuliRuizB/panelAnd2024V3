import { Component, OnInit, TemplateRef, OnDestroy, inject } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, map, tap, take } from 'rxjs/operators';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { RolService } from '../../shared/services/roles.service';
import { AccountsService } from '../../shared/services/accounts.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { RoutesService } from '../../shared/services/routes.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CustomersService } from '../services/customers.service';
import { stdin } from 'node:process';

export interface IRoute {
  id: string;
  active: boolean;
  description: string;
  imageUrl: string;
  kmlUrl: string;
  name: string;
  customerName: string;
  customerId: string;
  routeId?: string;
  initialStart?: string;
  initialEnd?: string;
  duplicateCustomerId?: string;
  vendorId?: string;
}

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponents implements OnInit, OnDestroy {
  routesService = inject(RoutesService);
  authService = inject(AuthenticationService);
  accountsService = inject(AccountsService);
  rolService = inject(RolService);
  view: string = 'listView';
  isVisible: boolean = false;
  isOkLoading: boolean = false;
  user: any;
  stopSubscription$: Subject<boolean> = new Subject();
  routesList: any = [];
  routesListLoaded: any = [];
  accountsList: any = [];
  objectForm!: UntypedFormGroup;
  objectFormDuplicate!: UntypedFormGroup;

  confirmModal!: NzModalRef;
  duplicateVisible: boolean = false;
  duplicateCustomerId: string = '';
  isDuplicateLoading: boolean = false;
  selectedData: any = {};
  newCustomerName: any;
  infoLoad: any = [];
  userlevelAccess: string | undefined;
  infoSegment: any = []
  customersService = inject(CustomersService);
  timeOptions: string[] = [];
  routesListSingle: any[] = [];
  routesSubscription!: Subscription;

  ; constructor(
    private afs: AngularFirestore,
    private modalService: NzModalService,
    private messageService: NzMessageService,
    private fb: UntypedFormBuilder,
    private modal: NzModalModule
  ) {
    this.authService.user.subscribe(user => {      
      if (user) { // Ensure user is not null or undefined
        this.user = user;    
        // Load segment level if idSegment exists
        if (this.user.idSegment) {
          this.accountsService.getSegmentLevel(this.user.idSegment).pipe(
            takeUntil(this.stopSubscription$),
            map((a: any) => {
              const id = a.payload.id;
              const data = a.payload.data() as any;
              return { id, ...data };
            }),
            tap(record => {
              this.infoSegment = record;
              this.getSubscriptions();
            })
          ).subscribe();
        }
    
        // Load role information if rolId exists
        if (this.user.rolId) {
          this.rolService.getRol(this.user.rolId).valueChanges().subscribe(item => {
            this.infoLoad = item;
            this.userlevelAccess = this.infoLoad.optionAccessLavel;
          });
        }
      } else {
        console.warn("Usuario no autenticado o datos aún no disponibles.");
      }
    });
  }

  ngOnInit() {

    this.objectForm = this.fb.group({
      active: [false, [Validators.required]],
      description: ['', [Validators.required]],
      imageUrl: [''],
      kmzUrl: [''],
      name: ['', [Validators.minLength(5), Validators.maxLength(20), Validators.required]],
      routeId: [''],
      customerId: ['', [Validators.required]],
      customerName: ['', [Validators.required]],
      initialStart: [],
      initialEnd: []
    });
    this.objectFormDuplicate = this.fb.group({
      active: [false, [Validators.required]],
      description: ['', [Validators.required]],
      imageUrl: [''],
      kmzUrl: [''],
      name: ['', [Validators.minLength(5), Validators.maxLength(20), Validators.required]],
      routeId: [''],
      customerId: ['', [Validators.required]],
      customerName: [''],
      initialStart: [],
      initialEnd: [],
      duplicateCustomerId: [],
      newCustomerId: [],
      newCustomerName: []
    });

    this.generateTimeOptions();
  }


  generateTimeOptions(): void {
    const startTime = 7; // 07:00 AM
    const endTime = 21; // 09:00 PM

    for (let i = startTime; i <= endTime; i++) {
      const hour = i % 12 || 12; // Convert 0 to 12
      const suffix = i < 12 ? 'AM' : 'PM';
      const timeStr = `${hour.toString().padStart(2, '0')}:${i % 60 === 30 ? '30' : '00'} ${suffix}`;
      this.timeOptions.push(timeStr);
    }
  }


  ngOnDestroy() {
    this.stopSubscription$.next(false);
    this.stopSubscription$.complete();
    if (this.routesSubscription) {
      this.routesSubscription.unsubscribe();
    }
  }

  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
  }

  getSubscriptions() {
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual    
      this.routesService.getAllCustomersRoutesbyCustomer(this.user.customerId).pipe(
        takeUntil(this.stopSubscription$),
        map((actions: any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe((routes: any) => {
        this.routesList = routes;
        this.routesListLoaded = routes;
      });
      this.accountsService.getAccountsByCustomer(this.user.customerId).pipe(
        takeUntil(this.stopSubscription$),
        map((a: any) => {
          const id = a.payload.id;
          const data = a.payload.data() as any;
          return { id, ...data }
        }),
      ).subscribe((accounts) => {
        this.accountsList = [accounts];
      });
    } else {
      this.routesService.getAllCustomersRoutes().pipe(
        takeUntil(this.stopSubscription$),
      ).subscribe((routes: any[]) => {
        this.routesList = routes;
        this.routesListLoaded = routes;
      });
      this.accountsService.getAccounts().pipe(
        takeUntil(this.stopSubscription$),
        map((actions: any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe((accounts) => {
        this.accountsList = accounts;
      });
    }
  }

  setCustomerName(event: any) {
    const recordArray = _.filter(this.accountsList, r => {
      return r.id == event;
    });
    const record = recordArray[0];
    this.objectForm.controls['customerName'].setValue(record.name);
  }

  toggleActive(data: any) {    
    if (data.active === false) {
      this.routesSubscription = this.routesService.getCustomersPolyLineCustomer(data.customerId, data.routeId).pipe(      
        take(1),
        map((actions: any) => 
          actions.length > 0 
            ? actions.map((a: any) => {
                const id = a.payload.doc.id;
                return { id };
              })
            : [{ id: "-" }] 
        )
      ).subscribe({
          next: (polyline: any) => {
           this.routesService.getCustomersRoutesbyCustomer(data.customerId, data.routeId).pipe(            
            map((actions: any) => actions.map((a: any) => {
                const id = a.payload.doc.id;
                const data = a.payload.doc.data() as any;
                return { id, ...data };
              }))
            ).subscribe({
              next: (stopPoints: any) => {
                const coordinatesArray = stopPoints.map((stopPoint: any) => {
                  return {
                    latitude: parseFloat(stopPoint.latitude),
                    longitude: parseFloat(stopPoint.longitude)
                  };
                });
                this.routesService.getDirectionsWithStops(coordinatesArray).subscribe({
                  next: async (response: any) => {  
                    this.routesService.setPolyline(response, data.customerId, data.routeId,polyline[0].id).then(() => {
                    }).catch((error: any) => {
                      this.sendMessage("error", error);
                    }); 
                  },
                  error: (e: any) => {
                    console.error(e);
                  },
                }); 
              },
              error: (err: any) => {
                this.sendMessage("error", err);
              }
            }); 
          },
          error: (err: any) => {
            this.sendMessage("error", err);
          }
        });
    }
    this.routesService.toggleActiveRoute(data.customerId, data.routeId, data).then(() => {

      this.routesService.toggleActiveRouteVendor(data.customerId, data.routeId, data).then(() => {
        this.sendMessage('sucess', "La ruta se modificó con éxito.");
      });
    })
      .catch(err => this.sendMessage('error', err))
  }

  deleteRoute(data: { customerId: string; routeId: string; }) {
    if (this.userlevelAccess == "1") {
      this.routesService.deleteRoute(data.customerId, data.routeId).then(() => {
      })
        .catch(err => this.sendMessage('error', err));
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para borrar datos, favor de contactar al administrador.");
    }
  }

  duplicate(data: any) {
    this.duplicateVisible = true;
    this.objectFormDuplicate.patchValue({ ...data });
    this.selectedData = data;
    this.isDuplicateLoading = false;
  }

  onCustomerChange(event: any) {
    if (event) {
      const recordArray = _.filter(this.accountsList, s => {
        return s.id == event;
      });
      const record = recordArray[0];
      this.selectedData.newCustomerName = record.name;
      this.newCustomerName = record.name;
      this.objectFormDuplicate.controls['newCustomerName'].setValue(record.name);
    }
  }

  createDuplicated() {
    this.selectedData.newCustomerId = this.duplicateCustomerId;
    this.isDuplicateLoading = true;
    if (this.userlevelAccess != "3") {
      this.routesService.duplicateRouteWithStops(this.objectFormDuplicate.value).then(() => {
        this.isDuplicateLoading = false;
        this.duplicateVisible = false;
      });
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
  }

  handleCancel() {
    this.duplicateVisible = false;
    this.isDuplicateLoading = false;
  }

  addNewRoute(newProjectContent: TemplateRef<{}>) {
    var advanceForm: object;
    const modal = this.modalService.create({
      nzTitle: 'Nueva Operación',
      nzContent: newProjectContent,
      nzFooter: [
        {
          label: 'Crear Operación',
          type: 'primary',
          onClick: () => this.modalService.confirm({
            nzTitle: 'Está la información completa?',
            nzOnOk: () => {
              if (this.objectForm.valid) {
                const formValue = this.objectForm.value;
                const initialStart = formValue.initialStart.map((time: any) => ({
                  value: time
                }));

                const initialEnd = formValue.initialEnd.map((time: any) => ({
                  value: time
                }));
                if (this.userlevelAccess != "3") {
                  const key = this.afs.createId();
                  const routeObj = this.routesService.setRoute2(key, this.objectForm.controls['customerId'].value, this.objectForm.value)
                    .then(() => {
                    }).catch((err: any) => this.sendMessage('error', err));
                  this.routesService.getInternalCustomer(this.objectForm.controls['customerId'].value).pipe(
                    takeUntil(this.stopSubscription$),
                    map((actions: any) => actions.map((a: any) => {
                      const id = a.payload.doc.id;
                      const data = a.payload.doc.data() as any;
                      return { ...data, id };
                    })))
                    .subscribe((user: any) => {
                      const name = this.objectForm.controls['name'].value;
                      const currentDate = new Date();
                      const validTo = new Date(currentDate.getFullYear() + 3, currentDate.getMonth(), currentDate.getDate());
                      const validToString = validTo.toISOString();
                      var fileinfoURL = "";
                      const send = {
                        authorization: "portalAuth",
                        operation_type: "in",
                        method: "Liquidacion",
                        transaction_type: "charge",
                        card:
                        {
                          type: '',
                          brand: '',
                          address: '',
                          card_number: '',
                          holder_name: '',
                          expiration_year: '',
                          expiration_month: '',
                          allows_charges: '',
                          allows_payouts: '',
                          bank_name: '',
                          bank_code: '',
                          points_card: '',
                          points_type: '',
                        },
                        status: "completed",
                        conciliated: false,
                        creation_date: new Date().toISOString(),
                        operation_date: new Date().toISOString(),
                        description: "Pago a traves de portal",
                        error_message: "",
                        order_id: "portalOrder",
                        currency: "MXN",
                        amount: 0,
                        customer:
                        {
                          name: "",
                          last_name: "",
                          email: "",
                          phone_number: "",
                          address: "",
                          creation_date: "",
                          external_id: "",
                          clabe: ""
                        },
                        customerId: this.objectForm.controls['customerId'].value,
                        active: true,
                        category: "permanente",
                        date_created: new Date().toISOString(),
                        product_description: "Pago a traves de portal proceso interno al crear una ruta",
                        product_id: "",
                        name: "Internal",
                        isTaskIn: 'false',
                        isTaskOut: 'false',
                        type: "Servicio",
                        isOpenpay: false,
                        paidApp: 'portal',
                        price: 0,
                        round: '',
                        routeId: key,
                        routeName: name,
                        stopDescription: '',
                        stopId: "",
                        stopName: "Internal",
                        validFrom: new Date().toISOString(),
                        validTo: validToString,
                        idBoardingPass: user[0].id,
                        idPurchasteRequest: '',
                        is_courtesy: false,
                        typePayment: "Liquidacion"
                      }
                      advanceForm = {
                        active: true,
                        amountPayment: 0,
                        payment: "Liquidacion",
                        status: "completed",
                        customer_id: this.objectForm.controls['customerId'].value,
                        customerId: this.objectForm.controls['customerId'].value,
                        creation_date: new Date().toISOString(),
                        name: "internal",
                        price: 0,
                        operation_date: new Date().toISOString(),
                        routeId: key,
                        routeName: name,
                        round: '',
                        stopName: "internal",
                        stopId: "",
                        typePayment: "Liquidacion",
                        validFrom: new Date().toISOString(),
                        validTo: validToString,
                        idBoardingPass: user[0].uid,
                        idPurchaseRequest: '',
                        baja: false,
                        type: "Servicio",
                        fileURL: fileinfoURL
                      };
                      this.customersService.saveBoardingPassToUserPurchaseCollection(user[0].id, send)
                        .then((success) => {
                          this.customersService.saveBoardingPassDetailToUserPurchaseCollection(user[0].id, key, send)
                            .then((success) => {
                              const userSend: object = user[0];
                              this.customersService.createPurchaseCloud(send, userSend, user[0].id);
                            }).catch((err) => { this.sendMessage('error', err); });

                        }).catch((err) => { this.sendMessage('error', err); });

                      this.modalService.closeAll();
                    });
                } else {
                  this.sendMessage('error', "El usuario no tiene permisos para agregar datos, favor de contactar al administrador.");
                }

              }
            }
          }
          )
        },
      ],
      nzWidth: 500
    })
  }

  getItems(searchbar: any) {
    const q = searchbar;
    if (!q) {
      this.routesList = this.routesListLoaded.slice();
      return;
    }
    const text = q.toLowerCase();
    this.routesList = this.routesListLoaded.filter((object: any) => {
      return Object.values(object).some((value: any) => {
        return String(value).toLowerCase().includes(text);
      });
    });
  }
}
