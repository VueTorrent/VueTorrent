import{j as H,c as x,H as h,I as w,J as l,K as b,L as m,N as L,T as K,E as ee,f as V,n as e,U as $,q as re,u as v,M as j,P as ue,R as ce,$ as de,G as fe,v as me,F as ge,V as pe,O as ve}from"./vue-B7Jz8nba.js";import{k as z,h as f,a as he,R as le,i as G,V as ye,g as I,j as Q,c as J,d as Ve,e as ae,f as W,S as te,v as be,D as ke,E as Ee,m as Se,n as we,p as N,q as Ce,r as S,G as _e,U as $e,W as Te,s as X,K as Pe,M as Me,t as Y,w as Ne,X as Ie,__tla as __tla_0}from"./index-CK4vKthl.js";import{a as De}from"./vuetify-D4fbZ119.js";let He;let __tla=Promise.all([(()=>{try{return __tla_0}catch{}})()]).then(async()=>{let Ue,Z,Re,qe,Be,Le,xe;Ue={key:1,"data-testid":"mixedbtn-text"};Z=H({__name:"MixedButton",props:{mobileOverride:{type:Boolean,default:!1},mobileValue:{type:Boolean},position:{},icon:{},text:{}},setup(T){const C=T,{mobile:t}=De(),g=x(()=>C.mobileOverride?C.mobileValue:t.value);return(r,d)=>(h(),w(f,{icon:g.value},{default:l(()=>[g.value||r.position==="left"?(h(),w(z,{key:0,"data-testid":"mixedbtn-icon-left"},{default:l(()=>[b(m(r.icon),1)]),_:1})):L("",!0),g.value?L("",!0):(h(),K("span",Ue,m(r.text),1)),!g.value&&r.position==="right"?(h(),w(z,{key:2,"data-testid":"mixedbtn-icon-right"},{default:l(()=>[b(m(r.icon),1)]),_:1})):L("",!0)]),_:1},8,["icon"]))}});Re=["href","title"];qe=H({__name:"PluginManagerDialog",props:{guid:{}},setup(T){const C=T,{isOpened:t}=he(C.guid),{t:g}=ee(),r=le(),d=[{title:g("dialogs.pluginManager.headers.enabled"),key:"enabled",sortable:!1},{title:g("dialogs.pluginManager.headers.name"),key:"fullName"},{title:g("dialogs.pluginManager.headers.version"),key:"version"},{title:g("dialogs.pluginManager.headers.url"),key:"url"},{title:g("dialogs.pluginManager.headers.actions"),key:"actions"}],k=V(!1),E=V(!1),_=V(!1),y=V(!1),c=V("");async function D(u){await r.toggleSearchPlugin(u),await r.fetchSearchPlugins()}async function P(){E.value=!0,await r.updatePlugins().then(()=>new Promise(u=>setTimeout(u,2e3))),await r.fetchSearchPlugins(),E.value=!1}async function U(){M(),k.value=!0,await r.installSearchPlugin(c.value),c.value="",setTimeout(()=>{r.fetchSearchPlugins().then(()=>{k.value=!1})},1e3)}async function R(u){k.value=!0,await r.uninstallSearchPlugin(u.name),await r.fetchSearchPlugins(),k.value=!1}const s=()=>{t.value=!1};function M(){_.value=!1}return(u,p)=>(h(),w(Q,{modelValue:v(t),"onUpdate:modelValue":p[4]||(p[4]=n=>ue(t)?t.value=n:null)},{default:l(()=>[e(G,null,{default:l(()=>[e(ye,{class:"d-flex"},{default:l(()=>[$("div",null,m(u.$t("dialogs.pluginManager.title")),1),e(I),e(Z,{icon:"mdi-update",text:u.$t("dialogs.pluginManager.update"),color:"accent",class:"mr-2",loading:E.value,onClick:P},null,8,["text","loading"]),e(Q,{modelValue:_.value,"onUpdate:modelValue":p[3]||(p[3]=n=>_.value=n)},{activator:l(({props:n})=>[e(Z,re({icon:"mdi-toy-brick-plus",text:u.$t("dialogs.pluginManager.install.activator")},n,{color:"primary"}),null,16,["text"])]),default:l(()=>[e(G,{title:u.$t("dialogs.pluginManager.install.title")},{default:l(()=>[e(J,null,{default:l(()=>[e(v(Ve),{modelValue:y.value,"onUpdate:modelValue":p[1]||(p[1]=n=>y.value=n),onSubmit:p[2]||(p[2]=j(()=>{},["prevent"]))},{default:l(()=>[e(ae,{modelValue:c.value,"onUpdate:modelValue":p[0]||(p[0]=n=>c.value=n),autofocus:"",label:u.$t("dialogs.pluginManager.install.label")},null,8,["modelValue","label"])]),_:1},8,["modelValue"])]),_:1}),e(W,null,{default:l(()=>[e(I),e(f,{color:"error",onClick:M},{default:l(()=>[b(m(u.$t("common.cancel")),1)]),_:1}),e(f,{color:"accent",onClick:U},{default:l(()=>[b(m(u.$t("common.ok")),1)]),_:1})]),_:1})]),_:1},8,["title"])]),_:1},8,["modelValue"])]),_:1}),e(J,null,{default:l(()=>[e(te,{mobile:null,headers:d,"items-per-page":"-1",items:v(r).searchPlugins,"sort-by":[{key:"fullName",order:"asc"}],loading:k.value},{"item.enabled":l(({item:n})=>[e(be,{"model-value":n.enabled,onClick:q=>D(n)},null,8,["model-value","onClick"])]),"item.url":l(({item:n})=>[$("a",{href:n.url,title:n.name},m(n.url),9,Re)]),"item.actions":l(({item:n})=>[e(z,{color:"red",icon:"mdi-delete",onClick:q=>R(n)},null,8,["onClick"])]),_:2},1032,["items","loading"])]),_:1}),e(W,null,{default:l(()=>[e(I),e(f,{color:"accent",onClick:s},{default:l(()=>[b(m(u.$t("common.close")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]))}});Be={class:"pa-3"};Le={style:{"font-size":"1.6em !important"},class:"subtitle-1 ml-2"};xe={class:"d-flex justify-end"};He=H({__name:"SearchEngine",setup(T){const C=ce(),{t}=ee(),g=ke(),r=Ee(),d=le(),k=Se(),E=V(),_=V(!1),y=V(0),{searchData:c}=de(d),D=[{title:t("searchEngine.headers.fileName"),key:"fileName"},{title:t("searchEngine.headers.fileSize"),key:"fileSize"},{title:t("searchEngine.headers.nbSeeders"),key:"nbSeeders"},{title:t("searchEngine.headers.nbLeechers"),key:"nbLeechers"},{title:t("searchEngine.headers.siteUrl"),key:"siteUrl"},{title:"",key:"actions",sortable:!1}],P=[{title:t("searchEngine.filters.category.movies"),value:"movies"},{title:t("searchEngine.filters.category.tv"),value:"tv"},{title:t("searchEngine.filters.category.music"),value:"music"},{title:t("searchEngine.filters.category.games"),value:"games"},{title:t("searchEngine.filters.category.anime"),value:"anime"},{title:t("searchEngine.filters.category.software"),value:"software"},{title:t("searchEngine.filters.category.pictures"),value:"pictures"},{title:t("searchEngine.filters.category.books"),value:"books"}];P.sort((a,o)=>a.title.localeCompare(o.title));const U=[{title:t("searchEngine.filters.category.all"),value:"all"},...P],R=x(()=>{const a=[{title:t("searchEngine.filters.plugins.all"),value:"all"},{title:t("searchEngine.filters.plugins.enabled"),value:"enabled"}];return d.searchPlugins.filter(o=>o.enabled).forEach(o=>{a.push({title:o.name,value:o.name})}),a}),s=x(()=>c.value[y.value]??{}),{results:M}=we(()=>s.value.results,()=>s.value.filters?.title,a=>a.fileName);function u(){d.createNewTab(),y.value=c.value.length-1,E.value?.focus()}function p(){c.value.length!==1&&(d.deleteTab(s.value.uniqueId),y.value=Math.min(y.value,c.value.length-1))}function n(a){g.pushTorrentToQueue(a.fileUrl)}function q(a){window.open(a.descrLink,"_blank","noreferrer")}async function O(){await d.runNewSearch(s.value),s.value.timer=setInterval(()=>ie(s.value),1e3),E.value?.saveValueToHistory()}async function B(a){await d.stopSearch(a),a.timer&&clearInterval(a.timer)}function ne(){c.value.forEach(B)}async function ie(a){await d.refreshResults(a)==="Stopped"&&await B(a)}const A=()=>{C.push({name:"dashboard"})};function se(){r.createDialog(qe)}function F(a){if(r.hasActiveDialog||_.value)return!1;a.key==="Escape"&&A()}return fe(async()=>{document.addEventListener("keydown",F),c.value.length===0?d.createNewTab():c.value.forEach(a=>{a.id&&a.id!==0&&(a.timer=setInterval(()=>d.refreshResults(a),1e3))}),await d.fetchSearchPlugins()}),me(()=>{document.removeEventListener("keydown",F),c.value.forEach(a=>{a.timer&&clearInterval(a.timer)})}),(a,o)=>(h(),K("div",Be,[e(N,{"no-gutters":"",align:"center",justify:"center"},{default:l(()=>[e(S,null,{default:l(()=>[$("h1",Le,m(v(t)("searchEngine.title")),1)]),_:1}),e(S,null,{default:l(()=>[$("div",xe,[e(f,{icon:"mdi-stop",variant:"plain",color:"error",onClick:ne}),e(f,{icon:"mdi-toy-brick",variant:"plain",color:"primary",onClick:se}),e(f,{icon:"mdi-close",variant:"plain",onClick:A})])]),_:1})]),_:1}),e(N,{class:"ma-0 pa-0"},{default:l(()=>[e(_e,{class:"d-flex align-center justify-center ma-0 pa-0 bg-primary",fluid:""},{default:l(()=>[e($e,{modelValue:y.value,"onUpdate:modelValue":o[0]||(o[0]=i=>y.value=i),class:"overflow-auto","bg-color":"primary","show-arrows":""},{default:l(()=>[(h(!0),K(ge,null,pe(v(c),i=>(h(),w(Te,{key:i.uniqueId},{default:l(()=>[$("h4",null,m(!i.query||i.query.length===0?a.$t("searchEngine.tabHeaderEmpty"):i.query),1)]),_:2},1024))),128))]),_:1},8,["modelValue"]),e(I),e(f,{icon:"mdi-plus-circle-outline",variant:"plain",color:"accent",onClick:u}),e(f,{icon:"mdi-minus-circle-outline",variant:"plain",color:"error",disabled:v(c).length===1,onClick:p},null,8,["disabled"])]),_:1})]),_:1}),e(Ce,null,{default:l(()=>[e(X,null,{default:l(()=>[e(N,{class:"mt-1"},{default:l(()=>[e(S,{cols:"12",md:"6"},{default:l(()=>[e(Pe,{modelValue:s.value.query,"onUpdate:modelValue":o[1]||(o[1]=i=>s.value.query=i),"history-key":v(Me).SEARCH_ENGINE_QUERY,ref_key:"queryInput",ref:E,autofocus:"",density:"compact","hide-details":"",clearable:"",label:a.$t("searchEngine.query"),onKeydown:ve(j(O,["prevent"]),["enter"])},null,8,["modelValue","history-key","label","onKeydown"])]),_:1}),e(S,{cols:"6",sm:"5",md:"2"},{default:l(()=>[e(Y,{modelValue:s.value.filters.category,"onUpdate:modelValue":o[2]||(o[2]=i=>s.value.filters.category=i),height:"1",variant:"outlined",density:"compact","hide-details":"",items:U,label:a.$t("searchEngine.filters.category.label")},null,8,["modelValue","label"])]),_:1}),e(S,{cols:"6",sm:"5",md:"2"},{default:l(()=>[e(Y,{modelValue:s.value.filters.plugin,"onUpdate:modelValue":o[3]||(o[3]=i=>s.value.filters.plugin=i),flat:"",density:"compact","hide-details":"",variant:"outlined",items:R.value,label:a.$t("searchEngine.filters.plugins.label")},null,8,["modelValue","items","label"])]),_:1}),e(S,{cols:"12",sm:"2",class:"d-flex align-center justify-center"},{default:l(()=>[s.value.id===0?(h(),w(f,{key:0,color:"accent",flat:"",class:"mx-auto px-4",onClick:O},{default:l(()=>[b(m(a.$t("searchEngine.runSearch")),1)]),_:1})):(h(),w(f,{key:1,color:"warning",flat:"",class:"mx-auto px-4",onClick:o[4]||(o[4]=i=>B(s.value))},{default:l(()=>[b(m(a.$t("searchEngine.stopSearch")),1)]),_:1}))]),_:1})]),_:1})]),_:1}),e(Ne,{class:"my-3"}),e(X,{class:"text-select"},{default:l(()=>[e(te,{mobile:null,headers:D,items:v(M),"footer-props":{itemsPerPageOptions:[10,25,50,100,-1]},"items-per-page":s.value.itemsPerPage},{top:l(()=>[e(N,null,{default:l(()=>[e(S,{cols:"12"},{default:l(()=>[e(ae,{modelValue:s.value.filters.title,"onUpdate:modelValue":o[5]||(o[5]=i=>s.value.filters.title=i),density:"compact","hide-details":"",label:a.$t("searchEngine.filters.title.label")},null,8,["modelValue","label"])]),_:1})]),_:1})]),"item.fileSize":l(({item:i})=>[b(m(v(Ie)(i.fileSize,v(k).useBinarySize)),1)]),"item.actions":l(({item:i})=>[e(f,{icon:"mdi-open-in-new",variant:"flat",density:"compact",onClick:j(oe=>q(i),["stop"])},null,8,["onClick"]),e(f,{icon:"mdi-download",variant:"flat",density:"compact",onClick:oe=>n(i)},null,8,["onClick"])]),_:2},1032,["items","items-per-page"])]),_:1})]),_:1})]))}})});export{He as default,__tla};