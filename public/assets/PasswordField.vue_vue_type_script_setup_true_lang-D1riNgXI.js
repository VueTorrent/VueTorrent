import{V as c,a as r}from"./index-DS3rMHqs.js";import{h as t,d,c as o,B as i,D as l,E as m,G as u,m as f}from"./vue-CHuSXKfF.js";const I=t({__name:"PasswordField",props:{hideIcon:{type:Boolean},prependIcon:{}},setup(h){const e=d(!1);function a(){e.value=!e.value}const p=o(()=>e.value?"text":"password"),s=o(()=>e.value?"mdi-eye":"mdi-eye-off");return(n,v)=>(i(),l(r,{name:"password",type:p.value,"append-inner-icon":n.hideIcon?"":s.value,"onClick:appendInner":a},m({_:2},[n.prependIcon?{name:"prepend",fn:u(()=>[f(c,{color:"accent",icon:n.prependIcon},null,8,["icon"])]),key:"0"}:void 0]),1032,["type","append-inner-icon"]))}});export{I as _};
