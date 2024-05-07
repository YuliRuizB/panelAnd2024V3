import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GlobalUsersListComponent } from "./users/list/list.component";
import { MyProfileComponent } from "./my-profile/my-profile-dashboard.component";
import { RolComponent } from "./roles/roles-dashboard.component";


const routes: Routes = [  
    {
        path: 'users/dashboard',
        redirectTo: 'main',
        pathMatch: 'full'
      },
      {
        path: 'main',
        component: GlobalUsersListComponent,
        data: {
          title: 'Usuarios'
        }
        },
        {
          path: 'roles/dashboard',
          component: RolComponent,
          data: {
            title: 'Roles'
          }
        },
        {
          path: 'my-profile/dashboard',
          component: MyProfileComponent,
          data: {
            title: 'Mi Perfil'
          }
      }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  
  export class GlobalRoutingModule { }
  