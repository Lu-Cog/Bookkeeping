(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/add/index"],{"53ed":function(t,e,o){"use strict";o.r(e);var n=o("d828"),a=o.n(n);for(var i in n)"default"!==i&&function(t){o.d(e,t,(function(){return n[t]}))}(i);e["default"]=a.a},"7d97":function(t,e,o){"use strict";(function(t){o("2aad");n(o("66fd"));var e=n(o("81ce"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=o,t(e.default)}).call(this,o("543d")["createPage"])},"81ce":function(t,e,o){"use strict";o.r(e);var n=o("fef0"),a=o("53ed");for(var i in a)"default"!==i&&function(t){o.d(e,t,(function(){return a[t]}))}(i);o("e27e");var r,c=o("f0c5"),s=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=s.exports},afc2:function(t,e,o){},d828:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o("0cab");function a(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var i=function(){o.e("common/vendor").then(function(){return resolve(o("aeff"))}.bind(null,o)).catch(o.oe)},r=function(){o.e("common/vendor").then(function(){return resolve(o("f5a6"))}.bind(null,o)).catch(o.oe)},c=function(){o.e("common/vendor").then(function(){return resolve(o("d173"))}.bind(null,o)).catch(o.oe)},s=function(){o.e("common/vendor").then(function(){return resolve(o("9bad"))}.bind(null,o)).catch(o.oe)},u=function(){o.e("common/vendor").then(function(){return resolve(o("3573"))}.bind(null,o)).catch(o.oe)},f=function(){o.e("components/tabbar/index").then(function(){return resolve(o("0bdd"))}.bind(null,o)).catch(o.oe)},l=getApp(),d={components:{vanPopup:i,vanButton:r,vanField:c,vanIcon:s,vanEmpty:u,tabbar:f},data:function(){return{isTally:!0,isRemark:!1,books:[],categorys:[],bookInfo:{},customer:{},clerk:{},form:{id:"",book_id:"",category_id:0,type:2,money:"",money2:"",name:"",desc:"",date:"",date_lebal:""},selected:0}},onLoad:function(t){var e;this.setData((e={},a(e,"form.date",(0,n.formatTimeTwo)((0,n.formatTime)(new Date),"Y-M-D")),a(e,"form.date_lebal",(0,n.formatTimeTwo)((0,n.formatTime)(new Date),"M月D日")),e))},onReady:function(){},onShow:function(){var e;this.setData((e={},a(e,"form.book_id",l.globalData.book_id),a(e,"bookInfo.name",l.globalData.book_name),e)),this.form.book_id||setTimeout((function(){t.showToast({icon:"none",title:"请先到首页选择账本"})}),100),this.booksFun(),this.categorysFun()},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){var e;this.setData((e={},a(e,"form.date",(0,n.formatTimeTwo)((0,n.formatTime)(new Date),"Y-M-D")),a(e,"form.date_lebal",(0,n.formatTimeTwo)((0,n.formatTime)(new Date),"M月D日")),e)),this.booksFun(),this.categorysFun(),setTimeout((function(){t.stopPullDownRefresh()}),1e3)},onReachBottom:function(){},onShareAppMessage:function(){},methods:{goSelectUser:function(e){var o="";o=1==e?"/pages/views/customer?select=1":"/pages/views/clerk?select=2",t.navigateTo({url:o})},booksFun:function(){var t=this;l.globalData.ajaxPost("/api/get-user-book",{},(function(e){200===e.code&&t.setData({books:e.data})}))},bindPickerChange:function(t){var e=this.books,o=t.detail.value;this.setData(a({bookInfo:e[o]},"form.book_id",e[o]["id"]))},bindPickerChangeDate:function(t){var e;console.log(t,89),this.setData((e={},a(e,"form.date",t.detail.value),a(e,"form.date_lebal",(0,n.formatTimeTwo)(t.detail.value,"M月D日")),e))},setNav:function(t){this.setData(a({},"form.type",t.currentTarget.dataset.value)),this.categorysFun()},categorysFun:function(){var t=this,e=this.form.type;4==e&&(e=3),l.globalData.ajaxPost("/api/get-category-list",{type:e},(function(e){200===e.code&&t.setData({categorys:e.data})}))},setMoney:function(t){this.setData(a({},"form.money",t.detail.value))},setDesc:function(t){this.setData(a({},"form.desc",t.detail.value))},setName:function(t){this.setData(a({},"form.name",t.detail.value))},setcategory:function(t){console.log(t,t.currentTarget.dataset.id),this.setData(a({},"form.category_id",t.currentTarget.dataset.id))},tijiao:function(){var e=this,o=this.form,n=o.book_id,i=o.date,r=o.category_id,c=(o.name,o.money),s=!0;n||(t.showToast({icon:"none",title:"请选择账本"}),s=!1),i||(t.showToast({icon:"none",title:"请选择日期"}),s=!1),r||(t.showToast({icon:"none",title:"请选择分类"}),s=!1),c||(t.showToast({icon:"none",title:"请输入金额"}),s=!1),this.form.customer_id=this.customer.id,this.form.staff_id=this.clerk.id,s&&l.globalData.ajaxPost("/api/set-tally-edit",this.form,(function(o){var n;200===o.code&&(t.showToast({icon:"none",title:"添加成功"}),e.setData((n={},a(n,"form.id",""),a(n,"form.money",""),a(n,"form.money2",""),a(n,"form.desc",""),a(n,"form.name",""),a(n,"form.customer_id",""),a(n,"form.staff_id",""),a(n,"customer",{}),a(n,"clerk",{}),n)))}))},showTally:function(){this.setData({isTally:!0})}}};e.default=d}).call(this,o("543d")["default"])},e27e:function(t,e,o){"use strict";var n=o("afc2"),a=o.n(n);a.a},fef0:function(t,e,o){"use strict";var n;o.d(e,"b",(function(){return a})),o.d(e,"c",(function(){return i})),o.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement;t._self._c},i=[]}},[["7d97","common/runtime","common/vendor"]]]);