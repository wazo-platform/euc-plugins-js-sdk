"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[581],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},k=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,l=e.originalType,p=e.parentName,c=r(e,["components","mdxType","originalType","parentName"]),u=s(n),k=i,m=u["".concat(p,".").concat(k)]||u[k]||d[k]||l;return n?a.createElement(m,o(o({ref:t},c),{},{components:n})):a.createElement(m,o({ref:t},c))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=n.length,o=new Array(l);o[0]=k;var r={};for(var p in t)hasOwnProperty.call(t,p)&&(r[p]=t[p]);r.originalType=e,r[u]="string"==typeof e?e:i,o[1]=r;for(var s=2;s<l;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}k.displayName="MDXCreateElement"},81754:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>u,frontMatter:()=>l,metadata:()=>r,toc:()=>s});var a=n(87462),i=(n(67294),n(3905));const l={displayed_sidebar:"deeplinkSidebar"},o="Deep Linking",r={unversionedId:"deeplink/deeplink",id:"deeplink/deeplink",title:"Deep Linking",description:"Deep linking enables direct navigation to specific in-app content or actions, enhancing user experience. It allows users to seamlessly access relevant app pages or features via links, improving engagement and user retention.",source:"@site/docs/deeplink/deeplink.md",sourceDirName:"deeplink",slug:"/deeplink/",permalink:"/euc-plugins-js-sdk/docs/deeplink/",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/deeplink/deeplink.md",tags:[],version:"current",frontMatter:{displayed_sidebar:"deeplinkSidebar"},sidebar:"deeplinkSidebar"},p={},s=[{value:"Web Application",id:"web-application",level:2},{value:"Pre-filling the host name",id:"pre-filling-the-host-name",level:3},{value:"Desktop Application",id:"desktop-application",level:2},{value:"Pre-filling the host name",id:"pre-filling-the-host-name-1",level:3},{value:"Initiating a call",id:"initiating-a-call",level:2},{value:"Bypassing the lobby",id:"bypassing-the-lobby",level:3}],c={toc:s};function u(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"deep-linking"},"Deep Linking"),(0,i.kt)("p",null,"Deep linking enables direct navigation to specific in-app content or actions, enhancing user experience. It allows users to seamlessly access relevant app pages or features via links, improving engagement and user retention."),(0,i.kt)("h2",{id:"web-application"},"Web Application"),(0,i.kt)("p",null,"You now have the ability to control your Wazo application externally using URLs, the same way you would a regular website. If you're whitelabel-ling the application, you can use your own protocol."),(0,i.kt)("p",null,"For instance, you can access:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"the conference list with ",(0,i.kt)("inlineCode",{parentName:"li"},"https://app.wazo.io/phonebook/conferences")),(0,i.kt)("li",{parentName:"ul"},"the meetings page with ",(0,i.kt)("inlineCode",{parentName:"li"},"https://app.wazo.io/meetings"),"\nNavigate the web application in order to retrieve the URLs you'd like to link to from the location bar of your browser.")),(0,i.kt)("h3",{id:"pre-filling-the-host-name"},"Pre-filling the host name"),(0,i.kt)("p",null,"By adding the ",(0,i.kt)("inlineCode",{parentName:"p"},"host")," parameter to a Web Application link, the stack hostname will be pre-filled, like: ",(0,i.kt)("inlineCode",{parentName:"p"},"app.wazo.io/?host=my-stack.io"),"."),(0,i.kt)("h2",{id:"desktop-application"},"Desktop Application"),(0,i.kt)("p",null,"You can also control Wazo Desktop in a similar fashion."),(0,i.kt)("p",null,"Instead of using ",(0,i.kt)("inlineCode",{parentName:"p"},"https://app.wazo.io"),", you may use the ",(0,i.kt)("inlineCode",{parentName:"p"},"wazo://")," protocol."),(0,i.kt)("p",null,"For instance, you can access:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"the conference list with ",(0,i.kt)("inlineCode",{parentName:"li"},"wazo://phonebook/conferences")),(0,i.kt)("li",{parentName:"ul"},"the meetings page with ",(0,i.kt)("inlineCode",{parentName:"li"},"wazo://meetings"),"\nOn your first attempt, you will be prompted to allow access to the application.")),(0,i.kt)("p",null,"Following your approval, you will land on the page directly."),(0,i.kt)("h3",{id:"pre-filling-the-host-name-1"},"Pre-filling the host name"),(0,i.kt)("p",null,"By adding the ",(0,i.kt)("inlineCode",{parentName:"p"},"host")," parameter to the Desktop Application link, the stack hostname will be pre-filled, like: ",(0,i.kt)("inlineCode",{parentName:"p"},"wazo://?host=my-stack.io"),"."),(0,i.kt)("h2",{id:"initiating-a-call"},"Initiating a call"),(0,i.kt)("p",null,"You can also use URLs to initiate a call with the ",(0,i.kt)("inlineCode",{parentName:"p"},"[protocol]:/calls/[your-number]")," URL structure."),(0,i.kt)("p",null,"For instance:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"https://app.wazo.io/calls/418-555-1234")," loads the web application and redirects you to the lobby, from which you can proceed with the call."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"wazo://calls/418-555-1234"),"\nwill bring the desktop app to the foreground and achieve the same result.")),(0,i.kt)("h3",{id:"bypassing-the-lobby"},"Bypassing the lobby"),(0,i.kt)("p",null,"You can bypass the lobby and proceed directly with the call by adding the ",(0,i.kt)("inlineCode",{parentName:"p"},"direct")," query string:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"https://app.wazo.io/calls/418-555-1234?direct"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"wazo://calls/418-555-1234?direct"),"\nThe ",(0,i.kt)("inlineCode",{parentName:"p"},"tel:"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"call:")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"callto:")," protocols automatically bypass the lobby:")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"tel:418-555-1234"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"call:418-555-1234"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"callto:418-555-1234")," (not implemented yet)"))))}u.isMDXComponent=!0}}]);