import{R as t}from"./index-952c55ec.js";import{G as N,e as v,s as R,r as P,c as h,H as c}from"./vue-cd4a4a73.js";const G=N("rss",()=>{const i=v([]),l=v([]),s=R([]),n=R({}),o=P({title:"",unread:!1}),u=h(()=>s.value.filter(e=>!e.isRead)),w=h(()=>o.unread?u.value:s.value);async function y(e){await t.refreshFeed(e)}async function p(e,a){await t.createFeed({name:e,url:a})}async function g(e,a){await t.setRule(e,a)}async function F(e,a){await t.editFeed(e,a)}async function A(e,a){await t.renameRule(e,a)}async function k(e){await t.deleteFeed(e)}async function E(e){await t.deleteRule(e)}async function f(){i.value=await t.getFeeds(!0),s.value=[],n.value={},i.value.forEach(e=>{e.articles&&e.articles.forEach(a=>{n.value[a.id]?n.value[a.id].push(e.name):(n.value[a.id]=[e.name],s.value.push({parsedDate:new Date(a.date),...a}))})}),c(s),c(n)}function M(e){return n.value[e]}async function d(e){const a=n.value[e];if(!a)return;const m=[];a.forEach(r=>m.push(t.markAsRead(r,e))),await Promise.all(m),s.value.forEach(r=>{r.id===e&&(r.isRead=!0)}),c(s)}async function S(){await Promise.all(u.value.map(e=>e.id).map(d)),await f()}async function b(){l.value=await t.getRules()}async function D(e){return await t.getMatchingArticles(e)}return{feeds:i,rules:l,filters:o,articles:w,unreadArticles:u,refreshFeed:y,createFeed:p,setRule:g,editFeed:F,renameRule:A,deleteFeed:k,deleteRule:E,fetchFeeds:f,getFeedNames:M,markArticleAsRead:d,markAllAsRead:S,fetchRules:b,fetchMatchingArticles:D}},{persist:{enabled:!0,strategies:[{storage:sessionStorage,key:"vuetorrent_rss"}]}});export{G as u};