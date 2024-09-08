import{h as _,I as le,d as B,r as ae,J as ne,B as r,D as b,G as t,m as e,S as D,N as h,u as A,U as j,V as ce,O as Y,M as U,L as S,P as T,X as se,T as ye,c as M,Q as J,F as L,n as N,H as ke,z as be,K as oe,_ as fe}from"./vue-CsPTP9nv.js";import{F as Fe,a1 as G,E as K,z as Z,B as x,C as Re,a as P,D as ie,r as q,i as F,P as ee,a2 as re,a3 as Ue,j as H,v as Se,b as Te,d as _e,n as pe,m as z,g as ue,a4 as Ee,V as ve,O,a5 as Ne,w as de,a6 as Le,a7 as Ae,a8 as W,a9 as Me,f as Q,h as I,G as me,H as he,aa as Oe,ab as Ie,ac as Pe,ad as ge,ae as Be,af as je}from"./index-BIrcDeaY.js";import{a as Ge}from"./vuetify-DbutY1kw.js";var E=(p=>(p[p.LOADING=0]="LOADING",p[p.ERROR=1]="ERROR",p[p.UNREAD=2]="UNREAD",p[p.READ=3]="READ",p))(E||{});const He=_({__name:"RssFeedDialog",props:{guid:{},initialFeed:{}},setup(p){const f=p,{t:i}=le(),{isOpened:s}=Fe(f.guid),l=G(),d=B(),m=B(!1),v=ae({name:"",url:""}),R=[o=>!!o||i("dialogs.rss.feed.rules.name_required")],u=[o=>!!o||i("dialogs.rss.feed.rules.url_required")];async function C(){await d.value?.validate(),m.value&&(f.initialFeed?(v.url!==f.initialFeed.url&&await l.setFeedUrl(f.initialFeed.name,v.url),v.name!==f.initialFeed.name&&await l.renameFeed(f.initialFeed.name,v.name)):await l.createFeed(v.name,v.url),await l.fetchFeeds(),y())}const y=()=>{s.value=!1};return ne(()=>{f.initialFeed&&(v.name=f.initialFeed.name,v.url=f.initialFeed.url)}),(o,a)=>(r(),b(ee,{modelValue:A(s),"onUpdate:modelValue":a[4]||(a[4]=n=>Y(s)?s.value=n:null)},{default:t(()=>[e(K,null,{default:t(()=>[e(Z,null,{default:t(()=>[D(h(o.$t(`dialogs.rss.feed.title.${o.initialFeed?"edit":"create"}`)),1)]),_:1}),e(x,null,{default:t(()=>[e(A(Re),{modelValue:m.value,"onUpdate:modelValue":a[2]||(a[2]=n=>m.value=n),ref_key:"form",ref:d,onSubmit:a[3]||(a[3]=j(()=>{},["prevent"]))},{default:t(()=>[e(P,{modelValue:v.name,"onUpdate:modelValue":a[0]||(a[0]=n=>v.name=n),rules:R,label:o.$t("dialogs.rss.feed.name"),onKeydown:ce(C,["enter"])},null,8,["modelValue","label"]),e(P,{modelValue:v.url,"onUpdate:modelValue":a[1]||(a[1]=n=>v.url=n),rules:u,label:o.$t("dialogs.rss.feed.url"),onKeydown:ce(C,["enter"])},null,8,["modelValue","label"])]),_:1},8,["modelValue"])]),_:1}),e(ie,null,{default:t(()=>[e(q),e(F,{color:"error",onClick:y},{default:t(()=>[D(h(o.$t("common.cancel")),1)]),_:1}),e(F,{color:"accent",disabled:!m.value,onClick:C},{default:t(()=>[D(h(o.$t("common.save")),1)]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["modelValue"]))}}),qe={class:"d-flex"},ze={key:0},Ke={key:1},Qe={class:"d-flex flex-column"},Je=_({__name:"Article",props:{value:{}},emits:["click","markAsRead","open","download"],setup(p){const f=G();return(i,s)=>(r(),b(H,{class:se({"rss-read":i.value.isRead}),onClick:s[3]||(s[3]=l=>i.$emit("click")),onContextmenu:s[4]||(s[4]=l=>i.$emit("markAsRead"))},{default:t(()=>[U("div",qe,[U("div",null,[e(re,{class:"wrap-anywhere",style:{"white-space":"unset"}},{default:t(()=>[D(h(i.value.title),1)]),_:1}),e(Ue,{class:"d-block"},{default:t(()=>[U("div",null,h(i.value.parsedDate.toLocaleString()),1),U("div",null,h(i.$t("rssArticles.feeds.item.feedName",{name:A(f).getFeedNames(i.value.id).join(" | ")})),1),i.value.author?(r(),S("div",ze,h(i.$t("rssArticles.feeds.item.author",{author:i.value.author})),1)):T("",!0),i.value.category?(r(),S("div",Ke,h(i.$t("rssArticles.feeds.item.category",{category:i.value.category})),1)):T("",!0)]),_:1})]),e(q),U("div",Qe,[e(F,{icon:"mdi-open-in-new",variant:"text",onClick:s[0]||(s[0]=j(l=>i.$emit("open"),["stop"]))}),e(F,{color:"accent",icon:"mdi-check",variant:"text",onClick:s[1]||(s[1]=j(l=>i.$emit("markAsRead"),["stop"]))}),e(F,{icon:"mdi-download",variant:"text",onClick:s[2]||(s[2]=j(l=>i.$emit("download"),["stop"]))})])])]),_:1},8,["class"]))}}),$e=_({__name:"ArticleList",props:{height:{}},emits:["articleClicked"],setup(p){const f=ye(),i=Se(),s=G(),l=Te(),d=M(()=>f.params.feedId),m=M(()=>s.filteredArticles.filter(a=>!d.value||d.value===a.feedId).sort((a,n)=>Number(n.parsedDate)-Number(a.parsedDate))),{paginatedResults:v,currentPage:R,pageCount:u}=_e(m,15);function C(a){const n=l.useIdForRssLinks?a.id:a.link;window.open(n,"_blank","noreferrer")}function y(a){i.pushTorrentToQueue(a.torrentURL)}async function o(a){await s.markArticleAsRead(a.id)}return(a,n)=>(r(),b(ue,{height:a.height},{default:t(()=>[m.value.length?(r(),b(H,{key:0},{default:t(()=>[e(pe,{modelValue:A(R),"onUpdate:modelValue":n[0]||(n[0]=c=>Y(R)?R.value=c:null),length:A(u),"next-icon":"mdi-menu-right","prev-icon":"mdi-menu-left"},null,8,["modelValue","length"])]),_:1})):T("",!0),(r(!0),S(L,null,J(A(v),(c,g)=>(r(),S(L,null,[g>0?(r(),b(z,{key:0})):T("",!0),e(Je,{value:c,onClick:w=>a.$emit("articleClicked",c),onMarkAsRead:w=>o(c),onOpen:w=>C(c),onDownload:w=>y(c)},null,8,["value","onClick","onMarkAsRead","onOpen","onDownload"])],64))),256)),m.value.length===0?(r(),b(H,{key:1},{default:t(()=>[D(h(a.$t("common.emptyList")),1)]),_:1})):T("",!0),m.value.length?(r(),b(H,{key:2},{default:t(()=>[e(pe,{modelValue:A(R),"onUpdate:modelValue":n[1]||(n[1]=c=>Y(R)?R.value=c:null),length:A(u),"next-icon":"mdi-menu-right","prev-icon":"mdi-menu-left"},null,8,["modelValue","length"])]),_:1})):T("",!0)]),_:1},8,["height"]))}}),Xe={class:"mr-2"},Ce=_({__name:"FeedIcon",props:{state:{}},setup(p){return(f,i)=>(r(),S("span",Xe,[f.state===A(E).LOADING?(r(),b(Ee,{key:0,size:"24",width:"3",indeterminate:""})):f.state===A(E).ERROR?(r(),b(ve,{key:1,icon:"mdi-alert-circle-outline",color:"error"})):f.state===A(E).UNREAD?(r(),b(ve,{key:2,icon:"mdi-email"})):T("",!0)]))}}),We={class:"d-flex align-center"},Ye=_({__name:"Feed",props:{title:{},state:{},unreadCount:{}},emits:["readFeed","refreshFeed","editFeed","deleteFeed"],setup(p){const f=p,i=M(()=>f.state===E.LOADING);return(s,l)=>(r(),S("div",We,[e(Ce,{state:s.state},null,8,["state"]),e(re,null,{default:t(()=>[D(h(s.title),1)]),_:1}),e(q),e(O,{text:s.$t("rssArticles.feeds.markAsRead"),location:"top"},{activator:t(({props:d})=>[s.unreadCount>0?(r(),b(F,N({key:0},d,{icon:"mdi-email-open",density:"comfortable",variant:"plain",onClick:l[0]||(l[0]=j(m=>s.$emit("readFeed"),["stop"]))}),null,16)):T("",!0)]),_:1},8,["text"]),e(O,{text:s.$t("common.refresh"),location:"top"},{activator:t(({props:d})=>[i.value?T("",!0):(r(),b(F,N({key:0},d,{icon:"mdi-sync",density:"comfortable",variant:"plain",onClick:l[1]||(l[1]=j(m=>s.$emit("refreshFeed"),["stop"]))}),null,16))]),_:1},8,["text"]),e(O,{text:s.$t("common.edit"),location:"top"},{activator:t(({props:d})=>[e(F,N(d,{icon:"mdi-pencil",density:"comfortable",variant:"plain",onClick:l[2]||(l[2]=j(m=>s.$emit("editFeed"),["stop"]))}),null,16)]),_:1},8,["text"]),e(O,{text:s.$t("common.delete"),location:"top"},{activator:t(({props:d})=>[e(F,N(d,{icon:"mdi-delete",color:"red",density:"comfortable",variant:"plain",onClick:l[3]||(l[3]=j(m=>s.$emit("deleteFeed"),["stop"]))}),null,16)]),_:1},8,["text"])]))}}),Ze={class:"d-flex align-center"},Ve=_({__name:"FeedList",props:{height:{}},emits:["update","createFeed","editFeed","deleteFeed","refreshFeed"],setup(p,{emit:f}){const i=f,s=ke(),l=G(),d=M({get(){return s.currentRoute.value.params.feedId},set(n){s.replace({name:"rssArticles",params:{tab:"feeds",feedId:n}}),i("update",n)}}),m=Ne(()=>l.filteredArticles.map(n=>n.feedId));function v(n){return n?(n.articles??[]).reduce((c,g)=>c+ +!g.isRead,0):l.unreadArticles.length}function R(n){d.value=d.value!==n.uid?n.uid:void 0}async function u(n){await l.markFeedAsRead(n)}async function C(){await l.refreshAllFeeds(),l.resumeFeedTimer()}function y(n){const c=v(n);return(c?`${c} | `:"")+`${n?n.name:"All"}`}const o=M(()=>l.feeds.reduce((n,c)=>Math.min(n,a(c)),E.READ));function a(n){return n.isLoading?E.LOADING:n.hasError?E.ERROR:n.articles?.some(c=>!c.isRead)?E.UNREAD:E.READ}return(n,c)=>(r(),b(ue,{height:n.height},{default:t(()=>[e(H,{active:!d.value,color:"accent",variant:"text",onClick:c[3]||(c[3]=g=>d.value=void 0)},{default:t(()=>[U("div",Ze,[e(Ce,{state:o.value},null,8,["state"]),e(re,null,{default:t(()=>[D(h(y()),1)]),_:1}),e(q),e(O,{text:n.$t("rssArticles.feeds.markAllAsRead"),location:"top"},{activator:t(({props:g})=>[v()>0?(r(),b(F,N({key:0},g,{icon:"mdi-email-open",density:"comfortable",variant:"plain",onClick:c[0]||(c[0]=w=>A(l).markAllAsRead())}),null,16)):T("",!0)]),_:1},8,["text"]),e(O,{text:n.$t("rssArticles.feeds.refreshAllFeeds"),location:"top"},{activator:t(({props:g})=>[o.value!==A(E).LOADING?(r(),b(F,N({key:0},g,{icon:"mdi-sync",density:"comfortable",variant:"plain",onClick:c[1]||(c[1]=w=>C())}),null,16)):T("",!0)]),_:1},8,["text"]),e(O,{text:n.$t("rssArticles.feeds.empty.action"),location:"top"},{activator:t(({props:g})=>[e(F,N(g,{icon:"mdi-plus",density:"comfortable",variant:"plain",onClick:c[2]||(c[2]=w=>n.$emit("createFeed"))}),null,16)]),_:1},8,["text"])])]),_:1},8,["active"]),e(z,{thickness:"3"}),(r(!0),S(L,null,J(A(l).feeds,g=>(r(),S(L,null,[(!A(l).filters.unread||A(l).filters.unread&&v(g)>0)&&A(m).includes(g.uid)?(r(),b(H,{key:0,active:d.value===g.uid,class:se(v(g)>0?"text-accent":""),color:"accent",variant:"text",onClick:w=>R(g)},{default:t(()=>[e(Ye,{title:y(g),state:a(g),"unread-count":v(g),onReadFeed:w=>u(g),onRefreshFeed:w=>n.$emit("refreshFeed",g),onEditFeed:w=>n.$emit("editFeed",g),onDeleteFeed:w=>n.$emit("deleteFeed",g)},null,8,["title","state","unread-count","onReadFeed","onRefreshFeed","onEditFeed","onDeleteFeed"])]),_:2},1032,["active","class","onClick"])):T("",!0)],64))),256))]),_:1},8,["height"]))}}),xe=_({__name:"Feeds",props:{height:{},mobile:{type:Boolean}},emits:["openArticle"],setup(p,{emit:f}){const i=p,s=de(),l=G(),d=B(!1),m=M(()=>i.height-56-16-56-12*2),v=M({get:()=>l.filters.title,set:Le(y=>{l.filters.title=y??""},300)});function R(y){s.createDialog(He,{initialFeed:y},l.resumeFeedTimer)}async function u(y){await l.refreshFeed(y.name),l.resumeFeedTimer()}async function C(y){await l.deleteFeed(y.name),l.resumeFeedTimer()}return be(()=>{l.resumeFeedTimer()}),oe(()=>{l.pauseFeedTimer()}),(y,o)=>A(l).feeds.length?(r(),b(K,{key:1,id:"rss-articles",class:"pa-3",height:y.height},{default:t(()=>[e(P,{modelValue:v.value,"onUpdate:modelValue":o[1]||(o[1]=a=>v.value=a),label:y.$t("rssArticles.feeds.filters.title"),clearable:"","hide-details":""},null,8,["modelValue","label"]),e(W,{modelValue:A(l).filters.unread,"onUpdate:modelValue":o[2]||(o[2]=a=>A(l).filters.unread=a),label:y.$t("rssArticles.feeds.filters.unread"),"hide-details":""},null,8,["modelValue","label"]),y.mobile?(r(),S(L,{key:0},[e($e,{height:m.value,onArticleClicked:o[3]||(o[3]=a=>y.$emit("openArticle",a))},null,8,["height"]),e(Me,{modelValue:d.value,"onUpdate:modelValue":o[9]||(o[9]=a=>d.value=a),"max-height":"550"},{activator:t(({props:a})=>[e(F,N({class:"fab"},a,{color:"accent",icon:"mdi-format-list-bulleted",size:"large"}),null,16)]),default:t(()=>[e(Ve,{onUpdate:o[4]||(o[4]=a=>d.value=!1),onCreateFeed:o[5]||(o[5]=()=>R()),onEditFeed:o[6]||(o[6]=a=>R(a)),onDeleteFeed:o[7]||(o[7]=a=>C(a)),onRefreshFeed:o[8]||(o[8]=a=>u(a))})]),_:1},8,["modelValue"])],64)):(r(),b(Q,{key:1},{default:t(()=>[e(I,{cols:"4"},{default:t(()=>[e(Ve,{height:m.value,onCreateFeed:o[10]||(o[10]=()=>R()),onEditFeed:o[11]||(o[11]=a=>R(a)),onDeleteFeed:o[12]||(o[12]=a=>C(a)),onRefreshFeed:o[13]||(o[13]=a=>u(a))},null,8,["height"])]),_:1}),e(I,{cols:"8"},{default:t(()=>[e($e,{height:m.value,onArticleClicked:o[14]||(o[14]=a=>y.$emit("openArticle",a))},null,8,["height"])]),_:1})]),_:1}))]),_:1},8,["height"])):(r(),b(K,{key:0,height:y.height},{default:t(()=>[e(Ae,{title:y.$t("rssArticles.feeds.empty.value"),icon:"mdi-rss-off"},{actions:t(()=>[e(F,{text:y.$t("rssArticles.feeds.empty.action"),color:"accent",onClick:o[0]||(o[0]=a=>R())},null,8,["text"])]),_:1},8,["title"])]),_:1},8,["height"]))}}),et=_({__name:"AddTorrentParamsDialog",props:{modelValue:{required:!0},modelModifiers:{},isOpened:{type:Boolean},isOpenedModifiers:{}},emits:["update:modelValue","update:isOpened"],setup(p){const f=fe(p,"modelValue"),i=fe(p,"isOpened"),{t:s}=le(),l=B();function d(){l.value?.saveFields(),i.value=!1}return(m,v)=>(r(),b(ee,{modelValue:i.value,"onUpdate:modelValue":v[1]||(v[1]=R=>i.value=R),class:se(m.$vuetify.display.mobile?"":"w-75"),fullscreen:m.$vuetify.display.mobile,scrollable:""},{default:t(()=>[e(K,null,{default:t(()=>[e(Z,{class:"ios-margin"},{default:t(()=>[e(me,{color:"transparent"},{default:t(()=>[e(he,null,{default:t(()=>[D(h(A(s)("dialogs.add.params.title")),1)]),_:1}),e(F,{icon:"mdi-close",onClick:d})]),_:1})]),_:1}),e(x,null,{default:t(()=>[e(Oe,{modelValue:f.value,"onUpdate:modelValue":v[0]||(v[0]=R=>f.value=R)},null,8,["modelValue"])]),_:1}),e(ie,{class:"mb-2"},{default:t(()=>[e(q),e(F,{text:m.$t("common.close"),color:"",variant:"flat",onClick:d},null,8,["text"])]),_:1})]),_:1})]),_:1},8,["modelValue","class","fullscreen"]))}});function tt(p){return{save_path:p?.save_path??"",skip_checking:!1,add_to_top_of_queue:p?.add_to_top_of_queue??!1,content_layout:p?.torrent_content_layout,stop_condition:p?.torrent_stop_condition,download_limit:p?.dl_limit,upload_limit:p?.up_limit,use_download_path:!!p?.temp_path,download_path:p?.temp_path?p?.temp_path:"",stopped:p?.start_paused_enabled,use_auto_tmm:p?.auto_tmm_enabled,ratio_limit:-2,seeding_time_limit:-2,inactive_seeding_time_limit:-2}}const lt={class:"d-flex"},at={class:"d-flex align-center"},nt={class:"v-card-title pa-0"},st=_({__name:"RssRuleDialog",props:{guid:{},initialRule:{}},setup(p){const f=p,i=M(()=>!!(f.initialRule&&f.initialRule.name)),{isOpened:s}=Fe(f.guid),{t:l}=le(),d=Ie(),m=G(),v=B(),R=B(!1),u=ae(a()),C=B(""),y=B([]),o=M(()=>{if(u.lastMatch==="")return l("dialogs.rss.rule.lastMatch.unknownValue").toString();const V=new Date().getTime()-new Date(u.lastMatch).getTime();return l("dialogs.rss.rule.lastMatch.knownValue",Math.floor(V/(1e3*60*60*24)))});function a(){return{affectedFeeds:[],enabled:!0,episodeFilter:"",ignoreDays:0,lastMatch:"",mustContain:"",mustNotContain:"",name:"",priority:0,smartFilter:!1,useRegex:!1,previouslyMatchedEpisodes:i.value?f.initialRule.previouslyMatchedEpisodes:[],torrentParams:tt(d.preferences)}}async function n(){if(C.value==="")return;const V=[],k=await m.fetchMatchingArticles(C.value);for(const $ in k){const X=k[$];V.length>0&&V.push({type:"divider"}),V.push({type:"subheader",value:$});for(const we in X){const De=X[we];V.push({type:"item",value:De})}}y.value=V}async function c(){R.value&&((i.value||C.value!=="")&&C.value!==u.name&&await m.renameRule(C.value,u.name),await m.setRule(u.name,u),C.value=u.name,await m.fetchRules(),await n())}async function g(){u.affectedFeeds=[]}async function w(){u.affectedFeeds=m.feeds.map(V=>V.url)}const te=()=>{s.value=!1};return ne(async()=>{await m.fetchFeeds(),i.value&&(C.value=f.initialRule.name,Object.assign(u,f.initialRule)),await n()}),(V,k)=>(r(),b(ee,{modelValue:A(s),"onUpdate:modelValue":k[13]||(k[13]=$=>Y(s)?s.value=$:null)},{default:t(()=>[e(K,null,{default:t(()=>[e(Z,null,{default:t(()=>[e(me,{color:"transparent",title:V.$t(`dialogs.rss.rule.title.${V.initialRule?"edit":"create"}`)},{default:t(()=>[e(F,{icon:"mdi-close",onClick:te})]),_:1},8,["title"])]),_:1}),e(x,null,{default:t(()=>[e(A(Re),{modelValue:R.value,"onUpdate:modelValue":k[11]||(k[11]=$=>R.value=$),ref_key:"form",ref:v,onSubmit:k[12]||(k[12]=j(()=>{},["prevent"]))},{default:t(()=>[e(Q,null,{default:t(()=>[e(I,{cols:"12",sm:"6",class:"scrollable-col"},{default:t(()=>[e(P,{modelValue:u.name,"onUpdate:modelValue":k[0]||(k[0]=$=>u.name=$),autofocus:"",required:"",label:V.$t("dialogs.rss.rule.name")},null,8,["modelValue","label"]),U("div",lt,[e(Pe,{modelValue:u.enabled,"onUpdate:modelValue":k[1]||(k[1]=$=>u.enabled=$),color:"accent",inset:"","hide-details":"",label:V.$t("dialogs.rss.rule.enabled")},null,8,["modelValue","label"]),e(q),U("div",at,[e(F,{class:"d-flex align-center justify-center",color:"accent"},{default:t(()=>[D(h(V.$t("dialogs.add.params.title"))+" ",1),e(et,{modelValue:u.torrentParams,"onUpdate:modelValue":k[2]||(k[2]=$=>u.torrentParams=$),activator:"parent"},null,8,["modelValue"])]),_:1})])]),e(z),e(W,{modelValue:u.useRegex,"onUpdate:modelValue":k[3]||(k[3]=$=>u.useRegex=$),"hide-details":"",label:V.$t("dialogs.rss.rule.useRegex")},null,8,["modelValue","label"]),e(P,{modelValue:u.mustContain,"onUpdate:modelValue":k[4]||(k[4]=$=>u.mustContain=$),label:V.$t("dialogs.rss.rule.mustContain")},null,8,["modelValue","label"]),e(P,{modelValue:u.mustNotContain,"onUpdate:modelValue":k[5]||(k[5]=$=>u.mustNotContain=$),label:V.$t("dialogs.rss.rule.mustNotContain")},null,8,["modelValue","label"]),e(W,{modelValue:u.smartFilter,"onUpdate:modelValue":k[6]||(k[6]=$=>u.smartFilter=$),"hide-details":"",label:V.$t("dialogs.rss.rule.smartFilter")},null,8,["modelValue","label"]),e(P,{modelValue:u.episodeFilter,"onUpdate:modelValue":k[7]||(k[7]=$=>u.episodeFilter=$),placeholder:V.$t("dialogs.rss.rule.episodeFilterPlaceholder"),label:V.$t("dialogs.rss.rule.episodeFilter")},null,8,["modelValue","placeholder","label"]),e(z,{class:"mb-4"}),e(P,{modelValue:u.ignoreDays,"onUpdate:modelValue":k[8]||(k[8]=$=>u.ignoreDays=$),modelModifiers:{number:!0},type:"number",hint:V.$t("dialogs.rss.rule.ignoreDaysHint"),label:V.$t("dialogs.rss.rule.ignoreDays")},null,8,["modelValue","hint","label"]),e(P,{modelValue:o.value,"onUpdate:modelValue":k[9]||(k[9]=$=>o.value=$),disabled:"",label:V.$t("dialogs.rss.rule.lastMatch.label")},null,8,["modelValue","label"]),e(z),e(ge,null,{default:t(()=>[D(h(V.$t("dialogs.rss.rule.affectedFeedsSubheader")),1)]),_:1}),e(Q,null,{default:t(()=>[e(I,{cols:"6",class:"d-flex align-center justify-center"},{default:t(()=>[e(F,{color:"accent",onClick:w},{default:t(()=>[D(h(V.$t("common.selectAll")),1)]),_:1})]),_:1}),e(I,{cols:"6",class:"d-flex align-center justify-center"},{default:t(()=>[e(F,{color:"primary",onClick:g},{default:t(()=>[D(h(V.$t("common.selectNone")),1)]),_:1})]),_:1})]),_:1}),(r(!0),S(L,null,J(A(m).feeds,$=>(r(),b(W,{modelValue:u.affectedFeeds,"onUpdate:modelValue":k[10]||(k[10]=X=>u.affectedFeeds=X),multiple:"","hide-details":"",label:$.name,value:$.url},null,8,["modelValue","label","value"]))),256))]),_:1}),e(z,{vertical:!V.$vuetify.display.mobile},null,8,["vertical"]),e(I,{cols:"12",sm:"6",class:"scrollable-col"},{default:t(()=>[U("div",nt,h(V.$t("dialogs.rss.rule.matchingArticles.title")),1),e(ue,null,{default:t(()=>[(r(!0),S(L,null,J(y.value,$=>(r(),S(L,null,[$.type==="divider"?(r(),b(z,{key:0})):$.type==="subheader"?(r(),b(ge,{key:1,inset:""},{default:t(()=>[D(h($.value),1)]),_:2},1024)):(r(),b(H,{key:2,class:"mb-3"},{default:t(()=>[D(h($.value),1)]),_:2},1024))],64))),256)),y.value.length===0?(r(),b(H,{key:0,title:V.$t("dialogs.rss.rule.matchingArticles.noMatch")},null,8,["title"])):T("",!0)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(ie,null,{default:t(()=>[e(q),e(F,{color:"error",onClick:te},{default:t(()=>[D(h(V.$t("common.close")),1)]),_:1}),e(F,{color:"accent",onClick:c},{default:t(()=>[D(h(V.$t("common.save")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]))}}),ot=Be(st,[["__scopeId","data-v-84a6e76c"]]),it={class:"pl-4"},rt=_({__name:"Rule",props:{value:{}},emits:["openRule"],setup(p){const f=G();async function i(l){await f.setRule(l.name,{...l,enabled:!l.enabled}),f.resumeRuleTimer()}async function s(l){await f.deleteRule(l.name),f.resumeRuleTimer()}return(l,d)=>(r(),b(je,{rounded:"xl",class:"d-flex align-center"},{default:t(()=>[U("div",it,h(l.value.name),1),e(q),U("div",null,[e(F,{class:"my-2 mr-2",icon:l.value.enabled?"mdi-check":"mdi-cancel",color:l.value.enabled?"accent":"red",variant:"plain",density:"compact",onClick:d[0]||(d[0]=m=>i(l.value))},null,8,["icon","color"]),e(O,{text:l.$t("common.edit"),location:"top"},{activator:t(({props:m})=>[e(F,N(m,{class:"my-2 mr-2",icon:"mdi-pencil",variant:"plain",density:"compact",onClick:d[1]||(d[1]=v=>l.$emit("openRule",l.value))}),null,16)]),_:1},8,["text"]),e(O,{text:l.$t("common.delete"),location:"top"},{activator:t(({props:m})=>[e(F,N(m,{class:"my-2 mr-2",icon:"mdi-delete",color:"red",variant:"plain",density:"compact",onClick:d[2]||(d[2]=v=>s(l.value))}),null,16)]),_:1},8,["text"])])]),_:1}))}}),ut=_({__name:"Rules",props:{height:{}},setup(p){const f=de(),i=G();function s(l){f.createDialog(ot,{initialRule:l},i.resumeRuleTimer)}return ne(()=>{i.resumeRuleTimer()}),oe(()=>{i.pauseRuleTimer()}),(l,d)=>A(i).rules.length?(r(),S(L,{key:1},[e(Q,{class:"mt-2"},{default:t(()=>[(r(!0),S(L,null,J(A(i).rules,m=>(r(),b(I,{cols:"12",sm:"6",lg:"3"},{default:t(()=>[e(rt,{value:m,onOpenRule:s},null,8,["value"])]),_:2},1024))),256))]),_:1}),e(Q,null,{default:t(()=>[e(I,{cols:"12",class:"d-flex align-center justify-center"},{default:t(()=>[e(F,{color:"accent",onClick:d[1]||(d[1]=m=>s())},{default:t(()=>[D(h(l.$t("rssArticles.rules.empty.action")),1)]),_:1})]),_:1})]),_:1})],64)):(r(),b(K,{key:0,height:l.height},{default:t(()=>[e(Ae,{title:l.$t("rssArticles.rules.empty.value"),icon:"mdi-rss-off"},{actions:t(()=>[e(F,{text:l.$t("rssArticles.rules.empty.action"),color:"accent",onClick:d[0]||(d[0]=m=>s())},null,8,["text"])]),_:1},8,["title"])]),_:1},8,["height"]))}}),dt={class:"pa-3"},mt={class:"subtitle-1 ml-2",style:{"font-size":"1.6em !important"}},ct={class:"d-flex justify-end"},ft=["innerHTML"],$t=_({__name:"RssArticles",setup(p){const{height:f,mobile:i}=Ge({mobileBreakpoint:"md"}),s=ye(),l=ke(),d=de(),m=G(),v=B(!1),R=ae({title:"",content:""}),u=M(()=>s.params.tab!=="rules"),C=M(()=>f.value-64-12*2-48);function y(c){c.description&&(R.title=c.title.trim(),R.content=c.description.trim(),v.value=!0)}function o(){const c=s.params.tab==="rules"?"feeds":"rules";l.replace({name:"rssArticles",params:{tab:c}}),m.lastView=c}function a(){l.push({name:"dashboard"})}function n(c){if(d.hasActiveDialog||v.value)return!1;c.key==="Escape"&&a()}return be(()=>{document.addEventListener("keydown",n)}),oe(()=>{document.removeEventListener("keydown",n)}),(c,g)=>(r(),S(L,null,[U("div",dt,[e(Q,{align:"center",justify:"center","no-gutters":""},{default:t(()=>[e(I,null,{default:t(()=>[U("h1",mt,h(u.value?c.$t("rssArticles.feeds.title"):c.$t("rssArticles.rules.title")),1)]),_:1}),e(I,null,{default:t(()=>[U("div",ct,[e(O,{text:c.$t(u.value?"rssArticles.toggle.rules":"rssArticles.toggle.feeds"),location:"top"},{activator:t(({props:w})=>[e(F,N(w,{icon:"mdi-auto-download",variant:"plain",onClick:g[0]||(g[0]=te=>o())}),null,16)]),_:1},8,["text"]),e(F,{icon:"mdi-close",variant:"plain",onClick:g[1]||(g[1]=w=>a())})])]),_:1})]),_:1}),u.value?(r(),b(xe,{key:0,height:C.value,mobile:A(i),onOpenArticle:y},null,8,["height","mobile"])):(r(),b(ut,{key:1,height:C.value},null,8,["height"]))]),e(ee,{modelValue:v.value,"onUpdate:modelValue":g[3]||(g[3]=w=>v.value=w)},{default:t(()=>[e(K,null,{default:t(()=>[e(Z,null,{default:t(()=>[e(me,{color:"transparent"},{default:t(()=>[e(he,null,{default:t(()=>[D(h(R.title),1)]),_:1}),e(F,{icon:"mdi-close",onClick:g[2]||(g[2]=w=>v.value=!1)})]),_:1})]),_:1}),e(x,null,{default:t(()=>[U("div",{class:"description-container",innerHTML:R.content},null,8,ft)]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}});export{$t as default};