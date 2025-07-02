import { Injectable, NgZone, Type, inject } from '@angular/core';
import { Router } from '@angular/router';
//import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subscription, of } from 'rxjs';
import { switchMap, take, map, tap } from 'rxjs/operators';
//import * as firebase from 'firebase';
import { User1, Permission, Role } from '../interfaces/user.type';
import * as _ from 'lodash';
import { Auth, GoogleAuthProvider } from 'firebase/auth';
import { getAuth, updateProfile, User } from 'firebase/auth';
import { subscribe } from 'diagnostics_channel';
import firebase from 'firebase/compat';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  user: Observable<User1 | null | undefined>;
  role?: Role;
    static RolService: readonly any[] | Type<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private ngZone: NgZone,
    private notification: NzNotificationService
  ) {
   
    //// Get auth data, then get firestore user/*  */ document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          return this.afs.doc<User1>(`users/${user.uid}`).valueChanges();
        } else {         
          if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('user');         
          }
           return of(null);
        }
      })
    ); 
  }

  getUser() {
    return this.user;
  }

  // Sign in with email/password
  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result:any) => {
        this.ngZone.run(() => {
          if (!result.user.emailVerified) {
            this.notification.create(
              'warning',
              '¡Oops!, su cuenta no ha sido verificada',
              'Para continuar es necesario verificar su cuenta de correo electrónico.'
            );
           // this.router.navigate(['authentication/please-verify-email']);
          } else {           
            this.getAccessLevel(result.user.uid);
          }
        });
      }).catch((error) => {
        this.notification.create('error', 'Error..', error.message);
      });
  }

  async getAccessLevel(userId: string) {    
    const userRef$ = await this.afs.collection('users').doc(userId);
    userRef$.snapshotChanges().pipe(
      take(1),
      map( (a:any) => {
        const id = a.payload.id;
        const data = a.payload.data() as any;
        return { id: id, ...data }
      })
    ).subscribe( (user:any) => {
      const roles = ['admin', 'student', 'user'];
      const userRoles = ['admin', 'user']; 
      const hasRoleAccess = user.roles.some((role: string) => roles.includes(role));  
      if (Array.isArray(user)) {
        const hasIdSegment = user.some((item:any) => item.hasOwnProperty('idSegment'));
        if (!hasIdSegment) {
          //if not contains idSegment add one  JvgynF0jaP7n1S1oC7pX          
          const userSegRef = this.afs.collection('users').doc(userId);
          userSegRef.update({ idSegment: 'JvgynF0jaP7n1S1oC7pX' });       
        } 
      }
      if(!hasRoleAccess) {
        this.notification.create(
          'warning',
          '¡Oops!, su cuenta no tiene acceso a este sistema',
          'Si esto es un error, por favor contacte al administrador del sitio.'
        );
        this.signOut();
      } else {
        this.router.navigate(['/dashboard/admin']);
      } 
    })
  }

  // Sign up with email/password
  signUp(form: any) {
    const email = form.email;
    const password = form.password;
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.setUserData(result.user, form);
        this.sendVerificationMail();        
      }).catch((error) => {
        this.notification.create('error', 'Error de creación de Usuario', error);
      });
  }

  async sendVerificationMail() {
    try {
      const user = await this.afAuth.currentUser;
      
      if (user) {
        await user.sendEmailVerification();
        this.router.navigate(['authentication/verify-email']);
        this.notification.create('info', '¡Perfecto!', 'El correo ha sido enviado');
      } else {
        // Handle the case when there is no logged-in user
        this.notification.create('error', 'Error de verificación de correo', 'No hay usuario registrado');
      }
    } catch (error : any) {
      this.notification.create('error', 'Error de verificación de correo', error.message);
    }
  }

  // Reset Forggot password
  forgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        // tslint:disable-next-line: max-line-length
        this.notification.create('info', '¡Listo!', 'Se ha enviado un correo electrónico a su cuenta con la información necesaria para recuperar su contraseña.');
      }).catch((error) => {
        this.notification.create('error', '¡Oops!, algo salió mal ...', error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {   
    return (!!this.user);
  }

  // Sign in with Google
  googleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.setUserData(result.user);
      }).catch((error) => {
        this.notification.create('error', '¡Oops!, algo salió mal ...', error);
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user : any, form?: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      phoneNumber: form && form.phoneNumber ? form.phoneNumber : null,
      displayName: form.firstName + ' ' + form.lastName,//user.displayName ? user.displayName : form && form.firstName ? form.lastName : null,
      studentId: form && form.studentId ? form.studentId : null,
      photoURL:   user.photoURL,
      roles: [Role.admin],
      permissions: [Permission.canRead],
      emailVerified: user.emailVerified,
      name: form.firstName,
      firstName: form.firstName,
      lastName: form.lastName,
      customerName: form.customerName,
      customerId: form.customerId,
      round: form.round,      
      status: form && form.status !== undefined ? form.status : 'active',
      rolId: form && form.rolId !== undefined ? form.rolId :  '54YNS3xlSLPc6UzNq2HJ',
      roundTrip: form.roundTrip,
      turno: form.turno,
      idSegment: 'JvgynF0jaP7n1S1oC7pX',
      defaultRouteName: form.defaultRouteName,
      defaultRoute: form.defaultRoute,
      defaultRound: form.defaultRound
    };
    return userRef.set(userData, {
      merge: true
    }).then( (result) => {
      this.updateUserProfile(form);
    })
    .catch( err =>    this.notification.create('error', 'Error..', err));
  }

  getUserFromDatabase(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    // tslint:disable-next-line: no-shadowed-variable
    userRef.snapshotChanges().subscribe(user => {
      return user.payload.data();
    });
  }

  updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData = {
      emailVerified: user.emailVerified
    };
    // this.updateRolesAndPermissions(user);
    return userRef.set(userData, {
      merge: true
    })
    .then( (response : any)  =>   this.notification.create('sucess', 'Resultado..', response))
    .catch( err =>     this.notification.create('error', 'Error..', err));
  }

  updateUserProfile(form: { fullName: string | null | undefined; }) {
    const auth = getAuth();
    const user: User | null = auth.currentUser;
  
    if (user) {
      updateProfile(user, {
        displayName: form && form.fullName ? form.fullName : null,
        photoURL: 'https://example.com/jane-q-user/profile.jpg',
      }).then(() => {
        this.notification.create('sucess', 'Info ..', 'Actualizacion correcta' );
      }).catch((error) => {        
        this.notification.create('error', 'Error ..', error );
      });
    } else {
      this.notification.create('error', 'Error ..', 'No Existe un usuario loggeado en la aplicación' );
    }
  }

  googleLogin() {
    const provider = new GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider:any) {
    return this.afAuth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/authentication/login']);
    });
  }
}


function authState(auth: Auth) {
  throw new Error('Function not implemented.');
}

