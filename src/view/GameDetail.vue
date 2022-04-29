<template>
  <div id="game-detail">
    <div id="game-intro">
      <div id="video-wrap">
        <video id="video" controls="controls" muted loop>
          <source :src="gameVideoUrl" type="video/mp4" />
        </video>
      </div>
      <div id="game-info-wrap">
        <div id="game-name">{{ gameName }}</div>
        <div id="upload-user">
          <span class="info-key">上传用户：</span>
          <span class="info-value">{{ gameUploaderUserName }}</span>
        </div>
        <div id="upload-time">
          <span class="info-key">上传时间：</span>
          <span class="info-value">{{ gameUploadTime }}</span>
        </div>
        <div id="description">
          {{ gameDesc }}
        </div>
        <div id="label-wrap">
          <span v-for="(item, i) in gameLabelList" :key="i" class="label">{{
            item
          }}</span>
          <span v-if="gameLabelList.length === 0">暂无标签</span>
        </div>
        <div id="rate">
          <Rate
            style="margin-left: 10px"
            show-text
            allow-half
            :value="Number(gameRate)"
            disabled
          >
            <span style="color: #f5a623">{{ gameRate }}</span>
            <span style="font-size: 4px">
              {{ "（" + gameRaterNum + "评价）" }}</span
            >
          </Rate>
        </div>
        <div id="operation">
          <Button @click="handleToggleStarGame" class="game-oper">{{
            hasStarGame ? "取消关注" : "关注"
          }}</Button>
          <Button class="game-oper" @click="handleShowRate">{{
            hasRate ? "我的评分" : "评分"
          }}</Button>
        </div>
      </div>
    </div>
    <Button
      @click="showPublishCommentModal = true"
      style="
        width: 700px;
        margin-top: 100px;
        height: 40px;
        color: #ff6666;
        box-shadow: 0px 0px 2px red;
      "
      >+ 发表评论</Button
    >
    <div id="comment" v-if="commentList.length > 0">
      <div v-for="(item, i) in commentList" :key="i" class="comment-item">
        <div class="comment-content">
          {{ item.content }}
        </div>
        <div class="comment-footer">
          <div class="sender-avatar">
            <img :src="item.publisher.avatarUrl" style="width: 30px" alt="" />
          </div>
          <div class="sender-name">{{ item.publisher.userName }}</div>
          <div class="sender-time">{{ item.publisher.publishTime }}</div>
          <div
            :class="{ likeUnlike: true, red: item.liked === 1 }"
            @click="handleLikeUnlikeComment(true, item)"
          >
            <Icon type="md-thumbs-up" size="20"></Icon>
            {{ "(" + item.likeNum + ")" }}
          </div>
          <div
            :class="{ likeUnlike: true, red: item.liked === -1 }"
            style="margin-left: 15px"
            @click="handleLikeUnlikeComment(false, item)"
          >
            <Icon type="md-thumbs-down" size="20"></Icon>
            {{ "(" + item.dislikeNum + ")" }}
          </div>
        </div>
      </div>
    </div>
    <Page
      v-if="commentList.length > 0"
      :total="commentTotal"
      @on-change="handlePageChange"
      simple
      style="margin-top: 20px; margin-bottom: 40px"
    />
    <div id="no-comment" v-if="commentList.length === 0">
      这里还没有任何评论，快点击上方发布第一条评论吧~
    </div>

    <Button
      v-show="showPublishCommentBtn"
      style="
        width: 120px;
        height: 40px;
        position: fixed;
        left: 1300px;
        bottom: 28px;
        box-shadow: 0px 0px 4px #ff6666;
      "
      @click="showPublishCommentModal = true"
      >发表评论</Button
    >
    <Modal
      v-model="showRate"
      :styles="{ top: '200px' }"
      scrollable
      @on-ok="handleRate"
    >
      <div id="rate-modal-content-wrap">
        <div id="rate-modal-tip">{{ hasRate ? "我的评分" : "请评分" }}</div>
        <Rate show-text allow-half v-model="rate" :disabled="hasRate"> </Rate>
      </div>
    </Modal>
    <Modal
      v-model="showPublishCommentModal"
      title="发表评论"
      @on-ok="publishComment"
    >
      <Input
        type="textarea"
        v-model="userComment"
        placeholder="说点什么..."
        :rows="5"
        show-word-limit
        maxlength="200"
        @on-keydown="handleKeyDown"
      />
    </Modal>
    <BackTop></BackTop>
  </div>
