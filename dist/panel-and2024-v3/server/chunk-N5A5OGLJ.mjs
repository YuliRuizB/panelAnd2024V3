import './polyfills.server.mjs';
import{e as be,f as Ne,g as Re}from"./chunk-VVBWIB27.mjs";import{s as Se,t as Ae,u as Ie}from"./chunk-VQXELJS4.mjs";import{D as S,H as _e,K as we,a as me,ca as Me,d as pe,h as ge,pa as Te,qa as Fe,r as Ce,ra as xe}from"./chunk-2UQKMSCV.mjs";import{Fa as ze,O as ve,Wa as ye,_a as Q,db as De,m as H,p as V,y as fe}from"./chunk-RBIOE7SG.mjs";import{$ as ne,Ab as T,Cb as F,Db as x,Fb as N,G as ee,Gb as R,Ja as d,Ka as D,Kb as Y,Lb as L,Ma as _,Mb as W,Nb as he,Ob as $,Va as w,W as te,Xa as h,Ya as oe,Za as se,aa as I,ab as le,ba as re,d as K,da as z,db as b,gb as P,hb as B,ia as U,ib as u,ja as ie,jb as m,ka as y,kb as j,kc as ue,lb as ce,mb as de,o as O,oa as ae,ob as M,pa as g,q as Z,qa as C,rb as f,tb as c,va as p}from"./chunk-5UUOYCM5.mjs";import{c as X}from"./chunk-SSMVIVGM.mjs";import{a as q,j as J}from"./chunk-H6KHSOBK.mjs";var tt=(()=>{let r=class r{constructor(e,t){this.afs=e,this.aff=t}getDrivers(e){return this.afs.collection("drivers").doc(e).snapshotChanges()}getDriversByCustomergetDrivers(e){return this.afs.collection("drivers",n=>n.where("vendorId","==",e).where("active","==",!0)).snapshotChanges()}getDriversByCustomer(e){return this.afs.collection("drivers",n=>n.where("customerId","==",e).where("active","==",!0)).snapshotChanges()}getDriversbyCustomer(e,t){return this.afs.collection("drivers",o=>o.where("customerId","==",t).where("vendorId","==",e)).snapshotChanges()}getAllDrivers(){return this.afs.collection("drivers").snapshotChanges()}updateDriver(e,t){return this.afs.collection("drivers").doc(e).update(q({},t))}resetPassword(e,t){let n={uid:e,password:t};return this.aff.httpsCallable("onDriverResetPassword")(n).toPromise().then(s=>{console.log(s)})}toggleActiveDriver(e,t){let n=!t;return console.log("status to set: ",n),console.log("current state: ",t),this.afs.collection("drivers").doc(e).update({active:n})}deleteDriver(e){return this.afs.collection("drivers").doc(e).delete()}createDriver(e){return J(this,null,function*(){let t=this.afs.createId();return e.uid=t,this.afs.collection("drivers").doc(t).set(e).then(()=>t)})}getEvidenceDrivers(e){if(!(e instanceof Date&&!isNaN(e.getTime())))return console.error("Invalid date:",e),O([]);let t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),0,0,0,0)),n=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),23,59,59,999));return this.afs.collection("driversEvidence",s=>s.where("dateTimeStamp",">=",t).where("dateTimeStamp","<=",n)).snapshotChanges()}getEvidenceDriversbyCustomer(e,t){if(!(e instanceof Date&&!isNaN(e.getTime())))return console.error("Invalid date:",e),O([]);let n=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),0,0,0,0)),o=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),23,59,59,999));return this.afs.collection("driversEvidence",v=>v.where("dateTimeStamp",">=",n).where("dateTimeStamp","<=",o).where("customerId","==",t)).snapshotChanges()}getEvidenceDriversperDriver(e,t){return this.afs.collection("driversEvidence",o=>o.where("date","==",e).where("uid","==",t)).snapshotChanges()}getEvidenceByProgram(e){return this.afs.collection("driversEvidence",n=>n.where("programId","==",e)).snapshotChanges()}getEvidenceByRoute(e){return this.afs.collection("driversEvidence",n=>n.where("routeId","==",e)).snapshotChanges()}};r.\u0275fac=function(t){return new(t||r)(z(V),z(Me))},r.\u0275prov=I({token:r,factory:r.\u0275fac,providedIn:"root"});let i=r;return i})();var lt=(()=>{let r=class r{constructor(e,t){this.afs=e,this.messageService=t}setProgram(e){let t=this.afs.collection("customers").doc(e.customerId).collection("routes").doc(e.routeId).collection("assignments").doc(e.assignmentId),n=this.afs.collection("drivers").doc(e.driverId),o=new Date(e.date),s=new Date(e.date),v=new Date(e.date);return t.get().pipe(ee(1),Z(E=>{let l=E.data(),k=l.stopBeginHour.substring(0,5),ke=l.stopEndHour.substring(0,5),A=k.split(":"),G=ke.split(":");if(s.setHours(A[0],A[1],0,0),v.setHours(G[0],G[1],0,0),o.setHours(A[0],A[1],0,0),o.setMinutes(+o.getMinutes()-15,0,0),l.program=="S"){let Oe=new Date(l.time.toDate());o=De(Oe,-15)}return{active:l.active,capacity:e.vehicleCapacity,count:0,customerId:e.customerId,customerName:e.customerName,driver:e.driverName,driverConfirmationAt:H.fromDate(o),driverConfirmedAt:null,driverId:e.driverId,endAt:H.fromDate(v),endedAt:null,geofenceBegin:l.stopBeginId,geofenceEnd:l.stopEndId,geopoint:null,hasEnded:!1,isConfirmed:!1,isLive:!1,isRejected:!1,isTaskIn:l.program=="M",isTaskOut:l.program!="M",isWithTrouble:!1,lastUpdatedAt:null,name:e.routeName,program:l.program,rating:0,rejectedReason:null,round:l.round,routeDescription:e.routeName,routeId:e.routeId,routeName:e.routeName,startAt:H.fromDate(s),started:!1,startedAt:null,troubleMessage:null,troubleType:null,type:l.type,time:l.time,vehicleId:e.vehicleId,vehicleName:e.vehicleName,startAtFormat:s}})).subscribe(E=>this.afs.collection("customers").doc(e.customerId).collection("program").add(E).then(()=>this.sendMessage("success","La Programaci\xF3n ha sido generada. Favor de Actualizar la tabla.")).catch(k=>this.sendMessage("error",`\xA1Oops! Algo sali\xF3 mal ... ${k}`)))}getProgramsByDay(e){let t=e,n=Q(t,1);return this.afs.collectionGroup("program",s=>s.where("startAt",">=",t).where("startAt","<=",n).where("active","==",!0).orderBy("startAt","asc")).snapshotChanges()}getProgramsByDaybyCustomer(e,t){let n=e,o=Q(n,1);return console.log(n,o),this.afs.collectionGroup("program",v=>v.where("startAt",">=",n).where("startAt","<=",o).where("active","==",!0).where("customerId","==",t).orderBy("startAt","asc")).snapshotChanges()}getProgrambyCustomer(e,t){return this.afs.collection("customers").doc(t).collection("program").doc(e).snapshotChanges()}getRoutesbyCustomer(e){return this.afs.collectionGroup("routes",n=>n.where("active","==",!0).where("customerId","==",e).orderBy("name","asc")).snapshotChanges()}getRoutes(){return this.afs.collectionGroup("routes",t=>t.where("active","==",!0).orderBy("name","asc")).snapshotChanges()}getHelpCenter(e,t,n){return this.afs.collection("helpCenter",s=>s.where("active","==","true").where("customerId","==",n).where("type","==",e).where("currentDate","==",t)).snapshotChanges()}getHelpCenterAll(e,t,n){return this.afs.collection("helpCenter",s=>s.where("active","==","true").where("type","==",e).where("status","==",n).where("customerId","==",t).orderBy("currentDate","asc")).snapshotChanges()}getRefund(e,t){return this.afs.collection("refund",o=>o.where("status","==",t).where("customer","==",e).orderBy("date","asc")).snapshotChanges()}editProgram(e,t){return this.afs.collection("customers").doc(t.value.customerId).collection("program").doc(t.value.id).update({driver:t.value.driver,driverId:t.value.driverId,vehicleId:t.value.vehicleId,vehicleName:t.value.vehicleName}).then(()=>this.messageService.success("La Programaci\xF3n ha sido modificada. Favor de Actualizar la tabla.")).catch(o=>this.sendMessage("error",`\xA1Oops! Algo sali\xF3 mal ... ${o}`))}deleteProgram(e,t){return this.afs.collection("customers").doc(t).collection("program").doc(e).delete().then(()=>this.sendMessage("success","La  programacion ha sido eliminada.")).catch(o=>this.sendMessage("error",`\xA1Oops! Algo sali\xF3 mal ... ${o}`))}sendMessage(e,t){this.messageService.create(e,t)}updateTicketHelpCenter(e,t){return this.afs.collection("helpCenter").doc(e).update({status:t})}updateTicketRefund(e,t){return this.afs.collection("refund").doc(e).update({status:t})}};r.\u0275fac=function(t){return new(t||r)(z(V),z(ye))},r.\u0275prov=I({token:r,factory:r.\u0275fac,providedIn:"root"});let i=r;return i})();var Ve=(i,r)=>r.value;function Pe(i,r){if(i&1&&(ce(0),N(1),de()),i&2){let a=c(2);d(),R(a.nzCustomHeader)}}function Be(i,r){if(i&1&&w(0,Pe,2,1,"ng-container",0),i&2){let a=c();h("nzStringTemplateOutlet",a.nzCustomHeader)}}function je(i,r){if(i&1&&j(0,"nz-option",3),i&2){let a=r.$implicit;h("nzLabel",a.label)("nzValue",a.value)}}function Ye(i,r){if(i&1&&j(0,"nz-option",3),i&2){let a=r.$implicit;h("nzLabel",a.label)("nzValue",a.value)}}function Le(i,r){if(i&1){let a=M();u(0,"nz-select",8),f("ngModelChange",function(t){g(a);let n=c(2);return C(n.monthChange.emit(t))}),P(1,Ye,1,2,"nz-option",3,Ve),m()}if(i&2){let a=c(2);h("nzSize",a.size)("nzDropdownMatchSelectWidth",!1)("ngModel",a.activeMonth),d(),B(a.months)}}function We(i,r){if(i&1){let a=M();u(0,"div",1)(1,"nz-select",2),f("ngModelChange",function(t){g(a);let n=c();return C(n.updateYear(t))}),P(2,je,1,2,"nz-option",3,Ve),m(),w(4,Le,3,3,"nz-select",4),u(5,"nz-radio-group",5),W("ngModelChange",function(t){g(a);let n=c();return L(n.mode,t)||(n.mode=t),C(t)}),f("ngModelChange",function(t){g(a);let n=c();return C(n.modeChange.emit(t))}),u(6,"label",6),N(7),m(),u(8,"label",7),N(9),m()()()}if(i&2){let a=c();d(),h("nzSize",a.size)("nzDropdownMatchSelectWidth",!1)("ngModel",a.activeYear),d(),B(a.years),d(2),b(4,a.mode==="month"?4:-1),d(),Y("ngModel",a.mode),h("nzSize",a.size),d(2),R(a.monthTypeText),d(2),R(a.yearTypeText)}}function $e(i,r){if(i&1){let a=M();u(0,"date-table",4),f("valueChange",function(t){g(a);let n=c();return C(n.onDateSelect(t))}),m()}if(i&2){let a=c();h("prefixCls",a.prefixCls)("value",a.activeDate)("activeDate",a.activeDate)("cellRender",a.dateCell)("fullCellRender",a.dateFullCell)("disabledDate",a.nzDisabledDate)}}function Qe(i,r){if(i&1){let a=M();u(0,"month-table",5),f("valueChange",function(t){g(a);let n=c();return C(n.onDateSelect(t))}),m()}if(i&2){let a=c();h("prefixCls",a.prefixCls)("value",a.activeDate)("activeDate",a.activeDate)("cellRender",a.monthCell)("fullCellRender",a.monthFullCell)}}var Ge=(()=>{let r=class r{};r.\u0275fac=function(t){return new(t||r)},r.\u0275dir=y({type:r,selectors:[["","nzDateCell",""]],exportAs:["nzDateCell"],standalone:!0});let i=r;return i})(),qe=(()=>{let r=class r{};r.\u0275fac=function(t){return new(t||r)},r.\u0275dir=y({type:r,selectors:[["","nzMonthCell",""]],exportAs:["nzMonthCell"],standalone:!0});let i=r;return i})(),Je=(()=>{let r=class r{};r.\u0275fac=function(t){return new(t||r)},r.\u0275dir=y({type:r,selectors:[["","nzDateFullCell",""]],exportAs:["nzDateFullCell"],standalone:!0});let i=r;return i})(),Ke=(()=>{let r=class r{};r.\u0275fac=function(t){return new(t||r)},r.\u0275dir=y({type:r,selectors:[["","nzMonthFullCell",""]],exportAs:["nzMonthFullCell"],standalone:!0});let i=r;return i})(),Ee=(()=>{let r=class r{get activeYear(){return this.activeDate.getYear()}get activeMonth(){return this.activeDate.getMonth()}get size(){return this.fullscreen?"default":"small"}get yearTypeText(){return this.i18n.getLocale().Calendar.lang.year}get monthTypeText(){return this.i18n.getLocale().Calendar.lang.month}constructor(e,t){this.i18n=e,this.dateHelper=t,this.mode="month",this.fullscreen=!0,this.activeDate=new S,this.modeChange=new p,this.yearChange=new p,this.monthChange=new p,this.yearOffset=10,this.yearTotal=20,this.years=[],this.months=[]}ngOnInit(){this.setUpYears(),this.setUpMonths()}updateYear(e){this.yearChange.emit(e),this.setUpYears(e)}setUpYears(e){let t=(e||this.activeYear)-this.yearOffset,n=t+this.yearTotal;this.years=[];for(let o=t;o<n;o++)this.years.push({label:`${o}`,value:o})}setUpMonths(){this.months=[];for(let e=0;e<12;e++){let t=this.activeDate.setMonth(e),n=this.dateHelper.format(t.nativeDate,"MMM");this.months.push({label:n,value:e})}}};r.\u0275fac=function(t){return new(t||r)(D(_e),D(we))},r.\u0275cmp=U({type:r,selectors:[["nz-calendar-header"]],hostAttrs:[1,"ant-fullcalendar-header"],hostVars:2,hostBindings:function(t,n){t&2&&oe("display","block")},inputs:{mode:"mode",fullscreen:"fullscreen",activeDate:"activeDate",nzCustomHeader:"nzCustomHeader"},outputs:{modeChange:"modeChange",yearChange:"yearChange",monthChange:"monthChange"},exportAs:["nzCalendarHeader"],standalone:!0,features:[$],decls:2,vars:1,consts:[[4,"nzStringTemplateOutlet"],[1,"ant-picker-calendar-header"],[1,"ant-picker-calendar-year-select",3,"ngModelChange","nzSize","nzDropdownMatchSelectWidth","ngModel"],[3,"nzLabel","nzValue"],[1,"ant-picker-calendar-month-select",3,"nzSize","nzDropdownMatchSelectWidth","ngModel"],[1,"ant-picker-calendar-mode-switch",3,"ngModelChange","ngModel","nzSize"],["nz-radio-button","","nzValue","month"],["nz-radio-button","","nzValue","year"],[1,"ant-picker-calendar-month-select",3,"ngModelChange","nzSize","nzDropdownMatchSelectWidth","ngModel"]],template:function(t,n){t&1&&w(0,Be,1,1,"ng-container")(1,We,10,8),t&2&&b(0,n.nzCustomHeader?0:1)},dependencies:[xe,Te,Fe,Ce,pe,ge,Ie,Ae,Se,fe],encapsulation:2,changeDetection:0});let i=r;return i})(),Xe=(()=>{let r=class r{get dateCell(){return this.nzDateCell||this.nzDateCellChild}get dateFullCell(){return this.nzDateFullCell||this.nzDateFullCellChild}get monthCell(){return this.nzMonthCell||this.nzMonthCellChild}get monthFullCell(){return this.nzMonthFullCell||this.nzMonthFullCellChild}constructor(e,t){this.cdr=e,this.directionality=t,this.activeDate=new S,this.prefixCls="ant-picker-calendar",this.destroy$=new K,this.dir="ltr",this.onChangeFn=()=>{},this.onTouchFn=()=>{},this.nzMode="month",this.nzModeChange=new p,this.nzPanelChange=new p,this.nzSelectChange=new p,this.nzValueChange=new p,this.nzFullscreen=!0}ngOnInit(){this.dir=this.directionality.value,this.directionality.change?.pipe(te(this.destroy$)).subscribe(()=>{this.dir=this.directionality.value})}onModeChange(e){this.nzModeChange.emit(e),this.nzPanelChange.emit({date:this.activeDate.nativeDate,mode:e})}onYearSelect(e){let t=this.activeDate.setYear(e);this.updateDate(t)}onMonthSelect(e){let t=this.activeDate.setMonth(e);this.updateDate(t)}onDateSelect(e){this.updateDate(e)}writeValue(e){this.updateDate(new S(e),!1),this.cdr.markForCheck()}registerOnChange(e){this.onChangeFn=e}registerOnTouched(e){this.onTouchFn=e}updateDate(e,t=!0){this.activeDate=e,t&&(this.onChangeFn(e.nativeDate),this.onTouchFn(),this.nzSelectChange.emit(e.nativeDate),this.nzValueChange.emit(e.nativeDate))}ngOnChanges(e){e.nzValue&&this.updateDate(new S(this.nzValue),!1)}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};r.\u0275fac=function(t){return new(t||r)(D(ue),D(ze,8))},r.\u0275cmp=U({type:r,selectors:[["nz-calendar"]],contentQueries:function(t,n,o){if(t&1&&(T(o,Ge,5,_),T(o,Je,5,_),T(o,qe,5,_),T(o,Ke,5,_)),t&2){let s;F(s=x())&&(n.nzDateCellChild=s.first),F(s=x())&&(n.nzDateFullCellChild=s.first),F(s=x())&&(n.nzMonthCellChild=s.first),F(s=x())&&(n.nzMonthFullCellChild=s.first)}},hostAttrs:[1,"ant-picker-calendar"],hostVars:6,hostBindings:function(t,n){t&2&&se("ant-picker-calendar-full",n.nzFullscreen)("ant-picker-calendar-mini",!n.nzFullscreen)("ant-picker-calendar-rtl",n.dir==="rtl")},inputs:{nzMode:"nzMode",nzValue:"nzValue",nzDisabledDate:"nzDisabledDate",nzDateCell:"nzDateCell",nzDateFullCell:"nzDateFullCell",nzMonthCell:"nzMonthCell",nzMonthFullCell:"nzMonthFullCell",nzCustomHeader:"nzCustomHeader",nzFullscreen:"nzFullscreen"},outputs:{nzModeChange:"nzModeChange",nzPanelChange:"nzPanelChange",nzSelectChange:"nzSelectChange",nzValueChange:"nzValueChange"},exportAs:["nzCalendar"],standalone:!0,features:[he([{provide:me,useExisting:ne(()=>r),multi:!0}]),ae,$],decls:6,vars:8,consts:[[3,"modeChange","yearChange","monthChange","fullscreen","activeDate","nzCustomHeader","mode"],[1,"ant-picker-panel"],[1,"ant-picker-body"],[3,"prefixCls","value","activeDate","cellRender","fullCellRender","disabledDate"],[3,"valueChange","prefixCls","value","activeDate","cellRender","fullCellRender","disabledDate"],[3,"valueChange","prefixCls","value","activeDate","cellRender","fullCellRender"]],template:function(t,n){t&1&&(u(0,"nz-calendar-header",0),W("modeChange",function(s){return L(n.nzMode,s)||(n.nzMode=s),s}),f("modeChange",function(s){return n.onModeChange(s)})("yearChange",function(s){return n.onYearSelect(s)})("monthChange",function(s){return n.onMonthSelect(s)}),m(),u(1,"div",1)(2,"div")(3,"div",2),w(4,$e,1,6,"date-table",3)(5,Qe,1,5),m()()()),t&2&&(h("fullscreen",n.nzFullscreen)("activeDate",n.activeDate)("nzCustomHeader",n.nzCustomHeader),Y("mode",n.nzMode),d(2),le("ant-picker-",n.nzMode==="month"?"date":"month","-panel"),d(2),b(4,n.nzMode==="month"?4:5))},dependencies:[Ee,Re,Ne,be],encapsulation:2,changeDetection:0});let i=r;return X([ve()],i.prototype,"nzFullscreen",void 0),i})(),Et=(()=>{let r=class r{};r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=ie({type:r}),r.\u0275inj=re({imports:[Ee,Xe]});let i=r;return i})();export{tt as a,lt as b,Xe as c,Et as d};
