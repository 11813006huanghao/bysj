<template>
  <div id="search-in-user-path">
    <Input :placeholder="placeHolder" style="width: 260px"></Input>
    <Button>筛选</Button>
    <Button>重置</Button>
  </div>
</template>

<script>
export default {
  props: ["placeHolder"],
  data() {
    return {};
  },
  created() {},
};
</script>

<style scoped></style>
