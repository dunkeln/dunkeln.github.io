import{s as E,n as b,b as S}from"../chunks/scheduler.zMJaRgub.js";import{S as x,i as q,e as _,t as f,s as y,b as d,h as g,c as h,d as p,f as C,a as u,l as v,m as $}from"../chunks/index.6YnhRHC-.js";import{s as H}from"../chunks/entry.voPSeoXj.js";const P=()=>{const s=H;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},j={subscribe(s){return P().page.subscribe(s)}};function k(s){let t,r=s[0].status+"",o,n,i,c=s[0].error?.message+"",l;return{c(){t=_("h1"),o=f(r),n=y(),i=_("p"),l=f(c)},l(e){t=d(e,"H1",{});var a=g(t);o=h(a,r),a.forEach(p),n=C(e),i=d(e,"P",{});var m=g(i);l=h(m,c),m.forEach(p)},m(e,a){u(e,t,a),v(t,o),u(e,n,a),u(e,i,a),v(i,l)},p(e,[a]){a&1&&r!==(r=e[0].status+"")&&$(o,r),a&1&&c!==(c=e[0].error?.message+"")&&$(l,c)},i:b,o:b,d(e){e&&(p(t),p(n),p(i))}}}function w(s,t,r){let o;return S(s,j,n=>r(0,o=n)),[o]}let D=class extends x{constructor(t){super(),q(this,t,w,k,E,{})}};export{D as component};