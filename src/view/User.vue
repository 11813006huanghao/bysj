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
      </Menu>
    </div>
    <div id="info-wrap">
      <div
        id="base-info"
        v-if="selectedMenuName === '' || selectedMenuName === 'baseInfo'"
      >
        <div class="info-item">
          <span class="info-key">昵称</span>
          <Input value="黄浩" style="width: 250px; margin-left: 120px" />
        </div>
        <div class="info-item">
          <span class="info-key">性别</span>
          <Input value="男" style="width: 250px; margin-left: 120px" />
        </div>
        <div class="info-item">
          <span class="info-key">生日</span>
          <Input value="1999-10-31" style="width: 250px; margin-left: 120px" />
        </div>
        <div class="info-item" style="align-items: flex-start">
          <span class="info-key">个性签名</span>
          <Input
            value="1999-10-31"
            type="textarea"
            style="width: 250px; margin-left: 120px"
            :rows="3"
          />
        </div>
      </div>
      <MessageList v-if="selectedMenuName === 'message'"></MessageList>
    </div>
  </div>
</template>

<script>
import MessageList from "../component/MessageList.vue";
export default {
  data: function () {
    return {
      selectedMenuName: "baseInfo",
    };
  },
  components: {
    MessageList,
  },
  methods: {
    handleMenuSelect(menuName) {
      this.selectedMenuName = menuName;
    },
  },
};
</script>

<style>
#user-view {
  width: 1200px;
  border: 1px solid balck;
  display: flex;
}
#left-panel {
  margin-top: 70px;
}
#info-wrap {
  margin-top: 176px;
  margin-left: 150px;
  width: 600px;
}
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
