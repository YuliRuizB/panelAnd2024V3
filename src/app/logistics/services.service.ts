import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { NzMessageService } from 'ng-zorro-antd/message';
import { switchMap } from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest} from 'rxjs';
import { IActivityLog } from './classes';
import { startOfToday } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class LogisticsService {

  activityLogCollection: AngularFirestoreCollection<IActivityLog[]>;
  activity: Observable<IActivityLog> | undefined;
  collection = 'activityLog';
  collectionU = 'users';
  

  constructor(
    private afs: AngularFirestore,
    public messageService: NzMessageService
  ) {
    this.activityLogCollection = this.afs.collection(this.collection);
  }

  getActivityLog(start: Date, end: Date) {
    console.log(start, end);
    return this.afs.collection(this.collection, (ref) => ref
      .where('created', '>', start)
      .where('created', '<', end)
      .orderBy('created','desc')
    ).snapshotChanges();
  }
  getActivityLogByCustomer(start: Date, end: Date, customerId:string) {
    console.log(start, end , customerId);
    return this.afs.collection(this.collection, (ref) => ref
      .where('customerPath', '==',customerId )
      .where('created', '>', start)
      .where('created', '<', end)
      .orderBy('created','desc')
    ).snapshotChanges();
  }

  getliveBusses(customerId: string , routeId: string   ) {
    const date: any = startOfToday();

    return this.afs.collection('customers').doc(customerId).collection('program',
     ref => ref.where('routeId','==', routeId)
     .where('isLive', '==' , true)
     .where('startAt','>=', date).limit(5)).snapshotChanges();
  }

  getMarkers(start: Date, end: Date) {
    return this.afs.collection(this.collection, (ref) => ref
      .where('created', '>', start)
      .where('created', '<', end)
      .orderBy('created','desc')
    ).snapshotChanges();
  }

  getMarkersByCustomer(start: Date, end: Date, customerId:string) {
    return this.afs.collection(this.collection, (ref) => ref
    .where('customerPath', '==',customerId )
      .where('created', '>', start)
      .where('created', '<', end)
      .orderBy('created','desc')
    ).snapshotChanges();
  }

  getChartData(start: Date, end: Date) {
    return this.afs.collection(this.collection, (ref) => ref
      .where('created', '>', start)
      .where('created', '<', end)
      .orderBy('created','desc')
    ).snapshotChanges();
  }
  getChartDatabyCustomer(start: Date, end: Date , customerId:string) {
    return this.afs.collection(this.collection, (ref) => ref
      .where('customerPath', '==',customerId )
      .where('created', '>', start)
      .where('created', '<', end)
      .orderBy('created','desc')
    ).snapshotChanges();
  }
  getUsersByCustomer(start: Date, end: Date , customerId:string) { 
    
    return this.afs.collection(this.collectionU, (ref) => ref
      .where('customerId', '==',customerId )
      .where('dateCreateUserFormat', '>', start)
      .where('dateCreateUserFormat', '<', end)
      .orderBy('dateCreateUserFormat','desc')
    ).snapshotChanges();
  }

  getUsersByCustomerTot( customerId:string) {    
    return this.afs.collection(this.collectionU, (ref) => ref
      .where('customerId', '==',customerId )    
    ).snapshotChanges();
  }

}

