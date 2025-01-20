import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AccountsService } from '../../../shared/services/accounts.service';
import { RoutesService } from '../../../shared/services/routes.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class RouteEditComponent implements OnInit, OnDestroy {
  routesService = inject(RoutesService);
  accountsService = inject(AccountsService);
  objectSubscription!: Subscription;
  accountsList: any[] = [];
  stopSubscription$: Subject<any> = new Subject();
  accountId: any;
  routeId: any;
  routeElement: any = {};
  objectForm!: UntypedFormGroup;
  infoSegment: any = [];
  authService = inject(AuthenticationService);
  user: any;

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder
  ) {
    this.authService.user.subscribe(user => {
      this.user = user;
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
    this.objectSubscription = this.route.params.pipe(
      takeUntil(this.stopSubscription$)
    ).subscribe(params => {
      this.accountId = params['accountId']; // (+) converts string 'id' to a number
      this.routeId = params['routeId']; // (+) converts string 'id' to a numbe
      this.getSubscriptions();
      this.createForm();
    });
  }

  ngOnDestroy() {
    this.stopSubscription$.next(undefined);
    this.stopSubscription$.complete();
  }

  createForm() {
    this.objectForm = this.fb.group({
      active: [false, [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
      imageUrl: [''],
      kmzUrl: [''],
      routeId: ['', [Validators.required]],
      customerId: ['']
    })
  }

  patchForm(data: { active: any; name: any; description: any; imageUrl: any; kmzUrl: any; routeId: any; }) {
    this.objectForm.patchValue({
      active: data.active,
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      kmzUrl: data.kmzUrl,
      routeId: data.routeId,
      customerId: this.accountId
    });
  }

  saveForm() {
  }

  getSubscriptions() {
    this.routesService.getRoute(this.accountId, this.routeId).pipe(
      takeUntil(this.stopSubscription$),
      map((a: any) => {
        const id = a.payload.id;
        const data = a.payload.data() as any;
        return { id, ...data }
      })
    ).subscribe(route => {
      this.patchForm(route);
      this.routeElement = route;
    })
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      this.accountsService.getAccountsByCustomer(this.user.customerId).pipe(
        takeUntil(this.stopSubscription$),
        map((a: any) => {
          const id = a.payload.id;
          const data = a.payload.data() as any;
          return { id, ...data }
        }),
      ).subscribe(accounts => {
        this.accountsList = [accounts];
      })
    } else {
      this.accountsService.getAccounts().pipe(
        takeUntil(this.stopSubscription$),
        map((actions: any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      )
        .subscribe(accounts => {
          this.accountsList = accounts;
        })
    }
  }

  onCustomerChange() {
  }

}
