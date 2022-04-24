<template>
  <div id="user-view">
    <div id="left-panel">
      <Tooltip
        content="点击更换头像"
        placement="top"
        :disabled="disableToolTip"
      >
        <div
          id="avatar-wrap"
          @mouseenter="disableToolTip = false"
          @mouseleave="disableToolTip = true"
          @click="$refs.avatarInput.click()"
        >
          <img :src="avatarUrl" alt="" style="width: 120px" />
          <input
            type="file"
            id="avatar-input"
            ref="avatarInput"
            accept="image/jpeg,image/png"
            @change="uploadAvatar"
          />
        </div>
      </Tooltip>

      <Menu
        style="width: 200px"
        :active-name="selectedMenuName"
        @on-select="handleMenuSelect"
      >
        <MenuItem name="baseInfo">
          <Icon type="md-document" />
          基本信息
        </MenuItem>
        <MenuItem name="starGame">
          <Icon type="md-game-controller-b" />
          我关注的游戏
        </MenuItem>
        <MenuItem name="starUser">
          <Icon type="md-heart" />
          我关注的用户
        </MenuItem>
        <MenuItem name="followers">
          <Icon type="md-leaf" />
          我的粉丝
        </MenuItem>
        <MenuItem name="message">
          <Icon type="md-chatboxes" />
          我的留言
        </MenuItem>
        <MenuItem name="uploadedGame">
          <Icon type="ios-arrow-dropup-circle" />
          我上传的游戏
        </MenuItem>
        <MenuItem name="activity">
          <Icon type="ios-paper-plane" />
          我的动态
        </MenuItem>
      </Menu>
    </div>
    <div id="top-oper">
      <SearchInUserPath
        v-show="selectedMenuName !== 'baseInfo'"
        placeHolder="请输入用户名筛选"
      ></SearchInUserPath>
      <Button
        v-show="selectedMenuName === 'uploadedGame'"
        style="width: 100px; margin-left: 50px"
        @click="handleShowUploadGameModal"
        >上传新游戏</Button
      >
    </div>
    <div id="info-wrap">
      <BaseInfo v-show="selectedMenuName === 'baseInfo'"></BaseInfo>
      <MessageList v-show="selectedMenuName === 'message'"></MessageList>

      <GameList v-show="selectedMenuName === 'starGame'" type="star"></GameList>
      <GameList
        v-show="selectedMenuName === 'uploadedGame'"
        type="upload"
      ></GameList>
    </div>
    <Modal v-model="showUploadGameModal" title="上传新游戏" scrollable>
      <div id="form-wrap">
        <div class="form-item">
          <div class="label">
            游戏名称<span class="required"> *</span
            ><span id="gameNameExistTip" v-show="showGameNameExistTip">
              游戏名称已存在</span
            >
          </div>
          <div class="item-input">
            <Input
              v-model="gameName"
              show-word-limit
              maxlength="15"
              @on-change="handleGameNameChange"
            />
          </div>
        </div>
        <div class="form-item">
          <div class="label">游戏标签（最多选择三个）</div>
          <div id="checkbox-wrap">
            <CheckboxGroup
              v-model="gameLabelList"
              @on-change="handleGameLabelChange"
            >
              <Checkbox label="competitive">竞技</Checkbox>
              <Checkbox label="relax">休闲</Checkbox>
              <Checkbox label="shoot">射击</Checkbox>
              <Checkbox label="sport">体育</Checkbox>
              <Checkbox label="scary">恐怖</Checkbox>
              <Checkbox label="mobile">手游</Checkbox>
              <Checkbox label="card">卡牌</Checkbox>
              <Checkbox label="development">养成</Checkbox>
            </CheckboxGroup>
          </div>
        </div>
        <div class="form-item">
          <div class="label">游戏介绍<span class="required"> *</span></div>
          <Input
            type="textarea"
            v-model="gameDesc"
            :rows="3"
            show-word-limit
            maxlength="80"
            @on-keydown="handleKeyDown"
          />
        </div>
        <div class="form-item">
          <div class="label">游戏封面<span class="required"> *</span></div>
          <Button
            icon="ios-cloud-upload-outline"
            @click="$refs.coverFileInput.click()"
            >点击上传图片</Button
          >
          <input
            type="file"
            class="file-input"
            ref="coverFileInput"
            accept="image/jpeg,image/png"
          />
        </div>
        <div class="form-item">
          <div class="label">游戏视频<span class="required"> *</span></div>
          <Button
            icon="ios-cloud-upload-outline"
            @click="$refs.videoFileInput.click()"
            >点击上传视频</Button
          >
          <input
            type="file"
            class="file-input"
            ref="videoFileInput"
            accept="video/mp4"
          />
        </div>
      </div>
      <div slot="footer">
        <Button @click="showUploadGameModal = false">取消</Button>
        <Button @click="handleConfirmUploadGame">确定</Button>
      </div>
    </Modal>
    <BackTop></BackTop>
  </div>
</template>

