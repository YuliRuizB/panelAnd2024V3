import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FleetComponent } from './fleet/fleet.component';
import { LogisticsComponent } from './logistics/logistics.component';
import { VehicleEditComponent } from './fleet/edit/edit.component';
import { ProgramComponent } from './program/program.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { VendorUsersListComponent } from './users/list/list.component';
import { RoutesNewComponents } from './routes/new/new.component';
import { RoutesComponentVendor } from './routes/routes.component';
import { EditComponentVendor } from './edit/edit.component';
import { ListComponentVendor } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'fleet',
        pathMatch: 'full'
      },
      {
        path: 'program',
        component: ProgramComponent,
        data: {
          title: 'Programa'
        }
      },
      {
        path: 'assignment',
        component: AssignmentComponent,
        data: {
          title: 'Asignación'
        }
      },
      {
        path: 'list',
        component: ListComponentVendor,
        data: {
          title: 'Listado'
        }
      },
      {
        path: 'edit/:id',
        component: EditComponentVendor,
        data: {
          title: 'Editar'
        }
      },
      {
        path: 'fleet',
        component: FleetComponent,
        data: {
          title: 'Flota Vehicular'
        }
      },
      {
        path: 'vehicle/edit/:id',
        component: VehicleEditComponent,
        data: {
          title: 'Editar'
        }
      },
      {
        path: 'vehicle/edit/:accountid/:vehicleid',
        component: VehicleEditComponent,
        data: {
          title: 'Editar'
        }
      },
      {
        path: 'logistics',
        component: LogisticsComponent,
        data: {
            title: 'En vivo'
        }
      },
      {
        path: 'routes',
        component: RoutesComponentVendor,
        data: {
            title: 'Rutas'
        }
      },
      {
        path: 'routes/new',
        component: RoutesNewComponents,
        data: {
            title: 'Rutas'
        }
      },
      {
        path: 'users',
        component: VendorUsersListComponent,
        data: {
          title: 'Usuarios'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class VendorRoutingModule { }
