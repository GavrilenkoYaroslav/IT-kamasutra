(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[3],{295:function(e,a,t){e.exports={dialogs:"Dialogs_dialogs__3z73c"}},296:function(e,a,t){e.exports={dialogList:"DialogList_dialogList__1B_1K"}},297:function(e,a,t){e.exports={dialog:"DialogItem_dialog__o_9MG",active:"DialogItem_active__3gxjB"}},298:function(e,a,t){e.exports={messages:"Messages_messages__1Tn-w"}},299:function(e,a,t){e.exports={message:"Message_message__GOVCz"}},300:function(e,a,t){e.exports={sendMessage:"SendMessage_sendMessage__3FUtc"}},302:function(e,a,t){"use strict";t.r(a);var n,s=t(0),o=t.n(s),i=t(295),c=t.n(i),r=t(25),l=t(296),m=t.n(l),g=t(297),u=t.n(g),d=t(14),f=function(e){return o.a.createElement("div",{className:u.a.dialog},o.a.createElement("img",{src:e.logoSrc}),o.a.createElement(d.b,{to:"/dialogs/".concat(e.Id),activeClassName:u.a.active}," ",e.name," "))},_=function(e){var a=e.DialogsData.map((function(e){return o.a.createElement(f,{Id:e.id,name:e.name,logoSrc:e.logoSrc})}));return o.a.createElement("div",{className:m.a.dialogList},a)},p=t(11),E=Object(p.b)((function(e){return{DialogsData:e.dialogsPage.DialogsData}}))(_),b=t(298),v=t.n(b),D=t(299),M=t.n(D),S=function(e){return o.a.createElement("div",{className:M.a.message},e.message)},x=t(300),N=t.n(x),h=t(129),j=t(130),O=t(97),C=t(72),I=Object(C.a)(30),L=Object(j.a)({form:"sendMessageForm"})((function(e){return o.a.createElement("form",{className:N.a.sendMessage,onSubmit:e.handleSubmit},o.a.createElement(h.a,{name:"message",component:O.b,placeholder:"enter your message",validate:[C.b,I]}),o.a.createElement("button",null,"Send message"))})),w=function(e){var a=e.MessagesData.map((function(e){return o.a.createElement(S,{message:e.message,id:e.id})}));return o.a.createElement("div",{className:v.a.messages},a,o.a.createElement(L,{onSubmit:function(a){e.sendMessageActionCreator(a.message)}}))},y={sendMessageActionCreator:t(128).b},k=Object(p.b)((function(e){return{MessagesData:e.dialogsPage.MessagesData}}),y)(w),z=t(10),A=function(e){return{id:e.auth.id}};a.default=(n=function(){return o.a.createElement("div",null,o.a.createElement(r.a,null),o.a.createElement("div",{className:c.a.dialogs},o.a.createElement(E,null),o.a.createElement(k,null)))},Object(p.b)(A)((function(e){return e.id?o.a.createElement(n,e):o.a.createElement(z.a,{to:"/login"})})))}}]);
//# sourceMappingURL=3.9f830072.chunk.js.map