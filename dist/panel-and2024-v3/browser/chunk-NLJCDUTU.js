import{a as Ve}from"./chunk-A6LB24KY.js";import{a as Re}from"./chunk-Y6BYNUAW.js";import{A as Ee,B as Fe,C as Q,D as Te,a as we,c as B,d as Pe,k as W,n as Y,o as J,w as K,y as Ie}from"./chunk-P4EMRIXJ.js";import{Sc as Ne}from"./chunk-2XE4ZSNN.js";import{a as _e}from"./chunk-3VV4NY5F.js";import{$ as Se,N as ge,O as ve,P as ze,Q as H,_ as Ce,aa as ye,b as ce,c as P,e as L,f as M,i as ue,ia as k,ja as q,k as O,m as A,q as $,v as fe,w as he,x as G}from"./chunk-3MM2LZV7.js";import{Aa as S,Ca as u,Jc as pe,Jd as U,O as T,Ob as x,Pa as n,Pb as me,Qa as r,Ra as f,Va as de,Wb as re,Y as w,Ya as h,_ as N,_a as X,bb as Z,c as E,ea as D,fa as C,hb as ee,ib as l,jb as te,kb as v,m as _,nf as j,of as be,pa as R,qa as m,qf as De,ra as F,xb as ie,zb as ne}from"./chunk-M4WL67FH.js";import{a as b,b as le,f as se}from"./chunk-WT5K5NLM.js";var it=(()=>{let d=class d{constructor(){}ngOnInit(){}};d.\u0275fac=function(o){return new(o||d)},d.\u0275cmp=N({type:d,selectors:[["app-payments"]],decls:2,vars:0,template:function(o,e){o&1&&(n(0,"p"),l(1,"payments works!"),r())}});let s=d;return s})();var V=se(Se());function qe(s,d){if(s&1&&(n(0,"nz-option",23),f(1,"i",24),l(2),r()),s&2){let c=d.$implicit;u("nzLabel",c.name)("nzValue",c.id),m(2),v(" ",c.name,"")}}function Be(s,d){if(s&1&&(n(0,"nz-option",23),f(1,"i",24),l(2),r()),s&2){let c=d.$implicit;u("nzLabel",c.name)("nzValue",c.routeId),m(2),v(" ",c.name,"")}}function We(s,d){if(s&1&&(n(0,"nz-option",23),f(1,"i",24),l(2),r()),s&2){let c=d.$implicit;u("nzLabel",c.name)("nzValue",c.id),m(2),v(" ",c.name,"")}}function Ye(s,d){if(s&1&&(n(0,"nz-option",23),f(1,"i",24),l(2),r()),s&2){let c=d.$implicit;u("nzLabel",c.name)("nzValue",c.routeId),m(2),v(" ",c.name,"")}}var gt=(()=>{let d=class d{constructor(t,o){this.afs=t,this.fb=o,this.customers=[],this.accountId$=new E,this.routeId$=new E,this.stopSubscription$=new E,this.rowDataPay=[],this.rowData=[],this.userRoute=!1,this.userRouteP=!1,this.submitPayment=!0,this.contenedores="",this.contenedoresPay="",this.rowDataPre=[],this.rowDataPush=[],this.customersService=w(Ce),this.routesService=w(ye),this.usersService=w(_e),this.defaultColDef={flex:1,minWidth:100,filter:!0,resizable:!0},this.columnDefsPagos=[{headerName:"Turno",field:"turno",enableRowGroup:!0,cellRenderer:e=>{let i=e.data.turno;return i==1?"Matutino":i==2?"Vespertino":i==3?"Nocturno":"No Definido"}},{headerName:"Tipo de Viaje",sortable:!0,field:"roundTrip",enableRowGroup:!0},{headerName:"Nombre",sortable:!0,field:"displayName"},{headerName:"Matr\xEDcula",sortable:!0,field:"studentId"},{headerName:"Tel\xE9fono",sortable:!0,field:"phoneNumber"},{headerName:"Correo",sortable:!0,field:"email"},{headerName:"Status",sortable:!0,field:"status"}],this.columnDefsPagosGenerados=[{headerName:"Turno",field:"turno",enableRowGroup:!0,cellRenderer:e=>e.data.defaultRound},{headerName:"Tipo de Viaje",sortable:!0,field:"roundTrip",enableRowGroup:!0},{headerName:"Nombre",sortable:!0,field:"displayName"},{headerName:"Matr\xEDcula",sortable:!0,field:"studentId"},{headerName:"Tel\xE9fono",sortable:!0,field:"phoneNumber"},{headerName:"Correo",sortable:!0,field:"email"}]}ngOnInit(){this.validateForm=this.fb.group({customerId:["",[P.required]],customerName:[],routeId:["",[P.required]],routeName:["",[P.required]],round:["",[P.required]]}),this.validateFormP=this.fb.group({customerId:["",[P.required]],customerName:[],routeId:["",[P.required]],routeName:["",[P.required]],round:["",[P.required]]}),this.cCollection=this.afs.collection("customers",t=>t.where("active","==",!0)),this.customerSubscription=this.cCollection.snapshotChanges().pipe(_(t=>t.map(o=>{let e=o.payload.doc.id,i=o.payload.doc.data();return b({id:e},i)}))).subscribe(t=>{this.customers=t})}onCustomerSelectedC(t,o){if(t!=null&&!this.userRoute){this.userRoute=!0,this.routes=[],this.contenedores="",this.rowDataPay=[];let i=V.filter(o,a=>a.id==t)[0];this.validateForm.controls.customerName.setValue(i.name),this.validateForm.controls.customerId.setValue(i.id),this.fillCustomerRoute(i.id)}}onCustomerSelectedP(t,o){if(t!=null&&!this.userRouteP){this.userRouteP=!0,this.routesP=[],this.contenedoresPay="",this.rowDataPre=[],this.rowData=[];let i=V.filter(o,a=>a.id==t)[0];this.validateFormP.controls.customerName.setValue(i.name),this.validateFormP.controls.customerId.setValue(i.id),this.fillCustomerRouteP(i.id)}}ngOnDestroy(){this.stopSubscription$.next(void 0),this.stopSubscription$.complete()}fillCustomerRoute(t){this.routesService.getRoutes(t).pipe(T(this.stopSubscription$),_(o=>o.map(e=>{let i=e.payload.doc.id,a=e.payload.doc.data();return b({id:i},a)}))).subscribe(o=>{this.routes=o})}fillCustomerRouteP(t){this.routesService.getRoutes(t).pipe(T(this.stopSubscription$),_(o=>o.map(e=>{let i=e.payload.doc.id,a=e.payload.doc.data();return b({id:i},a)}))).subscribe(o=>{this.routesP=o})}onRouteSelected(t,o){this.routeId$.next(t);let i=V.filter(o,a=>a.routeId==t)[0];this.validateForm.controls.routeName.setValue(i.name)}onRouteSelectedP(t,o){this.routeId$.next(t);let i=V.filter(o,a=>a.routeId==t)[0];this.validateFormP.controls.routeName.setValue(i.name)}submitFormUnPaid(){this.userRoute=!1,this.rowDataPay=[];let t=this.validateForm.controls.customerId.value,o=this.validateForm.controls.routeId.value,e=this.validateForm.controls.round.value,i="";e==1?i="D\xEDa":e==2?i="Tarde":i="Nocturno",this.usersCollection=this.afs.collection("users",a=>a.where("status","==","preRegister").where("customerId","==",t).where("turno","==",e).where("defaultRoute","==",o).orderBy("displayName")),this.userSubscription=this.usersCollection.snapshotChanges().pipe(_(a=>a.map(p=>{let g=p.payload.doc.id,y=p.payload.doc.data();return b({id:g},y)}))).subscribe(a=>{this.loadUsers(a)})}loadUsers(t){this.rowDataPay=t,t.length<=14?this.contenedores=this.organigrama(t.length,13,19,40):t.length<=19?this.contenedores=this.organigrama(t.length,14,17,40):this.contenedores=this.organigrama(t.length,14,19,40)}loadUsersP(t){this.contenedoresPay="",this.rowData=t,this.rowData.length<=14?this.contenedoresPay=this.organigrama(this.rowData.length,13,19,40):this.rowData.length<=19?this.contenedoresPay=this.organigrama(this.rowData.length,14,17,40):this.contenedoresPay=this.organigrama(this.rowData.length,14,19,40)}onRoundSelected(){if(this.submitPayment){this.submitPayment=!1,this.userRouteP=!1,this.rowData=[],this.rowDataPre=[];let t=this.validateFormP.controls.customerId.value,o=this.validateFormP.controls.routeId.value,e=parseInt(this.validateFormP.controls.round.value,10),i="";e==1?i="D\xEDa":e==2?i="Tarde":i="Nocturno",this.usersCollection=this.afs.collection("users",a=>a.where("customerId","==",t).where("defaultRound","==",i).where("defaultRoute","==",o).orderBy("displayName")),this.userSubscription=this.usersCollection.snapshotChanges().pipe(_(a=>a.map(p=>{let g=p.payload.doc.id,y=p.payload.doc.data();return b({id:g},y)}))).subscribe(a=>{this.rowData=a,this.load()})}}load(){this.rowData.length>=1?(this.rowDataPush=[],this.rowData.forEach(t=>{let o=t.id;this.afs.collection(`users/${o}/boardingPasses`,e=>e.where("active","==",!0).limit(1)).get().subscribe(e=>{e.empty||(console.log(`El usuario con ID ${o} tiene un boardingPassessDetail activo.`),this.rowDataPush.push(b({},t)))})})):this.contenedoresPay="No existen coincidencias!"}submitFormPaid(){this.submitPayment=!0,this.rowDataPre=this.rowDataPush,this.loadUsersP(this.rowDataPre)}onFirstDataRendered(){setTimeout(function(){},0)}organigrama(t,o,e,i){let a=0,p=0,g=0,y=0,I=!1;for(;t>0;)if(t>=i)g++,t-=i;else if(t>=e)p++,t-=e;else if(t>=o)a++,t-=o;else{y=t;break}let z="";return a>0&&(z+=`${a} camiones de 14 pasajeros, `,I=!0),p>0&&(z+=`${p} camiones de 19 pasajeros, `,I=!0),g>0&&(z+=`${g} camiones de 40 pasajeros, `,I=!0),y>0&&(z+=`y restan ${y} pasajeros sin asignacion, `),z!==""?I?z=`Se necesitan ${z} en total.`:z=`Se necesitan 0 camiones  ${z} en total.`:z="No se necesitan camiones.",z}};d.\u0275fac=function(o){return new(o||d)(F(pe),F($))},d.\u0275cmp=N({type:d,selectors:[["app-organigrama"]],decls:77,vars:19,consts:[["agGrid",""],[2,"margin","buttom 15px"],[1,"site-page-header-ghost-wrapper"],[3,"nzGhost"],[1,"body"],["nzTitle","Usuarios Interesados"],[2,"margin-bottom","10px"],["nz-form","","nzLayout","horizontal",3,"ngSubmit","formGroup"],[2,"width","1000px","border-collapse","collapse"],[2,"width","50%"],[2,"width","80px"],["formControlName","customerId","nzAllowClear","","nzPlaceHolder","Selecciona la Empresa",2,"width","300px",3,"ngModelChange"],["nzCustomContent","",3,"nzLabel","nzValue",4,"ngFor","ngForOf"],["formControlName","routeId","nzAllowClear","","nzPlaceHolder","Selecciona la ruta",2,"width","300px",3,"ngModelChange"],["formControlName","round","nzAllowClear","","nzPlaceHolder","Selecciona Turno",2,"width","300px"],["nzValue","1","nzLabel","Matutino"],["nzValue","2","nzLabel","Vespertino"],["nzValue","3","nzLabel","Nocturno"],["nz-button","",2,"background-color","#4F6F57","color","#f6f3ea",3,"click"],["id","myGridRoutes",1,"ag-theme-material",2,"width","100%","height","500px",3,"firstDataRendered","columnDefs","defaultColDef","masterDetail","detailCellRendererParams","rowData"],["nzTitle","Usuarios con Pago"],["formControlName","round","nzAllowClear","","nzPlaceHolder","Selecciona Turno",2,"width","300px",3,"ngModelChange"],["id","myGrid",1,"ag-theme-material",2,"width","100%","height","500px",3,"firstDataRendered","columnDefs","defaultColDef","masterDetail","detailCellRendererParams","rowData"],["nzCustomContent","",3,"nzLabel","nzValue"],["nz-icon","","nzType","fork"]],template:function(o,e){if(o&1){let i=de();n(0,"div",1)(1,"div",2)(2,"nz-page-header",3)(3,"nz-page-header-title"),l(4,"Organigrama de Rutas"),r(),f(5,"nz-page-header-subtitle"),r(),n(6,"div",4)(7,"nz-tabset")(8,"nz-tab",5)(9,"div",6)(10,"form",7),h("ngSubmit",function(){return D(i),C(e.submitFormUnPaid())}),n(11,"table",8)(12,"tr")(13,"td",9)(14,"nz-form-item")(15,"nz-form-label",10),l(16,"Empresa"),r(),n(17,"nz-select",11),h("ngModelChange",function(p){return D(i),C(e.onCustomerSelectedC(p,e.customers))}),S(18,qe,3,3,"nz-option",12),r()()()(),n(19,"tr")(20,"td",9)(21,"nz-form-item")(22,"nz-form-label",10),l(23,"Ruta"),r(),n(24,"nz-select",13),h("ngModelChange",function(p){return D(i),C(e.onRouteSelected(p,e.routes))}),S(25,Be,3,3,"nz-option",12),r()(),n(26,"nz-form-label",10),l(27,"Turno"),r(),n(28,"nz-select",14),f(29,"nz-option",15)(30,"nz-option",16)(31,"nz-option",17),r(),n(32,"nz-form-item")(33,"nz-form-label"),l(34,"Programac\xF3n de Rutas: "),r(),n(35,"b"),l(36),r()()()()(),n(37,"button",18),h("click",function(){return D(i),C(e.submitFormUnPaid())}),l(38,"Aceptar"),r()()(),n(39,"div")(40,"ag-grid-angular",19,0),h("firstDataRendered",function(){return D(i),C(e.onFirstDataRendered())}),r()()(),n(42,"nz-tab",20)(43,"div",6)(44,"form",7),h("ngSubmit",function(){return D(i),C(e.submitFormPaid())}),n(45,"table",8)(46,"tr")(47,"td",9)(48,"nz-form-item")(49,"nz-form-label",10),l(50,"Empresa"),r(),n(51,"nz-select",11),h("ngModelChange",function(p){return D(i),C(e.onCustomerSelectedP(p,e.customers))}),S(52,We,3,3,"nz-option",12),r()()()(),n(53,"tr")(54,"td",9)(55,"nz-form-item")(56,"nz-form-label",10),l(57,"Ruta"),r(),n(58,"nz-select",13),h("ngModelChange",function(p){return D(i),C(e.onRouteSelectedP(p,e.routesP))}),S(59,Ye,3,3,"nz-option",12),r()(),n(60,"nz-form-label",10),l(61,"Turno"),r(),n(62,"nz-select",21),h("ngModelChange",function(){return D(i),C(e.onRoundSelected())}),f(63,"nz-option",15)(64,"nz-option",16)(65,"nz-option",17),r(),n(66,"nz-form-item")(67,"nz-form-label"),l(68,"Programac\xF3n de Rutas: "),r(),n(69,"b"),l(70),r()()()()(),n(71,"nz-form-item")(72,"button",18),h("click",function(){return D(i),C(e.submitFormPaid())}),l(73,"Aceptar"),r()()()(),n(74,"div")(75,"ag-grid-angular",22,0),h("firstDataRendered",function(){return D(i),C(e.onFirstDataRendered())}),r()()()()()()()}o&2&&(m(2),u("nzGhost",!1),m(8),u("formGroup",e.validateForm),m(8),u("ngForOf",e.customers),m(7),u("ngForOf",e.routes),m(11),v(" ",e.contenedores,""),m(4),u("columnDefs",e.columnDefsPagos)("defaultColDef",e.defaultColDef)("masterDetail",!0)("detailCellRendererParams",e.columnDefsPagos)("rowData",e.rowDataPay),m(4),u("formGroup",e.validateFormP),m(8),u("ngForOf",e.customers),m(7),u("ngForOf",e.routesP),m(11),v(" ",e.contenedoresPay,""),m(5),u("columnDefs",e.columnDefsPagosGenerados)("defaultColDef",e.defaultColDef)("masterDetail",!0)("detailCellRendererParams",e.columnDefsPagosGenerados)("rowData",e.rowDataPre))},dependencies:[x,Ne,U,G,he,ve,ge,H,K,Q,De,j,be,W,B,Pe,k,q,ue,L,M,O,A,J,Y]});let s=d;return s})();var ae=se(Se());var xe=(()=>{let d=class d{constructor(){this.audioUrl=""}};d.\u0275fac=function(o){return new(o||d)},d.\u0275cmp=N({type:d,selectors:[["app-audio-player"]],inputs:{audioUrl:"audioUrl"},decls:3,vars:1,consts:[["controls",""],["type","audio/mpeg",3,"src"]],template:function(o,e){o&1&&(n(0,"audio",0),f(1,"source",1),l(2," Your browser does not support the audio element. "),r()),o&2&&(m(),u("src",e.audioUrl,R))},encapsulation:2});let s=d;return s})();function Ke(s,d){if(s&1&&(n(0,"tr")(1,"td"),l(2),r(),n(3,"td"),l(4),ie(5,"date"),r(),n(6,"td"),l(7),r(),n(8,"td")(9,"a",22),l(10,"Ver Evidencia"),r()(),n(11,"td"),f(12,"app-audio-player",23),r()()),s&2){let c=d.$implicit;m(2),v(" ",c.displayName," "),m(2),te(ne(5,5,c.dateTimeStamp.toDate(),"yyyy-MM-dd HH:mm:ss")),m(3),v(" ",c.comentario," "),m(2),Z("href",c.imageUrl,R),m(3),u("audioUrl",c.audioUrl)}}function Qe(s,d){if(s&1&&(n(0,"nz-table",19,0)(2,"thead")(3,"tr")(4,"th",20),l(5,"PR"),r(),n(6,"th",20),l(7,"Fecha"),r(),n(8,"th",20),l(9,"Comentarios "),r(),n(10,"th",20),l(11,"Audio"),r(),n(12,"th",20),l(13,"..."),r()()(),n(14,"tbody"),S(15,Ke,13,8,"tr",21),r()()),s&2){let c=ee(1),t=X();u("nzData",t.evidenceInfo)("nzLoading",t.loadingevidenceInfo)("nzLoadingDelay",500),m(15),u("ngForOf",c.data)}}function Xe(s,d){if(s&1&&(n(0,"nz-option",24),f(1,"i",25),l(2),f(3,"br"),l(4),r()),s&2){let c=d.$implicit;u("nzLabel",c.name)("nzValue",c.id),m(2),v(" ",c.name," "),m(2),v(" ",c.description,"")}}function Ze(s,d){if(s&1&&f(0,"nz-option",26),s&2){let c=d.$implicit;u("nzValue",c.id)("nzLabel",c.displayName)}}function et(s,d){if(s&1&&(n(0,"tr")(1,"td"),l(2),r(),n(3,"td"),l(4),ie(5,"date"),r(),n(6,"td"),l(7),r(),n(8,"td")(9,"a",22),l(10,"Ver Evidencia"),r()(),n(11,"td"),f(12,"app-audio-player",23),r()()),s&2){let c=d.$implicit;m(2),v(" ",c.displayName," "),m(2),te(ne(5,5,c.dateTimeStamp.toDate(),"yyyy-MM-dd HH:mm:ss")),m(3),v(" ",c.comentario," "),m(2),Z("href",c.imageUrl,R),m(3),u("audioUrl",c.audioUrl)}}function tt(s,d){if(s&1&&(n(0,"nz-table",19,1)(2,"thead")(3,"tr")(4,"th",20),l(5,"PR"),r(),n(6,"th",20),l(7,"Fecha"),r(),n(8,"th",20),l(9,"Comentarios "),r(),n(10,"th",20),l(11,"Audio"),r(),n(12,"th",20),l(13,"..."),r()()(),n(14,"tbody"),S(15,et,13,8,"tr",21),r()()),s&2){let c=ee(1),t=X();u("nzData",t.evidenceInfoDriver)("nzLoading",t.loadingevidenceInfoDriver)("nzLoadingDelay",500),m(15),u("ngForOf",c.data)}}var Nt=(()=>{let d=class d{constructor(t,o){this.datePipe=t,this.fb=o,this.driverService=w(Ve),this.vendorsService=w(Re),this.loadingevidenceInfo=!1,this.loadingevidenceInfoDriver=!1,this.stopSubscription$=new E,this.infoLoad=[],this.vendorsList=[],this.rolService=w(we),this.authService=w(fe),this.authService.user.subscribe(e=>{this.user=e,this.user.rolId!=null&&this.rolService.getRol(this.user.rolId).valueChanges().subscribe(i=>{this.infoLoad=i,this.userlevelAccess=this.infoLoad.optionAccessLavel})}),this.dateFilterForm=this.fb.group({selectedDate:[null]}),this.dateFilterFormDriver=this.fb.group({selectedDate:[null],driverId:[],driver:[],vendorName:[],vendorId:[]}),this.vendorsService.getVendors().pipe(T(this.stopSubscription$),_(e=>e.map(i=>{let a=i.payload.doc.id,p=i.payload.doc.data();return le(b({},p),{id:a})}))).subscribe(e=>{this.vendorsList=e})}onDateChangeDriver(){this.evidenceInfoDriver=[],this.driversList=[]}ngOnDestroy(){this.stopSubscription$.next(void 0),this.stopSubscription$.complete()}onVendorSelected(t,o){if(t){this.evidenceInfoDriver=[],this.driversList=[];let i=ae.filter(this.vendorsList,a=>a.id==t)[0];this.fillDataDriver(i.id)}}fillDataDriver(t){this.driverService.getDrivers(t).pipe(_(o=>o.map(e=>{let i=e.payload.doc.id,a=e.payload.doc.data();return b({id:i},a)}))).subscribe(o=>{console.log(o),this.driversList=o})}ngOnInit(){}onDriverSelected(t,o){if(this.evidenceInfoDriver=[],t){let e="";this.dateFilterFormDriver&&(e=this.dateFilterFormDriver.get("selectedDate").value);let i=this.datePipe.transform(e,"dd-MM-yyyy");console.log(i);let p=ae.filter(this.driversList,g=>g.id==t)[0];console.log("DriveSelected"),console.log(i+" == "+p.id),this.driverService.getEvidenceDriversperDriver(i.toString(),p.id).pipe(_(g=>g.map(y=>{let I=y.payload.doc.id,z=y.payload.doc.data();return b({id:I},z)}))).subscribe(g=>{this.evidenceInfoDriver=g,console.log(this.evidenceInfoDriver),this.loadingevidenceInfoDriver=!1},g=>{this.loadingevidenceInfoDriver=!1})}}onDateChange(){this.loadingevidenceInfo=!0;let t=this.dateFilterForm.get("selectedDate").value;if(t!==void 0){let o=new Date(t);this.driverService.getEvidenceDrivers(o).pipe(_(e=>e.map(i=>{let a=i.payload.doc.id,p=i.payload.doc.data();return b({id:a},p)}))).subscribe(e=>{this.evidenceInfo=e,this.loadingevidenceInfo=!1},e=>{console.error("Error fetching evidence:",e),this.loadingevidenceInfo=!1})}}};d.\u0275fac=function(o){return new(o||d)(F(re),F($))},d.\u0275cmp=N({type:d,selectors:[["app-evidence"]],decls:34,vars:7,consts:[["basicTable",""],["basicTableDriver",""],[2,"margin","buttom 15px"],[1,"site-page-header-ghost-wrapper"],[1,"body"],["nzTitle","Evidencias Generales"],[2,"margin-bottom","10px",3,"formGroup"],["for","selectedDate"],["type","date","id","selectedDate","formControlName","selectedDate",3,"change"],[3,"nzData","nzLoading","nzLoadingDelay",4,"ngIf"],["nzTitle","Evidencias por PR"],[2,"width","160px"],[3,"formGroup"],["formControlName","vendorId","nzAllowClear","","nzPlaceHolder","Selecciona la estaci\xF3n",2,"width","450px",3,"ngModelChange"],["nzCustomContent","",3,"nzLabel","nzValue",4,"ngFor","ngForOf"],["formControlName","driver","nzAllowClear","","nzPlaceHolder","Seleccione un PR",2,"width","450px",3,"ngModelChange"],[3,"nzValue","nzLabel",4,"ngFor","ngForOf"],["nzTitle","Evidencias por Programa"],["nzTitle","Evidencias por Ruta"],[3,"nzData","nzLoading","nzLoadingDelay"],[2,"color","#4F6F57"],[4,"ngFor","ngForOf"],[3,"href"],[3,"audioUrl"],["nzCustomContent","",3,"nzLabel","nzValue"],["nz-icon","","nzType","flag"],[3,"nzValue","nzLabel"]],template:function(o,e){o&1&&(n(0,"div",2)(1,"div",3)(2,"nz-page-header")(3,"nz-page-header-title"),l(4,"Evidencias"),r()(),n(5,"div",4)(6,"nz-tabset")(7,"nz-tab",5)(8,"div",6)(9,"label",7),l(10," Selecciona una Fecha: "),r(),n(11,"input",8),h("change",function(){return e.onDateChange()}),r()(),n(12,"div"),S(13,Qe,16,4,"nz-table",9),r()(),n(14,"nz-tab",10)(15,"div",6)(16,"nz-form-label",11),l(17," Selecciona una Fecha"),r(),n(18,"input",8),h("change",function(){return e.onDateChangeDriver()}),r()(),n(19,"div",12)(20,"nz-form-control")(21,"nz-form-label",11),l(22,"Clientes"),r(),n(23,"nz-select",13),h("ngModelChange",function(a){return e.onVendorSelected(a,"vendorName")}),S(24,Xe,5,4,"nz-option",14),r()(),n(25,"nz-form-control")(26,"nz-form-label",11),l(27,"PR"),r(),n(28,"nz-select",15),h("ngModelChange",function(a){return e.onDriverSelected(a,"vendorName")}),S(29,Ze,1,2,"nz-option",16),r()()(),n(30,"div"),S(31,tt,16,4,"nz-table",9),r()(),f(32,"nz-tab",17)(33,"nz-tab",18),r()()()()),o&2&&(m(8),u("formGroup",e.dateFilterForm),m(5),u("ngIf",e.evidenceInfo),m(2),u("formGroup",e.dateFilterFormDriver),m(4),u("formGroup",e.dateFilterFormDriver),m(5),u("ngForOf",e.vendorsList),m(5),u("ngForOf",e.driversList),m(2),u("ngIf",e.evidenceInfoDriver))},dependencies:[x,me,U,G,H,ze,Fe,K,Ie,Te,Ee,Q,j,W,B,k,q,ce,L,M,O,A,J,Y,xe,re]});let s=d;return s})();export{it as a,gt as b,Nt as c};