</template>

<script>
import { requestWithAuth } from "../js/request";
import { getStandardTimeStr, buildAvatarSrc } from "../js/util";
import globalConfig from "../js/config";
export default {
  data() {
    return {
      showRate: false, //展示评分弹窗
      rate: 5, //评分弹窗中的评分分数，如果用户未评分则默认展示5
      hasRate: false, //当前用户是否已评分
      hasStarGame: false, //当前用户是否已关注该游戏
      like: false,
      unlike: true,
      userComment: "", //用户对游戏发表的评论
      showPublishCommentModal: false, //展示用户输入评论的弹窗
      gid: null,
      gameVideoUrl: "",
      gameName: "",
      gameUploaderUserName: "",
      gameUploadTime: "",
      gameDesc: "",
      gameLabelList: [],
      gameRate: "",
      gameRaterNum: 0,
      showPublishCommentBtn: false,
      commentList: [],
      commentPage: 1,
      commentTotal: 0,
    };
  },
  computed: {
    uid() {
      return this.$store.state.uid;
    },
  },
  created() {
    this.gid = this.$route.params.gid;
    window.onscroll = () => {
      this.showPublishCommentBtn = window.scrollY > 720;
    };
    this.gameVideoUrl =
      globalConfig.resourceUrlSuffix + "/game/" + this.gid + "/video.mp4";
    this.getGameInfo();
    this.getUserGameRelation();
    this.getComment();
  },
  beforeDestroy() {
    window.onscroll = function () {};
  },
  methods: {
    handleShowRate() {
      this.showRate = true;
    },
    handleRate() {
      if (this.hasRate) return;
      requestWithAuth(
        "getUserGameRelation",
        { uid: this.uid, gid: this.gid, rate: String(this.rate), operType: 3 },
        (data) => {
          if (data.error === 3) {
            this.hasRate = true;
            this.$Message.success("评分成功");
            this.getUserGameRelation();
            this.getGameInfo();
          } else this.$Message.error("评分失败，请稍后重试");
        }
      );
    },
    getGameInfo() {
      requestWithAuth("getGameInfo", { gid: this.gid, operType: 5 }, (data) => {
        if (data.error === 6) {
          Object.assign(this, data.gameObj);
          this.gameUploadTime = getStandardTimeStr(
            new Date(Number(this.gameUploadTimeStamp))
          );
        } else {
          this.loadViewFail = true;
          this.$Notice.error({
            title: "获取游戏信息失败",
            desc: "请检查网址拼写是否正确，或关闭此页面",
          });
        }
      });
    },
    getUserGameRelation() {
      requestWithAuth(
        "getUserGameRelation",
        { uid: this.uid, gid: this.gid, operType: 1 },
        (data) => {
          if (data.error === 1) {
            this.hasStarGame = data.isFollowed;
            if (data.rate !== "-1") {
              this.rate = Number(data.rate);
              this.hasRate = true;
            }
          } else this.$Message.error("获取用户评分信息失败，请刷新重试");
        }
      );
    },
    handleToggleStarGame() {
      requestWithAuth(
        "getUserGameRelation",
        {
          uid: this.uid,
          gid: this.gid,
          hasStarGame: this.hasStarGame,
          operType: 2,
        },
        (data) => {
          data.error === -2 && this.$Message.error("操作失败，请稍后重试");
          data.error === 2 && (this.hasStarGame = !this.hasStarGame);
        }
      );
    },
    handleKeyDown(event) {
      //阻止textarea中输入回车键
      if (event.keyCode == 13) event.preventDefault();
    },
    publishComment() {
      requestWithAuth(
        "getComment",
        {
          uid: this.uid,
          gid: this.gid,
          content: this.userComment,
          timeStamp: String(new Date().getTime()),
          operType: 2,
        },
        (data) => {
          if (data.error === 2) {
            this.$Message.success("评论成功");
            this.userComment = "";
            this.getComment();
          } else this.$Message.error("评论失败");
        }
      );
    },
    getComment() {
      requestWithAuth(
        "getComment",
        { uid: this.uid, gid: this.gid, page: this.commentPage, operType: 1 },
        (data) => {
          if (data.error === 1) {
            this.commentList = data.commentList;
            this.commentTotal = data.total;
            for (let item of this.commentList) {
              item.publisher.publishTime = getStandardTimeStr(
                new Date(Number(item.publisher.timeStamp)),
                true
              );
              item.publisher.avatarUrl = buildAvatarSrc(
                item.publisher.uid,
                item.publisher.avatarUrl
              );
            }
          } else this.$Message.error("获取评论列表失败");
        }
      );
    },
    handleLikeUnlikeComment(clickThumbUp, comment) {
      let likeStatus = 0;
      /**0，表示既没有点赞也没有点踩
       *,1，表示点了赞
       * -1，表示点了踩
       */
      if (clickThumbUp && comment.liked != 1) likeStatus = 1;
      if (!clickThumbUp && comment.liked != -1) likeStatus = -1;
      requestWithAuth(
        "getComment",
        {
          uid: this.uid,
          gid: this.gid,
          cid: comment.cid,
          newLike: likeStatus,
          oldLike: comment.liked,
          operType: 3,
        },
        (data) => {
          if (data.error === 3) {
            this.$Message.success("操作成功");
            this.getComment();
          } else this.$Message.error("操作失败");
        }
      );
    },
    handlePageChange(newPage) {
      this.commentPage = newPage;
      this.getComment();
    },
  },
};
</script>

