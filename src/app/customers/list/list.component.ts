import { Component, OnInit, inject } from '@angular/core';
import { map, takeUntil, tap } from 'rxjs/operators';
import { AccountsService } from '../../shared/services/accounts.service';
import { ColDef } from 'ag-grid-community';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponents implements OnInit {
  accountsService = inject(AccountsService);
  authService = inject(AuthenticationService);
  stopSubscription$: Subject<boolean> = new Subject();

  user: any;
  infoSegment: any = [];
  accountsList: any;
  public popupParent;
  columnDefs: ColDef[] = [
    { headerName: '#', checkboxSelection: true, suppressSizeToFit: true },
    { headerName: 'Id', field: 'id', hide: true },
    { headerName: 'Nombre', field: 'name', enableRowGroup: true },
    { headerName: 'Recorrido', field: 'description', enableRowGroup: true, filter: 'text' },
    { headerName: 'Tipo', field: 'routeType', enableRowGroup: true, filter: 'text' },
    {
      headerName: 'Clima', field: 'has_ac', enableRowGroup: true, filter: 'text',
      cellRenderer: function (params: { value: boolean; }) {
        let color = params.value === true ? 'color--behance' : 'ag-faded';
        let cellContent: string = '';
        cellContent = `<i class="material-icons ${color}">ac_unit</i>`;
        return cellContent;
      }
    },
    {
      headerName: 'Control de ruta', headerClass: 'centered',
      /* TODO  children: [
          {
            headerName: 'Kmz', field: 'kmzUrl',
            cellRenderer: function (params: { value: string; }) {
              let icon = typeof (params.value) != 'undefined' && params.value != 'no route designated' ? 'check_circle' : 'cancel';
              let color = typeof (params.value) != 'undefined' && params.value != 'no route designated' ? 'color--success' : 'color--dark';
              let cellContent: string = '';
              cellContent = `<i class="material-icons ${color}">${icon}</i>`;
              return cellContent;
            }
          },
          {
            headerName: 'Geocerca partida', field: 'geofenceBegin',
            cellRenderer: function (params: { value: any; }) {
              let icon = typeof (params.value) != 'undefined' && (params.value).length > 0 ? 'check_circle' : 'cancel';
              let color = typeof (params.value) != 'undefined' && (params.value).length > 0 ? 'color--success' : 'color--dark';
              let cellContent: string = '';
              cellContent = `<i class="material-icons ${color}">${icon}</i>`;
              return cellContent;
            }
          },
          {
            headerName: 'Geocerca destino', field: 'geofenceEnd',
            cellRenderer: function (params: { value: any; }) {
              let icon = typeof (params.value) != 'undefined' && (params.value).length > 0 ? 'check_circle' : 'cancel';
              let color = typeof (params.value) != 'undefined' && (params.value).length > 0 ? 'color--success' : 'color--dark';
              let cellContent: string = '';
              cellContent = `<i class="material-icons ${color}">${icon}</i>`;
              return cellContent;
            }
          },
          {
            headerName: 'Activa',
            field: 'active',
            cellEditor: 'popupSelect',
            editable: true,
            cellRenderer: function (params: { value: any; }) {
              let icon = typeof (params.value) == 'undefined' ? 'cancel' : params.value ? 'check_circle' : 'cancel';
              let color = typeof (params.value) == 'undefined' ? 'color-dark' : params.value ? 'color--success' : 'color--dark';
              let cellContent: string = '';
              cellContent = `<i class="material-icons ${color}">${icon}</i>`;
              return cellContent;
            },
            cellEditorParams: {
              values: ['Si', 'No']
            }
          }
        ] */
    }
  ];

  constructor() {
    this.popupParent = document.querySelector("body");
    this.authService.user.subscribe(user => {
      this.user = user;
      // console.log(this.user); /idSegment
      if (this.user !== null && this.user !== undefined && this.user.idSegment !== undefined) {

        this.accountsService.getSegmentLevel(this.user.idSegment).pipe(
          takeUntil(this.stopSubscription$),
          map((a: any) => {
            const id = a.payload.id;
            const data = a.payload.data() as any;
            return { id, ...data }
          }),
          tap(record => {
            this.infoSegment = record;
            return record;
          })
        ).subscribe();
      }
    });
  }

  ngOnInit() {
    this.getSubscriptions();
  }

  getSubscriptions() {
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      this.accountsService.getAccountsByCustomer(this.user.customerId).pipe(
        map((a:any) => {
          const id = a.payload.id;
          const data = a.payload.data() as any;
          return { id, ...data }
        }),
      ).subscribe((accounts) => {
        this.accountsList = [accounts];
      });
    } else {

      this.accountsService.getAccounts().pipe(
        map((actions: any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id: id, ...data }
        }))
      ).subscribe((accounts) => {
        this.accountsList = accounts;
      });
    }
  }

}
