import { Component, OnInit, Input, OnDestroy, inject } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { AssignmentsService } from '../../../services/assignments.service';


@Component({
  selector: 'app-shared-vendor-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class SharedVendorAssignmentsComponent implements OnInit, OnDestroy {
  assignmentsService = inject(AssignmentsService);
  @Input() vendorId: string = '';
  @Input() routeId: string = '';
  @Input() routeName: string = '';
  @Input() customerName: string = '';

  loading: boolean = true;

  stopSubscription$: Subject<boolean> = new Subject();
  assignmentList: any = [];
  assignmentSubscription!: Subscription;

  constructor() { }

  ngOnInit() {
    this.getSubscriptions();
  }

  ngOnDestroy() {
    this.stopSubscription$.next(false);
    this.stopSubscription$.complete();
  }

  getSubscriptions() {
      this.assignmentSubscription = this.assignmentsService.getActiveAssignmentsRoute(this.routeId).pipe(
      takeUntil(this.stopSubscription$),
      map((actions:any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      }))
    ).subscribe( (assignments: any) => {
      this.assignmentList = assignments;   
      this.loading = false;
    });
       
  }
}
