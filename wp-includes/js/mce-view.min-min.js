!function(e,t,n,i){"use strict";var s={},o={};t.mce=t.mce||{},t.mce.views={register:function(e,n){s[e]=t.mce.View.extend(_.extend(n,{type:e}))},unregister:function(e){delete s[e]},get:function(e){return s[e]},unbind:function(){_.each(o,function(e){e.unbind()})},setMarkers:function(e){var t,n,i=[{content:e}],o=this;return _.each(s,function(e,s){n=i.slice(),i=[],_.each(n,function(n){var a,r,d=n.content;if(n.processed)return void i.push(n);for(;d&&(a=e.prototype.match(d));)a.index&&i.push({content:d.substring(0,a.index)}),t=o.createInstance(s,a.content,a.options),r=t.loader?".":t.text,i.push({content:t.ignore?r:'<p data-wpview-marker="'+t.encodedText+'">'+r+"</p>",processed:!0}),d=d.slice(a.index+a.content.length);d&&i.push({content:d})})}),e=_.pluck(i,"content").join(""),e.replace(/<p>\s*<p data-wpview-marker=/g,"<p data-wpview-marker=").replace(/<\/p>\s*<\/p>/g,"</p>")},createInstance:function(e,t,n,i){var s,a,r=this.get(e);return t=tinymce.DOM.decode(t),-1!==t.indexOf("[")&&-1!==t.indexOf("]")&&(t=t.replace(/\[[^\]]+\]/g,function(e){return e.replace(/[\r\n]/g,"")})),!i&&(a=this.getInstance(t))?a:(s=encodeURIComponent(t),n=_.extend(n||{},{text:t,encodedText:s}),o[s]=new r(n))},getInstance:function(e){return"string"==typeof e?o[encodeURIComponent(e)]:o[i(e).attr("data-wpview-text")]},getText:function(e){return decodeURIComponent(i(e).attr("data-wpview-text")||"")},render:function(e){_.each(o,function(t){t.render(null,e)})},update:function(e,t,n,i){var s=this.getInstance(n);s&&s.update(e,t,n,i)},edit:function(e,t){var n=this.getInstance(t);n&&n.edit&&n.edit(n.text,function(i,s){n.update(i,e,t,s)})},remove:function(e,t){var n=this.getInstance(t);n&&n.remove(e,t)}},t.mce.View=function(e){_.extend(this,e),this.initialize()},t.mce.View.extend=Backbone.View.extend,_.extend(t.mce.View.prototype,{content:null,loader:!0,initialize:function(){},getContent:function(){return this.content},render:function(e,t){null!=e&&(this.content=e),e=this.getContent(),(this.loader||e)&&(t&&this.unbind(),this.replaceMarkers(),e?this.setContent(e,function(e,t){i(t).data("rendered",!0),this.bindNode.call(this,e,t)},!!t&&null):this.setLoader())},bindNode:function(){},unbindNode:function(){},unbind:function(){this.getNodes(function(e,t){this.unbindNode.call(this,e,t)},!0)},getEditors:function(e){_.each(tinymce.editors,function(t){t.plugins.wpview&&e.call(this,t)},this)},getNodes:function(e,t){this.getEditors(function(n){var s=this;i(n.getBody()).find('[data-wpview-text="'+s.encodedText+'"]').filter(function(){var e;return null==t||(e=!0===i(this).data("rendered"),t?e:!e)}).each(function(){e.call(s,n,this,this)})})},getMarkers:function(e){this.getEditors(function(t){var n=this;i(t.getBody()).find('[data-wpview-marker="'+this.encodedText+'"]').each(function(){e.call(n,t,this)})})},replaceMarkers:function(){this.getMarkers(function(e,t){var n;return this.loader||i(t).text()===this.text?(n=e.$('<div class="wpview wpview-wrap" data-wpview-text="'+this.encodedText+'" data-wpview-type="'+this.type+'" contenteditable="false"></div>'),void e.$(t).replaceWith(n)):void e.dom.setAttrib(t,"data-wpview-marker",null)})},removeMarkers:function(){this.getMarkers(function(e,t){e.dom.setAttrib(t,"data-wpview-marker",null)})},setContent:function(e,t,n){_.isObject(e)&&-1!==e.body.indexOf("<script")?this.setIframes(e.head||"",e.body,t,n):_.isString(e)&&-1!==e.indexOf("<script")?this.setIframes("",e,t,n):this.getNodes(function(n,i){e=e.body||e,-1!==e.indexOf("<iframe")&&(e+='<span class="mce-shim"></span>'),n.undoManager.transact(function(){i.innerHTML="",i.appendChild(_.isString(e)?n.dom.createFragment(e):e),n.dom.add(i,"span",{class:"wpview-end"})}),t&&t.call(this,n,i)},n)},setIframes:function(e,n,s,o){var a=this;this.getNodes(function(o,r){function d(){var e;w||u.contentWindow&&(e=i(u),a.iframeHeight=i(h.body).height(),e.height()!==a.iframeHeight&&(e.height(a.iframeHeight),o.nodeChanged()))}function c(){i(r).data("rendered",null),setTimeout(function(){t.mce.views.render()})}var u,l,h,p,f,m,w,g=o.dom,v="",b=o.getBody().className||"",x=o.getDoc().getElementsByTagName("head")[0];if(tinymce.each(g.$('link[rel="stylesheet"]',x),function(e){e.href&&-1===e.href.indexOf("skins/lightgray/content.min.css")&&-1===e.href.indexOf("skins/wordpress/wp-content.css")&&(v+=g.getOuterHTML(e))}),a.iframeHeight&&g.add(r,"span",{"data-mce-bogus":1,style:{display:"block",width:"100%",height:a.iframeHeight}},"​"),o.undoManager.transact(function(){r.innerHTML="",u=g.add(r,"iframe",{src:tinymce.Env.ie?'javascript:""':"",frameBorder:"0",allowTransparency:"true",scrolling:"no",class:"wpview-sandbox",style:{width:"100%",display:"block"},height:a.iframeHeight}),g.add(r,"span",{class:"mce-shim"}),g.add(r,"span",{class:"wpview-end"})}),u.contentWindow){if(l=u.contentWindow,h=l.document,h.open(),h.write('<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+e+v+'<style>html {background: transparent;padding: 0;margin: 0;}body#wpview-iframe-sandbox {background: transparent;padding: 1px 0 !important;margin: -1px 0 0 !important;}body#wpview-iframe-sandbox:before,body#wpview-iframe-sandbox:after {display: none;content: "";}</style></head><body id="wpview-iframe-sandbox" class="'+b+'">'+n+"</body></html>"),h.close(),a.iframeHeight&&(w=!0,setTimeout(function(){w=!1,d()},3e3)),i(l).on("load",d).on("unload",c),p=l.MutationObserver||l.WebKitMutationObserver||l.MozMutationObserver)f=new p(_.debounce(d,100)),f.observe(h.body,{attributes:!0,childList:!0,subtree:!0});else for(m=1;m<6;m++)setTimeout(d,700*m);s&&s.call(a,o,r)}},o)},setLoader:function(e){this.setContent('<div class="loading-placeholder"><div class="dashicons dashicons-'+(e||"admin-media")+'"></div><div class="wpview-loading"><ins></ins></div></div>')},setError:function(e,t){this.setContent('<div class="wpview-error"><div class="dashicons dashicons-'+(t||"no")+'"></div><p>'+e+"</p></div>")},match:function(e){var t=n.next(this.type,e);if(t)return{index:t.index,content:t.content,options:{shortcode:t.shortcode}}},update:function(e,n,o,a){_.find(s,function(s,r){var d=s.prototype.match(e);if(d)return i(o).data("rendered",!1),n.dom.setAttrib(o,"data-wpview-text",encodeURIComponent(e)),t.mce.views.createInstance(r,e,d.options,a).render(),n.selection.select(o),n.nodeChanged(),n.focus(),!0})},remove:function(e,t){this.unbindNode.call(this,e,t),e.dom.remove(t),e.focus()}})}(window,window.wp,window.wp.shortcode,window.jQuery),function(e,t,n,i){function s(t){var n={};return e.tinymce?!t||-1===t.indexOf("<")&&-1===t.indexOf(">")?t:(c=c||new e.tinymce.html.Schema(n),u=u||new e.tinymce.html.DomParser(n,c),l=l||new e.tinymce.html.Serializer(n,c),l.serialize(u.parse(t,{forced_root_block:!1}))):t.replace(/<[^>]+>/g,"")}var o,a,r,d,c,u,l;o={state:[],edit:function(e,t){var i=this.type,s=n[i].edit(e);this.pausePlayers&&this.pausePlayers(),_.each(this.state,function(e){s.state(e).on("update",function(e){t(n[i].shortcode(e).string(),"gallery"===i)})}),s.on("close",function(){s.detach()}),s.open()}},a=_.extend({},o,{state:["gallery-edit"],template:n.template("editor-gallery"),initialize:function(){var e=n.gallery.attachments(this.shortcode,n.view.settings.post.id),t=this.shortcode.attrs.named,i=this;e.more().done(function(){e=e.toJSON(),_.each(e,function(e){e.sizes&&(t.size&&e.sizes[t.size]?e.thumbnail=e.sizes[t.size]:e.sizes.thumbnail?e.thumbnail=e.sizes.thumbnail:e.sizes.full&&(e.thumbnail=e.sizes.full))}),i.render(i.template({verifyHTML:s,attachments:e,columns:t.columns?parseInt(t.columns,10):n.galleryDefaults.columns}))}).fail(function(e,t){i.setError(t)})}}),r=_.extend({},o,{action:"parse-media-shortcode",initialize:function(){var e=this;this.url&&(this.loader=!1,this.shortcode=n.embed.shortcode({url:this.text})),wp.ajax.post(this.action,{post_ID:n.view.settings.post.id,type:this.shortcode.tag,shortcode:this.shortcode.string()}).done(function(t){e.render(t)}).fail(function(t){e.url?(e.ignore=!0,e.removeMarkers()):e.setError(t.message||t.statusText,"admin-media")}),this.getEditors(function(t){t.on("wpview-selected",function(){e.pausePlayers()})})},pausePlayers:function(){this.getNodes(function(e,t,n){var s=i("iframe.wpview-sandbox",n).get(0);s&&(s=s.contentWindow)&&s.mejs&&_.each(s.mejs.players,function(e){try{e.pause()}catch(e){}})})}}),d=_.extend({},r,{action:"parse-embed",edit:function(e,t){var i=n.embed.edit(e,this.url),s=this;this.pausePlayers(),i.state("embed").props.on("change:url",function(e,t){t&&e.get("url")&&(i.state("embed").metadata=e.toJSON())}),i.state("embed").on("select",function(){var e=i.state("embed").metadata;t(s.url?e.url:n.embed.shortcode(e).string())}),i.on("close",function(){i.detach()}),i.open()}}),t.register("gallery",_.extend({},a)),t.register("audio",_.extend({},r,{state:["audio-details"]})),t.register("video",_.extend({},r,{state:["video-details"]})),t.register("playlist",_.extend({},r,{state:["playlist-edit","video-playlist-edit"]})),t.register("embed",_.extend({},d)),t.register("embedURL",_.extend({},d,{match:function(e){var t=/(^|<p>)(https?:\/\/[^\s"]+?)(<\/p>\s*|$)/gi,n=t.exec(e);if(n)return{index:n.index+n[1].length,content:n[2],options:{url:!0}}}}))}(window,window.wp.mce.views,window.wp.media,window.jQuery);