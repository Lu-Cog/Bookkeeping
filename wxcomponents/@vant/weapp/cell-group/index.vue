<template>
<uni-shadow-root class="@vant-weapp-cell-group-index"><view v-if="title" class="van-cell-group__title">
  {{ title }}
</view>
<view :class="'custom-class van-cell-group '+(border ? 'van-hairline--top-bottom' : '')">
  <slot></slot>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = '@vant/weapp/cell-group/index'
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var component_1 = require('../common/component');
component_1.VantComponent({
  props: {
    title: String,
    border: {
      type: Boolean,
      value: true,
    },
  },
});
export default global['__wxComponents']['@vant/weapp/cell-group/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-cell-group__title{padding:16px 16px 8px;padding:var(--cell-group-title-padding,16px 16px 8px);font-size:14px;font-size:var(--cell-group-title-font-size,14px);line-height:16px;line-height:var(--cell-group-title-line-height,16px);color:#969799;color:var(--cell-group-title-color,#969799)}
</style>