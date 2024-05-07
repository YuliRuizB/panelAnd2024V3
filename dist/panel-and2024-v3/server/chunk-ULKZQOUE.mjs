import './polyfills.server.mjs';
import{B as ze,C as He,E as ke,F as _e,Ia as F,Mb as B,Nb as c,Pa as Xe,Pb as Ke,Ra as le,U as z,Ua as xe,Va as ge,Wa as Ue,Xa as Ze,Zb as Je,ia as We,ja as Qe,ka as ve,pa as Ye,qa as qe,sa as Ge,w as Be}from"./chunk-F3VCI4QE.mjs";import{$ as pe,A as $,Ab as k,B as de,Bb as he,Cb as Ie,Cc as Ve,Db as Oe,Dc as Te,H as U,Ia as D,J as ne,Ja as a,Kb as ee,La as Ae,Lb as V,Oa as Y,Qa as De,S as Me,T as ce,Ua as M,V as u,Vb as Pe,Wa as g,Xa as Ce,Ya as C,aa as ie,ba as ye,ca as oe,cb as q,d as p,da as se,e as v,gc as X,ha as N,hb as I,ia as re,ib as O,ja as Q,jb as Z,k as Ee,kb as be,kd as Fe,lb as Se,na as L,nb as K,oa as R,od as Le,pa as E,pb as we,pd as fe,q as H,qb as A,r as W,s as je,sb as f,ta as w,tb as G,ua as j,ub as P,w as ue,wc as me,xb as J,yb as ae,z as _,zb as T}from"./chunk-WNM5W7LL.mjs";import{d as m}from"./chunk-PESVQS5A.mjs";var ht=["nz-menu-item",""],tt=["*"],mt=["nz-submenu-inline-child",""];function ft(o,i){}var zt=["nz-submenu-none-inline-child",""];function vt(o,i){}var gt=["nz-submenu-title",""];function Mt(o,i){if(o&1&&Z(0,"span",0),o&2){let r=f();g("nzType",r.nzIcon)}}function yt(o,i){if(o&1&&(be(0),I(1,"span",3),Ie(2),O(),Se()),o&2){let r=f();D(2),Oe(r.nzTitle)}}function Dt(o,i){o&1&&Z(0,"span",4)}function Ct(o,i){o&1&&Z(0,"span",5)}function bt(o,i){if(o&1&&(I(0,"span",2),M(1,Dt,1,0)(2,Ct,1,0),O()),o&2){let r,e=f();D(),q(1,(r=e.dir)==="rtl"?1:2)}}function St(o,i){o&1&&Z(0,"span",6)}var wt=["nz-submenu",""],It=[[["","title",""]],"*"],Ot=["[title]","*"];function Tt(o,i){o&1&&P(0)}function kt(o,i){if(o&1&&Z(0,"div",3),o&2){let r=f(),e=he(6);g("mode",r.mode)("nzOpen",r.nzOpen)("@.disabled",!!(r.noAnimation!=null&&r.noAnimation.nzNoAnimation))("nzNoAnimation",r.noAnimation==null?null:r.noAnimation.nzNoAnimation)("menuClass",r.nzMenuClassName)("templateOutlet",e)}}function _t(o,i){if(o&1){let r=K();I(0,"div",5),A("subMenuMouseState",function(n){R(r);let t=f(2);return E(t.setMouseEnterState(n))}),O()}if(o&2){let r=f(2),e=he(6);g("theme",r.theme)("mode",r.mode)("nzOpen",r.nzOpen)("position",r.position)("nzDisabled",r.nzDisabled)("isMenuInsideDropDown",r.isMenuInsideDropDown)("templateOutlet",e)("menuClass",r.nzMenuClassName)("@.disabled",!!(r.noAnimation!=null&&r.noAnimation.nzNoAnimation))("nzNoAnimation",r.noAnimation==null?null:r.noAnimation.nzNoAnimation)}}function $t(o,i){if(o&1){let r=K();M(0,_t,1,10,"ng-template",4),A("positionChange",function(n){R(r);let t=f();return E(t.onPositionChange(n))})}if(o&2){let r=f(),e=he(1);g("cdkConnectedOverlayPositions",r.overlayPositions)("cdkConnectedOverlayOrigin",e)("cdkConnectedOverlayWidth",r.triggerWidth)("cdkConnectedOverlayOpen",r.nzOpen)("cdkConnectedOverlayTransformOriginOn",".ant-menu-submenu")}}function Nt(o,i){o&1&&P(0,1)}var Rt=["titleElement"],Et=["nz-menu-group",""],jt=["*",[["","title",""]]],At=["*","[title]"];function Pt(o,i){if(o&1&&(be(0),Ie(1),Se()),o&2){let r=f();D(),Oe(r.nzTitle)}}function Vt(o,i){o&1&&P(0,1)}var S=new ye("NzIsInDropDownMenuToken"),nt=new ye("NzMenuServiceLocalToken"),b=(()=>{let i=class i{constructor(){this.descendantMenuItemClick$=new p,this.childMenuItemClick$=new p,this.theme$=new v("light"),this.mode$=new v("vertical"),this.inlineIndent$=new v(24),this.isChildSubMenuOpen$=new v(!1)}onDescendantMenuItemClick(e){this.descendantMenuItemClick$.next(e)}onChildMenuItemClick(e){this.childMenuItemClick$.next(e)}setMode(e){this.mode$.next(e)}setTheme(e){this.theme$.next(e)}setInlineIndent(e){this.inlineIndent$.next(e)}};i.\u0275fac=function(n){return new(n||i)},i.\u0275prov=pe({token:i,factory:i.\u0275fac});let o=i;return o})(),$e=(()=>{let i=class i{onChildMenuItemClick(e){this.childMenuItemClick$.next(e)}setOpenStateWithoutDebounce(e){this.isCurrentSubMenuOpen$.next(e)}setMouseEnterTitleOrOverlayState(e){this.isMouseEnterTitleOrOverlay$.next(e)}constructor(e,n,t){this.nzHostSubmenuService=e,this.nzMenuService=n,this.isMenuInsideDropDown=t,this.mode$=this.nzMenuService.mode$.pipe(H(d=>d==="inline"?"inline":d==="vertical"||this.nzHostSubmenuService?"vertical":"horizontal")),this.level=1,this.isCurrentSubMenuOpen$=new v(!1),this.isChildSubMenuOpen$=new v(!1),this.isMouseEnterTitleOrOverlay$=new p,this.childMenuItemClick$=new p,this.destroy$=new p,this.nzHostSubmenuService&&(this.level=this.nzHostSubmenuService.level+1);let s=this.childMenuItemClick$.pipe(je(()=>this.mode$),$(d=>d!=="inline"||this.isMenuInsideDropDown),U(!1)),l=_(this.isMouseEnterTitleOrOverlay$,s);W([this.isChildSubMenuOpen$,l]).pipe(H(([d,te])=>d||te),de(150),ne(),u(this.destroy$)).pipe(ne()).subscribe(d=>{this.setOpenStateWithoutDebounce(d),this.nzHostSubmenuService?this.nzHostSubmenuService.isChildSubMenuOpen$.next(d):this.nzMenuService.isChildSubMenuOpen$.next(d)})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};i.\u0275fac=function(n){return new(n||i)(oe(i,12),oe(b),oe(S))},i.\u0275prov=pe({token:i,factory:i.\u0275fac});let o=i;return o})(),it=(()=>{let i=class i{clickMenuItem(e){this.nzDisabled?(e.preventDefault(),e.stopPropagation()):(this.nzMenuService.onDescendantMenuItemClick(this),this.nzSubmenuService?this.nzSubmenuService.onChildMenuItemClick(this):this.nzMenuService.onChildMenuItemClick(this))}setSelectedState(e){this.nzSelected=e,this.selected$.next(e)}updateRouterActive(){!this.listOfRouterLink||!this.router||!this.router.navigated||!this.nzMatchRouter||Promise.resolve().then(()=>{let e=this.hasActiveLinks();this.nzSelected!==e&&(this.nzSelected=e,this.setSelectedState(this.nzSelected),this.cdr.markForCheck())})}hasActiveLinks(){let e=this.isLinkActive(this.router);return this.routerLink&&e(this.routerLink)||this.listOfRouterLink.some(e)}isLinkActive(e){return n=>e.isActive(n.urlTree||"",{paths:this.nzMatchRouterExact?"exact":"subset",queryParams:this.nzMatchRouterExact?"exact":"subset",fragment:"ignored",matrixParams:"ignored"})}constructor(e,n,t,s,l,h,d){this.nzMenuService=e,this.cdr=n,this.nzSubmenuService=t,this.isMenuInsideDropDown=s,this.directionality=l,this.routerLink=h,this.router=d,this.destroy$=new p,this.level=this.nzSubmenuService?this.nzSubmenuService.level+1:1,this.selected$=new p,this.inlinePaddingLeft=null,this.dir="ltr",this.nzDisabled=!1,this.nzSelected=!1,this.nzDanger=!1,this.nzMatchRouterExact=!1,this.nzMatchRouter=!1,d&&this.router.events.pipe(u(this.destroy$),$(te=>te instanceof Fe)).subscribe(()=>{this.updateRouterActive()})}ngOnInit(){W([this.nzMenuService.mode$,this.nzMenuService.inlineIndent$]).pipe(u(this.destroy$)).subscribe(([e,n])=>{this.inlinePaddingLeft=e==="inline"?this.level*n:null}),this.dir=this.directionality.value,this.directionality.change?.pipe(u(this.destroy$)).subscribe(e=>{this.dir=e})}ngAfterContentInit(){this.listOfRouterLink.changes.pipe(u(this.destroy$)).subscribe(()=>this.updateRouterActive()),this.updateRouterActive()}ngOnChanges(e){e.nzSelected&&this.setSelectedState(this.nzSelected)}ngOnDestroy(){this.destroy$.next(!0),this.destroy$.complete()}};i.\u0275fac=function(n){return new(n||i)(a(b),a(X),a($e,8),a(S),a(F,8),a(fe,8),a(Le,8))},i.\u0275cmp=N({type:i,selectors:[["","nz-menu-item",""]],contentQueries:function(n,t,s){if(n&1&&J(s,fe,5),n&2){let l;T(l=k())&&(t.listOfRouterLink=l)}},hostVars:20,hostBindings:function(n,t){n&1&&A("click",function(l){return t.clickMenuItem(l)}),n&2&&(Ce("padding-left",t.dir==="rtl"?null:t.nzPaddingLeft||t.inlinePaddingLeft,"px")("padding-right",t.dir==="rtl"?t.nzPaddingLeft||t.inlinePaddingLeft:null,"px"),C("ant-dropdown-menu-item",t.isMenuInsideDropDown)("ant-dropdown-menu-item-selected",t.isMenuInsideDropDown&&t.nzSelected)("ant-dropdown-menu-item-danger",t.isMenuInsideDropDown&&t.nzDanger)("ant-dropdown-menu-item-disabled",t.isMenuInsideDropDown&&t.nzDisabled)("ant-menu-item",!t.isMenuInsideDropDown)("ant-menu-item-selected",!t.isMenuInsideDropDown&&t.nzSelected)("ant-menu-item-danger",!t.isMenuInsideDropDown&&t.nzDanger)("ant-menu-item-disabled",!t.isMenuInsideDropDown&&t.nzDisabled))},inputs:{nzPaddingLeft:"nzPaddingLeft",nzDisabled:"nzDisabled",nzSelected:"nzSelected",nzDanger:"nzDanger",nzMatchRouterExact:"nzMatchRouterExact",nzMatchRouter:"nzMatchRouter"},exportAs:["nzMenuItem"],standalone:!0,features:[L,V],attrs:ht,ngContentSelectors:tt,decls:2,vars:0,consts:[[1,"ant-menu-title-content"]],template:function(n,t){n&1&&(G(),I(0,"span",0),P(1),O())},encapsulation:2,changeDetection:0});let o=i;return m([z()],o.prototype,"nzDisabled",void 0),m([z()],o.prototype,"nzSelected",void 0),m([z()],o.prototype,"nzDanger",void 0),m([z()],o.prototype,"nzMatchRouterExact",void 0),m([z()],o.prototype,"nzMatchRouter",void 0),o})(),Ft=(()=>{let i=class i{constructor(e,n,t){this.elementRef=e,this.renderer=n,this.directionality=t,this.templateOutlet=null,this.menuClass="",this.mode="vertical",this.nzOpen=!1,this.listOfCacheClassName=[],this.expandState="collapsed",this.dir="ltr",this.destroy$=new p}calcMotionState(){this.nzOpen?this.expandState="expanded":this.expandState="collapsed"}ngOnInit(){this.calcMotionState(),this.dir=this.directionality.value,this.directionality.change?.pipe(u(this.destroy$)).subscribe(e=>{this.dir=e})}ngOnChanges(e){let{mode:n,nzOpen:t,menuClass:s}=e;(n||t)&&this.calcMotionState(),s&&(this.listOfCacheClassName.length&&this.listOfCacheClassName.filter(l=>!!l).forEach(l=>{this.renderer.removeClass(this.elementRef.nativeElement,l)}),this.menuClass&&(this.listOfCacheClassName=this.menuClass.split(" "),this.listOfCacheClassName.filter(l=>!!l).forEach(l=>{this.renderer.addClass(this.elementRef.nativeElement,l)})))}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};i.\u0275fac=function(n){return new(n||i)(a(w),a(Y),a(F,8))},i.\u0275cmp=N({type:i,selectors:[["","nz-submenu-inline-child",""]],hostAttrs:[1,"ant-menu","ant-menu-inline","ant-menu-sub"],hostVars:3,hostBindings:function(n,t){n&2&&(we("@collapseMotion",t.expandState),C("ant-menu-rtl",t.dir==="rtl"))},inputs:{templateOutlet:"templateOutlet",menuClass:"menuClass",mode:"mode",nzOpen:"nzOpen"},exportAs:["nzSubmenuInlineChild"],standalone:!0,features:[L,V],attrs:mt,decls:1,vars:1,consts:[[3,"ngTemplateOutlet"]],template:function(n,t){n&1&&M(0,ft,0,0,"ng-template",0),n&2&&g("ngTemplateOutlet",t.templateOutlet)},dependencies:[Te],encapsulation:2,data:{animation:[Be]},changeDetection:0});let o=i;return o})(),Lt=(()=>{let i=class i{constructor(e){this.directionality=e,this.menuClass="",this.theme="light",this.templateOutlet=null,this.isMenuInsideDropDown=!1,this.mode="vertical",this.position="right",this.nzDisabled=!1,this.nzOpen=!1,this.subMenuMouseState=new j,this.expandState="collapsed",this.dir="ltr",this.destroy$=new p}setMouseState(e){this.nzDisabled||this.subMenuMouseState.next(e)}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}calcMotionState(){this.nzOpen?this.mode==="horizontal"?this.expandState="bottom":this.mode==="vertical"&&(this.expandState="active"):this.expandState="collapsed"}ngOnInit(){this.calcMotionState(),this.dir=this.directionality.value,this.directionality.change?.pipe(u(this.destroy$)).subscribe(e=>{this.dir=e})}ngOnChanges(e){let{mode:n,nzOpen:t}=e;(n||t)&&this.calcMotionState()}};i.\u0275fac=function(n){return new(n||i)(a(F,8))},i.\u0275cmp=N({type:i,selectors:[["","nz-submenu-none-inline-child",""]],hostAttrs:[1,"ant-menu-submenu","ant-menu-submenu-popup"],hostVars:14,hostBindings:function(n,t){n&1&&A("mouseenter",function(){return t.setMouseState(!0)})("mouseleave",function(){return t.setMouseState(!1)}),n&2&&(we("@slideMotion",t.expandState)("@zoomBigMotion",t.expandState),C("ant-menu-light",t.theme==="light")("ant-menu-dark",t.theme==="dark")("ant-menu-submenu-placement-bottom",t.mode==="horizontal")("ant-menu-submenu-placement-right",t.mode==="vertical"&&t.position==="right")("ant-menu-submenu-placement-left",t.mode==="vertical"&&t.position==="left")("ant-menu-submenu-rtl",t.dir==="rtl"))},inputs:{menuClass:"menuClass",theme:"theme",templateOutlet:"templateOutlet",isMenuInsideDropDown:"isMenuInsideDropDown",mode:"mode",position:"position",nzDisabled:"nzDisabled",nzOpen:"nzOpen"},outputs:{subMenuMouseState:"subMenuMouseState"},exportAs:["nzSubmenuNoneInlineChild"],standalone:!0,features:[L,V],attrs:zt,decls:2,vars:16,consts:[[3,"ngClass"],[3,"ngTemplateOutlet"]],template:function(n,t){n&1&&(I(0,"div",0),M(1,vt,0,0,"ng-template",1),O()),n&2&&(C("ant-dropdown-menu",t.isMenuInsideDropDown)("ant-menu",!t.isMenuInsideDropDown)("ant-dropdown-menu-vertical",t.isMenuInsideDropDown)("ant-menu-vertical",!t.isMenuInsideDropDown)("ant-dropdown-menu-sub",t.isMenuInsideDropDown)("ant-menu-sub",!t.isMenuInsideDropDown)("ant-menu-rtl",t.dir==="rtl"),g("ngClass",t.menuClass),D(),g("ngTemplateOutlet",t.templateOutlet))},dependencies:[me,Te],encapsulation:2,data:{animation:[He,ze]},changeDetection:0});let o=i;return o})(),ot=(()=>{let i=class i{constructor(e,n){this.cdr=e,this.directionality=n,this.nzIcon=null,this.nzTitle=null,this.isMenuInsideDropDown=!1,this.nzDisabled=!1,this.paddingLeft=null,this.mode="vertical",this.toggleSubMenu=new j,this.subMenuMouseState=new j,this.dir="ltr",this.destroy$=new p}ngOnInit(){this.dir=this.directionality.value,this.directionality.change?.pipe(u(this.destroy$)).subscribe(e=>{this.dir=e,this.cdr.detectChanges()})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}setMouseState(e){this.nzDisabled||this.subMenuMouseState.next(e)}clickTitle(){this.mode==="inline"&&!this.nzDisabled&&this.toggleSubMenu.emit()}};i.\u0275fac=function(n){return new(n||i)(a(X),a(F,8))},i.\u0275cmp=N({type:i,selectors:[["","nz-submenu-title",""]],hostVars:8,hostBindings:function(n,t){n&1&&A("click",function(){return t.clickTitle()})("mouseenter",function(){return t.setMouseState(!0)})("mouseleave",function(){return t.setMouseState(!1)}),n&2&&(Ce("padding-left",t.dir==="rtl"?null:t.paddingLeft,"px")("padding-right",t.dir==="rtl"?t.paddingLeft:null,"px"),C("ant-dropdown-menu-submenu-title",t.isMenuInsideDropDown)("ant-menu-submenu-title",!t.isMenuInsideDropDown))},inputs:{nzIcon:"nzIcon",nzTitle:"nzTitle",isMenuInsideDropDown:"isMenuInsideDropDown",nzDisabled:"nzDisabled",paddingLeft:"paddingLeft",mode:"mode"},outputs:{toggleSubMenu:"toggleSubMenu",subMenuMouseState:"subMenuMouseState"},exportAs:["nzSubmenuTitle"],standalone:!0,features:[V],attrs:gt,ngContentSelectors:tt,decls:5,vars:3,consts:[["nz-icon","",3,"nzType"],[4,"nzStringTemplateOutlet"],[1,"ant-dropdown-menu-submenu-expand-icon"],[1,"ant-menu-title-content"],["nz-icon","","nzType","left",1,"ant-dropdown-menu-submenu-arrow-icon"],["nz-icon","","nzType","right",1,"ant-dropdown-menu-submenu-arrow-icon"],[1,"ant-menu-submenu-arrow"]],template:function(n,t){n&1&&(G(),M(0,Mt,1,1,"span",0)(1,yt,3,1,"ng-container",1),P(2),M(3,bt,3,1,"span",2)(4,St,1,0)),n&2&&(q(0,t.nzIcon?0:-1),D(),g("nzStringTemplateOutlet",t.nzTitle),D(2),q(3,t.isMenuInsideDropDown?3:4))},dependencies:[qe,Ye,_e,ke],encapsulation:2,changeDetection:0});let o=i;return o})(),et=[c.rightTop,c.right,c.rightBottom,c.leftTop,c.left,c.leftBottom],Bt=[c.bottomLeft,c.bottomRight,c.topRight,c.topLeft],st=(()=>{let i=class i{setOpenStateWithoutDebounce(e){this.nzSubmenuService.setOpenStateWithoutDebounce(e)}toggleSubMenu(){this.setOpenStateWithoutDebounce(!this.nzOpen)}setMouseEnterState(e){this.isActive=e,this.mode!=="inline"&&this.nzSubmenuService.setMouseEnterTitleOrOverlayState(e)}setTriggerWidth(){this.mode==="horizontal"&&this.platform.isBrowser&&this.cdkOverlayOrigin&&this.nzPlacement==="bottomLeft"&&(this.triggerWidth=this.cdkOverlayOrigin.nativeElement.getBoundingClientRect().width)}onPositionChange(e){let n=Ke(e);n==="rightTop"||n==="rightBottom"||n==="right"?this.position="right":(n==="leftTop"||n==="leftBottom"||n==="left")&&(this.position="left")}constructor(e,n,t,s,l,h,d){this.nzMenuService=e,this.cdr=n,this.nzSubmenuService=t,this.platform=s,this.isMenuInsideDropDown=l,this.directionality=h,this.noAnimation=d,this.nzMenuClassName="",this.nzPaddingLeft=null,this.nzTitle=null,this.nzIcon=null,this.nzOpen=!1,this.nzDisabled=!1,this.nzPlacement="bottomLeft",this.nzOpenChange=new j,this.cdkOverlayOrigin=null,this.listOfNzSubMenuComponent=null,this.listOfNzMenuItemDirective=null,this.level=this.nzSubmenuService.level,this.destroy$=new p,this.position="right",this.triggerWidth=null,this.theme="light",this.mode="vertical",this.inlinePaddingLeft=null,this.overlayPositions=et,this.isSelected=!1,this.isActive=!1,this.dir="ltr"}ngOnInit(){this.nzMenuService.theme$.pipe(u(this.destroy$)).subscribe(e=>{this.theme=e,this.cdr.markForCheck()}),this.nzSubmenuService.mode$.pipe(u(this.destroy$)).subscribe(e=>{this.mode=e,e==="horizontal"?this.overlayPositions=[c[this.nzPlacement],...Bt]:e==="vertical"&&(this.overlayPositions=et),this.cdr.markForCheck()}),W([this.nzSubmenuService.mode$,this.nzMenuService.inlineIndent$]).pipe(u(this.destroy$)).subscribe(([e,n])=>{this.inlinePaddingLeft=e==="inline"?this.level*n:null,this.cdr.markForCheck()}),this.nzSubmenuService.isCurrentSubMenuOpen$.pipe(u(this.destroy$)).subscribe(e=>{this.isActive=e,e!==this.nzOpen&&(this.setTriggerWidth(),this.nzOpen=e,this.nzOpenChange.emit(this.nzOpen),this.cdr.markForCheck())}),this.dir=this.directionality.value,this.directionality.change?.pipe(u(this.destroy$)).subscribe(e=>{this.dir=e,this.cdr.markForCheck()})}ngAfterContentInit(){this.setTriggerWidth();let e=this.listOfNzMenuItemDirective,n=e.changes,t=_(n,...e.map(s=>s.selected$));n.pipe(Me(e),ce(()=>t),Me(!0),H(()=>e.some(s=>s.nzSelected)),u(this.destroy$)).subscribe(s=>{this.isSelected=s,this.cdr.markForCheck()})}ngOnChanges(e){let{nzOpen:n}=e;n&&(this.nzSubmenuService.setOpenStateWithoutDebounce(this.nzOpen),this.setTriggerWidth())}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};i.\u0275fac=function(n){return new(n||i)(a(b),a(X),a($e),a(ve),a(S),a(F,8),a(B,9))},i.\u0275cmp=N({type:i,selectors:[["","nz-submenu",""]],contentQueries:function(n,t,s){if(n&1&&(J(s,i,5),J(s,it,5)),n&2){let l;T(l=k())&&(t.listOfNzSubMenuComponent=l),T(l=k())&&(t.listOfNzMenuItemDirective=l)}},viewQuery:function(n,t){if(n&1&&ae(ge,7,w),n&2){let s;T(s=k())&&(t.cdkOverlayOrigin=s.first)}},hostVars:34,hostBindings:function(n,t){n&2&&C("ant-dropdown-menu-submenu",t.isMenuInsideDropDown)("ant-dropdown-menu-submenu-disabled",t.isMenuInsideDropDown&&t.nzDisabled)("ant-dropdown-menu-submenu-open",t.isMenuInsideDropDown&&t.nzOpen)("ant-dropdown-menu-submenu-selected",t.isMenuInsideDropDown&&t.isSelected)("ant-dropdown-menu-submenu-vertical",t.isMenuInsideDropDown&&t.mode==="vertical")("ant-dropdown-menu-submenu-horizontal",t.isMenuInsideDropDown&&t.mode==="horizontal")("ant-dropdown-menu-submenu-inline",t.isMenuInsideDropDown&&t.mode==="inline")("ant-dropdown-menu-submenu-active",t.isMenuInsideDropDown&&t.isActive)("ant-menu-submenu",!t.isMenuInsideDropDown)("ant-menu-submenu-disabled",!t.isMenuInsideDropDown&&t.nzDisabled)("ant-menu-submenu-open",!t.isMenuInsideDropDown&&t.nzOpen)("ant-menu-submenu-selected",!t.isMenuInsideDropDown&&t.isSelected)("ant-menu-submenu-vertical",!t.isMenuInsideDropDown&&t.mode==="vertical")("ant-menu-submenu-horizontal",!t.isMenuInsideDropDown&&t.mode==="horizontal")("ant-menu-submenu-inline",!t.isMenuInsideDropDown&&t.mode==="inline")("ant-menu-submenu-active",!t.isMenuInsideDropDown&&t.isActive)("ant-menu-submenu-rtl",t.dir==="rtl")},inputs:{nzMenuClassName:"nzMenuClassName",nzPaddingLeft:"nzPaddingLeft",nzTitle:"nzTitle",nzIcon:"nzIcon",nzOpen:"nzOpen",nzDisabled:"nzDisabled",nzPlacement:"nzPlacement"},outputs:{nzOpenChange:"nzOpenChange"},exportAs:["nzSubmenu"],standalone:!0,features:[ee([$e]),L,V],attrs:wt,ngContentSelectors:Ot,decls:7,vars:8,consts:[["origin","cdkOverlayOrigin"],["subMenuTemplate",""],["nz-submenu-title","","cdkOverlayOrigin","",3,"subMenuMouseState","toggleSubMenu","nzIcon","nzTitle","mode","nzDisabled","isMenuInsideDropDown","paddingLeft"],["nz-submenu-inline-child","",3,"mode","nzOpen","nzNoAnimation","menuClass","templateOutlet"],["cdkConnectedOverlay","",3,"positionChange","cdkConnectedOverlayPositions","cdkConnectedOverlayOrigin","cdkConnectedOverlayWidth","cdkConnectedOverlayOpen","cdkConnectedOverlayTransformOriginOn"],["nz-submenu-none-inline-child","",3,"subMenuMouseState","theme","mode","nzOpen","position","nzDisabled","isMenuInsideDropDown","templateOutlet","menuClass","nzNoAnimation"]],template:function(n,t){if(n&1){let s=K();G(It),I(0,"div",2,0),A("subMenuMouseState",function(h){return R(s),E(t.setMouseEnterState(h))})("toggleSubMenu",function(){return R(s),E(t.toggleSubMenu())}),M(2,Tt,1,0),O(),M(3,kt,1,6,"div",3)(4,$t,1,5)(5,Nt,1,0,"ng-template",null,1,Pe)}n&2&&(g("nzIcon",t.nzIcon)("nzTitle",t.nzTitle)("mode",t.mode)("nzDisabled",t.nzDisabled)("isMenuInsideDropDown",t.isMenuInsideDropDown)("paddingLeft",t.nzPaddingLeft||t.inlinePaddingLeft),D(2),q(2,t.nzTitle?-1:2),D(),q(3,t.mode==="inline"?3:4))},dependencies:[ot,Ft,B,Lt,Ze,Ue,ge],encapsulation:2,changeDetection:0});let o=i;return m([z()],o.prototype,"nzOpen",void 0),m([z()],o.prototype,"nzDisabled",void 0),o})();function Ht(){let o=se(b,{skipSelf:!0,optional:!0}),i=se(nt);return o??i}function Wt(){return se(S,{skipSelf:!0,optional:!0})??!1}var $n=(()=>{let i=class i{setInlineCollapsed(e){this.nzInlineCollapsed=e,this.inlineCollapsed$.next(e)}updateInlineCollapse(){this.listOfNzMenuItemDirective&&(this.nzInlineCollapsed?(this.listOfOpenedNzSubMenuComponent=this.listOfNzSubMenuComponent.filter(e=>e.nzOpen),this.listOfNzSubMenuComponent.forEach(e=>e.setOpenStateWithoutDebounce(!1))):(this.listOfOpenedNzSubMenuComponent.forEach(e=>e.setOpenStateWithoutDebounce(!0)),this.listOfOpenedNzSubMenuComponent=[]))}constructor(e,n,t,s){this.nzMenuService=e,this.isMenuInsideDropDown=n,this.cdr=t,this.directionality=s,this.nzInlineIndent=24,this.nzTheme="light",this.nzMode="vertical",this.nzInlineCollapsed=!1,this.nzSelectable=!this.isMenuInsideDropDown,this.nzClick=new j,this.actualMode="vertical",this.dir="ltr",this.inlineCollapsed$=new v(this.nzInlineCollapsed),this.mode$=new v(this.nzMode),this.destroy$=new p,this.listOfOpenedNzSubMenuComponent=[]}ngOnInit(){W([this.inlineCollapsed$,this.mode$]).pipe(u(this.destroy$)).subscribe(([e,n])=>{this.actualMode=e?"vertical":n,this.nzMenuService.setMode(this.actualMode),this.cdr.markForCheck()}),this.nzMenuService.descendantMenuItemClick$.pipe(u(this.destroy$)).subscribe(e=>{this.nzClick.emit(e),this.nzSelectable&&!e.nzMatchRouter&&this.listOfNzMenuItemDirective.forEach(n=>n.setSelectedState(n===e))}),this.dir=this.directionality.value,this.directionality.change?.pipe(u(this.destroy$)).subscribe(e=>{this.dir=e,this.nzMenuService.setMode(this.actualMode),this.cdr.markForCheck()})}ngAfterContentInit(){this.inlineCollapsed$.pipe(u(this.destroy$)).subscribe(()=>{this.updateInlineCollapse(),this.cdr.markForCheck()})}ngOnChanges(e){let{nzInlineCollapsed:n,nzInlineIndent:t,nzTheme:s,nzMode:l}=e;n&&this.inlineCollapsed$.next(this.nzInlineCollapsed),t&&this.nzMenuService.setInlineIndent(this.nzInlineIndent),s&&this.nzMenuService.setTheme(this.nzTheme),l&&(this.mode$.next(this.nzMode),!e.nzMode.isFirstChange()&&this.listOfNzSubMenuComponent&&this.listOfNzSubMenuComponent.forEach(h=>h.setOpenStateWithoutDebounce(!1)))}ngOnDestroy(){this.destroy$.next(!0),this.destroy$.complete()}};i.\u0275fac=function(n){return new(n||i)(a(b),a(S),a(X),a(F,8))},i.\u0275dir=Q({type:i,selectors:[["","nz-menu",""]],contentQueries:function(n,t,s){if(n&1&&(J(s,it,5),J(s,st,5)),n&2){let l;T(l=k())&&(t.listOfNzMenuItemDirective=l),T(l=k())&&(t.listOfNzSubMenuComponent=l)}},hostVars:34,hostBindings:function(n,t){n&2&&C("ant-dropdown-menu",t.isMenuInsideDropDown)("ant-dropdown-menu-root",t.isMenuInsideDropDown)("ant-dropdown-menu-light",t.isMenuInsideDropDown&&t.nzTheme==="light")("ant-dropdown-menu-dark",t.isMenuInsideDropDown&&t.nzTheme==="dark")("ant-dropdown-menu-vertical",t.isMenuInsideDropDown&&t.actualMode==="vertical")("ant-dropdown-menu-horizontal",t.isMenuInsideDropDown&&t.actualMode==="horizontal")("ant-dropdown-menu-inline",t.isMenuInsideDropDown&&t.actualMode==="inline")("ant-dropdown-menu-inline-collapsed",t.isMenuInsideDropDown&&t.nzInlineCollapsed)("ant-menu",!t.isMenuInsideDropDown)("ant-menu-root",!t.isMenuInsideDropDown)("ant-menu-light",!t.isMenuInsideDropDown&&t.nzTheme==="light")("ant-menu-dark",!t.isMenuInsideDropDown&&t.nzTheme==="dark")("ant-menu-vertical",!t.isMenuInsideDropDown&&t.actualMode==="vertical")("ant-menu-horizontal",!t.isMenuInsideDropDown&&t.actualMode==="horizontal")("ant-menu-inline",!t.isMenuInsideDropDown&&t.actualMode==="inline")("ant-menu-inline-collapsed",!t.isMenuInsideDropDown&&t.nzInlineCollapsed)("ant-menu-rtl",t.dir==="rtl")},inputs:{nzInlineIndent:"nzInlineIndent",nzTheme:"nzTheme",nzMode:"nzMode",nzInlineCollapsed:"nzInlineCollapsed",nzSelectable:"nzSelectable"},outputs:{nzClick:"nzClick"},exportAs:["nzMenu"],standalone:!0,features:[ee([{provide:nt,useClass:b},{provide:b,useFactory:Ht},{provide:S,useFactory:Wt}]),L]});let o=i;return m([z()],o.prototype,"nzInlineCollapsed",void 0),m([z()],o.prototype,"nzSelectable",void 0),o})();function Qt(){return se(S,{optional:!0,skipSelf:!0})??!1}var Yt=(()=>{let i=class i{constructor(e,n,t){this.elementRef=e,this.renderer=n,this.isMenuInsideDropDown=t;let s=this.isMenuInsideDropDown?"ant-dropdown-menu-item-group":"ant-menu-item-group";this.renderer.addClass(e.nativeElement,s)}ngAfterViewInit(){let e=this.titleElement.nativeElement.nextElementSibling;if(e){let n=this.isMenuInsideDropDown?"ant-dropdown-menu-item-group-list":"ant-menu-item-group-list";this.renderer.addClass(e,n)}}};i.\u0275fac=function(n){return new(n||i)(a(w),a(Y),a(S))},i.\u0275cmp=N({type:i,selectors:[["","nz-menu-group",""]],viewQuery:function(n,t){if(n&1&&ae(Rt,5),n&2){let s;T(s=k())&&(t.titleElement=s.first)}},inputs:{nzTitle:"nzTitle"},exportAs:["nzMenuGroup"],standalone:!0,features:[ee([{provide:S,useFactory:Qt}]),V],attrs:Et,ngContentSelectors:At,decls:5,vars:6,consts:[["titleElement",""],[4,"nzStringTemplateOutlet"]],template:function(n,t){n&1&&(G(jt),I(0,"div",null,0),M(2,Pt,2,1,"ng-container",1)(3,Vt,1,0),O(),P(4)),n&2&&(C("ant-menu-item-group-title",!t.isMenuInsideDropDown)("ant-dropdown-menu-item-group-title",t.isMenuInsideDropDown),D(2),g("nzStringTemplateOutlet",t.nzTitle),D(),q(3,t.nzTitle?-1:3))},dependencies:[_e,ke],encapsulation:2,changeDetection:0});let o=i;return o})(),Nn=(()=>{let i=class i{constructor(e){this.elementRef=e}};i.\u0275fac=function(n){return new(n||i)(a(w))},i.\u0275dir=Q({type:i,selectors:[["","nz-menu-divider",""]],hostAttrs:[1,"ant-dropdown-menu-item-divider"],exportAs:["nzMenuDivider"],standalone:!0});let o=i;return o})(),rt=(()=>{let i=class i{};i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=re({type:i}),i.\u0275inj=ie({imports:[st,Yt,ot]});let o=i;return o})();var Xt=["*"];function xt(o,i){if(o&1){let r=K();I(0,"div",0),A("@slideMotion.done",function(n){R(r);let t=f();return E(t.onAnimationEvent(n))})("mouseenter",function(){R(r);let n=f();return E(n.setMouseState(!0))})("mouseleave",function(){R(r);let n=f();return E(n.setMouseState(!1))}),P(1),O()}if(o&2){let r=f();C("ant-dropdown-rtl",r.dir==="rtl"),g("ngClass",r.nzOverlayClassName)("ngStyle",r.nzOverlayStyle)("@slideMotion",void 0)("@.disabled",!!(r.noAnimation!=null&&r.noAnimation.nzNoAnimation))("nzNoAnimation",r.noAnimation==null?null:r.noAnimation.nzNoAnimation)}}var Ut="dropDown",Zt=[c.bottomLeft,c.bottomRight,c.topRight,c.topLeft],ui=(()=>{let i=class i{setDropdownMenuValue(e,n){this.nzDropdownMenu&&this.nzDropdownMenu.setValue(e,n)}constructor(e,n,t,s,l,h){this.nzConfigService=e,this.elementRef=n,this.overlay=t,this.renderer=s,this.viewContainerRef=l,this.platform=h,this._nzModuleName=Ut,this.overlayRef=null,this.destroy$=new p,this.positionStrategy=this.overlay.position().flexibleConnectedTo(this.elementRef.nativeElement).withLockedPosition().withTransformOriginOn(".ant-dropdown"),this.inputVisible$=new v(!1),this.nzTrigger$=new v("hover"),this.overlayClose$=new p,this.nzDropdownMenu=null,this.nzTrigger="hover",this.nzMatchWidthElement=null,this.nzBackdrop=!1,this.nzClickHide=!0,this.nzDisabled=!1,this.nzVisible=!1,this.nzOverlayClassName="",this.nzOverlayStyle={},this.nzPlacement="bottomLeft",this.nzVisibleChange=new j}ngAfterViewInit(){if(this.nzDropdownMenu){let e=this.elementRef.nativeElement,n=_(ue(e,"mouseenter").pipe(U(!0)),ue(e,"mouseleave").pipe(U(!1))),t=this.nzDropdownMenu.mouseState$,s=_(t,n),l=ue(e,"click").pipe(H(()=>!this.nzVisible)),h=this.nzTrigger$.pipe(ce(y=>y==="hover"?s:y==="click"?l:Ee)),d=this.nzDropdownMenu.descendantMenuItemClick$.pipe($(()=>this.nzClickHide),U(!1)),te=_(h,d,this.overlayClose$).pipe($(()=>!this.nzDisabled)),at=_(this.inputVisible$,te);W([at,this.nzDropdownMenu.isChildSubMenuOpen$]).pipe(H(([y,Ne])=>y||Ne),de(150),ne(),$(()=>this.platform.isBrowser),u(this.destroy$)).subscribe(y=>{let Re=(this.nzMatchWidthElement?this.nzMatchWidthElement.nativeElement:e).getBoundingClientRect().width;if(this.nzVisible!==y&&this.nzVisibleChange.emit(y),this.nzVisible=y,y){if(!this.overlayRef)this.overlayRef=this.overlay.create({positionStrategy:this.positionStrategy,minWidth:Re,disposeOnNavigation:!0,hasBackdrop:this.nzBackdrop&&this.nzTrigger==="click",scrollStrategy:this.overlay.scrollStrategies.reposition()}),_(this.overlayRef.backdropClick(),this.overlayRef.detachments(),this.overlayRef.outsidePointerEvents().pipe($(x=>!this.elementRef.nativeElement.contains(x.target))),this.overlayRef.keydownEvents().pipe($(x=>x.keyCode===27&&!Xe(x)))).pipe(u(this.destroy$)).subscribe(()=>{this.overlayClose$.next(!1)});else{let x=this.overlayRef.getConfig();x.minWidth=Re}this.positionStrategy.withPositions([c[this.nzPlacement],...Zt]),(!this.portal||this.portal.templateRef!==this.nzDropdownMenu.templateRef)&&(this.portal=new Ge(this.nzDropdownMenu.templateRef,this.viewContainerRef)),this.overlayRef.attach(this.portal)}else this.overlayRef&&this.overlayRef.detach()}),this.nzDropdownMenu.animationStateChange$.pipe(u(this.destroy$)).subscribe(y=>{y.toState==="void"&&(this.overlayRef&&this.overlayRef.dispose(),this.overlayRef=null)})}}ngOnDestroy(){this.destroy$.next(!0),this.destroy$.complete(),this.overlayRef&&(this.overlayRef.dispose(),this.overlayRef=null)}ngOnChanges(e){let{nzVisible:n,nzDisabled:t,nzOverlayClassName:s,nzOverlayStyle:l,nzTrigger:h}=e;if(h&&this.nzTrigger$.next(this.nzTrigger),n&&this.inputVisible$.next(this.nzVisible),t){let d=this.elementRef.nativeElement;this.nzDisabled?(this.renderer.setAttribute(d,"disabled",""),this.inputVisible$.next(!1)):this.renderer.removeAttribute(d,"disabled")}s&&this.setDropdownMenuValue("nzOverlayClassName",this.nzOverlayClassName),l&&this.setDropdownMenuValue("nzOverlayStyle",this.nzOverlayStyle)}};i.\u0275fac=function(n){return new(n||i)(a(We),a(w),a(xe),a(Y),a(De),a(ve))},i.\u0275dir=Q({type:i,selectors:[["","nz-dropdown",""]],hostAttrs:[1,"ant-dropdown-trigger"],inputs:{nzDropdownMenu:"nzDropdownMenu",nzTrigger:"nzTrigger",nzMatchWidthElement:"nzMatchWidthElement",nzBackdrop:"nzBackdrop",nzClickHide:"nzClickHide",nzDisabled:"nzDisabled",nzVisible:"nzVisible",nzOverlayClassName:"nzOverlayClassName",nzOverlayStyle:"nzOverlayStyle",nzPlacement:"nzPlacement"},outputs:{nzVisibleChange:"nzVisibleChange"},exportAs:["nzDropdown"],standalone:!0,features:[L]});let o=i;return m([Qe(),z()],o.prototype,"nzBackdrop",void 0),m([z()],o.prototype,"nzClickHide",void 0),m([z()],o.prototype,"nzDisabled",void 0),m([z()],o.prototype,"nzVisible",void 0),o})(),Kt=(()=>{let i=class i{};i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=re({type:i}),i.\u0275inj=ie({});let o=i;return o})(),di=(()=>{let i=class i{constructor(){}};i.\u0275fac=function(n){return new(n||i)},i.\u0275dir=Q({type:i,selectors:[["a","nz-dropdown",""]],hostAttrs:[1,"ant-dropdown-link"],standalone:!0});let o=i;return o})(),ci=(()=>{let i=class i{constructor(e,n,t){this.renderer=e,this.nzButtonGroupComponent=n,this.elementRef=t}ngAfterViewInit(){let e=this.renderer.parentNode(this.elementRef.nativeElement);this.nzButtonGroupComponent&&e&&this.renderer.addClass(e,"ant-dropdown-button")}};i.\u0275fac=function(n){return new(n||i)(a(Y),a(Je,9),a(w))},i.\u0275dir=Q({type:i,selectors:[["","nz-button","","nz-dropdown",""]],standalone:!0});let o=i;return o})(),pi=(()=>{let i=class i{onAnimationEvent(e){this.animationStateChange$.emit(e)}setMouseState(e){this.mouseState$.next(e)}setValue(e,n){this[e]=n,this.cdr.markForCheck()}constructor(e,n,t,s,l,h,d){this.cdr=e,this.elementRef=n,this.renderer=t,this.viewContainerRef=s,this.nzMenuService=l,this.directionality=h,this.noAnimation=d,this.mouseState$=new v(!1),this.isChildSubMenuOpen$=this.nzMenuService.isChildSubMenuOpen$,this.descendantMenuItemClick$=this.nzMenuService.descendantMenuItemClick$,this.animationStateChange$=new j,this.nzOverlayClassName="",this.nzOverlayStyle={},this.dir="ltr",this.destroy$=new p}ngOnInit(){this.directionality.change?.pipe(u(this.destroy$)).subscribe(e=>{this.dir=e,this.cdr.detectChanges()}),this.dir=this.directionality.value}ngAfterContentInit(){this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement),this.elementRef.nativeElement)}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};i.\u0275fac=function(n){return new(n||i)(a(X),a(w),a(Y),a(De),a(b),a(F,8),a(B,9))},i.\u0275cmp=N({type:i,selectors:[["nz-dropdown-menu"]],viewQuery:function(n,t){if(n&1&&ae(Ae,7),n&2){let s;T(s=k())&&(t.templateRef=s.first)}},exportAs:["nzDropdownMenu"],standalone:!0,features:[ee([b,{provide:S,useValue:!0}]),V],ngContentSelectors:Xt,decls:1,vars:0,consts:[[1,"ant-dropdown",3,"mouseenter","mouseleave","ngClass","ngStyle","nzNoAnimation"]],template:function(n,t){n&1&&(G(),M(0,xt,2,7,"ng-template"))},dependencies:[me,Ve,B],encapsulation:2,data:{animation:[ze]},changeDetection:0});let o=i;return o})(),hi=(()=>{let i=class i{};i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=re({type:i}),i.\u0275inj=ie({imports:[Kt,rt]});let o=i;return o})(),mi=[new le({originX:"start",originY:"top"},{overlayX:"start",overlayY:"top"}),new le({originX:"start",originY:"top"},{overlayX:"start",overlayY:"bottom"}),new le({originX:"start",originY:"top"},{overlayX:"end",overlayY:"bottom"}),new le({originX:"start",originY:"top"},{overlayX:"end",overlayY:"top"})];export{it as a,st as b,$n as c,Yt as d,Nn as e,rt as f,ui as g,di as h,ci as i,pi as j,hi as k};
