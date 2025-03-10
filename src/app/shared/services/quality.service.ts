import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})

export class QualityService {

  fileCollection: AngularFirestoreCollection<any> | undefined;
  fCollection: AngularFirestoreCollection<any> | undefined;
  filesCollection: AngularFirestoreDocument<any> | undefined;
  constructor(private afs: AngularFirestore, public messageService: NzMessageService) { }

  getFiles() {
    const qualityFiles = this.afs.collectionGroup('quality', ref =>
      ref.where('active', '==', true)
        .orderBy('folder', 'desc')
    );
    return qualityFiles.valueChanges();
  }

  saveFileCollection(file: any) {

    const newId = this.afs.createId();
    file.uid = newId;
    const user = this.afs.collection('quality').doc(newId);
    return user.set(file);
  }

  deletePurchase(uid: string) {
    this.filesCollection = this.afs.collection('quality').doc(uid);
    this.filesCollection.delete()
      .then(() => {
        this.sendMessage('success', 'Se borro con éxito el Archivo');
      }).catch(err => {
        this.sendMessage('error', `¡Oops! Algo salió mal cuando se intentaba borrar un archivo ... ${err}`);
      });
  }

  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
  }

}