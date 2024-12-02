import "./chunk-JQJXKPM6.js";
import {
  Router
} from "./chunk-27Q27IJO.js";
import {
  applyActionCode,
  beforeAuthStateChanged,
  checkActionCode,
  confirmPasswordReset,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  deleteUser,
  fetchSignInMethodsForEmail,
  getAdditionalUserInfo,
  getAuth,
  getIdToken,
  getIdTokenResult,
  getMultiFactorResolver,
  getRedirectResult,
  initializeAuth,
  initializeRecaptchaConfig,
  isSignInWithEmailLink,
  linkWithCredential,
  linkWithPhoneNumber,
  linkWithPopup,
  linkWithRedirect,
  multiFactor,
  onAuthStateChanged,
  onIdTokenChanged,
  parseActionCodeURL,
  reauthenticateWithCredential,
  reauthenticateWithPhoneNumber,
  reauthenticateWithPopup,
  reauthenticateWithRedirect,
  reload,
  revokeAccessToken,
  sendEmailVerification,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  setPersistence,
  signInAnonymously,
  signInWithCredential,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signInWithPhoneNumber,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  unlink,
  updateCurrentUser,
  updateEmail,
  updatePassword,
  updatePhoneNumber,
  updateProfile,
  useDeviceLanguage,
  validatePassword,
  verifyBeforeUpdateEmail,
  verifyPasswordResetCode
} from "./chunk-NLUINXX6.js";
import "./chunk-PECKDQRZ.js";
import "./chunk-K7PH4LFC.js";
import {
  FirebaseApp
} from "./chunk-F5IP7QTX.js";
import "./chunk-JGFQOLSF.js";
import {
  VERSION,
  ɵgetAllInstancesOf,
  ɵgetDefaultInstanceOf,
  ɵzoneWrap
} from "./chunk-2UIANQ4E.js";
import {
  registerVersion
} from "./chunk-JG6RQBBX.js";
import {
  Injectable,
  InjectionToken,
  NgModule,
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
  Observable,
  concatMap,
  distinct,
  from,
  map,
  of,
  pipe,
  switchMap,
  take,
  timer
} from "./chunk-GTSLNI4O.js";
import "./chunk-SM3G46PA.js";
import "./chunk-Y6Q6HMFU.js";

// node_modules/rxfire/auth/index.esm.js
function authState(auth) {
  return new Observable(function(subscriber) {
    var unsubscribe = onAuthStateChanged(auth, subscriber.next.bind(subscriber), subscriber.error.bind(subscriber), subscriber.complete.bind(subscriber));
    return { unsubscribe };
  });
}
function user(auth) {
  return new Observable(function(subscriber) {
    var unsubscribe = onIdTokenChanged(auth, subscriber.next.bind(subscriber), subscriber.error.bind(subscriber), subscriber.complete.bind(subscriber));
    return { unsubscribe };
  });
}
function idToken(auth) {
  return user(auth).pipe(switchMap(function(user3) {
    return user3 ? from(getIdToken(user3)) : of(null);
  }));
}

