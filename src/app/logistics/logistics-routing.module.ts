import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LogisticsMainComponent } from "./main/main.component";

const routes: Routes = [ 
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      },
      {
        path: 'main',
        component: LogisticsMainComponent,
        data: {
          title: 'Logística'
        }
      }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class LogisticsRoutingModule { }
  