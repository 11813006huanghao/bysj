<template>
  <div id="user-view">
    <div id="left-panel">
      <Tooltip
        content="点击更换头像"
        placement="top"
        :disabled="disableToolTip || !isSelf"
      >
        <div
          id="avatar-wrap"
          @mouseenter="disableToolTip = false"
          @mouseleave="disableToolTip = true"
          @click="isSelf && $refs.avatarInput.click()"
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
          {{ (isSelf ? "我" : "TA") + "关注的游戏" }}
        </MenuItem>
        <MenuItem name="starUser">
          <Icon type="md-heart" />
          {{ (isSelf ? "我" : "TA") + "关注的用户" }}
        </MenuItem>
        <MenuItem name="followers">
          <Icon type="md-leaf" />
          {{ (isSelf ? "我" : "TA") + "的粉丝" }}
        </MenuItem>
        <MenuItem name="message" v-if="isSelf">
          <Icon type="md-chatboxes" />
          {{ (isSelf ? "我" : "TA") + "的留言" }}
        </MenuItem>
        <MenuItem name="uploadedGame">
          <Icon type="ios-arrow-dropup-circle" />
          {{ (isSelf ? "我" : "TA") + "上传的游戏" }}
        </MenuItem>
        <MenuItem name="activity">
          <Icon type="ios-paper-plane" />
          {{ (isSelf ? "我" : "TA") + "的动态" }}
        </MenuItem>
      </Menu>
      <Button
        v-if="!isSelf"
        @click="handleStarUnstarUser"
        style="width: 200px; margin-top: 20px"
        >{{ hasStarUser ? "- 取消关注" : "+ 关注TA" }}</Button
      >
      <br />
      <Button
        v-if="!isSelf"
        @click="showLeaveMessageModal = true"
        style="width: 200px; margin-top: 10px"
        >留言</Button
      >
    </div>
    <div id="top-oper">
      <SearchInUserPath
        v-show="showTopSearch"
        :placeHolder="searchPlaceHolder"
        @handleFilter="handleFilter"
        ref="search"
      ></SearchInUserPath>
      <Button
        v-show="selectedMenuName === 'uploadedGame' && isSelf"
        style="width: 100px; margin-left: 50px"
        @click="handleShowUploadGameModal"
        >上传新游戏</Button
      >
      <Button
        v-show="selectedMenuName === 'activity' && isSelf"
        style="width: 100px; margin-left: 0px"
        @click="showPostDynamicModal = true"
        >发表动态</Button
      >
    </div>
    <div id="info-wrap">
      <BaseInfo
        :isSelf="isSelf"
        v-show="selectedMenuName === 'baseInfo'"
      ></BaseInfo>
      <UserList
        v-show="selectedMenuName === 'starUser'"
        type="follow"
        @handlePageChange="handlePageChange"
      ></UserList>
      <MessageList
        v-show="selectedMenuName === 'message'"
        :isSelf="isSelf"
      ></MessageList>
      <GameList
        v-show="selectedMenuName === 'starGame'"
        type="star"
        ref="starGameList"
      ></GameList>
      <GameList
        v-show="selectedMenuName === 'uploadedGame'"
        type="upload"
        :isSelf="isSelf"
        ref="uploadGameList"
      ></GameList>
      <DynamicList
        v-show="selectedMenuName === 'activity'"
        ref="dynamicList"
        :isSelf="isSelf"
      ></DynamicList>
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
              <Checkbox label="竞技">竞技</Checkbox>
              <Checkbox label="休闲">休闲</Checkbox>
              <Checkbox label="射击">射击</Checkbox>
              <Checkbox label="体育">体育</Checkbox>
              <Checkbox label="恐怖">恐怖</Checkbox>
              <Checkbox label="手游">手游</Checkbox>
              <Checkbox label="卡牌">卡牌</Checkbox>
              <Checkbox label="养成">养成</Checkbox>
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
    <Modal
      v-model="showLeaveMessageModal"
      title="给TA留言"
      @on-ok="leaveMessage"
    >
      <Input
        type="textarea"
        v-model="message"
        placeholder="留点什么..."
        :rows="4"
        show-word-limit
        maxlength="100"
        @on-keydown="handleKeyDown"
      />
    </Modal>
    <Modal
      v-model="showPostDynamicModal"
      title="发表动态"
      @on-ok="handlePostDynamic"
    >
      <Input
        type="textarea"
        v-model="dynamicContent"
        placeholder="分享点什么..."
        :rows="10"
        show-word-limit
        maxlength="300"
        @on-keydown="handleKeyDown"
      />
    </Modal>
    <BackTop></BackTop>
  </div>
