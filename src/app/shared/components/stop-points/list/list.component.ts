import { Component, OnInit, Input, OnDestroy, inject, ViewChild, ElementRef } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { IStopPoint } from '../../../interfaces/route.type';
import { map, takeUntil, tap } from 'rxjs/operators';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedStopPointsNewComponent } from '../new/new.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { SharedStopPointsEditComponent } from '../edit/edit.component';
import { RolService } from '../../../services/roles.service';
import { UsersService } from '../../../services/users.service';
import { AuthenticationService } from '../../../services/authentication.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { RoutesService } from '../../../services/routes.service';

@Component({
  selector: 'app-shared-stoppoints-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class SharedStopPointsListComponent implements OnInit, OnDestroy {
  @ViewChild('download', { static: false }) download!: ElementRef;  
  @Input() accountId: string = '';
  @Input() routeId: string = '';
  rolService = inject(RolService);
  routesService = inject(RoutesService);
  userService= inject(UsersService);
  authService = inject(AuthenticationService);
  sub!: Subscription;
  stopPointsList: IStopPoint[] = [];
  loading = true;
  time = new Date();
  isEditing = false;
  item: any ; //route record
  infoLoad: any = [];
  userlevelAccess!: string;
  user: any;
  isPdfVisible:boolean = false;
  pdfTitle:string = "";
  pdfOrder:string = "";
  pdfDescription:string= "";
  stopId:string = "";
  userId:string = "";
  accountsSubscription?: Subscription;
  stopSubscriptions$: Subject<boolean> = new Subject();
  usersCollection: AngularFirestoreCollection<any> | undefined;
  userSubscription: Subscription | undefined;

  constructor(
    public modalService: NzModalService,
    public message: NzMessageService,      
    private afs: AngularFirestore
  ) {
    this.authService.user.subscribe((user) => {
      this.user = user;
      if (this.user !== null && this.user !== undefined && this.user.rolId !== undefined) {          
        this.rolService.getRol(this.user.rolId).valueChanges().subscribe(item => {
          this.infoLoad = item;
          this.userlevelAccess = this.infoLoad.optionAccessLavel;
        });
      }
    });

  }

  ngOnInit() {
    this.getSubscriptions();

    this.usersCollection = this.afs.collection<any>('users', ref => 
      ref.where('customerId', '==', this.accountId)
     .where('email','==', 'internal').orderBy('customerName')
    );    
    this.userSubscription = this.usersCollection.snapshotChanges().pipe(
      map((actions:any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      }))
    ).subscribe(users => {             
      this.userId = users[0]['uid'];
    }); 

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.stopSubscriptions$.next(false);
    this.stopSubscriptions$.complete();
    if (this.accountsSubscription) {
      this.accountsSubscription.unsubscribe();
    }
  }

  timePickerChange() {
   //console.log(event);
  }

  handleCancel() {
     this.isPdfVisible = false;
  }

  handleOkPDF() {
    // imprimir aqui
    //console.log("Imprimir");
    try {

      var doc = new jsPDF();
      html2canvas(document.getElementById("documentoPDF")!).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'pt', 'a4');
        var width = pdf.internal.pageSize.getWidth();
        var height = canvas.height * width / canvas.width;
        pdf.addImage(contentDataURL, 'PNG', 10, 10, width, height);
        const nameSave =  this.pdfOrder + "-" + this.pdfTitle + ".pdf";        
        pdf.save(nameSave);
      });
      this.isPdfVisible = false; // Close the modal
    }
    catch (e) {
      console.error(e);
    }
  
  }

  toggleActive(data: any) {
    // this.routesService.toggleActiveRoute(this.accountId, this.routeId, data)
    this.routesService.toggleActiveStopPoint(this.accountId, this.routeId, data);
  }

  openPanelPDF(data: any) {
    this.isPdfVisible = true;   
    this.pdfTitle = data.name;
    this.pdfOrder =data.order;
    this.pdfDescription = data.description;
    this.stopId = data.id;
    //GetInfoData.
 

  }
  sendMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  deleteRoute(data: any) {
    if (this.userlevelAccess == "1") {
      this.routesService.deleteRoute(data.customerId, data.routeId).then(() => {
        console.log('done');
      })
        .catch(err => console.log(err));
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para borrar datos, favor de contactar al administrador.");
    }

  }

  getSubscriptions() {
    this.sub = this.routesService.getRouteStopPoints(this.accountId, this.routeId).pipe(
      map((actions:any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as IStopPoint;
        const route = { ...data, id }; // Spread data and add id
        return route;
      }))
    ).subscribe((stopPoints: IStopPoint[]) => {
      this.stopPointsList = stopPoints;
      this.loading = false;
    })

    this.routesService.getRoute(this.accountId, this.routeId).pipe(
      takeUntil(this.stopSubscriptions$),
      map((a:any) => {
        const id = a.payload.id;
        const data = a.payload.data() as IStopPoint;
        const route = { ...data, id }; // Spread data and add id
        return route;
      }),
      tap(route => {
        this.item = route;
       // console.log(this.item);
        return route;
      })
    ).subscribe();
  }

  showModalEdit(data: any) {
    let modal = this.modalService.create({
      nzTitle: 'Editar ' + data.description,
      nzContent: SharedStopPointsEditComponent,
     /*  nzComponentParams: {
        stopPoint: data TODO
      }, */
      nzOkText: 'Guardar',
      nzCancelText: 'Cancelar',
      nzOkLoading: this.isEditing,
      nzOnOk: () => new Promise(async (resolve) => {
        this.isEditing = true;
        const updated = modal.getContentComponent().validateForm.value;
        updated.id = data.id;
        await this.routesService.updateStopPoint(this.accountId, this.routeId, updated).then(() => {
          resolve;
          this.isEditing = false;
          modal.destroy();
          this.message.success('¡Listo!');
        }).catch(err => {
          this.isEditing = false;
          this.message.error('Ocurrió un error: ', err);
          resolve;
        })
      }),
      nzOnCancel: () => console.log('cancel')
    });

    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));

  }

  showModalCreate() {
    let modal = this.modalService.create({
      nzTitle: 'Nueva Estación',
      nzContent: SharedStopPointsNewComponent,
     /*  nzComponentParams: {
         stopPoint: {}
      },*/
      nzOkText: 'Crear',
      nzCancelText: 'Cancelar',
      nzOkLoading: this.isEditing,
      nzOnOk: () => new Promise(async (resolve) => {
        this.isEditing = true;
        const record = modal.getContentComponent().validateForm.value;
        record.id = this.afs.createId();
      //  console.log(record);
        await this.routesService.createStopPoint(this.accountId, this.routeId, record).then(() => {
          resolve;
          this.isEditing = false;
          modal.destroy();
          this.message.success('¡Listo!');
        }).catch(err => {
          this.isEditing = false;
          this.message.error('Ocurrió un error: ', err);
          resolve;
        })
      }),
      nzOnCancel: () => console.log('cancel')
    });

    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));

  }

  onEditOk() {

  }

  downloadImg(): void {
    const canvas = document.getElementById('download')?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
      this.download.nativeElement.href = canvas.toDataURL('image/png');
      this.download.nativeElement.download = 'ng-zorro-antd';
      const event = new MouseEvent('click');
      this.download.nativeElement.dispatchEvent(event);
    }
  }

}
