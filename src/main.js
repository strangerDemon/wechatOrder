// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import MintUi from "mint-ui";
import ElementUI from "element-ui";
import plugins from "./plugins";
import store from "./store";
import { MessageBox } from "mint-ui";
import { Indicator } from 'mint-ui';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.component(CollapseTransition.name, CollapseTransition)
// ## Import styles
// =========================
import "mint-ui/lib/style.css";
import 'element-ui/lib/theme-chalk/base.css';
// import 'normalize.css/normalize.css'

// ## Use plugins
// =========================
Vue.use(MintUi);
Vue.use(plugins);
Vue.use(ElementUI);
// ## Config
// =========================
Vue.config.debug = true;
Vue.config.devtools = true;
Vue.config.productionTip = false;
window.log = console.log;

const app = new Vue({
  // el: '#app',
  router,
  store,
  template: "<App/>",
  components: {
    App
  }
});
//引用主键
window.Indicator=Indicator;
window.MessageBox=MessageBox;

Array.prototype.clear = function() {
  this.splice(0, this.length);
};

app.$mount("#app");
