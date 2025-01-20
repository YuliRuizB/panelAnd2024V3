import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { tap, map, take } from 'rxjs/operators';
import * as _ from 'lodash';
import { User1 } from '../interfaces/user.type';
import { Observable, of } from 'rxjs'; // Import Observable and of
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  
  constructor( public auth:AuthenticationService , private messageService: NzMessageService , public router:Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> { // Return Observable<boolean>
    let role = next.data['role'] as Array<string>;
    return this.auth.user.pipe(
      take(1),
      map((user: User1 | null | undefined) => {
        if (!user) {          
          this.sendMessage('error','Usuario no esta loggeado correctamente, redireccionando a login');        
          this.router.navigate(['/login']);
          return false;
        }
        return _.includes(user.roles, role[0]);
      }),
      tap((hasRole) => {
        if (!hasRole) {          
          this.sendMessage('error','El acceso a esta area requiere un tipo diferente de rol. Acceso denegado');
          this.router.navigate([`/dashboard/${role[1]}`]);
        }
      })
    );
 }

 sendMessage(type: string, message: string): void {
  this.messageService.create(type, message);
}

//TODO
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> { // Return Observable<boolean>
    return this.auth.user.pipe(
      take(1),
      map((user: User1 | null | undefined) => {
        if (!user) {
          this.sendMessage('error','Usuario no esta loggeado correctamente, redireccionando a login');
          this.router.navigate(['/login']);
          return false;
        }
        return _.includes(user.roles, "admin");
      }),
      tap((isAdmin) => {
        if (!isAdmin) {
          this.sendMessage('error','El acceso a esta area requiere un tipo diferente de rol. Acceso denegado');
          this.router.navigate(['']);
        }
      })
    );
  }
}