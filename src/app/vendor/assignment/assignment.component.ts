import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { IAssignment } from '../../shared/interfaces/assignment.type';
import { UntypedFormGroup, Validators, UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import * as _ from 'lodash';
import { UsersService } from '../../shared/services/users.service';
import { TableService } from '../../shared/services/table.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { AccountsService } from '../../shared/services/accounts.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit, OnDestroy {
  authService = inject(AuthenticationService);
  usersService = inject(UsersService);
  //tableSvc = inject(TableService);

  allChecked: boolean = false;
  indeterminate: boolean = false;
  search: any;
  displayData: any = [];
  recordId: string = 'bKLBasJLckghzlqhbjIx';
  user: any = [];
  stopSubscriptions$: Subject<boolean> = new Subject();
  vendorRoutesSubscription!: Subscription;
  vendorRoutesList: any[] = [];
  customersList: any[] = [];
  customersActiveList: any[] = [];
  loading: boolean = true;
  objectForm!: UntypedFormGroup;

  assignmentsList!: IAssignment[];
  isVisible: boolean = false;
  isOkLoading: boolean = false;
  infoSegment: any = [];
  accountsService = inject(AccountsService);
  stopSubscription$: Subject<boolean> = new Subject();

  constructor(
    private fb: UntypedFormBuilder
  ) {
    this.authService.user.subscribe(user => {
      if (user) {
        this.user = user;        
        if (this.user !== null && this.user !== undefined && this.user.idSegment !== undefined) {
          if ( this.user.rolId !== undefined){
          this.getSubscriptions();
          }
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
      }
    });
    this.createForm();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.stopSubscriptions$.next(false);
    this.stopSubscriptions$.complete();
  }

  createForm() {
    this.objectForm = this.fb.group({
      customerName: ['', Validators.required],
      customerId: ['', Validators.required],
      routeName: ['', Validators.required],
      routeId: ['', Validators.required],
      vehicleName: ['', Validators.required],
      vehicleId: ['', Validators.required],
      driverName: ['', Validators.required],
      driverId: ['', Validators.required],
      active: [true, Validators.required],
      deleted: ['', Validators.required],
      round: ['', Validators.required],
      program: ['', Validators.required],
      type: ['', Validators.required],
      vehicleType: ['', Validators.required],
      isSunday: [false, Validators.required],
      isMonday: [false, Validators.required],
      isTuesday: [false, Validators.required],
      isWednesday: [false, Validators.required],
      isThursday: [false, Validators.required],
      isFriday: [false, Validators.required],
      isSaturday: [false, Validators.required]
    })
  }

  showModal() {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getSubscriptions() {
    this.vendorRoutesSubscription = this.usersService.getBoardingPassesByRoute().pipe(
      takeUntil(this.stopSubscriptions$)
    ).subscribe(data => {
      this.createNestedTableData(data);
    })
  }

  createNestedTableData(data: any) {
    this.vendorRoutesList = [];
    this.usersService.getActiveCustomers().pipe(
      takeUntil(this.stopSubscription$),
      map((actions: any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      }))
    ).subscribe(customersActiveList => {
      this.customersActiveList = customersActiveList;
      if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual  

        const filteredData = data.filter((item: any) => item.customerId === this.user.customerId);
        // Extract unique customerName values from the filtered data
        this.customersList = _.chain(filteredData)
          .map('customerName')
          .uniq()
          .filter(customerName => _.includes(_.map(this.customersActiveList, 'name'), customerName))
          .value();

      } else {
        this.customersList = _.chain(data)
          .map('customerName')
          .uniq()
          .filter(customerName => _.includes(_.map(this.customersActiveList, 'name'), customerName))
          .value();
      }
      for (let i = 0; i < data.length; ++i) {
        data[i].routeName = data[i].passes[0].routeName;
        data[i].routeId = data[i].passes[0].routeId;
      }
      this.vendorRoutesList = data;
    })
  }

  sort(sortAttribute: any) {
    // this.displayData = this.tableSvc.sort(sortAttribute, this.assignmentsList);
  }

  currentPageDataChange($event: Array<{
    id: number;
    name: string;
    avatar: string;
    date: string;
    amount: number;
    status: string;
    checked: boolean;
  }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const allChecked = this.displayData.every((value: { checked: boolean; }) => value.checked === true);
    const allUnChecked = this.displayData.every((value: { checked: any; }) => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.displayData.forEach((data: any) => {
      data.checked = value;
    });
    this.refreshStatus();
  }
}
