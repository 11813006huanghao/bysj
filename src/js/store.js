import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: true,
    uid: undefined,
  },
  mutations: {
    login(uid) {
      state.isLogin = true;
      state.uid = uid;
    },
    logout() {
      state.isLogin = false;
      state.uid = undefined;
    },
  },
});
