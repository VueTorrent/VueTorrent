import{d as o,a as i,m as l}from"./vue-9ef19677.js";import{G as r,l as _,r as c,Q as p,s as u,t as m,V as d,v as h,z as f,A as g,B as x,H as C,I as y,J as v,K as w,a as L,L as k,E as P,x as a}from"./index-b27be98a.js";import{F as T}from"./FullScreenModal-bced8cbb.js";import{M as b}from"./Modal-572b592c.js";import{_ as E}from"./VDialog-c770b091.js";import{_ as M}from"./VContainer-53eb2bf3.js";const V=o({name:"ChangeLocationModal",mixins:[b,T],props:{hashes:Array},data(){return{newPath:"",mdiFile:r,mdiFolder:_,mdiClose:c}},computed:{...i(["selectMode"]),...l(["getTorrent","getSettings"]),dialogWidth(){return this.phoneLayout?"100%":"750px"},torrents(){return[...this.hashes.map(n=>this.getTorrent(n))]},isPhone(){return this.$vuetify.breakpoint.xsOnly}},created(){this.newPath=this.torrents[0].savePath},methods:{async setLocation(){await p.setTorrentLocation(this.hashes,this.newPath),this.close()},close(){this.dialog=!1,this.selectMode||this.$store.commit("RESET_SELECTED")}}});var F=function(){var t=this,e=t._self._c;return t._self._setupProxy,e(E,{attrs:{scrollable:"",width:t.dialogWidth,fullscreen:t.isPhone},on:{input:t.close},model:{value:t.dialog,callback:function(s){t.dialog=s},expression:"dialog"}},[e(m,[e(d,{staticClass:"pa-0"},[e(h,{staticClass:"ma-4 primarytext--text"},[e("h3",[t._v(t._s(t.$t("modals.changeLocation.title")))])])],1),e(f,[e(M,[e(g,[e(x,[e(C,{staticClass:"mb-4",attrs:{flat:""}},t._l(t.torrents,function(s){return e(y,{key:s.hash,attrs:{else:""}},[e(v,[e(w,{staticClass:"text-wrap"},[t._v(" "+t._s(s.name)+" ")])],1)],1)}),1),e(L,{attrs:{label:t.$t("directory"),"prepend-icon":t.mdiFolder,autofocus:""},on:{keydown:function(s){return!s.type.indexOf("key")&&t._k(s.keyCode,"enter",13,s.key,"Enter")?null:t.setLocation.apply(null,arguments)}},model:{value:t.newPath,callback:function(s){t.newPath=s},expression:"newPath"}})],1)],1)],1)],1),e(k),e(P,{staticClass:"justify-end"},[e(a,{staticClass:"accent white--text elevation-0 px-4",on:{click:t.setLocation}},[t._v(" "+t._s(t.$t("save"))+" ")]),e(a,{staticClass:"error white--text elevation-0 px-4",on:{click:t.close}},[t._v(" "+t._s(t.$t("cancel"))+" ")])],1)],1)],1)},$=[],S=u(V,F,$,!1,null,null,null,null);const R=S.exports;export{R as default};
