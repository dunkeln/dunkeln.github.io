function m(){}function w(t,n){for(const e in n)t[e]=n[e];return t}function j(t){return t()}function A(){return Object.create(null)}function E(t){t.forEach(j)}function q(t){return typeof t=="function"}function B(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let i;function F(t,n){return t===n?!0:(i||(i=document.createElement("a")),i.href=n,t===i.href)}function P(t){return Object.keys(t).length===0}function v(t,...n){if(t==null){for(const r of n)r(void 0);return m}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function S(t,n,e){t.$$.on_destroy.push(v(n,e))}function U(t,n,e,r){if(t){const o=x(t,n,e,r);return t[0](o)}}function x(t,n,e,r){return t[1]&&r?w(e.ctx.slice(),t[1](r(n))):e.ctx}function D(t,n,e,r){if(t[2]&&r){const o=t[2](r(e));if(n.dirty===void 0)return o;if(typeof o=="object"){const a=[],d=Math.max(n.dirty.length,o.length);for(let s=0;s<d;s+=1)a[s]=n.dirty[s]|o[s];return a}return n.dirty|o}return n.dirty}function G(t,n,e,r,o,a){if(o){const d=x(n,e,r,a);t.p(d,o)}}function H(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let r=0;r<e;r++)n[r]=-1;return n}return-1}function I(t){const n={};for(const e in t)n[e]=!0;return n}function J(t){return t??""}function K(t){return t&&q(t.destroy)?t.destroy:m}let f;function h(t){f=t}function _(){if(!f)throw new Error("Function called outside component initialization");return f}function L(t){_().$$.on_mount.push(t)}function N(t){_().$$.after_update.push(t)}function Q(t,n){return _().$$.context.set(t,n),n}function R(t){return _().$$.context.get(t)}const l=[],b=[];let c=[];const y=[],k=Promise.resolve();let g=!1;function C(){g||(g=!0,k.then(z))}function T(){return C(),k}function O(t){c.push(t)}const p=new Set;let u=0;function z(){if(u!==0)return;const t=f;do{try{for(;u<l.length;){const n=l[u];u++,h(n),M(n.$$)}}catch(n){throw l.length=0,u=0,n}for(h(null),l.length=0,u=0;b.length;)b.pop()();for(let n=0;n<c.length;n+=1){const e=c[n];p.has(e)||(p.add(e),e())}c.length=0}while(l.length);for(;y.length;)y.pop()();g=!1,p.clear(),h(t)}function M(t){if(t.fragment!==null){t.update(),E(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(O)}}function V(t){const n=[],e=[];c.forEach(r=>t.indexOf(r)===-1?n.push(r):e.push(r)),e.forEach(r=>r()),c=n}export{I as A,R as B,F as C,U as a,D as b,S as c,K as d,N as e,b as f,H as g,A as h,z as i,q as j,P as k,O as l,V as m,m as n,L as o,f as p,h as q,E as r,B as s,T as t,G as u,j as v,l as w,C as x,Q as y,J as z};
