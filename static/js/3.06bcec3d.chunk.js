(this["webpackJsonpreact-kabzda-1"]=this["webpackJsonpreact-kabzda-1"]||[]).push([[3],{298:function(e,t,s){e.exports={descriptionBlock:"ProfileInfo_descriptionBlock__3cd8Y",profileImg:"ProfileInfo_profileImg__3mXT7",avatar:"ProfileInfo_avatar__3xuFq",contactItem:"ProfileInfo_contactItem__X2L-c"}},299:function(e,t,s){e.exports={item:"Post_item__ihtu9"}},300:function(e,t,s){e.exports={postsBlock:"MyPosts_postsBlock__2ifKf",posts:"MyPosts_posts__3tZ1c"}},301:function(e,t,s){},303:function(e,t,s){"use strict";s.r(t);var c=s(3),o=s(29),i=s(30),n=s(32),r=s(31),a=s(0),l=s.n(a),j=s(16),u=s(97),b=s(299),d=s.n(b),p=s(1),O=function(e){return Object(p.jsxs)("div",{className:d.a.item,children:[Object(p.jsx)("img",{src:e.post.src}),Object(p.jsxs)("span",{children:[e.post.name,", ",e.post.text]}),Object(p.jsx)("div",{children:Object(p.jsxs)("span",{children:[e.post.likes," likes"]})})]})},f=s(300),h=s.n(f),x=s(35),m=s(91),v=s(131),P=s(49),g=s(26),k=l.a.memo((function(e){console.log("RENDEAR YOOO");var t=[];e.postsData.forEach((function(e,s){t.push(Object(p.jsx)(O,{post:e},s))}));return Object(p.jsxs)("div",{className:h.a.postsBlock,children:[Object(p.jsx)("h3",{children:"My posts"}),Object(p.jsx)(S,{onSubmit:function(t,s){e.addPost(t.newPostText),s(Object(x.a)("ProfileAddNewPostForm"))}}),Object(p.jsx)("div",{className:h.a.posts,children:t.reverse()})]})})),w=Object(P.a)(10),S=Object(v.a)({form:"ProfileAddNewPostForm"})((function(e){return Object(p.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(p.jsx)("div",{children:Object(p.jsx)(m.a,{component:g.b,name:"newPostText",placeholder:"What's new?",validate:[P.b,w]})}),Object(p.jsx)("div",{children:Object(p.jsx)("button",{children:"Add post"})})]})})),_=k,y=Object(j.b)((function(e){return{postsData:e.profilePage.postsData,newPostText:e.profilePage.newPostText}}),(function(e){return{addPost:function(t){e(Object(u.a)(t))}}}))(_),I=s(301),N=s.n(I),A=s(99),F=s(41),M=s(298),T=s.n(M),D=s(120),E=function(e){var t=Object(a.useState)(!1),s=Object(A.a)(t,2),c=s[0],o=s[1],i=Object(a.useState)(e.status),n=Object(A.a)(i,2),r=n[0],l=n[1];Object(a.useEffect)((function(){l(e.status)}),[e.status]);return Object(p.jsxs)("div",{children:[!c&&Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Status: "}),Object(p.jsx)("span",{onDoubleClick:function(){e.isOwner&&o(!0)},children:e.status||"--------"})]}),c&&Object(p.jsx)("div",{children:Object(p.jsx)("input",{autoFocus:!0,onBlur:function(){o(!1),e.updateStatus(r)},onChange:function(e){l(e.currentTarget.value)},value:r})})]})},B=s(50),C=s.n(B),J=Object(v.a)({form:"editProfile"})((function(e){var t=e.isOwner,s=e.handleSubmit,c=e.profile,o=e.error;Object(P.a)(30);return Object(p.jsxs)("form",{onSubmit:s,children:[Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Full name:"})," ",Object(g.c)("fullname","fullName",[],g.a)]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Looking for a job:"})," ",Object(g.c)("","lookingForAJob",[],g.a,{type:"checkbox"})]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"My pprofessionals skills:"})," ",Object(g.c)("my professional skills","lookingForAJobDescription",[],g.b)]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"About me:"})," ",Object(g.c)("about me","aboutMe",[],g.b)]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Contacts:"}),Object.entries(c.contacts).map((function(e){return Object(p.jsxs)("div",{className:T.a.contactItem,children:[Object(p.jsx)("b",{children:e[0]}),Object(g.c)(e[0],"contacts.".concat(e[0]),[],g.a)]},e[0])}))]}),t&&Object(p.jsx)("button",{children:"Save changes"}),o?Object(p.jsx)("div",{className:C.a.formSummaryError,children:o}):""]})})),U=function(e){var t=e.contactTitle,s=e.contactValue;return Object(p.jsxs)("div",{className:T.a.contactItem,children:[Object(p.jsx)("b",{children:t}),": ",s]})},z=function(e){var t=e.profile,s=e.isOwner,c=e.goToEditMode;return Object(p.jsxs)("div",{children:[Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Full name:"})," ",t.fullName]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Looking for a job:"})," ",t.lookingForAJob?"yes":"no"]}),t.lookingForAJob&&Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"My pprofessionals skills:"})," ",t.lookingForAJobDescription]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"About me:"})," ",t.aboutMe]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Contacts:"}),Object.entries(t.contacts).map((function(e){return Object(p.jsx)(U,{contactTitle:e[0],contactValue:e[1]},e[0])}))]}),s&&Object(p.jsx)("button",{onClick:c,children:"Edit profile information"})]})},L=function(e){var t=Object(a.useState)(!1),s=Object(A.a)(t,2),c=s[0],o=s[1];if(!e.profile)return Object(p.jsx)(F.a,{});return Object(p.jsxs)("div",{children:[Object(p.jsx)("div",{}),Object(p.jsxs)("div",{className:T.a.descriptionBlock,children:[Object(p.jsxs)("div",{children:[Object(p.jsx)("img",{className:T.a.avatar,src:e.profile.photos.large?e.profile.photos.large:D.a}),e.isOwner&&Object(p.jsx)("div",{children:Object(p.jsx)("input",{type:"file",onChange:function(t){t.target.files.length&&e.savePhoto(t.target.files[0])}})}),Object(p.jsx)(E,{isOwner:e.isOwner,status:e.status,updateStatus:e.updateStatus})]}),c?Object(p.jsx)(J,{initialValues:e.profile,isOwner:e.isOwner,profile:e.profile,onSubmit:function(t){e.saveProfile(t).then((function(){o(!1)}))}}):Object(p.jsx)(z,{profile:e.profile,isOwner:e.isOwner,goToEditMode:function(){o(!0)}})]})]})},V=function(e){return Object(p.jsxs)("div",{className:N.a.content,children:[e.aboutMe,Object(p.jsx)(L,{profile:e.profile,updateStatus:e.updateStatus,status:e.status,isOwner:e.isOwner,savePhoto:e.savePhoto,saveProfile:e.saveProfile}),Object(p.jsx)(y,{})]})},R=s(7),X=s(98),Y=s(12),q=function(e){Object(n.a)(s,e);var t=Object(r.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(i.a)(s,[{key:"refreshProfile",value:function(){var e=this.props.match.params.userId;e||(e=this.props.authorizedUserId)||this.props.history.push("/login"),this.props.getUserProfile(e),this.props.getStatus(e)}},{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(e,t,s){e.match.params.userId!=this.props.match.params.userId&&this.refreshProfile()}},{key:"render",value:function(){return Object(p.jsx)(V,Object(c.a)(Object(c.a)({},this.props),{},{status:this.props.status,profile:this.props.profile,updateStatus:this.props.updateStatus,isOwner:!this.props.match.params.userId,savePhoto:this.props.savePhoto,saveProfile:this.props.saveProfile}))}}]),s}(l.a.Component);t.default=Object(Y.d)(Object(j.b)((function(e){return{profile:e.profilePage.profile,status:e.profilePage.status,authorizedUserId:e.auth.id,isAuth:e.auth.isAuth}}),{getUserProfile:u.d,getStatus:u.c,updateStatus:u.g,savePhoto:u.e,saveProfile:u.f}),R.f,X.b)(q)}}]);
//# sourceMappingURL=3.06bcec3d.chunk.js.map