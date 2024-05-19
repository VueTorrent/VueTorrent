import{h as _,E as te,f as B,r as le,G as ae,H as r,I as b,J as t,n as e,K as w,L as h,u as A,M as j,O as fe,P as Z,W as S,Y as U,N as T,V as ne,R as ke,a as L,Z as Q,F as M,q as N,S as be,T as Fe,_ as se,a1 as pe}from"./vue-Dk8yKSDY.js";import{a as Re,a0 as q,V as z,c as X,d as x,e as Ae,f as P,g as oe,h as H,i as F,j as ee,a1 as ie,a2 as Ue,D as G,l as Te,G as _e,K as ve,E as K,C as re,a3 as Ee,k as ge,B as O,a4 as Ne,m as ue,a5 as he,a6 as Y,a7 as Me,s as J,t as I,q as de,r as Ce,a8 as Le,T as Oe,a9 as Ie,aa as Pe,ab as $e,R as Be,ac as je,__tla as __tla_0}from"./index-D_WwxEqr.js";import{d as qe}from"./index-BjpezWJ4.js";import{u as Ge,__tla as __tla_1}from"./ArrayPagination-9J_GoX4I.js";import{u as He}from"./vuetify-crsROEFU.js";let bt;let __tla=Promise.all([(()=>{try{return __tla_0}catch{}})(),(()=>{try{return __tla_1}catch{}})()]).then(async()=>{var E=(p=>(p[p.LOADING=0]="LOADING",p[p.ERROR=1]="ERROR",p[p.UNREAD=2]="UNREAD",p[p.READ=3]="READ",p))(E||{});const Ke=_({__name:"RssFeedDialog",props:{guid:{},initialFeed:{}},setup(p){const f=p,{t:i}=te(),{isOpened:o}=Re(f.guid),l=q(),c=B(),v=B(!1),u=le({name:"",url:""}),R=[s=>!!s||i("dialogs.rss.feed.rules.name_required")],D=[s=>!!s||i("dialogs.rss.feed.rules.url_required")];async function d(){await c.value?.validate(),v.value&&(f.initialFeed?(u.url!==f.initialFeed.url&&await l.setFeedUrl(f.initialFeed.name,u.url),u.name!==f.initialFeed.name&&await l.renameFeed(f.initialFeed.name,u.name)):await l.createFeed(u.name,u.url),await l.fetchFeeds(),g())}const g=()=>{o.value=!1};return ae(()=>{f.initialFeed&&(u.name=f.initialFeed.name,u.url=f.initialFeed.url)}),(s,a)=>(r(),b(ee,{modelValue:A(o),"onUpdate:modelValue":a[4]||(a[4]=n=>Z(o)?o.value=n:null)},{default:t(()=>[e(z,null,{default:t(()=>[e(X,null,{default:t(()=>[w(h(s.$t(`dialogs.rss.feed.title.${s.initialFeed?"edit":"create"}`)),1)]),_:1}),e(x,null,{default:t(()=>[e(A(Ae),{modelValue:v.value,"onUpdate:modelValue":a[2]||(a[2]=n=>v.value=n),ref_key:"form",ref:c,onSubmit:a[3]||(a[3]=j(()=>{},["prevent"]))},{default:t(()=>[e(P,{modelValue:u.name,"onUpdate:modelValue":a[0]||(a[0]=n=>u.name=n),rules:R,label:s.$t("dialogs.rss.feed.name"),onKeydown:fe(d,["enter"])},null,8,["modelValue","label"]),e(P,{modelValue:u.url,"onUpdate:modelValue":a[1]||(a[1]=n=>u.url=n),rules:D,label:s.$t("dialogs.rss.feed.url"),onKeydown:fe(d,["enter"])},null,8,["modelValue","label"])]),_:1},8,["modelValue"])]),_:1}),e(oe,null,{default:t(()=>[e(H),e(F,{color:"error",onClick:g},{default:t(()=>[w(h(s.$t("common.cancel")),1)]),_:1}),e(F,{color:"accent",disabled:!v.value,onClick:d},{default:t(()=>[w(h(s.$t("common.save")),1)]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["modelValue"]))}}),ze={class:"d-flex"},Je={key:0},Qe={key:1},We={class:"d-flex flex-column"},Ye=_({__name:"Article",props:{value:{}},emits:["click","markAsRead","open","download"],setup(p){const f=q();return(i,o)=>(r(),b(G,{class:ne({"rss-read":i.value.isRead}),onClick:o[3]||(o[3]=l=>i.$emit("click")),onContextmenu:o[4]||(o[4]=l=>i.$emit("markAsRead"))},{default:t(()=>[S("div",ze,[S("div",null,[e(ie,{class:"wrap-anywhere",style:{"white-space":"unset"}},{default:t(()=>[w(h(i.value.title),1)]),_:1}),e(Ue,{class:"d-block"},{default:t(()=>[S("div",null,h(i.value.parsedDate.toLocaleString()),1),S("div",null,h(i.$t("rssArticles.feeds.item.feedName",{name:A(f).getFeedNames(i.value.id).join(" | ")})),1),i.value.author?(r(),U("div",Je,h(i.$t("rssArticles.feeds.item.author",{author:i.value.author})),1)):T("",!0),i.value.category?(r(),U("div",Qe,h(i.$t("rssArticles.feeds.item.category",{category:i.value.category})),1)):T("",!0)]),_:1})]),e(H),S("div",We,[e(F,{icon:"mdi-open-in-new",variant:"text",onClick:o[0]||(o[0]=j(l=>i.$emit("open"),["stop"]))}),e(F,{color:"accent",icon:"mdi-check",variant:"text",onClick:o[1]||(o[1]=j(l=>i.$emit("markAsRead"),["stop"]))}),e(F,{icon:"mdi-download",variant:"text",onClick:o[2]||(o[2]=j(l=>i.$emit("download"),["stop"]))})])])]),_:1},8,["class"]))}}),Ve=_({__name:"ArticleList",props:{height:{}},emits:["articleClicked"],setup(p){const f=ke(),i=Te(),o=q(),l=_e(),c=L(()=>f.params.feedId),v=L(()=>o.filteredArticles.filter(a=>!c.value||c.value===a.feedId).sort((a,n)=>Number(n.parsedDate)-Number(a.parsedDate))),{paginatedResults:u,currentPage:R,pageCount:D}=Ge(v,15);function d(a){const n=l.useIdForRssLinks?a.id:a.link;window.open(n,"_blank","noreferrer")}function g(a){i.pushTorrentToQueue(a.torrentURL)}async function s(a){await o.markArticleAsRead(a.id)}return(a,n)=>(r(),b(re,{height:a.height},{default:t(()=>[v.value.length?(r(),b(G,{key:0},{default:t(()=>[e(ve,{modelValue:A(R),"onUpdate:modelValue":n[0]||(n[0]=m=>Z(R)?R.value=m:null),length:A(D),"next-icon":"mdi-menu-right","prev-icon":"mdi-menu-left"},null,8,["modelValue","length"])]),_:1})):T("",!0),(r(!0),U(M,null,Q(A(u),(m,$)=>(r(),U(M,null,[$>0?(r(),b(K,{key:0,color:"white"})):T("",!0),e(Ye,{value:m,onClick:C=>a.$emit("articleClicked",m),onMarkAsRead:C=>s(m),onOpen:C=>d(m),onDownload:C=>g(m)},null,8,["value","onClick","onMarkAsRead","onOpen","onDownload"])],64))),256)),v.value.length===0?(r(),b(G,{key:1},{default:t(()=>[w(h(a.$t("common.emptyList")),1)]),_:1})):T("",!0),v.value.length?(r(),b(G,{key:2},{default:t(()=>[e(ve,{modelValue:A(R),"onUpdate:modelValue":n[1]||(n[1]=m=>Z(R)?R.value=m:null),length:A(D),"next-icon":"mdi-menu-right","prev-icon":"mdi-menu-left"},null,8,["modelValue","length"])]),_:1})):T("",!0)]),_:1},8,["height"]))}}),Ze={class:"mr-2"},we=_({__name:"FeedIcon",props:{state:{}},setup(p){return(f,i)=>(r(),U("span",Ze,[f.state===A(E).LOADING?(r(),b(Ee,{key:0,size:"24",width:"3",indeterminate:""})):f.state===A(E).ERROR?(r(),b(ge,{key:1,icon:"mdi-alert-circle-outline",color:"error"})):f.state===A(E).UNREAD?(r(),b(ge,{key:2,icon:"mdi-email"})):T("",!0)]))}}),Xe={class:"d-flex align-center"},xe=_({__name:"Feed",props:{title:{},state:{},unreadCount:{}},emits:["readFeed","refreshFeed","editFeed","deleteFeed"],setup(p){const f=p,i=L(()=>f.state===E.LOADING);return(o,l)=>(r(),U("div",Xe,[e(we,{state:o.state},null,8,["state"]),e(ie,null,{default:t(()=>[w(h(o.title),1)]),_:1}),e(H),e(O,{text:o.$t("rssArticles.feeds.markAsRead"),location:"top"},{activator:t(({props:c})=>[o.unreadCount>0?(r(),b(F,N({key:0},c,{icon:"mdi-email-open",density:"comfortable",variant:"plain",onClick:l[0]||(l[0]=j(v=>o.$emit("readFeed"),["stop"]))}),null,16)):T("",!0)]),_:1},8,["text"]),e(O,{text:o.$t("common.refresh"),location:"top"},{activator:t(({props:c})=>[i.value?T("",!0):(r(),b(F,N({key:0},c,{icon:"mdi-sync",density:"comfortable",variant:"plain",onClick:l[1]||(l[1]=j(v=>o.$emit("refreshFeed"),["stop"]))}),null,16))]),_:1},8,["text"]),e(O,{text:o.$t("common.edit"),location:"top"},{activator:t(({props:c})=>[e(F,N(c,{icon:"mdi-pencil",density:"comfortable",variant:"plain",onClick:l[2]||(l[2]=j(v=>o.$emit("editFeed"),["stop"]))}),null,16)]),_:1},8,["text"]),e(O,{text:o.$t("common.delete"),location:"top"},{activator:t(({props:c})=>[e(F,N(c,{icon:"mdi-delete",color:"red",density:"comfortable",variant:"plain",onClick:l[3]||(l[3]=j(v=>o.$emit("deleteFeed"),["stop"]))}),null,16)]),_:1},8,["text"])]))}}),et={class:"d-flex align-center"},ye=_({__name:"FeedList",props:{height:{}},emits:["update","createFeed","editFeed","deleteFeed","refreshFeed"],setup(p,{emit:f}){const i=f,o=be(),l=q(),c=L({get(){return o.currentRoute.value.params.feedId},set(n){o.replace({name:"rssArticles",params:{tab:"feeds",feedId:n}}),i("update",n)}}),v=Ne(()=>l.filteredArticles.map(n=>n.feedId));function u(n){return n?(n.articles??[]).reduce((m,$)=>m+ +!$.isRead,0):l.unreadArticles.length}function R(n){c.value=c.value!==n.uid?n.uid:void 0}async function D(n){await l.markFeedAsRead(n)}async function d(){await l.refreshAllFeeds(),l.resumeFeedTimer()}function g(n){const m=u(n);return(m?`${m} | `:"")+`${n?n.name:"All"}`}const s=L(()=>l.feeds.reduce((n,m)=>Math.min(n,a(m)),E.READ));function a(n){return n.isLoading?E.LOADING:n.hasError?E.ERROR:n.articles?.some(m=>!m.isRead)?E.UNREAD:E.READ}return(n,m)=>(r(),b(re,{height:n.height},{default:t(()=>[e(G,{active:!c.value,color:"accent",variant:"text",onClick:m[3]||(m[3]=$=>c.value=void 0)},{default:t(()=>[S("div",et,[e(we,{state:s.value},null,8,["state"]),e(ie,null,{default:t(()=>[w(h(g()),1)]),_:1}),e(H),e(O,{text:n.$t("rssArticles.feeds.markAllAsRead"),location:"top"},{activator:t(({props:$})=>[u()>0?(r(),b(F,N({key:0},$,{icon:"mdi-email-open",density:"comfortable",variant:"plain",onClick:m[0]||(m[0]=C=>A(l).markAllAsRead())}),null,16)):T("",!0)]),_:1},8,["text"]),e(O,{text:n.$t("rssArticles.feeds.refreshAllFeeds"),location:"top"},{activator:t(({props:$})=>[s.value!==A(E).LOADING?(r(),b(F,N({key:0},$,{icon:"mdi-sync",density:"comfortable",variant:"plain",onClick:m[1]||(m[1]=C=>d())}),null,16)):T("",!0)]),_:1},8,["text"]),e(O,{text:n.$t("rssArticles.feeds.empty.action"),location:"top"},{activator:t(({props:$})=>[e(F,N($,{icon:"mdi-plus",density:"comfortable",variant:"plain",onClick:m[2]||(m[2]=C=>n.$emit("createFeed"))}),null,16)]),_:1},8,["text"])])]),_:1},8,["active"]),e(K,{thickness:"3"}),(r(!0),U(M,null,Q(A(l).feeds,$=>(r(),U(M,null,[(!A(l).filters.unread||A(l).filters.unread&&u($)>0)&&A(v).includes($.uid)?(r(),b(G,{key:0,active:c.value===$.uid,class:ne(u($)>0?"text-accent":""),color:"accent",variant:"text",onClick:C=>R($)},{default:t(()=>[e(xe,{title:g($),state:a($),"unread-count":u($),onReadFeed:C=>D($),onRefreshFeed:C=>n.$emit("refreshFeed",$),onEditFeed:C=>n.$emit("editFeed",$),onDeleteFeed:C=>n.$emit("deleteFeed",$)},null,8,["title","state","unread-count","onReadFeed","onRefreshFeed","onEditFeed","onDeleteFeed"])]),_:2},1032,["active","class","onClick"])):T("",!0)],64))),256))]),_:1},8,["height"]))}}),tt=_({__name:"Feeds",props:{height:{},mobile:{type:Boolean}},emits:["openArticle"],setup(p,{emit:f}){const i=p,o=ue(),l=q(),c=B(!1),v=L(()=>i.height-56-16-56-12*2),u=L({get:()=>l.filters.title,set:qe(g=>{l.filters.title=g??""},300)});function R(g){o.createDialog(Ke,{initialFeed:g},l.resumeFeedTimer)}async function D(g){await l.refreshFeed(g.name),l.resumeFeedTimer()}async function d(g){await l.deleteFeed(g.name),l.resumeFeedTimer()}return Fe(()=>{l.resumeFeedTimer()}),se(()=>{l.pauseFeedTimer()}),(g,s)=>A(l).feeds.length?(r(),b(z,{key:1,id:"rss-articles",class:"pa-3",height:g.height},{default:t(()=>[e(P,{modelValue:u.value,"onUpdate:modelValue":s[1]||(s[1]=a=>u.value=a),label:g.$t("rssArticles.feeds.filters.title"),clearable:"","hide-details":""},null,8,["modelValue","label"]),e(Y,{modelValue:A(l).filters.unread,"onUpdate:modelValue":s[2]||(s[2]=a=>A(l).filters.unread=a),label:g.$t("rssArticles.feeds.filters.unread"),"hide-details":""},null,8,["modelValue","label"]),g.mobile?(r(),U(M,{key:0},[e(Ve,{height:v.value,onArticleClicked:s[3]||(s[3]=a=>g.$emit("openArticle",a))},null,8,["height"]),e(Me,{modelValue:c.value,"onUpdate:modelValue":s[9]||(s[9]=a=>c.value=a),"max-height":"550"},{activator:t(({props:a})=>[e(F,N({class:"fab"},a,{color:"accent",icon:"mdi-format-list-bulleted",size:"large"}),null,16)]),default:t(()=>[e(ye,{onUpdate:s[4]||(s[4]=a=>c.value=!1),onCreateFeed:s[5]||(s[5]=()=>R()),onEditFeed:s[6]||(s[6]=a=>R(a)),onDeleteFeed:s[7]||(s[7]=a=>d(a)),onRefreshFeed:s[8]||(s[8]=a=>D(a))})]),_:1},8,["modelValue"])],64)):(r(),b(J,{key:1},{default:t(()=>[e(I,{cols:"4"},{default:t(()=>[e(ye,{height:v.value,onCreateFeed:s[10]||(s[10]=()=>R()),onEditFeed:s[11]||(s[11]=a=>R(a)),onDeleteFeed:s[12]||(s[12]=a=>d(a)),onRefreshFeed:s[13]||(s[13]=a=>D(a))},null,8,["height"])]),_:1}),e(I,{cols:"8"},{default:t(()=>[e(Ve,{height:v.value,onArticleClicked:s[14]||(s[14]=a=>g.$emit("openArticle",a))},null,8,["height"])]),_:1})]),_:1}))]),_:1},8,["height"])):(r(),b(z,{key:0,height:g.height},{default:t(()=>[e(he,{title:g.$t("rssArticles.feeds.empty.value"),icon:"mdi-rss-off"},{actions:t(()=>[e(F,{text:g.$t("rssArticles.feeds.empty.action"),color:"accent",onClick:s[0]||(s[0]=a=>R())},null,8,["text"])]),_:1},8,["title"])]),_:1},8,["height"]))}}),lt=_({__name:"AddTorrentParamsDialog",props:{modelValue:{required:!0},modelModifiers:{},isOpened:{type:Boolean},isOpenedModifiers:{}},emits:["update:modelValue","update:isOpened"],setup(p){const f=pe(p,"modelValue"),i=pe(p,"isOpened"),{t:o}=te(),l=B();function c(){l.value?.saveFields(),i.value=!1}return(v,u)=>(r(),b(ee,{modelValue:i.value,"onUpdate:modelValue":u[1]||(u[1]=R=>i.value=R),class:ne(v.$vuetify.display.mobile?"":"w-75"),fullscreen:v.$vuetify.display.mobile,scrollable:""},{default:t(()=>[e(z,null,{default:t(()=>[e(X,{class:"ios-margin"},{default:t(()=>[e(de,{color:"transparent"},{default:t(()=>[e(Ce,null,{default:t(()=>[w(h(A(o)("dialogs.add.params.title")),1)]),_:1}),e(F,{icon:"mdi-close",onClick:c})]),_:1})]),_:1}),e(x,null,{default:t(()=>[e(Le,{modelValue:f.value,"onUpdate:modelValue":u[0]||(u[0]=R=>f.value=R)},null,8,["modelValue"])]),_:1}),e(oe,{class:"mb-2"},{default:t(()=>[e(H),e(F,{text:v.$t("common.close"),color:"",variant:"flat",onClick:c},null,8,["text"])]),_:1})]),_:1})]),_:1},8,["modelValue","class","fullscreen"]))}});function at(p){return{save_path:p?.save_path??"",skip_checking:!1,add_to_top_of_queue:p?.add_to_top_of_queue??!1,content_layout:p?.torrent_content_layout,stop_condition:p?.torrent_stop_condition,download_limit:p?.dl_limit,upload_limit:p?.up_limit,use_download_path:!!p?.temp_path,download_path:p?.temp_path?p?.temp_path:"",stopped:p?.start_paused_enabled,use_auto_tmm:p?.auto_tmm_enabled,ratio_limit:-2,seeding_time_limit:-2,inactive_seeding_time_limit:-2}}let nt,st,ot,it,rt,ut,dt,mt,ct,ft,pt,vt;nt={class:"d-flex"};st={class:"d-flex align-center"};ot={class:"v-card-title pa-0"};it=_({__name:"RssRuleDialog",props:{guid:{},initialRule:{}},setup(p){const f=p,i=L(()=>!!(f.initialRule&&f.initialRule.name)),{isOpened:o}=Re(f.guid),{t:l}=te(),c=Oe(),v=Ie(),u=q(),R=B(),D=B(!1),d=le(n()),g=B(""),s=B([]),a=L(()=>{if(d.lastMatch==="")return l("dialogs.rss.rule.lastMatch.unknownValue").toString();const y=new Date().getTime()-new Date(d.lastMatch).getTime();return l("dialogs.rss.rule.lastMatch.knownValue",Math.floor(y/(1e3*60*60*24)))});function n(){return{affectedFeeds:[],enabled:!0,episodeFilter:"",ignoreDays:0,lastMatch:"",mustContain:"",mustNotContain:"",name:"",priority:0,smartFilter:!1,useRegex:!1,previouslyMatchedEpisodes:i.value?f.initialRule.previouslyMatchedEpisodes:[],torrentParams:at(v.preferences)}}async function m(){if(g.value==="")return;const y=[],k=await u.fetchMatchingArticles(g.value);for(const V in k){const W=k[V];y.length>0&&y.push({type:"divider"}),y.push({type:"subheader",value:V});for(const De in W){const Se=W[De];y.push({type:"item",value:Se})}}s.value=y}async function $(){D.value&&((i.value||g.value!=="")&&g.value!==d.name&&await u.renameRule(g.value,d.name),await u.setRule(d.name,d),g.value=d.name,await u.fetchRules(),await m())}async function C(){d.affectedFeeds=[]}async function me(){d.affectedFeeds=u.feeds.map(y=>y.url)}const ce=()=>{o.value=!1};return ae(async()=>{await c.fetchCategories(),await u.fetchFeeds(),i.value&&(g.value=f.initialRule.name,Object.assign(d,f.initialRule)),await m()}),(y,k)=>(r(),b(ee,{modelValue:A(o),"onUpdate:modelValue":k[13]||(k[13]=V=>Z(o)?o.value=V:null)},{default:t(()=>[e(z,null,{default:t(()=>[e(X,null,{default:t(()=>[e(de,{color:"transparent",title:y.$t(`dialogs.rss.rule.title.${y.initialRule?"edit":"create"}`)},{default:t(()=>[e(F,{icon:"mdi-close",onClick:ce})]),_:1},8,["title"])]),_:1}),e(x,null,{default:t(()=>[e(A(Ae),{modelValue:D.value,"onUpdate:modelValue":k[11]||(k[11]=V=>D.value=V),ref_key:"form",ref:R,onSubmit:k[12]||(k[12]=j(()=>{},["prevent"]))},{default:t(()=>[e(J,null,{default:t(()=>[e(I,{cols:"12",sm:"6",class:"scrollable-col"},{default:t(()=>[e(P,{modelValue:d.name,"onUpdate:modelValue":k[0]||(k[0]=V=>d.name=V),autofocus:"",required:"",label:y.$t("dialogs.rss.rule.name")},null,8,["modelValue","label"]),S("div",nt,[e(Pe,{modelValue:d.enabled,"onUpdate:modelValue":k[1]||(k[1]=V=>d.enabled=V),color:"accent",inset:"","hide-details":"",label:y.$t("dialogs.rss.rule.enabled")},null,8,["modelValue","label"]),e(H),S("div",st,[e(F,{class:"d-flex align-center justify-center",color:"accent"},{default:t(()=>[w(h(y.$t("dialogs.add.params.title"))+" ",1),e(lt,{modelValue:d.torrentParams,"onUpdate:modelValue":k[2]||(k[2]=V=>d.torrentParams=V),activator:"parent"},null,8,["modelValue"])]),_:1})])]),e(K),e(Y,{modelValue:d.useRegex,"onUpdate:modelValue":k[3]||(k[3]=V=>d.useRegex=V),"hide-details":"",label:y.$t("dialogs.rss.rule.useRegex")},null,8,["modelValue","label"]),e(P,{modelValue:d.mustContain,"onUpdate:modelValue":k[4]||(k[4]=V=>d.mustContain=V),label:y.$t("dialogs.rss.rule.mustContain")},null,8,["modelValue","label"]),e(P,{modelValue:d.mustNotContain,"onUpdate:modelValue":k[5]||(k[5]=V=>d.mustNotContain=V),label:y.$t("dialogs.rss.rule.mustNotContain")},null,8,["modelValue","label"]),e(Y,{modelValue:d.smartFilter,"onUpdate:modelValue":k[6]||(k[6]=V=>d.smartFilter=V),"hide-details":"",label:y.$t("dialogs.rss.rule.smartFilter")},null,8,["modelValue","label"]),e(P,{modelValue:d.episodeFilter,"onUpdate:modelValue":k[7]||(k[7]=V=>d.episodeFilter=V),placeholder:y.$t("dialogs.rss.rule.episodeFilterPlaceholder"),label:y.$t("dialogs.rss.rule.episodeFilter")},null,8,["modelValue","placeholder","label"]),e(K,{class:"mb-4"}),e(P,{modelValue:d.ignoreDays,"onUpdate:modelValue":k[8]||(k[8]=V=>d.ignoreDays=V),modelModifiers:{number:!0},type:"number",hint:y.$t("dialogs.rss.rule.ignoreDaysHint"),label:y.$t("dialogs.rss.rule.ignoreDays")},null,8,["modelValue","hint","label"]),e(P,{modelValue:a.value,"onUpdate:modelValue":k[9]||(k[9]=V=>a.value=V),disabled:"",label:y.$t("dialogs.rss.rule.lastMatch.label")},null,8,["modelValue","label"]),e(K),e($e,null,{default:t(()=>[w(h(y.$t("dialogs.rss.rule.affectedFeedsSubheader")),1)]),_:1}),e(J,null,{default:t(()=>[e(I,{cols:"6",class:"d-flex align-center justify-center"},{default:t(()=>[e(F,{color:"accent",onClick:me},{default:t(()=>[w(h(y.$t("common.selectAll")),1)]),_:1})]),_:1}),e(I,{cols:"6",class:"d-flex align-center justify-center"},{default:t(()=>[e(F,{color:"primary",onClick:C},{default:t(()=>[w(h(y.$t("common.selectNone")),1)]),_:1})]),_:1})]),_:1}),(r(!0),U(M,null,Q(A(u).feeds,V=>(r(),b(Y,{modelValue:d.affectedFeeds,"onUpdate:modelValue":k[10]||(k[10]=W=>d.affectedFeeds=W),multiple:"","hide-details":"",label:V.name,value:V.url},null,8,["modelValue","label","value"]))),256))]),_:1}),e(K,{vertical:!y.$vuetify.display.mobile},null,8,["vertical"]),e(I,{cols:"12",sm:"6",class:"scrollable-col"},{default:t(()=>[S("div",ot,h(y.$t("dialogs.rss.rule.matchingArticles.title")),1),e(re,null,{default:t(()=>[(r(!0),U(M,null,Q(s.value,V=>(r(),U(M,null,[V.type==="divider"?(r(),b(K,{key:0})):V.type==="subheader"?(r(),b($e,{key:1,inset:""},{default:t(()=>[w(h(V.value),1)]),_:2},1024)):(r(),b(G,{key:2,class:"mb-3"},{default:t(()=>[w(h(V.value),1)]),_:2},1024))],64))),256)),s.value.length===0?(r(),b(G,{key:0,title:y.$t("dialogs.rss.rule.matchingArticles.noMatch")},null,8,["title"])):T("",!0)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(oe,null,{default:t(()=>[e(H),e(F,{color:"error",onClick:ce},{default:t(()=>[w(h(y.$t("common.close")),1)]),_:1}),e(F,{color:"accent",onClick:$},{default:t(()=>[w(h(y.$t("common.save")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]))}});rt=Be(it,[["__scopeId","data-v-d359259e"]]);ut={class:"pl-4"};dt=_({__name:"Rule",props:{value:{}},emits:["openRule"],setup(p){const f=q();async function i(l){await f.setRule(l.name,{...l,enabled:!l.enabled}),f.resumeRuleTimer()}async function o(l){await f.deleteRule(l.name),f.resumeRuleTimer()}return(l,c)=>(r(),b(je,{rounded:"xl",class:"d-flex align-center"},{default:t(()=>[S("div",ut,h(l.value.name),1),e(H),S("div",null,[e(F,{class:"my-2 mr-2",icon:l.value.enabled?"mdi-check":"mdi-cancel",color:l.value.enabled?"accent":"red",variant:"plain",density:"compact",onClick:c[0]||(c[0]=v=>i(l.value))},null,8,["icon","color"]),e(O,{text:l.$t("common.edit"),location:"top"},{activator:t(({props:v})=>[e(F,N(v,{class:"my-2 mr-2",icon:"mdi-pencil",variant:"plain",density:"compact",onClick:c[1]||(c[1]=u=>l.$emit("openRule",l.value))}),null,16)]),_:1},8,["text"]),e(O,{text:l.$t("common.delete"),location:"top"},{activator:t(({props:v})=>[e(F,N(v,{class:"my-2 mr-2",icon:"mdi-delete",color:"red",variant:"plain",density:"compact",onClick:c[2]||(c[2]=u=>o(l.value))}),null,16)]),_:1},8,["text"])])]),_:1}))}});mt=_({__name:"Rules",props:{height:{}},setup(p){const f=ue(),i=q();function o(l){f.createDialog(rt,{initialRule:l},i.resumeRuleTimer)}return ae(()=>{i.resumeRuleTimer()}),se(()=>{i.pauseRuleTimer()}),(l,c)=>A(i).rules.length?(r(),U(M,{key:1},[e(J,{class:"mt-2"},{default:t(()=>[(r(!0),U(M,null,Q(A(i).rules,v=>(r(),b(I,{cols:"12",sm:"6",lg:"3"},{default:t(()=>[e(dt,{value:v,onOpenRule:o},null,8,["value"])]),_:2},1024))),256))]),_:1}),e(J,null,{default:t(()=>[e(I,{cols:"12",class:"d-flex align-center justify-center"},{default:t(()=>[e(F,{color:"accent",onClick:c[1]||(c[1]=v=>o())},{default:t(()=>[w(h(l.$t("rssArticles.rules.empty.action")),1)]),_:1})]),_:1})]),_:1})],64)):(r(),b(z,{key:0,height:l.height},{default:t(()=>[e(he,{title:l.$t("rssArticles.rules.empty.value"),icon:"mdi-rss-off"},{actions:t(()=>[e(F,{text:l.$t("rssArticles.rules.empty.action"),color:"accent",onClick:c[0]||(c[0]=v=>o())},null,8,["text"])]),_:1},8,["title"])]),_:1},8,["height"]))}});ct={class:"pa-3"};ft={class:"subtitle-1 ml-2",style:{"font-size":"1.6em !important"}};pt={class:"d-flex justify-end"};vt=["innerHTML"];bt=_({__name:"RssArticles",setup(p){const{height:f,mobile:i}=He({mobileBreakpoint:"md"}),o=ke(),l=be(),c=ue(),v=q(),u=B(!1),R=le({title:"",content:""}),D=L(()=>o.params.tab!=="rules"),d=L(()=>f.value-64-12*2-48);function g(m){m.description&&(R.title=m.title.trim(),R.content=m.description.trim(),u.value=!0)}function s(){const m=o.params.tab==="rules"?"feeds":"rules";l.replace({name:"rssArticles",params:{tab:m}}),v.lastView=m}function a(){l.push({name:"dashboard"})}function n(m){if(c.hasActiveDialog||u.value)return!1;m.key==="Escape"&&a()}return Fe(()=>{document.addEventListener("keydown",n)}),se(()=>{document.removeEventListener("keydown",n)}),(m,$)=>(r(),U(M,null,[S("div",ct,[e(J,{align:"center",justify:"center","no-gutters":""},{default:t(()=>[e(I,null,{default:t(()=>[S("h1",ft,h(D.value?m.$t("rssArticles.feeds.title"):m.$t("rssArticles.rules.title")),1)]),_:1}),e(I,null,{default:t(()=>[S("div",pt,[e(O,{text:m.$t(D.value?"rssArticles.toggle.rules":"rssArticles.toggle.feeds"),location:"top"},{activator:t(({props:C})=>[e(F,N(C,{icon:"mdi-auto-download",variant:"plain",onClick:$[0]||($[0]=me=>s())}),null,16)]),_:1},8,["text"]),e(F,{icon:"mdi-close",variant:"plain",onClick:$[1]||($[1]=C=>a())})])]),_:1})]),_:1}),D.value?(r(),b(tt,{key:0,height:d.value,mobile:A(i),onOpenArticle:g},null,8,["height","mobile"])):(r(),b(mt,{key:1,height:d.value},null,8,["height"]))]),e(ee,{modelValue:u.value,"onUpdate:modelValue":$[3]||($[3]=C=>u.value=C)},{default:t(()=>[e(z,null,{default:t(()=>[e(X,null,{default:t(()=>[e(de,{color:"transparent"},{default:t(()=>[e(Ce,null,{default:t(()=>[w(h(R.title),1)]),_:1}),e(F,{icon:"mdi-close",onClick:$[2]||($[2]=C=>u.value=!1)})]),_:1})]),_:1}),e(x,null,{default:t(()=>[S("div",{class:"description-container",innerHTML:R.content},null,8,vt)]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}})});export{bt as default,__tla};