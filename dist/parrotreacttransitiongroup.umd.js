!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("react"),require("@parrotjs/classnames"),require("@parrotjs/react-hooks"),require("@parrotjs/react-transition-group")):"function"==typeof define&&define.amd?define(["react","@parrotjs/classnames","@parrotjs/react-hooks","@parrotjs/react-transition-group"],t):(e="undefined"!=typeof globalThis?globalThis:e||self).ParrotRcTransitionGroup=t(e.React,e.ParrotClassname,e.ParrotRcHooks,e.ParrotRcTransitionGroup)}(this,(function(e,t,l,n){"use strict";function o(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=o(e),u=o(t);const a=t=>{const{prefixCls:l,componentName:n="ripple",className:o,rippleSize:a,rippleY:s,rippleX:c,visible:i,pulsate:p=!1,onExited:f,timeout:d}=t,h=`${l}-${n}`,[m,b]=e.useState(!1),M={width:a,height:a,top:-a/2+s,left:-a/2+c},R=u.default(h,o,`${h}--visible`),C=u.default(`${h}-child`,{[`${h}-child--leaving`]:m,[`${h}-child--pulsate`]:p});return i||m||b(!0),r.default.useEffect((()=>{if(!i&&null!=f){const e=setTimeout(f,d);return()=>{clearTimeout(e)}}}),[f,d,i]),r.default.createElement("span",{className:u.default(R),style:M},r.default.createElement("span",{className:C}))},s=r.default.forwardRef(((t,l)=>{const{component:o="span",prefixCls:s,componentName:c="touchripple",center:i}=t,p=`${s}-${c}`,f=r.default.useRef(0),d=e.useRef(null),[h,m]=e.useState([]),b=e.useRef(null);r.default.useEffect((()=>{d.current&&(d.current(),d.current=null)}),[h]);const M=e.useCallback((e=>{const{pulsate:t,rippleX:l,rippleY:n,rippleSize:o,cb:u}=e;m((e=>[...e,r.default.createElement(a,{key:f.current,timeout:550,pulsate:t,rippleX:l,rippleY:n,rippleSize:o,prefixCls:s})])),f.current+=1,d.current=u}),[s]),R=e.useCallback(((e,t)=>{m((e=>e.length>0?e.slice(1):e)),d.current=t}),[]),C=e.useCallback(((e={},t={},l)=>{const{pulsate:n=!1,center:o=i||t.pulsate,fakeElement:r=!1}=t,u=r?null:b.current,a=u?u.getBoundingClientRect():{width:0,height:0,left:0,top:0};let s,c,p;if(o||0===e.clientX&&0===e.clientY||!e.clientX&&!e.touches)s=Math.round(a.width/2),c=Math.round(a.height/2);else{const{clientX:t,clientY:l}=e.touches?e.touches[0]:e;s=Math.round(t-a.left),c=Math.round(l-a.top)}if(o){p=2*Math.sqrt(Math.pow(s,2)+Math.pow(c,2))}else{const e=Math.max(Math.abs((u?u.clientWidth:0)-s),s),t=Math.max(Math.abs((u?u.clientHeight:0)-c),c);p=2*Math.sqrt(Math.pow(e,2)+Math.pow(t,2))}M({pulsate:n,rippleX:s,rippleY:c,rippleSize:p,cb:l})}),[M,i]);return r.default.useImperativeHandle(l,(()=>({start:C,stop:R})),[C,R]),r.default.createElement(o,{className:u.default(p),ref:b},r.default.createElement(n.TransitionGroup,{component:null},h))}));var c=r.default.memo(s);const i=r.default.forwardRef(((t,n)=>{const{component:o="div",componentName:a="ripplebase",prefixCls:s="parrot",className:i,onClick:p,onFocus:f,onFocusVisible:d,onBlur:h,onKeyDown:m,onKeyUp:b,onMouseDown:M,onMouseLeave:R,onMouseUp:C,onTouchStart:T,onTouchEnd:k,onTouchMove:y,disabled:E=!1,disableRipple:g=!1,disableTouchRipple:x=!1,focusRipple:w=!1,tabIndex:v,type:$,children:S,onContextMenu:j,TouchRippleProps:N,style:F}=t,X=s?`${s}-${a}`:`parrot-${a}`,q=e.useRef(null),Y=e.useRef(null),{isFocusVisibleRef:P,onFocus:z,onBlur:B,ref:D}=l.useIsFocusVisible(),[I,K]=e.useState(!1);E&&I&&K(!0),r.default.useEffect((()=>{P.current=I}),[I,P]);const U=l.useForkRef(n,q,D),G=(t,l,n=x)=>e.useCallback((e=>{null==l||l(e);return!n&&Y.current&&Y.current[t](e),!0}),[]),H=e.useCallback((e=>{q.current||(q.current=e.currentTarget),z(e),!0===P.current&&(K(!0),null==d||d(e)),null==f||f(e)}),[f,d]),V=G("stop",(e=>{null==B||B(),!1===P.current&&K(!1),null==h||h(e)}),!1),L=e.useRef(!1),O=e.useCallback((e=>{L.current=!0,null==m||m(e)}),[m]),W=e.useCallback((e=>{L.current=!1,null==b||b(e)}),[b]),A=G("stop",j),J=G("start",M),Q=G("stop",(e=>{null==R||R(e)})),Z=G("stop",C),_=G("start",T),ee=G("stop",k),te=G("stop",y),[le,ne]=r.default.useState(!1);r.default.useEffect((()=>{ne(!0)}),[]);const oe=le&&!g&&!E;return r.default.createElement(o,{className:u.default(X,i,{disabled:E}),ref:U,onClick:p,onContextMenu:A,onFocus:H,onBlur:V,onKeyDown:O,onKeyUp:W,onMouseDown:J,onMouseLeave:Q,onMouseUp:Z,onTouchStart:_,onTouchEnd:ee,onTouchMove:te,tabIndex:E?-1:v,type:$,style:F},S,oe?r.default.createElement(c,Object.assign({ref:Y,prefixCls:s},N)):null)}));return r.default.memo(i)}));
