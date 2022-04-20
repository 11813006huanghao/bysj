<template>
  <div id="post-detail">
    <div id="top-container">
      <div id="black-area">
        <div id="post-name">NBA吧</div>
      </div>
      <div id="post-info">
        <div id="publisher-info">
          <span id="publisher-name">黄浩呵呵哈哈哈或黄浩</span> 创建于
          <span id="publish-time"> 2021-10-31</span>
        </div>
        <div id="related-and-discuss-wrap">
          关于:<span id="related-game">波利西亚的时光</span> 讨论数:
          <span id="discuss-num">1234578</span>
        </div>

        <div id="post-desc">
          全球NBA吧，一个属于篮球迷的集结世界，在这里畅所欲言吧,全球NBA吧，一个属于篮球迷的集结世界，在这里畅所欲言吧,全球NBA吧，一个属于篮球迷的集结世界，在这里畅所欲言吧
        </div>
      </div>
      <div id="post-cover-wrap">
        <img id="post-cover" src="../resource/image/post/post0.jpg" alt="" />
      </div>
    </div>
    <div id="center-container">
      <div class="discuss-item" v-for="(item, i) in discussList" :key="i">
        <div class="avatar-area">
          <div class="avatar-wrap">
            <img class="avatar" src="../resource/image/moon.jpg" alt="" />
          </div>
        </div>
        <div class="right-area">
          <span class="name">黄浩</span>
          <div class="discuss-content">
            {{ item.content }}
          </div>
          <div class="footer">
            <span class="time">2021-11-27</span>
            <div :class="{ likeUnlike: true, red: like }">
              <Icon type="md-thumbs-up" size="18"></Icon> (13478)
            </div>
            <div :class="{ likeUnlike: true, red: unlike }">
              <Icon type="md-thumbs-down" size="18"></Icon> (487)
            </div>
            <span class="reply" @click="showReplyModal = true">回复</span>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="showReplyModal" title="回复他人">
      <Input
        type="textarea"
        v-model="userReply"
        placeholder="我要回复..."
        :rows="5"
      />
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      discussList: [1, 2, 3],
      like: true,
      showReplyModal: false,
    };
  },
  created() {
    this.discussList = [
      {
        content:
          "姑娘好样的，穿上父亲穿过的警服，重走父亲未走完的路，继续为辖区的百姓服务。继续守护这座城市安宁！这就是最好的传承！",
      },
      {
        content: "好女孩，真的是好女孩！从医转从警，之间的艰难...很不容易啊！",
      },
      {
        content:
          "这种信仰代表中国人前赴后继的伟大精神，值得每位青年学习与发扬！",
      },
      {
        content: "继承您的意志，继承您的岗位，您与我同在，致敬英雄们！",
      },
      {
        content: "《走父亲的路，完成心圆梦》",
      },
      {
        content:
          "我吹过你吹的风，穿上你穿的装，感觉你温暖的拥抱，继承你曾经的守护！",
      },
      {
        content: "每一个努力生活的中国人，都是最美的奋斗者。",
      },
    ];
  },
};
</script>

<style scoped>
#post-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}
#top-container {
  position: relative;
}
#post-cover-wrap {
  position: absolute;
  top: 25px;
  left: 25px;
  width: 150px;
  height: 150px;
  overflow: hidden;
}
#post-cover {
  width: 150px;
}
#black-area {
  width: 800;
  height: 100px;
  background-color: rgb(80, 71, 71);
  overflow: hidden; /* 防止子元素#post-name的margin-top带动父元素#black-area下移 */
}
#post-name {
  margin-left: 195px;
  margin-top: 25px;
  color: white;
  font-family: "jixiehei";
  font-size: 35px;
}
#post-info {
  background-color: #f2f4f7;
  width: 800px;
  height: 100px;
}
#publisher-info {
  margin-left: 200px;
  margin-top: 10px;
  display: flex;
}
#publisher-name {
  width: 196px;
  color: #fb8c00;
  cursor: pointer;
}
#publish-time {
  margin-left: 5px;
}
#related-and-discuss-wrap {
  margin-left: 200px;
  display: flex;
}
#related-game {
  margin-left: 5px;
  font-family: "jixiehei";
  cursor: pointer;
  width: 160px;
}
#post-desc {
  margin-left: 200px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 8px;
}
#center-container {
  margin-top: 100px;
}
.discuss-item {
  width: 800px;
  display: flex;
  padding-top: 10px;
}
.discuss-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.avatar-area {
  width: 80px;
}
.avatar-wrap {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
}
.avatar {
  height: 60px;
}
.right-area {
  width: 710px;
  margin-left: 5px;
  margin-bottom: 30px;
  font-size: 16px;
}
.right-area .name {
  height: 30px;
  color: #fb8c00;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}
.right-area .footer {
  margin-top: 5px;
  color: #9195a3;
  font-size: 10px;
}
.likeUnlike {
  cursor: pointer;
  font-size: 6px;
  width: 70px;
  display: inline-block;
}
.footer .time {
  margin-right: 15px;
}
.red {
  color: #ff6666;
}
.reply {
  cursor: pointer;
}
</style>
