!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("immutable"),require("draft-js")):"function"==typeof define&&define.amd?define(["immutable","draft-js"],t):"object"==typeof exports?exports.htmlToDraftjs=t(require("immutable"),require("draft-js")):e.htmlToDraftjs=t(e.immutable,e["draft-js"])}("undefined"!=typeof self?self:this,function(e,t){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){e.exports=n(3)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,r,a,l){var u=e.nodeName.toLowerCase();if(l){var c=l(u,e);if(c){var s=o.Entity.__create(c.type,c.mutability,c.data||{});return{chunk:(0,d.getAtomicBlockChunk)(s)}}}if("div"===u&&e instanceof HTMLDivElement){var f={};f.ctaTitle=e.getElementsByTagName("H3")[0].innerHTML,f.ctaText=e.getElementsByTagName("P")[0].innerHTML,f.ctaButtonText=e.getElementsByTagName("A")[0].innerHTML,f.url=e.getElementsByTagName("A")[0].getAttribute("href"),f.targetOption=e.getElementsByTagName("A")[0].getAttribute("target");var m=o.Entity.__create("CTA_BOX","MUTABLE",f);return{chunk:(0,d.getAtomicBlockChunk)(m)}}if("a"===u&&e instanceof HTMLAnchorElement&&"ctaimage-root"===e.id){var p=e.getElementsByTagName("img")[0],y={};y.src=p.getAttribute?p.getAttribute("src")||p.src:p.src,y.alt=p.alt,y.height=p.style.height,y.width=p.style.width,p.style.float&&(y.alignment=p.style.float),y.linkUrl=e.href;var b=o.Entity.__create("CTA_IMAGE","MUTABLE",y);return{chunk:(0,d.getAtomicBlockChunk)(b)}}if("#text"===u&&"\n"!==e.textContent)return(0,d.createTextChunk)(e,t,a);if("br"===u)return{chunk:(0,d.getSoftNewlineChunk)()};if("img"===u&&e instanceof HTMLImageElement){var E={};E.src=e.getAttribute?e.getAttribute("src")||e.src:e.src,E.alt=e.alt,E.height=e.style.height,E.width=e.style.width,e.style.float&&(E.alignment=e.style.float);var T=o.Entity.__create("IMAGE","MUTABLE",E);return{chunk:(0,d.getAtomicBlockChunk)(T)}}if("video"===u&&e instanceof HTMLVideoElement){var A={};A.controls=!0,A.src=e.getAttribute?e.getAttribute("src")||e.src:e.src,A.alt=e.alt,A.height=e.style.height,A.width=e.style.width,e.style.float&&(A.alignment=e.style.float);var x=o.Entity.__create("VIDEO","MUTABLE",A);return{chunk:(0,d.getAtomicBlockChunk)(x)}}if("iframe"===u&&e instanceof HTMLIFrameElement){var C={};C.src=e.getAttribute?e.getAttribute("src")||e.src:e.src,C.height=e.height,C.width=e.width;var _=o.Entity.__create("EMBEDDED_LINK","MUTABLE",C);return{chunk:(0,d.getAtomicBlockChunk)(_)}}var w=(0,h.default)(u,r),B=void 0;w&&("ul"===u||"ol"===u?(r=u,n+=1):("unordered-list-item"!==w&&"ordered-list-item"!==w&&(r="",n=-1),M?(B=(0,d.getFirstBlockChunk)(w,(0,k.default)(e)),M=!1):B=(0,d.getBlockDividerChunk)(w,n,(0,k.default)(e)))),B||(B=(0,d.getEmptyChunk)()),t=(0,g.default)(u,e,t);for(var L=e.firstChild;L;){var O=(0,v.default)(L),j=i(L,t,n,r,O||a,l),H=j.chunk;B=(0,d.joinChunks)(B,H);L=L.nextSibling}return{chunk:B}}function a(e,t){var n=e.trim().replace(E,b),r=(0,s.default)(n);return r?(M=!0,{chunk:i(r,new u.OrderedSet,-1,"",void 0,t).chunk}):null}function l(e,t){var n=a(e,t);if(n){var r=n.chunk,i=new u.OrderedMap({});r.entities&&r.entities.forEach(function(e){e&&(i=i.set(e,o.Entity.__get(e)))});var l=0;return{contentBlocks:r.text.split("\r").map(function(e,t){var n=l+e.length,i=r&&r.inlines.slice(l,n),a=r&&r.entities.slice(l,n),c=new u.List(i.map(function(e,t){var n={style:e,entity:null};return a[t]&&(n.entity=a[t]),o.CharacterMetadata.create(n)}));return l=n,new o.ContentBlock({key:(0,o.genKey)(),type:r&&r.blocks[t]&&r.blocks[t].type||"unstyled",depth:r&&r.blocks[t]&&r.blocks[t].depth,data:r&&r.blocks[t]&&r.blocks[t].data||new u.Map({}),text:e,characterList:c})}),entityMap:i}}return null}Object.defineProperty(t,"__esModule",{value:!0}),t.default=l;var o=n(1),u=n(0),c=n(4),s=r(c),d=n(5),f=n(6),h=r(f),m=n(7),g=r(m),p=n(8),k=r(p),y=n(9),v=r(y),b=" ",E=new RegExp("&nbsp;","g"),M=!0},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){var t,n=null;return document.implementation&&document.implementation.createHTMLDocument&&(t=document.implementation.createHTMLDocument("foo"),t.documentElement.innerHTML=e,n=t.getElementsByTagName("body")[0]),n};t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.joinChunks=t.getAtomicBlockChunk=t.getBlockDividerChunk=t.getFirstBlockChunk=t.getEmptyChunk=t.getSoftNewlineChunk=t.createTextChunk=t.getWhitespaceChunk=void 0;var r=n(0),i=t.getWhitespaceChunk=function(e){return{text:" ",inlines:[new r.OrderedSet],entities:[e],blocks:[]}};t.createTextChunk=function(e,t,n){var r=e.textContent;return""===r.trim()?{chunk:i(n)}:{chunk:{text:r,inlines:Array(r.length).fill(t),entities:Array(r.length).fill(n),blocks:[]}}},t.getSoftNewlineChunk=function(){return{text:"\n",inlines:[new r.OrderedSet],entities:new Array(1),blocks:[]}},t.getEmptyChunk=function(){return{text:"",inlines:[],entities:[],blocks:[]}},t.getFirstBlockChunk=function(e,t){return{text:"",inlines:[],entities:[],blocks:[{type:e,depth:0,data:t||new r.Map({})}]}},t.getBlockDividerChunk=function(e,t,n){return{text:"\r",inlines:[],entities:[],blocks:[{type:e,depth:Math.max(0,Math.min(4,t)),data:n||new r.Map({})}]}},t.getAtomicBlockChunk=function(e){return{text:"\r ",inlines:[new r.OrderedSet],entities:[e],blocks:[{type:"atomic",depth:0,data:new r.Map({})}]}},t.joinChunks=function(e,t){return{text:e.text+t.text,inlines:e.inlines.concat(t.inlines),entities:e.entities.concat(t.entities),blocks:e.blocks.concat(t.blocks)}}},function(e,t,n){"use strict";function r(e,t){var n=a.filter(function(n){return n.element===e&&(!n.wrapper||n.wrapper===t)||n.wrapper===e||n.aliasedElements&&n.aliasedElements.indexOf(e)>-1}).keySeq().toSet().toArray();if(1===n.length)return n[0]}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var i=n(0),a=new i.Map({"header-one":{element:"h1"},"header-two":{element:"h2"},"header-three":{element:"h3"},"header-four":{element:"h4"},"header-five":{element:"h5"},"header-six":{element:"h6"},"unordered-list-item":{element:"li",wrapper:"ul"},"ordered-list-item":{element:"li",wrapper:"ol"},blockquote:{element:"blockquote"},code:{element:"pre"},atomic:{element:"figure"},unstyled:{element:"p",aliasedElements:["div"]}})},function(e,t,n){"use strict";function r(e,t,n){var r=i[e],a=void 0;if(r)a=n.add(r).toOrderedSet();else if(t instanceof HTMLElement){a=n;var l=t;a=a.withMutations(function(e){var t=l.style.color,n=l.style.backgroundColor,r=l.style.fontSize,i=l.style.fontFamily.replace(/^"|"$/g,"");t&&e.add("color-"+t.replace(/ /g,"")),n&&e.add("bgcolor-"+n.replace(/ /g,"")),r&&e.add("fontsize-"+r.replace(/px$/g,"")),i&&e.add("fontfamily-"+i)}).toOrderedSet()}return a}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var i={code:"CODE",del:"STRIKETHROUGH",em:"ITALIC",strong:"BOLD",ins:"UNDERLINE",sub:"SUBSCRIPT",sup:"SUPERSCRIPT"}},function(e,t,n){"use strict";function r(e){if(e.style.textAlign)return new i.Map({"text-align":e.style.textAlign})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var i=n(0)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=function(e){var t=void 0;if(e instanceof HTMLAnchorElement){var n={};e.dataset&&void 0!==e.dataset.mention?(n.url=e.href,n.text=e.innerHTML,n.value=e.dataset.value,t=r.Entity.__create("MENTION","IMMUTABLE",n)):(n.url=e.getAttribute?e.getAttribute("href")||e.href:e.href,n.title=e.innerHTML,n.targetOption=e.target,t=r.Entity.__create("LINK","MUTABLE",n))}return t};t.default=i}])});