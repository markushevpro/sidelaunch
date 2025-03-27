(()=>{var j=Object.defineProperty;var g=(e,t)=>{for(var n in t)j(e,n,{get:t[n],enumerable:!0})};var b={};g(b,{LogDebug:()=>X,LogError:()=>q,LogFatal:()=>Q,LogInfo:()=>$,LogLevel:()=>Z,LogPrint:()=>J,LogTrace:()=>N,LogWarning:()=>Y,SetLogLevel:()=>_});function u(e,t){window.WailsInvoke("L"+e+t)}function N(e){u("T",e)}function J(e){u("P",e)}function X(e){u("D",e)}function $(e){u("I",e)}function Y(e){u("W",e)}function q(e){u("E",e)}function Q(e){u("F",e)}function _(e){u("S",e)}var Z={TRACE:1,DEBUG:2,INFO:3,WARNING:4,ERROR:5};var y=class{constructor(t,n,o){this.eventName=t,this.maxCallbacks=o||-1,this.Callback=i=>(n.apply(null,i),this.maxCallbacks===-1?!1:(this.maxCallbacks-=1,this.maxCallbacks===0))}},w={};function v(e,t,n){w[e]=w[e]||[];let o=new y(e,t,n);return w[e].push(o),()=>K(o)}function W(e,t){return v(e,t,-1)}function A(e,t){return v(e,t,1)}function P(e){let t=e.name,n=w[t]?.slice()||[];if(n.length){for(let o=n.length-1;o>=0;o-=1){let i=n[o],r=e.data;i.Callback(r)&&n.splice(o,1)}n.length===0?m(t):w[t]=n}}function R(e){let t;try{t=JSON.parse(e)}catch{let o="Invalid JSON passed to Notify: "+e;throw new Error(o)}P(t)}function M(e){let t={name:e,data:[].slice.apply(arguments).slice(1)};P(t),window.WailsInvoke("EE"+JSON.stringify(t))}function m(e){delete w[e],window.WailsInvoke("EX"+e)}function x(e,...t){m(e),t.length>0&&t.forEach(n=>{m(n)})}function K(e){let t=e.eventName;w[t]!==void 0&&(w[t]=w[t].filter(n=>n!==e),w[t].length===0&&m(t))}var c={};function ee(){var e=new Uint32Array(1);return window.crypto.getRandomValues(e)[0]}function te(){return Math.random()*9007199254740991}var D;window.crypto?D=ee:D=te;function a(e,t,n){return n==null&&(n=0),new Promise(function(o,i){var r;do r=e+"-"+D();while(c[r]);var l;n>0&&(l=setTimeout(function(){i(Error("Call to "+e+" timed out. Request ID: "+r))},n)),c[r]={timeoutHandle:l,reject:i,resolve:o};try{let d={name:e,args:t,callbackID:r};window.WailsInvoke("C"+JSON.stringify(d))}catch(d){console.error(d)}})}window.ObfuscatedCall=(e,t,n)=>(n==null&&(n=0),new Promise(function(o,i){var r;do r=e+"-"+D();while(c[r]);var l;n>0&&(l=setTimeout(function(){i(Error("Call to method "+e+" timed out. Request ID: "+r))},n)),c[r]={timeoutHandle:l,reject:i,resolve:o};try{let d={id:e,args:t,callbackID:r};window.WailsInvoke("c"+JSON.stringify(d))}catch(d){console.error(d)}}));function z(e){let t;try{t=JSON.parse(e)}catch(i){let r=`Invalid JSON passed to callback: ${i.message}. Message: ${e}`;throw runtime.LogDebug(r),new Error(r)}let n=t.callbackid,o=c[n];if(!o){let i=`Callback '${n}' not registered!!!`;throw console.error(i),new Error(i)}clearTimeout(o.timeoutHandle),delete c[n],t.error?o.reject(t.error):o.resolve(t.result)}window.go={};function B(e){try{e=JSON.parse(e)}catch(t){console.error(t)}window.go=window.go||{},Object.keys(e).forEach(t=>{window.go[t]=window.go[t]||{},Object.keys(e[t]).forEach(n=>{window.go[t][n]=window.go[t][n]||{},Object.keys(e[t][n]).forEach(o=>{window.go[t][n][o]=function(){let i=0;function r(){let l=[].slice.call(arguments);return a([t,n,o].join("."),l,i)}return r.setTimeout=function(l){i=l},r.getTimeout=function(){return i},r}()})})})}var T={};g(T,{WindowCenter:()=>le,WindowFullscreen:()=>we,WindowGetPosition:()=>We,WindowGetSize:()=>ce,WindowHide:()=>xe,WindowIsFullscreen:()=>fe,WindowIsMaximised:()=>ye,WindowIsMinimised:()=>Se,WindowIsNormal:()=>Ie,WindowMaximise:()=>he,WindowMinimise:()=>Te,WindowReload:()=>ne,WindowReloadApp:()=>oe,WindowSetAlwaysOnTop:()=>me,WindowSetBackgroundColour:()=>Ce,WindowSetDarkTheme:()=>se,WindowSetLightTheme:()=>re,WindowSetMaxSize:()=>ge,WindowSetMinSize:()=>pe,WindowSetPosition:()=>ve,WindowSetSize:()=>ue,WindowSetSystemDefaultTheme:()=>ie,WindowSetTitle:()=>ae,WindowShow:()=>De,WindowToggleMaximise:()=>Ee,WindowUnfullscreen:()=>de,WindowUnmaximise:()=>be,WindowUnminimise:()=>ke});function ne(){window.location.reload()}function oe(){window.WailsInvoke("WR")}function ie(){window.WailsInvoke("WASDT")}function re(){window.WailsInvoke("WALT")}function se(){window.WailsInvoke("WADT")}function le(){window.WailsInvoke("Wc")}function ae(e){window.WailsInvoke("WT"+e)}function we(){window.WailsInvoke("WF")}function de(){window.WailsInvoke("Wf")}function fe(){return a(":wails:WindowIsFullscreen")}function ue(e,t){window.WailsInvoke("Ws:"+e+":"+t)}function ce(){return a(":wails:WindowGetSize")}function ge(e,t){window.WailsInvoke("WZ:"+e+":"+t)}function pe(e,t){window.WailsInvoke("Wz:"+e+":"+t)}function me(e){window.WailsInvoke("WATP:"+(e?"1":"0"))}function ve(e,t){window.WailsInvoke("Wp:"+e+":"+t)}function We(){return a(":wails:WindowGetPos")}function xe(){window.WailsInvoke("WH")}function De(){window.WailsInvoke("WS")}function he(){window.WailsInvoke("WM")}function Ee(){window.WailsInvoke("Wt")}function be(){window.WailsInvoke("WU")}function ye(){return a(":wails:WindowIsMaximised")}function Te(){window.WailsInvoke("Wm")}function ke(){window.WailsInvoke("Wu")}function Se(){return a(":wails:WindowIsMinimised")}function Ie(){return a(":wails:WindowIsNormal")}function Ce(e,t,n,o){let i=JSON.stringify({r:e||0,g:t||0,b:n||0,a:o||255});window.WailsInvoke("Wr:"+i)}var k={};g(k,{ScreenGetAll:()=>Oe});function Oe(){return a(":wails:ScreenGetAll")}var S={};g(S,{BrowserOpenURL:()=>Le});function Le(e){window.WailsInvoke("BO:"+e)}var I={};g(I,{ClipboardGetText:()=>Pe,ClipboardSetText:()=>Ae});function Ae(e){return a(":wails:ClipboardSetText",[e])}function Pe(){return a(":wails:ClipboardGetText")}var C={};g(C,{CanResolveFilePaths:()=>U,OnFileDrop:()=>Me,OnFileDropOff:()=>ze,ResolveFilePaths:()=>Re});var s={registered:!1,defaultUseDropTarget:!0,useDropTarget:!0,nextDeactivate:null,nextDeactivateTimeout:null},p="wails-drop-target-active";function h(e){let t=e.getPropertyValue(window.wails.flags.cssDropProperty).trim();return t?t===window.wails.flags.cssDropValue:!1}function F(e){if(!window.wails.flags.enableWailsDragAndDrop||(e.dataTransfer.dropEffect="link",e.preventDefault(),!s.useDropTarget))return;let t=e.target;if(s.nextDeactivate&&s.nextDeactivate(),!t||!h(getComputedStyle(t)))return;let n=t;for(;n;)h(n.style)&&n.classList.add(p),n=n.parentElement}function G(e){if(!!window.wails.flags.enableWailsDragAndDrop&&(e.preventDefault(),!!s.useDropTarget)){if(!e.target||!h(getComputedStyle(e.target)))return null;s.nextDeactivate&&s.nextDeactivate(),s.nextDeactivate=()=>{Array.from(document.getElementsByClassName(p)).forEach(t=>t.classList.remove(p)),s.nextDeactivate=null,s.nextDeactivateTimeout&&(clearTimeout(s.nextDeactivateTimeout),s.nextDeactivateTimeout=null)},s.nextDeactivateTimeout=setTimeout(()=>{s.nextDeactivate&&s.nextDeactivate()},50)}}function H(e){if(!!window.wails.flags.enableWailsDragAndDrop){if(e.preventDefault(),U()){let t=[];e.dataTransfer.items?t=[...e.dataTransfer.items].map((n,o)=>{if(n.kind==="file")return n.getAsFile()}):t=[...e.dataTransfer.files],window.runtime.ResolveFilePaths(e.x,e.y,t)}!s.useDropTarget||(s.nextDeactivate&&s.nextDeactivate(),Array.from(document.getElementsByClassName(p)).forEach(t=>t.classList.remove(p)))}}function U(){return window.chrome?.webview?.postMessageWithAdditionalObjects!=null}function Re(e,t,n){window.chrome?.webview?.postMessageWithAdditionalObjects&&chrome.webview.postMessageWithAdditionalObjects(`file:drop:${e}:${t}`,n)}function Me(e,t){if(typeof e!="function"){console.error("DragAndDropCallback is not a function");return}if(s.registered)return;s.registered=!0;let n=typeof t;s.useDropTarget=n==="undefined"||n!=="boolean"?s.defaultUseDropTarget:t,window.addEventListener("dragover",F),window.addEventListener("dragleave",G),window.addEventListener("drop",H);let o=e;s.useDropTarget&&(o=function(i,r,l){let d=document.elementFromPoint(i,r);if(!d||!h(getComputedStyle(d)))return null;e(i,r,l)}),W("wails:file-drop",o)}function ze(){window.removeEventListener("dragover",F),window.removeEventListener("dragleave",G),window.removeEventListener("drop",H),x("wails:file-drop"),s.registered=!1}function V(e){let t=e.target;switch(window.getComputedStyle(t).getPropertyValue("--default-contextmenu").trim()){case"show":return;case"hide":e.preventDefault();return;default:if(t.isContentEditable)return;let i=window.getSelection(),r=i.toString().length>0;if(r)for(let l=0;l<i.rangeCount;l++){let O=i.getRangeAt(l).getClientRects();for(let E=0;E<O.length;E++){let L=O[E];if(document.elementFromPoint(L.left,L.top)===t)return}}if((t.tagName==="INPUT"||t.tagName==="TEXTAREA")&&(r||!t.readOnly&&!t.disabled))return;e.preventDefault()}}function Fe(){window.WailsInvoke("Q")}function Ge(){window.WailsInvoke("S")}function He(){window.WailsInvoke("H")}function Ue(){return a(":wails:Environment")}window.runtime={...b,...T,...S,...k,...I,...C,EventsOn:W,EventsOnce:A,EventsOnMultiple:v,EventsEmit:M,EventsOff:x,Environment:Ue,Show:Ge,Hide:He,Quit:Fe};window.wails={Callback:z,EventsNotify:R,SetBindings:B,eventListeners:w,callbacks:c,flags:{disableScrollbarDrag:!1,disableDefaultContextMenu:!1,enableResize:!1,defaultCursor:null,borderThickness:6,shouldDrag:!1,deferDragToMouseMove:!0,cssDragProperty:"--wails-draggable",cssDragValue:"drag",cssDropProperty:"--wails-drop-target",cssDropValue:"drop",enableWailsDragAndDrop:!1}};window.wailsbindings&&(window.wails.SetBindings(window.wailsbindings),delete window.wails.SetBindings);delete window.wailsbindings;var Ve=function(e){var t=window.getComputedStyle(e.target).getPropertyValue(window.wails.flags.cssDragProperty);return t&&(t=t.trim()),!(t!==window.wails.flags.cssDragValue||e.buttons!==1||e.detail!==1)};window.wails.setCSSDragProperties=function(e,t){window.wails.flags.cssDragProperty=e,window.wails.flags.cssDragValue=t};window.wails.setCSSDropProperties=function(e,t){window.wails.flags.cssDropProperty=e,window.wails.flags.cssDropValue=t};window.addEventListener("mousedown",e=>{if(window.wails.flags.resizeEdge){window.WailsInvoke("resize:"+window.wails.flags.resizeEdge),e.preventDefault();return}if(Ve(e)){if(window.wails.flags.disableScrollbarDrag&&(e.offsetX>e.target.clientWidth||e.offsetY>e.target.clientHeight))return;window.wails.flags.deferDragToMouseMove?window.wails.flags.shouldDrag=!0:(e.preventDefault(),window.WailsInvoke("drag"));return}else window.wails.flags.shouldDrag=!1});window.addEventListener("mouseup",()=>{window.wails.flags.shouldDrag=!1});function f(e){document.documentElement.style.cursor=e||window.wails.flags.defaultCursor,window.wails.flags.resizeEdge=e}window.addEventListener("mousemove",function(e){if(window.wails.flags.shouldDrag&&(window.wails.flags.shouldDrag=!1,(e.buttons!==void 0?e.buttons:e.which)>0)){window.WailsInvoke("drag");return}if(!window.wails.flags.enableResize)return;window.wails.flags.defaultCursor==null&&(window.wails.flags.defaultCursor=document.documentElement.style.cursor),window.outerWidth-e.clientX<window.wails.flags.borderThickness&&window.outerHeight-e.clientY<window.wails.flags.borderThickness&&(document.documentElement.style.cursor="se-resize");let t=window.outerWidth-e.clientX<window.wails.flags.borderThickness,n=e.clientX<window.wails.flags.borderThickness,o=e.clientY<window.wails.flags.borderThickness,i=window.outerHeight-e.clientY<window.wails.flags.borderThickness;!n&&!t&&!o&&!i&&window.wails.flags.resizeEdge!==void 0?f():t&&i?f("se-resize"):n&&i?f("sw-resize"):n&&o?f("nw-resize"):o&&t?f("ne-resize"):n?f("w-resize"):o?f("n-resize"):i?f("s-resize"):t&&f("e-resize")});window.addEventListener("contextmenu",function(e){window.wails.flags.disableDefaultContextMenu?e.preventDefault():V(e)});window.WailsInvoke("runtime:ready");})();
