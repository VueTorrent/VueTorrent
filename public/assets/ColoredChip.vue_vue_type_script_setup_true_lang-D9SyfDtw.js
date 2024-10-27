import{V as M,j as I,W as K,z as w,X as E,t as U,w as O,c as A,u as L,Y as q,d as z,e as X,f as Y,g as Z,a as j,O as G,P as J,i as W,k as R,l as Q,o as x,Z as N,$ as ee}from"./index-UzOjD07D.js";import{h as _,X as ae,B as t,D as r,G as o,R as te,I as v,J as i,M as d,N as h,m as l,F as T,S as F,Y as oe,Z as le,_ as H,d as P,r as se,c as k,H as ne,u as S,K as re,L as ue,O as de,$ as ie,T as me}from"./vue-BXPMJ8Ux.js";import{u as ce}from"./vuetify-CfytNh_T.js";const ye={class:"d-flex"},fe={key:2},pe={key:3},he=_({__name:"RightClickMenuEntry",props:{entryData:{}},setup(f){const a=f,s=()=>{a.entryData.action&&a.entryData.action()};return(e,n)=>{const m=ae("RightClickMenuEntry",!0);return e.entryData.hidden?d("",!0):(t(),r(O,{key:0,class:"px-3",disabled:e.entryData.disabled,onClick:s},{default:o(()=>[te("div",ye,[e.entryData.disabled&&e.entryData.disabledIcon?(t(),r(M,{key:0,class:"mr-2"},{default:o(()=>[v(i(e.entryData.disabledIcon),1)]),_:1})):e.entryData.icon?(t(),r(M,{key:1,class:"mr-2"},{default:o(()=>[v(i(e.entryData.icon),1)]),_:1})):d("",!0),e.entryData.disabled&&e.entryData.disabledText?(t(),h("span",fe,i(e.entryData.disabledText),1)):(t(),h("span",pe,i(e.entryData.text),1)),l(I),!e.entryData.disabled&&e.entryData.children?(t(),r(M,{key:4},{default:o(()=>n[0]||(n[0]=[v("mdi-chevron-right")])),_:1})):d("",!0)]),e.entryData.children?(t(),r(K,{key:0,activator:"parent","open-on-hover":"","open-on-click":"","close-delay":"10","open-delay":"0",location:"right"},{default:o(()=>[l(U,null,{default:o(()=>[e.entryData.slots?.top?(t(),h(T,{key:0},[(t(!0),h(T,null,F(e.entryData.slots.top,u=>(t(),r(m,{entryData:u},null,8,["entryData"]))),256)),l(w,{thickness:"3"})],64)):d("",!0),l(E,{items:e.entryData.children,"item-height":"48",renderless:""},{default:o(({item:u})=>[l(m,{entryData:u},null,8,["entryData"])]),_:1},8,["items"]),e.entryData.slots?.bottom?(t(),h(T,{key:1},[l(w,{thickness:"3"}),(t(!0),h(T,null,F(e.entryData.slots.bottom,u=>(t(),r(m,{entryData:u},null,8,["entryData"]))),256))],64)):d("",!0)]),_:1})]),_:1})):d("",!0)]),_:1},8,["disabled"]))}}}),ke=_({__name:"RightClickMenu",props:oe({menuData:{}},{modelValue:{type:Boolean,required:!0},modelModifiers:{}}),emits:["update:modelValue"],setup(f){const a=le(f,"modelValue");return(s,e)=>a.value?(t(),r(K,{key:0,modelValue:a.value,"onUpdate:modelValue":e[0]||(e[0]=n=>a.value=n),activator:"parent","close-on-content-click":"",transition:"slide-y-transition","scroll-strategy":"none"},{default:o(()=>[l(U,null,{default:o(()=>[H(s.$slots,"top"),s.$slots.top?(t(),r(w,{key:0,thickness:"3"})):d("",!0),l(E,{items:s.menuData,"item-height":"48",renderless:""},{default:o(({item:n})=>[l(he,{entryData:n},null,8,["entryData"])]),_:1},8,["items"]),s.$slots.bottom?(t(),r(w,{key:1,thickness:"3"})):d("",!0),H(s.$slots,"bottom")]),_:3})]),_:3},8,["modelValue"])):d("",!0)}}),be=_({__name:"MoveTorrentDialog",props:{guid:{},hashes:{},mode:{}},setup(f){const a=f,{isOpened:s}=A(a.guid),{t:e}=L(),n=q(),m=P(),u=P(),V=P(!1),D=se({newPath:""}),C=[c=>!!c||e("dialogs.moveTorrent.required")],g=k(()=>a.hashes.map(n.getTorrentByHash)),p=k(()=>{switch(a.mode){case"dl":return g.value[0]?.download_path;case"save":return g.value[0]?.savePath}});async function $(){await m.value?.validate(),V.value&&(await n.toggleAutoTmm(a.hashes,!1),await n.moveTorrents(a.mode,a.hashes,D.newPath),u.value?.saveValueToHistory(),B())}const B=()=>{s.value=!1};return ne(()=>{D.newPath=p.value||""}),(c,y)=>(t(),r(Q,{modelValue:S(s),"onUpdate:modelValue":y[3]||(y[3]=b=>de(s)?s.value=b:null)},{default:o(()=>[l(z,null,{default:o(()=>[l(X,null,{default:o(()=>[v(i(c.$t(`dialogs.moveTorrent.${c.mode}.title`)),1)]),_:1}),l(Y,null,{default:o(()=>[l(S(Z),{modelValue:V.value,"onUpdate:modelValue":y[1]||(y[1]=b=>V.value=b),ref_key:"form",ref:m,onSubmit:y[2]||(y[2]=re(()=>{},["prevent"]))},{default:o(()=>[p.value?(t(),r(j,{key:0,"model-value":p.value,disabled:"",label:c.$t("dialogs.moveTorrent.oldPath")},null,8,["model-value","label"])):d("",!0),l(G,{modelValue:D.newPath,"onUpdate:modelValue":y[0]||(y[0]=b=>D.newPath=b),historyKey:S(J).TORRENT_PATH,ref_key:"field",ref:u,rules:C,autofocus:"",label:c.$t("dialogs.moveTorrent.newPath"),onKeydown:ue($,["enter"])},null,8,["modelValue","historyKey","label"])]),_:1},8,["modelValue"])]),_:1}),l(W,null,{default:o(()=>[l(I),l(R,{color:"error",onClick:B},{default:o(()=>[v(i(c.$t("common.cancel")),1)]),_:1}),l(R,{color:"accent",disabled:!V.value,onClick:$},{default:o(()=>[v(i(c.$t("common.save")),1)]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["modelValue"]))}}),Ce=_({__name:"ColoredChip",props:{defaultColor:{},disabled:{type:Boolean,default:!1},disabledValue:{},value:{}},setup(f){const a=f,{t:s}=L(),{current:e}=ce(),{enableHashColors:n,hideColoredChip:m}=ie(x());function u(p){return e.value.colors[p]??p}const V=k(()=>a.disabled||!n.value?a.defaultColor:N(a.value)),D=k(()=>a.disabled||!n.value?u(a.defaultColor):N(a.value)),C=k(()=>a.disabled?a.disabledValue||a.value||s("common.none"):a.value),g=k(()=>!m.value);return(p,$)=>g.value?(t(),r(ee,{key:0,color:V.value,variant:"flat"},{default:o(()=>[v(i(C.value),1)]),_:1},8,["color"])):(t(),h("div",{key:1,class:"text-no-wrap",style:me(`color: ${D.value}`)},i(C.value),5))}});export{ke as _,be as a,Ce as b};