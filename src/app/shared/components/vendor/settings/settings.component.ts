import { Component, OnInit, OnDestroy, Input, inject } from '@angular/core';
import { Subject, Subscription, pipe } from 'rxjs';
import { IRoute } from '../../../interfaces/route.type';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map, takeUntil, tap } from 'rxjs/operators';
import { RoutesService } from '../../../services/routes.service';
import { RolService } from '../../../services/roles.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { AccountsService } from '../../../services/accounts.service';

@Component({
  selector: 'app-shared-vendor-settings',
  templateUrl: './settings.component.html'

})
export class SharedVendorSettingsComponent implements OnInit, OnDestroy {

  @Input() vendorId: string = '';
  @Input() userCanUpdate: boolean = false;
  rolService = inject(RolService);
  routesService = inject(RoutesService);
  authService = inject(AuthenticationService);
  allRoutesSubscription!: Subscription;
  allRoutesList: any[] = [];
  vendorRoutesSubscription!: Subscription;
  vendorRoutesList: any[] = [];
  permissionsSubscription!: Subscription;
  permissionsList: any = [];
  loading = true;
  time = new Date();
  isModalVisible: boolean = false;
  isConfirmLoading: boolean = false;
  selectedRoute: any = null;
  infoLoad: any = [];
  userlevelAccess!: string;
  user: any;
  accountsService = inject(AccountsService);
  infoSegment: any = [];
  stopSubscription$: Subject<boolean> = new Subject();

  constructor(
    public modalService: NzModalService,
    public message: NzMessageService
  ) {
    this.authService.user.subscribe((user) => {
      this.user = user;
      if (this.user !== null && this.user !== undefined && this.user.rolId !== undefined) {
        this.rolService.getRol(this.user.rolId).valueChanges().subscribe(item => {
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
  }
  sendMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  ngOnInit() {
    this.getSubscriptions();
  }

  ngOnDestroy() {
    if (this.allRoutesSubscription) {
      this.allRoutesSubscription.unsubscribe();
    }
    if (this.vendorRoutesSubscription) {
      this.vendorRoutesSubscription.unsubscribe();
    }
    if (this.permissionsSubscription) {
      this.permissionsSubscription.unsubscribe();
    }
  }

  toggleActive(data: any) {
    if (this.vendorId != '') {
      this.routesService.toggleActiveVendorRouteAccess(this.vendorId, data.permissionId, data);
    }
  }

  deletePermission(data: any) {
    if (this.userlevelAccess == "1") {
      if (this.vendorId != '') {
        this.routesService.deleteVendorRouteAccess(this.vendorId, data.permissionId);
      }
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para borrar datos, favor de contactar al administrador.");
    }
  }

  getSubscriptions() {
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { // Individual
      this.allRoutesSubscription = this.routesService.getAllCustomersRoutesbyCustomer(this.user.customerId).subscribe({
        next: (routes: any[]) => {
          this.allRoutesList = routes;
        },
        error: (err) => {          
          this.sendMessage('error',err);
          this.loading = false;
        },
      });
    } else {
      this.allRoutesSubscription = this.routesService.getRoutesByCustomer().subscribe({
        next: (routes: any[]) => {
          this.allRoutesList = routes;
        },
        error: (err) => {
          this.sendMessage('error',err);
          this.loading = false;
        },
      });
    }
    if (this.vendorId != '') {
      this.vendorRoutesSubscription = this.routesService.getAuthorizedRoutes(this.vendorId).subscribe({
        next: (routes: any) => {
          this.vendorRoutesList = !!routes && routes.length > 0 ? routes : [];
          this.userCanUpdate = true;
        },
        error: (err) => {
          this.vendorRoutesList = [];
          this.loading = false;
        },
      });
    } else {
      this.vendorRoutesList = [];
      this.loading = false;
    }
  }

  showModal(): void {
    this.isModalVisible = true;
  }

  handleOk(): void {
    if (this.selectedRoute) {
      const dataArray = this.selectedRoute.split(',');
      const customerId = dataArray[0];
      const customerName = dataArray[1];
      const routeId = dataArray[2];
      const routeName = dataArray[3];
      const routePath = `customers/${customerId}/routes/${routeId}`;
      const vendorId = this.vendorId;
      const record = {
        active: true,
        routeId,
        routeName,
        routePath,
        customerId,
        customerName,
        vendorId
      };
      if (this.vendorId != '') {
        this.routesService.setAuthorizedRoutes(this.vendorId, record).then(() => {
          this.isModalVisible = false;
          this.isConfirmLoading = false;
        });
      }
    }
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

}
