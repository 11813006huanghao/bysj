<template>
  <div id="base-info">
    <div class="info-item">
      <span class="info-key">昵称</span>
      <Input
        v-model="userName"
        maxlength="10"
        show-word-limit
        style="width: 250px; margin-left: 120px"
      />
    </div>
    <div class="info-item">
      <span class="info-key">性别</span>
      <Select v-model="gender" style="width: 250px; margin-left: 120px">
        <Option value="M">男</Option>
        <Option value="W">女</Option>
      </Select>
    </div>
    <div class="info-item">
      <span class="info-key">生日</span>
      <DatePicker
        v-model="birthday"
        :options="dateConfig"
        type="date"
        placeholder="选择日期"
        style="width: 250px; margin-left: 120px"
      ></DatePicker>
    </div>
    <div class="info-item" style="align-items: flex-start">
      <span class="info-key">个性签名</span>
      <Input
        v-model="signature"
        type="textarea"
        style="width: 250px; margin-left: 120px; resize: none"
        :rows="3"
        show-word-limit
        maxlength="40"
        @on-keydown="handleKeyDown"
      />
    </div>
    <div id="footer-btn-group">
      <Button @click="onClickReset">重置</Button>
      <Button @click="onClickModify">修改</Button>
    </div>
  </div>
</template>

<script>
import { requestWithAuth, postRequest } from "../js/request";
import { getStandardTimeStr } from "../js/util";
export default {
  data() {
    return {
      uid: "",
      gender: "M", //用户选择的性别
      dateConfig: {
        //日期组件的配置
        disabledDate(date) {
          return date >= new Date();
        },
      },
      birthday: "", //用户选择的生日
      userName: "",
      signature: "", //用户填写的个性签名
    };
  },
  created() {
    this.uid = this.$route.params.uid;
    this.getUserBaseInfo();
  },
  methods: {
    onClickModify() {
      requestWithAuth(
        "getUserInfo",
        {
          uid: this.uid,
          birthday: getStandardTimeStr(this.birthday),
          userName: this.userName,
          gender: this.gender,
          signature: this.signature,
          operType: 3,
        },
        (data) => {
          if (data.error === -3) this.$Message.error("修改失败，昵称已存在");
          else if (data.error === 3) this.$Message.success("修改成功");
        }
      );
    },
    onClickReset() {
      this.getUserBaseInfo();
    },
    getUserBaseInfo() {
      postRequest("getUserInfo", { uid: this.uid, operType: 1 }, (data) => {
        if (data.error === -1)
          this.$Message.error("获取用户信息失败，请检查地址正确性");
        else if (data.error === 1) {
          Object.assign(this, data.userBaseInfo);
        }
      });
    },
    handleKeyDown(event) {
      //阻止用户在textarea中输入回车
      if (event.keyCode == 13) event.preventDefault();
    },
  },
};
</script>

<style scoped>
#base-info .info-key {
  font-weight: bold;
  width: 100px;
}
#base-info .info-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
</style>
