import Vue from "vue";
import App from "./src/view/App.vue";
import VueRouter from "vue-router";
import ViewUI from "view-design";
import "./src/style/viewUI/overwrite.less";
import "./index.css";

//防止重复点击同个路由控制台报警
const originVueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return originVueRouterPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);
Vue.use(ViewUI);

import router from "./src/js/router";
import store from "./src/js/store";

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
