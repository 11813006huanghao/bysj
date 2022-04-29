<template>
  <div id="game-list">
    <div v-for="(game, i) in userUploadGameList" :key="i" class="game-item">
      <div class="game-picture-wrap">
        <img class="game-picture" :src="game.gameCoverSrc" alt="" />
      </div>
      <div class="game-info">
        <div class="game-name">{{ game.gameName }}</div>
        <div class="game-dsc">
          {{ game.gameBriefDesc }}
        </div>
        <div class="game-star-rate">
          <Rate show-text allow-half :value="Number(game.gameRate)" disabled>
            <span style="color: #f5a623">{{ game.gameRate }}</span>
            <span style="font-size: 6px">{{
              "（" + game.gameRaterNum + "人评价）"
            }}</span>
          </Rate>
        </div>
      </div>
      <div class="item-border"></div>
      <div class="btn-group">
        <Button
          v-show="type === 'upload'"
          @click="
            showDeleteGameConfirm = true;
            currentDeleteGid = game.gid;
          "
          style="
            color: #ff6666;
            width: 90px;
            margin-top: 10px;
            margin-bottom: 5px;
            margin-left: 10px;
          "
          >删除</Button
        >
        <Button
          :to="'/gamedetail/' + game.gid"
          target="_blank"
          style="color: #ff6666; width: 90px; margin-left: 10px"
          >更多详情</Button
        >
      </div>
    </div>
    <div v-for="(game, i) in userStarGameList" :key="i" class="game-item">
      <div class="game-picture-wrap">
        <img class="game-picture" :src="game.gameCoverSrc" alt="" />
      </div>
      <div class="game-info">
        <div class="game-name">{{ game.gameName }}</div>
        <div class="game-dsc">
          {{ game.gameBriefDesc }}
        </div>
        <div class="game-star-rate">
          <Rate show-text allow-half :value="Number(game.gameRate)" disabled>
            <span style="color: #f5a623">{{ game.gameRate }}</span>
            <span style="font-size: 6px">{{
              "（" + game.gameRaterNum + "人评价）"
            }}</span>
          </Rate>
        </div>
      </div>
      <div class="item-border"></div>
      <div class="btn-group">
        <Button
          :to="'/gamedetail/' + game.gid"
          target="_blank"
          style="color: #ff6666; width: 90px; margin-left: 10px"
          >更多详情</Button
        >
      </div>
    </div>
    <NoContent v-if="showNoContent"></NoContent>
    <Page
      v-if="!showNoContent"
      :total="total"
      @on-change="handlePageChange"
      simple
    />
    <Modal
      title="删除"
      v-model="showDeleteGameConfirm"
      @on-ok="deleteGame"
      :styles="{ top: '200px' }"
    >
      确认删除所上传的游戏吗？
    </Modal>
  </div>
</template>

<script>
import { requestWithAuth, postRequest } from "../js/request";
import globalConfig from "../js/config";
import NoContent from "../component/NoContent.vue";
export default {
  props: ["type"], //star, upload
  data() {
    return {
      userUploadGameList: [],
      userStarGameList: [],
      currentPage: 1,
      total: 0,
      showDeleteGameConfirm: false, //展示确认删除对话框
      currentDeleteGid: null,
    };
  },
  computed: {
    showNoContent() {
      return (
        (this.type === "star" && this.userStarGameList.length === 0) ||
        (this.type === "upload" && this.userUploadGameList.length === 0)
      );
    },
  },
  components: {
    NoContent,
  },
  created() {
    this.uid = this.$route.params.uid;
    if (this.type === "upload") this.getUserUploadGameList();
    else if (this.type === "star") this.getUserStarGameList();
  },
  methods: {
    getUserUploadGameList() {
      postRequest(
        "getGameInfo",
        {
          uid: this.uid,
          page: this.currentPage,
          operType: 3,
        },
        (data) => {
          if (data.error === 4) {
            let srcSuffix = globalConfig.resourceUrlSuffix + "/game";
            for (let item of data.userUploadGameList) {
              item.gameCoverSrc =
                srcSuffix + "/" + item.gid + "/" + item.gameCoverUrl;
              item.gameBriefDesc = item.gameDesc;
              if (item.gameDesc.length > 40)
                item.gameBriefDesc = item.gameDesc.substr(0, 40) + "...";
            }
            Object.assign(this, data);
          } else this.$Message.error("获取上传游戏列表失败");
        }
      );
    },
    getUserStarGameList() {
      postRequest(
        "getGameInfo",
        {
          uid: this.uid,
          page: this.currentPage,
          operType: 4,
        },
        (data) => {
          if (data.error === 5) {
            let srcSuffix = globalConfig.resourceUrlSuffix + "/game";
            for (let item of data.userStarGameList) {
              item.gameCoverSrc =
                srcSuffix + "/" + item.gid + "/" + item.gameCoverUrl;
              item.gameBriefDesc = item.gameDesc;
              if (item.gameDesc.length > 40)
                item.gameBriefDesc = item.gameDesc.substr(0, 40) + "...";
            }
            Object.assign(this, data);
          } else this.$Message.error("获取关注游戏列表失败");
        }
      );
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.type === "upload" && this.getUserUploadGameList();
      this.type === "star" && this.getUserStarGameList();
    },
    deleteGame() {
      requestWithAuth("deleteGame", { gid: this.currentDeleteGid }, (data) => {
        if (data.error === 1) {
          this.$Message.success("删除成功");
          this.getUserUploadGameList();
        } else this.$Message.error("删除失败");
      });
    },
  },
};
</script>

<style scoped>
.game-item {
  display: flex;
  width: 700px;
  margin-bottom: 30px;
}
#game-list {
  width: 600px;
}
.game-picture {
  height: 80px;
}
.game-picture-wrap {
  height: 80px;
  width: 130px;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
}
.game-info {
  width: 270px;
  margin-left: 46px;
}
.game-name {
  color: #fb8c00;
  font-size: 15px;
  font-family: "jixiehei";
  height: 20px;
  line-height: 20px;
}
.game-dsc {
  font-size: 8px;
  color: #999999;
}
.item-border {
  margin-left: 50px;
  height: 80px;
  border-right: 1px solid #ff6666;
}
</style>
