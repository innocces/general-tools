(self["webpackChunkgeneral_tools"]=self["webpackChunkgeneral_tools"]||[]).push([[866],{80638:function(){},44514:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return f}});n(13062);var r=n(71230),c=(n(89032),n(15746)),o=(n(57663),n(71577)),i=(n(34792),n(48086)),a=n(67294),s=n(71124),l=[{route:"/compress-image",icon:"/images/pic.png",title:"\u56fe\u7247\u538b\u7f29",description:"\u57fa\u4e8e compressor \u8fdb\u884c\u56fe\u7247\u538b\u7f29"},{route:"/drawer-bed",icon:"/images/drawer.png",title:"GitHub \u56fe\u5e8a",description:"\u5229\u7528GitHub + jsdelivr\u751f\u6210\u56fe\u5e8a"},{route:"/base-64",icon:"/images/base64.png",title:"\u56fe\u7247\u8f6cBASE64",description:"\u5c06\u56fe\u7247\u8f6c\u5316\u4e3aBASE64"}],u=n(85893),d=()=>{var e=(0,a.useCallback)((e=>{s.m8.push(e)}),[]),t=(0,a.useCallback)((()=>{i.default.info("\u5982\u679c\u6211\u77e5\u9053\u8be5\u7ed9ta\u52a0\u70b9\u5565\u529f\u80fd\uff0c\u90a3ta\u5e94\u8be5\u662f\u6709\u7528\u7684")}),[]);return(0,u.jsxs)("div",{className:"__general_tools-layout-content",children:[(0,u.jsx)("div",{className:"__general_tools-layout-content-banner",children:(0,u.jsxs)("div",{className:"__general_tools-layout-content-banner-inner __general_tools-inner",children:[(0,u.jsx)("h1",{children:"General Tools"}),(0,u.jsx)("p",{children:"\u4e00\u4e2a\u5de5\u5177\u7f51\u7ad9"}),(0,u.jsx)("div",{className:"__general_tools-layout-content-buttons",children:(0,u.jsx)(o.Z,{type:"primary",onClick:t,children:"\u5f00\u59cb\u4f7f\u7528"})})]})}),(0,u.jsx)("div",{className:"__general_tools-inner __general_tools-list",children:(0,u.jsx)(r.Z,{gutter:[16,16],children:l.map(((t,n)=>{var r=t.icon,o=t.route,i=t.title,a=t.description;return(0,u.jsxs)(c.Z,{className:"__general_tools-list-item",span:8,onClick:()=>e(o),children:[(0,u.jsx)("img",{src:r}),(0,u.jsx)("h3",{children:i}),(0,u.jsx)("p",{children:a})]},n)}))})})]})},f=d},24308:function(e,t,n){"use strict";n.d(t,{c4:function(){return o}});var r=n(96156),c=n(22122),o=["xxl","xl","lg","md","sm","xs"],i={xs:"(max-width: 575px)",sm:"(min-width: 576px)",md:"(min-width: 768px)",lg:"(min-width: 992px)",xl:"(min-width: 1200px)",xxl:"(min-width: 1600px)"},a=new Map,s=-1,l={},u={matchHandlers:{},dispatch:function(e){return l=e,a.forEach((function(e){return e(l)})),a.size>=1},subscribe:function(e){return a.size||this.register(),s+=1,a.set(s,e),e(l),s},unsubscribe:function(e){a["delete"](e),a.size||this.unregister()},unregister:function(){var e=this;Object.keys(i).forEach((function(t){var n=i[t],r=e.matchHandlers[n];null===r||void 0===r||r.mql.removeListener(null===r||void 0===r?void 0:r.listener)})),a.clear()},register:function(){var e=this;Object.keys(i).forEach((function(t){var n=i[t],o=function(n){var o=n.matches;e.dispatch((0,c.Z)((0,c.Z)({},l),(0,r.Z)({},t,o)))},a=window.matchMedia(n);a.addListener(o),e.matchHandlers[n]={mql:a,listener:o},o(a)}))}};t["ZP"]=u},31808:function(e,t,n){"use strict";n.d(t,{jD:function(){return o},fk:function(){return i}});var r,c=n(98924),o=function(){return(0,c.Z)()&&window.document.documentElement},i=function(){if(!o())return!1;if(void 0!==r)return r;var e=document.createElement("div");return e.style.display="flex",e.style.flexDirection="column",e.style.rowGap="1px",e.appendChild(document.createElement("div")),e.appendChild(document.createElement("div")),document.body.appendChild(e),r=1===e.scrollHeight,document.body.removeChild(e),r}},15746:function(e,t,n){"use strict";var r=n(21584);t["Z"]=r.Z},89032:function(e,t,n){"use strict";n(38663),n(6999)},99134:function(e,t,n){"use strict";var r=n(67294),c=(0,r.createContext)({});t["Z"]=c},21584:function(e,t,n){"use strict";var r=n(96156),c=n(22122),o=n(90484),i=n(67294),a=n(94184),s=n.n(a),l=n(99134),u=n(65632),d=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(r=Object.getOwnPropertySymbols(e);c<r.length;c++)t.indexOf(r[c])<0&&Object.prototype.propertyIsEnumerable.call(e,r[c])&&(n[r[c]]=e[r[c]])}return n};function f(e){return"number"===typeof e?"".concat(e," ").concat(e," auto"):/^\d+(\.\d+)?(px|em|rem|%)$/.test(e)?"0 0 ".concat(e):e}var p=["xs","sm","md","lg","xl","xxl"],m=i.forwardRef((function(e,t){var n,a=i.useContext(u.E_),m=a.getPrefixCls,v=a.direction,h=i.useContext(l.Z),x=h.gutter,g=h.wrap,y=h.supportFlexGap,Z=e.prefixCls,b=e.span,w=e.order,j=e.offset,_=e.push,C=e.pull,E=e.className,O=e.children,N=e.flex,k=e.style,P=d(e,["prefixCls","span","order","offset","push","pull","className","children","flex","style"]),A=m("col",Z),S={};p.forEach((function(t){var n,i={},a=e[t];"number"===typeof a?i.span=a:"object"===(0,o.Z)(a)&&(i=a||{}),delete P[t],S=(0,c.Z)((0,c.Z)({},S),(n={},(0,r.Z)(n,"".concat(A,"-").concat(t,"-").concat(i.span),void 0!==i.span),(0,r.Z)(n,"".concat(A,"-").concat(t,"-order-").concat(i.order),i.order||0===i.order),(0,r.Z)(n,"".concat(A,"-").concat(t,"-offset-").concat(i.offset),i.offset||0===i.offset),(0,r.Z)(n,"".concat(A,"-").concat(t,"-push-").concat(i.push),i.push||0===i.push),(0,r.Z)(n,"".concat(A,"-").concat(t,"-pull-").concat(i.pull),i.pull||0===i.pull),(0,r.Z)(n,"".concat(A,"-rtl"),"rtl"===v),n))}));var G=s()(A,(n={},(0,r.Z)(n,"".concat(A,"-").concat(b),void 0!==b),(0,r.Z)(n,"".concat(A,"-order-").concat(w),w),(0,r.Z)(n,"".concat(A,"-offset-").concat(j),j),(0,r.Z)(n,"".concat(A,"-push-").concat(_),_),(0,r.Z)(n,"".concat(A,"-pull-").concat(C),C),n),E,S),H={};if(x&&x[0]>0){var R=x[0]/2;H.paddingLeft=R,H.paddingRight=R}if(x&&x[1]>0&&!y){var B=x[1]/2;H.paddingTop=B,H.paddingBottom=B}return N&&(H.flex=f(N),!1!==g||H.minWidth||(H.minWidth=0)),i.createElement("div",(0,c.Z)({role:"cell"},P,{style:(0,c.Z)((0,c.Z)({},H),k),className:G,ref:t}),O)}));m.displayName="Col",t["Z"]=m},3389:function(e,t,n){"use strict";n.d(t,{Z:function(){return g}});var r=n(22122),c=n(96156),o=n(90484),i=n(28481),a=n(67294),s=n(94184),l=n.n(s),u=n(65632),d=n(99134),f=n(93355),p=n(24308),m=n(31808),v=function(){var e=a.useState(!1),t=(0,i.Z)(e,2),n=t[0],r=t[1];return a.useEffect((function(){r((0,m.fk)())}),[]),n},h=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(r=Object.getOwnPropertySymbols(e);c<r.length;c++)t.indexOf(r[c])<0&&Object.prototype.propertyIsEnumerable.call(e,r[c])&&(n[r[c]]=e[r[c]])}return n},x=((0,f.b)("top","middle","bottom","stretch"),(0,f.b)("start","end","center","space-around","space-between","space-evenly"),a.forwardRef((function(e,t){var n,s=e.prefixCls,f=e.justify,m=e.align,x=e.className,g=e.style,y=e.children,Z=e.gutter,b=void 0===Z?0:Z,w=e.wrap,j=h(e,["prefixCls","justify","align","className","style","children","gutter","wrap"]),_=a.useContext(u.E_),C=_.getPrefixCls,E=_.direction,O=a.useState({xs:!0,sm:!0,md:!0,lg:!0,xl:!0,xxl:!0}),N=(0,i.Z)(O,2),k=N[0],P=N[1],A=v(),S=a.useRef(b);a.useEffect((function(){var e=p.ZP.subscribe((function(e){var t=S.current||0;(!Array.isArray(t)&&"object"===(0,o.Z)(t)||Array.isArray(t)&&("object"===(0,o.Z)(t[0])||"object"===(0,o.Z)(t[1])))&&P(e)}));return function(){return p.ZP.unsubscribe(e)}}),[]);var G=function(){var e=[void 0,void 0],t=Array.isArray(b)?b:[b,void 0];return t.forEach((function(t,n){if("object"===(0,o.Z)(t))for(var r=0;r<p.c4.length;r++){var c=p.c4[r];if(k[c]&&void 0!==t[c]){e[n]=t[c];break}}else e[n]=t})),e},H=C("row",s),R=G(),B=l()(H,(n={},(0,c.Z)(n,"".concat(H,"-no-wrap"),!1===w),(0,c.Z)(n,"".concat(H,"-").concat(f),f),(0,c.Z)(n,"".concat(H,"-").concat(m),m),(0,c.Z)(n,"".concat(H,"-rtl"),"rtl"===E),n),x),L={},z=null!=R[0]&&R[0]>0?R[0]/-2:void 0,M=null!=R[1]&&R[1]>0?R[1]/-2:void 0;if(z&&(L.marginLeft=z,L.marginRight=z),A){var T=(0,i.Z)(R,2);L.rowGap=T[1]}else M&&(L.marginTop=M,L.marginBottom=M);var q=(0,i.Z)(R,2),D=q[0],F=q[1],I=a.useMemo((function(){return{gutter:[D,F],wrap:w,supportFlexGap:A}}),[D,F,w,A]);return a.createElement(d.Z.Provider,{value:I},a.createElement("div",(0,r.Z)({role:"row"},j,{className:B,style:(0,r.Z)((0,r.Z)({},L),g),ref:t}),y))})));x.displayName="Row";var g=x},6999:function(e,t,n){"use strict";n(38663),n(80638)},71230:function(e,t,n){"use strict";var r=n(3389);t["Z"]=r.Z},13062:function(e,t,n){"use strict";n(38663),n(6999)}}]);