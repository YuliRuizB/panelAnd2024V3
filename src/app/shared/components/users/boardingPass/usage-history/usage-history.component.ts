import { Component, OnInit, Input, OnDestroy, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-shared-usage-history',
  templateUrl: './usage-history.component.html',
  styleUrls: ['./usage-history.component.css']
})
export class SharedUsersUsageHistoryComponent implements OnInit, OnDestroy {

  @Input() userId: string = '';
  @Input() boardingPassId: string = '';
  usersService= inject(UsersService);
  stopSubscription$: Subject<any> = new Subject();
  activityLogList: any = [];
  loading: boolean = true;

  constructor() { }

  ngOnInit() {
    this.getSubscriptions();
  }

  ngOnDestroy() {
    this.stopSubscription$.next(undefined);
    this.stopSubscription$.complete();
  }

  getSubscriptions() {
    this.usersService.getBoardingPassActivityLog(this.userId, this.boardingPassId).pipe(
      takeUntil(this.stopSubscription$),
      map((actions:any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      }))
    ).subscribe( activityLog => {     
      this.activityLogList = activityLog;
    })
  }

}
