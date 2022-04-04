import Vue from "vue";
import App from "./src/view/App.vue";
import VueRouter from "vue-router";
import ViewUI from "view-design";
import "./src/style/viewUI/overwrite.less";
import "./index.css";

// 用于开发时打包图片文件
import "./src/js/image.js";

//防止重复点击同个路由控制台报警
const originVueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return originVueRouterPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);
Vue.use(ViewUI);

import router from "./src/js/router";
import store from "./src/js/store";

router.beforeEach((to, from, next) => {
  console.log("you changed router");
  next();
});

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
