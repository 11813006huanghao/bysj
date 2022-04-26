import Vue from "vue";
import App from "./src/view/App.vue";
import VueRouter from "vue-router";
import ViewUI from "view-design";
import axios from "axios";
import globalConfig from "./src/js/config";
import "./src/style/viewUI/overwrite.less";
import "./index.css";

// 用于开发时打包图片文件
import "./src/js/image.js";

//防止重复点击同个路由控制台报警
const originVueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return originVueRouterPush.call(this, location).catch((err) => err);
};

axios.defaults.baseURL = globalConfig.host + ":" + globalConfig.port + "/";
axios.defaults.withCredentials = true; //设置axios允许后端设置cookie
Vue.prototype.$axios = axios;

Vue.use(VueRouter);
Vue.use(ViewUI);

import router from "./src/js/router";
import store from "./src/js/store";
import { postRequest } from "./src/js/request";

router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  next();
  //用户进入某些特定页面前，发起请求判断用户是否登录，暂不做
  // postRequest("login", { operType: 2 }, (data) => {
  //   if (data.error === 2) {
  //     Vue.prototype.$Message.error("登录过期，请重新登录");
  //     next("/login");
  //   } else {
  //     store.commit("login", data.uid);
  //     next();
  //   }
  // });
});

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
