<template>
  <div id="register-center">
    <img id="register-side-img" src="../resource/image/bridge.jpg" alt="" />
    <div id="form-wrap">
      <div id="register-title">注 册</div>
      <div id="form-body">
        <Input
          prefix="ios-contact"
          placeholder="昵称"
          style="width: 310px; margin-left: 55px; margin-bottom: 10px"
          size="large"
          maxlength="10"
          show-word-limit
        />
        <Input
          prefix="ios-call"
          placeholder="手机号"
          style="width: 310px; margin-left: 55px; margin-bottom: 10px"
          size="large"
        />
        <Input
          prefix="ios-lock"
          placeholder="密码"
          style="width: 310px; height: 50px; margin-left: 55px"
          size="large"
          type="password"
        />
        <Input
          prefix="ios-lock"
          placeholder="确认密码"
          style="width: 310px; height: 50px; margin-left: 55px"
          size="large"
          type="password"
        />
        <div id="verify-code-wrap">
          <Input
            placeholder="验证码"
            style="width: 207px; height: 40px; margin-left: 55px"
            size="large"
          />
          <Button style="height: 40px">获取验证码</Button>
        </div>
        <Button
          style="
            width: 310px;
            margin-left: 55px;
            margin-top: 10px;
            height: 40px;
          "
          >注册</Button
        >
      </div>
      <div id="tip-to-login">
        已有账号？ <span id="go-to-login" @click="goToLogin">去登录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
#register-center {
  width: 1200px;
  margin-top: 100px;
  height: 450px;
  display: flex;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
#form-wrap {
  width: 500px;
  height: 450px;
  display: flex;
  flex-direction: column;
}
#register-side-img {
  width: 700px;
  height: 450px;
}
#register-title {
  font-family: "jiayouya";
  font-size: 45px;
  margin-top: 15px;
  margin-left: 50px;
  color: #fb8c00;
}

#form-body {
  margin-top: 10px;
}
#tip-to-login {
  margin-top: 10px;
  padding-left: 155px;
}
#go-to-login {
  color: #fb8c00;
  text-decoration-line: underline;
  margin-right: 130px;
  cursor: pointer;
}

#verify-code-wrap {
  display: flex;
  align-items: center;
}
</style>
