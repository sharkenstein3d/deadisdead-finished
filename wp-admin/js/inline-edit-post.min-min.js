window.wp=window.wp||{};var inlineEditPost;!function(t,e){inlineEditPost={init:function(){var e=this,i=t("#inline-edit"),n=t("#bulk-edit");e.type=t("table.widefat").hasClass("pages")?"page":"post",e.what="#post-",i.keyup(function(t){if(27===t.which)return inlineEditPost.revert()}),n.keyup(function(t){if(27===t.which)return inlineEditPost.revert()}),t(".cancel",i).click(function(){return inlineEditPost.revert()}),t(".save",i).click(function(){return inlineEditPost.save(this)}),t("td",i).keydown(function(e){if(13===e.which&&!t(e.target).hasClass("cancel"))return inlineEditPost.save(this)}),t(".cancel",n).click(function(){return inlineEditPost.revert()}),t('#inline-edit .inline-edit-private input[value="private"]').click(function(){var e=t("input.inline-edit-password-input");t(this).prop("checked")?e.val("").prop("disabled",!0):e.prop("disabled",!1)}),t("#the-list").on("click","a.editinline",function(t){t.preventDefault(),inlineEditPost.edit(this)}),t("#bulk-edit").find("fieldset:first").after(t("#inline-edit fieldset.inline-edit-categories").clone()).siblings("fieldset:last").prepend(t("#inline-edit label.inline-edit-tags").clone()),t('select[name="_status"] option[value="future"]',n).remove(),t("#doaction, #doaction2").click(function(i){var n;e.whichBulkButtonId=t(this).attr("id"),n=e.whichBulkButtonId.substr(2),"edit"===t('select[name="'+n+'"]').val()?(i.preventDefault(),e.setBulk()):t("form#posts-filter tr.inline-editor").length>0&&e.revert()})},toggle:function(e){var i=this;"none"===t(i.what+i.getId(e)).css("display")?i.revert():i.edit(e)},setBulk:function(){var e="",i=this.type,n=!0;return this.revert(),t("#bulk-edit td").attr("colspan",t("th:visible, td:visible",".widefat:first thead").length),t("table.widefat tbody").prepend(t("#bulk-edit")).prepend('<tr class="hidden"></tr>'),t("#bulk-edit").addClass("inline-editor").show(),t('tbody th.check-column input[type="checkbox"]').each(function(){if(t(this).prop("checked")){n=!1;var i,a=t(this).val();i=t("#inline_"+a+" .post_title").html()||inlineEditL10n.notitle,e+='<div id="ttle'+a+'"><a id="_'+a+'" class="ntdelbutton" title="'+inlineEditL10n.ntdeltitle+'">X</a>'+i+"</div>"}}),n?this.revert():(t("#bulk-titles").html(e),t("#bulk-titles a").click(function(){var e=t(this).attr("id").substr(1);t('table.widefat input[value="'+e+'"]').prop("checked",!1),t("#ttle"+e).remove()}),"post"===i&&t("tr.inline-editor textarea[data-wp-taxonomy]").each(function(e,i){t(i).autocomplete("instance")||t(i).wpTagsSuggest()}),void t("html, body").animate({scrollTop:0},"fast"))},edit:function(e){var i,n,a,s,o,l,r,d,c,p,u,h=this,v=!0;for(h.revert(),"object"==typeof e&&(e=h.getId(e)),i=["post_title","post_name","post_author","_status","jj","mm","aa","hh","mn","ss","post_password","post_format","menu_order","page_template"],"page"===h.type&&i.push("post_parent"),n=t("#inline-edit").clone(!0),t("td",n).attr("colspan",t("th:visible, td:visible",".widefat:first thead").length),t(h.what+e).removeClass("is-expanded").hide().after(n).after('<tr class="hidden"></tr>'),a=t("#inline_"+e),t(':input[name="post_author"] option[value="'+t(".post_author",a).text()+'"]',n).val()||t(':input[name="post_author"]',n).prepend('<option value="'+t(".post_author",a).text()+'">'+t("#"+h.type+"-"+e+" .author").text()+"</option>"),1===t(':input[name="post_author"] option',n).length&&t("label.inline-edit-author",n).hide(),c=0;c<i.length;c++)p=t("."+i[c],a),p.find("img").replaceWith(function(){return this.alt}),p=p.text(),t(':input[name="'+i[c]+'"]',n).val(p);if("open"===t(".comment_status",a).text()&&t('input[name="comment_status"]',n).prop("checked",!0),"open"===t(".ping_status",a).text()&&t('input[name="ping_status"]',n).prop("checked",!0),"sticky"===t(".sticky",a).text()&&t('input[name="sticky"]',n).prop("checked",!0),t(".post_category",a).each(function(){var i,a=t(this).text();a&&(i=t(this).attr("id").replace("_"+e,""),t("ul."+i+"-checklist :checkbox",n).val(a.split(",")))}),t(".tags_input",a).each(function(){var i=t(this),a=t(this).attr("id").replace("_"+e,""),s=t("textarea.tax_input_"+a,n),o=inlineEditL10n.comma;i.find("img").replaceWith(function(){return this.alt}),i=i.text(),i&&(","!==o&&(i=i.replace(/,/g,o)),s.val(i)),s.wpTagsSuggest()}),s=t("._status",a).text(),"future"!==s&&t('select[name="_status"] option[value="future"]',n).remove(),u=t(".inline-edit-password-input").prop("disabled",!1),"private"===s&&(t('input[name="keep_private"]',n).prop("checked",!0),u.val("").prop("disabled",!0)),o=t('select[name="post_parent"] option[value="'+e+'"]',n),o.length>0){for(l=o[0].className.split("-")[1],r=o;v&&(r=r.next("option"),0!==r.length);)d=r[0].className.split("-")[1],d<=l?v=!1:(r.remove(),r=o);o.remove()}return t(n).attr("id","edit-"+e).addClass("inline-editor").show(),t(".ptitle",n).focus(),!1},save:function(i){var n,a,s=t(".post_status_page").val()||"";return"object"==typeof i&&(i=this.getId(i)),t("table.widefat .spinner").addClass("is-active"),n={action:"inline-save",post_type:typenow,post_ID:i,edit_date:"true",post_status:s},a=t("#edit-"+i).find(":input").serialize(),n=a+"&"+t.param(n),t.post(ajaxurl,n,function(n){var a=t("#edit-"+i+" .inline-edit-save .error");t("table.widefat .spinner").removeClass("is-active"),t(".ac_results").hide(),n?-1!==n.indexOf("<tr")?(t(inlineEditPost.what+i).siblings("tr.hidden").addBack().remove(),t("#edit-"+i).before(n).remove(),t(inlineEditPost.what+i).hide().fadeIn(400,function(){t(this).find(".editinline").focus(),e.a11y.speak(inlineEditL10n.saved)})):(n=n.replace(/<.[^<>]*?>/g,""),a.html(n).show(),e.a11y.speak(a.text())):(a.html(inlineEditL10n.error).show(),e.a11y.speak(inlineEditL10n.error))},"html"),!1},revert:function(){var e=t(".widefat"),i=t(".inline-editor",e).attr("id");return i&&(t(".spinner",e).removeClass("is-active"),t(".ac_results").hide(),"bulk-edit"===i?(t("#bulk-edit",e).removeClass("inline-editor").hide().siblings(".hidden").remove(),t("#bulk-titles").empty(),t("#inlineedit").append(t("#bulk-edit")),t("#"+inlineEditPost.whichBulkButtonId).focus()):(t("#"+i).siblings("tr.hidden").addBack().remove(),i=i.substr(i.lastIndexOf("-")+1),t(this.what+i).show().find(".editinline").focus())),!1},getId:function(e){var i=t(e).closest("tr").attr("id"),n=i.split("-");return n[n.length-1]}},t(document).ready(function(){inlineEditPost.init()}),t(document).on("heartbeat-tick.wp-check-locked-posts",function(e,i){var n=i["wp-check-locked-posts"]||{};t("#the-list tr").each(function(e,i){var a,s,o=i.id,l=t(i);n.hasOwnProperty(o)?l.hasClass("wp-locked")||(a=n[o],l.find(".column-title .locked-text").text(a.text),l.find(".check-column checkbox").prop("checked",!1),a.avatar_src&&(s=t('<img class="avatar avatar-18 photo" width="18" height="18" alt="" />').attr("src",a.avatar_src.replace(/&amp;/g,"&")),l.find(".column-title .locked-avatar").empty().append(s)),l.addClass("wp-locked")):l.hasClass("wp-locked")&&l.removeClass("wp-locked").delay(1e3).find(".locked-info span").empty()})}).on("heartbeat-send.wp-check-locked-posts",function(e,i){var n=[];t("#the-list tr").each(function(t,e){e.id&&n.push(e.id)}),n.length&&(i["wp-check-locked-posts"]=n)}).ready(function(){void 0!==e&&e.heartbeat&&e.heartbeat.interval(15)})}(jQuery,window.wp);