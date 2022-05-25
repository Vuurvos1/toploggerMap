const ht=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}};ht();function V(){}const mt=e=>e;function gt(e,t){for(const n in t)e[n]=t[n];return e}function qe(e){return e()}function je(){return Object.create(null)}function F(e){e.forEach(qe)}function Je(e){return typeof e=="function"}function A(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function pt(e){return Object.keys(e).length===0}function _t(e,...t){if(e==null)return V;const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function J(e,t,n){e.$$.on_destroy.push(_t(t,n))}function bt(e,t,n,o){if(e){const s=Ue(e,t,n,o);return e[0](s)}}function Ue(e,t,n,o){return e[1]&&o?gt(n.ctx.slice(),e[1](o(t))):n.ctx}function yt(e,t,n,o){if(e[2]&&o){const s=e[2](o(n));if(t.dirty===void 0)return s;if(typeof s=="object"){const r=[],i=Math.max(t.dirty.length,s.length);for(let c=0;c<i;c+=1)r[c]=t.dirty[c]|s[c];return r}return t.dirty|s}return t.dirty}function wt(e,t,n,o,s,r){if(s){const i=Ue(t,n,o,r);e.p(i,s)}}function vt(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let o=0;o<n;o++)t[o]=-1;return t}return-1}function kt(e,t,n){return e.set(n),t}const Ze=typeof window!="undefined";let St=Ze?()=>window.performance.now():()=>Date.now(),Ve=Ze?e=>requestAnimationFrame(e):V;const q=new Set;function Ke(e){q.forEach(t=>{t.c(e)||(q.delete(t),t.f())}),q.size!==0&&Ve(Ke)}function It(e){let t;return q.size===0&&Ve(Ke),{promise:new Promise(n=>{q.add(t={c:e,f:n})}),abort(){q.delete(t)}}}function m(e,t){e.appendChild(t)}function Qe(e){if(!e)return document;const t=e.getRootNode?e.getRootNode():e.ownerDocument;return t&&t.host?t:e.ownerDocument}function Vt(e){const t=k("style");return Bt(Qe(e),t),t.sheet}function Bt(e,t){m(e.head||e,t)}function j(e,t,n){e.insertBefore(t,n||null)}function O(e){e.parentNode.removeChild(e)}function xe(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function k(e){return document.createElement(e)}function Q(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function M(e){return document.createTextNode(e)}function B(){return M(" ")}function et(){return M("")}function N(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function b(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function $t(e){return Array.from(e.childNodes)}function ee(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function de(e,t,n,o){n===null?e.style.removeProperty(t):e.style.setProperty(t,n,o?"important":"")}function he(e,t){for(let n=0;n<e.options.length;n+=1){const o=e.options[n];if(o.__value===t){o.selected=!0;return}}e.selectedIndex=-1}function tt(e){const t=e.querySelector(":checked")||e.options[0];return t&&t.__value}function Ee(e,t,n){e.classList[n?"add":"remove"](t)}function nt(e,t,{bubbles:n=!1,cancelable:o=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(e,n,o,t),s}const me=new Map;let ge=0;function Mt(e){let t=5381,n=e.length;for(;n--;)t=(t<<5)-t^e.charCodeAt(n);return t>>>0}function Ot(e,t){const n={stylesheet:Vt(t),rules:{}};return me.set(e,n),n}function Pe(e,t,n,o,s,r,i,c=0){const a=16.666/o;let l=`{
`;for(let h=0;h<=1;h+=a){const p=t+(n-t)*r(h);l+=h*100+`%{${i(p,1-p)}}
`}const u=l+`100% {${i(n,1-n)}}
}`,f=`__svelte_${Mt(u)}_${c}`,d=Qe(e),{stylesheet:g,rules:w}=me.get(d)||Ot(d,e);w[f]||(w[f]=!0,g.insertRule(`@keyframes ${f} ${u}`,g.cssRules.length));const S=e.style.animation||"";return e.style.animation=`${S?`${S}, `:""}${f} ${o}ms linear ${s}ms 1 both`,ge+=1,f}function Nt(e,t){const n=(e.style.animation||"").split(", "),o=n.filter(t?r=>r.indexOf(t)<0:r=>r.indexOf("__svelte")===-1),s=n.length-o.length;s&&(e.style.animation=o.join(", "),ge-=s,ge||jt())}function jt(){Ve(()=>{ge||(me.forEach(e=>{const{stylesheet:t}=e;let n=t.cssRules.length;for(;n--;)t.deleteRule(n);e.rules={}}),me.clear())})}let re;function se(e){re=e}function Be(){if(!re)throw new Error("Function called outside component initialization");return re}function st(e){Be().$$.on_mount.push(e)}function Et(e){Be().$$.after_update.push(e)}function $e(){const e=Be();return(t,n,{cancelable:o=!1}={})=>{const s=e.$$.callbacks[t];if(s){const r=nt(t,n,{cancelable:o});return s.slice().forEach(i=>{i.call(e,r)}),!r.defaultPrevented}return!0}}function Pt(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach(o=>o.call(this,t))}const te=[],le=[],ue=[],ke=[],ot=Promise.resolve();let Se=!1;function rt(){Se||(Se=!0,ot.then(ct))}function lt(){return rt(),ot}function D(e){ue.push(e)}function it(e){ke.push(e)}const we=new Set;let ce=0;function ct(){const e=re;do{for(;ce<te.length;){const t=te[ce];ce++,se(t),Ct(t.$$)}for(se(null),te.length=0,ce=0;le.length;)le.pop()();for(let t=0;t<ue.length;t+=1){const n=ue[t];we.has(n)||(we.add(n),n())}ue.length=0}while(te.length);for(;ke.length;)ke.pop()();Se=!1,we.clear(),se(e)}function Ct(e){if(e.fragment!==null){e.update(),F(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(D)}}let x;function Dt(){return x||(x=Promise.resolve(),x.then(()=>{x=null})),x}function ve(e,t,n){e.dispatchEvent(nt(`${t?"intro":"outro"}${n}`))}const fe=new Set;let C;function at(){C={r:0,c:[],p:C}}function ut(){C.r||F(C.c),C=C.p}function $(e,t){e&&e.i&&(fe.delete(e),e.i(t))}function P(e,t,n,o){if(e&&e.o){if(fe.has(e))return;fe.add(e),C.c.push(()=>{fe.delete(e),o&&(n&&e.d(1),o())}),e.o(t)}}const Ft={duration:0};function Ce(e,t,n,o){let s=t(e,n),r=o?0:1,i=null,c=null,a=null;function l(){a&&Nt(e,a)}function u(d,g){const w=d.b-r;return g*=Math.abs(w),{a:r,b:d.b,d:w,duration:g,start:d.start,end:d.start+g,group:d.group}}function f(d){const{delay:g=0,duration:w=300,easing:S=mt,tick:h=V,css:p}=s||Ft,_={start:St()+g,b:d};d||(_.group=C,C.r+=1),i||c?c=_:(p&&(l(),a=Pe(e,r,d,w,g,S,p)),d&&h(0,1),i=u(_,w),D(()=>ve(e,d,"start")),It(y=>{if(c&&y>c.start&&(i=u(c,w),c=null,ve(e,i.b,"start"),p&&(l(),a=Pe(e,r,i.b,i.duration,0,S,s.css))),i){if(y>=i.end)h(r=i.b,1-r),ve(e,i.b,"end"),c||(i.b?l():--i.group.r||F(i.group.c)),i=null;else if(y>=i.start){const I=y-i.start;r=i.a+i.d*S(I/i.duration),h(r,1-r)}}return!!(i||c)}))}return{run(d){Je(s)?Dt().then(()=>{s=s(),f(d)}):f(d)},end(){l(),i=c=null}}}const Xt=typeof window!="undefined"?window:typeof globalThis!="undefined"?globalThis:global;function ft(e,t,n){const o=e.$$.props[t];o!==void 0&&(e.$$.bound[o]=n,n(e.$$.ctx[o]))}function U(e){e&&e.c()}function L(e,t,n,o){const{fragment:s,on_mount:r,on_destroy:i,after_update:c}=e.$$;s&&s.m(t,n),o||D(()=>{const a=r.map(qe).filter(Je);i?i.push(...a):F(a),e.$$.on_mount=[]}),c.forEach(D)}function G(e,t){const n=e.$$;n.fragment!==null&&(F(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Tt(e,t){e.$$.dirty[0]===-1&&(te.push(e),rt(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function H(e,t,n,o,s,r,i,c=[-1]){const a=re;se(e);const l=e.$$={fragment:null,ctx:null,props:r,update:V,not_equal:s,bound:je(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(a?a.$$.context:[])),callbacks:je(),dirty:c,skip_bound:!1,root:t.target||a.$$.root};i&&i(l.root);let u=!1;if(l.ctx=n?n(e,t.props||{},(f,d,...g)=>{const w=g.length?g[0]:d;return l.ctx&&s(l.ctx[f],l.ctx[f]=w)&&(!l.skip_bound&&l.bound[f]&&l.bound[f](w),u&&Tt(e,f)),d}):[],l.update(),u=!0,F(l.before_update),l.fragment=o?o(l.ctx):!1,t.target){if(t.hydrate){const f=$t(t.target);l.fragment&&l.fragment.l(f),f.forEach(O)}else l.fragment&&l.fragment.c();t.intro&&$(e.$$.fragment),L(e,t.target,t.anchor,t.customElement),ct()}se(a)}class R{$destroy(){G(this,1),this.$destroy=V}$on(t,n){const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const s=o.indexOf(n);s!==-1&&o.splice(s,1)}}$set(t){this.$$set&&!pt(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Y=[];function Me(e,t=V){let n;const o=new Set;function s(c){if(A(e,c)&&(e=c,n)){const a=!Y.length;for(const l of o)l[1](),Y.push(l,e);if(a){for(let l=0;l<Y.length;l+=2)Y[l][0](Y[l+1]);Y.length=0}}}function r(c){s(c(e))}function i(c,a=V){const l=[c,a];return o.add(l),o.size===1&&(n=t(s)||V),c(e),()=>{o.delete(l),o.size===0&&(n(),n=null)}}return{set:s,update:r,subscribe:i}}const zt=JSON.parse(localStorage.getItem("gyms")),pe=Me(zt);pe.subscribe(e=>{typeof e=="object"&&e!=null&&localStorage.setItem("gyms",JSON.stringify(e))});const _e=Me(JSON.parse(localStorage.getItem("gym")));_e.subscribe(e=>{typeof e=="object"&&e!=null&&localStorage.setItem("gym",JSON.stringify(e))});const oe=Me(void 0);function ne(e,t,n){this.k=e,this.x=t,this.y=n}ne.prototype={constructor:ne,scale:function(e){return e===1?this:new ne(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new ne(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};new ne(1,0,0);const ae={uiaa:{2:"III",3:"IV-",3.44:"IV",3.89:"IV+",4.33:"V-",4.67:"V",4.92:"V+",5.5:"VI",5.21:"VI-",5.78:"VI+",6.06:"VII-",6.33:"VII",6.56:"VII+",6.78:"VIII-",7:"VIII",7.22:"VIII+",7.44:"IX-",7.67:"IX",7.89:"IX+",8.11:"X-",8.33:"X",8.56:"X+",8.78:"XI-",9:"XI",9.22:"XI+",9.44:"XII-"},yds:{2:"5.3",3:"5.4",4:"5.5",4.33:"5.6",4.67:"5.7",5:"5.8",5.33:"5.9",5.67:"5.10a",6:"5.10b",6.5:"5.11a",6.17:"5.10c",6.33:"5.10d",6.67:"5.11b",6.83:"5.11c",7:"5.11d",7.5:"5.12c",7.17:"5.12a",7.33:"5.12b",7.67:"5.12d",7.83:"5.13a",8:"5.13b",8.5:"5.14a",8.17:"5.13c",8.33:"5.13d",8.67:"5.14b",8.83:"5.14c",9:"5.14d",9.5:"5.15c",9.17:"5.15a",9.33:"5.15b"},french:{2:"2",2.5:"2",3:"3a",3.33:"3b",3.67:"3c",4:"4a",4.33:"4b",4.67:"4c",5:"5a",5.17:"5a+",5.33:"5b",5.5:"5b+",5.67:"5c",5.83:"5c+",6:"6a",6.17:"6a+",6.33:"6b",6.5:"6b+",6.67:"6c",6.83:"6c+",7:"7a",7.17:"7a+",7.33:"7b",7.5:"7b+",7.67:"7c",7.83:"7c+",8:"8a",8.17:"8a+",8.33:"8b",8.5:"8b+",8.67:"8c",8.83:"8c+",9:"9a",9.17:"9a+",9.33:"9b",9.5:"9b+"},french_boulder:{2:"2",2.5:"2",2.75:"2+",3:"3a",3.33:"3b",3.67:"3c",4:"4a",4.33:"4b",4.67:"4c",5:"5a",5.17:"5a+",5.33:"5b",5.5:"5b+",5.67:"5c",5.83:"5c+",6:"6a",6.17:"6a+",6.33:"6b",6.5:"6b+",6.67:"6c",6.83:"6c+",7:"7a",7.17:"7a+",7.33:"7b",7.5:"7b+",7.67:"7c",7.83:"7c+",8:"8a",8.17:"8a+",8.33:"8b",8.5:"8b+",8.67:"8c",8.83:"8c+",9:"9a",9.17:"9a+",9.33:"9b",9.5:"9b+"},french_rounded:{2:"2",2.5:"2",2.75:"2+",3:"3",3.33:"3+",3.67:"4-",4:"4",4.33:"4+",4.67:"5-",5:"5",5.5:"5+",6:"6a",6.5:"6b+",6.17:"6a+",6.33:"6b",6.67:"6c",6.83:"6c+",7:"7a",7.5:"7b+",7.17:"7a+",7.33:"7b",7.67:"7c",7.83:"7c+",8:"8a",8.5:"8b+",8.17:"8a+",8.33:"8b",8.67:"8c",8.83:"8c+",9:"9a",9.5:"9b+",9.17:"9a+",9.33:"9b"},ewbank:{2:"7",3:"8",3.33:"9",3.67:"10",4:"11",4.33:"12",4.66:"13",5:"14",5.33:"15",5.67:"16",6:"17",6.5:"20",6.17:"18",6.33:"19",6.67:"21",6.83:"22",7:"23",7.5:"26",7.17:"24",7.33:"25",7.67:"27",7.83:"28",8:"29",8.5:"32",8.17:"30",8.33:"31",8.67:"33",8.83:"34",9:"35",9.5:"38",9.17:"36",9.33:"37"},british:{2:"B0",3:"B1",3.83:"B2",5:"B3",6:"B4",6.28:"B5",6.56:"B6",6.83:"B7",7.11:"B8",7.39:"B9",7.67:"B10",7.87:"B11",8.08:"B12",8.29:"B13",8.5:"B14",8.67:"B15",8.83:"B16",9:"B17"},v_grade:{2:"VB",3:"VB",3.5:"V0-",4:"V0",4.5:"V0+",5:"V1",5.5:"V2",6:"V3",6.33:"V4",6.67:"V5",7:"V6",7.2:"V7",7.4:"V8",7.6:"V9",7.8:"V10",8:"V11",8.17:"V12",8.33:"V13",8.5:"V14",8.67:"V15",8.83:"V16",9:"V17"}};function De(e,t){if(!ae[t][Number(e)]){const n=Object.keys(ae[t]).map(r=>Number(r)),o=Number(e),s=Math.max(...n.filter(r=>r<=o));return ae[t][s]}return ae[t][Number(e)]}const dt="https://api.toplogger.nu/v1";function At(e){return`https://cdn1.toplogger.nu/images/gyms/${e}/floorplan.svg`}function Lt(e){const t={filters:{deleted:!1,live:!0}};return`${dt}/gyms/${e}/climbs?json_params=${encodeURIComponent(JSON.stringify(t))}`}function Gt(e){const t={filters:{gym_id:e,deleted:!1,live:!0,score_system:"none"},includes:["climb_groups"]};return`${dt}/groups?json_params=${encodeURIComponent(JSON.stringify(t))}`}async function Fe(e,t){const[n,o,s]=await Promise.all([fetch(Lt(e)),fetch(Gt(e)),fetch(At(t))]).then(r=>Promise.all([r[0].json(),r[1].json(),r[2].text()])).then(r=>r).catch(r=>{throw new Error(r)});return[n,o,s]}function Ht(e){const t=e-1;return t*t*t+1}function Xe(e){return--e*e*e*e*e+1}function Te(e,{delay:t=0,duration:n=400,easing:o=Ht}={}){const s=getComputedStyle(e),r=+s.opacity,i=parseFloat(s.height),c=parseFloat(s.paddingTop),a=parseFloat(s.paddingBottom),l=parseFloat(s.marginTop),u=parseFloat(s.marginBottom),f=parseFloat(s.borderTopWidth),d=parseFloat(s.borderBottomWidth);return{delay:t,duration:n,easing:o,css:g=>`overflow: hidden;opacity: ${Math.min(g*20,1)*r};height: ${g*i}px;padding-top: ${g*c}px;padding-bottom: ${g*a}px;margin-top: ${g*l}px;margin-bottom: ${g*u}px;border-top-width: ${g*f}px;border-bottom-width: ${g*d}px;`}}function ze(e){const t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n=e?new Date(e):new Date,o=t[n.getMonth()],s=String(n.getDate()).padStart(2,"0"),r=n.getFullYear();return`${s} ${o} ${r}`}function Ae(e){let t,n,o,s,r,i,c,a,l,u=De(e[0].grade,"french_boulder")+"",f,d,g,w,S=e[0].nr_of_ascends+"",h,p,_,y,I=e[0].average_opinion+"",v,E,Z,K,Oe,ie=ze(e[0].date_set)+"",be,X,T,ye,Ne;return{c(){t=k("div"),n=k("div"),o=k("h3"),o.textContent="Route data",s=B(),r=k("button"),r.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>',i=B(),c=k("ul"),a=k("li"),l=M("grade: "),f=M(u),d=B(),g=k("li"),w=M("ascends: "),h=M(S),p=B(),_=k("li"),y=M("average opinion: "),v=M(I),E=M("/5.0"),Z=B(),K=k("li"),Oe=M("date set: "),be=M(ie),b(o,"class","mr-auto"),b(r,"class","bg-none border-none leading-none"),b(n,"class","flex flex-row items-center mb-4"),b(a,"class","list-none"),b(g,"class","list-none"),b(_,"class","list-none"),b(K,"class","list-none"),b(t,"class","preview fixed bottom-0 left-0 w-screen px-4 py-4 bg-white shadow-lg md:w-max md:right-4 md:left-auto md:bottom-4")},m(z,W){j(z,t,W),m(t,n),m(n,o),m(n,s),m(n,r),m(t,i),m(t,c),m(c,a),m(a,l),m(a,f),m(c,d),m(c,g),m(g,w),m(g,h),m(c,p),m(c,_),m(_,y),m(_,v),m(_,E),m(c,Z),m(c,K),m(K,Oe),m(K,be),T=!0,ye||(Ne=N(r,"click",e[1]),ye=!0)},p(z,W){e=z,(!T||W&1)&&u!==(u=De(e[0].grade,"french_boulder")+"")&&ee(f,u),(!T||W&1)&&S!==(S=e[0].nr_of_ascends+"")&&ee(h,S),(!T||W&1)&&I!==(I=e[0].average_opinion+"")&&ee(v,I),(!T||W&1)&&ie!==(ie=ze(e[0].date_set)+"")&&ee(be,ie)},i(z){T||(D(()=>{X||(X=Ce(t,Te,{duration:200,easing:Xe},!0)),X.run(1)}),T=!0)},o(z){X||(X=Ce(t,Te,{duration:200,easing:Xe},!1)),X.run(0),T=!1},d(z){z&&O(t),z&&X&&X.end(),ye=!1,Ne()}}}function Rt(e){let t,n,o=e[0]&&Ae(e);return{c(){o&&o.c(),t=et()},m(s,r){o&&o.m(s,r),j(s,t,r),n=!0},p(s,[r]){s[0]?o?(o.p(s,r),r&1&&$(o,1)):(o=Ae(s),o.c(),$(o,1),o.m(t.parentNode,t)):o&&(at(),P(o,1,1,()=>{o=null}),ut())},i(s){n||($(o),n=!0)},o(s){P(o),n=!1},d(s){o&&o.d(s),s&&O(t)}}}function Wt(e,t,n){let{data:o}=t;function s(r){Pt.call(this,e,r)}return e.$$set=r=>{"data"in r&&n(0,o=r.data)},[o,s]}class Yt extends R{constructor(t){super(),H(this,t,Wt,Rt,A,{data:0})}}function Le(e,t,n){const o=e.slice();return o[6]=t[n],o}function Ge(e){let t,n=e[1],o=[];for(let s=0;s<n.length;s+=1)o[s]=He(Le(e,n,s));return{c(){for(let s=0;s<o.length;s+=1)o[s].c();t=et()},m(s,r){for(let i=0;i<o.length;i+=1)o[i].m(s,r);j(s,t,r)},p(s,r){if(r&2){n=s[1];let i;for(i=0;i<n.length;i+=1){const c=Le(s,n,i);o[i]?o[i].p(c,r):(o[i]=He(c),o[i].c(),o[i].m(t.parentNode,t))}for(;i<o.length;i+=1)o[i].d(1);o.length=n.length}},d(s){xe(o,s),s&&O(t)}}}function He(e){let t,n=e[6].name+"",o,s;return{c(){t=k("option"),o=M(n),t.__value=s=e[6],t.value=t.__value},m(r,i){j(r,t,i),m(t,o)},p(r,i){i&2&&n!==(n=r[6].name+"")&&ee(o,n),i&2&&s!==(s=r[6])&&(t.__value=s,t.value=t.__value)},d(r){r&&O(t)}}}function qt(e){let t,n,o,s,r=e[1]&&Object.keys(e[1]).length!=0&&e[1],i,c,a=r&&Ge(e);return{c(){t=k("div"),n=k("label"),n.textContent="Gym",o=B(),s=k("select"),a&&a.c(),b(n,"class","mb-1 block font-bold"),b(n,"for","gym"),b(s,"class","px-2 py-0.5 border-2 rounded w-full"),b(s,"name",""),b(s,"id","gym"),e[0]===void 0&&D(()=>e[3].call(s)),b(t,"class","p-4")},m(l,u){j(l,t,u),m(t,n),m(t,o),m(t,s),a&&a.m(s,null),he(s,e[0]),i||(c=[N(s,"change",e[3]),N(s,"change",e[4])],i=!0)},p(l,[u]){u&2&&(r=l[1]&&Object.keys(l[1]).length!=0&&l[1]),r?a?a.p(l,u):(a=Ge(l),a.c(),a.m(s,null)):a&&(a.d(1),a=null),u&3&&he(s,l[0])},i:V,o:V,d(l){l&&O(t),a&&a.d(),i=!1,F(c)}}}function Jt(e,t,n){let o;J(e,pe,l=>n(1,o=l)),(o==null||Object.keys(o).length==0)&&i();let{selected:s}=t;const r=$e();async function i(){const u=await(await fetch("https://api.toplogger.nu/v1/gyms/")).json();return pe.set(u),u}function c(){s=tt(this),n(0,s)}const a=()=>{_e.set(s),r("change",s)};return e.$$set=l=>{"selected"in l&&n(0,s=l.selected)},[s,o,r,c,a]}class Ut extends R{constructor(t){super(),H(this,t,Jt,qt,A,{selected:0})}}function Re(e,t,n){const o=e.slice();return o[5]=t[n],o}function We(e){let t,n=e[5].name+"",o,s;return{c(){t=k("option"),o=M(n),t.__value=s=e[5].value,t.value=t.__value},m(r,i){j(r,t,i),m(t,o)},p:V,d(r){r&&O(t)}}}function Zt(e){let t,n,o,s,r,i,c=e[2],a=[];for(let l=0;l<c.length;l+=1)a[l]=We(Re(e,c,l));return{c(){t=k("div"),n=k("label"),n.textContent="Grade system",o=B(),s=k("select");for(let l=0;l<a.length;l+=1)a[l].c();b(n,"class","mb-1 block font-bold"),b(n,"for","gradeSystem"),b(s,"class","px-2 py-0.5 border-2 rounded w-full"),b(s,"name",""),b(s,"id","gradeSystem"),e[0]===void 0&&D(()=>e[3].call(s)),b(t,"class","p-4")},m(l,u){j(l,t,u),m(t,n),m(t,o),m(t,s);for(let f=0;f<a.length;f+=1)a[f].m(s,null);he(s,e[0]),r||(i=[N(s,"change",e[3]),N(s,"change",e[4])],r=!0)},p(l,[u]){if(u&4){c=l[2];let f;for(f=0;f<c.length;f+=1){const d=Re(l,c,f);a[f]?a[f].p(d,u):(a[f]=We(d),a[f].c(),a[f].m(s,null))}for(;f<a.length;f+=1)a[f].d(1);a.length=c.length}u&5&&he(s,l[0])},i:V,o:V,d(l){l&&O(t),xe(a,l),r=!1,F(i)}}}function Kt(e,t,n){let o;const s=$e(),r=[{name:"Same as gym",value:void 0},{name:"UIAA",value:"uiaa"},{name:"YDS",value:"yds"},{name:"French",value:"french"},{name:"French boulder",value:"french_boulder"},{name:"French rounded",value:"french_rounded"},{name:"Ewbank",value:"ewbank"},{name:"British",value:"british"},{name:"V Grade",value:"v_grade"}];function i(){o=tt(this),n(0,o),n(2,r)}return[o,s,r,i,()=>{oe.set(o),s("change",o)}]}class Qt extends R{constructor(t){super(),H(this,t,Kt,Zt,A,{})}}function xt(e){let t,n,o,s,r,i,c,a,l,u,f,d,g;function w(h){e[4](h)}let S={};return e[1]!==void 0&&(S.selected=e[1]),c=new Ut({props:S}),le.push(()=>ft(c,"selected",w)),c.$on("change",e[5]),u=new Qt({}),u.$on("change",en),{c(){t=k("header"),n=k("label"),n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',o=B(),s=k("input"),r=B(),i=k("div"),U(c.$$.fragment),l=B(),U(u.$$.fragment),b(n,"for","menuToggle"),b(n,"class","z-20"),b(s,"type","checkbox"),b(s,"id","menuToggle"),b(s,"class","w-0 h-0 hidden"),b(i,"class","menu fixed top-0 left-0 h-screen w-80 pt-12 bg-white shadow-lg svelte-3241ld"),Ee(i,"open",e[0]),b(t,"class","fixed top-0 left-0 z-30 flex items-center px-4 py-2 bg-white shadow-lg svelte-3241ld")},m(h,p){j(h,t,p),m(t,n),m(t,o),m(t,s),s.checked=e[0],m(t,r),m(t,i),L(c,i,null),m(i,l),L(u,i,null),f=!0,d||(g=N(s,"change",e[3]),d=!0)},p(h,[p]){p&1&&(s.checked=h[0]);const _={};!a&&p&2&&(a=!0,_.selected=h[1],it(()=>a=!1)),c.$set(_),p&1&&Ee(i,"open",h[0])},i(h){f||($(c.$$.fragment,h),$(u.$$.fragment,h),f=!0)},o(h){P(c.$$.fragment,h),P(u.$$.fragment,h),f=!1},d(h){h&&O(t),G(c),G(u),d=!1,g()}}}const en=e=>{};function tn(e,t,n){let o,s;J(e,pe,d=>n(6,o=d)),J(e,_e,d=>n(7,s=d));const r=$e();let i=!1,c=o==null?void 0:o.findIndex(d=>(d==null?void 0:d.id)===(s==null?void 0:s.id)),a=c>-1?o[c]:{};function l(){i=this.checked,n(0,i)}function u(d){a=d,n(1,a)}return[i,a,r,l,u,d=>{r("changeGym",d.detail)}]}class nn extends R{constructor(t){super(),H(this,t,tn,xt,A,{})}}function sn(e){let t,n,o,s,r,i,c=`translate(${e[8]}px, ${e[9]}px) scale(${e[10]})`,a,l;return D(e[14]),{c(){t=k("div"),n=Q("svg"),o=Q("g"),s=Q("g"),r=Q("g"),i=Q("g"),b(r,"class","map"),b(r,"id","map"),b(i,"class","routes"),b(s,"class","map-scale"),b(o,"class","map-translate svelte-otwaa6"),de(o,"transform",c,!1),b(n,"width",e[12]),b(n,"height",e[11]),b(n,"class","svelte-otwaa6")},m(u,f){j(u,t,f),m(t,n),m(n,o),m(o,s),m(s,r),r.innerHTML=e[2],e[15](r),m(s,i),a||(l=N(window,"resize",e[14]),a=!0)},p(u,[f]){f&4&&(r.innerHTML=u[2]),f&1792&&c!==(c=`translate(${u[8]}px, ${u[9]}px) scale(${u[10]})`)&&de(o,"transform",c,!1),f&4096&&b(n,"width",u[12]),f&2048&&b(n,"height",u[11])},i:V,o:V,d(u){u&&O(t),e[15](null),a=!1,l()}}}function on(e,t,n){let o,s,r;J(e,oe,v=>n(13,r=v));let{climbs:i=[]}=t,{groups:c=[]}=t,{mapSvg:a}=t,l,u,f,d=0,g=0,w=0,S=0,h=1;async function p(){if(l){await lt();const v=l.getBBox(),E=s/v.height*.9;o/2-v.width/2*E,s/2-v.height/2*E,n(10,h=E),n(6,d=v.width),n(7,g=v.height),n(8,w=-v.x*h),n(9,S=-v.y*h)}}st(async()=>{if(l){const{width:v,height:E}=l.getBBox();n(6,d=v),n(7,g=E)}});function _(){n(11,s=window.innerHeight),n(12,o=window.innerWidth)}function y(v){le[v?"unshift":"push"](()=>{l=v,n(3,l)})}const I=v=>{n(4,u=v),n(5,f=!0)};return e.$$set=v=>{"climbs"in v&&n(0,i=v.climbs),"groups"in v&&n(1,c=v.groups),"mapSvg"in v&&n(2,a=v.mapSvg)},e.$$.update=()=>{e.$$.dirty&4&&p(),e.$$.dirty&4},n(12,o=0),n(11,s=0),[i,c,a,l,u,f,d,g,w,S,h,s,o,r,_,y,I]}class rn extends R{constructor(t){super(),H(this,t,on,sn,A,{climbs:0,groups:1,mapSvg:2})}}function ln(e){let t,n,o=`translate3d(${e[1]+e[3]}px, ${e[2]+e[4]}px, 0) scale(${e[5][e[0]]})`,s,r,i;const c=e[12].default,a=bt(c,e,e[11],null);return{c(){t=k("div"),n=k("div"),a&&a.c(),b(n,"class","content svelte-5d4fen"),de(n,"transform",o,!1),b(t,"class","wrapper svelte-5d4fen")},m(l,u){j(l,t,u),m(t,n),a&&a.m(n,null),s=!0,r||(i=[N(window,"pointerdown",e[6]),N(window,"pointermove",e[7]),N(window,"pointerup",e[8]),N(t,"mousewheel",e[9])],r=!0)},p(l,[u]){a&&a.p&&(!s||u&2048)&&wt(a,c,l,l[11],s?yt(c,l[11],u,null):vt(l[11]),null),u&31&&o!==(o=`translate3d(${l[1]+l[3]}px, ${l[2]+l[4]}px, 0) scale(${l[5][l[0]]})`)&&de(n,"transform",o,!1)},i(l){s||($(a,l),s=!0)},o(l){P(a,l),s=!1},d(l){l&&O(t),a&&a.d(l),r=!1,F(i)}}}function cn(e,t,n){let{$$slots:o={},$$scope:s}=t,{disabled:r=!1}=t,i=!1,c=1;const a=[10,5,3,2,1,.5,.1];let l=0,u=0,f=0,d=0,g=0,w=0;function S(y){r||(y.preventDefault(),y.stopPropagation(),i=!0,f=y.clientX,d=y.clientY,n(3,g=0),n(4,w=0),console.log("onPanningStart"))}function h(y){!i||(n(3,g=y.clientX-f),n(4,w=y.clientY-d))}function p(y){console.log("onPanningStop"),i=!1,n(1,l+=g),n(2,u+=w),n(3,g=0),n(4,w=0)}function _(y){n(0,c+=Math.sign(y.deltaY)),c<0&&n(0,c=0),c>=a.length&&n(0,c=a.length-1)}return e.$$set=y=>{"disabled"in y&&n(10,r=y.disabled),"$$scope"in y&&n(11,s=y.$$scope)},[c,l,u,g,w,a,S,h,p,_,r,s,o]}class an extends R{constructor(t){super(),H(this,t,cn,ln,A,{disabled:10})}}const{window:Ie}=Xt;function un(e){let t,n;return t=new rn({props:{climbs:e[4],groups:e[5],mapSvg:e[0]}}),{c(){U(t.$$.fragment)},m(o,s){L(t,o,s),n=!0},p(o,s){const r={};s&16&&(r.climbs=o[4]),s&32&&(r.groups=o[5]),s&1&&(r.mapSvg=o[0]),t.$set(r)},i(o){n||($(t.$$.fragment,o),n=!0)},o(o){P(t.$$.fragment,o),n=!1},d(o){G(t,o)}}}function Ye(e){let t,n;return t=new Yt({props:{data:e[6]}}),t.$on("click",e[13]),{c(){U(t.$$.fragment)},m(o,s){L(t,o,s),n=!0},p(o,s){const r={};s&64&&(r.data=o[6]),t.$set(r)},i(o){n||($(t.$$.fragment,o),n=!0)},o(o){P(t.$$.fragment,o),n=!1},d(o){G(t,o)}}}function fn(e){let t,n,o,s,r,i,c,a,l,u,f,d,g;D(e[10]);function w(p){e[11](p)}let S={};e[7]!==void 0&&(S.selected=e[7]),t=new nn({props:S}),le.push(()=>ft(t,"selected",w)),t.$on("changeGym",e[12]),c=new an({props:{$$slots:{default:[un]},$$scope:{ctx:e}}});let h=e[3]&&Ye(e);return{c(){U(t.$$.fragment),o=B(),s=k("main"),r=k("div"),i=B(),U(c.$$.fragment),a=B(),l=k("div"),u=B(),h&&h.c(),b(r,"class","svgContainer h-screen hidden svelte-1uvat6c")},m(p,_){L(t,p,_),j(p,o,_),j(p,s,_),m(s,r),r.innerHTML=e[0],m(s,i),L(c,s,null),m(s,a),m(s,l),m(s,u),h&&h.m(s,null),f=!0,d||(g=N(Ie,"resize",e[10]),d=!0)},p(p,[_]){const y={};!n&&_&128&&(n=!0,y.selected=p[7],it(()=>n=!1)),t.$set(y),(!f||_&1)&&(r.innerHTML=p[0]);const I={};_&4194353&&(I.$$scope={dirty:_,ctx:p}),c.$set(I),p[3]?h?(h.p(p,_),_&8&&$(h,1)):(h=Ye(p),h.c(),$(h,1),h.m(s,null)):h&&(at(),P(h,1,1,()=>{h=null}),ut())},i(p){f||($(t.$$.fragment,p),$(c.$$.fragment,p),$(h),f=!0)},o(p){P(t.$$.fragment,p),P(c.$$.fragment,p),P(h),f=!1},d(p){G(t,p),p&&O(o),p&&O(s),G(c),h&&h.d(),d=!1,g()}}}function dn(e,t,n){let o,s;J(e,_e,_=>n(8,o=_)),J(e,oe,_=>n(9,s=_));let r=!1,i=[],c="",a,l,u=o!=null&&o.id?o:{},f=window.innerWidth,d=window.innerHeight;async function g(){await lt(),document.querySelector("#map").getBoundingClientRect()}Et(()=>{}),oe.subscribe(_=>{}),st(async()=>{const _=o!=null&&o.id_name?o.id_name:"bruut_boulder_breda",y=o!=null&&o.id?o.id:8;n(4,[i,a,c]=await Fe(y,_),i,n(5,a),n(0,c));const v=new DOMParser().parseFromString(c,"text/html");n(0,c=v.querySelector("#zoom_layer").innerHTML);let E;function Z(){E=requestAnimationFrame(Z)}return Z(),()=>cancelAnimationFrame(E)});function w(){n(2,d=Ie.innerHeight),n(1,f=Ie.innerWidth)}function S(_){u=_,n(7,u)}const h=async _=>{const I=await(await fetch(`https://api.toplogger.nu/v1/gyms/${_.detail.slug}`)).json();kt(oe,s=I.grading_system_boulders||I.grading_system_routes,s),n(4,[i,a,c]=await Fe(o.id,o.id_name),i,n(5,a),n(0,c))},p=()=>{n(3,r=!1)};return e.$$.update=()=>{e.$$.dirty&2,e.$$.dirty&4,e.$$.dirty&1&&g(),e.$$.dirty&1&&c&&document.querySelector("#map svg")},[c,f,d,r,i,a,l,u,o,s,w,S,h,p]}class hn extends R{constructor(t){super(),H(this,t,dn,fn,A,{})}}new hn({target:document.body,props:{}});
