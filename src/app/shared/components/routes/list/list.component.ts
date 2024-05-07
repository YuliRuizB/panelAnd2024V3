import { Component, OnInit, OnDestroy, Input, TemplateRef, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { IRoute, IStopPoint } from '../../../interfaces/route.type';
import { RoutesService } from '../../../services/routes.service';
import { NzTabPosition, NzTabsModule  } from 'ng-zorro-antd/tabs';
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

  constructor(
    private modalService: NzModalService,
    public messageService: NzMessageService,
    private fb: UntypedFormBuilder) {

  }

  ngOnInit() {
    this.createForm();
    this.getSubscriptions();
  }

  ngOnDestroy(): void {
    this.sub!.unsubscribe();
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
      customerName: ['']
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
      customerName: ''
    });
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
            nzTitle: '¿Está la información completa?',
            nzOnOk: () => {
              this.objectForm.get('customerId')!.setValue(this.accountId);
             // console.log(this.objectForm.value)
             // console.log(this.objectForm.valid)
              if (this.objectForm.valid) {
               // console.log(this.objectForm.value);
                this.routesService.setRoute(this.accountId, this.objectForm.value)
                  .then(() => {
                    this.modalService.closeAll();
                  }).catch((err: any) => console.log(err));
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
   // console.log(this.accountId);
    this.sub = this.routesService.getRoutes(this.accountId).pipe(
      map((actions:any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as IRoute;
        const route = { ...data, id }; // Spread data and add id
        return route;
      }))
    ).subscribe((routes: IRoute[]) => {
      this.routesList = routes;
     // console.log(this.routesList);
      routes.forEach( (route) => {
        this.tabs.push({
          name: route.name,
          content: `Content of tab ${route.name}`
        });
      })
    });
  }

}
