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
        <MenuItem name="uploadGame">
          <Icon type="ios-arrow-dropup-circle" />
          我上传的游戏
        </MenuItem>
        <MenuItem name="activity">
          <Icon type="ios-paper-plane" />
          我的动态
        </MenuItem>
      </Menu>
    </div>
    <SearchInUserPath
      v-show="selectedMenuName !== 'baseInfo'"
      placeHolder="请输入用户名筛选"
      style="margin-left: 350px; margin-top: 100px; position: absolute"
    ></SearchInUserPath>
    <div id="info-wrap">
      <BaseInfo v-if="selectedMenuName === 'baseInfo'"></BaseInfo>
      <MessageList v-if="selectedMenuName === 'message'"></MessageList>
      <GameList v-if="selectedMenuName === 'starGame'"></GameList>
    </div>
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
</style>
