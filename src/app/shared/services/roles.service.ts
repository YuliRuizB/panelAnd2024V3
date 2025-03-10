import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { NzMessageService } from 'ng-zorro-antd/message';
import { map, take } from 'rxjs/operators';
import { IFormRol } from '../interfaces/roles.type';


@Injectable({
  providedIn: 'root'
})
export class RolService {

  rol: AngularFirestoreDocument<any> | undefined;
  roles: AngularFirestoreDocument<any> | undefined;
  rolesCollection: AngularFirestoreCollection<any>;

  constructor(
    public messageService: NzMessageService,
    private afs: AngularFirestore
  ) {
    this.rolesCollection = this.afs.collection('roles');
  }

  getRol(uid: string) {
    this.roles = this.rolesCollection.doc(uid);
    return this.roles;
  }

  getFormRol(uid: string) {
    const activityLogRef = this.afs.collection('roles').doc(uid).collection('forms');
    return activityLogRef.stateChanges().pipe(
      take(1),
      map((actions: any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      }))
    );
  }

  getAllRoles() {
    const rolesRef = this.afs.collection('roles', ref =>
      ref.where('active', '==', "true")
    );
    return rolesRef.snapshotChanges();
  }

  updateRol(rolId: string, rol: any) {
    this.rol = this.afs.collection('roles').doc(rolId);
    return this.rol.update(rol).then(() => {
      this.sendMessage('success', 'Se actualizo el rol con Éxito. Favor Actualizar la pagina!');
    }).catch(err => {
      this.sendMessage('error', `¡Oops! Algo salió mal ... ${err}`);
    });
  }

  updateUserRol(rolId: string, rol: any) {
    this.rol = this.afs.collection('users').doc(rolId);
    return this.rol.update(rol).then(() => {
      this.sendMessage('success', 'Se Asigno correctamente el rol al usuario.!');
    }).catch(err => {
      this.sendMessage('error', `¡Oops! Algo salió mal ... ${err}`);
    });
  }

  deleteRol(rolId: string) {
    const rolRef = this.afs.collection('roles').doc(rolId);
    return rolRef.delete();
  }

  getAllForms() {
    const FormRef = this.afs.collection('form', ref =>
      ref.where('active', '==', "true")
    );
    return FormRef.snapshotChanges();
  }

  async createRol(rol: any): Promise<any> {
    const newRol = this.afs.createId();
    rol.uid = newRol;
    const rolN = this.afs.collection('roles').doc(newRol);
    return rolN.set(rol).then(() => {
      return newRol;
    })
  }

  async createFormRol(uid: string, id: string, name: string): Promise<any> {
    const newRolF = this.afs.createId();
    const formRol: IFormRol = {
      active: true,
      idForm: id,
      name: name,
      uid: newRolF
    };

    const rolFN = this.afs.collection('roles').doc(uid).collection('forms').doc(newRolF);
    return rolFN.set(formRol).then(() => {
      return newRolF;
    })
  }

  async deleteformRol(id: string, deleteId: string) {
    const userRolForm = this.afs.collection("roles").doc(id).collection('forms').doc(deleteId);
    return userRolForm.delete()
      .then(() => {
        this.sendMessage('sucess', " Se borro la forma del rol seleccionado");
      }).catch(err => {
        this.sendMessage('error', `¡Oops! Algo salió mal ... ${err}`);
      });
  }

  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
  }

}
