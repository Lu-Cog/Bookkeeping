<template>
<uni-shadow-root class="@vant-weapp-checkbox-group-index"><slot></slot></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = '@vant/weapp/checkbox-group/index'
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var relation_1 = require('../common/relation');
var component_1 = require('../common/component');
component_1.VantComponent({
  field: true,
  relation: relation_1.useChildren('checkbox', function (target) {
    this.updateChild(target);
  }),
  props: {
    max: Number,
    value: {
      type: Array,
      observer: 'updateChildren',
    },
    disabled: {
      type: Boolean,
      observer: 'updateChildren',
    },
  },
  methods: {
    updateChildren: function () {
      var _this = this;
      this.children.forEach(function (child) {
        return _this.updateChild(child);
      });
    },
    updateChild: function (child) {
      var _a = this.data,
        value = _a.value,
        disabled = _a.disabled;
      child.setData({
        value: value.indexOf(child.data.name) !== -1,
        parentDisabled: disabled,
      });
    },
  },
});
export default global['__wxComponents']['@vant/weapp/checkbox-group/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';
</style>