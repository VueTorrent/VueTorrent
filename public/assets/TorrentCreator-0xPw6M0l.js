import{a0 as ye,d as R,h as te,Z as ve,_ as Se,u as a,B as d,D as c,r as _e,c as K,G as e,m as t,I as p,J as u,K as Q,M as E,N as F,F as U,O as he,P as Te,Q as Fe,H as xe,q as we,S as b,X as Le,n as se,T as ne}from"./vue-CJBpm4Ke.js";import{$ as A,G as ae,a9 as De,aa as ze,a as me,c as Ue,u as ce,ab as x,a5 as pe,d as M,e as J,J as W,K as X,k as v,f as Z,g as Ae,q as fe,s as V,x as B,v as ie,ac as j,ad as H,i as Ie,l as ee,F as Pe,o as He,ae as Ne,p as Ee,af as w,r as Y,ag as Me,j as q,t as N,a0 as Re,ah as de,ai as Be,V as L,D as G,aj as $e,ak as Oe}from"./index-CcMEnilb.js";import{a as je}from"./vuetify-eXHdHaKk.js";var ke=(g=>(g.ALL="all",g.ONLY_FILES="files",g.ONLY_DIRECTORIES="dirs",g))(ke||{});const Ve=ye("torrentCreator",()=>{const g=R([]);async function S(){g.value=await A.getTorrentCreatorStatus()}async function C(f){return await A.addTorrentCreatorTask(f)}async function l(f){return await A.deleteTorrentCreatorTask(f)}async function _(f){return await A.getTorrentCreatorOutput(f)}return{tasks:g,fetchTasks:S,createTask:C,deleteTask:l,downloadTorrent:_}}),ue=te({__name:"ServerPathField",props:ve({title:{}},{modelValue:{required:!0},modelModifiers:{}}),emits:["update:modelValue"],setup(g){const S=Se(g,"modelValue"),C=R([]),l=ae(),_=De(async f=>{if(!f)return;const k=await A.getDirectoryContent(f,ke.ALL);k&&(C.value=k)},500);return(f,k)=>a(l).usesQbit5?(d(),c(ze,{key:0,modelValue:S.value,"onUpdate:modelValue":k[0]||(k[0]=y=>S.value=y),items:C.value,label:f.title,"onUpdate:search":a(_)},null,8,["modelValue","items","label","onUpdate:search"])):(d(),c(me,{key:1,modelValue:S.value,"onUpdate:modelValue":k[1]||(k[1]=y=>S.value=y),label:f.title},null,8,["modelValue","label"]))}}),Ye=te({__name:"TorrentCreatorFormDialog",props:{guid:{}},setup(g){const S=g,{isOpened:C}=Ue(S.guid),{t:l}=ce(),_=ae(),f=Ve(),k=R(),y=R(!1),n=_e({sourcePath:"",format:x.HYBRID,pieceSize:0,optimizeAlignment:!1,paddedFileSizeLimit:0,private:!1,startSeeding:!1,torrentFilePath:"",trackers:"",urlSeeds:"",source:"",comment:""}),I=[{title:l("constants.torrentFormat.v1"),value:x.V1},{title:l("constants.torrentFormat.v2"),value:x.V2},{title:l("constants.torrentFormat.hybrid"),value:x.HYBRID}],D=K(()=>{const T=[{title:l("common.auto"),value:0}];for(let r=16*1024;r<5e8;r*=2)T.push({title:pe(r,!0,0),value:r});return T}),$=[T=>!T||T<-1||l("dialogs.torrentCreator.paddedFileSizeLimitRule")];async function P(){y.value&&(await f.createTask(n),z())}const z=()=>{C.value=!1};return(T,r)=>(d(),c(ee,{modelValue:a(C),"onUpdate:modelValue":r[14]||(r[14]=s=>he(C)?C.value=s:null),"max-width":"1250"},{default:e(()=>[t(M,null,{default:e(()=>[t(J,{class:"ios-margin"},{default:e(()=>[t(W,{color:"transparent"},{default:e(()=>[t(X,null,{default:e(()=>[p(u(a(l)("dialogs.torrentCreator.title")),1)]),_:1}),t(v,{icon:"mdi-close",onClick:z})]),_:1})]),_:1}),t(Z,null,{default:e(()=>[t(a(Ae),{modelValue:y.value,"onUpdate:modelValue":r[12]||(r[12]=s=>y.value=s),ref_key:"form",ref:k,onSubmit:r[13]||(r[13]=Q(()=>{},["prevent"]))},{default:e(()=>[t(fe,null,{default:e(()=>[t(V,{cols:"12"},{default:e(()=>[t(ue,{modelValue:n.sourcePath,"onUpdate:modelValue":r[0]||(r[0]=s=>n.sourcePath=s),title:a(l)("dialogs.torrentCreator.sourcePath"),rules:[s=>!!s||a(l)("dialogs.torrentCreator.rules.sourcePathRequired")]},null,8,["modelValue","title","rules"])]),_:1}),t(V,{cols:"12"},{default:e(()=>[t(ue,{modelValue:n.torrentFilePath,"onUpdate:modelValue":r[1]||(r[1]=s=>n.torrentFilePath=s),title:a(l)("dialogs.torrentCreator.torrentFilePath"),rules:[s=>!s||s.endsWith(".torrent")||a(l)("dialogs.torrentCreator.rules.outputFileExtension")]},null,8,["modelValue","title","rules"])]),_:1}),t(B),a(_).usesLibtorrent2?(d(),c(V,{key:0,cols:"12",sm:"6",class:"pb-0"},{default:e(()=>[t(ie,{modelValue:n.format,"onUpdate:modelValue":r[2]||(r[2]=s=>n.format=s),"hide-details":"",items:I,label:a(l)("dialogs.torrentCreator.format")},null,8,["modelValue","label"])]),_:1})):E("",!0),t(V,{cols:"12",sm:a(_).usesLibtorrent2?6:void 0,class:"pb-0"},{default:e(()=>[t(ie,{modelValue:n.pieceSize,"onUpdate:modelValue":r[3]||(r[3]=s=>n.pieceSize=s),"hide-details":"",items:D.value,label:a(l)("dialogs.torrentCreator.pieceSize")},null,8,["modelValue","items","label"])]),_:1},8,["sm"]),a(_).usesLibtorrent1?(d(),F(U,{key:1},[t(V,{cols:"12",sm:"6",class:"py-0"},{default:e(()=>[t(j,{modelValue:n.optimizeAlignment,"onUpdate:modelValue":r[4]||(r[4]=s=>n.optimizeAlignment=s),"hide-details":"",label:a(l)("dialogs.torrentCreator.optimizeAlignment")},null,8,["modelValue","label"])]),_:1}),t(V,{cols:"12",sm:"6",class:"py-0"},{default:e(()=>[t(me,{modelValue:n.paddedFileSizeLimit,"onUpdate:modelValue":r[5]||(r[5]=s=>n.paddedFileSizeLimit=s),modelModifiers:{number:!0},min:"-1",rules:$,label:a(l)("dialogs.torrentCreator.paddedFileSizeLimit"),hint:a(l)("dialogs.torrentCreator.paddedFileSizeLimitHint"),suffix:"kiB"},null,8,["modelValue","label","hint"])]),_:1})],64)):E("",!0),t(V,{cols:"12",sm:"6",class:"py-0"},{default:e(()=>[t(j,{modelValue:n.private,"onUpdate:modelValue":r[6]||(r[6]=s=>n.private=s),"hide-details":"",label:a(l)("dialogs.torrentCreator.private")},null,8,["modelValue","label"])]),_:1}),t(V,{cols:"12",sm:"6",class:"py-0"},{default:e(()=>[t(j,{modelValue:n.startSeeding,"onUpdate:modelValue":r[7]||(r[7]=s=>n.startSeeding=s),"hide-details":"",label:a(l)("dialogs.torrentCreator.startSeeding")},null,8,["modelValue","label"])]),_:1}),t(B),t(V,{cols:"12"},{default:e(()=>[t(H,{modelValue:n.trackers,"onUpdate:modelValue":r[8]||(r[8]=s=>n.trackers=s),label:a(l)("dialogs.torrentCreator.trackers"),hint:a(l)("dialogs.torrentCreator.trackersHint")},null,8,["modelValue","label","hint"])]),_:1}),t(V,{cols:"12"},{default:e(()=>[t(H,{modelValue:n.urlSeeds,"onUpdate:modelValue":r[9]||(r[9]=s=>n.urlSeeds=s),"hide-details":"",label:a(l)("dialogs.torrentCreator.urlSeeds")},null,8,["modelValue","label"])]),_:1}),a(_).isFeatureAvailable("5.0.3")?(d(),c(V,{key:2,cols:"12"},{default:e(()=>[t(H,{modelValue:n.source,"onUpdate:modelValue":r[10]||(r[10]=s=>n.source=s),"hide-details":"",label:a(l)("dialogs.torrentCreator.source")},null,8,["modelValue","label"])]),_:1})):E("",!0),t(V,{cols:"12"},{default:e(()=>[t(H,{modelValue:n.comment,"onUpdate:modelValue":r[11]||(r[11]=s=>n.comment=s),"hide-details":"",label:a(l)("dialogs.torrentCreator.comment")},null,8,["modelValue","label"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),t(Ie,null,{default:e(()=>[t(v,{disabled:!y.value,color:"accent",onClick:P},{default:e(()=>[p(u(a(l)("dialogs.torrentCreator.actions.submit")),1)]),_:1},8,["disabled"]),t(v,{color:"error",onClick:z},{default:e(()=>[p(u(a(l)("common.close")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]))}}),qe={class:"pa-3"},Ge={style:{"font-size":"1.6em !important"},class:"subtitle-1 ml-2"},Ke={class:"d-flex justify-end"},Qe={class:"d-flex align-center flex-gap"},Je={class:"text-no-wrap"},We={class:"text-no-wrap"},Xe={class:"text-no-wrap"},Ze={class:"text-no-wrap"},et={key:1},tt={class:"text-no-wrap"},at={key:1},lt=["innerHTML"],ot=["innerHTML"],it=te({__name:"TorrentCreator",setup(g){const{height:S}=je(),C=Te(),{t:l}=ce(),_=ae(),f=Pe(),k=Ve(),{tasks:y}=Fe(k),n=He(),I=Ne(function*(){yield k.fetchTasks()}).drop(),{isActive:D,pause:$,resume:P}=Ee(I.perform,1e3,{immediate:!0,immediateCallback:!0}),z=P,T=K(()=>S.value-64-12*2-48),r=K(()=>[{key:"actions",sortable:!1},{title:l("torrentCreator.table.sourcePath"),key:"sourcePath"},{title:l("torrentCreator.table.status"),key:"status"},{title:l("torrentCreator.table.progress"),key:"progress"},_.usesLibtorrent2?{title:l("torrentCreator.table.format"),key:"format"}:{title:l("torrentCreator.table.optimizeAlignment"),key:"optimizeAlignment"},{title:l("torrentCreator.table.pieceSize"),key:"pieceSize"},{title:l("torrentCreator.table.private"),key:"private"},{title:l("torrentCreator.table.timeAdded"),key:"timeAdded"},{title:l("torrentCreator.table.timeStarted"),key:"timeStarted"},{title:l("torrentCreator.table.timeFinished"),key:"timeFinished"},{title:l("torrentCreator.table.trackers.header"),key:"trackers",sortable:!1},{title:l("torrentCreator.table.urlSeeds.header"),key:"urlSeeds",sortable:!1},{title:l("torrentCreator.table.source"),key:"source"},{title:l("torrentCreator.table.comment"),key:"comment"},{title:l("torrentCreator.table.errorMessage"),key:"errorMessage"}]),s={[w.FAILED]:"error",[w.RUNNING]:"torrent-ul_stalled",[w.QUEUED]:"warning",[w.FINISHED]:"success"},be={[x.V1]:"V1",[x.V2]:"V2",[x.HYBRID]:"Hybrid"};function le(){f.createDialog(Ye,{},k.fetchTasks)}async function ge(h){const m=await k.downloadTorrent(h.taskID),o=$e(h.torrentFilePath);let i;o&&o.endsWith(".torrent")?i=o.slice(0,-8):o?i=o:i=h.taskID,Oe(`${i}.torrent`,m)}async function Ce(h){await k.deleteTask(h.taskID),z()}const oe=()=>{C.push({name:"dashboard"})};function re(h){if(f.hasActiveDialog)return!1;h.key==="Escape"&&(h.preventDefault(),oe())}return xe(async()=>{document.addEventListener("keydown",re),I.perform()}),we(()=>{document.removeEventListener("keydown",re)}),(h,m)=>(d(),F("div",qe,[t(fe,{"no-gutters":"",align:"center",justify:"center"},{default:e(()=>[t(V,null,{default:e(()=>[b("h1",Ge,u(a(l)("torrentCreator.title")),1)]),_:1}),t(V,null,{default:e(()=>[b("div",Ke,[t(v,{icon:"mdi-close",variant:"plain",onClick:oe})])]),_:1})]),_:1}),a(y).length?(d(),c(Y,{key:1},{default:e(()=>[t(N,null,{default:e(()=>[b("div",Qe,[t(q),t(v,{color:"accent","prepend-icon":a(D)?"mdi-timer-pause":"mdi-timer-play",text:a(D)?a(l)("common.pause"):a(l)("common.resume"),onClick:m[1]||(m[1]=o=>a(D)?a($)():a(P)())},null,8,["prepend-icon","text"]),t(v,{color:"accent","prepend-icon":"mdi-plus",text:a(l)("torrentCreator.table.create"),onClick:le},null,8,["text"])])]),_:1}),t(B,{class:"my-3"}),t(N,{class:"text-select"},{default:e(()=>[t(Re,{"header-props":{class:"text-no-wrap"},mobile:null,headers:r.value,items:a(y),"multi-sort":"","footer-props":{itemsPerPageOptions:[10,25,50,100,-1]}},{"item.status":e(({item:o,value:i})=>[b("span",{class:Le(`text-${s[o.status]}`)},u(a(l)(`constants.torrentCreatorTaskStatus.${i.toLowerCase()}`)),3)]),"item.progress":e(({item:o,value:i})=>[o.status===a(w).RUNNING?(d(),c(de,{key:0,"model-value":i,color:s[o.status],height:20,rounded:"sm",style:{width:"10em"}},{default:e(()=>[p(u(i)+" % ",1)]),_:2},1032,["model-value","color"])):(d(),c(de,{key:1,"model-value":100,color:s[o.status],height:20,rounded:"sm",style:{width:"10em"}},{default:e(()=>[p(u(a(Be)(1)),1)]),_:2},1032,["color"]))]),"item.format":e(({value:o})=>[p(u(be[o]),1)]),"item.pieceSize":e(({value:o})=>[p(u(a(pe)(o,a(n).useBinarySize,0)),1)]),"item.private":e(({value:o})=>[o?(d(),c(L,{key:0,color:"accent"},{default:e(()=>m[2]||(m[2]=[p("mdi-check-bold")])),_:1})):(d(),c(L,{key:1,color:"error"},{default:e(()=>m[3]||(m[3]=[p("mdi-close-thick")])),_:1}))]),"item.optimizeAlignment":e(({value:o})=>[o?(d(),c(L,{key:0,color:"accent"},{default:e(()=>m[4]||(m[4]=[p("mdi-check-bold")])),_:1})):(d(),c(L,{key:1,color:"error"},{default:e(()=>m[5]||(m[5]=[p("mdi-close-thick")])),_:1}))]),"item.timeAdded":e(({value:o})=>[b("div",Je,u(a(G)(o).format(a(n).dateFormat)),1)]),"item.timeFinished":e(({value:o})=>[b("div",We,u(a(G)(o).format(a(n).dateFormat)),1)]),"item.timeStarted":e(({value:o})=>[b("div",Xe,u(a(G)(o).format(a(n).dateFormat)),1)]),"item.trackers":e(({value:o})=>[o&&o.length&&!o.every(i=>!i.length)?(d(),c(ee,{key:0},{activator:e(({props:i})=>[b("div",Ze,[b("span",null,u(a(l)("torrentCreator.table.trackers.activator",o.filter(O=>O.length).length)),1),t(L,se({class:"ml-1"},i),{default:e(()=>m[6]||(m[6]=[p("mdi-information")])),_:2},1040)])]),default:e(()=>[t(M,null,{default:e(()=>[t(J,{class:"ios-margin"},{default:e(()=>[t(W,{color:"transparent"},{default:e(()=>[t(X,null,{default:e(()=>[p(u(a(l)("torrentCreator.table.trackers.title")),1)]),_:1}),t(q),t(v,{icon:"mdi-close"})]),_:1})]),_:1}),t(Z,null,{default:e(()=>[t(Y,null,{default:e(()=>[(d(!0),F(U,null,ne(o,i=>(d(),F(U,null,[i?(d(),c(N,{key:0},{default:e(()=>[p(u(i),1)]),_:2},1024)):(d(),c(B,{key:1}))],64))),256))]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)):(d(),F("span",et,u(a(l)("common.none")),1))]),"item.urlSeeds":e(({value:o})=>[o&&o.length&&!o.every(i=>!i.length)?(d(),c(ee,{key:0},{activator:e(({props:i})=>[b("div",tt,[b("span",null,u(a(l)("torrentCreator.table.urlSeeds.activator",o.filter(O=>O.length).length)),1),t(L,se({class:"ml-1"},i),{default:e(()=>m[7]||(m[7]=[p("mdi-information")])),_:2},1040)])]),default:e(()=>[t(M,null,{default:e(()=>[t(J,{class:"ios-margin"},{default:e(()=>[t(W,{color:"transparent"},{default:e(()=>[t(X,null,{default:e(()=>[p(u(a(l)("torrentCreator.table.urlSeeds.title")),1)]),_:1}),t(q),t(v,{icon:"mdi-close"})]),_:1})]),_:1}),t(Z,null,{default:e(()=>[t(Y,null,{default:e(()=>[(d(!0),F(U,null,ne(o.filter(i=>i.length),i=>(d(),F(U,null,[i?(d(),c(N,{key:0},{default:e(()=>[p(u(i),1)]),_:2},1024)):E("",!0)],64))),256))]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)):(d(),F("span",at,u(a(l)("common.none")),1))]),"item.comment":e(({value:o})=>[b("div",{class:"text-no-wrap",innerHTML:o?.length?o.replaceAll(`
`,"<br>"):""},null,8,lt)]),"item.errorMessage":e(({value:o})=>[b("div",{class:"text-no-wrap",innerHTML:o?.length?o.replaceAll(`
`,"<br>"):""},null,8,ot)]),"item.actions":e(({item:o})=>[t(v,{disabled:o.status!==a(w).FINISHED,color:"accent",icon:"mdi-download",variant:"text",density:"compact",onClick:Q(i=>ge(o),["stop"])},null,8,["disabled","onClick"]),t(v,{color:"red",icon:"mdi-delete",variant:"text",density:"compact",onClick:Q(i=>Ce(o),["stop"])},null,8,["onClick"])]),_:2},1032,["headers","items"])]),_:1})]),_:1})):(d(),c(M,{key:0,height:T.value},{default:e(()=>[t(Me,{title:a(l)("torrentCreator.empty.value"),color:"accent",icon:"mdi-cog-off"},{actions:e(()=>[t(v,{text:a(l)("torrentCreator.empty.action"),color:"accent",onClick:m[0]||(m[0]=o=>le())},null,8,["text"])]),_:1},8,["title"])]),_:1},8,["height"]))]))}});export{it as default};
