<template>
<uni-shadow-root class="@vant-weapp-slider-index"><view :class="'custom-class '+(utils.bem('slider', { disabled }))" :style="inactiveColor ? 'background:' + inactiveColor : ''" @click="onClick">
  <view class="van-slider__bar" :style="(barStyle)+';'+(computed.barStyle(barHeight, activeColor))">
    <view class="van-slider__button-wrapper" @touchstart="onTouchStart" @touchmove.stop.prevent="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
      <slot v-if="useButtonSlot" name="button"></slot>
      <view v-else class="van-slider__button"></view>
    </view>
  </view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs><wxs src="./index.wxs" module="computed"></wxs>
<script>

global['__wxRoute'] = '@vant/weapp/slider/index'
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var component_1 = require('../common/component');
var touch_1 = require('../mixins/touch');
var version_1 = require('../common/version');
var utils_1 = require('../common/utils');
component_1.VantComponent({
  mixins: [touch_1.touch],
  props: {
    disabled: Boolean,
    useButtonSlot: Boolean,
    activeColor: String,
    inactiveColor: String,
    max: {
      type: Number,
      value: 100,
    },
    min: {
      type: Number,
      value: 0,
    },
    step: {
      type: Number,
      value: 1,
    },
    value: {
      type: Number,
      value: 0,
      observer: function (val) {
        if (val !== this.value) {
          this.updateValue(val);
        }
      },
    },
    barHeight: {
      type: null,
      value: 2,
    },
  },
  created: function () {
    this.updateValue(this.data.value);
  },
  methods: {
    onTouchStart: function (event) {
      if (this.data.disabled) return;
      this.touchStart(event);
      this.startValue = this.format(this.value);
      this.dragStatus = 'start';
    },
    onTouchMove: function (event) {
      var _this = this;
      if (this.data.disabled) return;
      if (this.dragStatus === 'start') {
        this.$emit('drag-start');
      }
      this.touchMove(event);
      this.dragStatus = 'draging';
      utils_1.getRect(this, '.van-slider').then(function (rect) {
        var diff = (_this.deltaX / rect.width) * _this.getRange();
        _this.newValue = _this.startValue + diff;
        _this.updateValue(_this.newValue, false, true);
      });
    },
    onTouchEnd: function () {
      if (this.data.disabled) return;
      if (this.dragStatus === 'draging') {
        this.updateValue(this.newValue, true);
        this.$emit('drag-end');
      }
    },
    onClick: function (event) {
      var _this = this;
      if (this.data.disabled) return;
      var min = this.data.min;
      utils_1.getRect(this, '.van-slider').then(function (rect) {
        var value =
          ((event.detail.x - rect.left) / rect.width) * _this.getRange() + min;
        _this.updateValue(value, true);
      });
    },
    updateValue: function (value, end, drag) {
      value = this.format(value);
      var min = this.data.min;
      var width = ((value - min) * 100) / this.getRange() + '%';
      this.value = value;
      this.setData({
        barStyle:
          '\n          width: ' +
          width +
          ';\n          ' +
          (drag ? 'transition: none;' : '') +
          '\n        ',
      });
      if (drag) {
        this.$emit('drag', { value: value });
      }
      if (end) {
        this.$emit('change', value);
      }
      if ((drag || end) && version_1.canIUseModel()) {
        this.setData({ value: value });
      }
    },
    getRange: function () {
      var _a = this.data,
        max = _a.max,
        min = _a.min;
      return max - min;
    },
    format: function (value) {
      var _a = this.data,
        max = _a.max,
        min = _a.min,
        step = _a.step;
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
    },
  },
});
export default global['__wxComponents']['@vant/weapp/slider/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-slider{position:relative;border-radius:999px;border-radius:var(--border-radius-max,999px);background-color:#ebedf0;background-color:var(--slider-inactive-background-color,#ebedf0)}.van-slider:before{position:absolute;right:0;left:0;content:"";top:-8px;top:-var(--padding-xs,8px);bottom:-8px;bottom:-var(--padding-xs,8px)}.van-slider__bar{position:relative;border-radius:inherit;transition:width .2s;transition:width var(--animation-duration-fast,.2s);background-color:#1989fa;background-color:var(--slider-active-background-color,#1989fa)}.van-slider__button{width:24px;height:24px;border-radius:50%;box-shadow:0 1px 2px rgba(0,0,0,.5);background-color:#fff;background-color:var(--slider-button-background-color,#fff)}.van-slider__button-wrapper{position:absolute;top:50%;right:0;-webkit-transform:translate3d(50%,-50%,0);transform:translate3d(50%,-50%,0)}.van-slider--disabled{opacity:.5}
</style>