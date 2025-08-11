import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import 'firebase/firestore'
import { forkJoin } from 'rxjs';
import { bufferCount, map, mergeMap, reduce, switchMap, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MessageCenterService {
  constructor(
    private afs: AngularFirestore,
    private aff: AngularFireFunctions
  ) { }


  getUsersByCustomer(customerID: string) {
    let listOfUsers: any[] = [];
    // bring list of users per CostumerID
    const listUsersbyCustomer = this.afs.collection('users', (ref) => ref
      .where('customerId', '==', customerID)
      // .where('active', '==', true)
    ).snapshotChanges();

    return listUsersbyCustomer;
  }

  getUsersByRouteCustomer(customerID: string, idRoute: string) {
    let listOfUsers: any[] = [];
    // bring list of users per CostumerID
    const listUsersbyCustomer = this.afs.collection('users', (ref) => ref
      .where('customerId', '==', customerID)
    ).snapshotChanges();

    return listUsersbyCustomer;
  }

  getUserByRoundCustomer(round: string, idRoute: string, customerId: string) {   
    console.log("entro");
  
    //const today = new Date();
  
   /*  // Lista de usuarios por customerID
    const listUsersbyCustomer$ = this.afs
      .collection('users', (ref) => ref.where('customerId', '==', customerId))
      .snapshotChanges()
      .pipe(
        take(1), // Forzar que el observable se complete
        map((users: any) =>
          users.map((user: any) => ({                 
            id: user.payload.doc.id,
            ...user.payload.doc.data(),
          }))
        )
      );
   */   
      const usersBoardingPassesByCustomer = this.afs.collection('users', (ref) => ref        
          .where('defaultRoute', '==', idRoute)
          //.where('round', '==', round)
         // .where('token', '>=', today)
      );
      return usersBoardingPassesByCustomer;
  }

  getUserByRoundCustomerG(idRoute: string) {
  return this.afs.collection('users', (ref) =>
    ref.where('defaultRoute', '==', idRoute)
  ).snapshotChanges(); 
}
  
  getUserByRouteRound(round: string, idRoute: string) {

    const today = new Date();
    const usersBoardingPassesByCustomer = this.afs.collectionGroup('boardingPasses', ref =>
      ref
        .where('routeId', '==', idRoute)
        .where('round', '==', round)
        .where('validTo', '>=', today)
    );
    return usersBoardingPassesByCustomer;
  }

  getUserToken(userID: string) {
    const RefUser = this.afs.collection("users").doc(userID);
    return RefUser.snapshotChanges();
  }
}