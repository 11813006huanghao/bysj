<template>
  <div id="community">
    <div id="post-search">
      <Input
        size="large"
        search
        enter-button
        placeholder="输入游戏名或贴吧名搜索相关贴吧"
        style="width: 606px"
      />
      <Button id="create-post" @click="showCreatePostModal = true"
        >创建贴吧</Button
      >
    </div>
    <PostList style="margin-top: 30px"></PostList>
    <Modal title="创建贴吧" v-model="showCreatePostModal">
      <div id="form">
        <div class="form-item">
          <div class="form-label">贴吧名称<span class="required">*</span></div>
          <Input style="width: 320px" />
        </div>
        <div class="form-item">
          <div class="form-label">关联游戏<span class="required">*</span></div>
          <Input style="width: 320px" />
        </div>
        <div class="form-item">
          <div class="form-label">贴吧封面<span class="required">*</span></div>
          <Upload action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">上传封面图片</Button>
          </Upload>
        </div>
        <div class="form-item">
          <div class="form-label">贴吧简介<span class="required">*</span></div>
          <Input type="textarea" :rows="3" style="width: 320px" />
        </div>
        <div class="form-item">
          <div class="form-label">首条讨论<span class="required">*</span></div>
          <Input type="textarea" :rows="3" style="width: 320px" />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import PostList from "../component/PostList.vue";
export default {
  data() {
    return {
      showCreatePostModal: false,
    };
  },
  components: {
    PostList,
  },
};
</script>

<style scoped>
#post-search {
  margin-top: 50px;
  display: flex;
}
#create-post {
  width: 100px;
  height: 40px;
  margin-left: 80px;
  box-shadow: 0 0 3px #ff6666;
}
.form-item {
  display: flex;
  margin-bottom: 10px;
}
.form-label {
  width: 100px;
  font-weight: bold;
}
.required {
  color: red;
}
</style>
