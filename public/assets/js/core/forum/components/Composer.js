"use strict";(self.webpackChunkflarum_core=self.webpackChunkflarum_core||[]).push([[366],{8139:(t,i,s)=>{s.r(i),s.d(i,{default:()=>l});var e=s(3554),o=s(5710),n=s(6064),h=s(3092);class a extends h.A{static initAttrs(t){super.initAttrs(t),t.className=t.className||"Button Button--icon Button--link"}}flarum.reg.add("core","forum/components/ComposerButton",a);var r=s(5673),c=s(4268),d=s(8825);class l extends o.A{oninit(t){super.oninit(t),this.state=this.attrs.state,this.active=!1,this.prevPosition=this.state.position,this.textEditorBuilt=!1}view(){const t=this.state.body,i={normal:this.state.position===d.A.Position.NORMAL,minimized:this.state.position===d.A.Position.MINIMIZED,fullScreen:this.state.position===d.A.Position.FULLSCREEN,active:this.active,visible:this.state.isVisible()},s=this.state.position===d.A.Position.MINIMIZED?this.state.show.bind(this.state):void 0,e=t.componentClass;return m("div",{className:"Composer "+(0,c.A)(i)},m("div",{className:"Composer-handle",oncreate:this.configHandle.bind(this)}),m("ul",{className:"Composer-controls"},(0,r.A)(this.controlItems().toArray())),m("div",{className:"Composer-content",onclick:s},e&&m(e,Object.assign({},t.attrs,{composer:this.state,disabled:i.minimized,onTextEditorBuilt:this.onTextEditorBuilt.bind(this)}))))}onupdate(t){super.onupdate(t),this.textEditorBuilt&&this.updateContainer()}onTextEditorBuilt(){this.updateContainer(),this.textEditorBuilt=!0}updateContainer(){this.state.position===this.prevPosition?this.updateHeight():(this.animatePositionChange(),this.prevPosition=this.state.position)}oncreate(t){super.oncreate(t),this.initializeHeight(),this.$().hide().css("bottom",-this.state.computedHeight()),this.$().on("focus blur",":input,.TextEditor-editorContainer",(t=>{this.active="focusin"===t.type,m.redraw()})),this.$().on("keydown",":input,.TextEditor-editorContainer","esc",(()=>this.state.close())),this.handlers={},$(window).on("resize",this.handlers.onresize=this.updateHeight.bind(this)).resize(),$(document).on("mousemove",this.handlers.onmousemove=this.onmousemove.bind(this)).on("mouseup",this.handlers.onmouseup=this.onmouseup.bind(this))}onremove(t){super.onremove(t),$(window).off("resize",this.handlers.onresize),$(document).off("mousemove",this.handlers.onmousemove).off("mouseup",this.handlers.onmouseup)}configHandle(t){const i=this;$(t.dom).css("cursor","row-resize").bind("dragstart mousedown",(t=>t.preventDefault())).mousedown((function(t){i.mouseStart=t.clientY,i.heightStart=i.$().height(),i.handle=$(this),$("body").css("cursor","row-resize")}))}onmousemove(t){if(!this.handle)return;const i=this.mouseStart-t.clientY;this.changeHeight(this.heightStart+i);const s=$(window).scrollTop(),e=s>0&&s+$(window).height()>=$(document).height();this.updateBodyPadding(e)}onmouseup(){this.handle&&(this.handle=null,$("body").css("cursor",""))}focus(){this.$(this.attrs.state.body.componentClass.focusOnSelector?.()||".Composer-content :input:enabled:visible, .TextEditor-editor").first().focus()}updateHeight(){const t=this.state.computedHeight(),i=this.$(".Composer-flexible");if(this.$().height(t),i.length){const t=i.offset().top-this.$().offset().top,s=parseInt(i.css("padding-bottom"),10),e=this.$(".Composer-footer").outerHeight(!0);i.height(this.$().outerHeight()-t-s-e)}}updateBodyPadding(){const t=this.state.position!==d.A.Position.HIDDEN&&this.state.position!==d.A.Position.MINIMIZED&&"phone"!==e.A.screen()?this.state.computedHeight()-parseInt($("#app").css("padding-bottom"),10):0;$("#content").css({paddingBottom:t})}animatePositionChange(){if(this.prevPosition!==d.A.Position.FULLSCREEN||this.state.position!==d.A.Position.NORMAL)switch(this.state.position){case d.A.Position.HIDDEN:return this.hide();case d.A.Position.MINIMIZED:return this.minimize();case d.A.Position.FULLSCREEN:return this.focus();case d.A.Position.NORMAL:return this.show()}else this.focus()}animateHeightChange(){const t=this.$().stop(!0),i=t.outerHeight(),s=$(window).scrollTop();t.show(),this.updateHeight();const e=t.outerHeight();this.prevPosition===d.A.Position.HIDDEN?t.css({bottom:-e,height:e}):t.css({height:i});const o=t.animate({bottom:0,height:e},"fast").promise();return this.updateBodyPadding(),$(window).scrollTop(s),o}showBackdrop(){this.$backdrop=$("<div/>").addClass("composer-backdrop").appendTo("body")}hideBackdrop(){this.$backdrop&&this.$backdrop.remove()}show(){if(this.animateHeightChange().then((()=>this.focus())),"phone"===e.A.screen()){const t=document.documentElement,i=Math.min(t.scrollTop,t.scrollHeight-t.clientHeight);this.$().css("top",$(".App").is(".mobile-safari")?i:0),this.showBackdrop()}}hide(){const t=this.$();t.stop(!0).animate({bottom:-t.height()},"fast",(()=>{t.hide(),this.hideBackdrop(),this.updateBodyPadding()}))}minimize(){this.animateHeightChange(),this.$().css("top","auto"),this.hideBackdrop()}controlItems(){const t=new n.A;return this.state.position===d.A.Position.FULLSCREEN?t.add("exitFullScreen",m(a,{icon:"fas fa-compress",title:e.A.translator.trans("core.forum.composer.exit_full_screen_tooltip"),onclick:this.state.exitFullScreen.bind(this.state)})):(this.state.position!==d.A.Position.MINIMIZED&&(t.add("minimize",m(a,{icon:(0,c.A)("fas minimize",{"fa-minus":"phone"!==e.A.screen(),"fa-times":"phone"===e.A.screen()}),title:e.A.translator.trans("core.forum.composer.minimize_tooltip"),onclick:this.state.minimize.bind(this.state),itemClassName:"App-backControl"})),t.add("fullScreen",m(a,{icon:"fas fa-expand",title:e.A.translator.trans("core.forum.composer.full_screen_tooltip"),onclick:this.state.fullScreen.bind(this.state)}))),t.add("close",m(a,{icon:"fas fa-times",title:e.A.translator.trans("core.forum.composer.close_tooltip"),onclick:this.state.close.bind(this.state)}))),t}initializeHeight(){this.state.height=localStorage.getItem("composerHeight"),this.state.height||(this.state.height=this.defaultHeight())}defaultHeight(){return this.$().height()}changeHeight(t){this.state.height=t,this.updateHeight(),localStorage.setItem("composerHeight",this.state.height)}}flarum.reg.add("core","forum/components/Composer",l)}}]);


//# sourceMappingURL=http://128.199.18.39/assets/js/core/forum/components/Composer.js.map