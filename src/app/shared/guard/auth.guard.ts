import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { tap, map, take } from 'rxjs/operators';
import * as _ from 'lodash';
import { User1 } from '../interfaces/user.type';
import { Observable, of } from 'rxjs'; // Import Observable and of

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  
  constructor( public auth:AuthenticationService , public router:Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> { // Return Observable<boolean>
    let role = next.data['role'] as Array<string>;
    return this.auth.user.pipe(
      take(1),
      map((user: User1 | null | undefined) => {
        if (!user) {
          console.log('User not logged in. Redirecting to login page.');
          this.router.navigate(['/login']);
          return false;
        }
        return _.includes(user.roles, role[0]);
      }),
      tap((hasRole) => {
        if (!hasRole) {
          console.log('Access to this area requires a different user role level. Access denied.');
          this.router.navigate([`/dashboard/${role[1]}`]);
        }
      })
    );
  }
//TODO
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> { // Return Observable<boolean>
    return this.auth.user.pipe(
      take(1),
      map((user: User1 | null | undefined) => {
        if (!user) {
          console.log('User not logged in. Redirecting to login page.');
          this.router.navigate(['/login']);
          return false;
        }
        return _.includes(user.roles, "admin");
      }),
      tap((isAdmin) => {
        if (!isAdmin) {
          console.log('Access to this area requires a different user role level. Access denied.');
          this.router.navigate(['']);
        }
      })
    );
  }
}