</template>

<script>
import MessageList from "../component/MessageList.vue";
import GameList from "../component/GameList.vue";
import SearchInUserPath from "../component/SearchInUserPath.vue";
import BaseInfo from "../component/BaseInfo.vue";
import UserList from "../component/UserList.vue";
import DynamicList from "../component/DynamicList.vue";
import { postRequest, setAvatarSrc } from "../js/request";
import { requestWithAuth } from "../js/request";

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
      uid: "",
      isSelf: false,
      hasStarUser: false, //判断当前登录用户是否已经关注当前页面用户
      filterContentMap: {},
      showLeaveMessageModal: false, //展示留言对话框
      message: "", //留言内容
      showPostDynamicModal: false, //展示发布动态对话框
      dynamicContent: "", //动态文字内容
    };
  },
  computed: {
    searchPlaceHolder() {
      let arr1 = ["starGame", "uploadedGame"];
      let arr2 = ["starUser", "followers"];
      if (arr1.indexOf(this.selectedMenuName) !== -1)
        return "请输入游戏名进行筛选";
      if (arr2.indexOf(this.selectedMenuName) !== -1)
        return "请输入用户名进行筛选";
    },
    showTopSearch() {
      let arr = ["starGame", "starUser", "followers", "uploadedGame"];
      return arr.indexOf(this.selectedMenuName) !== -1;
    },
  },
  created() {
    this.uid = this.$route.params.uid;
    if (this.uid === this.$store.state.uid) this.isSelf = true;
    setAvatarSrc(this.uid, this);
    postRequest(
      "getUserRelation",
      {
        followerUid: this.$store.state.uid,
        followedUid: this.uid,
        operType: 1,
      },
      (data) => {
        this.hasStarUser = data.error === 1;
      }
    );
  },
  components: {
    MessageList,
    GameList,
    SearchInUserPath,
    BaseInfo,
    UserList,
    DynamicList,
  },
  methods: {
    handleMenuSelect(menuName) {
      this.selectedMenuName = menuName;
      this.$refs.search.filterContent = this.filterContentMap[menuName];
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
        requestWithAuth(
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
        requestWithAuth(
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
      formData.append("gameUploadTimeStamp", new Date().getTime());
      requestWithAuth("getGameInfo", formData, (data) => {
        if (data.error === -3) this.$Message.error("上传游戏失败");
        else {
          this.$Message.success("上传游戏成功");
          this.showUploadGameModal = false;
          this.clearGameUploadInput();
          this.$refs.uploadGameList.getUserUploadGameList();
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
    handleStarUnstarUser() {
      requestWithAuth(
        "getUserRelation",
        {
          followerUid: this.$store.state.uid,
          followedUid: this.uid,
          hasStarUser: this.hasStarUser,
          operType: 4,
        },
        (data) => {
          if (data.error === 4) {
            this.hasStarUser = !this.hasStarUser;
            this.$Message.success("关注/取消关注成功");
          } else this.$Message.error("关注/取消关注失败");
        }
      );
    },
    leaveMessage() {
      requestWithAuth(
        "getMessage",
        {
          operType: 2,
          senderUid: this.$store.state.uid,
          receiverUid: this.uid,
          content: this.message,
          timeStamp: String(new Date().getTime()),
        },
        (data) => {
          if (data.error === 2) this.$Message.success("留言成功");
          else this.$Message.error("留言失败");
        }
      );
    },
    handlePostDynamic() {
      requestWithAuth(
        "getDynamic",
        {
          uid: this.$store.state.uid,
          content: this.dynamicContent,
          timeStamp: String(new Date().getTime()),
          operType: 2,
        },
        (data) => {
          if (data.error === 2) {
            this.$Message.success("发布成功");
            this.$refs.dynamicList.getDynamic();
          }
        }
      );
    },
    handleFilter(filterContent) {
      this.filterContentMap[this.selectedMenuName] = filterContent;
      if (this.selectedMenuName === "starGame")
        this.$refs.starGameList.getUserStarGameList(filterContent);
      else if (this.selectedMenuName === "uploadedGame")
        this.$refs.uploadGameList.getUserUploadGameList(filterContent);
    },
    handlePageChange(event) {
      this.$refs.search.filterContent = event.filterContent;
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
