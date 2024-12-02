import { RouterModule, Routes } from "@angular/router";
import { AdminPaymentsComponent } from "./payments/payments.component";
import { OrganigramaComponent } from "./organigrama/organigrama.component";
import { EvidenceComponent } from "./evidence/evidence.component";
import { NgModule } from "@angular/core";
import { CenterComponent } from "./center/center.component";
import { RefaundComponent } from "./refaund/refaund.component";

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
        title: 'Organigrama de Operación'
      }
    },
    {
      path: 'evidence',
      component : EvidenceComponent,
      data: {
        title: "Evidencias"
      }
    },
    {
      path: 'center',
      component : CenterComponent,
      data: {
        title: "Centro de Atención"
      }
    },
    {
      path: 'refaund',
      component : RefaundComponent,
      data: {
        title: "Reembolso"
      }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  
  export class AdminRoutingModule { }
  