import{A as B,$ as r,a2 as b,a7 as p,Z as u,V as x,c as w,a0 as T,a1 as o,F as K,a3 as X,u as n,D as a,R as je,I as R,a5 as Ae,ab as Ye,a4 as N,ac as Ee,ad as Me,r as F,d as Re,C as be,h as Le,Y as j,ag as ge,i as ne,_ as Ne,ah as Xe,ai as Je,w as Qe,J as We,aj as Ze,q as Be,O as ve,Q as _e}from"./vue-aae79161.js";import{V as Se,_ as ke,u as J,f as et,a as tt,T as E,b as at,c as ot,d as lt,e as nt,g as re,h as Q,i as Ue,j as Te,k as H,l as ye,D as M,m as fe,n as $e,o as Fe,p as we,q as Y,r as Oe,s as Ve,t as He,v as se,w as Ke,x as I,y as ze,z as qe,A as rt,B as U,C as Ge,E as st,F as it,G as Ce,H as De,I as dt,J as ct,K as ut,L as Ie}from"./index-459370ca.js";import{_ as pt}from"./MoveTorrentDialog.vue_vue_type_script_setup_true_lang-e0427cb5.js";import{d as xe}from"./dayjs.min-33626328.js";import{u as mt}from"./ArrayPagination-7981c2a2.js";import{d as ht}from"./index-1e80ef0a.js";const vt={class:"d-flex flex-column"},_t={class:"text-caption text-grey"},ft={class:"text-caption text-grey"},gt=B({__name:"ItemAmount",props:{torrent:{},title:{},value:{},total:{}},setup(g){return(e,l)=>(r(),b("div",vt,[p("div",_t,u(e.$t(`torrent.properties.${e.title}`)),1),p("div",null,[x(u(e.torrent[e.value])+" ",1),p("span",ft," / "+u(e.torrent[e.total]),1)])]))}}),yt={class:"d-flex flex-column"},bt={class:"text-caption text-grey"},kt={class:"d-flex flex-row gap"},Tt=B({__name:"ItemChip",props:{torrent:{},title:{},value:{},color:{}},setup(g){const e=g,l=w(()=>{const t=e.torrent[e.value],m=typeof t;if(m==="string")return t.length>0?[t]:[];if(m==="object")return t});return(t,m)=>(r(),b("div",yt,[p("div",bt,u(t.$t(`torrent.properties.${t.title}`)),1),p("div",kt,[!l.value||l.value.length<1?(r(),T(Se,{key:0,color:t.color.replace("$1",t.torrent[t.value]),variant:"flat"},{default:o(()=>[x(u(t.$t(`torrent.properties.empty_${t.value}`)),1)]),_:1},8,["color"])):(r(!0),b(K,{key:1},X(l.value,y=>(r(),T(Se,{color:t.color.replace("$1",t.torrent.state),variant:"flat"},{default:o(()=>[x(u(y),1)]),_:2},1032,["color"]))),256))])]))}});const $t=ke(Tt,[["__scopeId","data-v-8eb4906a"]]),wt={class:"d-flex flex-column"},Vt={class:"text-caption text-grey"},xt={class:"text-caption text-grey"},Bt=B({__name:"ItemData",props:{torrent:{},title:{},value:{}},setup(g){const e=J();return(l,t)=>(r(),b("div",wt,[p("div",Vt,u(l.$t(`torrent.properties.${l.title}`)),1),p("div",null,[x(u(n(et)(l.torrent[l.value],n(e).useBinarySize))+" ",1),p("span",xt,u(n(tt)(l.torrent[l.value],n(e).useBinarySize)),1)])]))}}),St={class:"d-flex flex-column"},Ct={class:"text-caption text-grey"},Dt={key:0},It={key:1},Pt=B({__name:"ItemDateTime",props:{torrent:{},title:{},value:{}},setup(g){const e=J();return(l,t)=>(r(),b("div",St,[p("div",Ct,u(l.$t(`torrent.properties.${l.title}`)),1),p("div",null,[l.torrent[l.value]>0?(r(),b("span",Dt,u(n(xe)(l.torrent[l.value]*1e3).format(n(e).dateFormat??"DD/MM/YYYY, HH:mm:ss")),1)):(r(),b("span",It,u(l.$t("dashboard.not_complete")),1))])]))}}),At={class:"d-flex flex-column"},Et={class:"text-caption text-grey"},Mt={key:0},Rt={key:1},Lt="D[d] H[h] m[m] s[s]",Nt=B({__name:"ItemDuration",props:{torrent:{},title:{},value:{}},setup(g){return(e,l)=>(r(),b("div",At,[p("div",Et,u(e.$t(`torrent.properties.${e.title}`)),1),p("div",null,[e.torrent[e.value]>0?(r(),b("span",Mt,u(n(xe).duration(e.torrent[e.value],"seconds").format(Lt)),1)):(r(),b("span",Rt,u(e.$t("dashboard.not_complete")),1))])]))}}),Ut={class:"d-flex flex-column"},Ft={class:"text-caption text-grey"},Ot=B({__name:"ItemPercent",props:{torrent:{},title:{},value:{}},setup(g){const e=g,l=w(()=>[E.UPLOADING,E.CHECKING_UP,E.FORCED_UP,E.ALLOCATING,E.DOWNLOADING,E.META_DL,E.CHECKING_DL,E.FORCED_DL,E.CHECKING_RESUME_DATA,E.MOVING].includes(e.torrent.state));return(t,m)=>(r(),b("div",Ut,[p("div",Ft,u(t.$t(`torrent.properties.${t.title}`)),1),a(ot,{"model-value":t.torrent[t.value],max:1,striped:l.value,height:20,color:`torrent-${t.torrent.state}`,rounded:"sm",style:{width:"10em"}},{default:o(()=>[x(u(n(at)(t.torrent[t.value])),1)]),_:1},8,["model-value","striped","color"])]))}}),Ht={class:"d-flex flex-column"},Kt={class:"text-caption text-grey"},zt=B({__name:"ItemRelativeTime",props:{torrent:{},title:{},value:{}},setup(g){return(e,l)=>(r(),b("div",Ht,[p("div",Kt,u(e.$t(`torrent.properties.${e.title}`)),1),p("div",null,[p("span",null,u(n(xe)(e.torrent[e.value]*1e3).fromNow()),1)])]))}}),qt={class:"d-flex flex-column"},Gt={class:"text-caption text-grey"},jt={class:"text-caption text-grey"},Yt=B({__name:"ItemSpeed",props:{torrent:{},title:{},value:{}},setup(g){const e=J();return(l,t)=>(r(),b("div",qt,[p("div",Gt,u(l.$t(`torrent.properties.${l.title}`)),1),p("div",null,[x(u(n(lt)(l.torrent[l.value],n(e).useBitSpeed))+" ",1),p("span",jt,u(n(nt)(l.torrent[l.value],n(e).useBitSpeed)),1)])]))}}),Xt={class:"d-flex flex-column"},Jt={class:"text-caption text-grey"},Qt=B({__name:"ItemText",props:{torrent:{},title:{},value:{}},setup(g){return(e,l)=>(r(),b("div",Xt,[p("div",Jt,u(e.$t(`torrent.properties.${e.title}`)),1),p("div",null,u(e.torrent[e.value]),1)]))}}),Wt={class:"d-flex gap flex-wrap"},Zt=B({__name:"Torrent",props:{torrent:{}},setup(g){const e=g,l=re(),t=Q(),m=J(),y=w(()=>(e.torrent.progress===1?m.doneTorrentProperties:m.busyTorrentProperties).filter(k=>k.active).sort((k,v)=>k.order-v.order));function V(_){_.shiftKey?l.spanTorrentSelection(t.getTorrentIndexByHash(e.torrent.hash)):(ye(_)||l.isSelectionMultiple)&&(l.isSelectionMultiple=!0,l.toggleSelect(e.torrent.hash))}const c=_=>{switch(_){case M.AMOUNT:return gt;case M.CHIP:return $t;case M.DATA:return Bt;case M.DATETIME:return Pt;case M.DURATION:return Nt;case M.PERCENT:return Ot;case M.RELATIVE:return zt;case M.SPEED:return Yt;case M.TEXT:default:return Qt}},h=w(()=>l.isTorrentInSelection(e.torrent.hash));return(_,k)=>(r(),T(H,{class:Ae(`sideborder ${_.torrent.state} pointer`),color:h.value?`torrent-${_.torrent.state}-darken-3`:void 0,width:"100%",onClick:V},{default:o(()=>[a(Ue,{class:"font-weight-bold"},{default:o(()=>[x(u(_.torrent.name),1)]),_:1}),a(Te,null,{default:o(()=>[p("div",Wt,[(r(!0),b(K,null,X(y.value,v=>(r(),T(je(c(v.type)),R({torrent:_.torrent},v.props),null,16,["torrent"]))),256))])]),_:1})]),_:1},8,["class","color"]))}});const ea=ke(Zt,[["__scopeId","data-v-4ac323c1"]]),ta={class:"d-flex"},aa={key:2},oa={key:3},la=B({__name:"RightClickMenuEntry",props:{text:{},icon:{},action:{type:Function},hidden:{type:Boolean},disabled:{type:Boolean},disabledText:{},disabledIcon:{},divider:{type:Boolean},children:{}},setup(g){return(e,l)=>{const t=Ye("RightClickMenuEntry",!0);return e.hidden?N("",!0):(r(),T(Y,{key:0,class:"px-3 pointer",disabled:e.disabled,onClick:e.action},{default:o(()=>[p("div",ta,[e.disabled&&e.disabledIcon?(r(),T(fe,{key:0,class:"mr-2"},{default:o(()=>[x(u(e.disabledIcon),1)]),_:1})):e.icon?(r(),T(fe,{key:1,class:"mr-2"},{default:o(()=>[x(u(e.icon),1)]),_:1})):N("",!0),e.disabled&&e.disabledText?(r(),b("span",aa,u(e.disabledText),1)):(r(),b("span",oa,u(e.text),1)),a($e),e.children?(r(),T(fe,{key:4},{default:o(()=>[x("mdi-chevron-right")]),_:1})):N("",!0)]),e.children?(r(),T(Fe,{key:0,activator:"parent","open-on-hover":!0,"open-on-click":!0,"close-delay":"0","open-delay":"0",location:"right"},{default:o(()=>[a(we,null,{default:o(()=>[(r(!0),b(K,null,X(e.children,m=>(r(),T(t,Ee(Me(m)),null,16))),256))]),_:1})]),_:1})):N("",!0)]),_:1},8,["disabled","onClick"]))}}}),na=B({__name:"RenameTorrentDialog",props:{guid:{},hash:{}},setup(g){const e=g,{isOpened:l}=Oe(e.guid),{t}=Ve(),m=Q(),y=F(),V=F(),c=F(!1),h=Re({newName:""}),_=[$=>!!$||t("dialogs.renameTorrent.required"),$=>$!==v.value||t("dialogs.renameTorrent.sameName")],k=w(()=>m.getTorrentByHash(e.hash)),v=w(()=>k.value?.name);async function A(){await V.value?.validate(),c.value&&(await m.renameTorrent(e.hash,h.newName),S())}const S=()=>{l.value=!1};return be(()=>{h.newName=k.value?.name||""}),Le(()=>{y.value?.select()}),($,D)=>(r(),T(ze,{modelValue:n(l),"onUpdate:modelValue":D[3]||(D[3]=C=>ne(l)?l.value=C:null)},{default:o(()=>[a(H,null,{default:o(()=>[a(Ue,null,{default:o(()=>[x(u($.$t("dialogs.renameTorrent.title")),1)]),_:1}),a(Te,null,{default:o(()=>[a(n(He),{modelValue:c.value,"onUpdate:modelValue":D[1]||(D[1]=C=>c.value=C),ref_key:"form",ref:V,onSubmit:D[2]||(D[2]=j(()=>{},["prevent"]))},{default:o(()=>[v.value?(r(),T(se,{key:0,"model-value":v.value,disabled:"",label:$.$t("dialogs.renameTorrent.oldName")},null,8,["model-value","label"])):N("",!0),a(se,{modelValue:h.newName,"onUpdate:modelValue":D[0]||(D[0]=C=>h.newName=C),ref_key:"field",ref:y,rules:_,autofocus:"",label:$.$t("dialogs.renameTorrent.newName"),onKeydown:ge(A,["enter"])},null,8,["modelValue","label","onKeydown"])]),_:1},8,["modelValue"])]),_:1}),a(Ke,null,{default:o(()=>[a($e),a(I,{color:"error",onClick:S},{default:o(()=>[x(u($.$t("common.cancel")),1)]),_:1}),a(I,{color:"accent",disabled:!c.value,onClick:A},{default:o(()=>[x(u($.$t("common.save")),1)]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["modelValue"]))}}),Pe=B({__name:"SpeedLimitDialog",props:{guid:{},hash:{},mode:{}},setup(g){const e=g,{isOpened:l}=Oe(e.guid),t=Q(),m=F(!1),y=F(0);function V(){l.value=!1}async function c(){const h=Math.max(0,y.value)*1e3;switch(e.mode){case"download":await t.setDownloadLimit(h,[e.hash]);break;case"upload":await t.setUploadLimit(h,[e.hash]);break}V()}return be(async()=>{const h=t.getTorrentByHash(e.hash);if(!h)return V();switch(e.mode){case"download":y.value=Math.max(0,Math.round(h.dl_limit/1e3));break;case"upload":y.value=Math.max(0,Math.round(h.up_limit/1e3));break}}),(h,_)=>(r(),T(ze,{modelValue:n(l),"onUpdate:modelValue":_[3]||(_[3]=k=>ne(l)?l.value=k:null)},{default:o(()=>[a(H,{title:h.$t(`dialogs.speed_limit.${h.mode}`)},{default:o(()=>[a(Te,null,{default:o(()=>[a(He,{modelValue:m.value,"onUpdate:modelValue":_[1]||(_[1]=k=>m.value=k),onSubmit:_[2]||(_[2]=j(()=>{},["prevent"])),onKeydown:ge(j(c,["prevent"]),["enter"])},{default:o(()=>[a(se,{modelValue:y.value,"onUpdate:modelValue":_[0]||(_[0]=k=>y.value=k),type:"number",autofocus:"",clearable:"",label:h.$t("dialogs.speed_limit.label"),"prepend-inner-icon":"mdi-speedometer",suffix:"kB/s",onKeydown:ge(j(c,["prevent"]),["enter"])},null,8,["modelValue","label","onKeydown"])]),_:1},8,["modelValue","onKeydown"])]),_:1}),a(Ke,null,{default:o(()=>[a($e),a(I,{color:"error",onClick:V},{default:o(()=>[x(u(h.$t("common.cancel")),1)]),_:1}),a(I,{color:"accent",disabled:!m.value,onClick:c},{default:o(()=>[x(u(h.$t("common.save")),1)]),_:1},8,["disabled"])]),_:1})]),_:1},8,["title"])]),_:1},8,["modelValue"]))}}),ie=g=>(Xe("data-v-8cd29428"),g=g(),Je(),g),ra={class:"d-flex justify-space-around"},sa=ie(()=>p("span",null,"Resume",-1)),ia=ie(()=>p("span",null,"Force Resume",-1)),da=ie(()=>p("span",null,"Pause",-1)),ca=ie(()=>p("span",null,"Delete",-1)),ua=B({__name:"RightClickMenu",props:{modelValue:{type:Boolean}},emits:["update:modelValue"],setup(g,{emit:e}){const l=g,{t}=Ve(),m=Ne(),y=re(),V=qe(),c=Q(),h=rt(),_=w({get:()=>l.modelValue,set:f=>e("update:modelValue",f)}),k=w(()=>y.selectedTorrents.length>1),v=w(()=>y.selectedTorrents),A=w(()=>v.value[0]),S=w(()=>c.getTorrentByHash(A.value)),$=w(()=>y.selectedTorrents.map(c.getTorrentByHash).filter(f=>!!f)),D=w(()=>[{name:""},...c.categories]);async function C(){await c.resumeTorrents(v)}async function P(){await c.forceResumeTorrents(v)}async function W(){await c.pauseTorrents(v)}function de(){V.createDialog(Ge,{hashes:[...y.selectedTorrents]})}function L(){V.createDialog(pt,{hashes:[...y.selectedTorrents]})}function Z(){V.createDialog(na,{hash:y.selectedTorrents[0]})}async function ce(){await c.recheckTorrents(v)}async function ee(){await c.reannounceTorrents(v)}async function O(){await c.toggleSeqDl(v)}async function ue(){await c.toggleFLPiecePrio(v)}async function pe(){await c.toggleAutoTmm(v,!S.value?.auto_tmm)}function te(f){return $.value.every(i=>i&&i.tags&&i.tags.includes(f))}async function z(f){te(f)?await c.removeTorrentTags(v.value,[f]):await c.addTorrentTags(v.value,[f])}async function q(f){await navigator.clipboard.writeText(f)}function me(){V.createDialog(Pe,{hash:A.value,mode:"download"})}function ae(){V.createDialog(Pe,{hash:A.value,mode:"upload"})}function oe(){}async function le(){v.value.forEach(f=>{c.exportTorrent(f).then(i=>{const s=window.URL.createObjectURL(i),d=document.createElement("a");d.href=s,d.style.opacity="0",d.setAttribute("download",`${f}.torrent`),document.body.appendChild(d),d.click(),document.body.removeChild(d)})})}const he=w(()=>[{text:t("dashboard.right_click.advanced.title"),icon:"mdi-head-cog",children:[{text:t("dashboard.right_click.advanced.change_location"),icon:"mdi-folder",action:L},{text:t("dashboard.right_click.advanced.rename"),icon:"mdi-rename-box",hidden:k.value,action:Z},{text:t("dashboard.right_click.advanced.recheck"),icon:"mdi-playlist-check",action:ce},{text:t("dashboard.right_click.advanced.reannounce"),icon:"mdi-bullhorn",action:ee},{text:t("dashboard.right_click.advanced.seq_dl"),icon:S.value?.seq_dl?"mdi-checkbox-marked":"mdi-checkbox-blank-outline",action:O},{text:t("dashboard.right_click.advanced.f_l_prio"),icon:S.value?.f_l_piece_prio?"mdi-checkbox-marked":"mdi-checkbox-blank-outline",action:ue},{text:t("dashboard.right_click.advanced.auto_tmm"),icon:S.value?.auto_tmm?"mdi-checkbox-marked":"mdi-checkbox-blank-outline",action:pe}]},{text:t("dashboard.right_click.priority.title"),icon:"mdi-priority-high",hidden:!h.preferences.queueing_enabled,children:[{text:t("dashboard.right_click.priority.top"),icon:"mdi-priority-high",action:async()=>await c.setTorrentPriority(v.value,"topPrio")},{text:t("dashboard.right_click.priority.increase"),icon:"mdi-arrow-up",action:async()=>await c.setTorrentPriority(v.value,"increasePrio")},{text:t("dashboard.right_click.priority.decrease"),icon:"mdi-arrow-down",action:async()=>await c.setTorrentPriority(v.value,"decreasePrio")},{text:t("dashboard.right_click.priority.bottom"),icon:"mdi-priority-low",action:async()=>await c.setTorrentPriority(v.value,"bottomPrio")}]},{text:t("dashboard.right_click.tags.title"),icon:"mdi-tag",disabled:c.tags.length===0,disabledText:t("dashboard.right_click.tags.disabled_title"),disabledIcon:"mdi-tag-off",children:c.tags.map(f=>({text:f,icon:te(f)?"mdi-checkbox-marked":"mdi-checkbox-blank-outline",action:async()=>await z(f)}))},{text:t("dashboard.right_click.category.title"),icon:"mdi-label",disabled:c.categories.length===0,disabledText:t("dashboard.right_click.category.disabled_title"),disabledIcon:"mdi-label-off",children:D.value.map(f=>({text:f.name===""?t("dashboard.right_click.category.clear"):f.name,action:async()=>await c.setTorrentCategory(v.value,f.name)}))},{text:t("dashboard.right_click.speed_limit.title"),icon:"mdi-speedometer-slow",children:[{text:t("dashboard.right_click.speed_limit.download"),icon:"mdi-download",action:me},{text:t("dashboard.right_click.speed_limit.upload"),icon:"mdi-upload",action:ae},{text:t("dashboard.right_click.speed_limit.share"),icon:"mdi-account-group",hidden:!0,action:oe}]},{text:t("dashboard.right_click.copy.title"),icon:"mdi-content-copy",hidden:k.value,children:[{text:t("dashboard.right_click.copy.name"),icon:"mdi-alphabetical-variant",action:async()=>S.value&&await q(S.value.name)},{text:t("dashboard.right_click.copy.hash"),icon:"mdi-pound",action:async()=>await q(A.value)},{text:t("dashboard.right_click.copy.magnet"),icon:"mdi-magnet",action:async()=>S.value&&await q(S.value.magnet)}]},{text:t("dashboard.right_click.export",y.selectedTorrents.length),icon:k.value?"mdi-download-multiple":"mdi-download",action:le},{text:t("dashboard.right_click.info"),icon:"mdi-information",hidden:k.value,action:()=>m.push({name:"torrentDetail",params:{hash:A.value}})}]);return(f,i)=>_.value?(r(),T(Fe,{key:0,modelValue:_.value,"onUpdate:modelValue":i[0]||(i[0]=s=>_.value=s),activator:"parent","close-on-content-click":!0,transition:"slide-y-transition","scroll-strategy":"none"},{default:o(()=>[a(we,null,{default:o(()=>[a(Y,null,{default:o(()=>[p("div",ra,[a(U,{location:"top"},{activator:o(({props:s})=>[a(I,R({density:"compact",variant:"plain",icon:"mdi-play"},s,{onClick:C}),null,16)]),default:o(()=>[sa]),_:1}),a(U,{location:"top"},{activator:o(({props:s})=>[a(I,R({density:"compact",variant:"plain",icon:"mdi-fast-forward"},s,{onClick:P}),null,16)]),default:o(()=>[ia]),_:1}),a(U,{location:"top"},{activator:o(({props:s})=>[a(I,R({density:"compact",variant:"plain",icon:"mdi-pause"},s,{onClick:W}),null,16)]),default:o(()=>[da]),_:1}),a(U,{location:"top"},{activator:o(({props:s})=>[a(I,R({color:"red",density:"compact",variant:"plain",icon:"mdi-delete-forever"},s,{onClick:de}),null,16)]),default:o(()=>[ca]),_:1})])]),_:1}),(r(!0),b(K,null,X(he.value,s=>(r(),T(la,Ee(Me(s)),null,16))),256))]),_:1})]),_:1},8,["modelValue"])):N("",!0)}});const pa=ke(ua,[["__scopeId","data-v-8cd29428"]]),ma={class:"pt-4 px-1 px-sm-5"},ha={class:"pa-0",style:{width:"10em"}},va={class:"text-uppercase",style:{float:"right","font-size":"0.8em"}},_a={class:"text-grey"},fa={key:0,class:"mt-5 text-xs-center"},ga={class:"text-grey"},ya={key:1},ba={class:"d-flex align-center"},Ba=B({__name:"Dashboard",setup(g){const{t:e}=Ve(),l=Ne(),t=st(),m=re(),y=qe(),{currentPage:V,filteredTorrents:c,isSelectionMultiple:h,searchFilter:_,selectedTorrents:k,sortOptions:v,torrentCountString:A}=it(re()),S=Q(),$=J(),D=[{value:"added_on",title:e("dashboard.sortBy.added_on")},{value:"amount_left",title:e("dashboard.sortBy.amount_left")},{value:"auto_tmm",title:e("dashboard.sortBy.auto_tmm")},{value:"availability",title:e("dashboard.sortBy.availability")},{value:"avg_download_speed",title:e("dashboard.sortBy.avg_download_speed")},{value:"avg_upload_speed",title:e("dashboard.sortBy.avg_upload_speed")},{value:"category",title:e("dashboard.sortBy.category")},{value:"completed",title:e("dashboard.sortBy.completed")},{value:"completion_on",title:e("dashboard.sortBy.completion_on")},{value:"content_path",title:e("dashboard.sortBy.content_path")},{value:"dl_limit",title:e("dashboard.sortBy.dl_limit")},{value:"dlspeed",title:e("dashboard.sortBy.dlspeed")},{value:"download_path",title:e("dashboard.sortBy.download_path")},{value:"downloaded",title:e("dashboard.sortBy.downloaded")},{value:"downloaded_session",title:e("dashboard.sortBy.downloaded_session")},{value:"eta",title:e("dashboard.sortBy.eta")},{value:"f_l_piece_prio",title:e("dashboard.sortBy.f_l_piece_prio")},{value:"force_start",title:e("dashboard.sortBy.force_start")},{value:"globalSpeed",title:e("dashboard.sortBy.globalSpeed")},{value:"globalVolume",title:e("dashboard.sortBy.globalVolume")},{value:"hash",title:e("dashboard.sortBy.hash")},{value:"infohash_v1",title:e("dashboard.sortBy.infohash_v1")},{value:"infohash_v2",title:e("dashboard.sortBy.infohash_v2")},{value:"last_activity",title:e("dashboard.sortBy.last_activity")},{value:"magnet_uri",title:e("dashboard.sortBy.magnet_uri")},{value:"max_ratio",title:e("dashboard.sortBy.max_ratio")},{value:"max_seeding_time",title:e("dashboard.sortBy.max_seeding_time")},{value:"name",title:e("dashboard.sortBy.name")},{value:"num_complete",title:e("dashboard.sortBy.num_complete")},{value:"num_incomplete",title:e("dashboard.sortBy.num_incomplete")},{value:"num_leechs",title:e("dashboard.sortBy.num_leechs")},{value:"num_seeds",title:e("dashboard.sortBy.num_seeds")},{value:"priority",title:e("dashboard.sortBy.priority")},{value:"progress",title:e("dashboard.sortBy.progress")},{value:"ratio",title:e("dashboard.sortBy.ratio")},{value:"ratio_limit",title:e("dashboard.sortBy.ratio_limit")},{value:"save_path",title:e("dashboard.sortBy.save_path")},{value:"seeding_time",title:e("dashboard.sortBy.seeding_time")},{value:"seeding_time_limit",title:e("dashboard.sortBy.seeding_time_limit")},{value:"seen_complete",title:e("dashboard.sortBy.seen_complete")},{value:"seq_dl",title:e("dashboard.sortBy.seq_dl")},{value:"size",title:e("dashboard.sortBy.size")},{value:"state",title:e("dashboard.sortBy.state")},{value:"super_seeding",title:e("dashboard.sortBy.super_seeding")},{value:"tags",title:e("dashboard.sortBy.tags")},{value:"time_active",title:e("dashboard.sortBy.time_active")},{value:"total_size",title:e("dashboard.sortBy.total_size")},{value:"tracker",title:e("dashboard.sortBy.tracker")},{value:"trackers_count",title:e("dashboard.sortBy.trackers_count")},{value:"up_limit",title:e("dashboard.sortBy.up_limit")},{value:"uploaded",title:e("dashboard.sortBy.uploaded")},{value:"uploaded_session",title:e("dashboard.sortBy.uploaded_session")},{value:"upspeed",title:e("dashboard.sortBy.upspeed")}].sort((i,s)=>i.title.localeCompare(s.title));D.splice(0,0,{value:"",title:e("dashboard.sortBy.default")});const C=F(!1),P=Re({isVisible:!1,offset:[0,0]}),W=w({get:()=>_.value,set:ht(i=>{_.value=i},300)}),{paginatedResults:de,currentPage:L,pageCount:Z}=mt(c,$.paginationSize,V),ce=w(()=>!!_.value&&_.value.length>0),ee=w(()=>c.value.length<=k.value.length);function O(i){C.value=i??!C.value,C.value&&Be(()=>{document.getElementById("searchInput")?.focus()})}function ue(i){m.toggleSelect(i)}function pe(i){h.value||l.push({name:"torrentDetail",params:{hash:i}})}function te(){_.value=""}function z(){window.scrollTo({top:0,behavior:"smooth"})}function q(){h.value&&m.unselectAllTorrents(),h.value=!h.value}function me(){ee.value?m.unselectAllTorrents():m.selectAllTorrents()}async function ae(i,s){i.preventDefault(),P.isVisible&&(P.isVisible=!1,await Be()),P.isVisible=!0,P.offset=[i.pageX,i.pageY],h.value?k.value.length===0&&m.selectTorrent(s.hash):(m.unselectAllTorrents(),m.selectTorrent(s.hash))}Qe(()=>P.isVisible,i=>{!i&&!h.value&&m.unselectAllTorrents()});function oe(i){if(y.hasActiveDialog)return!1;const s=i.target;if(ye(i)&&i.key==="a"&&s.tagName!=="INPUT")return m.unselectAllTorrents(),m.selectTorrents(...c.value.map(d=>d.hash)),i.preventDefault(),!0;if(ye(i)&&i.key==="f"){const d=document.getElementById("searchInput");if(document.activeElement!==d)return O(!0),i.preventDefault(),!0}if(i.key==="Escape"){const d=document.getElementById("searchInput");return document.activeElement===d||C.value?O(!1):(h.value=!1,m.unselectAllTorrents()),i.preventDefault(),!0}if(i.key==="Delete")return k.value.length===0?void 0:(y.createDialog(Ge,{hashes:m.selectedTorrents}),i.preventDefault(),!0)}be(async()=>{await S.fetchCategories(),await S.fetchTags(),O(ce.value)}),Le(()=>{document.addEventListener("keydown",oe),h.value=!1,z()}),We(()=>{document.removeEventListener("keydown",oe)});const le=F();function he(i,s){le.value=setTimeout(()=>{ae(i,s)},500)}function f(){clearTimeout(le.value)}return(i,s)=>(r(),b(K,null,[p("div",ma,[a(Ce,{class:"ma-0 pa-0 mb-2"},{default:o(()=>[a(De,null,{default:o(()=>[ve(a(H,{color:"transparent"},{default:o(()=>[a(se,{id:"searchInput",modelValue:W.value,"onUpdate:modelValue":s[0]||(s[0]=d=>W.value=d),label:n(e)("dashboard.searchInputLabel"),clearable:"",density:"compact","hide-details":"","prepend-inner-icon":"mdi-magnify",rounded:"pill","single-line":"",style:{width:"200px"},variant:"solo","onClick:clear":s[1]||(s[1]=d=>te())},null,8,["modelValue","label"])]),_:1},512),[[_e,C.value]])]),_:1}),a(U,{text:n(e)("dashboard.toggleSearchFilter"),location:"top"},{activator:o(({props:d})=>[a(I,R({icon:C.value?"mdi-chevron-left-circle":"mdi-text-box-search"},d,{variant:"plain",onClick:s[2]||(s[2]=G=>O())}),null,16,["icon"])]),_:1},8,["text"]),a(U,{text:n(e)("dashboard.toggleSelectMode"),location:"top"},{activator:o(({props:d})=>[a(I,R({icon:n(h)?"mdi-checkbox-marked":"mdi-checkbox-blank-outline"},d,{variant:"plain",onClick:q}),null,16,["icon"])]),_:1},8,["text"]),a(U,{text:n(e)("dashboard.toggleSortOrder"),location:"top"},{activator:o(({props:d})=>[a(I,R({icon:n(v).reverseOrder?"mdi-arrow-up-thin":"mdi-arrow-down-thin"},d,{variant:"plain",onClick:s[3]||(s[3]=G=>n(v).reverseOrder=!n(v).reverseOrder)}),null,16,["icon"])]),_:1},8,["text"]),p("div",ha,[a(dt,{modelValue:n(v).sortBy,"onUpdate:modelValue":s[4]||(s[4]=d=>n(v).sortBy=d),items:n(D),label:n(e)("dashboard.sortLabel"),"auto-select-first":"",density:"compact","hide-details":"",variant:"solo-filled"},null,8,["modelValue","items","label"])]),a(ct,{class:"align-center justify-center"},{default:o(()=>[p("span",va,u(n(A)),1)]),_:1})]),_:1}),a(Ce,{class:"ma-0 pa-0"},{default:o(()=>[a(ut,null,{default:o(()=>[ve(a(H,{color:"transparent"},{default:o(()=>[a(U,{text:n(e)("common.selectAll"),location:"bottom"},{activator:o(({props:d})=>[a(I,R({icon:ee.value?"mdi-checkbox-marked":"mdi-checkbox-blank-outline",class:"text-grey",color:"transparent",style:{left:"-8px"}},d,{onClick:me}),null,16,["icon"])]),_:1},8,["text"]),p("span",_a,u(n(e)("dashboard.selectAll")),1)]),_:1},512),[[_e,n(h)]])]),_:1})]),_:1}),n(m).filteredTorrents.length===0?(r(),b("div",fa,[p("p",ga,u(n(e)("common.emptyList")),1)])):(r(),b("div",ya,[a(we,{id:"torrentList",class:"pa-0",color:"transparent"},{default:o(()=>[n($).isPaginationOnTop&&!n($).isInfiniteScrollActive?(r(),T(Y,{key:0},{default:o(()=>[a(Ie,{modelValue:n(L),"onUpdate:modelValue":s[5]||(s[5]=d=>ne(L)?L.value=d:null),length:n(Z),"next-icon":"mdi-menu-right","prev-icon":"mdi-menu-left",onInput:z},null,8,["modelValue","length"])]),_:1})):N("",!0),(r(!0),b(K,null,X(n(de),d=>(r(),T(Y,{id:`torrent-${d.hash}`,class:Ae([n(t).mobile?"mb-2":"mb-4","pa-0"]),onContextmenu:G=>ae(G,d),onTouchcancel:f,onTouchend:f,onTouchmove:f,onTouchstart:he,onDblclick:j(G=>pe(d.hash),["prevent"])},{default:o(()=>[p("div",ba,[a(De,null,{default:o(()=>[ve(a(H,{class:"mr-3",color:"transparent"},{default:o(()=>[a(I,{icon:n(m).isTorrentInSelection(d.hash)?"mdi-checkbox-marked":"mdi-checkbox-blank-outline",color:"transparent",variant:"flat",onClick:G=>ue(d.hash)},null,8,["icon","onClick"])]),_:2},1536),[[_e,n(m).isSelectionMultiple]])]),_:2},1024),a(ea,{torrent:d},null,8,["torrent"])])]),_:2},1032,["id","class","onContextmenu","onDblclick"]))),256)),!n($).isPaginationOnTop&&!n($).isInfiniteScrollActive?(r(),T(Y,{key:1},{default:o(()=>[a(Ie,{modelValue:n(L),"onUpdate:modelValue":s[6]||(s[6]=d=>ne(L)?L.value=d:null),length:n(Z),"next-icon":"mdi-menu-right","prev-icon":"mdi-menu-left",onInput:z},null,8,["modelValue","length"])]),_:1})):N("",!0)]),_:1})]))]),p("div",{style:Ze(`position: absolute; left: ${P.offset[0]}px; top: ${P.offset[1]}px;`)},[a(pa,{modelValue:P.isVisible,"onUpdate:modelValue":s[7]||(s[7]=d=>P.isVisible=d)},null,8,["modelValue"])],4)],64))}});export{Ba as default};