<template>
  <div id="login-center">
    <div id="form-wrap">
      <img id="login-title" src="../resource/image/login-title.png" alt="" />
      <div id="form-tip">如没有注册账号，请先使用手机号码注册账号</div>
      <div id="form-body">
        <Input
          prefix="ios-call"
          placeholder="手机号"
          style="width: 310px; height: 50px; margin-left: 55px"
          size="large"
        />
        <Input
          prefix="ios-lock"
          placeholder="密码"
          style="width: 310px; height: 50px; margin-left: 55px"
          size="large"
        />
        <br />
        <Checkbox style="margin-left: 55px">记住密码</Checkbox>
        <br />
        <Button
          style="
            width: 310px;
            margin-left: 55px;
            margin-top: 30px;
            height: 40px;
          "
          >登录</Button
        >
      </div>
      <div id="tip-to-register">
        还未注册？ <span id="go-to-register">去注册</span>
        <span id="forget-pwd">忘记密码？</span>
      </div>
    </div>
    <img id="login-side-img" src="../resource/image/land.jpg" alt="" />
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
};
</script>

<style>
#login-center {
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
#login-side-img {
  width: 700px;
  height: 450px;
}
#login-title {
  margin-top: 50px;
  width: 100px;
  height: 50px;
  margin-left: 50px;
}
#form-tip {
  margin-top: 10px;
  padding-left: 56px;
  color: #fb8c00;
  font-size: 16px;
}
#form-body {
  margin-top: 30px;
}
#tip-to-register {
  margin-top: 10px;
  padding-left: 55px;
}
#go-to-register {
  color: #fb8c00;
  text-decoration-line: underline;
  margin-right: 130px;
  cursor: pointer;
}
#forget-pwd {
  color: #fb8c00;
  text-decoration-line: underline;
  cursor: pointer;
}
</style>
