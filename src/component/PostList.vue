<template>
  <div id="post-list">
    <div v-for="(post, i) in postList" :key="i" class="post-item">
      <div class="post-content">
        <div class="post-cover-wrap">
          <img
            class="post-cover"
            :src="post.coverSrc"
            alt=""
            @click="goToPostDetail(12)"
          />
        </div>
        <div class="content-right">
          <div class="post-name">{{ post.name }}</div>
          <div class="related-game">{{ post.relatedGame }}</div>
          <div class="comment-num-wrap">
            <Icon type="ios-create-outline" :size="20"></Icon>
            {{ post.commentNum }}
          </div>
          <div class="publisher">
            {{ post.publisher }}
          </div>
          <div class="created-time">创建于 {{ post.createdTime }}</div>
          <div class="last-comment-time">
            最近评论于 {{ post.lastCommentTime }}
          </div>
        </div>
      </div>
      <div class="post-footer">
        {{ post.desc }}
      </div>
    </div>
    <NoContent v-show="postList.length === 0"></NoContent>
  </div>
</template>

<script>
let imgBaseSrc = "/resource/image/";
import NoContent from "../component/NoContent.vue";
export default {
  data() {
    return {
      postList: [],
    };
  },
  created() {
    for (let i = 0; i < 10; i++) {
      this.postList.push({
        name: "贴吧" + i,
        commentNum: 100 * i,
        desc: "这是第" + i + "个贴吧哈哈哈",
        coverSrc: imgBaseSrc + "post" + i + ".jpg",
        publisher: "黄浩" + i,
        createdTime: "2019-02-03",
        lastCommentTime: "2022-03-30",
        relatedGame: "英雄联盟",
      });
    }
  },
  components: {
    NoContent,
  },
  methods: {
    goToPostDetail(pid) {
      let newTab = this.$router.resolve({
        path: "/postdetail/" + pid,
      });
      window.open(newTab.href, "_blank");
    },
  },
};
</script>

<style scoped>
#post-list {
  width: 900px;
  height: 100px;
}
.post-item {
  float: left;
  width: 382px;
  height: 234px;
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.post-item:hover {
  box-shadow: 0 0 4px #ff6666;
}
.post-content {
  width: 100%;
  height: 150px;
  display: flex;
}
.post-cover-wrap {
  width: 150px;
  height: 150px;
  overflow: hidden;
}
.post-cover {
  width: 150px;
  cursor: pointer;
}
.content-right {
  width: 200px;
  padding-left: 15px;
  margin-top: -6px;
}
.post-name {
  font-size: 22px;
  font-family: "jixiehei";
}
.related-game {
  font-family: "jixiehei";
  cursor: pointer;
  display: inline-block;
}
.comment-num-wrap {
  display: inline-block;
}
.publisher {
  color: #fb8c00;
  cursor: pointer;
  margin-top: 15px;
}
.created-time,
.last-comment-time {
  color: #999999;
  font-size: 10px;
}
.post-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  margin-top: 15px;
  padding-top: 6px;
}
</style>
