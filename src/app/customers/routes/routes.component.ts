import { Component, OnInit, TemplateRef, OnDestroy, inject } from '@angular/core';
import {  NzModalRef } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { RolService } from '../../shared/services/roles.service';
import { AccountsService } from '../../shared/services/accounts.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { RoutesService } from '../../shared/services/routes.service';

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
  accountsList: any = [];
  objectForm!: UntypedFormGroup;

  confirmModal!: NzModalRef;
  duplicateVisible: boolean = false;
  duplicateCustomerId: string = '';
  isDuplicateLoading: boolean = false;
  selectedData: any = {};
  newCustomerName: any;
  infoLoad: any = [];
  userlevelAccess:string | undefined;
  infoSegment: any = []
;  constructor(
    private modalService: NzModalService,    
    private messageService: NzMessageService,
    private fb: UntypedFormBuilder,
    private modal: NzModalModule
  ) {
    this.authService.user.subscribe(user => {   
      this.user = user;
     // console.log(this.user); /idSegment
        if (this.user !== null && this.user !== undefined && this.user.idSegment !== undefined) { 
          
          this.accountsService.getSegmentLevel(this.user.idSegment).pipe(
            takeUntil(this.stopSubscription$),
            map((a:any) => {
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

   }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.getSubscriptions();
      this.user = user;
     // console.log(this.user); //idSegment
      if (this.user !== null && this.user !== undefined && this.user.rolId !== undefined) {           
        this.rolService.getRol(this.user.rolId).valueChanges().subscribe(item => {
            this.infoLoad = item;
            this.userlevelAccess = this.infoLoad.optionAccessLavel;                 
        });
    }
    });
    this.objectForm = this.fb.group({
      active: [false, [Validators.required]],
      description: ['', [Validators.required]],
      imageUrl: [''],
      kmzUrl: [''],
      name: ['', [Validators.minLength(5), Validators.maxLength(20), Validators.required]],
      routeId: [''],
      customerId: ['', [Validators.required]],
      customerName: ['', [Validators.required]]
    });
  }

  ngOnDestroy() {
    this.stopSubscription$.next(false);
    this.stopSubscription$.complete();
  }

  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
}

  getSubscriptions() {
    

    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual

      this.routesService.getAllCustomersRoutesbyCustomer(this.user.customerId).pipe(
        takeUntil(this.stopSubscription$),
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe((routes: any) => {     
        this.routesList = routes;     
      });
      this.accountsService.getAccountsByCustomer(this.user.customerId).pipe(
        takeUntil(this.stopSubscription$),
        map((a:any) => {
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
      ).subscribe((routes: IRoute[]) => {     
        this.routesList = routes;     
      });
      this.accountsService.getAccounts().pipe(
        takeUntil(this.stopSubscription$),
        map((actions:any) => actions.map((a:any) => {
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

  toggleActive(data: { customerId: string; routeId: string; }) {
    
    this.routesService.toggleActiveRoute(data.customerId, data.routeId, data).then(() => {
    
    })
      .catch(err => console.log(err));
  }

  deleteRoute(data: { customerId: string; routeId: string; }) {
    if (this.userlevelAccess == "1") {
      this.routesService.deleteRoute(data.customerId, data.routeId).then(() => {
        console.log('done');
      })
        .catch(err => console.log(err));
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para borrar datos, favor de contactar al administrador.");
    }   
  }

  duplicate(data: any) {
    this.duplicateVisible = true;
    this.selectedData = data;
    this.isDuplicateLoading = false;
  }

  onCustomerChange(event: any) {
    if(event) {
      const recordArray = _.filter(this.accountsList, s => {
        return s.id == event;
      });
      const record = recordArray[0];
      //.log(record);
      this.selectedData.newCustomerName = record.name;
      this.newCustomerName = record.name;
    }
  }

  createDuplicated() {
    this.selectedData.newCustomerId = this.duplicateCustomerId;
    //console.log(this.selectedData);
    this.isDuplicateLoading = true;
    if (this.userlevelAccess != "3") {
      this.routesService.duplicateRouteWithStops(this.selectedData).then( () => {
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
    const modal = this.modalService.create({
      nzTitle: 'Nueva Ruta',
      nzContent: newProjectContent,
      nzFooter: [
        {
          label: 'Crear Ruta',
          type: 'primary',
          onClick: () => this.modalService.confirm({
            nzTitle: 'Está la información completa?',
            nzOnOk: () => {
             // console.log(this.objectForm.value);
             // console.log(this.objectForm.valid);
              if (this.objectForm.valid) {
               // console.log(this.objectForm.value);
                if (this.userlevelAccess != "3") {
                  this.routesService.setRoute(this.objectForm.controls['customerId'].value, this.objectForm.value)
                  .then(() => {
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

}
