<template>
  <div id="game-detail">
    <div id="game-intro">
      <div id="video-wrap">
        <video id="video" controls="controls" muted loop>
          <source src="../resource/video/video2.mp4" type="video/mp4" />
        </video>
      </div>
      <div id="game-info-wrap">
        <div id="game-name">王者荣耀</div>
        <div id="upload-user">
          <span class="info-key">上传用户：</span>
          <span class="info-value">黄浩</span>
        </div>
        <div id="upload-time">
          <span class="info-key">上传时间：</span>
          <span class="info-value">2022/3/29</span>
        </div>
        <div id="description">
          王者荣耀由中国独立发行，由腾讯游戏公司代运营，如今已成为风靡全球的MOBA手游，常年占据各榜榜首。我们欢迎有激情和极具创造力、操作意识强大的选手来次竞技平台大放异彩。
        </div>
        <div id="label-wrap">
          <span class="label">竞技</span>
          <span class="label">手游</span>
          <span class="label">热门</span>
        </div>
        <div id="rate">
          <Rate style="margin-left: 10px" show-text allow-half :value="3.9">
            <span style="color: #f5a623">3.9</span>
            <span style="font-size: 4px"> （423000评价）</span>
          </Rate>
        </div>
        <div id="operation">
          <Button class="game-oper">{{
            hasStarGame ? "取消关注" : "关注"
          }}</Button>
          <Button class="game-oper" @click="handleShowRate">{{
            hasRate ? "我的评分" : "评分"
          }}</Button>
        </div>
      </div>
    </div>
    <div id="comment">
      <div class="comment-item">
        <div class="comment-content">
          这个游戏挺不错的，我玩了很长时间，一直出新玩法，百玩不厌。有玩家和我一起交流吗？欢迎加我好友哦，我们一起讨论一下进阶操作和玩法，就当交个朋友吧，谢谢！顶顶顶！！！
        </div>
        <div class="comment-footer">
          <div class="sender-avatar">
            <img
              src="../resource/image/avatar.png"
              style="width: 30px"
              alt=""
            />
          </div>
          <div class="sender-name">徐承启</div>
          <div class="sender-time">2022-03-05 14:46:22</div>
          <div :class="{ likeUnlike: true, red: like }">
            <Icon type="md-thumbs-up" size="20"></Icon> (13478)
          </div>
          <div
            :class="{ likeUnlike: true, red: unlike }"
            style="margin-left: 15px"
          >
            <Icon type="md-thumbs-down" size="20"></Icon> (487)
          </div>
        </div>
      </div>
      <div class="comment-item">
        <div class="comment-content">
          也是朋友推荐于是下载了试玩了一下这个游戏，简直发现了新天地，比我预想的要精彩的多。我愿意称之为近几年最好的游戏佳作，希望大家多多支持，多多宣传，冲啊~~
        </div>
        <div class="comment-footer">
          <div class="sender-avatar">
            <img
              src="../resource/image/avatar.png"
              style="width: 30px"
              alt=""
            />
          </div>
          <div class="sender-name">一往无前釜山行</div>
          <div class="sender-time">2022-03-01 04:21:22</div>
          <div class="like-unlike">
            <Icon type="md-thumbs-up" size="20"></Icon>
          </div>
          <div class="like-unlike" style="margin-left: 15px">
            <Icon type="md-thumbs-down" size="20"></Icon>
          </div>
        </div>
      </div>
      <div class="comment-item">
        <div class="comment-content">
          赞赞赞，好久没有找到这么好玩的游戏了，满分推荐兄弟们
        </div>
        <div class="comment-footer">
          <div class="sender-avatar">
            <img
              src="../resource/image/avatar.png"
              style="width: 30px"
              alt=""
            />
          </div>
          <div class="sender-name">贫僧从东土大唐来</div>
          <div class="sender-time">2022-01-31 15:05:51</div>
          <div class="like-unlike">
            <Icon type="md-thumbs-up" size="20"></Icon>
          </div>
          <div class="like-unlike" style="margin-left: 15px">
            <Icon type="md-thumbs-down" size="20"></Icon>
          </div>
        </div>
      </div>
    </div>
    <Affix :offset-top="50" style="position: absolute; left: 970px; top: 760px">
      <Button
        style="width: 120px; height: 40px"
        @click="showPublishCommentModal = true"
        >发表评论</Button
      >
    </Affix>
    <Modal
      v-model="showRate"
      :styles="{ top: '200px' }"
      scrollable
      @on-ok="handleRate"
    >
      <div id="rate-modal-content-wrap">
        <div id="rate-modal-tip">{{ hasRate ? "我的评分" : "请评分" }}</div>
        <Rate show-text allow-half v-model="rateNum" :disabled="hasRate">
        </Rate>
      </div>
    </Modal>
    <Modal v-model="showPublishCommentModal" title="发表评论">
      <Input
        type="textarea"
        v-model="userComment"
        placeholder="说点什么..."
        :rows="5"
      />
    </Modal>
    <BackTop></BackTop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showRate: false, //展示评分弹窗
      rateNum: 5, //评分分数
      hasRate: true, //当前用户是否已评分
      hasStarGame: true, //当前用户是否已关注该游戏
      like: false,
      unlike: true,
      userComment: "", //用户对游戏发表的评论
      showPublishCommentModal: false, //展示用户输入评论的弹窗
    };
  },
  methods: {
    handleShowRate() {
      this.showRate = true;
    },
    handleRate() {
      if (this.hasRate) return;
      //发请求传rateNum给后端
      console.log("you rate is ", this.rateNum);
    },
    handleStarOrUnstarGame() {
      console.log("star or unstar game");
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
#comment {
  width: 700px;
  background-color: rgba(0, 0, 0, 0.7);
  margin-top: 100px;
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
  background-color: rgba(0, 0, 0, 0.2);
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
