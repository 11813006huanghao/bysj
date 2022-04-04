<template>
  <div id="community">
    <div id="post-search">
      <Input
        size="large"
        search
        enter-button
        placeholder="输入游戏名或贴吧名搜索相关贴吧"
        style="width: 786px"
      />
    </div>
    <PostList style="margin-top: 30px"></PostList>
  </div>
</template>

<script>
import PostList from "../component/PostList.vue";
export default {
  data() {
    return {};
  },
  components: {
    PostList,
  },
};
</script>

<style scoped>
#post-search {
  margin-top: 50px;
}
</style>
