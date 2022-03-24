import Register from "../view/Register.vue";
import VueRouter from "vue-router";
import User from "../view/User.vue";
import Home from "../view/Home.vue";
import GameDetail from "../view/GameDetail.vue";
export default new VueRouter({
  routes: [
    {
      path: "/login",
      component: (resolve) => resolve(require("../view/Login.vue")),
    },
    {
      path: "/register",
      component: (resolve) => resolve(require("../view/Register.vue")),
    },
    {
      path: "/user/:uid",
      component: (resolve) => resolve(require("../view/User.vue")),
    },
    { path: "/", component: (resolve) => resolve(require("../view/Home.vue")) },
    { path: "/gamedetail/:gid", component: GameDetail },
  ],
});
