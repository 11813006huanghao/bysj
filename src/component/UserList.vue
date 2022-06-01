<template>
  <div id="user-list">
    <div v-for="(item, i) in userList" :key="i" class="user-item">
      <div class="avatar-wrap">
        <img class="avatar" :src="item.avatarSrc" alt="" />
      </div>
      <div class="user-info">
        <div class="user-name">{{ item.userName }}</div>
        <div class="base-info-wrap">
          <div class="gender">{{ item.gender }}</div>
          <div class="follow-num">{{ item.followNum + "关注 |" }}</div>
          <div class="fans-num">{{ item.fansNum + "粉丝 |" }}</div>
          <div class="message-num">{{ item.messageNum + "留言 |" }}</div>
          <div class="dynamic-num">{{ item.dynamicNum + "动态" }}</div>
        </div>
      </div>
      <Button style="">取消关注</Button>
    </div>
    <Loading
      v-show="isLoading"
      style="width: 450px; height: 100%; top: 0px"
    ></Loading>
    <NoContent v-if="showNoContent"></NoContent>
    <Page
      v-if="!showNoContent"
      :total="100"
      @on-change="handlePageChange"
      simple
    />
  </div>
</template>

<script>
import { postRequest } from "../js/request";
import NoContent from "./NoContent.vue";
import Loading from "./Loading.vue";
export default {
  props: ["type"], //follow表示是关注用户列表，fans表示是粉丝列表
  data() {
    return {
      userList: [],
      total: 0, //用户列表总数
      uid: "", //当前页面地址上的/:uid
      currentPage: 1,
      filterUserName: "", //记录当前筛选的用户名
      isLoading: false, //正在获取用户列表
    };
  },
  computed: {
    showNoContent() {
      return this.userList.length === 0;
    },
  },
  created() {
    this.uid = this.$route.params.uid;
    this.getUserList();
  },
  components: {
    NoContent,
    Loading,
  },
  methods: {
    getUserList(filterUserName) {
      if (filterUserName) {
        //表示用户点击了筛选按钮
        this.filterUserName = filterUserName;
      }
      let operType = 2; //获取关注用户列表数据
      if (this.type === "fans") operType = 3; //获取粉丝列表数据
      postRequest(
        "getUserRelation",
        {
          followerUid: this.uid,
          page: this.currentPage,
          filterUserName: this.filterUserName,
          operType,
        },
        (data) => {
          if (data.error === 2) {
            this.userList = data.userList;
            this.total = data.total;
          } else this.$Message.error("获取用户列表失败");
          this.isLoading = false;
        }
      );
    },
    handlePageChange(newPage) {
      this.isLoading = true;
      this.currentPage = newPage;
      this.getUserList();
      this.$emit("handlePageChange", {
        filterContent: this.filterUserName,
        type: "userList",
      }); //如果当前筛选用户名称是A，用户改为B后没有点击筛选按钮，而是直接点击翻页，那么需要将筛选框内容重新更正为A
    },
  },
};
</script>

<style scoped>
#user-list {
  position: relative;
}
.user-item {
  display: flex;
  width: 500px;
  margin-bottom: 20px;
}
.avatar-wrap {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}
.avatar {
  height: 50px;
  cursor: pointer;
}
.user-name {
  width: 300px;
  height: 25px;
  line-height: 25px;
  font-size: 15px;
  color: #fb8c00;
  font-family: "jixiehei";
  cursor: pointer;
}
.base-info-wrap {
  display: flex;
  font-size: 8px;
  color: #999999;
}
.gender {
  margin-right: 10px;
}
.follow-num,
.fans-num,
.message-num,
.dynamic-num {
  margin-right: 5px;
}
</style>
