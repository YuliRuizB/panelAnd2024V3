import './polyfills.server.mjs';
import{Z as f}from"./chunk-KMWCCYID.mjs";import{u as h}from"./chunk-F3VCI4QE.mjs";import{$ as l,ca as a,o as v}from"./chunk-WNM5W7LL.mjs";import{a as c,j as d}from"./chunk-H6KHSOBK.mjs";var C=(()=>{let s=class s{constructor(e,r){this.afs=e,this.aff=r}getDriver(e){return this.afs.collection("drivers").doc(e).snapshotChanges()}getDrivers(e){return this.afs.collection("drivers",t=>t.where("vendorId","==",e)).snapshotChanges()}getAllDrivers(){return this.afs.collection("drivers").snapshotChanges()}updateDriver(e,r){return this.afs.collection("drivers").doc(e).update(c({},r))}resetPassword(e,r){let t={uid:e,password:r};return this.aff.httpsCallable("onDriverResetPassword")(t).toPromise().then(n=>{console.log(n)})}toggleActiveDriver(e,r){let t=!r;return console.log("status to set: ",t),console.log("current state: ",r),this.afs.collection("drivers").doc(e).update({active:t})}deleteDriver(e){return this.afs.collection("drivers").doc(e).delete()}createDriver(e){return d(this,null,function*(){return console.log(e),this.aff.httpsCallable("createDriver")(e).toPromise().then(t=>{console.log(t)})})}getEvidenceDrivers(e){if(!(e instanceof Date&&!isNaN(e.getTime())))return console.error("Invalid date:",e),v([]);let r=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),0,0,0,0)),t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),23,59,59,999));return this.afs.collection("driversEvidence",n=>n.where("dateTimeStamp",">=",r).where("dateTimeStamp","<=",t)).snapshotChanges()}getEvidenceDriversperDriver(e,r){return this.afs.collection("driversEvidence",i=>i.where("date","==",e).where("uid","==",r)).snapshotChanges()}};s.\u0275fac=function(r){return new(r||s)(a(h),a(f))},s.\u0275prov=l({token:s,factory:s.\u0275fac,providedIn:"root"});let o=s;return o})();export{C as a};
