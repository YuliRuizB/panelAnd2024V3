import { Component, OnInit, Input, OnDestroy, inject, NgModule, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, map, tap, switchMap, take } from 'rxjs/operators';
import { UsersService } from '../../../../services/users.service';
import { CustomersService } from '../../../../../customers/services/customers.service';

@Component({ 
  selector: 'app-shared-credentials-qrcodes',
  templateUrl: './qrcodes.component.html',
  styleUrls: ['./qrcodes.component.css']
})
export class SharedUsersCredentialsQRCodesComponent implements OnInit, OnDestroy {
  @ViewChild('download', { static: false }) download!: ElementRef;
  @Input() accountId: string = '';
  customersService = inject(CustomersService);
  usersService= inject(UsersService);
  stopSubscription$: Subject<any> = new Subject();
  activityLogList: any = [];
  loading: boolean = true;
  userCredentials: any[] = [];

  constructor() { }

  ngOnInit() {
    this.getSubscriptions();
  }

  ngOnDestroy() {
    this.stopSubscription$.next(undefined);
    this.stopSubscription$.complete();
  }

  getSubscriptions() {
    this.customersService.getAccountUsersWithCredential(this.accountId, 'user').pipe(
      takeUntil(this.stopSubscription$),
      map((actions:any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      })),
      tap((users:any) => {
        console.log('users', users);
        
        this.userCredentials = users;
        return users;
      })
    ).subscribe();
  }

  downloadImg(): void {
    const canvas = document.getElementById('download')?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
      this.download.nativeElement.href = canvas.toDataURL('image/png');
      this.download.nativeElement.download = 'ng-zorro-antd';
      const event = new MouseEvent('click');
      this.download.nativeElement.dispatchEvent(event);
    }
  }
}