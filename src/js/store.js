import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    uid: undefined,
  },
  mutations: {
    login(state, uid) {
      state.isLogin = true;
      state.uid = uid;
    },
    logout() {
      state.isLogin = false;
      state.uid = undefined;
    },
  },
});
