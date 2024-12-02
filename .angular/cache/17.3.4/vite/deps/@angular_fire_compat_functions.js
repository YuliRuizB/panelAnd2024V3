import "./chunk-NNDVQOCL.js";
import "./chunk-JYCGFZ6T.js";
import "./chunk-F5IP7QTX.js";
import "./chunk-JGFQOLSF.js";
import {
  FIREBASE_APP_NAME,
  FIREBASE_OPTIONS,
  ɵapplyMixins,
  ɵcacheInstance,
  ɵfirebaseAppFactory,
  ɵlazySDKProxy
} from "./chunk-3W4W2VH3.js";
import {
  VERSION,
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
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-ML5QYFST.js";
import "./chunk-AFLHQOKZ.js";
import "./chunk-J77I636K.js";
import {
  from,
  map,
  observeOn,
  of,
  shareReplay,
  switchMap
} from "./chunk-GTSLNI4O.js";
import "./chunk-SM3G46PA.js";
import "./chunk-Y6Q6HMFU.js";

// node_modules/@angular/fire/fesm2022/angular-fire-compat-functions.mjs
var proxyPolyfillCompat = {
  useEmulator: null,
  useFunctionsEmulator: null,
  httpsCallable: null
};
var ORIGIN = new InjectionToken("angularfire2.functions.origin");
var REGION = new InjectionToken("angularfire2.functions.region");
var USE_EMULATOR = new InjectionToken("angularfire2.functions.use-emulator");
var AngularFireFunctions = class _AngularFireFunctions {
  httpsCallable;
  constructor(options, name, zone, schedulers, region, origin, _useEmulator, _appCheckInstances) {
    const useEmulator = _useEmulator;
    const functions = of(void 0).pipe(observeOn(schedulers.outsideAngular), switchMap(() => import("./index.esm-4T33PBQ3.js")), map(() => ɵfirebaseAppFactory(options, zone, name)), map((app) => ɵcacheInstance(`${app.name}.functions.${region || origin}`, "AngularFireFunctions", app.name, () => {
      let functions2;
      if (region && origin) {
        throw new Error("REGION and ORIGIN can't be used at the same time.");
      }
      functions2 = app.functions(region || origin || void 0);
      if (useEmulator) {
        functions2.useEmulator(...useEmulator);
      }
      return functions2;
    }, [region, origin, useEmulator])), shareReplay({
      bufferSize: 1,
      refCount: false
    }));
    this.httpsCallable = (name2, options2) => (data) => from(functions).pipe(observeOn(schedulers.insideAngular), switchMap((functions2) => functions2.httpsCallable(name2, options2)(data)), map((r) => r.data));
    return ɵlazySDKProxy(this, functions, zone);
  }
  static ɵfac = function AngularFireFunctions_Factory(t) {
    return new (t || _AngularFireFunctions)(ɵɵinject(FIREBASE_OPTIONS), ɵɵinject(FIREBASE_APP_NAME, 8), ɵɵinject(NgZone), ɵɵinject(ɵAngularFireSchedulers), ɵɵinject(REGION, 8), ɵɵinject(ORIGIN, 8), ɵɵinject(USE_EMULATOR, 8), ɵɵinject(ɵAppCheckInstances, 8));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _AngularFireFunctions,
    factory: _AngularFireFunctions.ɵfac,
    providedIn: "any"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularFireFunctions, [{
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
    type: NgZone
  }, {
    type: ɵAngularFireSchedulers
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [REGION]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ORIGIN]
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
    type: ɵAppCheckInstances,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
ɵapplyMixins(AngularFireFunctions, [proxyPolyfillCompat]);
var AngularFireFunctionsModule = class _AngularFireFunctionsModule {
  constructor() {
    firebase.registerVersion("angularfire", VERSION.full, "fn-compat");
  }
  static ɵfac = function AngularFireFunctionsModule_Factory(t) {
    return new (t || _AngularFireFunctionsModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _AngularFireFunctionsModule
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [AngularFireFunctions]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularFireFunctionsModule, [{
    type: NgModule,
    args: [{
      providers: [AngularFireFunctions]
    }]
  }], () => [], null);
})();
export {
  AngularFireFunctions,
  AngularFireFunctionsModule,
  ORIGIN,
  REGION,
  USE_EMULATOR
};
//# sourceMappingURL=@angular_fire_compat_functions.js.map
