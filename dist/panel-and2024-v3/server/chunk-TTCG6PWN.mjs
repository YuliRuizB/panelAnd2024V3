import './polyfills.server.mjs';
import{a as K}from"./chunk-NFPNENJI.mjs";import{a as y}from"./chunk-D5DKPN6X.mjs";import{a as Z,b as J}from"./chunk-MHFPM2PG.mjs";import{Sc as U}from"./chunk-U54QTU6P.mjs";import{a as H,c as Q,g as B,h as $,j as q}from"./chunk-ULKZQOUE.mjs";import{a as P}from"./chunk-G6GCGFEN.mjs";import{a as O}from"./chunk-U2JW5KLK.mjs";import{Lb as V,Vb as j,pa as G,rb as k,wb as z,xb as _}from"./chunk-F3VCI4QE.mjs";import{Ab as I,Bb as h,Cb as n,Db as v,Eb as M,Fb as A,Ia as d,Ja as g,Pa as T,Ua as u,Vb as R,Wa as c,ha as D,hb as e,ib as t,jb as r,nb as E,oa as w,pa as S,q as x,qb as b,sb as f,xc as F,yb as C,yc as L,zb as N}from"./chunk-WNM5W7LL.mjs";var X=["map"];function Y(a,l){a&1&&r(0,"i",50)}function ee(a,l){a&1&&r(0,"i",51)}function te(a,l){a&1&&r(0,"i",52)}function ie(a,l){a&1&&r(0,"i",53)}function ne(a,l){if(a&1&&(e(0,"div",45),u(1,Y,1,0,"i",46)(2,ee,1,0,"i",47)(3,te,1,0,"i",48)(4,ie,1,0,"i",49),t()),a&2){let s=f().$implicit;d(),c("ngIf",s.type=="access"),d(),c("ngIf",s.type=="Attached file"),d(),c("ngIf",s.type=="Commented"),d(),c("ngIf",s.type=="duplicate")}}function ae(a,l){if(a&1&&(e(0,"nz-timeline-item",40)(1,"div",41)(2,"h5",42),n(3),t(),e(4,"p",9)(5,"span",43),n(6),t(),e(7,"span",29),n(8),t()(),e(9,"span",44),r(10,"i",28),e(11,"span",29),n(12),t()()(),u(13,ne,5,4,"ng-template",null,3,R),t()),a&2){let s=l.$implicit,i=h(14),o=f();c("nzDot",i),d(3),v(s.studentName),d(3),A("",s.vehicle," - ",s.route,""),d(2),M(" ",s.studentId,""),d(4),v(o.formatDate(s.created))}}var ye=(()=>{let l=class l{constructor(i,o){this.logisticsService=i,this.zone=o,this.lat=37.75,this.lng=-122.41,this.loading=!1,this.ColumnDefs=[{headerName:"Fecha",field:"created",cellRenderer:m=>m&&m.value?z(_(m.value.seconds),"MM/dd/yyyy HH:mm",{locale:y}):""},{headerName:"Alumno",field:"studentName",sortable:!0},{headerName:"Matr\xEDcula",field:"studentId",sortable:!0,enableValue:!0,allowedAggFuncs:["count"]},{headerName:"Ingreso con",field:"studentId",sortable:!0,enableValue:!0,allowedAggFuncs:["count"]},{headerName:"Evento",field:"event",sortable:!0,enableRowGroup:!0},{headerName:"Tipo",field:"type",sortable:!0,enableRowGroup:!0},{headerName:"Descripci\xF3n",field:"description",sortable:!0},{headerName:"Ruta",field:"route",enableRowGroup:!0},{headerName:"Turno",field:"round",enableRowGroup:!0},{headerName:"Programa",field:"program",enableRowGroup:!0},{headerName:"Veh\xEDculo",field:"vehicle",enableRowGroup:!0},{headerName:"\xBFSubi\xF3?",field:"allowedOnBoard",enableRowGroup:!0}],this.markers=[],this.startDate=V(),this.endDate=k()}ngOnInit(){this.markers=this.logisticsService.getMarkers(this.startDate,this.endDate)}ngAfterViewInit(){}ngOnDestroy(){}initializeMap(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(i=>{this.lat=i.coords.latitude,this.lng=i.coords.longitude,this.map.flyTo({center:[this.lng,this.lat]})}),this.buildMap()}formatDate(i){return z(_(i.seconds),"HH:mm",{locale:y})}buildMap(){}flyTo(i){this.map.flyTo({center:i.geometry.coordinates})}loadMap(){}loadData(){this.logisticsService.getActivityLog(this.startDate,this.endDate).pipe(x(i=>i.map(o=>{let m=o.payload.doc.data(),p=o.payload.doc.id;return m}))).subscribe(i=>{console.log(i),this.rowData=i,this.activityList=this.rowData.slice(0,5),this.chartData=this.rowData.map(o=>({country:o.vehicle,visits:o.studentId}))})}onGridReady(i){this.gridApi=i.api,this.gridColumnApi=i.columnApi}};l.\u0275fac=function(o){return new(o||l)(g(K),g(T))},l.\u0275cmp=D({type:l,selectors:[["app-main"]],viewQuery:function(o,m){if(o&1&&C(X,7),o&2){let p;N(p=I())&&(m.mapElement=p.first)}},decls:91,vars:8,consts:[["projectCompletionDropDown","nzDropdownMenu"],["agGrid",""],["map",""],["dotTemplate",""],[1,"page-header"],[1,"d-md-flex","align-items-md-center","justify-content-between"],[1,"media","m-v-10","align-items-center"],["nz-icon","user","nz-size","50","nz-src","assets/images/avatars/thumb-3.jpg",2,"background-color","white","color","#4F6F57"],[1,"media-body","m-l-15"],[1,"m-b-0"],[1,"text-gray"],[1,"d-md-flex","align-items-center","d-none"],[1,"media","align-items-center","m-r-40","m-v-5"],[1,"font-size-27"],["nz-icon","","nzType","profile","theme","outline",1,"text-primary"],[1,"d-flex","align-items-center","m-l-10"],[1,"m-b-0","m-r-5"],["nz-icon","","nzType","appstore","theme","outline",1,"text-success"],[1,"media","align-items-center","m-v-5"],["nz-icon","","nzType","team","theme","outline",1,"text-danger"],[1,"row"],[1,"col-lg-9"],[1,"d-flex","justify-content-between","align-items-center"],[1,"mb-0"],["nz-dropdown","",1,"text-dark","font-size-20",3,"nzTrigger","nzPlacement","nzDropdownMenu"],["nz-icon","","nzType","ellipsis","theme","outline"],["nz-menu",""],["nz-menu-item",""],["nz-icon","","nzType","clock-circle","theme","outline"],[1,"m-l-5"],[1,"d-md-flex","justify-content-space","m-t-50"],["id","chartdiv",2,"width","100%","height","500px"],[1,"col-lg-3"],[1,"m-t-40"],[1,"overflow-y-auto","p-l-10","p-t-15"],[3,"nzDot",4,"ngFor","ngForOf"],[1,"col-lg-12"],[1,"m-t-30"],[1,"ag-theme-material",2,"width","100%","height","500px",3,"gridReady","rowData","columnDefs","groupIncludeFooter","sideBar"],["id","map",1,"match-parent"],[3,"nzDot"],[1,"m-l-20"],[1,"m-b-5"],[1,"font-weight-semibold"],[1,"text-muted","font-size-13"],[1,"font-size-20","p-5"],["class","text-success","nz-icon","","nzType","check","theme","outline",4,"ngIf"],["class","text-info","nz-icon","","nzType","paper-clip","theme","outline",4,"ngIf"],["class","text-info","nz-icon","","nzType","message","theme","outline",4,"ngIf"],["class","text-danger","nz-icon","","nzType","close-circle","theme","outline",4,"ngIf"],["nz-icon","","nzType","check","theme","outline",1,"text-success"],["nz-icon","","nzType","paper-clip","theme","outline",1,"text-info"],["nz-icon","","nzType","message","theme","outline",1,"text-info"],["nz-icon","","nzType","close-circle","theme","outline",1,"text-danger"]],template:function(o,m){if(o&1){let p=E();e(0,"div",4)(1,"div",5)(2,"div",6),r(3,"nz-avatar",7),e(4,"div",8)(5,"h4",9),n(6,"Seguimiento de actividades"),t(),e(7,"span",10),n(8,"Sistema de monitoreo"),t()()(),e(9,"div",11)(10,"div",12)(11,"div",13),r(12,"i",14),t(),e(13,"div",15)(14,"h2",16),n(15,"0"),t(),e(16,"span",10),n(17,"Veh\xEDculos"),t()()(),e(18,"div",12)(19,"div",13),r(20,"i",17),t(),e(21,"div",15)(22,"h2",16),n(23,"0"),t(),e(24,"span",10),n(25,"Acceso"),t()()(),e(26,"div",18)(27,"div",13),r(28,"i",19),t(),e(29,"div",15)(30,"h2",16),n(31,"0"),t(),e(32,"span",10),n(33,"Negados"),t()()()()()(),e(34,"div",20)(35,"div",21)(36,"nz-card")(37,"div",22)(38,"h5",23),n(39,"Diagrama de actividad "),t(),e(40,"div")(41,"a",24),r(42,"i",25),t(),e(43,"nz-dropdown-menu",null,0)(45,"ul",26)(46,"li",27),r(47,"i",28),e(48,"span",29),n(49,"Matutino"),t()(),e(50,"li",27),r(51,"i",28),e(52,"span",29),n(53,"Vespertino"),t()(),e(54,"li",27),r(55,"i",28),e(56,"span",29),n(57,"Ayer"),t()(),e(58,"li",27),r(59,"i",28),e(60,"span",29),n(61,"Anti\xE9r"),t()()()()()(),e(62,"div",30),r(63,"div",31),t()()(),e(64,"div",32)(65,"nz-card")(66,"div",22)(67,"h5",23),n(68,"Actividad"),t()(),e(69,"div",33)(70,"div",34)(71,"nz-timeline"),u(72,ae,15,6,"nz-timeline-item",35),t()()()()()(),e(73,"div",20)(74,"div",36)(75,"nz-card")(76,"div",22)(77,"h5",23),n(78,"Informaci\xF3n detallada"),t()(),e(79,"div",37)(80,"ag-grid-angular",38,1),b("gridReady",function(W){return w(p),S(m.onGridReady(W))}),t()()()()(),e(82,"div",20)(83,"div",36)(84,"nz-card")(85,"div",22)(86,"h5",23),n(87,"Mapa"),t()(),e(88,"div",37),r(89,"div",39,2),t()()()()}if(o&2){let p=h(44);d(41),c("nzTrigger","click")("nzPlacement","bottomRight")("nzDropdownMenu",p),d(31),c("ngForOf",m.activityList),d(8),c("rowData",m.rowData)("columnDefs",m.ColumnDefs)("groupIncludeFooter",!0)("sideBar",!0)}},dependencies:[F,L,U,G,O,Q,H,B,$,q,j,P,Z,J],styles:[".match-parent[_ngcontent-%COMP%]{width:100%!important;height:600px!important;background-color:#f6f6f4}"]});let a=l;return a})();export{ye as a};
