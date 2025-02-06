import { Component, OnInit, Input, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RolService } from '../../../services/roles.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { PaymentMethodsService } from '../../../services/payment-methods.service';

@Component({
  selector: 'app-shared-account-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class SharedAccountPaymentMethodsComponent implements OnInit {

  @Input('accountId') accountId!: string;
  loading: boolean = false;
  rolService = inject(RolService);
  stopSubscription$: Subject<boolean> = new Subject();
  paymentMethodsList: any = [];
  accountPaymentMethods: any = [];
  infoLoad: any = [];
  userlevelAccess: string | undefined;
  user: any;

  paymentMethodsService = inject(PaymentMethodsService);
  authService = inject(AuthenticationService);

  constructor(
    private messageService: NzMessageService,

  ) {
    this.authService.user.subscribe((user: any) => {
      if (user) {
        if (this.user !== null && this.user !== undefined && this.user.rolId !== undefined) {
          this.user = user;
          this.rolService.getRol(this.user.rolId).valueChanges().subscribe((item: any) => {
            this.infoLoad = item;
            this.userlevelAccess = this.infoLoad.optionAccessLavel;
          });
        }
      }
    });
  }

  ngOnInit() {
    this.getSubscriptions();
  }

  ngOnDestroy() {
    this.stopSubscription$.next(false);
    this.stopSubscription$.complete();
  }


  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
  }


  getSubscriptions() {
    this.paymentMethodsService.getAccountPaymentMethods(this.accountId).pipe(
      takeUntil(this.stopSubscription$),
      map((actions: any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      })),
      tap((paymentMethods: any) => {
        this.accountPaymentMethods = paymentMethods;
        if (paymentMethods.length == 0) {
          this.createDefaultPaymentMethods();
        }
        return paymentMethods;
      })
    ).subscribe(() => {
      this.loading = false;
    });
  }

  createDefaultPaymentMethods() {
    if (this.userlevelAccess != "3") {
      this.paymentMethodsService.createDefaultPaymentMethods(this.accountId);
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
  }

  onChange(active: boolean, paymentMethod: any) {
    this.paymentMethodsService.toggleActiveAccountPaymentMethod(this.accountId, paymentMethod.id, active);
  }

}
