function v(x){throw new Error('Could not dynamically require "'+x+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var w={},z={get exports(){return w},set exports(x){w=x}};(function(x,q){(function(m){x.exports=m()})(function(){return function m(h,g,a){function e(i,o){if(!g[i]){if(!h[i]){var n=typeof v=="function"&&v;if(!o&&n)return n(i,!0);if(t)return t(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var r=g[i]={exports:{}};h[i][0].call(r.exports,function(s){var f=h[i][1][s];return e(f||s)},r,r.exports,m,h,g,a)}return g[i].exports}for(var t=typeof v=="function"&&v,u=0;u<a.length;u++)e(a[u]);return e}({1:[function(m,h,g){h.exports=function(a){if(typeof Map!="function"||a){var e=m("./similar");return new e}else return new Map}},{"./similar":2}],2:[function(m,h,g){function a(){return this.list=[],this.lastItem=void 0,this.size=0,this}a.prototype.get=function(e){var t;if(this.lastItem&&this.isEqual(this.lastItem.key,e))return this.lastItem.val;if(t=this.indexOf(e),t>=0)return this.lastItem=this.list[t],this.list[t].val},a.prototype.set=function(e,t){var u;return this.lastItem&&this.isEqual(this.lastItem.key,e)?(this.lastItem.val=t,this):(u=this.indexOf(e),u>=0?(this.lastItem=this.list[u],this.list[u].val=t,this):(this.lastItem={key:e,val:t},this.list.push(this.lastItem),this.size++,this))},a.prototype.delete=function(e){var t;if(this.lastItem&&this.isEqual(this.lastItem.key,e)&&(this.lastItem=void 0),t=this.indexOf(e),t>=0)return this.size--,this.list.splice(t,1)[0]},a.prototype.has=function(e){var t;return this.lastItem&&this.isEqual(this.lastItem.key,e)?!0:(t=this.indexOf(e),t>=0?(this.lastItem=this.list[t],!0):!1)},a.prototype.forEach=function(e,t){var u;for(u=0;u<this.size;u++)e.call(t||this,this.list[u].val,this.list[u].key,this)},a.prototype.indexOf=function(e){var t;for(t=0;t<this.size;t++)if(this.isEqual(this.list[t].key,e))return t;return-1},a.prototype.isEqual=function(e,t){return e===t||e!==e&&t!==t},h.exports=a},{}],3:[function(m,h,g){var a=m("map-or-similar");h.exports=function(i){var o=new a(void 0==="true"),n=[];return function(l){var r=function(){var s=o,f,I,c=arguments.length-1,y=Array(c+1),d=!0,p;if((r.numArgs||r.numArgs===0)&&r.numArgs!==c+1)throw new Error("Memoizerific functions should always be called with the same number of arguments");for(p=0;p<c;p++){if(y[p]={cacheItem:s,arg:arguments[p]},s.has(arguments[p])){s=s.get(arguments[p]);continue}d=!1,f=new a(void 0==="true"),s.set(arguments[p],f),s=f}return d&&(s.has(arguments[c])?I=s.get(arguments[c]):d=!1),d||(I=l.apply(null,arguments),s.set(arguments[c],I)),i>0&&(y[c]={cacheItem:s,arg:arguments[c]},d?e(n,y):n.push(y),n.length>i&&t(n.shift())),r.wasMemoized=d,r.numArgs=c+1,I};return r.limit=i,r.wasMemoized=!1,r.cache=o,r.lru=n,r}};function e(i,o){var n=i.length,l=o.length,r,s,f;for(s=0;s<n;s++){for(r=!0,f=0;f<l;f++)if(!u(i[s][f].arg,o[f].arg)){r=!1;break}if(r)break}i.push(i.splice(s,1)[0])}function t(i){var o=i.length,n=i[o-1],l,r;for(n.cacheItem.delete(n.arg),r=o-2;r>=0&&(n=i[r],l=n.cacheItem.get(n.arg),!l||!l.size);r--)n.cacheItem.delete(n.arg)}function u(i,o){return i===o||i!==i&&o!==o}},{"map-or-similar":1}]},{},[3])(3)})})(z);const E=w;export{E as m};
