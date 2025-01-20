import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor( 
    private afs: AngularFirestore,
    private aff: AngularFireFunctions
    ) { }

  getDrivers(driverId: string) {
    const driver = this.afs.collection('drivers').doc(driverId);
    return driver.snapshotChanges();
  }

  getDriversByCustomergetDrivers(vendorId: string) {
    const drivers = this.afs.collection('drivers', ref => 
      ref.where('vendorId','==', vendorId)
        .where('active','==',true));
    return drivers.snapshotChanges();
  }

  getDriversByCustomer(customerId: string) {
    const drivers = this.afs.collection('drivers', ref => 
      ref.where('customerId','==', customerId)  
          .where('active','==',true));
    return drivers.snapshotChanges();
  }

  getDriversbyCustomer(vendorId: string, customerId:string) {
    const drivers = this.afs.collection('drivers', ref => ref
    .where('customerId' ,'==',customerId )
    .where('vendorId','==', vendorId));
    return drivers.snapshotChanges();
  }

  getAllDrivers() {
    const drivers = this.afs.collection('drivers');
    return drivers.snapshotChanges();
  }

  updateDriver(driverId: string, driver: any) {
    const driverRef = this.afs.collection('drivers').doc(driverId);
    return driverRef.update({ ...driver});
  }
  
  resetPassword(uid:string, password:string){
    const data = {uid, password}
    const driverResetPassword = this.aff.httpsCallable('onDriverResetPassword');
    return driverResetPassword(data).toPromise().then((respone:any) => {
    });
  }

  toggleActiveDriver(driverId: string, state: boolean) {
    const status = !state;
    const driver = this.afs.collection('drivers').doc(driverId);
    return driver.update({ active: status});
  }

  deleteDriver(driverId: string) {
    const driverRef = this.afs.collection('drivers').doc(driverId);
    return driverRef.delete();
  }

  async createDriver(driver: any): Promise<any> {    
      const newDriver = this.afs.createId();
      driver.uid = newDriver;
      const rolN = this.afs.collection('drivers').doc(newDriver);
      return rolN.set(driver).then(() => {
        return newDriver;
      })
        
  }

  getEvidenceDrivers(selectedDate: Date) {
    // Check if selectedDate is a valid Date object
    if (!(selectedDate instanceof Date && !isNaN(selectedDate.getTime()))) {
      // Handle the case where selectedDate is not a valid Date object
      console.error('Invalid date:', selectedDate);
      return of([]);; // or return an observable/error as appropriate
    }
  
    // Set the start and end of the selected date
    const startOfDay = new Date(Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate(), 0, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate(), 23, 59, 59, 999));

    // Query based on date range
    const evidence = this.afs.collection('driversEvidence', ref =>
      ref.where('dateTimeStamp', '>=', startOfDay)
         .where('dateTimeStamp', '<=', endOfDay)
    );  
    return evidence.snapshotChanges();
  }

  getEvidenceDriversbyCustomer(selectedDate: Date , customerId:string) {
    // Check if selectedDate is a valid Date object
    if (!(selectedDate instanceof Date && !isNaN(selectedDate.getTime()))) {
      // Handle the case where selectedDate is not a valid Date object
      console.error('Invalid date:', selectedDate);
      return of([]);; // or return an observable/error as appropriate
    }  
    // Set the start and end of the selected date
    const startOfDay = new Date(Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate(), 0, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate(), 23, 59, 59, 999));
  
    // Query based on date range
    const evidence = this.afs.collection('driversEvidence', ref =>
      ref.where('dateTimeStamp', '>=', startOfDay)
         .where('dateTimeStamp', '<=', endOfDay)
         .where('customerId', '==', customerId)
    );  
    return evidence.snapshotChanges();
  }


  getEvidenceDriversperDriver(selectedDate: string, uidDriver:string) {
    const evidence = this.afs.collection('driversEvidence', ref =>
      ref.where('date', '==', selectedDate)
         .where('uid', '==', uidDriver)
    );  
    return evidence.snapshotChanges();
  }

  getEvidenceByProgram(programId: string) {
    const evidence = this.afs.collection('driversEvidence', ref =>
      ref.where('programId', '==', programId)     
    );  
    return evidence.snapshotChanges();
  }

  getEvidenceByRoute(routeId: string) {
    const evidence = this.afs.collection('driversEvidence', ref =>
      ref.where('routeId', '==', routeId)     
    );  
    return evidence.snapshotChanges();
  }
}
