import './polyfills.server.mjs';
import{a as P}from"./chunk-CN7MJXIE.mjs";import{a as q}from"./chunk-OK6AXCXD.mjs";import{c as B,d as F,e as Q,f as G,g as R,j as U,k as W}from"./chunk-JLDYJE72.mjs";import{$ as C,_ as N,aa as w,t as E,u as y}from"./chunk-MXAABQE2.mjs";import{a as I,c as k,f as j,g as T,i as H,j as L}from"./chunk-YVJKCECQ.mjs";import{Rb as M,Sb as _,Ub as O,Za as A,na as D}from"./chunk-GACYMIHG.mjs";import{Db as z,Eb as i,Ia as d,Ua as x,V as h,Wa as u,X as v,Xb as b,d as f,da as g,ha as S,hb as e,ib as t,jb as r,q as p}from"./chunk-AV3XNHWO.mjs";import{a as l}from"./chunk-H6KHSOBK.mjs";function V(c,a){c&1&&r(0,"i",25)}var ue=(()=>{let a=class a{constructor(){this.accountsService=g(j),this.authService=g(A),this.stopSubscription$=new f,this.infoSegment=[],this.popupParent=document.querySelector("body"),this.authService.user.subscribe(o=>{this.user=o,this.user!==null&&this.user!==void 0&&this.user.idSegment!==void 0&&this.accountsService.getSegmentLevel(this.user.idSegment).pipe(h(this.stopSubscription$),p(n=>{let s=n.payload.id,m=n.payload.data();return l({id:s},m)}),v(n=>(this.infoSegment=n,n))).subscribe()})}ngOnInit(){this.getSubscriptions()}getSubscriptions(){this.infoSegment.nivelNum!==void 0&&this.infoSegment.nivelNum==1?this.accountsService.getAccountsByCustomer(this.user.customerId).pipe(p(o=>{let n=o.payload.id,s=o.payload.data();return l({id:n},s)})).subscribe(o=>{this.accountsList=[o]}):this.accountsService.getAccounts().pipe(p(o=>o.map(n=>{let s=n.payload.doc.id,m=n.payload.doc.data();return l({id:s},m)}))).subscribe(o=>{this.accountsList=o})}};a.\u0275fac=function(n){return new(n||a)},a.\u0275cmp=S({type:a,selectors:[["app-list"]],decls:57,vars:3,consts:[["menu","nzDropdownMenu"],["suffixIconSearch",""],[2,"background-color","#f9fbfd"],["nz-page-header-avatar","","nzSrc","https://avatars0.githubusercontent.com/u/22736418?s=88&v=4",2,"background-color","white","color","#4F6F57"],[3,"nzColor"],["nz-button","",2,"background-color","#4F6F57","color","#f6f3ea"],["nz-button","","nzNoAnimation","","nz-dropdown","",2,"border","none","padding","0",3,"nzDropdownMenu"],["nz-icon","","nzTheme","outline",2,"font-size","20px","vertical-align","top"],["nz-menu",""],["nz-menu-item",""],[1,"wrap"],[1,"content"],["nz-paragraph",""],[1,"content-link"],["src","https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg","alt","start"],["src","https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg","alt","info"],["src","https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg","alt","doc"],[1,"extra-content"],["src","https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original","alt","content"],["nz-row","","nzGutter","8","nzAlign","bottom","nzJustify","end","nzType","flex"],["nz-col","","nzSpan","8"],["nzSize","large",3,"nzSuffix"],["type","text","nz-input","","placeholder","input search text"],["nz-row",""],["nz-col","","nzSpan","24"],["nz-icon",""]],template:function(n,s){if(n&1&&(e(0,"nz-page-header",2),r(1,"nz-avatar",3),e(2,"nz-page-header-title"),i(3,"Cuentas de Empresas"),t(),e(4,"nz-page-header-subtitle"),i(5,"Listado de cuentas de empresas del sistema And"),t(),e(6,"nz-page-header-tags")(7,"nz-tag",4),i(8,"Empresas"),t()(),e(9,"nz-page-header-extra")(10,"button",5),i(11,"Agregar"),t(),e(12,"button",5),i(13,"Editar"),t(),e(14,"button",5),i(15,"Kardex"),t(),e(16,"button",6),r(17,"i",7),t(),e(18,"nz-dropdown-menu",null,0)(20,"ul",8)(21,"li",9),i(22,"Desactivar cuenta"),t(),e(23,"li",9),i(24,"Eliminar cuenta"),t(),e(25,"li",9),i(26,"Exportar a excel"),t()()()(),e(27,"nz-page-header-content")(28,"div",10)(29,"div",11)(30,"div",11)(31,"p",12),i(32," Los usuarios de And pertenecen a una cuenta. Esta determina los productos a los que los usuarios tienen acceso. "),t(),e(33,"p",12),i(34," Ant Design's design team preferred to design with the HSB color model, which makes it easier for designers to have a clear psychological expectation of color when adjusting colors, as well as facilitate communication in teams. "),t(),e(35,"p",13)(36,"a"),r(37,"img",14),i(38,"Quick Start "),t(),e(39,"a"),r(40,"img",15),i(41,"Product Info "),t(),e(42,"a"),r(43,"img",16),i(44,"Product Doc "),t()()()(),e(45,"div",17),r(46,"img",18),t()()()(),e(47,"div",19)(48,"div",20)(49,"nz-input-group",21),r(50,"input",22),t(),x(51,V,1,0,"ng-template",null,1,b),t()(),e(53,"div",23),r(54,"div",24),t(),r(55,"br")(56,"br")),n&2){let m=z(19),K=z(52);d(7),u("nzColor","blue"),d(9),u("nzDropdownMenu",m),d(33),u("nzSuffix",K)}},dependencies:[D,y,E,N,w,C,P,k,I,T,L,H,O,M,_,W,B,F,Q,G,R,U,q],styles:["nz-page-header[_ngcontent-%COMP%]{border:1px solid rgb(235,237,240)}.wrap[_ngcontent-%COMP%]{display:flex}.content[_ngcontent-%COMP%]{flex:1}.content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:8px}.content-link[_ngcontent-%COMP%]{padding-top:16px}.content-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;vertical-align:text-top;margin-right:32px}.content-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-right:8px}.extra-content[_ngcontent-%COMP%]{min-width:240px;text-align:right}"]});let c=a;return c})();export{ue as a};