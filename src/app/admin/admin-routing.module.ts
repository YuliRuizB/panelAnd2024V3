import { RouterModule, Routes } from "@angular/router";
import { AdminPaymentsComponent } from "./payments/payments.component";
import { OrganigramaComponent } from "./organigrama/organigrama.component";
import { EvidenceComponent } from "./evidence/evidence.component";
import { NgModule } from "@angular/core";

const routes: Routes = [  
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
    },
    {
      path: 'payments',
      component: AdminPaymentsComponent,
      data: {
        title: 'Pagos'
      }
    },
    {
      path: 'organigrama',  
      component: OrganigramaComponent,
      data: {
        title: 'Organigrama de Rutas'
      }
    },
    {
      path: 'evidence',
      component : EvidenceComponent,
      data: {
        title: "Evidencias"
      }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  
  export class AdminRoutingModule { }
  