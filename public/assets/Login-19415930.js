import{a as r}from"./vue-b220ace6.js";import{c7 as i,c8 as u,s as o,aF as c,t as l,V as p,z as d,a,D as m,E as _,x as h}from"./index-90e29838.js";import{_ as f}from"./VForm-1136bcc8.js";const y={name:"Login",...r(["authenticated"]),data(){return{username:"",password:"",inputRules:[n=>n.length>=1||"At least 1 character"],mdiLock:i,mdiAccount:u}},async mounted(){this.$route.query.username!==void 0&&this.$route.query.password!==void 0&&(this.authenticated=await this.$store.dispatch("LOGIN",{username:this.$route.query.username,password:this.$route.query.password})),this.authenticated&&this.redirectOnSuccess()},methods:{async login(){await this.$store.dispatch("LOGIN",{username:this.username,password:this.password})&&this.redirectOnSuccess()},redirectOnSuccess(){this.$route.query.redirect!==void 0?this.$router.push(this.$route.query.redirect):this.$router.push({name:"dashboard"})}}};var g=function(){var e=this,t=e._self._c;return t(c,{staticClass:"background mt-5"},[t("div",{staticStyle:{margin:"130px auto"}},[t(l,{attrs:{"max-width":"400",flat:""}},[t(p,{staticClass:"justify-center"},[t("h2",[e._v("Login")])]),t("div",{staticClass:"mr-5 ml-5"}),t(d,[t(f,{ref:"form",staticClass:"px-3"},[t(a,{attrs:{outlined:"",label:"username","prepend-icon":e.mdiAccount,rules:e.inputRules,autocomplete:"current email",name:"username",autocapitalize:"none","persistent-placeholder":"",autofocus:""},nativeOn:{keyup:function(s){return!s.type.indexOf("key")&&e._k(s.keyCode,"enter",13,s.key,"Enter")?null:e.login.apply(null,arguments)}},model:{value:e.username,callback:function(s){e.username=s},expression:"username"}}),t(a,{attrs:{outlined:"",type:"password",label:"password","prepend-icon":e.mdiLock,rules:e.inputRules,autocomplete:"current password",name:"password",autocapitalize:"none","persistent-placeholder":""},nativeOn:{keyup:function(s){return!s.type.indexOf("key")&&e._k(s.keyCode,"enter",13,s.key,"Enter")?null:e.login.apply(null,arguments)}},model:{value:e.password,callback:function(s){e.password=s},expression:"password"}}),t(m),t(_,{staticClass:"justify-center"},[t(h,{staticClass:"accent white--text mx-0 mt-3",attrs:{text:""},on:{click:e.login}},[e._v(" Login ")])],1)],1)],1)],1)],1)])},w=[],k=o(y,g,w,!1,null,null,null,null);const O=k.exports;export{O as default};
