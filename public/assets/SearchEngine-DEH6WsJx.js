import{h as z,a as L,H as y,I as _,J as l,K as S,L as g,Y as R,E as J,f as V,n as e,W as $,q as oe,u as v,M as H,P as re,a3 as ue,G as ce,v as de,S as fe,F as me,Z as ge,O as pe}from"./vue-Dk8yKSDY.js";import{k as X,i as f,a as ve,W as ee,V as j,c as he,h as D,j as F,d as G,e as ye,f as le,g as Q,X as ae,A as Ve,l as be,m as ke,G as Ee,I as Se,s as M,C as we,t as E,o as _e,Y as Ce,Z as $e,D as Y,v as Pe,H as Te,w as W,E as Ie,$ as Me,__tla as __tla_0}from"./index-D_WwxEqr.js";import{u as De}from"./vuetify-crsROEFU.js";let Ae;let __tla=Promise.all([(()=>{try{return __tla_0}catch{}})()]).then(async()=>{let Ne,Z,Ue,xe,Be,qe,Le;Ne={key:1,"data-testid":"mixedbtn-text"};Z=z({__name:"MixedButton",props:{mobileOverride:{type:Boolean,default:!1},mobileValue:{type:Boolean},icon:{},text:{}},setup(P){const w=P,{mobile:t}=De(),p=L(()=>w.mobileOverride?w.mobileValue:t.value);return(u,d)=>(y(),_(f,{icon:p.value},{default:l(()=>[p.value?(y(),_(X,{key:0,"data-testid":"mixedbtn-icon"},{default:l(()=>[S(g(u.icon),1)]),_:1})):(y(),R("span",Ne,g(u.text),1))]),_:1},8,["icon"]))}});Ue=["href","title"];xe=z({__name:"PluginManagerDialog",props:{guid:{}},setup(P){const w=P,{isOpened:t}=ve(w.guid),{t:p}=J(),u=ee(),d=[{title:p("dialogs.pluginManager.headers.enabled"),key:"enabled",sortable:!1},{title:p("dialogs.pluginManager.headers.name"),key:"fullName"},{title:p("dialogs.pluginManager.headers.version"),key:"version"},{title:p("dialogs.pluginManager.headers.url"),key:"url"},{title:p("dialogs.pluginManager.headers.actions"),key:"actions"}],b=V(!1),k=V(!1),C=V(!1),h=V(!1),c=V("");async function N(r){await u.toggleSearchPlugin(r),await u.fetchSearchPlugins()}async function T(){k.value=!0,await u.updatePlugins().then(()=>new Promise(r=>setTimeout(r,2e3))),await u.fetchSearchPlugins(),k.value=!1}async function U(){I(),b.value=!0,await u.installSearchPlugin(c.value),c.value="",setTimeout(()=>{u.fetchSearchPlugins().then(()=>{b.value=!1})},1e3)}async function x(r){b.value=!0,await u.uninstallSearchPlugin(r.name),await u.fetchSearchPlugins(),b.value=!1}const s=()=>{t.value=!1};function I(){C.value=!1}return(r,m)=>(y(),_(F,{modelValue:v(t),"onUpdate:modelValue":m[4]||(m[4]=n=>re(t)?t.value=n:null)},{default:l(()=>[e(j,null,{default:l(()=>[e(he,{class:"d-flex"},{default:l(()=>[$("div",null,g(r.$t("dialogs.pluginManager.title")),1),e(D),e(Z,{icon:"mdi-update",text:r.$t("dialogs.pluginManager.update"),color:"accent",class:"mr-2",loading:k.value,onClick:T},null,8,["text","loading"]),e(F,{modelValue:C.value,"onUpdate:modelValue":m[3]||(m[3]=n=>C.value=n)},{activator:l(({props:n})=>[e(Z,oe({icon:"mdi-toy-brick-plus",text:r.$t("dialogs.pluginManager.install.activator")},n,{color:"primary"}),null,16,["text"])]),default:l(()=>[e(j,{title:r.$t("dialogs.pluginManager.install.title")},{default:l(()=>[e(G,null,{default:l(()=>[e(v(ye),{modelValue:h.value,"onUpdate:modelValue":m[1]||(m[1]=n=>h.value=n),onSubmit:m[2]||(m[2]=H(()=>{},["prevent"]))},{default:l(()=>[e(le,{modelValue:c.value,"onUpdate:modelValue":m[0]||(m[0]=n=>c.value=n),autofocus:"",label:r.$t("dialogs.pluginManager.install.label")},null,8,["modelValue","label"])]),_:1},8,["modelValue"])]),_:1}),e(Q,null,{default:l(()=>[e(D),e(f,{color:"error",onClick:I},{default:l(()=>[S(g(r.$t("common.cancel")),1)]),_:1}),e(f,{color:"accent",onClick:U},{default:l(()=>[S(g(r.$t("common.ok")),1)]),_:1})]),_:1})]),_:1},8,["title"])]),_:1},8,["modelValue"])]),_:1}),e(G,null,{default:l(()=>[e(ae,{mobile:null,headers:d,"items-per-page":"-1",items:v(u).searchPlugins,"sort-by":[{key:"fullName",order:"asc"}],loading:b.value},{"item.enabled":l(({item:n})=>[e(Ve,{"model-value":n.enabled,onClick:B=>N(n)},null,8,["model-value","onClick"])]),"item.url":l(({item:n})=>[$("a",{href:n.url,title:n.name},g(n.url),9,Ue)]),"item.actions":l(({item:n})=>[e(X,{color:"red",icon:"mdi-delete",onClick:B=>x(n)},null,8,["onClick"])]),_:2},1032,["items","loading"])]),_:1}),e(Q,null,{default:l(()=>[e(D),e(f,{color:"accent",onClick:s},{default:l(()=>[S(g(r.$t("common.close")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]))}});Be={class:"pa-3"};qe={style:{"font-size":"1.6em !important"},class:"subtitle-1 ml-2"};Le={class:"d-flex justify-end"};Ae=z({__name:"SearchEngine",setup(P){const w=fe(),{t}=J(),p=be(),u=ke(),d=ee(),b=Ee(),k=V(),C=V(!1),h=V(0),{searchData:c}=ue(d),N=[{title:t("searchEngine.headers.fileName"),key:"fileName"},{title:t("searchEngine.headers.fileSize"),key:"fileSize"},{title:t("searchEngine.headers.nbSeeders"),key:"nbSeeders"},{title:t("searchEngine.headers.nbLeechers"),key:"nbLeechers"},{title:t("searchEngine.headers.siteUrl"),key:"siteUrl"},{title:"",key:"actions",sortable:!1}],T=[{title:t("searchEngine.filters.category.movies"),value:"movies"},{title:t("searchEngine.filters.category.tv"),value:"tv"},{title:t("searchEngine.filters.category.music"),value:"music"},{title:t("searchEngine.filters.category.games"),value:"games"},{title:t("searchEngine.filters.category.anime"),value:"anime"},{title:t("searchEngine.filters.category.software"),value:"software"},{title:t("searchEngine.filters.category.pictures"),value:"pictures"},{title:t("searchEngine.filters.category.books"),value:"books"}];T.sort((a,o)=>a.title.localeCompare(o.title));const U=[{title:t("searchEngine.filters.category.all"),value:"all"},...T],x=L(()=>{const a=[{title:t("searchEngine.filters.plugins.all"),value:"all"},{title:t("searchEngine.filters.plugins.enabled"),value:"enabled"}];return d.searchPlugins.filter(o=>o.enabled).forEach(o=>{a.push({title:o.name,value:o.name})}),a}),s=L(()=>c.value[h.value]??{}),{results:I}=Se(()=>s.value.results,()=>s.value.filters?.title,a=>a.fileName);function r(){d.createNewTab(),h.value=c.value.length-1,k.value?.focus()}function m(){c.value.length!==1&&(d.deleteTab(s.value.uniqueId),h.value=Math.min(h.value,c.value.length-1))}function n(a){p.pushTorrentToQueue(a.fileUrl)}function B(a){window.open(a.descrLink,"_blank","noreferrer")}async function A(){await d.runNewSearch(s.value),s.value.timer=setInterval(()=>ne(s.value),1e3),k.value?.saveValueToHistory()}async function q(a){await d.stopSearch(a),a.timer&&clearInterval(a.timer)}function te(){c.value.forEach(q)}async function ne(a){await d.refreshResults(a)==="Stopped"&&await q(a)}const K=()=>{w.push({name:"dashboard"})};function ie(){u.createDialog(xe)}function O(a){if(u.hasActiveDialog||C.value)return!1;a.key==="Escape"&&K()}return ce(async()=>{document.addEventListener("keydown",O),c.value.length===0?d.createNewTab():c.value.forEach(a=>{a.id&&a.id!==0&&(a.timer=setInterval(()=>d.refreshResults(a),1e3))}),await d.fetchSearchPlugins()}),de(()=>{document.removeEventListener("keydown",O),c.value.forEach(a=>{a.timer&&clearInterval(a.timer)})}),(a,o)=>(y(),R("div",Be,[e(M,{"no-gutters":"",align:"center",justify:"center"},{default:l(()=>[e(E,null,{default:l(()=>[$("h1",qe,g(v(t)("searchEngine.title")),1)]),_:1}),e(E,null,{default:l(()=>[$("div",Le,[e(f,{icon:"mdi-stop",variant:"plain",color:"error",onClick:te}),e(f,{icon:"mdi-toy-brick",variant:"plain",color:"primary",onClick:ie}),e(f,{icon:"mdi-close",variant:"plain",onClick:K})])]),_:1})]),_:1}),e(M,{class:"ma-0 pa-0"},{default:l(()=>[e(_e,{class:"d-flex align-center justify-center ma-0 pa-0 bg-primary",fluid:""},{default:l(()=>[e(Ce,{modelValue:h.value,"onUpdate:modelValue":o[0]||(o[0]=i=>h.value=i),class:"overflow-auto","bg-color":"primary","show-arrows":""},{default:l(()=>[(y(!0),R(me,null,ge(v(c),i=>(y(),_($e,{key:i.uniqueId},{default:l(()=>[$("h4",null,g(!i.query||i.query.length===0?a.$t("searchEngine.tabHeaderEmpty"):i.query),1)]),_:2},1024))),128))]),_:1},8,["modelValue"]),e(D),e(f,{icon:"mdi-plus-circle-outline",variant:"plain",color:"accent",onClick:r}),e(f,{icon:"mdi-minus-circle-outline",variant:"plain",color:"error",disabled:v(c).length===1,onClick:m},null,8,["disabled"])]),_:1})]),_:1}),e(we,null,{default:l(()=>[e(Y,null,{default:l(()=>[e(M,{class:"mt-1"},{default:l(()=>[e(E,{cols:"12",md:"6"},{default:l(()=>[e(Pe,{modelValue:s.value.query,"onUpdate:modelValue":o[1]||(o[1]=i=>s.value.query=i),"history-key":v(Te).SEARCH_ENGINE_QUERY,ref_key:"queryInput",ref:k,autofocus:"",density:"compact","hide-details":"",clearable:"",label:a.$t("searchEngine.query"),onKeydown:pe(H(A,["prevent"]),["enter"])},null,8,["modelValue","history-key","label","onKeydown"])]),_:1}),e(E,{cols:"6",sm:"5",md:"2"},{default:l(()=>[e(W,{modelValue:s.value.filters.category,"onUpdate:modelValue":o[2]||(o[2]=i=>s.value.filters.category=i),height:"1",variant:"outlined",density:"compact","hide-details":"",items:U,label:a.$t("searchEngine.filters.category.label")},null,8,["modelValue","label"])]),_:1}),e(E,{cols:"6",sm:"5",md:"2"},{default:l(()=>[e(W,{modelValue:s.value.filters.plugin,"onUpdate:modelValue":o[3]||(o[3]=i=>s.value.filters.plugin=i),flat:"",density:"compact","hide-details":"",variant:"outlined",items:x.value,label:a.$t("searchEngine.filters.plugins.label")},null,8,["modelValue","items","label"])]),_:1}),e(E,{cols:"12",sm:"2",class:"d-flex align-center justify-center"},{default:l(()=>[s.value.id===0?(y(),_(f,{key:0,color:"accent",flat:"",class:"mx-auto px-4",onClick:A},{default:l(()=>[S(g(a.$t("searchEngine.runSearch")),1)]),_:1})):(y(),_(f,{key:1,color:"warning",flat:"",class:"mx-auto px-4",onClick:o[4]||(o[4]=i=>q(s.value))},{default:l(()=>[S(g(a.$t("searchEngine.stopSearch")),1)]),_:1}))]),_:1})]),_:1})]),_:1}),e(Ie,{class:"my-3"}),e(Y,{class:"text-select"},{default:l(()=>[e(ae,{mobile:null,headers:N,items:v(I),"footer-props":{itemsPerPageOptions:[10,25,50,100,-1]},"items-per-page":s.value.itemsPerPage},{top:l(()=>[e(M,null,{default:l(()=>[e(E,{cols:"12"},{default:l(()=>[e(le,{modelValue:s.value.filters.title,"onUpdate:modelValue":o[5]||(o[5]=i=>s.value.filters.title=i),density:"compact","hide-details":"",label:a.$t("searchEngine.filters.title.label")},null,8,["modelValue","label"])]),_:1})]),_:1})]),"item.fileSize":l(({item:i})=>[S(g(v(Me)(i.fileSize,v(b).useBinarySize)),1)]),"item.actions":l(({item:i})=>[e(f,{icon:"mdi-open-in-new",variant:"flat",density:"compact",onClick:H(se=>B(i),["stop"])},null,8,["onClick"]),e(f,{icon:"mdi-download",variant:"flat",density:"compact",onClick:se=>n(i)},null,8,["onClick"])]),_:2},1032,["items","items-per-page"])]),_:1})]),_:1})]))}})});export{Ae as default,__tla};