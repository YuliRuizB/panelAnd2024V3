import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
//import { firestore } from 'firebase';
import { Timestamp } from 'firebase/firestore';
import { take, map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { addDays, addMinutes } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';


@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private afs: AngularFirestore, public messageService: NzMessageService) { }

  setProgram(data: any) {
    const assignmentRef = this.afs.collection('customers').doc(data.customerId).collection('routes').doc(data.routeId).collection('assignments').doc(data.assignmentId);
    const driverRef = this.afs.collection('drivers').doc(data.driverId);

    let driverConfirmationAt = new Date(data.date);
    let startAt = new Date(data.date);
    let endAt = new Date(data.date);

    return assignmentRef.get().pipe(
      take(1),
      map((assign: any) => {
        let a = assign.data();
        let startTime = a.stopBeginHour.substring(0, 5);
        let endTime = a.stopEndHour.substring(0, 5);

        let startTimeArray = startTime.split(':');
        let endTimeArray = endTime.split(':');

        startAt.setHours(startTimeArray[0], startTimeArray[1], 0, 0);
        endAt.setHours(endTimeArray[0], endTimeArray[1], 0, 0);
        driverConfirmationAt.setHours(startTimeArray[0], startTimeArray[1], 0, 0);
        driverConfirmationAt.setMinutes(+driverConfirmationAt.getMinutes() - 15, 0, 0);

        if (a.program == 'S') {
          let time = new Date(a.time.toDate());
          driverConfirmationAt = addMinutes(time, -15);
        }
        return {
          active: a.active,
          capacity: data.vehicleCapacity,
          count: 0,
          customerId: data.customerId,
          customerName: data.customerName,
          driver: data.driverName,
          driverConfirmationAt: Timestamp.fromDate(driverConfirmationAt),
          driverConfirmedAt: null,
          driverId: data.driverId,
          endAt: Timestamp.fromDate(endAt),
          endedAt: null,
          geofenceBegin: a.stopBeginId,
          geofenceEnd: a.stopEndId,
          geopoint: null,
          hasEnded: false,
          isConfirmed: false,
          isLive: false,
          isRejected: false,
          isTaskIn: a.program == 'M' ? true : false,
          isTaskOut: a.program == 'M' ? false : true,
          isWithTrouble: false,
          lastUpdatedAt: null,
          name: data.routeName,
          program: a.program,
          rating: 0,
          rejectedReason: null,
          round: a.round,
          routeDescription: data.routeName,
          routeId: data.routeId,
          routeName: data.routeName,
          startAt: Timestamp.fromDate(startAt),
          started: false,
          startedAt: null,
          troubleMessage: null,
          troubleType: null,
          type: a.type,
          time: a.time,
          vehicleId: data.vehicleId,
          vehicleName: data.vehicleName,
          startAtFormat: startAt
        }
      })
    ).subscribe(assignment => {
      const programRef = this.afs.collection('customers').doc(data.customerId).collection('program');
      return programRef.add(assignment)
        .then(() => this.sendMessage('success', 'La Programación ha sido generada. Favor de Actualizar la tabla.'))
        .catch(err => this.sendMessage('error', `¡Oops! Algo salió mal ... ${err}`));
      // return true;
    });
  }

  getProgramsByDay(date: Date) {

    let start = date;
    let end = addDays(start, 1);
    const programmedAssignments = this.afs.collectionGroup('program', ref =>
      ref.where('startAt', '>=', start)
        .where('startAt', '<=', end)
        .where('active', '==', true)
        .orderBy('startAt', 'asc')
    );
    return programmedAssignments.snapshotChanges();
  }

  getProgramsByDaybyCustomer(date: Date, customerId: string) {

    let start = date;
    let end = addDays(start, 1);
    const programmedAssignments = this.afs.collectionGroup('program', ref =>
      ref.where('startAt', '>=', start)
        .where('startAt', '<=', end)
        .where('active', '==', true)
        .where('customerId', '==', customerId)
        .orderBy('startAt', 'asc')
    );
    return programmedAssignments.snapshotChanges();
  }
  getProgrambyCustomer(programId: string, customerId: string) {
    const programRef = this.afs.collection('customers').doc(customerId).collection('program').doc(programId);
    return programRef.snapshotChanges(); // Ensure this returns an Observable of DocumentSnapshot
  }

  getRoutesbyCustomer(customerId: string) {
    const programmedAssignments = this.afs.collectionGroup('routes', ref =>
      ref.where('active', '==', true)
        .where('customerId', '==', customerId)
        .orderBy('name', 'asc')
    );
    return programmedAssignments.snapshotChanges();
  }

  getRoutes() {
    const programmedAssignments = this.afs.collectionGroup('routes', ref =>
      ref.where('active', '==', true)
        .orderBy('name', 'asc')
    );
    return programmedAssignments.snapshotChanges();
  }

  getHelpCenter(type: string, date: string, customerId: string) {
    const programmedAssignments = this.afs.collection('helpCenter', ref =>
      ref.where('active', '==', "true")
        .where('customerId', '==', customerId)
        .where('type', '==', type)
        .where('currentDate', '==', date)
    );
    return programmedAssignments.snapshotChanges();
  }

  getHelpCenterAll(types: string, customerId: string, statusSelected: string): Observable<any[]> {
    // Create an observable for each type   
    const programmedAssignments = this.afs.collection('helpCenter', ref =>
      ref.where('active', '==', "true")
        .where('type', '==', types)
        .where('status', '==', statusSelected)
        .where('customerId', '==', customerId)
        .orderBy('currentDate', 'asc')
    );
    return programmedAssignments.snapshotChanges();
  }

  getRefund(customerId: string, statusSelected: string): Observable<any[]> {
    const programmedAssignments = this.afs.collection('refund', ref =>
      ref.where('status', '==', statusSelected)
        .where('customer', '==', customerId)
        .orderBy('date', 'asc')
    );
    return programmedAssignments.snapshotChanges();
  }




  editProgram(vendorId: string, data: any) {
    const programRef = this.afs.collection('customers').doc(data.value.customerId).collection('program').doc(data.value.id);
    return programRef.update({
      driver: data.value.driver,
      driverId: data.value.driverId,
      vehicleId: data.value.vehicleId,
      vehicleName: data.value.vehicleName
    })
      .then(() => this.messageService.success('La Programación ha sido modificada. Favor de Actualizar la tabla.'))
      .catch(err => this.sendMessage('error', `¡Oops! Algo salió mal ... ${err}`));
  }

  deleteProgram(programId: string, customerId: any) {

    const programRef = this.afs.collection('customers').doc(customerId).collection('program').doc(programId);
    return programRef.delete()
      .then(() => this.sendMessage('success', 'La  programacion ha sido eliminada.'))
      .catch(err => this.sendMessage('error', `¡Oops! Algo salió mal ... ${err}`));
  }

  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
  }

  updateTicketHelpCenter(ticketId: string, status: string) {
    const helpCenter = this.afs.collection('helpCenter').doc(ticketId);
    return helpCenter.update({ status: status });
  }
  updateTicketRefund(ticketId: string, status: string) {
    const helpCenter = this.afs.collection('refund').doc(ticketId);
    return helpCenter.update({ status: status });
  }

}
