//import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { log } from 'console';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  documentPath = 'admin/dashboard';
  dashboardItems: any;

  constructor(
    private afs: AngularFirestore,
    private notification: NzNotificationService,
    private aff: AngularFireFunctions
  ) {
    this.dashboardItems = this.afs.doc<any>(this.documentPath).valueChanges();
  }

  getDashboardItems() {
    return this.dashboardItems;
  }
  
  sendToDeviceMessage(infoToSend: any) {
    const sendFCMNotification = this.aff.httpsCallable('sendToDeviseMessage');
    sendFCMNotification(infoToSend).subscribe({
      next: (response: any) => {
      },
      error: (err: any) => {        
      }
    });
  }
  setChatMessage(data:object) {    
    const key = this.afs.createId();
    const sendChatMessage = this.afs.collection('chatMessages').doc(key);
    return sendChatMessage.set(data);
  }
  setMessage(data:object,idUser:string) { 
   const key = this.afs.createId();
    const sendMessage = this.afs.collection('users').doc(idUser).collection('messages').doc(key);
    return sendMessage.set(data);
  } 

  getUserChatMessages(userId:string, limit?: number){
    return this.afs.collection('chatMessages', (ref) => 
    ref
    .where('uid', '==', userId)
    ).snapshotChanges().pipe(
      map((actions:any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      }))
    )
  }

  getJobType(customerId: string) {
    const deviceDoc = this.afs.collection('customers').doc(customerId);
    return deviceDoc.snapshotChanges().pipe(
      map(snapshot => {
        const data = snapshot.payload.data() as any;
        const id = snapshot.payload.id;
        return { ...data, id };
      })
    );
  }
  getJobTypeInfo(jobtypeId: string) {
    const deviceDoc = this.afs.collection('jobType').doc(jobtypeId);
    return deviceDoc.snapshotChanges().pipe(
      map(snapshot => {
        const data = snapshot.payload.data() as any;
        const id = snapshot.payload.id;
        return { ...data, id };
      })
    );
  }
}
