import{b as le,d as ae,K as te,M as oe,j as A,e as se,f as ne,r as de,t as h,N as G,O,w as re,V as u,P as ue,Q as ie,R as ce,x as X,S as B,s as fe,v as pe,y as ge,c as ye,k as me}from"./index-Dt8Gt-nM.js";import{u as he,g as q}from"./TorrentDetail-C7adQM7t.js";import{h as ke,H as ve,d as p,v as Ve,r as be,c as Ne,w as Fe,z as _e,B as s,D as r,G as o,m as n,J as y,K as i,u as c,X as R,S as k,N as v,U as J,O as V,T as Ce,F as Q,P as Re,W as D}from"./vue-CORHD_Bi.js";import"./vuetify-BWS18Mof.js";import"./ColoredChip.vue_vue_type_script_setup_true_lang-DQ_ca4-7.js";const $e=["onClick"],we={key:1},Ee={key:1},Te={class:"d-flex flex-column pl-3"},Ke=ke({__name:"BulkRenameFilesDialog",props:{guid:{},node:{},hash:{}},setup(W){const m=W,{isOpened:b}=le(m.guid),{t:g}=ve(),I=he(),K=p(),N=p(!1),$=p(!1),F=p(""),L=p(),_=p([]),C=p(""),S=p(),w=p(!1),M=[a=>!!a],Y=Ve([{fixed:!0,sortable:!1,key:"selected",width:"50px"},{title:g("dialogs.bulkRenameFiles.col_origin_name"),sortable:!1,key:"name"},{title:g("dialogs.bulkRenameFiles.col_result_name"),sortable:!1,key:"targetName"}]),f=be([]),E=Ne(()=>f.filter(a=>a.type==="file"&&a.selected&&a.targetName&&a.name!==a.targetName)),H=(a,t,l=0)=>{const e={indent:l,name:a.name,fullName:a.fullName,parentItem:t,show:!0,folded:!1,selected:!1,type:a.type,node:a};if(f.push(e),a.type==="folder")for(const d of a.children)H(d,e,l+1)},T=(a,t)=>{a.folded=t,a.node.children.forEach(l=>{const e=f.find(d=>d.node.id===l.id);e.show=!t,e.type==="folder"&&t&&T(e,t)})},x=a=>{const t=f.find(l=>l.node.id===a.id);if(a.type==="folder"){let l=0,e=0;return a.children.forEach(d=>{switch(x(d)){case 1:l++;break;case 0:e++;break}}),l===0&&e===0?(t.selected=!1,t.indeterminate=!1,-1):l===a.children.length?(t.selected=!0,t.indeterminate=!1,1):(t.indeterminate=!0,0)}else return t.indeterminate=!1,t.selected?1:-1},P=a=>{const t=l=>{l.node.children.forEach(e=>{const d=f.find(ee=>ee.node.id===e.id);d&&(d.selected=l.selected,d.selected&&(d.show=!0,d.folded=!1),d.type==="folder"&&t(d))}),l.selected&&(l.show=!0,l.folded=!1)};t(a),x(m.node),U()},j=a=>{x(m.node),U([a])},U=async a=>{if(await K.value?.validate(),!N.value)return;let t;try{t=new RegExp(F.value,_.value.join(""))}catch{return}(a||f).forEach(e=>{e.type==="file"&&(e.selected&&t.test(e.name)?(e.targetName=e.name.replace(t,C.value),e.targetFullName=(e.parentItem.fullName===""?"":e.parentItem.fullName+"/")+e.targetName):(e.targetName=void 0,e.targetFullName=void 0),e.notChanged=e.name===e.targetName)}),$.value=!1;const l=new Map;f.filter(e=>!!e.targetFullName).forEach(e=>{l.set(e.targetFullName,(l.get(e.targetFullName)||0)+1)}),f.forEach(e=>{e.duplicated=l.get(e.targetFullName)>1,e.duplicated&&($.value=!0)})},Z=async()=>{if(!E.value.length)return D.warn(g("dialogs.bulkRenameFiles.nothing_to_do"));const a=[];for(const t of E.value)a.push(I.renameTorrentFile(m.hash,t.fullName,t.targetFullName));w.value=!0,Promise.all(a).then(()=>{D.success(g("dialogs.bulkRenameFiles.success")),L.value?.saveValueToHistory(),S.value?.saveValueToHistory()}).catch(t=>{D.error(t.toString())}).finally(()=>{w.value=!1,I.updateFileTreeTask.perform(),z()})},z=()=>{b.value=!1};return Fe([F,_,C],()=>{U()}),_e(()=>{H(m.node)}),(a,t)=>(s(),r(me,{modelValue:c(b),"onUpdate:modelValue":t[6]||(t[6]=l=>Re(b)?b.value=l:null),persistent:"",fullscreen:""},{default:o(()=>[n(ye,{density:"compact"},{default:o(()=>[n(ae,null,{default:o(()=>[n(te,{density:"compact",color:"transparent"},{default:o(()=>[n(oe,null,{default:o(()=>[y(i(a.$t("dialogs.bulkRenameFiles.title")),1)]),_:1}),n(A,{icon:"mdi-close",onClick:t[0]||(t[0]=l=>z())})]),_:1})]),_:1}),n(se,{class:"d-flex flex-column"},{default:o(()=>[n(c(ne),{modelValue:N.value,"onUpdate:modelValue":t[5]||(t[5]=l=>N.value=l),ref_key:"form",ref:K},{default:o(()=>[n(de,{"no-gutters":"",align:"center",justify:"center"},{default:o(()=>[n(h,{cols:a.$vuetify.display.mobile?9:void 0},{default:o(()=>[n(G,{historyKey:c(O).BULK_RENAME_REGEXP,ref_key:"regexpEl",ref:L,"hide-details":"",density:"compact",modelValue:F.value,"onUpdate:modelValue":t[1]||(t[1]=l=>F.value=l),rules:M,label:a.$t("dialogs.bulkRenameFiles.regexp")},null,8,["historyKey","modelValue","label"])]),_:1},8,["cols"]),n(h,{cols:a.$vuetify.display.mobile?3:"auto"},{default:o(()=>[n(re,{class:"ml-2",modelValue:_.value,"onUpdate:modelValue":t[2]||(t[2]=l=>_.value=l),items:["d","g","i","m","s","u","v","y"],placeholder:c(g)("dialogs.bulkRenameFiles.select_regex_flags"),label:a.$t("dialogs.bulkRenameFiles.flags"),density:"compact",multiple:"","hide-details":""},null,8,["modelValue","placeholder","label"])]),_:1},8,["cols"]),n(h,{cols:"auto"},{default:o(()=>[n(u,{class:"mx-2",icon:`mdi-arrow-${a.$vuetify.display.mobile?"down":"right"}`},null,8,["icon"])]),_:1}),n(h,{cols:a.$vuetify.display.mobile?12:void 0},{default:o(()=>[n(G,{historyKey:c(O).BULK_RENAME_TARGET,ref_key:"targetEl",ref:S,"hide-details":"",density:"compact",modelValue:C.value,"onUpdate:modelValue":t[3]||(t[3]=l=>C.value=l),rules:M,label:a.$t("dialogs.bulkRenameFiles.target")},null,8,["historyKey","modelValue","label"])]),_:1},8,["cols"]),n(h,{cols:"auto"},{default:o(()=>[n(ue,{class:R(a.$vuetify.display.mobile?"mt-2":"ml-5"),color:"success",location:"top left",content:E.value.length},{default:o(()=>[n(A,{loading:w.value,disabled:!N.value||$.value,color:"primary",onClick:t[4]||(t[4]=l=>Z())},{default:o(()=>[y(i(a.$t("dialogs.bulkRenameFiles.run")),1)]),_:1},8,["loading","disabled"])]),_:1},8,["class","content"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),a.$vuetify.display.mobile?(s(),r(fe,{key:1},{default:o(()=>[(s(!0),V(Q,null,Ce(f,(l,e)=>(s(),V(Q,null,[l.show?(s(),r(pe,{key:0},{default:o(()=>[e>0?(s(),r(ge,{key:0,class:"my-2"})):v("",!0),k("div",{class:"d-flex align-center",style:J({"padding-left":`${l.indent*16}px`})},[n(X,{modelValue:l.selected,"onUpdate:modelValue":d=>l.selected=d,inline:"",color:l.targetName&&"accent",indeterminate:l.type==="folder"&&l.indeterminate,onChange:d=>l.type==="file"?j(l):P(l)},null,8,["modelValue","onUpdate:modelValue","color","indeterminate","onChange"]),l.type==="folder"?(s(),r(u,{key:0,onClick:d=>l.type==="folder"&&T(l,!l.folded)},{default:o(()=>[y(i(`mdi-chevron-${l.folded?"down":"up"}`),1)]),_:2},1032,["onClick"])):v("",!0),l.fullName===""?(s(),r(u,{key:1,icon:"mdi-file-tree"})):l.type==="file"?(s(),r(u,{key:2,icon:c(q)(l.name)},null,8,["icon"])):l.folded?(s(),r(u,{key:4,icon:"mdi-folder",color:"#ffe476"})):(s(),r(u,{key:3,icon:"mdi-folder-open",color:"#ffe476"})),k("div",Te,[k("span",{class:R({"text-grey strikethrough":l.targetName})},i(l.name),3),k("span",null,i(l.targetName),1)])],4)]),_:2},1024)):v("",!0)],64))),256))]),_:1})):(s(),r(ie,{key:0,headers:c(Y),items:f,density:"compact","fixed-header":""},{item:o(({internalItem:l})=>[l.raw.show?(s(),r(ce,{key:0,item:l},{"item.selected":o(({item:e})=>[n(X,{modelValue:e.selected,"onUpdate:modelValue":d=>e.selected=d,color:e.targetName&&"accent",indeterminate:e.type==="folder"&&e.indeterminate,onChange:d=>e.type==="file"?j(e):P(e)},null,8,["modelValue","onUpdate:modelValue","color","indeterminate","onChange"])]),"item.name":o(({item:e})=>[k("span",{class:R(["fold-toggle",{"cursor-pointer":e.type==="folder"}]),style:J({"padding-left":`${e.indent*16}px`}),onClick:d=>e.type==="folder"&&T(e,!e.folded)},[e.type==="folder"?(s(),r(B,{key:0,location:"top",activator:"parent"},{default:o(()=>[y(i(c(g)(`dialogs.bulkRenameFiles.${e.folded?"unfold":"fold"}`)),1)]),_:2},1024)):v("",!0),e.type==="folder"?(s(),r(u,{key:1},{default:o(()=>[y(i(`mdi-chevron-${e.folded?"down":"up"}`),1)]),_:2},1024)):(s(),r(u,{key:2})),e.fullName===""?(s(),r(u,{key:3,icon:"mdi-file-tree"})):e.type==="file"?(s(),r(u,{key:4,icon:c(q)(e.name)},null,8,["icon"])):e.folded?(s(),r(u,{key:6,icon:"mdi-folder",color:"#ffe476"})):(s(),r(u,{key:5,icon:"mdi-folder-open",color:"#ffe476"})),y(" "+i(e.name),1)],14,$e)]),"item.targetName":o(({item:e})=>[e.type==="file"?(s(),V("span",{key:0,class:R(["target-name",{duplicated:e.duplicated,"not-changed":e.notChanged}])},[e.duplicated||e.notChanged?(s(),r(B,{key:0,activator:"parent"},{default:o(()=>[y(i(c(g)(`dialogs.bulkRenameFiles.${e.duplicated?"duplicated":"not_changed"}`)),1)]),_:2},1024)):(s(),V("span",we,i(e.targetName),1))],2)):(s(),V("span",Ee,[n(u,{icon:"mdi-cancel",color:"grey-lighten-1"}),n(B,{activator:"parent"},{default:o(()=>[y(i(c(g)("dialogs.bulkRenameFiles.notForFolder")),1)]),_:1})]))]),_:2},1032,["item"])):v("",!0)]),_:1},8,["headers","items"]))]),_:1})]),_:1})]),_:1},8,["modelValue"]))}});export{Ke as default};
