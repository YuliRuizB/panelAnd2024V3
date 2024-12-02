import "./chunk-OOHQ6TNY.js";
import "./chunk-YJYO35OO.js";
import {
  AngularFireAuth,
  LANGUAGE_CODE,
  PERSISTENCE,
  SETTINGS,
  TENANT_ID,
  USE_DEVICE_LANGUAGE,
  USE_EMULATOR,
  ɵauthFactory
} from "./chunk-5QARVZ6X.js";
import "./chunk-7IDWXSTZ.js";
import "./chunk-NLUINXX6.js";
import "./chunk-JYCGFZ6T.js";
import "./chunk-F5IP7QTX.js";
import {
  isPlatformServer
} from "./chunk-JGFQOLSF.js";
import {
  FIREBASE_APP_NAME,
  FIREBASE_OPTIONS,
  ɵcacheInstance,
  ɵfirebaseAppFactory
} from "./chunk-3W4W2VH3.js";
import {
  VERSION,
  keepUnstableUntilFirst,
  ɵAngularFireSchedulers,
  ɵAppCheckInstances
} from "./chunk-2UIANQ4E.js";
import {
  firebase
} from "./chunk-7M3FFL27.js";
import "./chunk-JG6RQBBX.js";
import {
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
  NgZone,
  Optional,
  PLATFORM_ID,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-ML5QYFST.js";
import "./chunk-AFLHQOKZ.js";
import "./chunk-J77I636K.js";
import {
  Observable,
  asyncScheduler,
  distinctUntilChanged,
  filter,
  from,
  map,
  of,
  pairwise,
  scan,
  startWith
} from "./chunk-GTSLNI4O.js";
import "./chunk-SM3G46PA.js";
import {
  __spreadValues
} from "./chunk-Y6Q6HMFU.js";

// node_modules/@angular/fire/fesm2022/angular-fire-compat-firestore.mjs
function _fromRef(ref, scheduler = asyncScheduler) {
  return new Observable((subscriber) => {
    let unsubscribe;
    if (scheduler != null) {
      scheduler.schedule(() => {
        unsubscribe = ref.onSnapshot({
          includeMetadataChanges: true
        }, subscriber);
      });
    } else {
      unsubscribe = ref.onSnapshot({
        includeMetadataChanges: true
      }, subscriber);
    }
    return () => {
      if (unsubscribe != null) {
        unsubscribe();
      }
    };
  });
}
function fromRef(ref, scheduler) {
  return _fromRef(ref, scheduler);
}
function fromDocRef(ref, scheduler) {
  return fromRef(ref, scheduler).pipe(startWith(void 0), pairwise(), map((snapshots) => {
    const [priorPayload, payload] = snapshots;
    if (!payload.exists) {
      return {
        payload,
        type: "removed"
      };
    }
    if (!priorPayload?.exists) {
      return {
        payload,
        type: "added"
      };
    }
    return {
      payload,
      type: "modified"
    };
  }));
}
function fromCollectionRef(ref, scheduler) {
  return fromRef(ref, scheduler).pipe(map((payload) => ({
    payload,
    type: "query"
  })));
}
var AngularFirestoreDocument = class {
  ref;
  afs;
  /**
   * The constructor takes in a DocumentReference to provide wrapper methods
   * for data operations, data streaming, and Symbol.observable.
   */
  constructor(ref, afs) {
    this.ref = ref;
    this.afs = afs;
  }
  /**
   * Create or overwrite a single document.
   */
  set(data, options) {
    return this.ref.set(data, options);
  }
  /**
   * Update some fields of a document without overwriting the entire document.
   */
  update(data) {
    return this.ref.update(data);
  }
  /**
   * Delete a document.
   */
  delete() {
    return this.ref.delete();
  }
  /**
   * Create a reference to a sub-collection given a path and an optional query
   * function.
   */
  collection(path, queryFn) {
    const collectionRef = this.ref.collection(path);
    const {
      ref,
      query
    } = associateQuery(collectionRef, queryFn);
    return new AngularFirestoreCollection(ref, query, this.afs);
  }
  /**
   * Listen to snapshot updates from the document.
   */
  snapshotChanges() {
    const scheduledFromDocRef$ = fromDocRef(this.ref, this.afs.schedulers.outsideAngular);
    return scheduledFromDocRef$.pipe(keepUnstableUntilFirst);
  }
  valueChanges(options = {}) {
    return this.snapshotChanges().pipe(map(({
      payload
    }) => options.idField ? __spreadValues(__spreadValues({}, payload.data()), {
      [options.idField]: payload.id
    }) : payload.data()));
  }
  /**
   * Retrieve the document once.
   */
  get(options) {
    return from(this.ref.get(options)).pipe(keepUnstableUntilFirst);
  }
};
function docChanges(query, scheduler) {
  return fromCollectionRef(query, scheduler).pipe(startWith(void 0), pairwise(), map((actionTuple) => {
    const [priorAction, action] = actionTuple;
    const docChanges2 = action.payload.docChanges();
    const actions = docChanges2.map((change) => ({
      type: change.type,
      payload: change
    }));
    if (priorAction && JSON.stringify(priorAction.payload.metadata) !== JSON.stringify(action.payload.metadata)) {
      action.payload.docs.forEach((currentDoc, currentIndex) => {
        const docChange = docChanges2.find((d) => d.doc.ref.isEqual(currentDoc.ref));
        const priorDoc = priorAction?.payload.docs.find((d) => d.ref.isEqual(currentDoc.ref));
        if (docChange && JSON.stringify(docChange.doc.metadata) === JSON.stringify(currentDoc.metadata) || !docChange && priorDoc && JSON.stringify(priorDoc.metadata) === JSON.stringify(currentDoc.metadata)) {
        } else {
          actions.push({
            type: "modified",
            payload: {
              oldIndex: currentIndex,
              newIndex: currentIndex,
              type: "modified",
              doc: currentDoc
            }
          });
        }
      });
    }
    return actions;
  }));
}
function sortedChanges(query, events, scheduler) {
  return docChanges(query, scheduler).pipe(
    scan((current, changes) => combineChanges(current, changes.map((it) => it.payload), events), []),
    distinctUntilChanged(),
    // cut down on unneed change cycles
    map((changes) => changes.map((c) => ({
      type: c.type,
      payload: c
    })))
  );
}
function combineChanges(current, changes, events) {
  changes.forEach((change) => {
    if (events.indexOf(change.type) > -1) {
      current = combineChange(current, change);
    }
  });
  return current;
}
function sliceAndSplice(original, start, deleteCount, ...args) {
  const returnArray = original.slice();
  returnArray.splice(start, deleteCount, ...args);
  return returnArray;
}
function combineChange(combined, change) {
  switch (change.type) {
    case "added":
      if (combined[change.newIndex] && combined[change.newIndex].doc.ref.isEqual(change.doc.ref)) {
      } else {
        return sliceAndSplice(combined, change.newIndex, 0, change);
      }
      break;
    case "modified":
      if (combined[change.oldIndex] == null || combined[change.oldIndex].doc.ref.isEqual(change.doc.ref)) {
        if (change.oldIndex !== change.newIndex) {
          const copiedArray = combined.slice();
          copiedArray.splice(change.oldIndex, 1);
          copiedArray.splice(change.newIndex, 0, change);
          return copiedArray;
        } else {
          return sliceAndSplice(combined, change.newIndex, 1, change);
        }
      }
      break;
    case "removed":
      if (combined[change.oldIndex] && combined[change.oldIndex].doc.ref.isEqual(change.doc.ref)) {
        return sliceAndSplice(combined, change.oldIndex, 1);
      }
      break;
  }
  return combined;
}
function validateEventsArray(events) {
  if (!events || events.length === 0) {
    events = ["added", "removed", "modified"];
  }
  return events;
}
var AngularFirestoreCollection = class {
  ref;
  query;
  afs;
  /**
   * The constructor takes in a CollectionReference and Query to provide wrapper methods
   * for data operations and data streaming.
   *
   * Note: Data operation methods are done on the reference not the query. This means
   * when you update data it is not updating data to the window of your query unless
   * the data fits the criteria of the query. See the AssociatedRefence type for details
   * on this implication.
   */
  constructor(ref, query, afs) {
    this.ref = ref;
    this.query = query;
    this.afs = afs;
  }
  /**
   * Listen to the latest change in the stream. This method returns changes
   * as they occur and they are not sorted by query order. This allows you to construct
   * your own data structure.
   */
  stateChanges(events) {
    let source = docChanges(this.query, this.afs.schedulers.outsideAngular);
    if (events && events.length > 0) {
      source = source.pipe(map((actions) => actions.filter((change) => events.indexOf(change.type) > -1)));
    }
    return source.pipe(
      // We want to filter out empty arrays, but always emit at first, so the developer knows
      // that the collection has been resolve; even if it's empty
      startWith(void 0),
      pairwise(),
      filter(([prior, current]) => current.length > 0 || !prior),
      map(([, current]) => current),
      keepUnstableUntilFirst
    );
  }
  /**
   * Create a stream of changes as they occur it time. This method is similar to stateChanges()
   * but it collects each event in an array over time.
   */
  auditTrail(events) {
    return this.stateChanges(events).pipe(scan((current, action) => [...current, ...action], []));
  }
  /**
   * Create a stream of synchronized changes. This method keeps the local array in sorted
   * query order.
   */
  snapshotChanges(events) {
    const validatedEvents = validateEventsArray(events);
    const scheduledSortedChanges$ = sortedChanges(this.query, validatedEvents, this.afs.schedulers.outsideAngular);
    return scheduledSortedChanges$.pipe(keepUnstableUntilFirst);
  }
  valueChanges(options = {}) {
    return fromCollectionRef(this.query, this.afs.schedulers.outsideAngular).pipe(map((actions) => actions.payload.docs.map((a) => {
      if (options.idField) {
        return __spreadValues(__spreadValues({}, a.data()), {
          [options.idField]: a.id
        });
      } else {
        return a.data();
      }
    })), keepUnstableUntilFirst);
  }
  /**
   * Retrieve the results of the query once.
   */
  get(options) {
    return from(this.query.get(options)).pipe(keepUnstableUntilFirst);
  }
  /**
   * Add data to a collection reference.
   *
   * Note: Data operation methods are done on the reference not the query. This means
   * when you update data it is not updating data to the window of your query unless
   * the data fits the criteria of the query.
   */
  add(data) {
    return this.ref.add(data);
  }
  /**
   * Create a reference to a single document in a collection.
   */
  doc(path) {
    return new AngularFirestoreDocument(this.ref.doc(path), this.afs);
  }
};
var AngularFirestoreCollectionGroup = class {
  query;
  afs;
  /**
   * The constructor takes in a CollectionGroupQuery to provide wrapper methods
   * for data operations and data streaming.
   */
  constructor(query, afs) {
    this.query = query;
    this.afs = afs;
  }
  /**
   * Listen to the latest change in the stream. This method returns changes
   * as they occur and they are not sorted by query order. This allows you to construct
   * your own data structure.
   */
  stateChanges(events) {
    if (!events || events.length === 0) {
      return docChanges(this.query, this.afs.schedulers.outsideAngular).pipe(keepUnstableUntilFirst);
    }
    return docChanges(this.query, this.afs.schedulers.outsideAngular).pipe(map((actions) => actions.filter((change) => events.indexOf(change.type) > -1)), filter((changes) => changes.length > 0), keepUnstableUntilFirst);
  }
  /**
   * Create a stream of changes as they occur it time. This method is similar to stateChanges()
   * but it collects each event in an array over time.
   */
  auditTrail(events) {
    return this.stateChanges(events).pipe(scan((current, action) => [...current, ...action], []));
  }
  /**
   * Create a stream of synchronized changes. This method keeps the local array in sorted
   * query order.
   */
  snapshotChanges(events) {
    const validatedEvents = validateEventsArray(events);
    const scheduledSortedChanges$ = sortedChanges(this.query, validatedEvents, this.afs.schedulers.outsideAngular);
    return scheduledSortedChanges$.pipe(keepUnstableUntilFirst);
  }
  valueChanges(options = {}) {
    const fromCollectionRefScheduled$ = fromCollectionRef(this.query, this.afs.schedulers.outsideAngular);
    return fromCollectionRefScheduled$.pipe(map((actions) => actions.payload.docs.map((a) => {
      if (options.idField) {
        return __spreadValues({
          [options.idField]: a.id
        }, a.data());
      } else {
        return a.data();
      }
    })), keepUnstableUntilFirst);
  }
  /**
   * Retrieve the results of the query once.
   */
  get(options) {
    return from(this.query.get(options)).pipe(keepUnstableUntilFirst);
  }
};
var ENABLE_PERSISTENCE = new InjectionToken("angularfire2.enableFirestorePersistence");
var PERSISTENCE_SETTINGS = new InjectionToken("angularfire2.firestore.persistenceSettings");
var SETTINGS2 = new InjectionToken("angularfire2.firestore.settings");
var USE_EMULATOR2 = new InjectionToken("angularfire2.firestore.use-emulator");
function associateQuery(collectionRef, queryFn = (ref) => ref) {
  const query = queryFn(collectionRef);
  const ref = collectionRef;
  return {
    query,
    ref
  };
}
var AngularFirestore = class _AngularFirestore {
  schedulers;
  firestore;
  persistenceEnabled$;
  /**
   * Each Feature of AngularFire has a FirebaseApp injected. This way we
   * don't rely on the main Firebase App instance and we can create named
   * apps and use multiple apps.
   */
  constructor(options, name, shouldEnablePersistence, settings, platformId, zone, schedulers, persistenceSettings, _useEmulator, auth, useAuthEmulator, authSettings, tenantId, languageCode, useDeviceLanguage, persistence, _appCheckInstances) {
    this.schedulers = schedulers;
    const app = ɵfirebaseAppFactory(options, zone, name);
    const useEmulator = _useEmulator;
    if (auth) {
      ɵauthFactory(app, zone, useAuthEmulator, tenantId, languageCode, useDeviceLanguage, authSettings, persistence);
    }
    [this.firestore, this.persistenceEnabled$] = ɵcacheInstance(`${app.name}.firestore`, "AngularFirestore", app.name, () => {
      const firestore = zone.runOutsideAngular(() => app.firestore());
      if (settings) {
        firestore.settings(settings);
      }
      if (useEmulator) {
        firestore.useEmulator(...useEmulator);
      }
      if (shouldEnablePersistence && !isPlatformServer(platformId)) {
        const enablePersistence = () => {
          try {
            return from(firestore.enablePersistence(persistenceSettings || void 0).then(() => true, () => false));
          } catch (e) {
            if (typeof console !== "undefined") {
              console.warn(e);
            }
            return of(false);
          }
        };
        return [firestore, zone.runOutsideAngular(enablePersistence)];
      } else {
        return [firestore, of(false)];
      }
    }, [settings, useEmulator, shouldEnablePersistence]);
  }
  collection(pathOrRef, queryFn) {
    let collectionRef;
    if (typeof pathOrRef === "string") {
      collectionRef = this.firestore.collection(pathOrRef);
    } else {
      collectionRef = pathOrRef;
    }
    const {
      ref,
      query
    } = associateQuery(collectionRef, queryFn);
    const refInZone = this.schedulers.ngZone.run(() => ref);
    return new AngularFirestoreCollection(refInZone, query, this);
  }
  /**
   * Create a reference to a Firestore Collection Group based on a collectionId
   * and an optional query function to narrow the result
   * set.
   */
  collectionGroup(collectionId, queryGroupFn) {
    const queryFn = queryGroupFn || ((ref) => ref);
    const collectionGroup = this.firestore.collectionGroup(collectionId);
    return new AngularFirestoreCollectionGroup(queryFn(collectionGroup), this);
  }
  doc(pathOrRef) {
    let ref;
    if (typeof pathOrRef === "string") {
      ref = this.firestore.doc(pathOrRef);
    } else {
      ref = pathOrRef;
    }
    const refInZone = this.schedulers.ngZone.run(() => ref);
    return new AngularFirestoreDocument(refInZone, this);
  }
  /**
   * Returns a generated Firestore Document Id.
   */
  createId() {
    return this.firestore.collection("_").doc().id;
  }
  static ɵfac = function AngularFirestore_Factory(t) {
    return new (t || _AngularFirestore)(ɵɵinject(FIREBASE_OPTIONS), ɵɵinject(FIREBASE_APP_NAME, 8), ɵɵinject(ENABLE_PERSISTENCE, 8), ɵɵinject(SETTINGS2, 8), ɵɵinject(PLATFORM_ID), ɵɵinject(NgZone), ɵɵinject(ɵAngularFireSchedulers), ɵɵinject(PERSISTENCE_SETTINGS, 8), ɵɵinject(USE_EMULATOR2, 8), ɵɵinject(AngularFireAuth, 8), ɵɵinject(USE_EMULATOR, 8), ɵɵinject(SETTINGS, 8), ɵɵinject(TENANT_ID, 8), ɵɵinject(LANGUAGE_CODE, 8), ɵɵinject(USE_DEVICE_LANGUAGE, 8), ɵɵinject(PERSISTENCE, 8), ɵɵinject(ɵAppCheckInstances, 8));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _AngularFirestore,
    factory: _AngularFirestore.ɵfac,
    providedIn: "any"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularFirestore, [{
    type: Injectable,
    args: [{
      providedIn: "any"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [FIREBASE_OPTIONS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [FIREBASE_APP_NAME]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ENABLE_PERSISTENCE]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [SETTINGS2]
    }]
  }, {
    type: Object,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }, {
    type: NgZone
  }, {
    type: ɵAngularFireSchedulers
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [PERSISTENCE_SETTINGS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [USE_EMULATOR2]
    }]
  }, {
    type: AngularFireAuth,
    decorators: [{
      type: Optional
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [USE_EMULATOR]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [SETTINGS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [TENANT_ID]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [LANGUAGE_CODE]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [USE_DEVICE_LANGUAGE]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [PERSISTENCE]
    }]
  }, {
    type: ɵAppCheckInstances,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var AngularFirestoreModule = class _AngularFirestoreModule {
  constructor() {
    firebase.registerVersion("angularfire", VERSION.full, "fst-compat");
  }
  /**
   * Attempt to enable persistent storage, if possible
   */
  static enablePersistence(persistenceSettings) {
    return {
      ngModule: _AngularFirestoreModule,
      providers: [{
        provide: ENABLE_PERSISTENCE,
        useValue: true
      }, {
        provide: PERSISTENCE_SETTINGS,
        useValue: persistenceSettings
      }]
    };
  }
  static ɵfac = function AngularFirestoreModule_Factory(t) {
    return new (t || _AngularFirestoreModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _AngularFirestoreModule
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [AngularFirestore]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularFirestoreModule, [{
    type: NgModule,
    args: [{
      providers: [AngularFirestore]
    }]
  }], () => [], null);
})();
export {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreCollectionGroup,
  AngularFirestoreDocument,
  AngularFirestoreModule,
  ENABLE_PERSISTENCE,
  PERSISTENCE_SETTINGS,
  SETTINGS2 as SETTINGS,
  USE_EMULATOR2 as USE_EMULATOR,
  associateQuery,
  combineChange,
  combineChanges,
  docChanges,
  fromCollectionRef,
  fromDocRef,
  fromRef,
  sortedChanges,
  validateEventsArray
};
//# sourceMappingURL=@angular_fire_compat_firestore.js.map