<style scoped>
#game-detail {
  margin-top: 100px;
  width: 1100px;
  display: flex;
  flex-direction: column;
}
#game-intro {
  display: flex;
}
#video-wrap {
  height: 480px;
  display: flex;
  align-items: center;
  background-color: black;
  box-shadow: 0 0px 8px 0 black, 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
#video {
  width: 700px;
}
#game-info-wrap {
  width: 300px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#game-name {
  font-family: "jixiehei";
  font-size: 45px;
}
#upload-user {
  margin-top: 25px;
  display: flex;
}
#upload-time {
  margin-top: 15px;
  display: flex;
}
.info-key {
  width: 70px;
  font-weight: bold;
}
.info-value {
  font-family: "jixiehei";
  width: 100px;
}
#description {
  text-align: center;
  margin-top: 50px;
  width: 240px;
  height: 140px;
}
#operation {
  margin-top: 40px;
}
.game-oper {
  width: 120px;
  height: 40px;
  margin-right: 20px;
  box-shadow: 0px 0px 4px #ff6666;
}
#label-wrap {
  display: flex;
  height: 20px;
}
.label {
  width: 50px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-right: 5px;
}
#rate {
  margin-top: 10px;
}
#no-comment {
  height: 100px;
  margin-top: 10px;
  font-weight: bold;
}
#comment {
  width: 700px;
  background-color: rgba(0, 0, 0, 0.7);
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 10px;
}
.comment-item {
  width: 650px;
  min-height: 100px;
  color: white;
  border: 2px solid grey;
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  margin-bottom: 30px;
}
.comment-item:hover {
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
  /* background-color: rgba(0, 0, 0, 0.2); */
}
.comment-content {
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  min-height: 150px;
  border-bottom: 1px solid grey;
}
.comment-footer {
  display: flex;
  align-items: center;
  height: 50px;
  width: 650px;
}
.sender-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 20px;
}
.sender-name {
  margin-left: 10px;
  width: 160px;
}
.sender-time {
  font-size: 10px;
}
.likeUnlike {
  margin-left: 200px;
  cursor: pointer;
  font-size: 10px;
  width: 50px;
}
#rate-modal-content-wrap {
  height: 50px;
}
#rate-modal-tip {
  width: 100%;
  font-size: 18px;
  font-family: "jixiehei";
  height: 30px;
}
.red {
  color: #ff6666;
}
</style>
