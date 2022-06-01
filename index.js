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
if (!process.env.development) axios.defaults.baseURL += "gamer/";
axios.defaults.withCredentials = true; //设置axios允许后端设置cookie
Vue.prototype.$axios = axios;

Vue.use(VueRouter);
Vue.use(ViewUI);

import router from "./src/js/router";
import store from "./src/js/store";
import { checkLoginStatus } from "./src/js/request";

router.beforeEach((to, from, next) => {
  console.log(to, from);
  if (to.matched.length > 0) {
    if (to.meta.requireLogin && store.state.isLogin === false) {
      Vue.prototype.$Message.warning("请先登录");
      return next("/login");
    }
    let path = to.matched[0].path;
    let id = "";
    let entity = "";
    let needCheck = false;
    if (path === "/user/:uid") {
      id = to.params.uid;
      entity = "user";
      needCheck = true;
    } else if (path === "/gamedetail/:gid") {
      id = to.params.gid;
      entity = "game";
      needCheck = true;
    } else if (path === "/postdetail/:pid") {
      id = to.params.pid;
      entity = "post";
      needCheck = true;
    } else next();
    if (needCheck) {
      axios.post("checkEntityExist", { entity, id }).then((rsp) => {
        if (rsp.data.error === 1) next();
        else
          Vue.prototype.$Notice.error({
            title: "获取数据失败",
            desc: "请检查网址拼写是否正确，或关闭此页面",
          });
      });
    }
  } else
    Vue.prototype.$Notice.error({
      title: "获取数据失败",
      desc: "请检查网址拼写是否正确，或关闭此页面",
    });
});

checkLoginStatus().then((rsp) => {
  if (rsp.error === 3 || rsp.error === 5) store.commit("login", rsp.uid);
  //先获取用户登录数据再挂载vue实例
  new Vue({
    render: (h) => h(App),
    router,
    store,
  }).$mount("#app");
});
