<template>
  <div id="user-view">
    <div id="left-panel">
      <Icon type="ios-contact" size="100" style="margin-left: 12px" />
      <Menu style="width: 200px" @on-select="handleMenuSelect">
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
    <Modal v-model="showUploadGameModal" title="上传新游戏">
      <div id="form-wrap">
        <div class="form-item">
          <div class="label">游戏名称<span class="required"> *</span></div>
          <div class="item-input">
            <Input />
          </div>
        </div>
        <div class="form-item">
          <div class="label">游戏标签（最多选择三个）</div>
          <div id="checkbox-wrap">
            <CheckboxGroup>
              <Checkbox>竞技</Checkbox>
              <Checkbox>休闲</Checkbox>
              <Checkbox>射击</Checkbox>
              <Checkbox>体育</Checkbox>
              <Checkbox>恐怖</Checkbox>
              <Checkbox>手游</Checkbox>
              <Checkbox>卡牌</Checkbox>
              <Checkbox>养成</Checkbox>
            </CheckboxGroup>
          </div>
        </div>
        <div class="form-item">
          <div class="label">游戏介绍<span class="required"> *</span></div>
          <Input type="textarea" :rows="3" />
        </div>
        <div class="form-item">
          <div class="label">游戏封面<span class="required"> *</span></div>
          <Upload action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">点击上传图片</Button>
          </Upload>
        </div>
        <div class="form-item">
          <div class="label">游戏视频<span class="required"> *</span></div>
          <Upload action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">点击上传视频</Button>
          </Upload>
        </div>
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

export default {
  data: function () {
    return {
      selectedMenuName: "baseInfo",
      showUploadGameModal: false,
    };
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
#left-panel {
  top: 150px;
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
.form-item {
  margin-bottom: 20px;
}
.required {
  color: red;
}
#form-wrap {
  width: 500px;
  height: 500px;
}
</style>
