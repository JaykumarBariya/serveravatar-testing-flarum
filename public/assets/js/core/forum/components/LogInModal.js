"use strict";(self.webpackChunkflarum_core=self.webpackChunkflarum_core||[]).push([[226],{1793:(t,o,r)=>{r.r(o),r.d(o,{default:()=>p});var s=r(8805),a=r(3554),e=r(2855),i=r(3092),n=r(1005),l=r(117),d=r(6064),c=r(4311),u=r(374);class h extends e.A{constructor(){super(...arguments),(0,s.A)(this,"email",void 0),(0,s.A)(this,"success",!1)}oninit(t){super.oninit(t),this.email=(0,c.A)(this.attrs.email||"")}className(){return"ForgotPasswordModal Modal--small"}title(){return a.A.translator.trans("core.forum.forgot_password.title")}content(){return this.success?m("div",{className:"Modal-body"},m(u.A,{className:"Form--centered"},m("p",{className:"helpText"},a.A.translator.trans("core.forum.forgot_password.email_sent_message")),m("div",{className:"Form-group Form-controls"},m(i.A,{className:"Button Button--primary Button--block",onclick:this.hide.bind(this)},a.A.translator.trans("core.forum.forgot_password.dismiss_button"))))):m("div",{className:"Modal-body"},m(u.A,{className:"Form--centered",description:a.A.translator.trans("core.forum.forgot_password.text")},this.fields().toArray()))}fields(){const t=new d.A,o=(0,l.A)(a.A.translator.trans("core.forum.forgot_password.email_placeholder"));return t.add("email",m("div",{className:"Form-group"},m("input",{className:"FormControl",name:"email",type:"email",placeholder:o,"aria-label":o,bidi:this.email,disabled:this.loading})),50),t.add("submit",m("div",{className:"Form-group Form-controls"},m(i.A,{className:"Button Button--primary Button--block",type:"submit",loading:this.loading},a.A.translator.trans("core.forum.forgot_password.submit_button"))),-10),t}onsubmit(t){t.preventDefault(),this.loading=!0,a.A.request({method:"POST",url:a.A.forum.attribute("apiUrl")+"/forgot",body:this.requestParams(),errorHandler:this.onerror.bind(this)}).then((()=>{this.success=!0,this.alertAttrs=null})).catch((()=>{})).then(this.loaded.bind(this))}requestParams(){return{email:this.email()}}onerror(t){404===t.status&&t.alert&&(t.alert.content=a.A.translator.trans("core.forum.forgot_password.not_found_message")),super.onerror(t)}}flarum.reg.add("core","forum/components/ForgotPasswordModal",h);class p extends e.A{constructor(){super(...arguments),(0,s.A)(this,"identification",void 0),(0,s.A)(this,"password",void 0),(0,s.A)(this,"remember",void 0)}oninit(t){super.oninit(t),this.identification=(0,c.A)(this.attrs.identification||""),this.password=(0,c.A)(this.attrs.password||""),this.remember=(0,c.A)(!!this.attrs.remember)}className(){return"LogInModal Modal--small"}title(){return a.A.translator.trans("core.forum.log_in.title")}content(){return[m("div",{className:"Modal-body"},this.body()),m("div",{className:"Modal-footer"},this.footer())]}body(){return[m(n.A,null),m("div",{className:"Form Form--centered"},this.fields().toArray())]}fields(){const t=new d.A,o=(0,l.A)(a.A.translator.trans("core.forum.log_in.username_or_email_placeholder")),r=(0,l.A)(a.A.translator.trans("core.forum.log_in.password_placeholder"));return t.add("identification",m("div",{className:"Form-group"},m("input",{className:"FormControl",name:"identification",type:"text",placeholder:o,"aria-label":o,bidi:this.identification,disabled:this.loading})),30),t.add("password",m("div",{className:"Form-group"},m("input",{className:"FormControl",name:"password",type:"password",autocomplete:"current-password",placeholder:r,"aria-label":r,bidi:this.password,disabled:this.loading})),20),t.add("remember",m("div",{className:"Form-group"},m("div",null,m("label",{className:"checkbox"},m("input",{type:"checkbox",bidi:this.remember,disabled:this.loading}),a.A.translator.trans("core.forum.log_in.remember_me_label")))),10),t.add("submit",m("div",{className:"Form-group"},m(i.A,{className:"Button Button--primary Button--block",type:"submit",loading:this.loading},a.A.translator.trans("core.forum.log_in.submit_button"))),-10),t}footer(){return m("[",null,m("p",{className:"LogInModal-forgotPassword"},m(i.A,{className:"Button Button--text Button--link",onclick:this.forgotPassword.bind(this)},a.A.translator.trans("core.forum.log_in.forgot_password_link"))),a.A.forum.attribute("allowSignUp")&&m("p",{className:"LogInModal-signUp"},a.A.translator.trans("core.forum.log_in.sign_up_text",{a:m(i.A,{className:"Button Button--text Button--link",onclick:this.signUp.bind(this)})})))}forgotPassword(){const t=this.identification(),o=t.includes("@")?{email:t}:void 0;a.A.modal.show(h,o)}signUp(){const t=this.identification(),o={[t.includes("@")?"email":"username"]:t};a.A.modal.show((()=>r.e(559).then(r.bind(r,9509))),o)}onready(){this.$("[name="+(this.identification()?"password":"identification")+"]").trigger("select")}onsubmit(t){t.preventDefault(),this.loading=!0,a.A.session.login(this.loginParams(),{errorHandler:this.onerror.bind(this)}).then((()=>window.location.reload()),this.loaded.bind(this))}loginParams(){return{identification:this.identification(),password:this.password(),remember:this.remember()}}onerror(t){401===t.status&&t.alert&&(t.alert.content=a.A.translator.trans("core.forum.log_in.invalid_login_message"),this.password("")),super.onerror(t)}}flarum.reg.add("core","forum/components/LogInModal",p),flarum.reg.addChunkModule("559","9509","core","forum/components/SignUpModal")}}]);


//# sourceMappingURL=http://128.199.18.39/assets/js/core/forum/components/LogInModal.js.map