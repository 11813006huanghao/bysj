import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    uid: "",
  },
  mutations: {
    login(state, uid) {
      state.isLogin = true;
      state.uid = uid;
    },
    logout(state) {
      state.isLogin = false;
      state.uid = undefined;
    },
  },
});
