import VueRouter from "vue-router";
const Login = () =>
  import(/* webpackChunkName: "view-group" */ "../view/Login.vue");
const Register = () =>
  import(/* webpackChunkName: "view-group" */ "../view/Register.vue");

const User = () =>
  import(/* webpackChunkName: "view-group" */ "../view/User.vue");
const Home = () =>
  import(/* webpackChunkName: "view-home" */ "../view/Home.vue");
const GameDetail = () =>
  import(/* webpackChunkName: "view-group" */ "../view/GameDetail.vue");
const MoreGame = () =>
  import(/* webpackChunkName: "view-group" */ "../view/MoreGame.vue");
const Community = () =>
  import(/* webpackChunkName: "view-group" */ "../view/Community.vue");
const PostDetail = () =>
  import(/* webpackChunkName: "view-group" */ "../view/PostDetail.vue");

export default new VueRouter({
  routes: [
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/user/:uid",
      component: User,
    },
    { path: "/", component: Home },
    {
      path: "/gamedetail/:gid",
      component: GameDetail,
    },
    {
      path: "/moregame",
      component: MoreGame,
    },
    { path: "/community", component: Community },
    { path: "/postdetail/:pid", component: PostDetail },
  ],
});
