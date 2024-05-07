import{a as P}from"./chunk-RBC24LWF.js";import{a as Q}from"./chunk-NYOFACGL.js";import{c as k,d as G,e as R,f as j,g as H,j as F,k as L}from"./chunk-P4EMRIXJ.js";import{Sc as B}from"./chunk-2XE4ZSNN.js";import{a as M,c as _,g as O,i as T,j as I}from"./chunk-TVJR76CI.js";import{a as D,b as N,c as w}from"./chunk-IMWJHJ4Y.js";import{a as C}from"./chunk-4LJQEPB6.js";import{w as S,x as b}from"./chunk-3MM2LZV7.js";import{Aa as h,Bb as v,Ca as s,Jd as x,Pa as e,Qa as t,Ra as i,Y as z,_ as f,hb as d,ib as n,m as g,nf as A,of as E,qa as m,qf as y}from"./chunk-M4WL67FH.js";import{a as u}from"./chunk-WT5K5NLM.js";function q(c,r){c&1&&i(0,"i",25)}var me=(()=>{let r=class r{constructor(){this.accountsService=z(P),this.columnDefs=[{headerName:"#",checkboxSelection:!0,suppressSizeToFit:!0},{headerName:"Id",field:"id",hide:!0},{headerName:"Nombre",field:"name",enableRowGroup:!0},{headerName:"Recorrido",field:"description",enableRowGroup:!0,filter:"text"},{headerName:"Tipo",field:"routeType",enableRowGroup:!0,filter:"text"},{headerName:"Clima",field:"has_ac",enableRowGroup:!0,filter:"text",cellRenderer:function(a){let o=a.value===!0?"color--behance":"ag-faded",l="";return l=`<i class="material-icons ${o}">ac_unit</i>`,l}},{headerName:"Control de ruta",headerClass:"centered"}],this.popupParent=document.querySelector("body")}ngOnInit(){this.getSubscriptions()}getSubscriptions(){this.accountsService.getAccounts().pipe(g(a=>a.map(o=>{let l=o.payload.doc.id,p=o.payload.doc.data();return u({id:l},p)}))).subscribe(a=>{this.accountsList=a})}};r.\u0275fac=function(o){return new(o||r)},r.\u0275cmp=f({type:r,selectors:[["app-list"]],decls:58,vars:5,consts:[["menu","nzDropdownMenu"],["suffixIconSearch",""],["nz-page-header-avatar","","nzSrc","https://avatars0.githubusercontent.com/u/22736418?s=88&v=4",2,"background-color","white","color","#4F6F57"],[3,"nzColor"],["nz-button","",2,"background-color","#4F6F57","color","#f6f3ea"],["nz-button","","nzNoAnimation","","nz-dropdown","",2,"border","none","padding","0",3,"nzDropdownMenu"],["nz-icon","","nzType","ellipsis","nzTheme","outline",2,"font-size","20px","vertical-align","top"],["nz-menu",""],["nz-menu-item",""],[1,"wrap"],[1,"content"],["nz-paragraph",""],[1,"content-link"],["src","https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg","alt","start"],["src","https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg","alt","info"],["src","https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg","alt","doc"],[1,"extra-content"],["src","https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original","alt","content"],["nz-row","","nzGutter","8","nzAlign","bottom","nzJustify","end","nzType","flex"],["nz-col","","nzSpan","8"],["nzSize","large",3,"nzSuffix"],["type","text","nz-input","","placeholder","input search text"],["nz-row",""],["nz-col","","nzSpan","24"],[1,"ag-theme-material",2,"width","100%","height","350px",3,"rowData","columnDefs"],["nz-icon","","nzType","search"]],template:function(o,l){if(o&1&&(e(0,"nz-page-header"),i(1,"nz-avatar",2),e(2,"nz-page-header-title"),n(3,"Cuentas de Empresas"),t(),e(4,"nz-page-header-subtitle"),n(5,"Listado de cuentas de empresas del sistema And"),t(),e(6,"nz-page-header-tags")(7,"nz-tag",3),n(8,"Empresas"),t()(),e(9,"nz-page-header-extra")(10,"button",4),n(11,"Agregar"),t(),e(12,"button",4),n(13,"Editar"),t(),e(14,"button",4),n(15,"Kardex"),t(),e(16,"button",5),i(17,"i",6),t(),e(18,"nz-dropdown-menu",null,0)(20,"ul",7)(21,"li",8),n(22,"Desactivar cuenta"),t(),e(23,"li",8),n(24,"Eliminar cuenta"),t(),e(25,"li",8),n(26,"Exportar a excel"),t()()()(),e(27,"nz-page-header-content")(28,"div",9)(29,"div",10)(30,"div",10)(31,"p",11),n(32," Los usuarios de And pertenecen a una cuenta. Esta determina los productos y servicios a los que los usuarios tienen acceso. "),t(),e(33,"p",11),n(34," Ant Design's design team preferred to design with the HSB color model, which makes it easier for designers to have a clear psychological expectation of color when adjusting colors, as well as facilitate communication in teams. "),t(),e(35,"p",12)(36,"a"),i(37,"img",13),n(38,"Quick Start "),t(),e(39,"a"),i(40,"img",14),n(41,"Product Info "),t(),e(42,"a"),i(43,"img",15),n(44,"Product Doc "),t()()()(),e(45,"div",16),i(46,"img",17),t()()()(),e(47,"div",18)(48,"div",19)(49,"nz-input-group",20),i(50,"input",21),t(),h(51,q,1,0,"ng-template",null,1,v),t()(),e(53,"div",22)(54,"div",23),i(55,"ag-grid-angular",24),t()(),i(56,"br")(57,"br")),o&2){let p=d(19),W=d(52);m(7),s("nzColor","blue"),m(9),s("nzDropdownMenu",p),m(33),s("nzSuffix",W),m(6),s("rowData",l.accountsList)("columnDefs",l.columnDefs)}},dependencies:[B,x,b,S,D,w,N,C,_,M,O,I,T,y,A,E,L,k,G,R,j,H,F,Q],styles:["nz-page-header[_ngcontent-%COMP%]{border:1px solid rgb(235,237,240)}.wrap[_ngcontent-%COMP%]{display:flex}.content[_ngcontent-%COMP%]{flex:1}.content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:8px}.content-link[_ngcontent-%COMP%]{padding-top:16px}.content-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;vertical-align:text-top;margin-right:32px}.content-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-right:8px}.extra-content[_ngcontent-%COMP%]{min-width:240px;text-align:right}"]});let c=r;return c})();export{me as a};