(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"1a39":function(e,t,n){},"5fa6":function(e,t,n){"use strict";var a=n("1a39"),o=n.n(a);o.a},"6b3e":function(e,t,n){"use strict";n.r(t);var a=n("a6ff"),o=n("f8bc");for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);n("5fa6");var i,r=n("f0c5"),c=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);t["default"]=c.exports},"8cd0":function(e,t,n){"use strict";(function(e){n("2aad");a(n("66fd"));var t=a(n("6b3e"));function a(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},a6bb:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=getApp(),a={data:function(){return{phone:"",authKey:"",userInfo:{}}},onLoad:function(e){},methods:{isUpReg:function(){e.navigateTo({url:"/pages/login/userReg"})},getphonenumber:function(t){var a=this;e.showLoading({title:"正在登录中"}),"getPhoneNumber:ok"==t.detail.errMsg?n.globalData.appGetCode((function(e){a.getUserPhoneNumber(t.detail.encryptedData,t.detail.iv,e)})):e.hideLoading()},getUserPhoneNumber:function(t,a,o){n.globalData.ajaxPost("/api/auth-phone",{encryptedData:t,iv:a,code:o},(function(t){200===t.code&&n.globalData.ajaxPost("/api/auth-phone-login",{phone:t.data.phoneNumber},(function(t){200===t.code&&(e.showToast({title:"登录成功"}),e.setStorageSync("token",t.data.token),e.setStorageSync("userId",t.data.user_id),setTimeout((function(){e.reLaunch({url:"/pages/tally/index"})}),500))}))}))},getUserProfile:function(){n.globalData.appSetLogin()}}};t.default=a}).call(this,n("543d")["default"])},a6ff:function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return a}));var o=function(){var e=this,t=e.$createElement;e._self._c},u=[]},f8bc:function(e,t,n){"use strict";n.r(t);var a=n("a6bb"),o=n.n(a);for(var u in a)"default"!==u&&function(e){n.d(t,e,(function(){return a[e]}))}(u);t["default"]=o.a}},[["8cd0","common/runtime","common/vendor"]]]);