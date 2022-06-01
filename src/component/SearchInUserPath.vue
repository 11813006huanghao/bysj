<template>
  <div id="search-in-user-path">
    <Input
      v-model="filterContent"
      :placeholder="placeHolder"
      style="width: 260px"
    ></Input>
    <Button @click="handleFilter">筛选</Button>
    <Button @click="handleReset">重置</Button>
  </div>
</template>

<script>
export default {
  props: ["placeHolder"],
  data() {
    return {
      filterContent: "",
    };
  },
  created() {},
  methods: {
    handleFilter() {
      this.$emit("handleFilter", this.filterContent);
    },
    handleReset() {
      this.filterContent = "";
      this.handleFilter();
    },
  },
};
</script>

<style scoped></style>
