import{ca as m}from"./chunk-SDAY43RL.js";import{Mc as l,V as f,Y as r,m as n,ye as p}from"./chunk-OOO7QBDH.js";import{a as c,b as h}from"./chunk-SIAVTO45.js";var v=(()=>{let a=class a{constructor(t,s,e){this.afs=t,this.notification=s,this.aff=e,this.documentPath="admin/dashboard",this.dashboardItems=this.afs.doc(this.documentPath).valueChanges()}getDashboardItems(){return this.dashboardItems}sendToDeviceMessage(t){this.aff.httpsCallable("sendToDeviseMessage")(t).subscribe({next:e=>{},error:e=>{}})}setChatMessage(t){let s=this.afs.createId();return this.afs.collection("chatMessages").doc(s).set(t)}setMessage(t,s){let e=this.afs.createId();return this.afs.collection("users").doc(s).collection("messages").doc(e).set(t)}getUserChatMessages(t,s){return this.afs.collection("chatMessages",e=>e.where("uid","==",t)).snapshotChanges().pipe(n(e=>e.map(o=>{let i=o.payload.doc.id,u=o.payload.doc.data();return c({id:i},u)})))}getJobType(t){return this.afs.collection("customers").doc(t).snapshotChanges().pipe(n(e=>{let o=e.payload.data(),i=e.payload.id;return h(c({},o),{id:i})}))}getJobTypeInfo(t){return this.afs.collection("jobType").doc(t).snapshotChanges().pipe(n(e=>{let o=e.payload.data(),i=e.payload.id;return h(c({},o),{id:i})}))}};a.\u0275fac=function(s){return new(s||a)(r(l),r(p),r(m))},a.\u0275prov=f({token:a,factory:a.\u0275fac,providedIn:"root"});let d=a;return d})();export{v as a};
