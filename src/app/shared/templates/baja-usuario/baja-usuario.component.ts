import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { CustomersService } from '../../../customers/services/customers.service';


@Component({
  selector: 'app-baja-usuario',
  templateUrl: './baja-usuario.component.html'
})
export class BajaUsuarioComponent implements OnInit {

  formDeleteAccount!: UntypedFormGroup;
  accountsSubscription?: Subscription;

  constructor(private messageService: NzNotificationService,
    private customersService: CustomersService,
    private usersService: UsersService,
    private fb: UntypedFormBuilder) { }

  ngOnInit() {
    this.formDeleteAccount = this.fb.group({
      userName: [null, [Validators.required]]
    });
  }
  ngOnDestroy() {
    if (this.accountsSubscription) {
      this.accountsSubscription.unsubscribe();
    }
  }

  DeleteAccount() {
    for (const i in this.formDeleteAccount?.controls) {
      this.formDeleteAccount.controls[i].markAsDirty();
      this.formDeleteAccount.controls[i].updateValueAndValidity();
    }

    if (this.formDeleteAccount?.valid) {
      this.accountsSubscription = this.usersService.getUserInfoByEmail(this.formDeleteAccount.controls['userName'].value).subscribe((data1: any[]) => {
        data1.forEach(action => {
          const data = action.payload.doc.data();
          let userObj = {
            active : true,           
            phoneNumber: data['phoneNumber'],
            firstName: data['firstName'],
            lastName: data['lastName'],
            email: data['email'],
            displayName: data['displayName'],
            customerName: data['customerName'],
            defaultRound: data['defaultRound'],
            defaultRoute: data['defaultRoute'],
            defaultRouteName: data['defaultRouteName'],
            status: "in Progress"
          } 
          this.customersService.createSystemDeleteUser(userObj);         
          const mensaje = "Gracias " + data['displayName'] + "  , la solicitud de baja sera enviada, en un periodo de 5 dias hábiles máximo sera completada la solicitud.";
          this.messageService.success('Información', mensaje);
        });
      });
    } else {
      this.messageService.error('Error', 'Escriba por favor sus datos para tener acceso');
    }
  }
}
