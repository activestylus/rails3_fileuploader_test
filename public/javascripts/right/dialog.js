/**
 * Standard dialog widget for RightJS
 * http://rightjs.org/ui/dialog
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */
var Dialog=RightJS.Dialog=function(d){var h=d.$,o=d.$w,g=d.$E,i=d.Class,j=d.Object,l=d.Element,m=new d.Class(d.Element,{initialize:function(a,c){this.$super("div",c);this._.innerHTML=a;this.addClass("rui-button");this.on("selectstart","stopEvent")},disable:function(){return this.addClass("rui-button-disabled")},enable:function(){return this.removeClass("rui-button-disabled")},disabled:function(){return this.hasClass("rui-button-disabled")},enabled:function(){return!this.disabled()},fire:function(){this.enabled()&&
this.$super.apply(this,arguments);return this}}),p=new d.Class(d.Element,{initialize:function(a){this.$super("div",{"class":"rui-spinner"});this.dots=[];for(var c=0;c<(a||4);c++)this.dots.push(new d.Element("div"));this.dots[0].addClass("glowing");this.insert(this.dots);d(this.shift).bind(this).periodical(300)},shift:function(){if(this.visible()){var a=this.dots.pop();this.dots.unshift(a);this.insert(a,"top")}}}),b=new (function(a,c){if(!c){c=a;a="DIV"}var f=new d.Class(d.Element.Wrappers[a]||d.Element,
{initialize:function(k,e){this.key=k;var n=[{"class":"rui-"+k}];this instanceof d.Input||this instanceof d.Form||n.unshift(a);this.$super.apply(this,n);if(d.isString(e))e=d.$(e);if(e instanceof d.Element){this._=e._;if("$listeners"in e)e.$listeners=e.$listeners;e={}}this.setOptions(e,this);return d.Wrapper.Cache[d.$uid(this._)]=this},setOptions:function(k,e){e=e||this;d.Options.setOptions.call(this,d.Object.merge(k,eval("("+(e.get("data-"+this.key)||"{}")+")")));return this}});f=new d.Class(f,c);
d.Observer.createShortcuts(f.prototype,f.EVENTS||[]);return f})({extend:{version:"2.2.0",EVENTS:o("ok cancel help expand collapse resize load"),Options:{lockScreen:true,fxDuration:"short",draggable:true,closeable:true,expandable:false,showHelp:false,showIcon:null,title:null,html:null,url:null},i18n:{Ok:"Ok",Close:"Close",Cancel:"Cancel",Help:"Help",Expand:"Expand",Collapse:"Collapse",Alert:"Warning!",Confirm:"Confirm",Prompt:"Enter"},current:false,dragged:false},initialize:function(a){this.$super("dialog",
a).append(this.head=new b.Head(this),this.body=new b.Body(this),this.foot=new b.Foot(this)).onCancel(this.hide);this.locker=g("div",{"class":"rui-screen-locker"});this.options.title&&this.title(this.options.title);this.options.html&&this.html(this.options.html);this.options.url&&this.load(this.options.url)},show:function(){this.options.lockScreen&&this.locker.insertTo(document.body);this.setStyle("visibility:hidden").insertTo(document.body).resize().setStyle("visibility:visible;opacity:0");this.options.fxDuration?
this.morph({opacity:1},{duration:this.options.fxDuration}):this.setStyle("opacity:1");return b.current=this},hide:function(){this.locker.remove();this.remove();b.current=false;return this},resize:function(){arguments.length&&this.$super.apply(this,arguments);var a=this.size(),c=h(window).size();if(this.expanded){a.x=c.x-20;a.y=c.y-10;this.$super.call(this,a)}this.setStyle({top:(c.y-a.y)/2+h(window).scrolls().y+"px",left:(c.x-a.x-16)/2+"px"});return this.fire("resize")},title:function(a){if(arguments.length){this.head.title.html(a);
return this}else return this.head.title.html()},update:function(a){this.body.update(a);return this.resize()},html:function(){return arguments.length?this.$super.apply(this,arguments):this.body.html()},load:function(a,c){this.show();this.body.load(a,c);return this},expand:function(){if(!this.expanded){this._prevSize=this.size();this.resize({x:h(window).size().x-20,y:h(window).size().y-10});this.expanded=true;this.fire("expand")}return this},collapse:function(){if(this.expanded){this.expanded=false;
this.resize(this._prevSize);this.fire("collapse")}return this}});b.Head=new i(l,{initialize:function(a){this.dialog=a;this.options=a.options;this.$super("div",{"class":"rui-dialog-head"});this.append(this.icon=g("div",{"class":"icon"}),this.title=g("div",{"class":"title",html:"&nbsp;"}),this.tools=g("div",{"class":"tools"}));this.fsButton=g("div",{"class":"expand",html:"&equiv;",title:b.i18n.Expand}).onClick(function(){if(a.expanded){a.collapse();this.html("&equiv;").set("title",b.i18n.Expand)}else{a.expand();
this.html("_").set("title",b.i18n.Collapse)}});this.closeButton=g("div",{"class":"close",html:"&times;",title:b.i18n.Close}).onClick(function(){a.fire("cancel")});this.options.expandable&&this.tools.insert(this.fsButton);this.options.closeable&&this.tools.insert(this.closeButton);this.on({selectstart:function(c){c.stop()},mousedown:this.dragStart});this.options.draggable||this.dialog.addClass("rui-dialog-nodrag")},dragStart:function(a){if(this.options.draggable&&!a.find("div.tools div")){var c=this.dialog.dimensions(),
f=a.position();this.xDiff=c.left-f.x;this.yDiff=c.top-f.y;this.maxX=h(window).size().x-c.width-20;this.dlgStyle=this.dialog.get("style");b.dragged=this.dialog;a.stop()}},dragMove:function(a){var c=a.position();a=c.x+this.xDiff;c=c.y+this.yDiff;if(a<0)a=0;else if(a>this.maxX)a=this.maxX;if(c<0)c=0;this.dlgStyle.top=c+"px";this.dlgStyle.left=a+"px"},dragStop:function(){b.dragged=false}});b.Body=new i(l,{initialize:function(a){this.dialog=a;this.options=a.options;this.$super("div",{"class":"rui-dialog-body"});
this.locker=g("div",{"class":"rui-dialog-body-locker"}).insert(new p)},load:function(a,c){this.insert(this.locker,"top");this.xhr=(new Xhr(a,j.merge({method:"get"},c))).onComplete(d(function(f){this.update(f.text);this.dialog.resize().fire("load")}).bind(this)).send();return this},update:function(a){this.$super(a);this.options.showIcon&&this.insert('<div class="rui-dialog-body-icon">'+this.options.showIcon+"</div>","top");return this}});b.Foot=new i(l,{initialize:function(a){this.$super("div",{"class":"rui-dialog-foot"});
this.dialog=a;a.okButton=(new m(b.i18n.Ok,{"class":"ok"})).onClick(function(){a.fire("ok")});a.helpButton=(new m(b.i18n.Help,{"class":"help"})).onClick(function(){a.fire("help")});a.cancelButton=(new m(b.i18n.Cancel,{"class":"cancel"})).onClick(function(){a.fire("cancel")});a.options.showHelp&&this.insert(a.helpButton);a.options.closeable&&this.insert(a.cancelButton);this.insert(a.okButton)}});b.Alert=new i(b,{initialize:function(a){a=j.merge({showIcon:"!",title:b.i18n.Alert},a);this.$super(a);this.addClass("rui-dialog-alert");
this.on("ok","hide")}});b.Confirm=new i(b,{initialize:function(a){a=j.merge({showIcon:"?",title:b.i18n.Confirm},a);this.$super(a);this.addClass("rui-dialog-confirm");this.on("ok","hide")}});b.Prompt=new i(b,{initialize:function(a){a=j.merge({showIcon:"&#x27A5;",title:b.i18n.Prompt,label:b.i18n.Prompt},a);this.$super(a);this.addClass("rui-dialog-prompt");this.html([g("label",{html:this.options.label}),this.input=new d.Input(this.options.input||{})]);this.input.get("type")!=="textarea"&&this.input.onKeydown(d(function(c){c.keyCode===
13&&this.fire("ok")}).bind(this))},show:function(){this.$super.apply(this,arguments);this.input.select();return this}});h(document).on({keydown:function(a){if(a.keyCode===27&&b.current)b.current.options.closeable&&b.current.fire("cancel");else if(a.keyCode===13&&b.current)if(!(b.current instanceof b.Prompt)){a.stop();b.current.fire("ok")}},mousemove:function(a){b.dragged&&b.dragged.head.dragMove(a)},mouseup:function(a){b.dragged&&b.dragged.head.dragStop(a)}});h(window).onResize(function(){b.current&&
b.current.resize()});document.write('<style type="text/css"> *.rui-button{display:inline-block; *display:inline; *zoom:1;height:1em;line-height:1em;margin:0;padding:.2em .5em;text-align:center;border:1px solid #CCC;border-radius:.2em;-moz-border-radius:.2em;-webkit-border-radius:.2em;cursor:pointer;color:#333;background-color:#FFF;user-select:none;-moz-user-select:none;-webkit-user-select:none} *.rui-button:hover{color:#111;border-color:#999;background-color:#DDD;box-shadow:#888 0 0 .1em;-moz-box-shadow:#888 0 0 .1em;-webkit-box-shadow:#888 0 0 .1em} *.rui-button:active{color:#000;border-color:#777;text-indent:1px;box-shadow:none;-moz-box-shadow:none;-webkit-box-shadow:none} *.rui-button-disabled, *.rui-button-disabled:hover, *.rui-button-disabled:active{color:#888;background:#DDD;border-color:#CCC;cursor:default;text-indent:0;box-shadow:none;-moz-box-shadow:none;-webkit-box-shadow:none}div.rui-spinner,div.rui-spinner div{margin:0;padding:0;border:none;background:none;list-style:none;font-weight:normal;float:none;display:inline-block; *display:inline; *zoom:1;border-radius:.12em;-moz-border-radius:.12em;-webkit-border-radius:.12em}div.rui-spinner{text-align:center;white-space:nowrap;background:#EEE;border:1px solid #DDD;height:1.2em;padding:0 .2em}div.rui-spinner div{width:.4em;height:70%;background:#BBB;margin-left:1px}div.rui-spinner div:first-child{margin-left:0}div.rui-spinner div.glowing{background:#777}div.rui-screen-locker{position:fixed;top:0;left:0;width:100%;height:100%;margin:0;padding:0;background:#000;opacity:.5;filter:alpha(opacity=50);z-index:99999;cursor:default}div.rui-dialog{position:absolute;z-index:99999;background:white;margin:0;padding:0;padding-top:2.5em;padding-bottom:2.8em;border-radius:.35em;-moz-border-radius:.35em;-webkit-border-radius:.35em;border:1px solid #ccc}div.rui-dialog-body{min-width:20em;min-height:4.5em;margin:0;padding:0 1em;height:100%;overflow:auto;position:relative}div.rui-dialog-body-locker{position:absolute;z-index:9999;left:0;top:0;width:100%;height:100%;text-align:center;opacity:.6;filter:alpha(opacity=60)}div.rui-dialog-body-locker div.rui-spinner{border:none;background:none;font-size:150%;margin-top:8%}div.rui-dialog-body-icon{float:left;background:#eee;font-size:360%;font-family:Arial;border:2px solid gray;border-radius:.1em;-moz-border-radius:.1em;-webkit-border-radius:.1em;width:1em;line-height:1em;text-align:center;margin-right:.2em;margin-top:.05em;cursor:default;user-select:none;-moz-user-select:none;-webkit-user-select:none}div.rui-dialog-head{position:absolute;top:0;left:0;margin:0;padding:0;width:100%;line-height:2em;background:#ccc;border-radius:.35em;-moz-border-radius:.35em;-webkit-border-radius:.35em;border-bottom-left-radius:0;border-bottom-right-radius:0;-moz-border-radius-bottomleft:0;-moz-border-radius-bottomright:0;-webkit-border-bottom-left-radius:0;-webkit-border-bottom-right-radius:0;cursor:move;user-select:none;-moz-user-select:none;-webkit-user-select:none}div.rui-dialog-head div.icon{float:left;height:1.4em;width:1.4em;margin-left:1em;margin-top:.3em;margin-right:.3em;display:none}div.rui-dialog-head div.title{margin-left:1em;color:#444}div.rui-dialog-head div.tools{position:absolute;right:.3em;top:.3em}div.rui-dialog-head div.tools div{float:left;width:1.4em;line-height:1.4em;text-align:center;margin-left:.15em;cursor:pointer;background:#aaa;border-radius:.2em;-moz-border-radius:.2em;-webkit-border-radius:.2em;font-family:Verdana;opacity:.6;filter:alpha(opacity=60)}div.rui-dialog-head div.tools div:hover{opacity:1;filter:alpha(opacity=100);box-shadow:#444 0 0 .1em;-moz-box-shadow:#444 0 0 .1em;-webkit-box-shadow:#444 0 0 .1em}div.rui-dialog-head div.tools div.close:hover{background:#daa}div.rui-dialog-nodrag div.rui-dialog-head{cursor:default}div.rui-dialog-foot{position:absolute;bottom:0;left:0;width:100%;text-align:right}div.rui-dialog-foot div.rui-button{margin:.6em 1em;background:#eee;width:4em}div.rui-dialog-foot div.help{float:left}div.rui-dialog-foot div.cancel{margin-right:-.5em}div.rui-dialog-foot div.ok:hover{background-color:#ded}div.rui-dialog-foot div.cancel:hover{background-color:#ecc}div.rui-dialog-alert div.rui-dialog-foot{text-align:center}div.rui-dialog-alert div.rui-dialog-foot div.cancel{display:none}div.rui-dialog-alert div.rui-dialog-body-icon{color:brown;background:#FEE;border-color:brown}div.rui-dialog-confirm div.rui-dialog-body-icon{color:#44A;background:#EEF;border-color:#44a}div.rui-dialog-prompt div.rui-dialog-body-icon{color:#333}div.rui-dialog-prompt div.rui-dialog-body label{display:block;font-weight:bold;font-size:120%;color:#444;margin-bottom:.5em}div.rui-dialog-prompt div.rui-dialog-body input,div.rui-dialog-prompt div.rui-dialog-body textarea{border:1px solid #aaa;font-size:1em;display:block;width:16em;margin:0;padding:.2em;margin-left:4.7em;border-radius:.2em;-moz-border-radius:.2em;-webkit-border-radius:.2em;outline:none}div.rui-dialog-prompt div.rui-dialog-body textarea{width:24em;height:8em}</style>');
return b}(RightJS);
