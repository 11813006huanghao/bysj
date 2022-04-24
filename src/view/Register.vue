<template>
  <div id="register-center">
    <img id="register-side-img" src="../resource/image/bridge.jpg" alt="" />
    <div id="form-wrap">
      <div id="register-title">注 册</div>
      <div id="form-body">
        <Input
          prefix="ios-contact"
          placeholder="昵称"
          v-model="name"
          style="width: 310px; margin-left: 55px; margin-bottom: 10px"
          size="large"
          maxlength="10"
          show-word-limit
          @on-change="handleNameChange"
        />
        <span class="form-tip" v-show="showNameTip">昵称已占用</span>
        <Input
          prefix="ios-call"
          placeholder="手机号"
          v-model="phoneNum"
          style="width: 310px; margin-left: 55px; margin-bottom: 10px"
          size="large"
          @on-change="handlePhoneNumChange"
        />
        <span class="form-tip" v-show="showPhoneNumTip">手机号格式错误</span>
        <Input
          prefix="ios-lock"
          placeholder="密码"
          v-model="password"
          style="width: 310px; height: 50px; margin-left: 55px"
          size="large"
          type="password"
          password
          @on-change="handleConfirmPwdChange"
        />
        <Input
          prefix="ios-lock"
          placeholder="确认密码"
          v-model="confirmPwd"
          style="width: 310px; height: 50px; margin-left: 55px"
          size="large"
          type="password"
          password
          @on-change="handleConfirmPwdChange"
        />
        <span class="form-tip" v-show="showConfirmPwdTip">两次密码不一致</span>
        <div id="verify-code-wrap">
          <Input
            placeholder="验证码"
            v-model="verifyCode"
            style="width: 207px; height: 40px; margin-left: 55px"
            size="large"
          />
          <Button
            style="height: 40px; width: 102px"
            @click="handleGetVerifyCode"
            :disabled="btnDisable"
            >{{ countDown > 0 ? countDown + "s" : "获取验证码" }}</Button
          >
        </div>
        <Button
          style="
            width: 310px;
            margin-left: 55px;
            margin-top: 10px;
            height: 40px;
          "
          @click="handleRegister"
          :disabled="btnDisable"
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
import { postRequest } from "../js/request";
export default {
  data: function () {
    return {
      name: "", //注册的用户名
      isSearchName: false, //正在发请求校验用户名是否可用
      searchNameTimer: null, //校验用户名的请求的timer
      showNameTip: false, //提示用户名不可用
      phoneNum: "", //注册的手机号
      password: "",
      confirmPwd: "",
      verifyCode: "",
      showPhoneNumTip: false, //提示手机号不足11位
      showConfirmPwdTip: false, //提示两次密码不一致
      countDown: 0, //验证码倒计时
      countDownTimer: null,
    };
  },
  computed: {
    btnDisable() {
      //用户输入不合理时禁用某些按钮
      return (
        this.showConfirmPwdTip ||
        this.showNameTip ||
        this.showPhoneNumTip ||
        this.name === "" ||
        this.phoneNum === "" ||
        this.password === ""
      );
    },
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    handleNameChange() {
      let that = this;
      if (this.searchNameTimer) {
        clearTimeout(this.searchNameTimer);
      }
      this.searchNameTimer = setTimeout(() => {
        postRequest(
          "register",
          { userName: this.name, operType: 3 },
          (data) => {
            if (data.error === 1) {
              that.showNameTip = true;
            } else if (data.error === 8) {
              that.showNameTip = false;
            }
            that.searchNameTimer = null;
          }
        );
      }, 500);
    },
    handlePhoneNumChange() {
      let reg = /[0-9]{11}/;
      this.showPhoneNumTip = !reg.test(this.phoneNum);
    },
    handleConfirmPwdChange() {
      this.showConfirmPwdTip = this.password !== this.confirmPwd;
    },
    handleRegister() {
      postRequest(
        "register",
        {
          userName: this.name,
          phone: this.phoneNum,
          password: this.password,
          verifyCode: this.verifyCode,
          operType: 4,
        },
        (data) => {
          if (data.error === 5) {
            this.$Message.error("验证码错误");
          } else if (data.error === 1) {
            this.$Message.error("用户名已存在");
          } else if (data.error === 2) {
            this.$Message.error("手机号已经注册");
          } else if (data.error === 0) {
            this.$Message.success("注册成功");
            this.name =
              this.phoneNum =
              this.password =
              this.confirmPwd =
              this.verifyCode =
                "";
            this.showNameTip =
              this.showPhoneNumTip =
              this.showConfirmPwdTip =
                false;
          }
        }
      );
    },
    handleGetVerifyCode() {
      if (this.countDownTimer) return;
      this.countDown = 120;
      this.countDownTimer = setInterval(() => {
        if (this.countDown > 1) this.countDown -= 1;
        else {
          clearInterval(this.countDownTimer);
          this.countDown = 0;
          this.countDownTimer = null;
        }
      }, 1000);
      let that = this;
      postRequest("register", { phone: this.phoneNum, operType: 2 }, (data) => {
        if (data.error === 6) {
          that.$Message.success("验证码发送成功");
        } else {
          that.$Message.error("验证码发送失败，请检查手机号是否正确");
        }
      });
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
.form-tip {
  color: red;
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
