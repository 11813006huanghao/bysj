<template>
  <div id="six-game-container">
    <div id="game-category-title">
      <div id="category-name">{{ categoryName }}</div>
      <Button
        style="margin-left: 850px; color: #ff6666"
        to="/moregame"
        target="_blank"
        >更多</Button
      >
    </div>
    <div
      v-for="(item, i) in gameList"
      :key="i"
      :id="categoryName + i"
      class="game-card"
      @click="goToGameDetail"
    >
      <div class="game-card-img-wrap">
        <img class="game-card-img" :src="item.src" alt="" />
        <div v-show="showGameDsc === categoryName + i" class="game-dsc">
          这是一个游戏样本
        </div>
      </div>
      <div class="game-card-footer">
        <div class="game-name">{{ item.name }}</div>
        <Rate style="margin-left: 10px" show-text allow-half :value="item.rate">
          <span style="color: #f5a623">{{ item.rate }}</span>
          <span style="font-size: 4px">
            {{ "（" + item.raterNum + "评价）" }}</span
          >
        </Rate>
      </div>
      <div
        class="mouse-area"
        @mouseenter="handleGameCardHover(categoryName + i)"
        @mouseleave="handleGameCardLeave(categoryName + i)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["gameList", "categoryName"],
  data() {
    return {
      showGameDsc: "",
    };
  },
  methods: {
    handleGameCardHover(id) {
      console.log(id);
      let cardDOM = document.getElementById(id);
      cardDOM.style.marginTop = "-10px";
      cardDOM.style.boxShadow =
        "0 4px 8px 0 #ff6666, 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
      this.showGameDsc = id;
    },
    handleGameCardLeave(id) {
      let cardDOM = document.getElementById(id);
      cardDOM.style.marginTop = "0px";
      cardDOM.style.boxShadow = "0 0px 0px 0 #ff6666";
      this.showGameDsc = "";
    },
    goToGameDetail() {
      let newTab = this.$router.resolve({
        path: "/gamedetail/4623524215",
      });
      window.open(newTab.href, "_blank");
    },
  },
};
</script>

<style scoped>
#six-game-container {
  width: 1100px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
.game-card {
  transition: 200ms;
  margin-right: 64px;
  margin-bottom: 50px;
  cursor: pointer;
  height: 230px;
  position: relative;
}
.game-card-img-wrap {
  width: 300px;
  height: 170px;
  overflow: hidden;
  position: relative;
}
.game-dsc {
  position: absolute;
  width: 300px;
  height: 40px;
  bottom: 0px;
  background-color: #000;
  font-size: 6px;
  color: #fff;
  opacity: 0.6;
}

.game-card-img {
  width: 300px;
}
.game-card-footer {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 300px;
  height: 60px;
}
.mouse-area {
  width: 300px;
  height: 220px;
  top: 0px;
  position: absolute;
}
.mouse-area2 {
  width: 300px;
  height: 220px;
  top: 100px;
  left: 350px;
  position: absolute;
}
.mouse-area4 {
  width: 300px;
  height: 220px;
  top: 370px;
  left: 0px;
  position: absolute;
}
#category-name {
  font-size: 20px;
  font-weight: bold;
  width: 200px;
  color: #ff6666;
}
#game-category-title {
  width: 1100px;
  display: flex;
  align-items: center;
  height: 100px;
}
.game-name {
  width: 100%;
  padding-left: 10px;
  padding-top: 6px;
  font-size: 15px;
  color: #ff6666;
}
</style>
