<template>
  <div id="base-info">
    <div class="info-item">
      <span class="info-key">昵称</span>
      <Input value="黄浩" style="width: 250px; margin-left: 120px" />
    </div>
    <div class="info-item">
      <span class="info-key">性别</span>
      <Input value="男" style="width: 250px; margin-left: 120px" />
    </div>
    <div class="info-item">
      <span class="info-key">生日</span>
      <Input value="1999-10-31" style="width: 250px; margin-left: 120px" />
    </div>
    <div class="info-item" style="align-items: flex-start">
      <span class="info-key">个性签名</span>
      <Input
        value="1999-10-31"
        type="textarea"
        style="width: 250px; margin-left: 120px"
        :rows="3"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
#base-info .info-key {
  font-weight: bold;
  width: 100px;
}
#base-info .info-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
</style>
