import './polyfills.server.mjs';
import{a as Ae}from"./chunk-ZQDFMAG5.mjs";import{a as D,b as Ue,c as se,e as pe,f as X}from"./chunk-NRCMYL2Y.mjs";import{a as V}from"./chunk-G6GCGFEN.mjs";import{a as je}from"./chunk-U2JW5KLK.mjs";import{$ as Ve,L as me,N as w,O,P as I,Q as T,_ as ce,aa as de,b,ba as ue,c as d,e as y,f as _,i as x,ia as ge,ja as fe,k as F,m as M,n as Re,o as re,p as ae,q as N,u as W,v as E,w as P,x as k}from"./chunk-KMWCCYID.mjs";import{Vb as R,Wb as U,Yb as j,pa as $,u as le}from"./chunk-F3VCI4QE.mjs";import{Bb as ne,Cb as n,Eb as J,Ec as De,Ia as m,Ja as u,Mb as we,Rb as Oe,Sb as Ie,Ua as v,V as Q,Vb as K,Wa as l,d as B,ha as z,hb as e,ib as t,jb as c,kb as ee,lb as te,nb as H,oa as C,pa as S,pd as oe,q as G,qb as f,sb as ve,xc as ie,yc as Te}from"./chunk-WNM5W7LL.mjs";import{a as q,h as ke}from"./chunk-H6KHSOBK.mjs";var ut=(()=>{let i=class i{constructor(o,r,s){this.authService=o,this.fb=r,this.notification=s}submitForm(){for(let o in this.loginForm.controls)this.loginForm.controls[o].markAsDirty(),this.loginForm.controls[o].updateValueAndValidity();this.loginForm.valid?this.authService.signIn(this.loginForm.get("userName")?.value,this.loginForm.get("password")?.value):this.notification.create("error","\xA1Oops...!","Escriba por favor sus datos para tener acceso")}ngOnInit(){this.loginForm=this.fb.group({userName:[null,[d.required]],password:[null,[d.required]]})}};i.\u0275fac=function(r){return new(r||i)(u(E),u(N),u(W))},i.\u0275cmp=z({type:i,selectors:[["app-login"]],decls:34,vars:4,consts:[[1,"container-fluid","h-100","d-flex","align-items-center","justify-content-center"],[1,"p-v-15"],[1,"container"],[1,"row","align-items-center","justify-content-center"],[1,"col-md-5"],[1,"text-center"],[1,"m-t-20"],["nzIcon","user",3,"nzSize","nzSrc"],[1,"m-b-30"],["nz-form","",3,"ngSubmit","nzLayout","formGroup"],["nzRequired","","nzFor","userName"],["nzErrorTip","Por favor ingrese su correo!"],["nzPrefixIcon","user"],["type","text","nz-input","","formControlName","userName","placeholder","Correo Electr\xF3nico"],["nzRequired","","nzFor","password"],["routerLink","/authentication/forgot-password",1,"float-right","font-size-13","p-t-10","text-muted"],["nzErrorTip","\xA1Por favor ingrese su contrase\xF1a!"],["nzPrefixIcon","lock"],["type","password","nz-input","","formControlName","password","placeholder","Contrase\xF1a"],[1,"d-flex","align-items-center","justify-content-between"],[1,"font-size-13","text-muted"],["routerLink","/authentication/signup",1,"small",2,"color","#4F6F57"],["nz-button","","nzType","primary",1,"login-form-button",3,"click"]],template:function(r,s){r&1&&(e(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"nz-card",5)(6,"h2",6),n(7,"Portal AND"),t(),c(8,"nz-avatar",7)(9,"p",8),e(10,"form",9),f("ngSubmit",function(){return s.submitForm()}),e(11,"nz-form-item")(12,"nz-form-label",10),n(13,"Correo Electr\xF3nico"),t(),e(14,"nz-form-control",11)(15,"nz-input-group",12),c(16,"input",13),t()()(),e(17,"nz-form-item")(18,"nz-form-label",14),n(19,"Contrase\xF1a"),t(),e(20,"a",15),n(21,"\xBFOlvid\xF3 su contrase\xF1a?"),t(),e(22,"nz-form-control",16)(23,"nz-input-group",17),c(24,"input",18),t()()(),e(25,"nz-form-item")(26,"nz-form-control")(27,"div",19)(28,"span",20),n(29,"\xBFNo tiene una cuenta? "),e(30,"a",21),n(31,"Registrarse"),t()(),e(32,"button",22),f("click",function(){return s.submitForm()}),n(33,"Ingresar"),t()()()()()()()()()()()),r&2&&(m(8),l("nzSize",64)("nzSrc","assets/images/logo/andlogoInit.png"),m(2),l("nzLayout","vertical")("formGroup",s.loginForm))},dependencies:[k,P,O,w,T,I,D,se,je,j,R,U,V,oe,x,b,y,_,F,M],styles:['@charset "UTF-8";[_nghost-%COMP%]{--bright-blue: oklch(51.01% .274 263.83);--electric-violet: oklch(53.18% .28 296.97);--french-violet: oklch(47.66% .246 305.88);--vivid-pink: oklch(69.02% .277 332.77);--hot-red: oklch(61.42% .238 15.34);--orange-red: oklch(63.32% .24 31.68);--gray-900: oklch(19.37% .006 300.98);--gray-700: oklch(36.98% .014 302.71);--gray-400: oklch(70.9% .015 304.04);--red-to-pink-to-purple-vertical-gradient: linear-gradient( 180deg, var(--orange-red) 0%, var(--vivid-pink) 50%, var(--electric-violet) 100% );--red-to-pink-to-purple-horizontal-gradient: linear-gradient( 90deg, var(--orange-red) 0%, var(--vivid-pink) 50%, var(--electric-violet) 100% );--pill-accent: var(--bright-blue);font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol;box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}h1[_ngcontent-%COMP%]{font-size:3.125rem;color:var(--gray-900);font-weight:500;line-height:100%;letter-spacing:-.125rem;margin:0;font-family:Inter Tight,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol}p[_ngcontent-%COMP%]{margin:0;color:var(--gray-700)}main[_ngcontent-%COMP%]{width:100%;min-height:100%;display:flex;justify-content:center;align-items:center;padding:1rem;box-sizing:inherit;position:relative}.angular-logo[_ngcontent-%COMP%]{max-width:9.2rem}.content[_ngcontent-%COMP%]{display:flex;justify-content:space-around;width:100%;max-width:700px;margin-bottom:3rem}.content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-top:1.75rem}.content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:1.5rem}.divider[_ngcontent-%COMP%]{width:1px;background:var(--red-to-pink-to-purple-vertical-gradient);margin-inline:.5rem}.pill-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:start;flex-wrap:wrap;gap:1.25rem}.pill[_ngcontent-%COMP%]{display:flex;align-items:center;--pill-accent: var(--bright-blue);background:color-mix(in srgb,var(--pill-accent) 5%,transparent);color:var(--pill-accent);padding-inline:.75rem;padding-block:.375rem;border-radius:2.75rem;border:0;transition:background .3s ease;font-family:var(--inter-font);font-size:.875rem;font-style:normal;font-weight:500;line-height:1.4rem;letter-spacing:-.00875rem;text-decoration:none}.pill[_ngcontent-%COMP%]:hover{background:color-mix(in srgb,var(--pill-accent) 15%,transparent)}.content[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh}.left-side[_ngcontent-%COMP%]{text-align:center}.left-side[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:20px}.pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n+1){--pill-accent: var(--bright-blue)}.pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n+2){--pill-accent: var(--french-violet)}.pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n+3), .pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n+4), .pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n+5){--pill-accent: var(--hot-red)}.pill-group[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{margin-inline-start:.25rem}.social-links[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.73rem;margin-top:1.5rem}.social-links[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{transition:fill .3s ease;fill:var(--gray-400)}.social-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{fill:var(--gray-900)}@media screen and (max-width: 650px){.content[_ngcontent-%COMP%]{flex-direction:column;width:max-content}.divider[_ngcontent-%COMP%]{height:1px;width:100%;background:var(--red-to-pink-to-purple-horizontal-gradient);margin-block:1.5rem}}']});let a=i;return a})();var Ge=ke(Ve());function We(a,i){if(a&1){let h=H();e(0,"div")(1,"button",1),f("click",function(){C(h);let r=ve();return S(r.destroyModal())}),n(2,"Custom Callback"),t(),e(3,"button",1),f("click",function(){C(h);let r=ve();return S(r.destroyModal())}),n(4,"Custom Submit"),t()()}}var Y=(()=>{let i=class i{constructor(o){this.modal=o}destroyModal(){this.modal.destroy()}ngOnInit(){}};i.\u0275fac=function(r){return new(r||i)(u(pe))},i.\u0275cmp=z({type:i,selectors:[["app-terms"]],decls:14,vars:0,consts:[[4,"nzModalFooter"],["nz-button","",2,"background-color","#4F6F57","color","#f6f3ea",3,"click"]],template:function(r,s){r&1&&(e(0,"div")(1,"p"),n(2,"terms works!"),t(),e(3,"p"),n(4,"Modal Content"),t(),e(5,"p"),n(6,"Modal Content"),t(),e(7,"p"),n(8,"Modal Content"),t(),e(9,"p"),n(10,"Modal Content"),t(),e(11,"p"),n(12,"Modal Content"),t()(),v(13,We,5,0,"div",0))}});let a=i;return a})();var qe=(()=>{let i=class i{constructor(o){this.modal=o}destroyModal(){this.modal.destroy()}ngOnInit(){}};i.\u0275fac=function(r){return new(r||i)(u(pe))},i.\u0275cmp=z({type:i,selectors:[["app-privacy"]],decls:35,vars:0,consts:[[1,"container-fluid","h-100",2,"background-color","white","color","black"],[1,"d-flex","h-100","p-v-15","flex-column","justify-content-between"],[1,"d-none","d-md-flex","p-h-40"],["src","assets/images/logo/andlogo.png","alt",""],[1,"container"],[1,"row","align-items-center"],["href","/external-privacy","target","_blank"]],template:function(r,s){r&1&&(e(0,"div",0)(1,"div",1)(2,"div",2),c(3,"img",3),t(),e(4,"div",4)(5,"div",5)(6,"h2"),n(7,"Datos Personales"),t(),e(8,"p"),n(9,"Recopilamos y utilizamos informaci\xF3n personal con el objetivo de mejorar nuestros servicios y proporcionar una mejor experiencia al usuario. Esta informaci\xF3n puede incluir nombres, direcciones de correo electr\xF3nico, direcciones f\xEDsicas, entre otros."),t(),e(10,"h2"),n(11,"Uso de Im\xE1genes"),t(),e(12,"p"),n(13,"Las im\xE1genes que se recopilan y utilizan en nuestra plataforma son exclusivamente para proporcionar contenido visual y mejorar la experiencia del usuario. Estas im\xE1genes no se comparten con terceros sin su consentimiento expreso."),t(),e(14,"h2"),n(15,"GPS y Localizaci\xF3n"),t(),e(16,"p"),n(17,"Algunos servicios pueden requerir acceso a la ubicaci\xF3n del dispositivo para brindar funcionalidades espec\xEDficas. Nos comprometemos a utilizar esta informaci\xF3n \xFAnicamente con el prop\xF3sito indicado y no compartirla con terceros sin su autorizaci\xF3n."),t(),e(18,"h2"),n(19,"Uso y Compartimiento de Datos"),t(),e(20,"p"),n(21,"No vendemos, compartimos ni transferimos informaci\xF3n personal a terceros, a menos que se cuente con su permiso o que la ley as\xED lo requiera. Utilizamos sus datos para mejorar nuestros servicios y personalizar su experiencia con nosotros."),t(),e(22,"h2"),n(23,"Seguridad"),t(),e(24,"p"),n(25,"Nos comprometemos a asegurar que su informaci\xF3n est\xE9 segura. Implementamos medidas de seguridad f\xEDsicas, electr\xF3nicas y procedimentales para proteger su informaci\xF3n."),t(),e(26,"p"),n(27,"\xDAltima actualizaci\xF3n: 12 Diciembre 2023"),t(),e(28,"h2"),n(29,"M\xE1s Informaci\xF3n"),t(),e(30,"p"),n(31,"Puede obtener m\xE1s informaci\xF3n visitando nuestra p\xE1gina "),e(32,"a",6),n(33,"aqu\xED"),t(),n(34,". "),t()()()()())},encapsulation:2});let a=i;return a})();var Z=(()=>{let i=class i{constructor(o){this.modalService=o}showModalTerms(){this.modalService.create({nzTitle:"T\xE9rminos y Condiciones de Uso",nzContent:Y})}showModalPrivacy(){this.modalService.create({nzTitle:"Privacidad",nzContent:qe,nzFooter:null})}showModalBaja(){this.modalService.create({nzTitle:"Baja de Usuario",nzContent:Ae,nzFooter:null})}};i.\u0275fac=function(r){return new(r||i)(u(X))},i.\u0275cmp=z({type:i,selectors:[["app-footer"]],decls:9,vars:0,consts:[[1,"footer"],[1,"footer-content","justify-content-between"],[1,"m-b-0"],[1,"text-gray","m-r-15",3,"click"],[1,"text-gray",3,"click"]],template:function(r,s){r&1&&(e(0,"footer",0)(1,"div",1)(2,"p",2),n(3,"Copyright \xA9 2020 Apps And SA de CV. Todos los derechos reservados."),t(),e(4,"span")(5,"a",3),f("click",function(){return s.showModalPrivacy()}),n(6,"Privacidad"),t(),e(7,"a",4),f("click",function(){return s.showModalBaja()}),n(8,"Baja Usuario"),t()()()())},encapsulation:2});let a=i;return a})();function tt(a,i){if(a&1&&(e(0,"nz-option",35),c(1,"i",36),n(2),t()),a&2){let h=i.$implicit;l("nzLabel",h.name)("nzValue",h.id),m(2),J(" ",h.name," ")}}var xt=(()=>{let i=class i{constructor(o,r,s,p,g,L,ze){this.fb=o,this.afs=r,this.modalService=s,this.customersService=p,this.routesService=g,this.authService=L,this.notification=ze,this.isLoadingOne=!1,this.stopSubscription$=new B,this.userRoutes=[],this.accountId$=new B,this.cCollection=this.afs.collection("customers",He=>He.where("active","==",!0))}ngOnInit(){this.signUpForm=this.fb.group({email:[null,[d.email,d.required]],password:[null,[d.required,d.minLength(8),d.pattern("^[A-Za-z0-9 ]+$")]],checkPassword:[null,[d.required]],firstName:[null,[d.required,d.minLength(5),d.maxLength(50)]],lastName:[null,[d.required,d.minLength(5),d.maxLength(60)]],userName:[""],phoneNumber:[""],defaultRoute:[""],defaultRouteName:[""],defaultRound:[""],round:[""],customerId:[""],customerName:[""],studentId:[""],terms:[!0],defaultStopId:[""],defaultStopName:[""],customer_id:[""],refreshToken:[""],token:[""],dateCreateUserFormat:[""],dateCreateUserFull:[""],status:["active"],agree:[null],roundTrip:[],turno:[],rolId:["54YNS3xlSLPc6UzNq2HJ"],photoURL:[""],deviceInfo:this.fb.group({lastDataConnectWithHour:[""],lastDateConnect:[""],lastDateConnectFull:[""],manufacturer:[""],model:[""],platform:["web"],versionPlatformAppStore:[""],versionPlatformAppStoreString:[""],versionPlatformDevice:[""],platformPermisionStatus:this.fb.group({businesName:[""],id:[""],idDoc:[""]}),businesPlatform:this.fb.group({businesName:[""],businesType:[""],currentVersion:[""],id:[""],idDoc:[""]})})}),this.customers$=this.cCollection.snapshotChanges().pipe(G(o=>o.map(r=>{let s=r.payload.doc.id,p=r.payload.doc.data();return q({id:s},p)})))}submitForm(){for(let o in this.signUpForm.controls)this.signUpForm.controls[o].markAsDirty(),this.signUpForm.controls[o].updateValueAndValidity();this.signUpForm.valid&&(console.log(this.signUpForm.value),this.isLoadingOne=!0,this.authService.signUp(this.signUpForm.value).then(o=>{this.isLoadingOne=!1}).catch(o=>{this.notification.create("error","Submit form error",o)}))}updateConfirmValidator(){Promise.resolve().then(()=>this.signUpForm.controls.checkPassword.updateValueAndValidity())}showModalTerms(){this.modalService.create({nzTitle:"T\xE9rminos y Condiciones de Uso",nzContent:Y})}onCustomerSelected(o){console.log(o)}fillCustomerRouteEditUser(o){this.routesService.getRoutes(o).pipe(Q(this.stopSubscription$),G(r=>r.map(s=>{let p=s.payload.doc.id,g=s.payload.doc.data();return q({id:p},g)}))).subscribe(r=>{this.userRoutes=r})}onRouteEditUserSelected(o,r){if(o!=null&&o!=""){let p=Ge.filter(r,g=>g.routeId==o)[0];this.signUpForm.controls.defaultRouteName.setValue(p.name)}}ngOnDestroy(){this.stopSubscription$.next(void 0),this.stopSubscription$.complete(),this.customerSuscription&&this.customerSuscription.unsubscribe()}};i.\u0275fac=function(r){return new(r||i)(u(N),u(le),u(X),u(ce),u(de),u(E),u(W))},i.\u0275cmp=z({type:i,selectors:[["ng-component"]],decls:70,vars:19,consts:[[1,"container-fluid","h-100",2,"background-color","white","color","black"],[1,"d-flex","h-100","p-v-15","flex-column","justify-content-between"],[1,"d-none","d-md-flex","p-h-40"],["src","assets/images/logo/andlogo.png","alt",""],[1,"container"],[1,"row","align-items-center"],[1,"col-md-6","d-none","d-md-block"],["src","assets/images/others/Registro.png","alt","",1,"img-fluid"],[1,"m-l-auto","col-md-5"],[1,"m-t-20"],[1,"m-b-30"],["nz-form","","nzLayout","horizontal",1,"login-form",3,"ngSubmit","formGroup"],["nzRequired","","nzFor","name",3,"nzSpan"],["nzHasFeedback","",3,"nzSpan"],["type","text","nz-input","","formControlName","firstName","placeholder","Nombre","id","firstName"],["nzRequired","","nzFor","lastName",3,"nzSpan"],["type","text","nz-input","","formControlName","lastName","placeholder","Apellidos","id","lastName"],["nzRequired","","nzFor","email",3,"nzSpan"],["type","email","nz-input","","formControlName","email","placeholder","Correo Electr\xF3nico","id","email"],["nzRequired","","nzFor","password",3,"nzSpan"],["nz-icon","","nz-tooltip","","nzTitle","La contrase\xF1a deber\xE1 contener al menos 8 caracteres y s\xF3lo acepta letras y n\xFAmeros","type","question-circle","nzTheme","outline"],["type","password","nz-input","","formControlName","password","placeholder","Contrase\xF1a","id","password"],["nzFor","checkPassword","nzRequired","",3,"nzSpan"],["nz-input","","type","password","formControlName","checkPassword","placeholder","Confirmar contrase\xF1a","id","checkPassword"],["nzFor","phoneNumber",3,"nzSpan"],["nz-icon","","nz-tooltip","","nzTitle","\xBFEn qu\xE9 n\xFAmero telef\xF3nico te podemos contactar?","type","question-circle","nzTheme","outline"],[3,"nzSpan"],["nz-input","","formControlName","phoneNumber","placeholder","81 1234 5678","id","phoneNumber","name","phoneNumber","minlength","10","maxlength","10"],[3,"nzSm","nzXs"],["formControlName","customerId","nzAllowClear","","nzPlaceHolder","Selecciona la Empresa",3,"ngModelChange"],["nzCustomContent","",3,"nzLabel","nzValue",4,"ngFor","ngForOf"],[1,"d-flex","align-items-center","justify-content-between"],["nz-checkbox","","formControlName","agree"],[3,"click"],["nz-button","",1,"login-form-button",2,"background-color","#4F6F57","color","#f6f3ea"],["nzCustomContent","",3,"nzLabel","nzValue"],["nz-icon","","nzType","fork"]],template:function(r,s){r&1&&(e(0,"div",0)(1,"div",1)(2,"div",2),c(3,"img",3),t(),e(4,"div",4)(5,"div",5)(6,"div",6),c(7,"img",7),t(),e(8,"div",8)(9,"nz-card")(10,"h2",9),n(11,"Registrarse"),t(),e(12,"p",10),n(13,"Cree su cuenta para obtener acceso"),t(),e(14,"form",11),f("ngSubmit",function(){return s.submitForm()}),e(15,"nz-form-item")(16,"nz-form-label",12),n(17,"Nombre"),t(),e(18,"nz-form-control",13),c(19,"input",14),t()(),e(20,"nz-form-item")(21,"nz-form-label",15),n(22,"Apellidos"),t(),e(23,"nz-form-control",13),c(24,"input",16),t()(),e(25,"nz-form-item")(26,"nz-form-label",17),n(27,"Correo"),t(),e(28,"nz-form-control",13),c(29,"input",18),t()(),e(30,"nz-form-item")(31,"nz-form-label",19)(32,"span"),n(33," Contrase\xF1a "),c(34,"i",20),t()(),e(35,"nz-form-control",13),c(36,"input",21),t()(),e(37,"nz-form-item")(38,"nz-form-label",22),n(39,"Confirmar"),t(),e(40,"nz-form-control",13),c(41,"input",23),t()(),e(42,"nz-form-item")(43,"nz-form-label",24)(44,"span"),n(45," Tel\xE9fono "),c(46,"i",25),t()(),e(47,"nz-form-control",26),c(48,"input",27),t()(),e(49,"nz-form-item")(50,"nz-form-label",26),n(51,"Empresa"),t(),e(52,"nz-form-control",28)(53,"nz-select",29),f("ngModelChange",function(g){return s.onCustomerSelected(g)}),v(54,tt,3,3,"nz-option",30),Oe(55,"async"),t()()(),e(56,"div",31)(57,"nz-form-item")(58,"nz-form-control")(59,"label",32)(60,"span"),n(61,"He le\xEDdo y acepto los "),e(62,"a",33),f("click",function(){return s.showModalTerms()}),n(63,"t\xE9rminos"),t()()()()(),e(64,"nz-form-item")(65,"nz-form-control")(66,"div")(67,"button",34),n(68,"Registrarse"),t()()()()()()()()()(),c(69,"app-footer"),t()()),r&2&&(m(14),l("formGroup",s.signUpForm),m(2),l("nzSpan",8),m(2),l("nzSpan",16),m(3),l("nzSpan",8),m(2),l("nzSpan",16),m(3),l("nzSpan",8),m(2),l("nzSpan",16),m(3),l("nzSpan",8),m(4),l("nzSpan",16),m(3),l("nzSpan",8),m(2),l("nzSpan",16),m(3),l("nzSpan",8),m(4),l("nzSpan",16),m(3),l("nzSpan",8),m(2),l("nzSm",14)("nzXs",24),m(2),l("ngForOf",Ie(55,17,s.customers$)))},dependencies:[ie,$,k,P,O,w,T,I,D,ue,me,j,R,U,V,ge,fe,x,b,y,_,re,ae,F,M,Z,De],encapsulation:2});let a=i;return a})();var Nt=(()=>{let i=class i{};i.\u0275fac=function(r){return new(r||i)},i.\u0275cmp=z({type:i,selectors:[["app-verify-email"]],decls:2,vars:0,template:function(r,s){r&1&&(e(0,"p"),n(1,"verify-email works!"),t())},styles:['@charset "UTF-8";[_nghost-%COMP%]{--bright-blue: oklch(51.01% .274 263.83);--electric-violet: oklch(53.18% .28 296.97);--french-violet: oklch(47.66% .246 305.88);--vivid-pink: oklch(69.02% .277 332.77);--hot-red: oklch(61.42% .238 15.34);--orange-red: oklch(63.32% .24 31.68);--gray-900: oklch(19.37% .006 300.98);--gray-700: oklch(36.98% .014 302.71);--gray-400: oklch(70.9% .015 304.04);--red-to-pink-to-purple-vertical-gradient: linear-gradient( 180deg, var(--orange-red) 0%, var(--vivid-pink) 50%, var(--electric-violet) 100% );--red-to-pink-to-purple-horizontal-gradient: linear-gradient( 90deg, var(--orange-red) 0%, var(--vivid-pink) 50%, var(--electric-violet) 100% );--pill-accent: var(--bright-blue);font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol;box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}h1[_ngcontent-%COMP%]{font-size:3.125rem;color:var(--gray-900);font-weight:500;line-height:100%;letter-spacing:-.125rem;margin:0;font-family:Inter Tight,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol}p[_ngcontent-%COMP%]{margin:0;color:var(--gray-700)}main[_ngcontent-%COMP%]{width:100%;min-height:100%;display:flex;justify-content:center;align-items:center;padding:1rem;box-sizing:inherit;position:relative}.angular-logo[_ngcontent-%COMP%]{max-width:9.2rem}.content[_ngcontent-%COMP%]{display:flex;justify-content:space-around;width:100%;max-width:700px;margin-bottom:3rem}.content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-top:1.75rem}.content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:1.5rem}.divider[_ngcontent-%COMP%]{width:1px;background:var(--red-to-pink-to-purple-vertical-gradient);margin-inline:.5rem}.pill-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:start;flex-wrap:wrap;gap:1.25rem}.pill[_ngcontent-%COMP%]{display:flex;align-items:center;--pill-accent: var(--bright-blue);background:color-mix(in srgb,var(--pill-accent) 5%,transparent);color:var(--pill-accent);padding-inline:.75rem;padding-block:.375rem;border-radius:2.75rem;border:0;transition:background .3s ease;font-family:var(--inter-font);font-size:.875rem;font-style:normal;font-weight:500;line-height:1.4rem;letter-spacing:-.00875rem;text-decoration:none}.pill[_ngcontent-%COMP%]:hover{background:color-mix(in srgb,var(--pill-accent) 15%,transparent)}.content[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh}.left-side[_ngcontent-%COMP%]{text-align:center}.left-side[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:20px}.pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n+1){--pill-accent: var(--bright-blue)}.pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n+2){--pill-accent: var(--french-violet)}.pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n+3), .pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n+4), .pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n+5){--pill-accent: var(--hot-red)}.pill-group[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{margin-inline-start:.25rem}.social-links[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.73rem;margin-top:1.5rem}.social-links[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{transition:fill .3s ease;fill:var(--gray-400)}.social-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{fill:var(--gray-900)}@media screen and (max-width: 650px){.content[_ngcontent-%COMP%]{flex-direction:column;width:max-content}.divider[_ngcontent-%COMP%]{height:1px;width:100%;background:var(--red-to-pink-to-purple-horizontal-gradient);margin-block:1.5rem}}']});let a=i;return a})();var nt=()=>["/authentication/login"];function it(a,i){a&1&&c(0,"i",20)}function ot(a,i){a&1&&c(0,"i",21)}var kt=(()=>{let i=class i{submitForm(){for(let o in this.loginForm.controls)this.loginForm.controls[o].markAsDirty(),this.loginForm.controls[o].updateValueAndValidity();this.loginForm.valid&&this.authService.forgotPassword(this.loginForm.get("userName").value)}constructor(o,r){this.authService=o,this.fb=r}ngOnInit(){this.loginForm=this.fb.group({userName:[null,[d.required]]})}};i.\u0275fac=function(r){return new(r||i)(u(E),u(N))},i.\u0275cmp=z({type:i,selectors:[["app-forgot-password"]],decls:32,vars:4,consts:[["prefixUser",""],["prefixLock",""],[1,"container-fluid","p-h-0","p-v-20","h-100","bg",2,"background-image","url('assets/images/others/login-3.png')"],[1,"d-flex","flex-column","justify-content-between","h-100"],[1,"d-none","d-md-block"],[1,"container"],[1,"row","align-items-center"],[1,"col-md-9","col-lg-7","m-h-auto"],[1,"m-b-100","shadow-lg"],[1,"d-flex","align-items-center","justify-content-between","m-b-30"],["alt","","src","assets/images/logo/andlogoSL.png",1,"img-fluid"],[1,"m-b-0"],["nz-form","",1,"login-form",3,"ngSubmit","formGroup"],["nzRequired","","nzFor","userName"],[3,"nzPrefix"],["type","text","nz-input","","formControlName","userName","placeholder","Escriba su correo electr\xF3nico"],[1,"d-flex","align-items-center","justify-content-between"],[1,"font-size-13","text-muted"],[1,"small",2,"color","#4F6F57",3,"routerLink"],["nz-button","",1,"login-form-button",2,"background-color","#4F6F57","color","#f6f3ea"],["nz-icon","","type","user"],["nz-icon","","type","lock"]],template:function(r,s){if(r&1){let p=H();e(0,"div",2)(1,"div",3),c(2,"div",4),e(3,"div",5)(4,"div",6)(5,"div",7)(6,"nz-card",8)(7,"div",9),c(8,"img",10),e(9,"h2",11),n(10,"Recuperar contrase\xF1a"),t()(),e(11,"form",12),f("ngSubmit",function(){return C(p),S(s.submitForm())}),e(12,"nz-form-item")(13,"nz-form-label",13),n(14,"Correo Electr\xF3nico"),t(),e(15,"nz-form-control")(16,"nz-input-group",14),c(17,"input",15),t()()(),e(18,"nz-form-item")(19,"nz-form-control")(20,"div",16)(21,"span",17),n(22,"\xBFYa tiene una cuenta? "),e(23,"a",18),n(24," Ingresar"),t()(),e(25,"button",19),n(26,"Recuperar Contrase\xF1a"),t()()()()(),v(27,it,1,0,"ng-template",null,0,K)(29,ot,1,0,"ng-template",null,1,K),t()()()(),c(31,"app-footer"),t()()}if(r&2){let p=ne(28);m(11),l("formGroup",s.loginForm),m(5),l("nzPrefix",p),m(7),l("routerLink",we(3,nt))}},dependencies:[$,k,P,O,w,T,I,D,se,Ue,j,R,U,V,oe,x,b,y,_,F,M,Z]});let a=i;return a})();var Ot=(()=>{let i=class i{};i.\u0275fac=function(r){return new(r||i)},i.\u0275cmp=z({type:i,selectors:[["app-please-verify-email"]],decls:2,vars:0,template:function(r,s){r&1&&(e(0,"p"),n(1,"please-verify-email works!"),t())},styles:['@charset "UTF-8";[_nghost-%COMP%]{--bright-blue: oklch(51.01% .274 263.83);--electric-violet: oklch(53.18% .28 296.97);--french-violet: oklch(47.66% .246 305.88);--vivid-pink: oklch(69.02% .277 332.77);--hot-red: oklch(61.42% .238 15.34);--orange-red: oklch(63.32% .24 31.68);--gray-900: oklch(19.37% .006 300.98);--gray-700: oklch(36.98% .014 302.71);--gray-400: oklch(70.9% .015 304.04);--red-to-pink-to-purple-vertical-gradient: linear-gradient( 180deg, var(--orange-red) 0%, var(--vivid-pink) 50%, var(--electric-violet) 100% );--red-to-pink-to-purple-horizontal-gradient: linear-gradient( 90deg, var(--orange-red) 0%, var(--vivid-pink) 50%, var(--electric-violet) 100% );--pill-accent: var(--bright-blue);font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol;box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}h1[_ngcontent-%COMP%]{font-size:3.125rem;color:var(--gray-900);font-weight:500;line-height:100%;letter-spacing:-.125rem;margin:0;font-family:Inter Tight,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol}p[_ngcontent-%COMP%]{margin:0;color:var(--gray-700)}main[_ngcontent-%COMP%]{width:100%;min-height:100%;display:flex;justify-content:center;align-items:center;padding:1rem;box-sizing:inherit;position:relative}.angular-logo[_ngcontent-%COMP%]{max-width:9.2rem}.content[_ngcontent-%COMP%]{display:flex;justify-content:space-around;width:100%;max-width:700px;margin-bottom:3rem}.content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-top:1.75rem}.content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:1.5rem}.divider[_ngcontent-%COMP%]{width:1px;background:var(--red-to-pink-to-purple-vertical-gradient);margin-inline:.5rem}.pill-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:start;flex-wrap:wrap;gap:1.25rem}.pill[_ngcontent-%COMP%]{display:flex;align-items:center;--pill-accent: var(--bright-blue);background:color-mix(in srgb,var(--pill-accent) 5%,transparent);color:var(--pill-accent);padding-inline:.75rem;padding-block:.375rem;border-radius:2.75rem;border:0;transition:background .3s ease;font-family:var(--inter-font);font-size:.875rem;font-style:normal;font-weight:500;line-height:1.4rem;letter-spacing:-.00875rem;text-decoration:none}.pill[_ngcontent-%COMP%]:hover{background:color-mix(in srgb,var(--pill-accent) 15%,transparent)}.content[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh}.left-side[_ngcontent-%COMP%]{text-align:center}.left-side[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:20px}.pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n+1){--pill-accent: var(--bright-blue)}.pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n+2){--pill-accent: var(--french-violet)}.pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n+3), .pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n+4), .pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n+5){--pill-accent: var(--hot-red)}.pill-group[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{margin-inline-start:.25rem}.social-links[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.73rem;margin-top:1.5rem}.social-links[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{transition:fill .3s ease;fill:var(--gray-400)}.social-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{fill:var(--gray-900)}@media screen and (max-width: 650px){.content[_ngcontent-%COMP%]{flex-direction:column;width:max-content}.divider[_ngcontent-%COMP%]{height:1px;width:100%;background:var(--red-to-pink-to-purple-horizontal-gradient);margin-block:1.5rem}}']});let a=i;return a})();var Pe=ke(Ve());function rt(a,i){a&1&&(ee(0),n(1," N\xFAmero de matr\xEDcula es de 7 d\xEDgitos "),te())}function at(a,i){a&1&&(ee(0),n(1,"al menos son 7 d\xEDgitos "),te())}function lt(a,i){a&1&&(ee(0),n(1,"Este dato es obligatorio "),te())}function mt(a,i){if(a&1&&v(0,rt,2,0,"ng-container",47)(1,at,2,0,"ng-container",47)(2,lt,2,0,"ng-container",47),a&2){let h=i.$implicit;l("ngIf",h.hasError("maxlength")),m(),l("ngIf",h.hasError("minlength")),m(),l("ngIf",h.hasError("required"))}}function st(a,i){if(a&1&&(e(0,"nz-option",48),c(1,"i",49),n(2),t()),a&2){let h=i.$implicit;l("nzLabel",h.name)("nzValue",h.id),m(2),J(" ",h.name,"")}}function ct(a,i){if(a&1&&(e(0,"nz-option",48),c(1,"i",49),n(2),t()),a&2){let h=i.$implicit;l("nzLabel",h.name)("nzValue",h.routeId),m(2),J(" ",h.name,"")}}var jt=(()=>{let i=class i{constructor(o,r,s,p,g,L,ze){this.customersService=o,this.routesService=r,this.authService=s,this.fb=p,this.afs=g,this.modalService=L,this.notification=ze,this.isLoadingOne=!1,this.stopSubscription$=new B,this.userRoutes=[],this.accountId$=new B}ngOnInit(){this.signUpForm=this.fb.group({email:[null,[d.email,d.required]],password:[null,[d.required,d.minLength(8),d.pattern("^[A-Za-z0-9 ]+$")]],checkPassword:[],firstName:[null,[d.required,d.minLength(5),d.maxLength(50)]],lastName:[null,[d.required,d.minLength(5),d.maxLength(60)]],turno:[],phoneNumber:[],defaultRoute:[],defaultRouteName:[],defaultRound:[],round:[],roundTrip:[],customerId:[],customerName:[],studentId:[null,[d.required,d.minLength(7),d.maxLength(7),d.pattern("[0-9]+")]],status:[],agree:[null]}),this.cCollection=this.afs.collection("customers",o=>o.where("active","==",!0)),this.customers=this.cCollection.snapshotChanges().pipe(G(o=>o.map(r=>{let s=r.payload.doc.id,p=r.payload.doc.data();return q({id:s},p)}))).subscribe(o=>{this.customers=o,console.log(this.customers)})}submitForm(){for(let o in this.signUpForm.controls)this.signUpForm.controls[o].markAsDirty(),this.signUpForm.controls[o].updateValueAndValidity();this.signUpForm.valid&&(this.signUpForm.controls.status.setValue("preRegister"),this.isLoadingOne=!0,this.authService.signUp(this.signUpForm.value).then(o=>{this.isLoadingOne=!1}).catch(o=>{this.notification.create("error","Submit form error",o)}))}updateConfirmValidator(){Promise.resolve().then(()=>this.signUpForm.controls.checkPassword.updateValueAndValidity())}showModalTerms(){this.modalService.create({nzTitle:"T\xE9rminos y Condiciones de Uso",nzContent:Y})}onCustomerSelected(o,r){if(event!=null){let p=Pe.filter(r,g=>g.id==event)[0];this.signUpForm.controls.customerName.setValue(p.name),this.fillCustomerRouteEditUser(p.id)}}fillCustomerRouteEditUser(o){this.routesService.getRoutes(o).pipe(Q(this.stopSubscription$),G(r=>r.map(s=>{let p=s.payload.doc.id,g=s.payload.doc.data();return q({id:p},g)}))).subscribe(r=>{this.userRoutes=r})}onRouteEditUserSelected(o,r){if(o!=null&&o!=""){let p=Pe.filter(r,g=>g.routeId==o)[0];this.signUpForm.controls.defaultRouteName.setValue(p.name)}}ngOnDestroy(){this.stopSubscription$.next(void 0),this.stopSubscription$.complete(),this.customerSuscription&&this.customerSuscription.unsubscribe()}};i.\u0275fac=function(r){return new(r||i)(u(ce),u(de),u(E),u(N),u(le),u(X),u(W))},i.\u0275cmp=z({type:i,selectors:[["ng-component"]],decls:96,vars:27,consts:[["combineTplStudentId",""],[1,"container-fluid","h-100",2,"background-color","white","color","black"],[1,"d-flex","h-100","p-v-15","flex-column","justify-content-between"],[1,"d-none","d-md-flex","p-h-40"],["src","assets/images/logo/andlogo.png","alt",""],[1,"container"],[1,"row","align-items-center"],[1,"col-md-6","d-none","d-md-block"],["src","assets/images/others/Registro.png","alt","",1,"img-fluid"],[1,"m-l-auto","col-md-5"],[1,"m-t-20"],[1,"m-b-30"],["nz-form","","nzLayout","horizontal",1,"login-form",3,"ngSubmit","formGroup"],["nzRequired","","nzFor","name",3,"nzSpan"],["nzHasFeedback","",3,"nzSpan"],["type","text","nz-input","","formControlName","firstName","placeholder","Nombre","id","firstName"],["nzRequired","","nzFor","lastName",3,"nzSpan"],["type","text","nz-input","","formControlName","lastName","placeholder","Apellidos","id","lastName"],["nzRequired","","nzFor","email",3,"nzSpan"],["type","email","nz-input","","formControlName","email","placeholder","Correo Electr\xF3nico","id","email"],["nzRequired","","nzFor","password",3,"nzSpan"],["nz-icon","","nz-tooltip","","nzTitle","La contrase\xF1a deber\xE1 contener al menos 8 caracteres y s\xF3lo acepta letras y n\xFAmeros","type","question-circle","nzTheme","outline"],["type","password","nz-input","","formControlName","password","placeholder","Contrase\xF1a","id","password"],["nzFor","checkPassword","nzRequired","",3,"nzSpan"],["nz-input","","type","password","formControlName","checkPassword","placeholder","Confirmar contrase\xF1a","id","checkPassword"],["nzFor","phoneNumber",3,"nzSpan"],["nz-icon","","nz-tooltip","","nzTitle","\xBFEn qu\xE9 n\xFAmero telef\xF3nico te podemos contactar?","type","question-circle","nzTheme","outline"],[3,"nzSpan"],["nz-input","","formControlName","phoneNumber","placeholder","81 1234 5678","id","phoneNumber","name","phoneNumber","minlength","10","maxlength","10"],["nzFor","studentId","nzRequired","",3,"nzSpan"],["nzHasFeedback","",3,"nzSpan","nzErrorTip"],["nz-input","","formControlName","studentId","placeholder","1234567","id","studentId","name","studentId","minlength","7","maxlength","7","required",""],[3,"nzSm","nzXs"],["formControlName","customerId","nzAllowClear","","nzPlaceHolder","Selecciona una Empresa",3,"ngModelChange"],["nzCustomContent","",3,"nzLabel","nzValue",4,"ngFor","ngForOf"],["formControlName","defaultRoute","nzAllowClear","","nzPlaceHolder","Selecciona la ruta",3,"ngModelChange"],["formControlName","turno","nzAllowClear","","nzPlaceHolder","Selecciona Turno",2,"width","240px"],["nzValue","0","nzLabel","No Definido"],["nzValue","1","nzLabel","Matutino"],["nzValue","2","nzLabel","Vespertino"],["formControlName","roundTrip","nzAllowClear","","nzPlaceHolder","Selecciona tipo de Viaje",2,"width","240px"],["nzValue","sencillo","nzLabel","Sencillo"],["nzValue","redondo","nzLabel","Redondo"],[1,"d-flex","align-items-center","justify-content-between"],["nz-checkbox","","formControlName","agree"],[3,"click"],["nz-button","",1,"login-form-button",2,"background-color","#4F6F57","color","#f6f3ea",3,"nzLoading"],[4,"ngIf"],["nzCustomContent","",3,"nzLabel","nzValue"],["nz-icon","","nzType","fork"]],template:function(r,s){if(r&1){let p=H();e(0,"div",1)(1,"div",2)(2,"div",3),c(3,"img",4),t(),e(4,"div",5)(5,"div",6)(6,"div",7),c(7,"img",8),t(),e(8,"div",9)(9,"nz-card")(10,"h2",10),n(11,"Registrate en Lista de Espera"),t(),e(12,"p",11),n(13,"Cree su cuenta para obtener acceso"),t(),e(14,"form",12),f("ngSubmit",function(){return C(p),S(s.submitForm())}),e(15,"nz-form-item")(16,"nz-form-label",13),n(17,"Nombre"),t(),e(18,"nz-form-control",14),c(19,"input",15),t()(),e(20,"nz-form-item")(21,"nz-form-label",16),n(22,"Apellidos"),t(),e(23,"nz-form-control",14),c(24,"input",17),t()(),e(25,"nz-form-item")(26,"nz-form-label",18),n(27,"Correo"),t(),e(28,"nz-form-control",14),c(29,"input",19),t()(),e(30,"nz-form-item")(31,"nz-form-label",20)(32,"span"),n(33," Contrase\xF1a "),c(34,"i",21),t()(),e(35,"nz-form-control",14),c(36,"input",22),t()(),e(37,"nz-form-item")(38,"nz-form-label",23),n(39,"Confirmar"),t(),e(40,"nz-form-control",14),c(41,"input",24),t()(),e(42,"nz-form-item")(43,"nz-form-label",25)(44,"span"),n(45," Tel\xE9fono "),c(46,"i",26),t()(),e(47,"nz-form-control",27),c(48,"input",28),t()(),e(49,"nz-form-item")(50,"nz-form-label",29)(51,"span"),n(52," Matr\xEDcula "),t()(),e(53,"nz-form-control",30),c(54,"input",31),v(55,mt,3,3,"ng-template",null,0,K),t()(),e(57,"nz-form-item")(58,"nz-form-label",27),n(59,"Escuela / Empresa"),t(),e(60,"nz-form-control",32)(61,"nz-select",33),f("ngModelChange",function(L){return C(p),S(s.onCustomerSelected(L,s.customers))}),v(62,st,3,3,"nz-option",34),t()()(),e(63,"nz-form-item")(64,"nz-form-label",27),n(65,"Ruta"),t(),e(66,"nz-form-control",32)(67,"nz-select",35),f("ngModelChange",function(L){return C(p),S(s.onRouteEditUserSelected(L,s.userRoutes))}),v(68,ct,3,3,"nz-option",34),t()()(),e(69,"nz-form-item")(70,"nz-form-label",27),n(71,"Turno"),t(),e(72,"nz-select",36),c(73,"nz-option",37)(74,"nz-option",38)(75,"nz-option",39),t()(),e(76,"nz-form-item")(77,"nz-form-label",27),n(78,"Tipo de Viaje"),t(),e(79,"nz-select",40),c(80,"nz-option",41)(81,"nz-option",42),t()(),e(82,"div",43)(83,"nz-form-item")(84,"nz-form-control")(85,"label",44)(86,"span"),n(87,"He le\xEDdo y acepto los "),e(88,"a",45),f("click",function(){return C(p),S(s.showModalTerms())}),n(89,"t\xE9rminos"),t()()()()(),e(90,"nz-form-item")(91,"nz-form-control")(92,"div")(93,"button",46),n(94,"Registrarse"),t()()()()()()()()()(),c(95,"app-footer"),t()()}if(r&2){let p=ne(56);m(14),l("formGroup",s.signUpForm),m(2),l("nzSpan",8),m(2),l("nzSpan",16),m(3),l("nzSpan",8),m(2),l("nzSpan",16),m(3),l("nzSpan",8),m(2),l("nzSpan",16),m(3),l("nzSpan",8),m(4),l("nzSpan",16),m(3),l("nzSpan",8),m(2),l("nzSpan",16),m(3),l("nzSpan",8),m(4),l("nzSpan",16),m(3),l("nzSpan",8),m(3),l("nzSpan",16)("nzErrorTip",p),m(5),l("nzSpan",8),m(2),l("nzSm",14)("nzXs",24),m(2),l("ngForOf",s.customers),m(2),l("nzSpan",8),m(2),l("nzSm",14)("nzXs",24),m(2),l("ngForOf",s.userRoutes),m(2),l("nzSpan",8),m(7),l("nzSpan",8),m(16),l("nzLoading",s.isLoadingOne)}},dependencies:[ie,Te,$,k,P,O,w,T,I,D,ue,me,j,R,U,V,ge,fe,x,b,y,_,Re,re,ae,F,M,Z],encapsulation:2});let a=i;return a})();export{ut as a,xt as b,Nt as c,kt as d,Ot as e,jt as f};
