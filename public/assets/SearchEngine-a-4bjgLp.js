import{a0 as be,d as P,h as G,a as q,B as E,D as v,G as a,M as L,N as M,I as m,J as r,m as e,S,u as s,L as R,n as ke,O as Se,P as _e,Q as ee,H as Ve,q as we,F as O,T as Ee,K as Pe}from"./vue-DQy84xYo.js";import{$ as Ce,a0 as T,k as h,a as H,c as Te,u as fe,d as ae,e as Ne,j as B,l as le,f as te,g as De,V as K,i as se,a1 as j,v as xe,E as Ie,G as $e,F as Me,o as Ue,a2 as ne,a3 as qe,q as c,r as I,I as Le,a4 as Re,a5 as Be,s as ie,M as Qe,N as ze,t as oe,w as re,a6 as ue,a7 as ce,C as Ae,a8 as Fe,a9 as Oe}from"./index-C_raUS9F.js";import{a as me}from"./vuetify-BD3Y_TZC.js";const ge=be("searchEngine",()=>{const _=P([]),V=P([]);function k(){_.value.push({uniqueId:Ce(),id:0,lastQuery:"",query:"",itemsPerPage:10,filters:{title:"",category:"all",plugin:"enabled"},results:[],timer:null})}function l(n){_.value=_.value.filter(y=>y.uniqueId!==n)}async function d(n){const y=await T.startSearch(n.query,n.filters.category,[n.filters.plugin]);n.id=y.id,n.results=[],n.lastQuery=n.query}async function N(n){const y=await T.getSearchResults(n.id,n.results.length);return n.results.push(...y.results),y.status}async function w(n){n.id&&n.id!==0&&await T.stopSearch(n.id),n.id=0}async function f(){V.value=await T.getSearchPlugins()}async function g(n){await T.installSearchPlugin([n])}async function D(n){await T.uninstallSearchPlugin([n])}async function C(n){await T.enableSearchPlugin([n.name],!n.enabled)}async function x(){await T.updateSearchPlugins()}async function $(n,y){await T.downloadTorrentWithSearchPlugin(n,y)}return{searchData:_,searchPlugins:V,createNewTab:k,deleteTab:l,runNewSearch:d,refreshResults:N,stopSearch:w,fetchSearchPlugins:f,installSearchPlugin:g,uninstallSearchPlugin:D,toggleSearchPlugin:C,updatePlugins:x,downloadTorrent:$,$reset:()=>{_.value=[],V.value=[],k()}}},{persistence:{enabled:!0,storageItems:[{storage:sessionStorage}]}}),He={key:1,"data-testid":"mixedbtn-text"},de=G({__name:"MixedButton",props:{mobileOverride:{type:Boolean,default:!1},mobileValue:{type:Boolean},position:{},icon:{},text:{}},setup(_){const V=_,{mobile:k}=me(),l=q(()=>V.mobileOverride?V.mobileValue:k.value);return(d,N)=>(v(),E(h,{icon:l.value},{default:a(()=>[l.value||d.position==="left"?(v(),E(H,{key:0,"data-testid":"mixedbtn-icon-left"},{default:a(()=>[m(r(d.icon),1)]),_:1})):L("",!0),l.value?L("",!0):(v(),M("span",He,r(d.text),1)),!l.value&&d.position==="right"?(v(),E(H,{key:2,"data-testid":"mixedbtn-icon-right"},{default:a(()=>[m(r(d.icon),1)]),_:1})):L("",!0)]),_:1},8,["icon"]))}}),Ke=["href","title"],je=G({__name:"PluginManagerDialog",props:{guid:{}},setup(_){const V=_,{isOpened:k}=Te(V.guid),{t:l}=fe(),d=ge(),N=[{title:l("dialogs.pluginManager.headers.enabled"),key:"enabled",sortable:!1},{title:l("dialogs.pluginManager.headers.name"),key:"fullName"},{title:l("dialogs.pluginManager.headers.version"),key:"version"},{title:l("dialogs.pluginManager.headers.url"),key:"url"},{title:l("dialogs.pluginManager.headers.actions"),key:"actions"}],w=P(!1),f=P(!1),g=P(!1),D=P(!1),C=P("");async function x(i){await d.toggleSearchPlugin(i),await d.fetchSearchPlugins()}async function $(){f.value=!0,await d.updatePlugins().then(()=>new Promise(i=>setTimeout(i,2e3))),await d.fetchSearchPlugins(),f.value=!1}async function n(){U(),w.value=!0,await d.installSearchPlugin(C.value),C.value="",setTimeout(()=>{d.fetchSearchPlugins().then(()=>{w.value=!1})},1e3)}async function y(i){w.value=!0,await d.uninstallSearchPlugin(i.name),await d.fetchSearchPlugins(),w.value=!1}const Q=()=>{k.value=!1};function U(){g.value=!1}return(i,b)=>(v(),E(le,{modelValue:s(k),"onUpdate:modelValue":b[4]||(b[4]=u=>Se(k)?k.value=u:null)},{default:a(()=>[e(ae,null,{default:a(()=>[e(Ne,{class:"d-flex"},{default:a(()=>[S("div",null,r(i.$t("dialogs.pluginManager.title")),1),e(B),e(de,{icon:"mdi-update",text:i.$t("dialogs.pluginManager.update"),color:"accent",class:"mr-2",loading:f.value,onClick:$},null,8,["text","loading"]),e(le,{modelValue:g.value,"onUpdate:modelValue":b[3]||(b[3]=u=>g.value=u)},{activator:a(({props:u})=>[e(de,ke({icon:"mdi-toy-brick-plus",text:i.$t("dialogs.pluginManager.install.activator")},u,{color:"primary"}),null,16,["text"])]),default:a(()=>[e(ae,{title:i.$t("dialogs.pluginManager.install.title")},{default:a(()=>[e(te,null,{default:a(()=>[e(s(De),{modelValue:D.value,"onUpdate:modelValue":b[1]||(b[1]=u=>D.value=u),onSubmit:b[2]||(b[2]=R(()=>{},["prevent"]))},{default:a(()=>[e(K,{modelValue:C.value,"onUpdate:modelValue":b[0]||(b[0]=u=>C.value=u),autofocus:"",label:i.$t("dialogs.pluginManager.install.label")},null,8,["modelValue","label"])]),_:1},8,["modelValue"])]),_:1}),e(se,null,{default:a(()=>[e(B),e(h,{color:"error",onClick:U},{default:a(()=>[m(r(i.$t("common.cancel")),1)]),_:1}),e(h,{color:"accent",onClick:n},{default:a(()=>[m(r(i.$t("common.ok")),1)]),_:1})]),_:1})]),_:1},8,["title"])]),_:1},8,["modelValue"])]),_:1}),e(te,null,{default:a(()=>[e(j,{mobile:null,headers:N,"items-per-page":"-1",items:s(d).searchPlugins,"sort-by":[{key:"fullName",order:"asc"}],loading:w.value},{"item.enabled":a(({item:u})=>[e(xe,{"model-value":u.enabled,onClick:z=>x(u)},null,8,["model-value","onClick"])]),"item.url":a(({item:u})=>[S("a",{href:u.url,title:u.name},r(u.url),9,Ke)]),"item.actions":a(({item:u})=>[e(H,{color:"red",icon:"mdi-delete",onClick:z=>y(u)},null,8,["onClick"])]),_:2},1032,["items","loading"])]),_:1}),e(se,null,{default:a(()=>[e(B),e(h,{color:"accent",onClick:Q},{default:a(()=>[m(r(i.$t("common.close")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]))}}),Ge={class:"pa-3"},Je={style:{"font-size":"1.6em !important"},class:"subtitle-1 ml-2"},We={class:"d-flex justify-end"},Ye={class:"item-header-small"},Xe={class:"item-value-small"},Ze={class:"item-header-small"},ea={class:"item-value-small"},aa={class:"item-header-small"},la={class:"item-value-small"},ta=G({__name:"SearchEngine",setup(_){const{mobile:V}=me(),k=_e(),{t:l}=fe(),d=Ie(),N=$e(),w=Me(),f=ge(),{searchData:g}=ee(f),{useBinarySize:D,dateFormat:C}=ee(Ue()),x=P(),$=P(!1),n=P(0),y=q(()=>[{title:l("searchEngine.headers.fileName"),key:"fileName"},{title:l("searchEngine.headers.fileSize"),key:"fileSize"},{title:l("searchEngine.headers.nbSeeders"),key:"nbSeeders"},{title:l("searchEngine.headers.nbLeechers"),key:"nbLeechers"},...N.usesQbit5?[{title:l("searchEngine.headers.engineName"),key:"engineName"},{title:l("searchEngine.headers.pubDate"),key:"pubDate"}]:[{title:l("searchEngine.headers.siteUrl"),key:"siteUrl"}],{title:"",key:"actions",sortable:!1}]),Q=[{title:l("searchEngine.filters.category.movies"),value:"movies"},{title:l("searchEngine.filters.category.tv"),value:"tv"},{title:l("searchEngine.filters.category.music"),value:"music"},{title:l("searchEngine.filters.category.games"),value:"games"},{title:l("searchEngine.filters.category.anime"),value:"anime"},{title:l("searchEngine.filters.category.software"),value:"software"},{title:l("searchEngine.filters.category.pictures"),value:"pictures"},{title:l("searchEngine.filters.category.books"),value:"books"}].sort((o,p)=>ne.text.asc(o.title,p.title)).toSpliced(0,0,{title:l("searchEngine.filters.category.all"),value:"all"}),U=q(()=>[{title:l("searchEngine.filters.plugins.all"),value:"all"},{title:l("searchEngine.filters.plugins.enabled"),value:"enabled"},...f.searchPlugins.filter(o=>o.enabled).map(o=>o.name).sort(ne.text.asc).map(o=>({title:o,value:o}))]),i=q(()=>g.value[n.value]??{}),{results:b}=qe(()=>i.value.results,()=>i.value.filters?.title,o=>o.fileName);function u(){f.createNewTab(),n.value=g.value.length-1,x.value?.focus()}function z(){g.value.length!==1&&(f.deleteTab(i.value.uniqueId),n.value=Math.min(n.value,g.value.length-1))}function J(o){N.usesQbit5?f.downloadTorrent(o.fileUrl,o.engineName):d.pushTorrentToQueue(o.fileUrl),o.downloaded=!0}function W(o){Fe(o.descrLink)}async function Y(){await f.runNewSearch(i.value),i.value.timer=setInterval(()=>he(i.value),1e3),x.value?.saveValueToHistory()}async function A(o){await f.stopSearch(o),o.timer&&clearInterval(o.timer)}function pe(){g.value.forEach(A)}async function he(o){await f.refreshResults(o)==="Stopped"&&await A(o)}const X=()=>{k.push({name:"dashboard"})};function ve(){w.createDialog(je)}function Z(o){if(w.hasActiveDialog||$.value)return!1;o.key==="Escape"&&X()}return Ve(async()=>{document.addEventListener("keydown",Z),g.value.length===0?f.createNewTab():g.value.forEach(o=>{o.id&&o.id!==0&&(o.timer=setInterval(()=>f.refreshResults(o),1e3))}),await f.fetchSearchPlugins()}),we(()=>{document.removeEventListener("keydown",Z),g.value.forEach(o=>{o.timer&&clearInterval(o.timer)})}),(o,p)=>(v(),M("div",Ge,[e(I,{"no-gutters":"",align:"center",justify:"center"},{default:a(()=>[e(c,null,{default:a(()=>[S("h1",Je,r(s(l)("searchEngine.title")),1)]),_:1}),e(c,null,{default:a(()=>[S("div",We,[e(h,{icon:"mdi-stop",variant:"plain",color:"error",onClick:pe}),e(h,{icon:"mdi-toy-brick",variant:"plain",color:"primary",onClick:ve}),e(h,{icon:"mdi-close",variant:"plain",onClick:X})])]),_:1})]),_:1}),e(I,{class:"ma-0 pa-0"},{default:a(()=>[e(Le,{class:"d-flex align-center justify-center ma-0 pa-0 bg-primary",fluid:""},{default:a(()=>[e(Re,{modelValue:n.value,"onUpdate:modelValue":p[0]||(p[0]=t=>n.value=t),class:"overflow-auto","bg-color":"primary","show-arrows":""},{default:a(()=>[(v(!0),M(O,null,Ee(s(g),t=>(v(),E(Be,{key:t.uniqueId},{default:a(()=>[S("h4",null,r(!t.lastQuery||t.lastQuery.length===0?s(l)("searchEngine.tabHeaderEmpty"):t.lastQuery),1)]),_:2},1024))),128))]),_:1},8,["modelValue"]),e(B),e(h,{icon:"mdi-plus-circle-outline",variant:"plain",color:"accent",onClick:u}),e(h,{icon:"mdi-minus-circle-outline",variant:"plain",color:"error",disabled:s(g).length===1,onClick:z},null,8,["disabled"])]),_:1})]),_:1}),e(Ae,null,{default:a(()=>[e(ie,null,{default:a(()=>[e(I,{class:"mt-1"},{default:a(()=>[e(c,{cols:"12",md:"6"},{default:a(()=>[e(Qe,{modelValue:i.value.query,"onUpdate:modelValue":p[1]||(p[1]=t=>i.value.query=t),"history-key":s(ze).SEARCH_ENGINE_QUERY,ref_key:"queryInput",ref:x,autofocus:"",density:"compact","hide-details":"",clearable:"",label:s(l)("searchEngine.query"),onKeydown:Pe(R(Y,["prevent"]),["enter"])},null,8,["modelValue","history-key","label","onKeydown"])]),_:1}),e(c,{cols:"6",sm:"5",md:"2"},{default:a(()=>[e(oe,{modelValue:i.value.filters.category,"onUpdate:modelValue":p[2]||(p[2]=t=>i.value.filters.category=t),height:"1",variant:"outlined",density:"compact","hide-details":"",items:s(Q),label:s(l)("searchEngine.filters.category.label")},null,8,["modelValue","items","label"])]),_:1}),e(c,{cols:"6",sm:"5",md:"2"},{default:a(()=>[e(oe,{modelValue:i.value.filters.plugin,"onUpdate:modelValue":p[3]||(p[3]=t=>i.value.filters.plugin=t),flat:"",density:"compact","hide-details":"",variant:"outlined",items:U.value,label:s(l)("searchEngine.filters.plugins.label")},null,8,["modelValue","items","label"])]),_:1}),e(c,{cols:"12",sm:"2",class:"d-flex align-center justify-center"},{default:a(()=>[i.value.id===0?(v(),E(h,{key:0,color:"accent",flat:"",class:"mx-auto px-4",onClick:Y},{default:a(()=>[m(r(s(l)("searchEngine.runSearch")),1)]),_:1})):(v(),E(h,{key:1,color:"warning",flat:"",class:"mx-auto px-4",onClick:p[4]||(p[4]=t=>A(i.value))},{default:a(()=>[m(r(s(l)("searchEngine.stopSearch")),1)]),_:1}))]),_:1})]),_:1})]),_:1}),e(re,{class:"my-3"}),e(ie,{class:"text-select"},{default:a(()=>[s(V)?(v(),E(j,{key:0,mobile:!0,headers:y.value,items:s(b),"footer-props":{itemsPerPageOptions:[10,25,50,100,-1]},"items-per-page":i.value.itemsPerPage},{top:a(()=>[e(I,null,{default:a(()=>[e(c,{cols:"12"},{default:a(()=>[e(K,{modelValue:i.value.filters.title,"onUpdate:modelValue":p[5]||(p[5]=t=>i.value.filters.title=t),density:"compact","hide-details":"",label:s(l)("searchEngine.filters.title.label")},null,8,["modelValue","label"])]),_:1})]),_:1})]),item:a(({item:t,index:F})=>[F!==0?(v(),E(re,{key:0})):L("",!0),e(I,{class:"row-mobile ma-0 pa-3"},{default:a(()=>[e(c,{cols:"6",class:"item-header-large"},{default:a(()=>[m(r(s(l)("searchEngine.headers.fileName")),1)]),_:1}),e(c,{cols:"6",class:"item-value-large"},{default:a(()=>[m(r(t.fileName),1)]),_:2},1024),s(N).usesQbit5?(v(),M(O,{key:0},[e(c,{cols:"6",class:"item-header-large"},{default:a(()=>[m(r(s(l)("searchEngine.headers.engineName")),1)]),_:1}),e(c,{cols:"6",class:"item-value-large"},{default:a(()=>[m(r(t.engineName),1)]),_:2},1024),e(c,{cols:"6",class:"item-header-large"},{default:a(()=>[m(r(s(l)("searchEngine.headers.pubDate")),1)]),_:1}),e(c,{cols:"6",class:"item-value-large"},{default:a(()=>[m(r(t.pubDate===-1?s(l)("common.NA"):s(ue)(t.pubDate,s(C))),1)]),_:2},1024)],64)):(v(),M(O,{key:1},[e(c,{cols:"6",class:"item-header-large"},{default:a(()=>[m(r(s(l)("searchEngine.headers.siteUrl")),1)]),_:1}),e(c,{cols:"6",class:"item-value-large"},{default:a(()=>[m(r(t.siteUrl),1)]),_:2},1024)],64)),e(c,{cols:"3",class:"item-container"},{default:a(()=>[S("div",Ye,r(s(l)("searchEngine.headers.fileSize")),1),S("div",Xe,r(s(ce)(t.fileSize,s(D))),1)]),_:2},1024),e(c,{cols:"3",class:"item-container"},{default:a(()=>[S("div",Ze,r(s(l)("searchEngine.headers.nbSeeders")),1),S("div",ea,r(t.nbSeeders),1)]),_:2},1024),e(c,{cols:"3",class:"item-container"},{default:a(()=>[S("div",aa,r(s(l)("searchEngine.headers.nbLeechers")),1),S("div",la,r(t.nbLeechers),1)]),_:2},1024),e(c,{cols:"3",class:"item-actions"},{default:a(()=>[e(h,{icon:"mdi-open-in-new",variant:"flat",density:"compact",onClick:R(ye=>W(t),["stop"])},null,8,["onClick"]),e(h,{icon:t.downloaded?"mdi-check":"mdi-download",color:t.downloaded&&"accent",variant:"text",density:"compact",onClick:ye=>J(t)},null,8,["icon","color","onClick"])]),_:2},1024)]),_:2},1024)]),_:1},8,["headers","items","items-per-page"])):(v(),E(j,{key:1,mobile:!1,headers:y.value,items:s(b),"footer-props":{itemsPerPageOptions:[10,25,50,100,-1]},"items-per-page":i.value.itemsPerPage},{top:a(()=>[e(I,null,{default:a(()=>[e(c,{cols:"12"},{default:a(()=>[e(K,{modelValue:i.value.filters.title,"onUpdate:modelValue":p[6]||(p[6]=t=>i.value.filters.title=t),density:"compact","hide-details":"",label:s(l)("searchEngine.filters.title.label")},null,8,["modelValue","label"])]),_:1})]),_:1})]),"item.fileSize":a(({item:t})=>[m(r(s(ce)(t.fileSize,s(D))),1)]),"item.pubDate":a(({value:t})=>[m(r(t===-1?s(l)("common.NA"):s(ue)(t,s(C))),1)]),"item.actions":a(({item:t})=>[e(h,{icon:"mdi-open-in-new",variant:"flat",density:"compact",onClick:R(F=>W(t),["stop"])},null,8,["onClick"]),e(h,{icon:t.downloaded?"mdi-check":"mdi-download",color:t.downloaded&&"accent",variant:"text",density:"compact",onClick:F=>J(t)},null,8,["icon","color","onClick"])]),_:2},1032,["headers","items","items-per-page"]))]),_:1})]),_:1})]))}}),oa=Oe(ta,[["__scopeId","data-v-62d82f7b"]]);export{oa as default};