<script>
import MessageList from "../component/MessageList.vue";
import GameList from "../component/GameList.vue";
import SearchInUserPath from "../component/SearchInUserPath.vue";
import BaseInfo from "../component/BaseInfo.vue";
import { getAvatarUrl } from "../js/request";
import { postRequest } from "../js/request";
import { getStandardTimeStr } from "../js/util";

export default {
  data: function () {
    return {
      selectedMenuName: "baseInfo", //左侧当前选择的菜单名称
      showUploadGameModal: false, //展示上传游戏弹窗
      avatarUrl: "",
      disableToolTip: true, //禁止头像上方文字提示显示
      gameName: "", //上传游戏的游戏名
      showGameNameExistTip: false, //显示游戏名称已存在提示
      checkGameNameTimer: null, //对检验游戏名是否存在的请求进行防抖
      gameLabelList: [], //游戏标签
      gameDesc: "",
    };
  },
  computed: {
    uid() {
      return this.$store.state.uid;
    },
  },
  created() {
    getAvatarUrl(this);
  },
  components: {
    MessageList,
    GameList,
    SearchInUserPath,
    BaseInfo,
  },
  methods: {
    handleMenuSelect(menuName) {
      this.selectedMenuName = menuName;
    },
    handleShowUploadGameModal() {
      this.showUploadGameModal = true;
    },
    uploadAvatar() {
      let that = this;
      let file = this.$refs.avatarInput.files[0];
      let fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = function () {
        postRequest(
          "getUserInfo",
          { avatarFileBase64: this.result, uid: that.uid, operType: 4 },
          (data) => {
            if (data.error === 4) {
              that.$Message.success("上传成功");
              setTimeout(() => location.reload(), 500);
            } else if (data.error === -4) that.$Message.error("上传失败");
          }
        );
        that.$refs.avatarInput.value = "";
      };
    },
    handleGameNameChange() {
      if (this.checkGameNameTimer) clearTimeout(this.checkGameNameTimer);
      let that = this;
      this.checkGameNameTimer = setTimeout(() => {
        postRequest(
          "getGameInfo",
          { gameName: this.gameName, operType: 2 },
          (data) => {
            that.showGameNameExistTip = data.error === -2;
          }
        );
        that.checkGameNameTimer = null;
      }, 500);
    },
    handleGameLabelChange(newGameLabelList) {
      this.gameLabelList = newGameLabelList;
      if (newGameLabelList.length > 3) {
        this.$Message.error("最多选择三个标签");
        this.gameLabelList = newGameLabelList.slice(
          0,
          newGameLabelList.length - 1
        );
      }
    },
    handleKeyDown(event) {
      //阻止textarea中输入回车键
      if (event.keyCode == 13) event.preventDefault();
    },
    handleConfirmUploadGame() {
      if (!this.uploadGameInputOk()) {
        this.$Message.error("输入不正确，请重新输入");
        return;
      }
      let formData = new FormData();
      formData.append("gameUploaderUid", this.uid);
      formData.append("gameName", this.gameName);
      formData.append("gameLabel", this.gameLabelList.join(","));
      formData.append("gameDesc", this.gameDesc);
      formData.append("gameCoverFile", this.$refs.coverFileInput.files[0]);
      formData.append("gameVideoFile", this.$refs.videoFileInput.files[0]);
      formData.append("operType", 1);
      formData.append("gameUploadTime", getStandardTimeStr(new Date()));
      postRequest("getGameInfo", formData, (data) => {
        if (data.error === -3) this.$Message.error("上传游戏失败");
        else {
          this.$Message.success("上传游戏成功");
          this.showUploadGameModal = false;
          this.clearGameUploadInput();
        }
      });
    },
    uploadGameInputOk() {
      //上传游戏前检测输入是否合法
      return (
        this.gameName &&
        !this.showGameNameExistTip &&
        this.gameDesc &&
        this.$refs.coverFileInput.files[0] &&
        this.$refs.videoFileInput.files[0]
      );
    },
    clearGameUploadInput() {
      this.gameName = this.gameDesc = "";
      this.gameLabelList = [];
      this.$refs.coverFileInput.value = this.$refs.videoFileInput.value = "";
    },
  },
};
</script>

<style scoped>
#user-view {
  width: 1200px;
  position: absolute;
  left: 110px;
  top: 80px;
}
#avatar-wrap {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;
}
#avatar-input {
  position: absolute;
  display: none;
}
#left-panel {
  top: 125px;
  position: fixed;
  left: 100px;
}
#info-wrap {
  margin-top: 170px;
  margin-left: 350px;
  width: 600px;
}
#top-oper {
  display: flex;
  align-items: center;
  position: absolute;
  top: 90px;
  left: 350px;
  width: 800px;
  height: 40px;
}
#gameNameExistTip {
  font-size: 6px;
  color: #ff6666;
  margin-left: 20px;
}
.form-item {
  margin-bottom: 20px;
}
.required {
  color: red;
}
.file-input {
  display: none;
}
#form-wrap {
  width: 500px;
  height: 440px;
}
</style>
