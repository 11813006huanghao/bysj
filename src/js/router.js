import Login from "../view/Login.vue";
import Register from "../view/Register.vue";
import VueRouter from "vue-router";
import User from "../view/User.vue";
export default new VueRouter({
  routes: [
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/user/:uid", component: User },
  ],
});
