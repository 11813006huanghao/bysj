<template>
  <div id="header">
    <div id="title" v-on:click="goToHome">
      <img id="title-img" src="../resource/image/title.jpg" alt="" />
      <img id="title-font" src="../resource/image/title-font.png" alt="" />
    </div>
    <div id="navigator">一</div>
    <div id="search">二</div>
    <router-link id="login" to="/login">登录</router-link>
    <router-link id="register" to="/register">注册</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
#header {
  display: flex;
  align-items: center;
  height: 80px;
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 100%;
}
#header #title {
  font-size: 25px;
  font-weight: bold;
  margin-left: 200px;
  display: flex;
  align-items: center;
  font-family: "Arial2", Helvetica, sans-serif;
  cursor: pointer;
}
#login {
  position: absolute;
  right: 120px;
}
#register {
  position: absolute;
  right: 80px;
}
#title-img {
  width: 140px;
  height: 80px;
}
#title-font {
  width: 240px;
  height: 45px;
}
#login,
#register {
  color: #ab47bc;
}
</style>
