import VueRouter from "vue-router";
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
    {
      path: "/gamedetail/:gid",
      component: (resolve) => resolve(require("../view/GameDetail.vue")),
    },
  ],
});
