import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { increment, serverTimestamp } from 'firebase/firestore';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  //db = firebase.firestore();
  usersCollection: AngularFirestoreCollection<any> | undefined;
  userSubscription: Subscription | undefined;
  
  constructor(private afs: AngularFirestore , private messageService: NzMessageService
  ) { }

  getAccounts() {
    const accounts = this.afs.collection('customers', ref => 
    ref.orderBy('active', 'desc').orderBy('name', 'desc')
  );
  return accounts.snapshotChanges();
  
  }

  getAccountsByCustomer(customerId: string ) {
    const accounts =this.afs.collection('customers').doc(customerId);
  return accounts.snapshotChanges();
  
  }
  getStopsByCustomer(customerId: string, route:any ) {
    const accounts = this.afs.collection('customers').doc(customerId)
      .collection('routes').doc(route).collection('stops', 
      ref => ref.orderBy('order', 'asc').where('active', '==', true));
    return accounts.snapshotChanges();
  }

  getUsersByCustomer(accountid:string){
    const users = this.afs.collection<any>('users', ref => 
      ref.where('customerId', '==', accountid)  
  //  .where('occupation','!=', 'internal')    
    .where('rolId','!=', '')
      .orderBy('displayName'));  
      return users.snapshotChanges();    
  }


  getSegmentLevel(segmentId: string) {  
    const segment = this.afs.collection('segment').doc(segmentId);
    return segment.snapshotChanges();
  }

  getAccount(accountId: string) {
    const account = this.afs.collection('customers').doc(accountId);
    return account.snapshotChanges();
  }

  getJobType() {
    const account = this.afs.collection('jobType');
    return account.snapshotChanges();
  }

  updateJobType(jobTypeId: string, updatedJobType: any) {
    const jobType = this.afs.collection('jobType').doc(jobTypeId);
    return jobType.update({consecutive : updatedJobType});
  }

  updateAccount(accountId: string, updatedAccount: any) {
    const account = this.afs.collection('customers').doc(accountId);
    return account.update(updatedAccount);
  }

  updateAvatarAccount(accountId: string, url: any) {
    const accRef = this.afs.collection('customers').doc(accountId);
    accRef.update({imageUrl : url }).then( () => {
    }).catch( (err) => {
      this.sendMessage('error', err);
    })
  }

  setAccount(account: any,cusCons :string) {  
    const docId = this.afs.createId();  
    const last_updated = serverTimestamp();
    const newAccountRef = this.afs.collection('customers').doc(docId);
    const newPublicAccountRef = this.afs.collection('pCustomers').doc(docId);
   // const stats = this.afs.collection('summarized').doc('ZcVXcD1p4O7mYjwBIiLv');
    const batch = this.afs.firestore.batch();
    this.createUserForAccount(account, docId)
    batch.set(newAccountRef.ref, account);
    batch.set(newPublicAccountRef.ref, { name: account.name, active: false , custConsecutive: account.custConsecutive});
    //batch.set(stats.ref, { currentAccounts: increment(1), last_updated }, {merge: true});
    return batch.commit();
  }

  createUserForAccount(data: any, docId:any){
    const newdocId = this.afs.createId(); 
    const userData = {    
      email: "internal",
      displayName: data.name,
      firstName:null,
      lastName: null,
      photoURL: null,
      emailVerified: false,
      occupation: 'internal',      
      username: data.name,
      _isEditMode: false,    
      customerName: data.name,
      customerId: docId,
      studentId: null,
      terms: true,
			rulesAccepted:true,
			roundTrip: null,
			defaultRoute: null,
			phoneNumber: null,
			status: "internal",		
      uid: newdocId
    }
     
    const newAccountRef = this.afs.collection('users').doc(newdocId);   
    const batch = this.afs.firestore.batch();
    batch.set(newAccountRef.ref, userData);
    batch.commit();
  }

  deleteAccount(accountId: string ) {
    const docId = accountId;   
    const last_updated = serverTimestamp();
    const accountRef = this.afs.collection('customers').doc(docId);
    const publicAccountRef = this.afs.collection('pCustomers').doc(docId);
   // const stats = this.afs.collection('summarized').doc('ZcVXcD1p4O7mYjwBIiLv');
   this.getUserAccountDelete(accountId);
    const batch = this.afs.firestore.batch(); 
    batch.delete(accountRef.ref);
    batch.delete(publicAccountRef.ref);
    //batch.set(stats.ref, { currentAccounts: decrement(1), last_updated }, {merge: true});
    return batch.commit();
  }

  getUserAccountDelete(accountid:string) {
    this.usersCollection = this.afs.collection<any>('users', ref => 
      ref.where('status', '==', 'internal')
      .where('customerId', '==', accountid)
     .where('occupation','==', 'internal')    
      .orderBy('displayName'));    
    this.userSubscription = this.usersCollection.snapshotChanges().pipe(
      map((actions:any) => actions.map((a: { payload: { doc: { id: any; data: () => any; }; }; }) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      }))
    ).subscribe(users => {     
      const accountRef = this.afs.collection('user').doc(users[0]['uid']);
      const batch = this.afs.firestore.batch(); 
      batch.delete(accountRef.ref);
      batch.commit();
    });
  }

  getUserAccountDeleteByData(defaultRoute: string) {
    this.usersCollection = this.afs.collection<any>('users', ref => 
      ref.where('customerId', '==', '2SneRDolNMtXg4DIuIfN')
         .where('defaultRoute', '==', defaultRoute)
         .orderBy('displayName')
    );  
    this.userSubscription = this.usersCollection.snapshotChanges().pipe(
      map((actions: any) => actions.map((a: { payload: { doc: { id: any; data: () => any; }; }; }) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data };
      }))
    ).subscribe(users => {      
      // Eliminar cada usuario individualmente
      users.forEach((user: any) => {
        const accountRef = this.afs.collection('user').doc(user['uid']);
        accountRef.delete().then(() => {          
          this.sendMessage('sucess',`Usuario ${user['uid']} eliminado.`);
        }).catch(error => {
          this.sendMessage('error', error);          
        });
      });
    });
  }

  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
  }
  
  toggleAccountActive(accountId: string, active: boolean) {
    const docId = accountId;
    const accountRef = this.afs.collection('customers').doc(docId);
    const publicAccountRef = this.afs.collection('pCustomers').doc(docId);
    const batch = this.afs.firestore.batch();
    batch.set(accountRef.ref, { active: !active}, { merge: true});
    batch.set(publicAccountRef.ref, { active: !active}, { merge: true});
    return batch.commit();
  }
}


