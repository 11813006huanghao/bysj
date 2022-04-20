<template>
  <div id="more-game">
    <div id="top-filter">
      <div class="filter-item">
        <div class="filter-label">上传用户</div>
        <div class="filter-option">
          <Input placeholder="请输入用户昵称" style="width: 200px" />
        </div>
      </div>
      <div class="filter-item">
        <div class="filter-label">游戏名称</div>
        <div class="filter-option">
          <Input placeholder="请输入游戏名称" style="width: 200px" />
        </div>
      </div>
      <div class="filter-item">
        <div class="filter-label">上传时间</div>
        <div class="filter-option">
          <DatePicker
            type="daterange"
            placement="bottom-end"
            placeholder="请选择时间段"
            style="width: 200px"
          ></DatePicker>
        </div>
      </div>
      <div class="filter-item" style="border-bottom: 1px solid #fb8c00">
        <div class="filter-label">分类</div>
        <CheckboxGroup>
          <Checkbox>竞技</Checkbox>
          <Checkbox>休闲</Checkbox>
          <Checkbox>射击</Checkbox>
          <Checkbox>体育</Checkbox>
          <Checkbox>恐怖</Checkbox>
          <Checkbox>手游</Checkbox>
          <Checkbox>卡牌</Checkbox>
          <Checkbox>养成</Checkbox>
        </CheckboxGroup>
      </div>
      <div id="top-btn-group">
        <Button>筛选</Button>
        <Button>重置</Button>
      </div>
    </div>
    <GameList style="margin-top: 50px" type="moreGame"></GameList>
  </div>
</template>

<script>
import GameList from "../component/GameList.vue";
export default {
  data() {
    return {};
  },
  components: {
    GameList,
  },
};
</script>

<style scoped>
.filter-item {
  width: 800px;
  display: flex;
  height: 40px;
  align-items: center;
}
.filter-label {
  width: 140px;
  font-weight: bold;
}
#top-filter {
  margin-top: 50px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  padding: 15px;
}
#top-btn-group {
  margin-top: 10px;
}
</style>
