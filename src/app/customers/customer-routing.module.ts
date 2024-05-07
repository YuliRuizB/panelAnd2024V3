import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponents } from "./list/list.component";
import { DashboardComponents } from "./dashboard/dashboard.component";
import { BajaUsuarioComponent } from "../shared/templates/baja-usuario/baja-usuario.component";
import { PaymentsComponents } from "./payments/payments.component";
import { RoutesComponents } from "./routes/routes.component";
import { RouteEditComponent } from "./routes/edit/edit.component";

const routes: Routes = [  
  
  { path: '', redirectTo: 'main',  pathMatch: 'full'  },
  { path: 'main',  component: ListComponents,
    data: { title: 'Empresa'  }
  },
  { path: 'list',  component: DashboardComponents,
    data: { title: 'Empresa'  }
  },
  { path: 'bajaUsuario',   component: BajaUsuarioComponent  },
  { path: 'payments',   component: PaymentsComponents,
          data: {  title: 'Pagos' }
  }, /* 
  { path: 'payment/:id', component: PayeeComponent,
        data: {  title: 'Recibir pago' }
  }, */
  { path: 'routes',  component: RoutesComponents,
      data: {  title: 'Rutas'   }
  },
   {  path: 'routes/edit/:accountId/:routeId',
    component: RouteEditComponent,
    data: {
      title: 'Editar'
    }
  }      
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CustomerRoutingModule { }
  