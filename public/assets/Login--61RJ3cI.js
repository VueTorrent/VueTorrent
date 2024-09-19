import{h as v,I as b,H as C,T as h,r as q,d as x,z as S,a as k,B as A,D as B,G as o,m as e,S as m,N as p,u,U as f,V as _,W as y}from"./vue-CHuSXKfF.js";import{_ as K}from"./PasswordField.vue_vue_type_script_setup_true_lang-D1riNgXI.js";import{x as T,y as U,z as D,A as E,B as F,C as I,a as N,V as $,D as z,i as M,E as O}from"./index-DS3rMHqs.js";import"./vuetify-CKqUSuVG.js";const j=v({__name:"Login",setup(R){const{t:s}=b(),V=C(),t=h(),i=T(),n=q({username:"",password:""}),c=x(!1),w={username:[r=>!!r||s("login.rules.username_required")],password:[r=>!!r||s("login.rules.password_required")]},d=async()=>{if(!c.value)return;const r=await i.login(n.username,n.password);if(i.isAuthenticated)y.success(s("login.success")),g();else{let a=s("login.error");r.status!==200&&(a+=`
Error code: ${r.status} (${r.data})`),y.error(a)}},g=()=>{t.query.redirect?V.push(t.query.redirect):V.push({name:"dashboard"})};return S(async()=>{t.query.username&&t.query.password&&await i.login(t.query.username,t.query.password)}),k(()=>{i.isAuthenticated&&g()}),(r,a)=>(A(),B(U,{class:"fill-height"},{default:o(()=>[e(O,{class:"mx-auto",rounded:"lg","min-width":"250"},{default:o(()=>[e(D,null,{default:o(()=>[m(p(u(s)("login.title")),1)]),_:1}),e(E,null,{default:o(()=>[m(p(u(s)("login.subtitle")),1)]),_:1}),e(F,null,{default:o(()=>[e(I,{modelValue:c.value,"onUpdate:modelValue":a[2]||(a[2]=l=>c.value=l),onSubmit:f(d,["prevent"])},{default:o(()=>[e(N,{modelValue:n.username,"onUpdate:modelValue":a[0]||(a[0]=l=>n.username=l),id:"username",name:"username",label:u(s)("login.username"),autofocus:"",rules:w.username,onKeydown:_(f(d,["prevent"]),["enter"]),variant:"outlined"},{prepend:o(()=>[e($,{color:"accent",icon:"mdi-account"})]),_:1},8,["modelValue","label","rules","onKeydown"]),e(K,{modelValue:n.password,"onUpdate:modelValue":a[1]||(a[1]=l=>n.password=l),id:"password",label:u(s)("login.password"),rules:w.password,"prepend-icon":"mdi-lock",onKeydown:_(f(d,["prevent"]),["enter"]),variant:"outlined"},null,8,["modelValue","label","rules","onKeydown"])]),_:1},8,["modelValue"])]),_:1}),e(z,null,{default:o(()=>[e(M,{variant:"elevated",block:"",color:"accent",onClick:d},{default:o(()=>[m(p(u(s)("login.submit")),1)]),_:1})]),_:1})]),_:1})]),_:1}))}});export{j as default};
