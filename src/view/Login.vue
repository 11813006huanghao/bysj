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
          v-model="phoneNum"
        />
        <Input
          prefix="ios-lock"
          placeholder="密码"
          style="width: 310px; height: 50px; margin-left: 55px"
          size="large"
          type="password"
          v-model="password"
          password
        />
        <br />
        <Checkbox style="margin-left: 55px" v-model="rememberPwd"
          >记住密码</Checkbox
        >
        <br />
        <Button
          @click="handleLogin"
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
        还未注册？ <span id="go-to-register" @click="goToRegister">去注册</span>
        <span id="forget-pwd" @click="handleShowForgetPwdModal"
          >忘记密码？</span
        >
      </div>
    </div>
    <img id="login-side-img" src="../resource/image/land.jpg" alt="" />
    <Modal
      title="重置密码"
      v-model="showForgetPwdModal"
      :styles="{ top: '180px' }"
    >
      <Input
        prefix="ios-call"
        placeholder="手机号"
        style="width: 310px; height: 50px; margin-left: 65px"
        size="large"
        v-model="resetPhoneNum"
      />
      <Input
        prefix="ios-lock"
        placeholder="新密码"
        v-model="resetPwd"
        style="width: 310px; height: 50px; margin-left: 65px"
        size="large"
        type="password"
        password
        @on-change="handleTwoPwdChange"
      />
      <Input
        prefix="ios-lock"
        placeholder="确认新密码"
        v-model="confirmPwd"
        style="width: 310px; height: 50px; margin-left: 65px"
        size="large"
        type="password"
        password
        @on-change="handleTwoPwdChange"
      />
      <span class="two-pwd-tip" v-show="showConfirmPwdTip">两次密码不一致</span>
      <Input
        placeholder="验证码"
        style="width: 207px; height: 40px; margin-left: 65px"
        size="large"
        v-model="verifyCode"
      />

      <Button
        style="height: 40px; width: 98px"
        :disabled="btnDisable"
        @click="handleGetVerifyCode"
        >{{ countDown > 0 ? countDown + " s" : "获取验证码" }}</Button
      >
      <div id="forgetPwdModalFooter" slot="footer">
        <Button @click="showForgetPwdModal = false">取消</Button>
        <Button @click="handleResetPwd">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { postRequest } from "../js/request";
export default {
  data: function () {
    return {
      rememberPwd: false,
      phoneNum: "", //登录时用户输入的手机号
      resetPhoneNum: "", //重置密码时用户输入的手机号
      resetPwd: "", //重置密码时用户输入的密码
      password: "", //登录时用户输入的密码
      isLogin: false,
      showForgetPwdModal: false,
      confirmPwd: "", //重置密码时用户输入的确认密码
      verifyCode: "", //重置密码时用户输入的验证码
      countDown: 0,
      countDownTimer: null,
      showConfirmPwdTip: false, //是否提示用户两次密码不一致
    };
  },
  created() {
    this.phoneNum = localStorage.getItem("phoneNum") || "";
    this.password = localStorage.getItem("pwd") || "";
    if (this.phoneNum) this.rememberPwd = true;
  },
  computed: {
    btnDisable() {
      //用户输入不合理时某些按钮禁用
      return (
        this.resetPhoneNum === "" ||
        this.resetPwd === "" ||
        this.confirmPwd === "" ||
        this.showConfirmPwdTip
      );
    },
  },
  methods: {
    goToRegister() {
      this.$router.push("/register");
    },
    handleLogin() {
      postRequest(
        "login",
        { phone: this.phoneNum, password: this.password, operType: 1 },
        (data) => {
          if (data.error === 0) {
            this.$store.commit("login");
            this.$router.push("/");
            if (this.rememberPwd) {
              localStorage.setItem("phoneNum", this.phoneNum);
              localStorage.setItem("pwd", this.password);
            } else {
              localStorage.removeItem("phoneNum");
              localStorage.removeItem("pwd");
            }
          } else if (data.error === 1) {
            this.$Message.error("手机号未注册或密码不正确");
          } else {
            this.$Message.error("服务器错误，请稍后再试");
          }
        }
      );
    },
    handleResetPwd() {
      if (this.btnDisable || !/[0-9]{11}/.test(this.resetPhoneNum)) {
        this.$Message.error("输入格式不正确");
        return;
      }
      postRequest(
        "register",
        {
          phone: this.resetPhoneNum,
          password: this.resetPwd,
          verifyCode: this.verifyCode,
          operType: 5,
        },
        (data) => {
          if (data.error === 4) this.$Message.error("手机号未注册过");
          else if (data.error === 5) this.$Message.error("验证码错误");
          else if (data.error === 10) {
            this.$Message.success("重置密码成功");
            this.clearInput();
            this.showForgetPwdModal = false;
          }
        }
      );
    },
    handleShowForgetPwdModal() {
      this.clearInput();
      this.showForgetPwdModal = true;
    },
    clearInput() {
      this.phoneNum =
        this.password =
        this.confirmPwd =
        this.verifyCode =
        this.resetPhoneNum =
        this.resetPwd =
          "";
    },
    handleGetVerifyCode() {
      if (this.countDownTimer) return;
      this.countDown = 120;
      this.countDownTimer = setInterval(() => {
        if (this.countDown > 0) this.countDown -= 1;
        else {
          clearInterval(this.countDownTimer);
          this.countDown = 0;
          this.countDownTimer = null;
        }
      }, 1000);
      postRequest(
        "/register",
        { phone: this.resetPhoneNum, operType: 1 },
        (data) => {
          if (data.error === 4) this.$Message.error("手机号未注册过");
          else if (data.error === 6) this.$Message.success("发送验证码成功");
          else if (data.error === 7) this.$Message.error("发送验证码失败");
        }
      );
    },
    handleTwoPwdChange() {
      this.showConfirmPwdTip = this.resetPwd != this.confirmPwd;
    },
  },
};
</script>

<style scoped>
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
.two-pwd-tip {
  font-size: 8px;
  color: red;
}
</style>
