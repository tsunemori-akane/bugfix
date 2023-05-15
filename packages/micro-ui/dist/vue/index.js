(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@pxw/micro-ui"] = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

  var script = {
    props: {
      msg: String
    },
    data: function data() {
      return {
        count: 1
      };
    },
    methods: {
      increment: function increment() {
        // `this` will refer to the component instance
        this.count++;
      }
    }
  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [vue.createElementVNode("p", null, vue.toDisplayString($props.msg), 1 /* TEXT */), vue.createElementVNode("p", null, vue.toDisplayString($data.count), 1 /* TEXT */), vue.createElementVNode("button", {
      onClick: _cache[0] || (_cache[0] = function () {
        return $options.increment && $options.increment.apply($options, arguments);
      })
    }, "Add")], 64 /* STABLE_FRAGMENT */);
  }

  script.render = render;
  script.__file = "vue/SharedComponent.vue";

  exports.SharedComponent = script;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
