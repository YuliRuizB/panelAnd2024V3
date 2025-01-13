import './polyfills.server.mjs';
import{Fa as X,na as K,oa as W,y as j,z as E}from"./chunk-RBIOE7SG.mjs";import{Ab as q,Bb as U,Cb as b,Db as O,Dc as H,Eb as D,Ec as R,Fb as h,Gb as S,Hb as P,Ja as l,Jc as J,Ka as g,Nb as G,Ob as N,Va as m,W as _,Xa as r,Ya as B,Yb as M,Za as z,aa as Q,ba as A,d as $,f as w,ia as v,ib as p,ja as V,jb as d,kb as C,kc as F,lb as f,mb as u,nb as I,oa as y,tb as c,ub as T,vb as x}from"./chunk-5UUOYCM5.mjs";var te=["template"],Z=["*"];function ne(e,t){if(e&1&&(f(0),h(1),u()),e&2){let n=c(3);l(),S(n.nzLabel)}}function ie(e,t){if(e&1&&(p(0,"div",7),m(1,ne,2,1,"ng-container",5),d()),e&2){let n=c(2);l(),r("nzStringTemplateOutlet",n.nzLabel)}}function oe(e,t){if(e&1&&(f(0),h(1),u()),e&2){let n=c(2);l(),S(n.nzDot)}}function ae(e,t){if(e&1&&(p(0,"li",1),m(1,ie,2,1,"div",2),C(2,"div",3),p(3,"div",4),m(4,oe,2,1,"ng-container",5),d(),p(5,"div",6),x(6),d()()),e&2){let n=c();z("ant-timeline-item-right",(n.nzPosition||n.position)==="right")("ant-timeline-item-left",(n.nzPosition||n.position)==="left")("ant-timeline-item-last",n.isLast),l(),r("ngIf",n.nzLabel),l(2),B("border-color",n.borderColor),z("ant-timeline-item-head-red",n.nzColor==="red")("ant-timeline-item-head-blue",n.nzColor==="blue")("ant-timeline-item-head-green",n.nzColor==="green")("ant-timeline-item-head-gray",n.nzColor==="gray")("ant-timeline-item-head-custom",!!n.nzDot),l(),r("nzStringTemplateOutlet",n.nzDot)}}function le(e,t){if(e&1&&I(0,4),e&2){c();let n=D(5);r("ngTemplateOutlet",n)}}function re(e,t){}function me(e,t){if(e&1&&(f(0),m(1,re,0,0,"ng-template",4),u()),e&2){let n=t.$implicit;l(),r("ngTemplateOutlet",n.template)}}function se(e,t){if(e&1&&I(0,4),e&2){c();let n=D(5);r("ngTemplateOutlet",n)}}function ce(e,t){e&1&&C(0,"span",12)}function pe(e,t){if(e&1&&(f(0),h(1),m(2,ce,1,0,"span",11),u()),e&2){let n=c(3);l(),P(" ",n.nzPendingDot," "),l(),r("ngIf",!n.nzPendingDot)}}function de(e,t){if(e&1&&(f(0),h(1),u()),e&2){let n=c(3);l(),P(" ",n.isPendingBoolean?"":n.nzPending," ")}}function ge(e,t){if(e&1&&(p(0,"li",6),C(1,"div",7),p(2,"div",8),m(3,pe,3,2,"ng-container",9),d(),p(4,"div",10),m(5,de,2,1,"ng-container",9),d()()),e&2){let n=c(2);l(3),r("nzStringTemplateOutlet",n.nzPendingDot),l(2),r("nzStringTemplateOutlet",n.nzPending)}}function fe(e,t){if(e&1&&m(0,ge,6,2,"li",5),e&2){let n=c();r("ngIf",n.nzPending)}}var ue=["red","blue","green","grey","gray"],L=(()=>{let t=class t{constructor(){this.check$=new w(1)}markForCheck(){this.check$.next()}};t.\u0275fac=function(i){return new(i||t)},t.\u0275prov=Q({token:t,factory:t.\u0275fac});let e=t;return e})();function he(e){return ue.findIndex(t=>t===e)!==-1}var ee=(()=>{let t=class t{constructor(a,i){this.cdr=a,this.timelineService=i,this.nzColor="blue",this.isLast=!1,this.borderColor=null}ngOnChanges(a){this.timelineService.markForCheck(),a.nzColor&&this.updateCustomColor()}detectChanges(){this.cdr.detectChanges()}updateCustomColor(){this.borderColor=he(this.nzColor)?null:this.nzColor}};t.\u0275fac=function(i){return new(i||t)(g(F),g(L))},t.\u0275cmp=v({type:t,selectors:[["nz-timeline-item"],["","nz-timeline-item",""]],viewQuery:function(i,o){if(i&1&&U(te,5),i&2){let s;b(s=O())&&(o.template=s.first)}},inputs:{nzPosition:"nzPosition",nzColor:"nzColor",nzDot:"nzDot",nzLabel:"nzLabel"},exportAs:["nzTimelineItem"],standalone:!0,features:[y,N],ngContentSelectors:Z,decls:2,vars:0,consts:[["template",""],[1,"ant-timeline-item"],["class","ant-timeline-item-label",4,"ngIf"],[1,"ant-timeline-item-tail"],[1,"ant-timeline-item-head"],[4,"nzStringTemplateOutlet"],[1,"ant-timeline-item-content"],[1,"ant-timeline-item-label"]],template:function(i,o){i&1&&(T(),m(0,ae,7,20,"ng-template",null,0,M))},dependencies:[R,E,j],encapsulation:2,changeDetection:0});let e=t;return e})(),_e=(()=>{let t=class t{constructor(a,i,o){this.cdr=a,this.timelineService=i,this.directionality=o,this.nzMode="left",this.nzReverse=!1,this.isPendingBoolean=!1,this.timelineItems=[],this.dir="ltr",this.hasLabelItem=!1,this.destroy$=new $}ngOnChanges(a){let{nzMode:i,nzReverse:o,nzPending:s}=a;(Y(i)||Y(o))&&this.updateChildren(),s&&(this.isPendingBoolean=s.currentValue===!0)}ngOnInit(){this.timelineService.check$.pipe(_(this.destroy$)).subscribe(()=>{this.cdr.markForCheck()}),this.directionality.change?.pipe(_(this.destroy$)).subscribe(a=>{this.dir=a,this.cdr.detectChanges()}),this.dir=this.directionality.value}ngAfterContentInit(){this.updateChildren(),this.listOfItems.changes.pipe(_(this.destroy$)).subscribe(()=>{this.updateChildren()})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}updateChildren(){if(this.listOfItems&&this.listOfItems.length){let a=this.listOfItems.length,i=!1;this.listOfItems.forEach((o,s)=>{o.isLast=this.nzReverse?s===0:s===a-1,o.position=ze(s,this.nzMode),!i&&o.nzLabel&&(i=!0),o.detectChanges()}),this.timelineItems=this.nzReverse?this.listOfItems.toArray().reverse():this.listOfItems.toArray(),this.hasLabelItem=i}else this.timelineItems=[],this.hasLabelItem=!1;this.cdr.markForCheck()}};t.\u0275fac=function(i){return new(i||t)(g(F),g(L),g(X,8))},t.\u0275cmp=v({type:t,selectors:[["nz-timeline"]],contentQueries:function(i,o,s){if(i&1&&q(s,ee,4),i&2){let k;b(k=O())&&(o.listOfItems=k)}},inputs:{nzMode:"nzMode",nzPending:"nzPending",nzPendingDot:"nzPendingDot",nzReverse:"nzReverse"},exportAs:["nzTimeline"],standalone:!0,features:[G([L]),y,N],ngContentSelectors:Z,decls:7,vars:15,consts:[["pendingTemplate",""],[1,"ant-timeline"],[3,"ngTemplateOutlet",4,"ngIf"],[4,"ngFor","ngForOf"],[3,"ngTemplateOutlet"],["class","ant-timeline-item ant-timeline-item-pending",4,"ngIf"],[1,"ant-timeline-item","ant-timeline-item-pending"],[1,"ant-timeline-item-tail"],[1,"ant-timeline-item-head","ant-timeline-item-head-custom","ant-timeline-item-head-blue"],[4,"nzStringTemplateOutlet"],[1,"ant-timeline-item-content"],["nz-icon","","nzType","loading",4,"ngIf"],["nz-icon","","nzType","loading"]],template:function(i,o){i&1&&(T(),p(0,"ul",1),m(1,le,1,1,"ng-container",2)(2,me,2,1,"ng-container",3)(3,se,1,1,"ng-container",2),d(),m(4,fe,1,1,"ng-template",null,0,M),x(6)),i&2&&(z("ant-timeline-label",o.hasLabelItem)("ant-timeline-right",!o.hasLabelItem&&o.nzMode==="right")("ant-timeline-alternate",o.nzMode==="alternate"||o.nzMode==="custom")("ant-timeline-pending",!!o.nzPending)("ant-timeline-reverse",o.nzReverse)("ant-timeline-rtl",o.dir==="rtl"),l(),r("ngIf",o.nzReverse),l(),r("ngForOf",o.timelineItems),l(),r("ngIf",!o.nzReverse))},dependencies:[R,J,H,E,j,W,K],encapsulation:2,changeDetection:0});let e=t;return e})();function Y(e){return!!(e&&(e.previousValue!==e.currentValue||e.isFirstChange()))}function ze(e,t){return t==="custom"?void 0:t==="left"?"left":t==="right"?"right":t==="alternate"&&e%2===0?"left":"right"}var Se=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=V({type:t}),t.\u0275inj=A({imports:[ee,_e]});let e=t;return e})();export{ee as a,_e as b,Se as c};
