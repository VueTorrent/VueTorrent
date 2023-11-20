import{u as K}from"./ArrayPagination-327b4d5e.js";import{at as H,u as X,au as t,ad as Y,B as b,o as Z,C as f,w as q,p as d,X as S,E as J,Z as p,M as F,ar as Q,as as ee,_ as te}from"./index-9539c5a1.js";import"./faker-c43f92d4.js";import{e as le,$ as ae,K as se,b as v,c as y,M as oe,I as ne,a1 as i,a5 as I,k as e,a3 as a,aa as O,Y as m,u as n,a2 as _,B as w,a7 as V,F as x,a6 as ue,a4 as ie,W as C}from"./vue-15fc29be.js";import{d as re}from"./dayjs.min-26db5b34.js";import"./vuetify-47497518.js";const de={class:"pa-3"},me={style:{"font-size":"1.6em !important"},class:"subtitle-1 ml-2"},ce={class:"d-flex justify-end"},pe=le({__name:"Logs",setup(ge){const M=ae(),{t:c}=se(),L=H(),$=X(),E=v([{title:c("logs.filters.sortBy.id"),value:"id"},{title:c("logs.filters.sortBy.type"),value:"type"},{title:c("logs.filters.sortBy.message"),value:"message"},{title:c("logs.filters.sortBy.timestamp"),value:"timestamp"}]),h=v([{title:t[t.NORMAL],value:t.NORMAL},{title:t[t.INFO],value:t.INFO},{title:t[t.WARNING],value:t.WARNING},{title:t[t.CRITICAL],value:t.CRITICAL}]),u=v([t.NORMAL,t.INFO,t.WARNING,t.CRITICAL]),N=v(["id"]),U=y(()=>L.logs),k=y(()=>U.value.filter(l=>u.value.includes(l.type))),B=y(()=>u.value.length>0),T=y(()=>u.value.length===h.value.length),{paginatedResults:W,currentPage:r,pageCount:g}=K(k,30),R=()=>{M.push({name:"dashboard"})},j=l=>`logtype-${t[l?.type]?.toLowerCase()}`,G=l=>t[l.type],P=l=>re(l.timestamp*1e3).format($.dateFormat),z=()=>{T.value?u.value=[]:u.value=h.value.map(l=>l.value)},A=l=>{l.key==="Escape"&&R()};return oe(()=>{document.addEventListener("keydown",A),Y(L.fetchLogs,15e3),L.fetchLogs(-1)}),ne(()=>{document.removeEventListener("keydown",A)}),(l,o)=>(i(),I("div",de,[e(b,{"no-gutters":"",align:"center",justify:"center"},{default:a(()=>[e(f,null,{default:a(()=>[O("h1",me,m(n(c)("logs.title")),1)]),_:1}),e(f,null,{default:a(()=>[O("div",ce,[e(q,{icon:"mdi-close",variant:"plain",onClick:R})])]),_:1})]),_:1}),e(Z,null,{default:a(()=>[e(d,null,{default:a(()=>[e(b,null,{default:a(()=>[e(f,{cols:"6"},{default:a(()=>[e(S,{modelValue:u.value,"onUpdate:modelValue":o[0]||(o[0]=s=>u.value=s),items:h.value,label:l.$t("logs.filters.type"),"hide-details":"",multiple:"",chips:""},{"prepend-item":a(()=>[e(d,{title:l.$t("common.selectAll"),onClick:z},{prepend:a(()=>[e(J,{indeterminate:B.value&&!T.value,"model-value":B.value},null,8,["indeterminate","model-value"])]),_:1},8,["title"]),e(p)]),_:1},8,["modelValue","items","label"])]),_:1}),e(f,{cols:"6"},{default:a(()=>[e(S,{modelValue:N.value,"onUpdate:modelValue":o[1]||(o[1]=s=>N.value=s),items:E.value,label:l.$t("logs.filters.sortBy.label"),"hide-details":"",multiple:"",chips:""},null,8,["modelValue","items","label"])]),_:1})]),_:1})]),_:1}),e(p,{class:"my-3",thickness:"5"}),n(g)>1?(i(),_(d,{key:0},{default:a(()=>[e(F,{modelValue:n(r),"onUpdate:modelValue":o[2]||(o[2]=s=>w(r)?r.value=s:null),length:n(g),"prev-icon":"mdi-menu-left","next-icon":"mdi-menu-right"},null,8,["modelValue","length"])]),_:1})):V("",!0),e(p),(i(!0),I(x,null,ue(n(W),(s,D)=>(i(),I(x,null,[D>0?(i(),_(p,{key:0})):V("",!0),e(d,{class:ie(j(s))},{default:a(()=>[e(Q,null,{default:a(()=>[C(m(s.id)+") "+m(s.message),1)]),_:2},1024),e(ee,null,{default:a(()=>[C(m(G(s))+" | "+m(P(s)),1)]),_:2},1024)]),_:2},1032,["class"])],64))),256)),k.value.length===0?(i(),_(d,{key:1},{default:a(()=>[C(m(l.$t("logs.emptyLogList")),1)]),_:1})):V("",!0),e(p),n(g)>1?(i(),_(d,{key:2},{default:a(()=>[e(F,{modelValue:n(r),"onUpdate:modelValue":o[3]||(o[3]=s=>w(r)?r.value=s:null),length:n(g),"prev-icon":"mdi-menu-left","next-icon":"mdi-menu-right"},null,8,["modelValue","length"])]),_:1})):V("",!0)]),_:1})]))}});const he=te(pe,[["__scopeId","data-v-8cd78aed"]]);export{he as default};