(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"2ae4":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{}},onShow:function(){var t=e.getUpdateManager();t.onCheckForUpdate((function(e){})),t.onUpdateReady((function(n){e.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(e){e.confirm&&t.applyUpdate()}})}))},onLaunch:function(){this.globalData.getMenuRect()},globalData:{book_id:0,book_name:"全部账本",api_base_url:"https://xzb.iqweb.net",menuRect:{},getMenuRect:function(){var t=e.getMenuButtonBoundingClientRect(),n=e.getWindowInfo();t.borderWidth=n.windowWidth-t.right,this.menuRect=t},appShowError:function(t,n){e.showModal({title:"提示",content:t,showCancel:!1,success:function(e){n&&n()}})},appGetCode:function(t){e.login({success:function(n){n.code?(e.setStorageSync("code",n.code),t(n.code)):console.log("登录失败！"+n.errMsg)}})},appSetLogin:function(){var t=this;t.appGetCode((function(n){t.ajaxPost("/api/auth-login",{code:n},(function(t){200===t.code&&(e.setStorageSync("token",t.data.token),e.setStorageSync("userId",t.data.user_id),e.reLaunch({url:"/pages/tally/index"}))}))}))},ajaxPost:function(t,n,o,a,r){var c=this;e.showNavigationBarLoading(),e.showLoading({mask:!0,title:"正在请求..."}),e.request({url:getApp().globalData.api_base_url+t,header:{"content-type":"application/x-www-form-urlencoded",token:e.getStorageSync("token")||""},method:"POST",data:n,success:function(t){return e.hideLoading(),200!==t.statusCode?(c.appShowError("网络错误，请重试!"),!1):-200===t.data.code?(e.showModal({content:"请先登录或登录已过期",success:function(t){t.confirm&&e.reLaunch({url:"/pages/login/login"})}}),!1):200!==t.data.code&&-200!==t.data.code?(c.appShowError(t.data.message,(function(){a&&a(t)})),!1):void(o&&o(t.data))},fail:function(t){e.hideLoading(),c.appShowError(t.errMsg,(function(){a&&a(t)}))},complete:function(t){e.hideNavigationBarLoading(),r&&r(t)}})}}};t.default=n}).call(this,n("543d")["default"])},"935b":function(e,t,n){"use strict";(function(e){n("2aad");var t=c(n("add5")),o=c(n("8a7a")),a=c(n("a1ac")),r=c(n("66fd"));function c(e){return e&&e.__esModule?e:{default:e}}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){d(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}wx.__webpack_require_UNI_MP_PLUGIN__=n,o.default.init(),r.default.mixin(a.default),r.default.config.productionTip=!1,t.default.mpType="app";var f=new r.default(u({},t.default));e(f).$mount()}).call(this,n("543d")["createApp"])},add5:function(e,t,n){"use strict";n.r(t);var o=n("b6ff");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("e4ce");var r,c,i,u,d=n("f0c5"),f=Object(d["a"])(o["default"],r,c,!1,null,null,null,!1,i,u);t["default"]=f.exports},b6ff:function(e,t,n){"use strict";n.r(t);var o=n("2ae4"),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=a.a},cbdd:function(e,t,n){},e4ce:function(e,t,n){"use strict";var o=n("cbdd"),a=n.n(o);a.a}},[["935b","common/runtime","common/vendor"]]]);