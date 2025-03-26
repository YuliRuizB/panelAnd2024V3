import { Injectable } from '@angular/core';
import { switchMap, map, take, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { of, combineLatest, Observable } from 'rxjs';
import { NzMessageDataOptions, NzMessageService } from 'ng-zorro-antd/message';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { uniq } from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  joined$: Observable<any> | undefined;   
   user: AngularFirestoreDocument<any> | undefined;
   usersCollection: AngularFirestoreCollection<any> | undefined;

  constructor(private afs: AngularFirestore, private message: NzMessageService) { 
    
  }
  getActiveCustomers(){
    const routes = this.afs.collection('customers', ref => 
      ref.where('active','==',true)
      );
      return routes.snapshotChanges();
  }

  getBoardingPassesByRoute() {   
    const today = new Date();
    this.joined$ = this.afs.collectionGroup('routesAccess', ref => ref.where('active', '==', true)).valueChanges()
      .pipe(
        take(1),
        switchMap((permissions:any) => {       
          const routeIds = uniq(permissions.map((p:any) => p.routeId
           ));
          return routeIds.length === 0 ? of([]) :
          combineLatest(
            of(permissions),
            combineLatest(
              routeIds.map( (routeId: any) =>                          
                this.afs.collectionGroup('boardingPasses', ref => 
                  ref.where('routeId', '==', routeId)
                     .where('active', '==', true)).snapshotChanges().pipe( //.where('validFrom','>=', today)
                  map((boardingPasses: any) => boardingPasses.map((bp:any) => {
                    const id = bp.payload.doc.id;
                    const data = bp.payload.doc.data();
                    const uid = bp.payload.doc.ref.parent.parent.id;
                    return { id, uid, ...data}
                  }))
                )
              )
            )
          )
        }),
       map(([permissions, boardingPasses]) => {
          const sanitized = boardingPasses.filter(item => !!item && item.length > 0);        
          return typeof sanitized != "undefined" ? sanitized.map((boardingPass:any) => {

            const permission = _.filter(permissions, (p) => {
                return boardingPass[0].routeId === p.routeId
            });        


            return {
              passes: [...boardingPass],
              permission: permission[0].active ? permission[0].active : false,
              permissionId: permission[0].id,
              customerId: permission[0].customerId || '',
              routeName:permission[0].routeName || '',
              customerName: permission[0].customerName || ''
            }
          }) : of([])
        }) 
      )
      return this.joined$;
  }

  

  getBoardingPassesByRoutebyCustomerId(vendorId: string, customerId: string) {    
    const today = new Date();
    this.joined$ = this.afs.collectionGroup('routesAccess', ref => ref
      .where('customerId', '==', customerId)
      .where('active', '==', true)).valueChanges()
      .pipe(
        take(1),
        switchMap((permissions: any[]) => {     
          const routeIds = _.uniq(permissions.map((p: any) => p.routeId));              
          if (routeIds.length === 0) {
            return of<[any[], any[]]>([permissions, []]);
          } else {
            return combineLatest([
              of(permissions),
              combineLatest(                
                routeIds.map((routeId: string) =>
                  this.afs.collectionGroup('boardingPasses', ref => ref.where('routeId', '==', routeId)).snapshotChanges().pipe(
                    map((boardingPasses: any[]) => boardingPasses.map((bp: any) => {
                      const id = bp.payload.doc.id;
                      const data = bp.payload.doc.data();
                      const uid = bp.payload.doc.ref.parent.parent?.id;
                      return { id, uid, ...data };
                    }))
                  )
                )
              )
            ]).pipe(
              map(([permissions, boardingPassesNested]) => {
                // Flatten nested arrays
                const boardingPasses = boardingPassesNested.flat();
                return [permissions, boardingPasses] as [any[], any[]];
              })
            );
          }
        }),
        map(([permissions, boardingPasses]) => {               
          const sanitized = boardingPasses.filter(item => !!item && item.length > 0);        
          return typeof sanitized != "undefined" ? boardingPasses.map((boardingPass:any) => {                    
         if (!Array.isArray(boardingPass) || boardingPass.length === 0) {
            const permission = _.filter(permissions, (p) => {            
                return boardingPass.routeId === p.routeId
            });
            return {
              passes: [...[boardingPass]],
              permission: permission[0].active ? permission[0].active : false,
              permissionId: permission[0].id,
              customerId: permission[0].customerId || '',
              routeName:permission[0].routeName || '',
              customerName: permission[0].customerName || ''
            }
          }  
          else {
            return {
              passes: [...boardingPass],
              permission: false,
              permissionId: null,
              customerId: '',
              routeName: '',
              customerName: ''
            };
          }
          }) : of([])
        }) 
      );
    return this.joined$;
  }

  getBoardingPassesByProduct(productId: string) {
    const today = new Date();

    this.joined$ = this.afs.collectionGroup('routesAccess', ref => ref.where('active', '==', true)).valueChanges()
      .pipe(
        take(1),
        switchMap((permissions:any) => {           
          const routeIds = uniq(permissions.map((p:any) => p.routeId
           ));
          return routeIds.length === 0 ? of([]) :
          combineLatest(
            of(permissions),
            combineLatest(
              routeIds.map( (routeId: any) =>                          
                //this.afs.collectionGroup('boardingPasses', ref => ref.where('routeId', '==', routeId)).snapshotChanges().pipe( //.where('product_id','==', productId)
                this.afs.collectionGroup('boardingPasses', ref => {
                  return ref
                    .where('routeId', '==', routeId)
                    .where('product_id', '==', productId);
                }).snapshotChanges().pipe(
                  map((boardingPasses: any) => boardingPasses.map( (bp:any) => {
                    const id = bp.payload.doc.id;
                    const data = bp.payload.doc.data();
                    const uid = bp.payload.doc.ref.parent.parent.id;
                    return { id, uid, ...data}
                  }))
                )
              )
            )
          )
        }),
        map(([permissions, boardingPasses]) => {       
          const sanitized = boardingPasses.filter(item => !!item && item.length > 0);        
          return typeof sanitized != "undefined" ? sanitized.map((boardingPass:any) => {           
            const permission = _.filter(permissions, (p) => {
                return boardingPass[0].routeId === p.routeId
            }); 
            return {
              passes: [...boardingPass],
              permission: permission[0].active ? permission[0].active : false,
              permissionId: permission[0].id,
              customerId: permission[0].customerId || '',
              routeName:permission[0].routeName || '',
              customerName: permission[0].customerName || ''
            }
          }) : of([])
        }) 
      )
      return this.joined$;
  }

  getBoardingPassesByTurn(productId: string, turno: string) {
    const today = new Date();
    this.joined$ = this.afs.collectionGroup('routesAccess', ref => ref.where('active', '==', true)).valueChanges()
      .pipe(
        take(1),
        switchMap((permissions:any) => {       
          const routeIds = uniq(permissions.map((p:any) => p.routeId
           ));
          return routeIds.length === 0 ? of([]) :
          combineLatest(
            of(permissions),
            combineLatest(
              routeIds.map( (routeId: any) =>                          
                //this.afs.collectionGroup('boardingPasses', ref => ref.where('routeId', '==', routeId)).snapshotChanges().pipe( //.where('product_id','==', productId)
                this.afs.collectionGroup('boardingPasses', ref => {
                  return ref
                    .where('routeId', '==', routeId)
                    .where('round', '==', turno)
                    .where('product_id', '==', productId);
                }).snapshotChanges().pipe(
                  map((boardingPasses: any) => boardingPasses.map( (bp:any) => {
                    const id = bp.payload.doc.id;
                    const data = bp.payload.doc.data();
                    const uid = bp.payload.doc.ref.parent.parent.id;
                    return { id, uid, ...data}
                  }))
                )
              )
            )
          )
        }),
       map(([permissions, boardingPasses]) => {       
          const sanitized = boardingPasses.filter(item => !!item && item.length > 0);        
          return typeof sanitized != "undefined" ? sanitized.map((boardingPass:any) => {

            const permission = _.filter(permissions, (p) => {
                return boardingPass[0].routeId === p.routeId
            });
            return {
              passes: [...boardingPass],
              permission: permission[0].active ? permission[0].active : false,
              permissionId: permission[0].id,
              customerId: permission[0].customerId || '',
              routeName:permission[0].routeName || '',
              customerName: permission[0].customerName || ''
            }
          }) : of([])
        }) 
      )
      return this.joined$;

  }  

  getBoardingPassesByAnticipos(productId: string) {
    const today = new Date();
    this.joined$ = this.afs.collectionGroup('routesAccess', ref => ref.where('active', '==', true)).valueChanges()
      .pipe(
        take(1),
        switchMap((permissions:any) => {         
          const routeIds = uniq(permissions.map((p:any) => p.routeId
           ));
          return routeIds.length === 0 ? of([]) :
          combineLatest(
            of(permissions),
            combineLatest(
              routeIds.map( (routeId: any) =>                          
               this.afs.collectionGroup('boardingPasses', ref => {
                  return ref
                    .where('routeId', '==', routeId)
                    .where('product_id', '==', productId)
                    .where('payment', '==', 'Anticipo');
                }).snapshotChanges().pipe(
                  map((boardingPasses: any) => boardingPasses.map( (bp:any) => {
                    const id = bp.payload.doc.id;
                    const data = bp.payload.doc.data();
                    const uid = bp.payload.doc.ref.parent.parent.id;
                    return { id, uid, ...data}
                  }))
                )
              )
            )
          )
        }),
       map(([permissions, boardingPasses]) => {       
          const sanitized = boardingPasses.filter(item => !!item && item.length > 0);        
          return typeof sanitized != "undefined" ? sanitized.map((boardingPass:any) => {

            const permission = _.filter(permissions, (p) => {
                return boardingPass[0].routeId === p.routeId
            });       
            return {
              passes: [...boardingPass],
              permission: permission[0].active ? permission[0].active : false,
              permissionId: permission[0].id,
              customerId: permission[0].customerId || '',
              routeName:permission[0].routeName || '',
              customerName: permission[0].customerName || ''
            }
          }) : of([])
        }) 
      )
      return this.joined$;
  }

  getBoardingPassRoutes() {
    const routes = this.afs.collectionGroup('routesAccess', ref => 
    ref.where('active','==',true)
    );
    return routes.snapshotChanges();
  }

  getBoardingPassRoute(productId: string) {
    const today = new Date();
    this.joined$ = this.afs.collectionGroup('routesAccess', ref => ref.where('active', '==', true)).valueChanges()
      .pipe(
        take(1),
        switchMap((permissions:any) => {         
          const routeIds = uniq(permissions.map((p:any) => p.routeId
           ));
          return routeIds.length === 0 ? of([]) :
          combineLatest(
            of(permissions),
            combineLatest(
              routeIds.map( (routeId: any) =>                          
               this.afs.collectionGroup('boardingPasses', ref => {
                  return ref
                    .where('routeId', '==', routeId)
                    .where('product_id', '==', productId)
                    .where('payment', '==', 'Anticipo')   
                    .where('baja', '==', '')                  
                    .where('promiseDate', '<=', new Date());                    
                }).snapshotChanges().pipe(
                  map((boardingPasses: any) => boardingPasses.map( (bp:any) => {
                    const id = bp.payload.doc.id;
                    const data = bp.payload.doc.data();
                    const uid = bp.payload.doc.ref.parent.parent.id;
                    return { id, uid, ...data}
                  }))
                )
              )
            )
          )
        }),
       map(([permissions, boardingPasses]) => {          
          const sanitized = boardingPasses.filter(item => !!item && item.length > 0);                 
          return typeof sanitized != "undefined" ? sanitized.map((boardingPass:any) => {

            const permission = _.filter(permissions, (p) => {
                return boardingPass[0].routeId === p.routeId
            });       
            return {           
              routeName:permission[0].routeName || '',
              routeId:permission[0].routeId || ''              
            }
          }) : of([])
        }) 
      )
      return this.joined$;
  }

  getBoardingPassBySingleRoute(productId: string, routeIdPrincipal:string) {   
    const today = new Date();
    this.joined$ = this.afs.collectionGroup('routesAccess', ref => 
    ref.where('active', '==', true)
      .where('routeId', '==', routeIdPrincipal)).valueChanges()
      .pipe(
        take(1),
        switchMap((permissions:any) => {         
          const routeIds = uniq(permissions.map((p:any) => p.routeId
           ));
          return routeIds.length === 0 ? of([]) :
          combineLatest(
            of(permissions),
            combineLatest(
              routeIds.map( (routeId: any) =>                          
               this.afs.collectionGroup('boardingPasses', ref => {
                  return ref
                    .where('routeId', '==', routeId)
                    .where('product_id', '==', productId)
                    .where('payment', '==', 'Anticipo')   
                    .where('baja', '==', '')                  
                    .where('promiseDate', '<=', new Date());                    
                }).snapshotChanges().pipe(
                  map((boardingPasses: any) => boardingPasses.map((bp:any) => {
                    const id = bp.payload.doc.id;
                    const data = bp.payload.doc.data();
                    const uid = bp.payload.doc.ref.parent.parent.id;
                    return { id, uid, ...data}
                  }))
                )
              )
            )
          )
        }),
       map(([permissions, boardingPasses]) => {            
          const sanitized = boardingPasses.filter(item => !!item && item.length > 0);        
          return typeof sanitized != "undefined" ? sanitized.map((boardingPass:any) => {
            const permission = _.filter(permissions, (p) => {
                return boardingPass[0].routeId === p.routeId
            });       
            return {
              passes: [...boardingPass],
              permission: permission[0].active ? permission[0].active : false,
              permissionId: permission[0].id,
              customerId: permission[0].customerId || '',
              routeName:permission[0].routeName || '',
              customerName: permission[0].customerName || ''
            }
          }) : of([])
        }) 
      )
      return this.joined$;
  }

  getBoardingPassesByCV(productId: string) {
    const today = new Date();
    this.joined$ = this.afs.collectionGroup('routesAccess', ref => ref.where('active', '==', true)).valueChanges()
      .pipe(
        take(1),
        switchMap((permissions:any) => {         
          const routeIds = uniq(permissions.map((p:any) => p.routeId
           ));
          return routeIds.length === 0 ? of([]) :
          combineLatest(
            of(permissions),
            combineLatest(
              routeIds.map( (routeId: any) =>                          
               this.afs.collectionGroup('boardingPasses', ref => {
                  return ref
                    .where('routeId', '==', routeId)
                    .where('product_id', '==', productId)
                    .where('payment', '==', 'Anticipo')   
                    .where('baja', '==', '')                  
                    .where('promiseDate', '<=', new Date());                    
                }).snapshotChanges().pipe(
                  map((boardingPasses: any) => boardingPasses.map( (bp:any) => {
                    const id = bp.payload.doc.id;
                    const data = bp.payload.doc.data();
                    const uid = bp.payload.doc.ref.parent.parent.id;
                    return { id, uid, ...data}
                  }))
                )
              )
            )
          )
        }),
       map(([permissions, boardingPasses]) => {           
          const sanitized = boardingPasses.filter(item => !!item && item.length > 0);        
          return typeof sanitized != "undefined" ? sanitized.map((boardingPass:any) => {

            const permission = _.filter(permissions, (p) => {
                return boardingPass[0].routeId === p.routeId
            });       
            return {
              passes: [...boardingPass],
              permission: permission[0].active ? permission[0].active : false,
              permissionId: permission[0].id,
              customerId: permission[0].customerId || '',
              routeName:permission[0].routeName || '',
              customerName: permission[0].customerName || ''
            }
          }) : of([])
        }) 
      )
      return this.joined$;
  }
  getBoardingPassActivityLog(userId: string, boardingPassId: string) {
    const activityLog = this.afs.collection('users').doc(userId).collection('boardingPasses').doc(boardingPassId).collection('activityLog', ref => ref.orderBy('created'));
    return activityLog.snapshotChanges();
  }

  getLastValidBoardingPass(userId: string) {
    const activityLogRef = this.afs.collection('users').doc(userId).collection('boardingPasses');
    return activityLogRef.stateChanges().pipe(
      take(1),
      map(actions => actions.map((a:any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return {id, ...data}
      }))
    );
  }

  updateUserAvatar(userId: string, photoURL: string) { 
    const vendorRef = this.afs.collection('users').doc(userId);
    vendorRef.update({photoURL}).then( () => {     
    }).catch( (err) => {     
      this.message.error('Hubo un error: ', err);      
    })
  }

  updateUserPreRegister(userId: string, status: string) {   
     const vendorRef = this.afs.collection('users').doc(userId);     
     vendorRef.update({status: status}).then( () => {      
     }).catch( (err) => {      
       this.message.error('Hubo un error: ', err);       
     })
   }
 
   updateUserPreRegisterE(userId: string, status: string, customerId:string, customerName:string) {   
    const vendorRef = this.afs.collection('drivers').doc(userId);   
    vendorRef.update({status: status, validCompanyRequest: status,
        customerId: customerId, customerName:customerName, active: true
     }).then( () => {      
    }).catch( (err) => {     
      this.message.error('Hubo un error: ', err);      
    })
  }

  updateUserCollection(uid: string, user: any) {   
    this.user =  this.afs.collection('users').doc(uid);
    return this.user.update(user).then(() => { 
    }).catch(err => {
      this.message.error(`¡Oops! Algo salió mal ... ${err}`);
    });
  }

  getUserInfo(userID:string){
    const InfoUser  = this.afs.collection("users").doc(userID); 
    return InfoUser.snapshotChanges();

  }
  getUserByCustomerInfo(customeId:string){
    const usersCollection = this.afs.collection("users", ref => ref.where('customerId', '==', customeId));
    return usersCollection.snapshotChanges();
   }
   
  getUserInfoByEmail(email:string) {
    const usersCollection = this.afs.collection("users", ref => ref.where('email', '==', email));
  return usersCollection.snapshotChanges();
  }

  getInternalUserByAccount(accountId:string){
    const usersCollection = this.afs.collection("users", ref => 
      ref.where('email', '==', 'internal')
         .where('customerId', '==' ,accountId));
    return usersCollection.snapshotChanges();
  }

  getUserByAccount(accountId:string){
    const usersCollection = this.afs.collection("users", ref => 
      ref.where('status', 'in', ['active', 'preRegister'])
          .where('token', '!=', null)
         .where('customerId', '==' ,accountId));
    return usersCollection.snapshotChanges();
  }

  getPreRegisterInfo() {
    const getpre = this.afs.collectionGroup('users', ref => 
    ref.where('status','==','preRegister')
      .orderBy('firstName','desc')
    );
    return getpre.valueChanges();
  }
  getPreRegisterInfoByCustomer(customerId:string) {
    const getpre = this.afs.collectionGroup('users', ref => 
    ref.where('status','==','preRegister')
      .where('customerId','==', customerId)
      .orderBy('firstName','desc')
    );
    return getpre.valueChanges();
  }
  getPreRegisterInfoE() {
    const getpre = this.afs.collectionGroup('drivers', ref => 
    ref.where('status','==','pending')
      .orderBy('firstName','desc')
    );
    return getpre.valueChanges();
  }

  getPreRegisterInfoEByVendor(vendorId:string) {
    const getpre = this.afs.collectionGroup('drivers', ref => 
    ref.where('status','==','pending')
    .where('vendorId','==',vendorId)
      .orderBy('firstName','desc')
    );
    return getpre.valueChanges();
  }

  getPreRegisterInfoEByCustomer(customerId:string) {
    const getpre = this.afs.collectionGroup('drivers', ref => 
    ref.where('status','==','pending')
    .where('customerId','==', customerId)
      .orderBy('firstName','desc')
    );
    return getpre.valueChanges();
  }

  getVendorId(customerId:string) {           
      const getpre = this.afs.collection('vendors', ref => 
        ref.where('customerId', '==', customerId)
          .where('active', '==', true)
      );
      return getpre.snapshotChanges();
  }

  getTransferInfoByCustomer(customerId:string) {
    const getpre = this.afs.collectionGroup('transfers', ref => 
    ref.where('status','!=','complete')
    
    .where('customerId','==', customerId)
      .orderBy('dateTime','desc')
    );
    return getpre.valueChanges({ idField: 'uid' });
  }
  getTransferInfo() {
    const getpre = this.afs.collectionGroup('transfers', ref => 
    ref.where('status','!=','complete')  
      .orderBy('dateTime','desc')
    );
    return getpre.valueChanges({ idField: 'uid' });
  }

  updateTransfer(uidTransfer: string, userId: string, status: string): Promise<boolean> {   
    return this.afs.collection('users')
      .doc(userId)
      .collection('transfers')
      .doc(uidTransfer)
      .update({ status: status })
      .then(() => Promise.resolve(true)) 
      .catch((err) => {
        this.message.error('Hubo un error: ' + err);  
        return Promise.resolve(false); 
      });
  }


}