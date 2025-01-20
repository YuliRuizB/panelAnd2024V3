import { Component, OnInit, OnDestroy, Input, TemplateRef, inject } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { map, take, takeUntil } from 'rxjs/operators';
import { IRoute, IStopPoint } from '../../../interfaces/route.type';
import { RoutesService } from '../../../services/routes.service';
import { NzTabPosition, NzTabsModule  } from 'ng-zorro-antd/tabs';
import { CustomersService } from '../../../../customers/services/customers.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ConsoleSqlOutline } from '@ant-design/icons-angular/icons';
import { log } from 'console';
@Component({
  selector: 'app-shared-routes-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class SharedRoutesListComponent implements OnInit, OnDestroy {

  @Input() accountId: string = '';
  routesService = inject(RoutesService);
  sub?: Subscription;
  tabs: Array<{ name: string; content: string }> = [];
  nzTabPosition: NzTabPosition = 'top'; 
  selectedIndex = 0;
  routesList: IRoute[] = [];
  stopPointsList: IStopPoint[] = [];
  objectForm!: UntypedFormGroup;
  stopSubscription$: Subject<any> = new Subject();
  customersService= inject(CustomersService);
  timeOptions: string[] = [];
  
  constructor(
    private afs: AngularFirestore,
    private modalService: NzModalService,
    public messageService: NzMessageService,
    private fb: UntypedFormBuilder) {
  }

  ngOnInit() {
    this.createForm();
    this.getSubscriptions();
    this.generateTimeOptions();
  }

  ngOnDestroy(): void {
    this.sub!.unsubscribe();
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

  createForm() {
    this.objectForm = this.fb.group({
      active: [false, [Validators.required]],
      description: ['', [Validators.required]],
      imageUrl: [''],
      kmzUrl: [''],
      name: ['', [Validators.minLength(5), Validators.maxLength(20), Validators.required]],
      routeId: [''],
      customerId: ['', [Validators.required]],
      customerName: [''],
      initialStart: [[]], // Initialize as an empty array
      initialEnd: [[]] //    
    });
  }

  resetForm() {
    this.objectForm.reset({
      active: false,
      description: '',
      imageUrl: '',
      kmzUrl: '',
      name: '',
      routeId: '',
      customerId: '',
      customerName: '',
      initialStart: [] ,
      initialEnd:[] 
    });
  }

  addNewRoute(newProjectContent: TemplateRef<{}>) {
    var advanceForm: object;
    var purchaseRequest: object;
    const modal = this.modalService.create({
      nzTitle: 'Nueva Operación',
      nzContent: newProjectContent,
      nzFooter: [
        {
          label: 'Crear Operación ',
          type: 'primary',
          onClick: () => this.modalService.confirm({
            nzTitle: '¿Está la información completa?',
            nzOnOk: () => {
              this.objectForm.get('customerId')!.setValue(this.accountId);             
              if (this.objectForm.valid) {

                const formValue = this.objectForm.value;             
                const initialStart = formValue.initialStart && formValue.initialStart.length > 0 
                ? formValue.initialStart.map((time: any) => ({                 
                    value: time
                  }))
                : null; 
                const initialEnd = formValue.initialEnd && formValue.initialEnd.length > 0 
                ? formValue.initialEnd.map((time: any) => ({                 
                    value: time 
                  }))
                : [];

                const formData = {
                  ...formValue,
                  ...(initialStart ? { initialStart } : {}) 
                };

               const key = this.afs.createId();
               const routeObj = this.routesService.setRoute2(key, this.accountId, this.objectForm.value)
                  .then(() => {                 
                  }).catch((err: any) => this.sendMessage('error',err));
                  this.routesService.getInternalCustomer(this.accountId).pipe(
                    takeUntil(this.stopSubscription$),
                    map((actions:any) => actions.map((a: any) => {
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
                      status:  "completed",
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
                        name:"",
                        last_name: "",
                        email: "",
                        phone_number: "",
                        address: "",
                        creation_date: "",
                        external_id: "",
                        clabe: ""
                      },
                      product:{
                        product_id: "",           
                          amountTrips: 0,
                          frequencies: 0,
                          rangeWeeks: {},
                          weeks:0,
                          name: ""
                      },
                      customerId: this.accountId ,
                      active: true,
                      category: "permanente",
                      date_created: new Date().toISOString(),
                      product_description: "Pago a traves de portal proceso interno al crear una ruta",
                      product_id: "",
                      name: name ,
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
                        payment:  "Liquidacion",
                        status: "completed",
                        customer_id:  this.accountId,
                        customerId:  this.accountId,
                        creation_date:  new Date().toISOString(),
                        name: "internal",
                        price: 0,
                        operation_date:  new Date().toISOString(),
                        routeId: key,
                        routeName: name,
                        round: '',
                        stopName: "internal",
                        stopId: "",
                        typePayment:  "Liquidacion",
                        validFrom:  new Date().toISOString(),
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
                            this.customersService.createPurchaseCloud(send,userSend,user[0].id);                           
                          }).catch((err) => { this.sendMessage('error',err) });
                           
                      }).catch((err) => { this.sendMessage('error',err)});         

                      this.modalService.closeAll();    
                    });                 
              }
            }
          }
          )
        },
      ],
      nzWidth: 500
    })
  }

  getSubscriptions() {
    this.sub = this.routesService.getRoutes(this.accountId).pipe(
      map((actions:any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as IRoute;
        const route = { ...data, id }; // Spread data and add id
        return route;
      }))
    ).subscribe((routes: IRoute[]) => {
      this.routesList = routes;
      routes.forEach( (route) => {
        this.tabs.push({
          name: route.name,
          content: `Content of tab ${route.name}`
        });
      })
    });
  }

  getTabTitle(tab:any): string {
    return `${tab.name}`;   
  }

  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
}
}


