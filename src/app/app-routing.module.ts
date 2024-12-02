import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { BajaUsuarioComponent } from './shared/templates/baja-usuario/baja-usuario.component';
import { ExternalPrivacyComponent } from './shared/templates/privacy/external/external-privacy.component';
import { PageNotFoundComponent } from './shared/templates/page-not-found/page-not-found.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { PrivacyPageComponent } from './shared/templates/privacy-page/privacy-page.component';
import { PrivacyPageComponentSNB } from './shared/templates/privacy-pageSNB/privacy-pageSNB.component';
import { BajaUsuarioSNBComponent } from './shared/templates/baja-usuarioSNB/baja-usuarioSNB.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["authentication/login"]);


const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: '',
    component: CommonLayoutComponent,                
    //...canActivate(redirectUnauthorizedToLogin),   
    children: [    
      {
        path: 'accounts',
        loadChildren: () => import('../app/accounts/accounts-routing.module').then(m => m.AccountsRoutingModule),
        data: {
          title: 'Cuentas'
        }
      }, 
      {
        path: 'dashboard',
        loadChildren: () => import('../app/dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule)
      },
      {
        path: 'global',
        loadChildren: () => import('../app/global/global-routing.module').then(m => m.GlobalRoutingModule)
      },      
      {
        path: 'logistics',
        loadChildren: () => import('../app/logistics/logistics-routing.module').then(m => m.LogisticsRoutingModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('../app/admin/admin-routing.module').then(m => m.AdminRoutingModule)
      },  
      {
        path: 'customers',
        loadChildren: () => import('../app/customers/customer-routing.module').then(m => m.CustomerRoutingModule)
      }, 
      {
        path: 'vendor',
        data: {
            title: 'División'
          },
        loadChildren: () => import('../app/vendor/vendor-routing.module').then(m => m.VendorRoutingModule)
      }   
    ]
},
{
  path: 'authentication',
  loadChildren: () => import('../app/authentication/authentication-routing.module').then(m => m.AuthenticationRoutingModule)  
},
  { path: "bajaUsuario", component: BajaUsuarioComponent },
  { path: "bajaUsuarioSNB", component: BajaUsuarioSNBComponent },
  { path: "privacy-page", component: PrivacyPageComponent },
  { path: "privacy-pageSNB", component: PrivacyPageComponentSNB },
  //{ path: '**', component: PageNotFoundComponent },
  
  { path: "external-privacy", component: ExternalPrivacyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
