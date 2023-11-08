import{d as v,_ as b,a6 as x,r as q,e as C,x as k,$ as S,a0 as h,a1 as s,j as e,V as c,Z as p,u as l,Y as f,ai as _}from"./vue-cd4a4a73.js";import{_ as K}from"./PasswordField.vue_vue_type_script_setup_true_lang-605d85ee.js";import{s as A,aO as T,aP as B,i as F,aI as I,j as O,t as U,v as j,m as L,w as M,x as N,k as R,ag as y}from"./index-952c55ec.js";import"./faker-e2f6ff92.js";import"./vuetify-102fadec.js";const E=v({__name:"Login",setup($){const{t:a}=A(),V=b(),o=x(),u=T(),r=q({username:"",password:""}),m=C(!1),w={username:[d=>!!d||a("login.rules.username_required")],password:[d=>!!d||a("login.rules.password_required")]},i=async()=>{m.value&&(await u.login(r.username,r.password),u.isAuthenticated?(y.success(a("login.success")),g()):y.error(a("login.error")))},g=()=>{o.query.redirect?V.push(o.query.redirect):V.push({name:"dashboard"})};return k(async()=>{o.query.username&&o.query.password&&await u.login(o.query.username,o.query.password),u.isAuthenticated&&g()}),(d,t)=>(S(),h(B,{class:"mt-16"},{default:s(()=>[e(R,{class:"mx-auto",rounded:"lg","min-width":"250"},{default:s(()=>[e(F,null,{default:s(()=>[c(p(l(a)("login.title")),1)]),_:1}),e(I,null,{default:s(()=>[c(p(l(a)("login.subtitle")),1)]),_:1}),e(O,null,{default:s(()=>[e(U,{modelValue:m.value,"onUpdate:modelValue":t[2]||(t[2]=n=>m.value=n),onSubmit:f(i,["prevent"])},{default:s(()=>[e(j,{modelValue:r.username,"onUpdate:modelValue":t[0]||(t[0]=n=>r.username=n),label:l(a)("login.username"),autofocus:"",rules:w.username,onKeydown:_(f(i,["prevent"]),["enter"]),variant:"outlined"},{prepend:s(()=>[e(L,{color:"accent",icon:"mdi-account"})]),_:1},8,["modelValue","label","rules","onKeydown"]),e(K,{modelValue:r.password,"onUpdate:modelValue":t[1]||(t[1]=n=>r.password=n),label:l(a)("login.password"),rules:w.password,"prepend-icon":"mdi-lock",onKeydown:_(f(i,["prevent"]),["enter"]),variant:"outlined"},null,8,["modelValue","label","rules","onKeydown"])]),_:1},8,["modelValue","onSubmit"])]),_:1}),e(M,null,{default:s(()=>[e(N,{variant:"elevated",block:"",color:"accent",onClick:i},{default:s(()=>[c(p(l(a)("login.submit")),1)]),_:1})]),_:1})]),_:1})]),_:1}))}});export{E as default};