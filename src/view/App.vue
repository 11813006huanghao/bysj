<template>
  <div id="app">
    <Header :isLogin="true"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "../component/Header.vue";
export default {
  data: function () {
    return {};
  },
  components: {
    Header,
  },
};
</script>

<style scoped>
#app {
  display: flex;
  align-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
