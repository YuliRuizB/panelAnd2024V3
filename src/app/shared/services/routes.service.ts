import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
//import * as firebase from 'firebase/app';
import { GeoPoint } from 'firebase/firestore';
import { map, switchMap, catchError, retry } from 'rxjs/operators';
import * as _ from 'lodash';
import { Observable, combineLatest, of } from 'rxjs';
import { IVendor } from '../interfaces/vendor.type';
import { IRoute } from '../interfaces/route.type';
import { uniq } from 'lodash';
import { Route } from '@angular/router';
import { ConsoleSqlOutline } from '@ant-design/icons-angular/icons';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Customer {
  id: string;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  joined$: Observable<any> | undefined;


  constructor(private afs: AngularFirestore, private http: HttpClient) { }

  getRoutes(customerId: string) {
    const routes = this.afs.collection('customers').doc(customerId).collection('routes');
    return routes.snapshotChanges();
  }

  getInternalCustomer(customerId: string) {
    const routes = this.afs.collection('users', ref => ref
      .where('customerId', '==', customerId)
      .where('status', '==', 'internal'));
    return routes.snapshotChanges();
  }

  getQuotesByRouteandProgram(customerId: string, routeId: string, transportType: string) {
    const info = this.afs.collection('quotes', ref => ref
      .where('customerId', '==', customerId)
      .where('transportType', '==', transportType)
      .where('routeId', '==', routeId));
    return info.snapshotChanges();
  }


  getQuotesByRouteByBoardingPass(customerId: string, routeId: string, transportType: string) {
    const info = this.afs.collectionGroup('boardingPasses', ref => ref
      .where('customerId', '==', customerId)
      .where('routeId', '==', routeId));
    return info.snapshotChanges();
  }

  getProducts(customerId: string) {
    const routes = this.afs.collection('customers').doc(customerId).collection('products', ref =>
      ref.where('active', '==', true));
    return routes.snapshotChanges();
  }

  setRoute(customerId: string, routeObj: any) {
    const key = this.afs.createId();
    routeObj.routeId = key;
    const route = this.afs.collection('customers').doc(customerId).collection('routes').doc(key);
    return route.set(routeObj);
  }
  setRoute2(key: any, customerId: string, routeObj: any) {

    routeObj.routeId = key;
    const route = this.afs.collection('customers').doc(customerId).collection('routes').doc(key);
    return route.set(routeObj);
  }

  duplicateRouteWithStops(routeSource: any) {
    let routeObj = { ...routeSource };
    const key = this.afs.createId();
    const newRoute = {
      customerId: routeObj.duplicateCustomerId,
      customerName: routeObj.newCustomerName,
      active: false,
      description: routeObj.description,
      name: routeObj.name,
      routeId: key,
      initialStart: routeObj.initialStart
    }
    routeObj.routeId = key;
    const route = this.afs.collection('customers').doc(routeObj.duplicateCustomerId).collection('routes').doc(key);
    const stops = this.afs.collection('customers').doc(routeSource.customerId).collection('routes').doc(routeSource.routeId).collection('stops');
    return stops.get().toPromise().then((querySnapShot: any) => {
      return route.set(newRoute).then(() => {
        if (!querySnapShot.empty) {
          const newStopsRef = this.afs.collection('customers').doc(routeObj.duplicateCustomerId).collection('routes').doc(key).collection('stops');
          const docs = querySnapShot.docs;
          const promises: Promise<DocumentReference<any>>[] = docs.map((doc: any) => {
            const document = doc.data();
            return newStopsRef.add(document);
          });

          return Promise.all(promises) as unknown as Promise<void>;
        }
        return Promise.resolve();
      });
    });
  }

  toggleActiveRouteVendor(customerId: string, routeId: string, routeObj: any) {
    const ruteVendor = this.afs.collectionGroup('routesAccess', ref => ref
      .where('customerId', '==', customerId)
      .where('routeId', '==', routeId));

    return ruteVendor.get().toPromise().then(querySnapshot => {
      if (!querySnapshot) {
        throw new Error('Query snapshot is undefined.');
      }
      const batch = this.afs.firestore.batch();
      querySnapshot.forEach(doc => {
        batch.update(doc.ref, { active: !routeObj.active });
      });
      return batch.commit();
    }).catch(error => {
      console.error('Error updating route vendors: ', error);
      throw error;
    });
  }

  toggleActiveRoute(customerId: string, routeId: string, routeObj: any) {
    const route = this.afs.collection('customers').doc(customerId).collection('routes').doc(routeId);
    return route.update({ active: !routeObj.active });
  }

  deleteRoute(customerId: string, routeId: string) {
    const route = this.afs.collection('customers').doc(customerId).collection('routes').doc(routeId);
    return route.delete();
  }

  getAllRoutes() {
    const routes = this.afs.collectionGroup('routes', ref => ref.where('active', '==', true));
    return routes.snapshotChanges();
  }

  getRoutesByCustomer() {
    this.joined$ = this.afs.collection('customers', ref => ref.orderBy('name')).valueChanges({ idField: 'id' })
      .pipe(
        switchMap((customers: any) => {
          const customersIds = uniq(customers.map((c: any) => c.id))
          return combineLatest(
            of(customers),
            combineLatest(
              customersIds.map((customerId: any) =>  //TODO
                this.afs.collection('customers').doc(customerId).collection('routes', ref => ref.orderBy('name')).valueChanges({ idField: 'id' }).pipe(
                  map((routes: any) => {
                    return { ...routes, customerId }
                  })
                )
              )
            )
          )
        }),
        map(([customers, routes]: [any[], any[]]) => {
          return routes.map((route: any) => {
            const customer = _.filter(customers, (c) => {
              return route.customerId === c.id
            })
            delete route.customerId;
            return {
              routes: _.values(route),
              customerId: customer[0].id,
              customerName: customer[0].name
            }
          });
        })
      )
    return this.joined$;
  }

  getAuthorizedRoutes(vendorId: string) {
    this.joined$ = this.afs.collection('vendors').doc(vendorId).collection('routesAccess').valueChanges({ idField: 'id' })
      .pipe(
        switchMap((permissions: any) => {
          const routeIds = uniq(permissions.map((p: any) => p.routeId))
          return routeIds.length === 0 ? of([]) :
            combineLatest(
              of(permissions),
              combineLatest(
                routeIds.map((routeId: any) =>
                  this.afs.collectionGroup('routes', ref => ref.where('routeId', '==', routeId)).valueChanges().pipe(
                    map((routes: any) => routes[0]) // IRoute[]  TODO
                  )
                )
              )
            )
        }),
        map(([permissions, routes]) => {
          return typeof routes !== "undefined" ? routes
            .filter((route: any) => route) // Remove undefined values from routes
            .map((route: any) => {
              const permission = _.filter(permissions, (p) => {
                return route && route.routeId === p.routeId;
              });

              // Ensure that permission[0] is defined before accessing its properties
              return permission[0] ? {
                ...route,
                permission: permission[0].active || false,
                permissionId: permission[0].id,
                customerId: permission[0].customerId || '',
                customerName: permission[0].customerName || ''
              } : null; // Return null for cases where permission[0] is undefined
            }).filter((result: any) => result !== null) // Remove null values from the result array
            : of([]);
        })
      )
    return this.joined$;
  }

  getAllCustomersRoutes() {
    this.joined$ = this.afs.collection('customers', ref => ref.where('active', '==', true))
      .valueChanges({ idField: 'id' })
      .pipe(
        switchMap((customers: any) => {
          if (customers.length === 0) {
            return of([]);
          } else {
            const routeObservables = customers.map((customer: Customer) =>
              this.afs.collection('customers').doc(customer.id).collection<any>('routes').valueChanges().pipe(
                map((routes: any[]) => routes.map((route: any) => ({
                  ...route
                })))
              )
            );
            return combineLatest([of(customers), combineLatest(routeObservables)]);
          }
        }),
        map(([customers, routes]) => routes ? _.flatten(routes as IRoute[][]) : [])
      );

    return this.joined$;
  }

  getAllCustomersRoutesbyCustomer(customerId: string) {
    const customerRef = this.afs.collection('customers', ref => ref.where('active', '==', true))
      .doc(customerId)
      .collection('routes');

    return customerRef.snapshotChanges();
  }
  getCustomersRoutesbyCustomer(customerId: string, routeId: string) {
    const customerbyRoute = this.afs.collection('customers').doc(customerId).collection('routes').doc(routeId).collection('stops', ref => ref.where('active', '==', true).orderBy('order', 'asc'));
    return customerbyRoute.snapshotChanges();
  }

  getCustomersPolyLineCustomer(customerId: string, routeId: string) {
    const customerbyRoute = this.afs.collection('customers').doc(customerId).collection('routes').doc(routeId).collection('polyline');
    return customerbyRoute.snapshotChanges();
  }

  public getDirectionsWithStops(stopPoints: any): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }),
    };
    let api = `https://us-central1-andappssystem-c14f2.cloudfunctions.net/getDirectionsWithStops`;
    return this.http.post(api, { stopPoints: stopPoints }, httpOptions).pipe(
      retry(0),
    );
  }

  setPolyline(vert: any, customerId: string, routeId: string, polyline: any) {

    if (polyline.length < 2) {
      const key = this.afs.createId();
      const route = this.afs.collection('customers').doc(customerId).collection('routes').doc(routeId).collection('polyline').doc(key);
      return route.set(vert);
    } else {
      const route = this.afs.collection('customers').doc(customerId).collection('routes').doc(routeId).collection('polyline').doc(polyline);
      return route.update(vert);
    }
  }

  setAuthorizedRoutes(vendorId: string, record: any) {
    const vendorAuthorizedRoute = this.afs.collection('vendors').doc(vendorId).collection('routesAccess');
    return vendorAuthorizedRoute.add(record);
  }

  getVendorRoutes(vendorId: string) {
    return this.getRoutesArray(vendorId).pipe(
      map((actions: any) => actions.map((a: any) => {
        return a.payload.doc.data().routeId;
      })),
      switchMap(permissions => {
        return this.afs.collectionGroup('routes', ref => ref.where('routeId', 'in', permissions)).valueChanges();
      })
    );
  }

  getRoutesArray(vendorId: string) {
    const routesAccess = this.afs.collection('vendors').doc(vendorId).collection('routesAccess');
    return routesAccess.snapshotChanges();
  }

  getRouteStopPoints(accountId: string, routeId: string) {
    const stopPoints = this.afs.collection('customers').doc(accountId).collection('routes').doc(routeId).collection('stops', ref => ref.orderBy('order', 'asc'));
    return stopPoints.snapshotChanges();
  }

  //Vehicle Assignments

  getRouteVehicleAssignments(accountId: string, routeId: string, assignmentId: string, vendorId: string) {
    const routeVehicleAssignments = this.afs.collection('customers').doc(accountId).collection('routes').doc(routeId).collection('vehicleAssignments', ref => ref.where('assignmentId', '==', assignmentId).where('vendorId', '==', vendorId));
    return routeVehicleAssignments.snapshotChanges();
  }

  setRouteVehicleAssignments(accountId: string, routeId: string, assignment: any) {
    const routeVehicleAssignments = this.afs.collection('customers').doc(accountId).collection('routes').doc(routeId).collection('vehicleAssignments');
    return routeVehicleAssignments.add(assignment);
  }

  updateRouteVehicleAssignment(accountId: string, routeId: string, assignmentId: string, assignment: any) {
    const routeVehicleAssignment = this.afs.collection('customers').doc(accountId).collection('routes').doc(routeId).collection('vehicleAssignments').doc(assignmentId);
    return routeVehicleAssignment.update(assignment);
  }

  toggleRouteVehicleAssignment(accountId: string, routeId: string, assignmentId: string, assignment: any) {
    const routeVehicleAssignment = this.afs.collection('customers').doc(accountId).collection('routes').doc(routeId).collection('vehicleAssignments').doc(assignmentId);
    return routeVehicleAssignment.update({ active: !assignment.active });
  }

  deleteRouteVehicleAssignments(accountId: string, routeId: string, assignmentId: string) {
    const routeVehicleAssignment = this.afs.collection('customers').doc(accountId).collection('routes').doc(routeId).collection('vehicleAssignments').doc(assignmentId);
    return routeVehicleAssignment.delete();
  }

  //Route Assignments

  getRouteAssignments(accountId: string, routeId: string) {
    const routeAssignments = this.afs.collection('customers').doc(accountId).collection('routes').doc(routeId).collection('assignments');
    return routeAssignments.snapshotChanges();
  }

  getCustomerVendorAssignments(accountId: string) {
    const routeAssignments = this.afs.collectionGroup('assignments', ref => ref.where('customerId', '==', accountId).orderBy('time'));
    return routeAssignments.snapshotChanges();
  }

  deleteCustomerVendorAssignment(assignmentId: string, accountId: string) {
    const assignment = this.afs.collection('customers').doc(accountId).collection('program').doc(assignmentId);
    return assignment.delete();
  }

  getCustomerVendorAssignmentsByDay(date: Date) {
    let searchField = '';
    const dayNumber = date.getDay();

    switch (dayNumber) {
      case 0:
        searchField = 'isSunday';
        break;
      case 1:
        searchField = 'isMonday';
        break;
      case 2:
        searchField = 'isTuesday';
        break;
      case 3:
        searchField = 'isWednesday';
        break;
      case 4:
        searchField = 'isThursday';
        break;
      case 5:
        searchField = 'isFriday';
        break;
      case 6:
        searchField = 'isSaturday';
        break;
      default:
        break;
    }
    const routeAssignments = this.afs.collectionGroup('assignments', ref => ref.where(searchField, '==', true).where('active', '==', true));
    return routeAssignments.snapshotChanges();
  }

  getVendorVehicleAssignments(vendorId: string) {
    const assignments = this.afs.collectionGroup('vehicleAssignments', ref => ref.where('vendorId', '==', vendorId).where('active', '==', true));
    return assignments.snapshotChanges();
  }

  setRouteAssignments(accountId: string, routeId: string, assignment: any) {
    const routeAssignments = this.afs.collection('customers').doc(accountId).collection('routes').doc(routeId).collection('assignments');
    return routeAssignments.add(assignment);
  }

  updateRouteAssignment(accountId: string, routeId: string, assignmentId: string, assignment: any) {
    const routeAssignment = this.afs.collection('customers').doc(accountId).collection('routes').doc(routeId).collection('assignments').doc(assignmentId);
    return routeAssignment.update(assignment);
  }

  toggleRouteAssignment(accountId: string, routeId: string, assignmentId: string, assignment: any) {
    const routeAssignment = this.afs.collection('customers').doc(accountId).collection('routes').doc(routeId).collection('assignments').doc(assignmentId);
    return routeAssignment.update({ active: !assignment.active });
  }

  deleteRouteAssignments(accountId: string, routeId: string, assignmentId: string) {
    const routeAssignment = this.afs.collection('customers').doc(accountId).collection('routes').doc(routeId).collection('assignments').doc(assignmentId);
    return routeAssignment.delete();
  }

  getRoute(accountId: string, routeId: string) {
    const routeRef = this.afs.collection('customers').doc(accountId).collection('routes').doc(routeId);
    return routeRef.snapshotChanges();
  }

  updateStopPoint(accountId: string, routeId: string, object: any) {
    let wrappedData = object;
    wrappedData.rounds = {
      round1: object.round1,
      round2: object.round2,
      round3: object.round3
    };
    //wrappedData.geopoint = new firebase.firestore.GeoPoint(+object.latitude, +object.longitude);   
    wrappedData.geopoint = new GeoPoint(+object.latitude, +object.longitude);
    const stopPoint = this.afs.collection('customers').doc(accountId).collection('routes').doc(routeId).collection('stops').doc(object.id);
    return stopPoint.update(wrappedData);
  }

  createStopPoint(accountId: string, routeId: string, object: any) {
    let wrappedData = object;
    wrappedData.rounds = {
      round1: object.round1,
      round2: object.round2,
      round3: object.round3,
      round1MinutesSinceStart: object.round1MinutesSinceStart,
      round2MinutesSinceStart: object.round2MinutesSinceStart,
      round3MinutesSinceStart: object.round3MinutesSinceStart
    };
    //wrappedData.geopoint = new firebase.firestore.GeoPoint(+object.latitude, +object.longitude);
    wrappedData.geopoint = new GeoPoint(+object.latitude, +object.longitude);
    const stopPoint = this.afs.collection('customers').doc(accountId).collection('routes').doc(routeId).collection('stops').doc(object.id);
    return stopPoint.set(wrappedData);
  }

  toggleActiveStopPoint(accountId: string, routeId: string, object: any) {
    const state = !object.active;
    const stopPoint = this.afs.collection('customers').doc(accountId).collection('routes').doc(routeId).collection('stops').doc(object.id);
    return stopPoint.update({ active: state });
  }

  toggleActiveVendorRouteAccess(vendorId: string, routeId: string, object: any) {
    const state = !object.permission;
    const routeAccess = this.afs.collection('vendors').doc(vendorId).collection('routesAccess').doc(routeId);
    return routeAccess.update({ active: state });
  }

  deleteVendorRouteAccess(vendorId: string, routeId: string) {
    const routeAccess = this.afs.collection('vendors').doc(vendorId).collection('routesAccess').doc(routeId);
    return routeAccess.delete();
  }
}
