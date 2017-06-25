!function(e,t){var n,i=wp.customize,s={};!function(e){var n;e.replaceState&&(n=function(e){var n,s,r;return n=document.createElement("a"),n.href=e,s=i.utils.parseQueryString(location.search.substr(1)),r=i.utils.parseQueryString(n.search.substr(1)),r.customize_changeset_uuid=s.customize_changeset_uuid,s.customize_theme&&(r.customize_theme=s.customize_theme),s.customize_messenger_channel&&(r.customize_messenger_channel=s.customize_messenger_channel),n.search=t.param(r),n.href},e.replaceState=function(t){return function(i,r,a){return s=i,t.call(e,i,r,"string"==typeof a&&a.length>0?n(a):a)}}(e.replaceState),e.pushState=function(t){return function(i,r,a){return s=i,t.call(e,i,r,"string"==typeof a&&a.length>0?n(a):a)}}(e.pushState),window.addEventListener("popstate",function(e){s=e.state}))}(history),n=function(e,t,n){var i;return function(){var s=arguments;n=n||this,clearTimeout(i),i=setTimeout(function(){i=null,e.apply(n,s)},t)}},i.Preview=i.Messenger.extend({initialize:function(e,s){var r=this,a=document.createElement("a");i.Messenger.prototype.initialize.call(r,e,s),a.href=r.origin(),r.add("scheme",a.protocol.replace(/:$/,"")),r.body=t(document.body),r.window=t(window),i.settings.channel&&(r.body.on("click.preview","a",function(e){r.handleLinkClick(e)}),r.body.on("submit.preview","form",function(e){r.handleFormSubmit(e)}),r.window.on("scroll.preview",n(function(){r.send("scroll",r.window.scrollTop())},200)),r.bind("scroll",function(e){r.window.scrollTop(e)}))},handleLinkClick:function(e){var n,s,r=this;if(n=t(e.target).closest("a"),!_.isUndefined(n.attr("href"))&&!(s="#"===n.attr("href").substr(0,1))&&/^https?:$/.test(n.prop("protocol"))){if(!i.isLinkPreviewable(n[0]))return wp.a11y.speak(i.settings.l10n.linkUnpreviewable),void e.preventDefault();e.preventDefault(),e.shiftKey||r.send("url",n.prop("href"))}},handleFormSubmit:function(e){var n,s,r=this;return n=document.createElement("a"),s=t(e.target),n.href=s.prop("action"),"GET"===s.prop("method").toUpperCase()&&i.isLinkPreviewable(n)?(e.isDefaultPrevented()||(n.search.length>1&&(n.search+="&"),n.search+=s.serialize(),r.send("url",n.href)),void e.preventDefault()):(wp.a11y.speak(i.settings.l10n.formUnpreviewable),void e.preventDefault())}}),i.addLinkPreviewing=function(){var e="a[href], area";t(document.body).find(e).each(function(){i.prepareLinkPreview(this)}),"undefined"!=typeof MutationObserver?(i.mutationObserver=new MutationObserver(function(n){_.each(n,function(n){t(n.target).find(e).each(function(){i.prepareLinkPreview(this)})})}),i.mutationObserver.observe(document.documentElement,{childList:!0,subtree:!0})):t(document.documentElement).on("click focus mouseover",e,function(){i.prepareLinkPreview(this)})},i.isLinkPreviewable=function(e,t){var n,s,r,a;return r=_.extend({},{allowAdminAjax:!1},t||{}),"javascript:"===e.protocol||("https:"===e.protocol||"http:"===e.protocol)&&(a=e.host.replace(/:(80|443)$/,""),s=document.createElement("a"),!!(n=!_.isUndefined(_.find(i.settings.url.allowed,function(t){return s.href=t,s.protocol===e.protocol&&s.host.replace(/:(80|443)$/,"")===a&&0===e.pathname.indexOf(s.pathname.replace(/\/$/,""))})))&&!/\/wp-(login|signup)\.php$/.test(e.pathname)&&(/\/wp-admin\/admin-ajax\.php$/.test(e.pathname)?r.allowAdminAjax:!/\/wp-(admin|includes|content)(\/|$)/.test(e.pathname)))},i.prepareLinkPreview=function(e){var n;if(!t(e).closest("#wpadminbar").length&&"#"!==t(e).attr("href").substr(0,1)&&/^https?:$/.test(e.protocol)){if(i.settings.channel&&"https"===i.preview.scheme.get()&&"http:"===e.protocol&&-1!==i.settings.url.allowedHosts.indexOf(e.host)&&(e.protocol="https:"),!i.isLinkPreviewable(e))return void(i.settings.channel&&t(e).addClass("customize-unpreviewable"));t(e).removeClass("customize-unpreviewable"),n=i.utils.parseQueryString(e.search.substring(1)),n.customize_changeset_uuid=i.settings.changeset.uuid,i.settings.theme.active||(n.customize_theme=i.settings.theme.stylesheet),i.settings.channel&&(n.customize_messenger_channel=i.settings.channel),e.search=t.param(n),i.settings.channel&&(e.target="_self")}},i.addRequestPreviewing=function(){var e=function(e,n,s){var r,a,o,c={};r=document.createElement("a"),r.href=e.url,i.isLinkPreviewable(r,{allowAdminAjax:!0})&&(a=i.utils.parseQueryString(r.search.substring(1)),i.each(function(e){e._dirty&&(c[e.id]=e.get())}),_.isEmpty(c)||(o=e.type.toUpperCase(),"POST"!==o&&(s.setRequestHeader("X-HTTP-Method-Override",o),a._method=o,e.type="POST"),e.data?e.data+="&":e.data="",e.data+=t.param({customized:JSON.stringify(c)})),a.customize_changeset_uuid=i.settings.changeset.uuid,i.settings.theme.active||(a.customize_theme=i.settings.theme.stylesheet),r.search=t.param(a),e.url=r.href)};t.ajaxPrefilter(e)},i.addFormPreviewing=function(){t(document.body).find("form").each(function(){i.prepareFormPreview(this)}),"undefined"!=typeof MutationObserver&&(i.mutationObserver=new MutationObserver(function(e){_.each(e,function(e){t(e.target).find("form").each(function(){i.prepareFormPreview(this)})})}),i.mutationObserver.observe(document.documentElement,{childList:!0,subtree:!0}))},i.prepareFormPreview=function(e){var n,s={};return e.action||(e.action=location.href),n=document.createElement("a"),n.href=e.action,i.settings.channel&&"https"===i.preview.scheme.get()&&"http:"===n.protocol&&-1!==i.settings.url.allowedHosts.indexOf(n.host)&&(n.protocol="https:",e.action=n.href),"GET"===e.method.toUpperCase()&&i.isLinkPreviewable(n)?(t(e).removeClass("customize-unpreviewable"),s.customize_changeset_uuid=i.settings.changeset.uuid,i.settings.theme.active||(s.customize_theme=i.settings.theme.stylesheet),i.settings.channel&&(s.customize_messenger_channel=i.settings.channel),_.each(s,function(n,i){var s=t(e).find('input[name="'+i+'"]');s.length?s.val(n):t(e).prepend(t("<input>",{type:"hidden",name:i,value:n}))}),void(i.settings.channel&&(e.target="_self"))):void(i.settings.channel&&t(e).addClass("customize-unpreviewable"))},i.keepAliveCurrentUrl=function(){var e=location.pathname,n=location.search.substr(1),s=null,r=["customize_theme","customize_changeset_uuid","customize_messenger_channel"];return function(){var a,o;return n===location.search.substr(1)&&e===location.pathname?void i.preview.send("keep-alive"):(a=document.createElement("a"),null===s&&(a.search=n,s=i.utils.parseQueryString(n),_.each(r,function(e){delete s[e]})),a.href=location.href,o=i.utils.parseQueryString(a.search.substr(1)),_.each(r,function(e){delete o[e]}),e===location.pathname&&_.isEqual(s,o)?i.preview.send("keep-alive"):(a.search=t.param(o),a.hash="",i.settings.url.self=a.href,i.preview.send("ready",{currentUrl:i.settings.url.self,activePanels:i.settings.activePanels,activeSections:i.settings.activeSections,activeControls:i.settings.activeControls,settingValidities:i.settings.settingValidities})),s=o,n=location.search.substr(1),void(e=location.pathname))}}(),i.settingPreviewHandlers={custom_logo:function(e){t("body").toggleClass("wp-custom-logo",!!e)},custom_css:function(e){t("#wp-custom-css").text(e)},background:function(){var e="",n={};_.each(["color","image","preset","position_x","position_y","size","repeat","attachment"],function(e){n[e]=i("background_"+e)}),t(document.body).toggleClass("custom-background",!(!n.color()&&!n.image())),n.color()&&(e+="background-color: "+n.color()+";"),n.image()&&(e+='background-image: url("'+n.image()+'");',e+="background-size: "+n.size()+";",e+="background-position: "+n.position_x()+" "+n.position_y()+";",e+="background-repeat: "+n.repeat()+";",e+="background-attachment: "+n.attachment()+";"),t("#custom-background-css").text("body.custom-background { "+e+" }")}},t(function(){var e,n;i.settings=window._wpCustomizeSettings,i.settings&&(i.preview=new i.Preview({url:window.location.href,channel:i.settings.channel}),i.addLinkPreviewing(),i.addRequestPreviewing(),i.addFormPreviewing(),n=function(e,t,n){var s=i(e);s?s.set(t):(n=n||!1,s=i.create(e,t,{id:e}),n&&(s._dirty=!0))},i.preview.bind("settings",function(e){t.each(e,n)}),i.preview.trigger("settings",i.settings.values),t.each(i.settings._dirty,function(e,t){var n=i(t);n&&(n._dirty=!0)}),i.preview.bind("setting",function(e){var t=!0;n.apply(null,e.concat(!0))}),i.preview.bind("sync",function(e){e.settings&&e["settings-modified-while-loading"]&&_.each(_.keys(e.settings),function(t){i.has(t)&&!e["settings-modified-while-loading"][t]&&delete e.settings[t]}),t.each(e,function(e,t){i.preview.trigger(e,t)}),i.preview.send("synced")}),i.preview.bind("active",function(){i.preview.send("nonce",i.settings.nonce),i.preview.send("documentTitle",document.title),i.preview.send("scroll",t(window).scrollTop())}),i.preview.bind("saved",function(e){e.next_changeset_uuid&&(i.settings.changeset.uuid=e.next_changeset_uuid,t(document.body).find("a[href], area").each(function(){i.prepareLinkPreview(this)}),t(document.body).find("form").each(function(){i.prepareFormPreview(this)}),history.replaceState&&history.replaceState(s,"",location.href)),i.trigger("saved",e)}),i.preview.bind("changeset-saved",function(e){_.each(e.saved_changeset_values,function(e,t){var n=i(t);n&&_.isEqual(n.get(),e)&&(n._dirty=!1)})}),i.preview.bind("nonce-refresh",function(e){t.extend(i.settings.nonce,e)}),i.preview.send("ready",{currentUrl:i.settings.url.self,activePanels:i.settings.activePanels,activeSections:i.settings.activeSections,activeControls:i.settings.activeControls,settingValidities:i.settings.settingValidities}),setInterval(i.keepAliveCurrentUrl,i.settings.timeouts.keepAliveSend),i.preview.bind("loading-initiated",function(){t("body").addClass("wp-customizer-unloading")}),i.preview.bind("loading-failed",function(){t("body").removeClass("wp-customizer-unloading")}),e=t.map(["color","image","preset","position_x","position_y","size","repeat","attachment"],function(e){return"background_"+e}),i.when.apply(i,e).done(function(){t.each(arguments,function(){this.bind(i.settingPreviewHandlers.background)})}),i("custom_logo",function(e){i.settingPreviewHandlers.custom_logo.call(e,e.get()),e.bind(i.settingPreviewHandlers.custom_logo)}),i("custom_css["+i.settings.theme.stylesheet+"]",function(e){e.bind(i.settingPreviewHandlers.custom_css)}),i.trigger("preview-ready"))})}(wp,jQuery);