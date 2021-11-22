(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{516:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSG:function(){return G},default:function(){return T}});var o=t(7294),r=t(9008),i=t(8518),a=t.n(i),c=t(5893);var s=function(e){var n=e.setSelectedProvider,t=e.selectedProvider;return(0,c.jsx)("ul",{className:a().list,children:[{name:"Amazon Web Services",src:"/images/aws_logo.svg"},{name:"Google Cloud Platform",src:"/images/gcp_logo.svg",size:"large"},{name:"Microsoft Azure",src:"/images/azure_logo.svg",size:"large"},{name:"DigitalOcean",src:"/images/digital_ocean_logo.svg"},{name:"UpCloud",src:"/images/upcloud_logo.svg"}].map((function(e){var o=t===e.name;return(0,c.jsx)("li",{"aria-current":o?"location":void 0,className:a().item,children:(0,c.jsx)("button",{className:"".concat(a().button," ").concat(o?a().selected:""),onClick:function(){return t=e.name,void n(t);var t},children:(0,c.jsx)("img",{src:"".concat("/improved-cloud-selection").concat(e.src),alt:e.name,className:"".concat(a().image," ").concat("large"===e.size?a().imageLarge:"")})})},e.name)}))})},l=t(7852),u=t.n(l),d=t(1050),f=t.n(d),m=t(9669),_=t.n(m),v=t(3288),g={clouds:"".concat("https://damp-fortress-19341.herokuapp.com","/clouds"),locationByIP:"".concat("https://damp-fortress-19341.herokuapp.com","/geo-coordinates")};function p(e){return _().get(e).then((function(e){return e.data}))}var h=function(e){var n=(0,v.ZP)(g.clouds,p,{fallbackData:e}),t=n.data,o=n.error;return{clouds:t?t.clouds:[],isCloudsLoading:!o&&!t,isCloudsError:Boolean(o)}};var x=function(e){(0,o.useEffect)((function(){_().get(g.locationByIP).then((function(n){var t;n&&(function(e){return null!==e&&"object"===typeof e&&"data"in e}(t=n)&&"number"===typeof t.data.longitude&&"number"===typeof t.data.latitude)&&e(n.data)})).catch((function(){}))}),[])},j=t(7698);function b(e,n){var t="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=function(e,n){if(!e)return;if("string"===typeof e)return N(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return N(e,n)}(e))||n&&e&&"number"===typeof e.length){t&&(e=t);var o=0,r=function(){};return{s:r,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,c=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return a=e.done,e},e:function(e){c=!0,i=e},f:function(){try{a||null==t.return||t.return()}finally{if(c)throw i}}}}function N(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,o=new Array(n);t<n;t++)o[t]=e[t];return o}var C=function(e,n){var t=h(e).clouds;return(0,o.useMemo)((function(){var e={};return function(){var n,o=b(t);try{for(o.s();!(n=o.n()).done;){var r=n.value;r.cloud_provider in e||(e[r.cloud_provider]={}),r.cloud_region in e[r.cloud_provider]||(e[r.cloud_provider][r.cloud_region]=[]),e[r.cloud_provider][r.cloud_region].push(r)}}catch(i){o.e(i)}finally{o.f()}}(),function(){if(n)for(var t in e)for(var o in e[t])e[t][o]=(0,j.orderByDistance)(n,e[t][o])}(),e}),[t,n])};var y=function(e){return function(){"geolocation"in navigator&&navigator.geolocation.getCurrentPosition((function(n){e({longitude:n.coords.longitude,latitude:n.coords.latitude})}))}},S=t(7625);var L=function(e){var n=e.defaultRegion,t=e.organizedRegions,r=e.setSelectedRegion,i=e.userLocation;(0,o.useEffect)((function(){if(Boolean(n)){var e=function(e){var n=e,o=t[n][0];if(i)for(var r=(0,j.getDistance)(i,o),a=0,c=Object.entries(t);a<c.length;a++){var s=(0,S.Z)(c[a],2),l=s[0],u=s[1];(0,j.getDistance)(i,u[0])<r&&(n=l,o=u[0],r=(0,j.getDistance)(i,o))}return n}(n);r(e)}}),[t])};var D=function(e){var n=e.organizedRegions,t=e.selectedRegion,r=e.setSelectedRegion,i=e.userLocation,a=(0,o.useMemo)((function(){return Object.keys(n).slice().sort()}),[n]);return L({defaultRegion:a&&a[0],organizedRegions:n,setSelectedRegion:r,userLocation:i}),(0,c.jsx)("ul",{className:f().list,children:a.map((function(e){var n=t===e;return(0,c.jsx)("li",{"aria-current":n?"location":void 0,className:"".concat(f().items," ").concat(n?f().selected:""),children:(0,c.jsx)("button",{className:"".concat(f().button," ").concat(n?f().selected:""),onClick:function(){r(e)},children:e})},e)}))})},w=t(8897),P=t.n(w);var R=function(e){var n=e.cloud;return(0,c.jsxs)("li",{className:P().cloud,children:[(0,c.jsx)("div",{className:P().cloudName,"data-testid":"cloud-name",children:n.cloud_name}),(0,c.jsx)("div",{className:P().cloudDescription,children:n.cloud_description})]},n.cloud_name)},I=t(5024),z=t.n(I);var E=function(e){var n=e.cloudList,t=(0,o.useMemo)((function(){return n.slice().sort()}),[n]);return(0,c.jsx)("ul",{className:z().cloudlist,children:t.map((function(e){return(0,c.jsx)(R,{cloud:e},e.cloud_name)}))})},M=2e4,k=t(518),B=t.n(k);var O=function(e){var n=e.setMinimalDistance,t=(0,o.useState)(M),r=t[0],i=t[1];return(0,c.jsxs)("div",{className:B().sliderContainer,children:[(0,c.jsx)("label",{htmlFor:"distance-limit",className:B().sliderLabel,children:"Select maximal distance between you and the cloud instances:"}),(0,c.jsx)("input",{type:"range",className:B().sliderInput,min:"1",max:20100,value:r,step:"100",id:"distance-limit",onChange:function(e){var t=Number(e.target.value);i(t),n(t)}}),(0,c.jsxs)("span",{className:B().sliderDistance,children:[r," km"]})]})};var A=function(e){var n=e.cloudList,t=e.userLocation,r=(0,o.useState)(M),i=r[0],a=r[1],s=(0,o.useMemo)((function(){return t?n.filter((function(e){return(0,j.getDistance)(t,e)<1e3*i})):n}),[i,t,n]);return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(O,{setMinimalDistance:a}),(0,c.jsx)(E,{cloudList:s})]})},H=t(5298),U=t.n(H);var F=function(e){var n=e.setUserLocation,t=y(n);return(0,c.jsxs)("button",{className:U().button,onClick:t,children:[(0,c.jsxs)("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 513.597 513.597",className:U().locateIcon,children:[(0,c.jsx)("g",{children:(0,c.jsx)("path",{d:"M263.278,0.107C158.977-3.408,73.323,80.095,73.323,183.602c0,117.469,112.73,202.72,175.915,325.322 c3.208,6.225,12.169,6.233,15.388,0.009c57.16-110.317,154.854-184.291,172.959-290.569 C456.331,108.387,374.776,3.866,263.278,0.107z M256.923,279.773c-53.113,0-96.171-43.059-96.171-96.171 s43.059-96.171,96.171-96.171c53.113,0,96.172,43.059,96.172,96.171S310.036,279.773,256.923,279.773z"})}),"aria-hidden=",!0]}),"More precise results"]})};var G=!0,T=function(e){var n=e.cloudsObject,t=(0,o.useState)("Google Cloud Platform"),i=t[0],a=t[1],l=(0,o.useState)("Europe"),d=l[0],f=l[1],m=(0,o.useState)(),_=m[0],v=m[1];x(v);var g=C(n,_),p=i in g,h=p&&d in g[i];return(0,c.jsxs)("div",{className:u().container,children:[(0,c.jsx)(r.default,{children:(0,c.jsx)("title",{children:"Improved cloud selection"})}),(0,c.jsxs)("main",{role:"main",className:u().main,children:[(0,c.jsx)("h1",{className:u().title,children:"Enhanced cloud selection"}),(0,c.jsx)(F,{setUserLocation:v}),(0,c.jsx)(s,{setSelectedProvider:a,selectedProvider:i}),p&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(D,{organizedRegions:g[i],setSelectedRegion:f,selectedRegion:d,userLocation:_}),h&&(0,c.jsx)(A,{cloudList:g[i][d],userLocation:_})]})]})]})}},5301:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(516)}])},5298:function(e){e.exports={button:"NavigatorLocationButton_button__3HWJ4",locateIcon:"NavigatorLocationButton_locateIcon__3267B"}},8897:function(e){e.exports={cloud:"Cloud_cloud__1C5Ib",cloudName:"Cloud_cloudName__1777R",cloudDescription:"Cloud_cloudDescription__MycnS"}},5024:function(e){e.exports={cloudlist:"CloudList_cloudlist__3KCz8"}},518:function(e){e.exports={sliderContainer:"DistanceSlider_sliderContainer__3YvpC",sliderInput:"DistanceSlider_sliderInput__1ch4f",sliderLabel:"DistanceSlider_sliderLabel__2Gs5H",sliderDistance:"DistanceSlider_sliderDistance__Mtcl9"}},7852:function(e){e.exports={container:"Home_container__1EcsU",main:"Home_main__1x8gC",title:"Home_title__3DjR7"}},8518:function(e){e.exports={button:"CloudProviders_button__3Phfx",selected:"CloudProviders_selected__fQiVa",image:"CloudProviders_image__32Jsj",imageLarge:"CloudProviders_imageLarge__OmIja",list:"CloudProviders_list__2p1tQ"}},1050:function(e){e.exports={list:"RegionsList_list__3THea",button:"RegionsList_button__U6qF4",selected:"RegionsList_selected__3EabK"}}},function(e){e.O(0,[369,774,888,179],(function(){return n=5301,e(e.s=n);var n}));var n=e.O();_N_E=n}]);