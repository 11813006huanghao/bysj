<template>
  <div id="header">
    <div id="title" v-on:click="goToHome">
      <img id="title-img" src="../resource/image/title.jpg" alt="" />
      <img id="title-font" src="../resource/image/title-font.png" alt="" />
    </div>
    <div id="navigator">
      <span class="top-menu">主页</span>
      <span class="top-menu" @click="goToCommunity">社区</span>
      <span class="top-menu">相关</span>
    </div>
    <router-link v-if="!isLogin" id="login" to="/login">登录</router-link>
    <router-link v-if="!isLogin" id="register" to="/register">注册</router-link>
    <div v-if="isLogin" id="current-avatar-wrap">
      <img
        id="current-avatar"
        :src="avatarUrl"
        alt=""
        @click.stop="handleAvatarClick"
      />
    </div>
    <Menu
      v-if="showUserMenu"
      theme="dark"
      style="width: 100px; position: absolute; right: 50px; top: 60px"
      @on-select="handleUserMenuSelect"
    >
      <MenuItem style="font-size: 12px; height: 30px" name="userSpace"
        >个人中心</MenuItem
      >
      <MenuItem style="font-size: 12px; color: #ff6666" name="logout"
        >退出登录</MenuItem
      >
    </Menu>
  </div>
</template>

<script>
import { getAvatarUrl } from "../js/request";
export default {
  data() {
    return {
      showUserMenu: false, //展示头像下方的菜单
      avatarUrl: "",
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    uid() {
      return this.$store.state.uid;
    },
  },
  watch: {
    uid(newValue, oldValue) {
      getAvatarUrl(this);
    },
  },
  created() {
    // 点击页面空白处，用户头像处菜单应该隐藏
    document.addEventListener("click", (e) => {
      this.showUserMenu = false;
    });
    getAvatarUrl(this);
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    },
    handleAvatarClick() {
      this.showUserMenu = true;
    },
    goToCommunity() {
      let newTab = this.$router.resolve({ path: "/community" });
      window.open(newTab.href, "_blank");
    },
    handleUserMenuSelect(menuName) {
      if (menuName === "logout") {
        this.$store.commit("logout");
        document.cookie = "uid=null;max-age=0";
        this.$router.push("/login");
      } else {
        let newTab = this.$router.resolve({ path: "/user/" + this.uid });
        window.open(newTab.href, "_blank");
      }
      this.showUserMenu = false;
    },
  },
};
</script>

<style scoped>
#header {
  display: flex;
  align-items: center;
  height: 80px;
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 100%;
}
#navigator {
  margin-left: 600px;
  font-size: 20px;
  font-weight: bold;
  color: #98106c;
}
.top-menu {
  cursor: pointer;
}
.top-menu:hover {
  opacity: 0.8;
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
  color: #ab47bc;
  right: 120px;
}
#register {
  position: absolute;
  color: #ab47bc;
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
#current-avatar {
  width: 30px;
  cursor: pointer;
}
#current-avatar-wrap {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  right: 50px;
}
</style>