// node_modules/@angular/fire/fesm2022/angular-fire-auth.mjs
var AUTH_PROVIDER_NAME = "auth";
var Auth = class {
  constructor(auth) {
    return auth;
  }
};
var AuthInstances = class {
  constructor() {
    return ɵgetAllInstancesOf(AUTH_PROVIDER_NAME);
  }
};
var authInstance$ = timer(0, 300).pipe(concatMap(() => from(ɵgetAllInstancesOf(AUTH_PROVIDER_NAME))), distinct());
var PROVIDED_AUTH_INSTANCES = new InjectionToken("angularfire2.auth-instances");
function defaultAuthInstanceFactory(provided, defaultApp) {
  const defaultAuth = ɵgetDefaultInstanceOf(AUTH_PROVIDER_NAME, provided, defaultApp);
  return defaultAuth && new Auth(defaultAuth);
}
var AUTH_INSTANCES_PROVIDER = {
  provide: AuthInstances,
  deps: [[new Optional(), PROVIDED_AUTH_INSTANCES]]
};
var DEFAULT_AUTH_INSTANCE_PROVIDER = {
  provide: Auth,
  useFactory: defaultAuthInstanceFactory,
  deps: [[new Optional(), PROVIDED_AUTH_INSTANCES], FirebaseApp]
};
var AuthModule = class _AuthModule {
  constructor() {
    registerVersion("angularfire", VERSION.full, "auth");
  }
  static ɵfac = function AuthModule_Factory(t) {
    return new (t || _AuthModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _AuthModule
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [DEFAULT_AUTH_INSTANCE_PROVIDER, AUTH_INSTANCES_PROVIDER]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthModule, [{
    type: NgModule,
    args: [{
      providers: [DEFAULT_AUTH_INSTANCE_PROVIDER, AUTH_INSTANCES_PROVIDER]
    }]
  }], () => [], null);
})();
var authState2 = ɵzoneWrap(authState, true);
var user2 = ɵzoneWrap(user, true);
var idToken2 = ɵzoneWrap(idToken, true);
var applyActionCode2 = ɵzoneWrap(applyActionCode, true);
var beforeAuthStateChanged2 = ɵzoneWrap(beforeAuthStateChanged, true);
var checkActionCode2 = ɵzoneWrap(checkActionCode, true);
var confirmPasswordReset2 = ɵzoneWrap(confirmPasswordReset, true);
var connectAuthEmulator2 = ɵzoneWrap(connectAuthEmulator, true);
var createUserWithEmailAndPassword2 = ɵzoneWrap(createUserWithEmailAndPassword, true);
var deleteUser2 = ɵzoneWrap(deleteUser, true);
var fetchSignInMethodsForEmail2 = ɵzoneWrap(fetchSignInMethodsForEmail, true);
var getAdditionalUserInfo2 = ɵzoneWrap(getAdditionalUserInfo, true);
var getAuth2 = ɵzoneWrap(getAuth, true);
var getIdToken2 = ɵzoneWrap(getIdToken, true);
var getIdTokenResult2 = ɵzoneWrap(getIdTokenResult, true);
var getMultiFactorResolver2 = ɵzoneWrap(getMultiFactorResolver, true);
var getRedirectResult2 = ɵzoneWrap(getRedirectResult, true);
var initializeAuth2 = ɵzoneWrap(initializeAuth, true);
var initializeRecaptchaConfig2 = ɵzoneWrap(initializeRecaptchaConfig, true);
var isSignInWithEmailLink2 = ɵzoneWrap(isSignInWithEmailLink, true);
var linkWithCredential2 = ɵzoneWrap(linkWithCredential, true);
var linkWithPhoneNumber2 = ɵzoneWrap(linkWithPhoneNumber, true);
var linkWithPopup2 = ɵzoneWrap(linkWithPopup, true);
var linkWithRedirect2 = ɵzoneWrap(linkWithRedirect, true);
var multiFactor2 = ɵzoneWrap(multiFactor, true);
var onAuthStateChanged2 = ɵzoneWrap(onAuthStateChanged, true);
var onIdTokenChanged2 = ɵzoneWrap(onIdTokenChanged, true);
var parseActionCodeURL2 = ɵzoneWrap(parseActionCodeURL, true);
var reauthenticateWithCredential2 = ɵzoneWrap(reauthenticateWithCredential, true);
var reauthenticateWithPhoneNumber2 = ɵzoneWrap(reauthenticateWithPhoneNumber, true);
var reauthenticateWithPopup2 = ɵzoneWrap(reauthenticateWithPopup, true);
var reauthenticateWithRedirect2 = ɵzoneWrap(reauthenticateWithRedirect, true);
var reload2 = ɵzoneWrap(reload, true);
var revokeAccessToken2 = ɵzoneWrap(revokeAccessToken, true);
var sendEmailVerification2 = ɵzoneWrap(sendEmailVerification, true);
var sendPasswordResetEmail2 = ɵzoneWrap(sendPasswordResetEmail, true);
var sendSignInLinkToEmail2 = ɵzoneWrap(sendSignInLinkToEmail, true);
var setPersistence2 = ɵzoneWrap(setPersistence, true);
var signInAnonymously2 = ɵzoneWrap(signInAnonymously, true);
var signInWithCredential2 = ɵzoneWrap(signInWithCredential, true);
var signInWithCustomToken2 = ɵzoneWrap(signInWithCustomToken, true);
var signInWithEmailAndPassword2 = ɵzoneWrap(signInWithEmailAndPassword, true);
var signInWithEmailLink2 = ɵzoneWrap(signInWithEmailLink, true);
var signInWithPhoneNumber2 = ɵzoneWrap(signInWithPhoneNumber, true);
var signInWithPopup2 = ɵzoneWrap(signInWithPopup, true);
var signInWithRedirect2 = ɵzoneWrap(signInWithRedirect, true);
var signOut2 = ɵzoneWrap(signOut, true);
var unlink2 = ɵzoneWrap(unlink, true);
var updateCurrentUser2 = ɵzoneWrap(updateCurrentUser, true);
var updateEmail2 = ɵzoneWrap(updateEmail, true);
var updatePassword2 = ɵzoneWrap(updatePassword, true);
var updatePhoneNumber2 = ɵzoneWrap(updatePhoneNumber, true);
var updateProfile2 = ɵzoneWrap(updateProfile, true);
var useDeviceLanguage2 = ɵzoneWrap(useDeviceLanguage, true);
var validatePassword2 = ɵzoneWrap(validatePassword, true);
var verifyBeforeUpdateEmail2 = ɵzoneWrap(verifyBeforeUpdateEmail, true);
var verifyPasswordResetCode2 = ɵzoneWrap(verifyPasswordResetCode, true);

