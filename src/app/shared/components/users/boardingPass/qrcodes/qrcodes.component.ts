import { Component, OnInit, Input, OnDestroy, inject, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { UsersService } from '../../../../services/users.service';
import { takeUntil, map, tap } from 'rxjs/operators';
import { CustomersService } from '../../../../../customers/services/customers.service';

@Component({
  selector: 'app-shared-qrcodes',
  templateUrl: './qrcodes.component.html',
  styleUrls: ['./qrcodes.component.css']
})
export class SharedUsersQRCodesComponent implements OnInit, OnDestroy {
  @ViewChild('download', { static: false }) download!: ElementRef; 
  @Input() accountId: string = '';
  customersService = inject(CustomersService);
  usersService= inject(UsersService);
  stopSubscription$: Subject<any> = new Subject();
  activityLogList: any = [];
  loading: boolean = true;
  userBoardingPass: any[] = [];

  constructor( ) { }

  ngOnInit() {
    this.getSubscriptions();
  }

  ngOnDestroy() {
    this.stopSubscription$.next(undefined);
    this.stopSubscription$.complete();
  }

  getSubscriptions() {
    this.customersService.getAccountSystemUsers(this.accountId, 'user').pipe(
      takeUntil(this.stopSubscription$),
      map((actions:any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      })),
      tap(users => {
        this.getLatestValidBoardingPass(users);
        return users;
      })
    ).subscribe();
  }

  getLatestValidBoardingPass(users: any) {
    this.userBoardingPass = [];
    users.forEach((user: any) => {
      return this.usersService.getLastValidBoardingPass(user.id).pipe(
        tap((boardingPasses:any) => {
          // console.log({ user: user, boardingPass: boardingPasses[0] || {} });
          this.userBoardingPass.push({ user: user, boardingPass: boardingPasses[0] });
          return boardingPasses;
        })
      ).subscribe();
    })
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
