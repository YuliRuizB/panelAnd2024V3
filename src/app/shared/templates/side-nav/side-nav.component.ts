import { Component, OnInit, inject } from '@angular/core';
import { ROUTES } from './side-nav-routes.config';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { AuthenticationService } from '../../services/authentication.service';
import { tap } from 'rxjs/operators';
import { RolService } from '../../services/roles.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})

export class SideNavComponent implements OnInit {

  public menuItems!: any[];
  isFolded!: boolean;
  isSideNavDark!: boolean;
  isCollapsed: boolean = false;
  user: any;
  forms: any;

  constructor(private rolService: RolService,
    private authService: AuthenticationService,
    private themeService: ThemeConstantService
  ) {

  }
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit(): void {

    this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
        if (!!this.user) {
          if (this.user.rolId !== undefined) {
            this.rolService.getFormRol(this.user.rolId).pipe(
              tap(forms => {
                this.forms = forms;
                this.menuItems = ROUTES.filter(menuItem => menuItem);
                this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
                this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);
              })
            ).subscribe();
          }
        }
      }
    });

  }

  checkValidity(roles: string) {
    return this.hasRole(roles);
  }
  checkValiditySub(idRol: string) {
    return this.hasRoleSub(idRol);
  }

  hasRoleSub(idRol: string): boolean {
    if (this.forms.length > 0) {
      for (const form of this.forms) {
        if (idRol == form.idForm) {
          return true;
        }
      }
    } else {
      return false;
    }
    return false;
  }

  hasRole(idRol: string): boolean {
    if (this.forms.length > 0) {
      for (const form of this.forms) {
        if (idRol == form.idForm) {
          return true;
        }
      }
    } else {
      return false;
    }
    return false;
  }
}
