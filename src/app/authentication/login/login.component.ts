import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;

  constructor(
    private authService: AuthenticationService,
    private fb: UntypedFormBuilder,    
    public notification: NzNotificationService
  ) { }

  submitForm(): void {   
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    } 
   if (this.loginForm.valid) {
      this.authService.signIn( this.loginForm.get('userName')?.value, this.loginForm.get('password')?.value);
    } else {
      this.notification.create('error', '¡Oops...!', 'Escriba por favor sus datos para tener acceso');
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    }); 
  }
}