import { Component, OnInit, inject } from '@angular/core';
import { map, takeUntil, tap } from 'rxjs/operators';
import { AccountsService } from '../../shared/services/accounts.service';
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