// node_modules/@angular/fire/fesm2022/angular-fire-auth-guard.mjs
var loggedIn = map((user3) => !!user3);
var AuthGuard = class _AuthGuard {
  router;
  auth;
  constructor(router, auth) {
    this.router = router;
    this.auth = auth;
  }
  canActivate = (next, state) => {
    const authPipeFactory = next.data.authGuardPipe || (() => loggedIn);
    return user2(this.auth).pipe(take(1), authPipeFactory(next, state), map((can) => {
      if (typeof can === "boolean") {
        return can;
      } else if (Array.isArray(can)) {
        return this.router.createUrlTree(can);
      } else {
        return this.router.parseUrl(can);
      }
    }));
  };
  static ɵfac = function AuthGuard_Factory(t) {
    return new (t || _AuthGuard)(ɵɵinject(Router), ɵɵinject(Auth));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _AuthGuard,
    factory: _AuthGuard.ɵfac,
    providedIn: "any"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthGuard, [{
    type: Injectable,
    args: [{
      providedIn: "any"
    }]
  }], () => [{
    type: Router
  }, {
    type: Auth
  }], null);
})();
var canActivate = (pipe2) => ({
  canActivate: [AuthGuard],
  data: {
    authGuardPipe: pipe2
  }
});
var isNotAnonymous = map((user3) => !!user3 && !user3.isAnonymous);
var idTokenResult = switchMap((user3) => user3 ? user3.getIdTokenResult() : of(null));
var emailVerified = map((user3) => !!user3 && user3.emailVerified);
var customClaims = pipe(idTokenResult, map((idTokenResult2) => idTokenResult2 ? idTokenResult2.claims : []));
var hasCustomClaim = (
  // eslint-disable-next-line no-prototype-builtins
  (claim) => pipe(customClaims, map((claims) => claims.hasOwnProperty(claim)))
);
var redirectUnauthorizedTo = (redirect) => pipe(loggedIn, map((loggedIn2) => loggedIn2 || redirect));
var redirectLoggedInTo = (redirect) => pipe(loggedIn, map((loggedIn2) => loggedIn2 && redirect || true));
var AuthGuardModule = class _AuthGuardModule {
  constructor() {
    registerVersion("angularfire", VERSION.full, "auth-guard");
  }
  static ɵfac = function AuthGuardModule_Factory(t) {
    return new (t || _AuthGuardModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _AuthGuardModule
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [AuthGuard]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthGuardModule, [{
    type: NgModule,
    args: [{
      providers: [AuthGuard]
    }]
  }], () => [], null);
})();
export {
  AuthGuard,
  AuthGuardModule,
  canActivate,
  customClaims,
  emailVerified,
  hasCustomClaim,
  idTokenResult,
  isNotAnonymous,
  loggedIn,
  redirectLoggedInTo,
  redirectUnauthorizedTo
};
/*! Bundled license information:

rxfire/auth/index.esm.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=@angular_fire_auth-guard.js.map
