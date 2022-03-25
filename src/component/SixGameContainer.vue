<template>
  <div id="six-game-container">
    <div id="game-category-title">
      <div id="category-name">竞技类</div>
      <Button style="margin-left: 850px; color: #ff6666">更多</Button>
    </div>
    <div
      class="game-card"
      @mouseenter="handleGameCardHover"
      @mouseleave="handleGameCardLeave"
    >
      <div class="game-card-img-wrap">
        <img
          class="game-card-img"
          src="../resource/image/game/game2.jpg"
          alt=""
        />
        <div v-show="showGameDsc" class="game-dsc">这是一款刺激的竞技游戏</div>
      </div>
      <div class="game-card-footer">
        <div class="game-name">英雄联盟</div>
        <Rate style="margin-left: 10px" show-text allow-half :value="3.6">
          <span style="color: #f5a623">3.6</span>
          <span style="font-size: 4px"> （32001评价）</span>
        </Rate>
      </div>
    </div>
    <div
      class="game-card"
      @mouseenter="handleGameCardHover"
      @mouseleave="handleGameCardLeave"
    >
      <div class="game-card-img-wrap">
        <img
          class="game-card-img"
          src="../resource/image/game/game3.jpg"
          alt=""
        />
        <div v-show="showGameDsc" class="game-dsc">这是一款刺激的竞技游戏</div>
      </div>
      <div class="game-card-footer">
        <div class="game-name">波西利亚时光</div>
        <Rate style="margin-left: 10px" show-text allow-half :value="4.0">
          <span style="color: #f5a623">4.0</span>
          <span style="font-size: 4px"> （13201评价）</span>
        </Rate>
      </div>
    </div>
    <div class="game-card">
      <div class="game-card-img-wrap">
        <img
          class="game-card-img"
          src="../resource/image/game/game9.jpg"
          alt=""
        />
      </div>
      <div class="game-card-footer">
        <div class="game-name">绝地求生</div>
        <Rate style="margin-left: 10px" show-text allow-half :value="4.2">
          <span style="color: #f5a623">4.2</span>
          <span style="font-size: 4px"> （2546评价）</span>
        </Rate>
      </div>
    </div>
    <div class="game-card">
      <div class="game-card-img-wrap">
        <img
          class="game-card-img"
          src="../resource/image/game/game7.jpg"
          alt=""
        />
      </div>
      <div class="game-card-footer">
        <div class="game-name">围攻</div>
        <Rate style="margin-left: 10px" show-text allow-half :value="3.9">
          <span style="color: #f5a623">3.9</span>
          <span style="font-size: 4px"> （423评价）</span>
        </Rate>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showGameDsc: false,
    };
  },
  methods: {
    handleGameCardHover() {
      this.showGameDsc = true;
    },
    handleGameCardLeave() {
      this.showGameDsc = false;
    },
  },
};
</script>

<style scoped>
#six-game-container {
  width: 1100px;
}
.game-card {
  float: left;
  margin-right: 64px;
  margin-bottom: 50px;
  cursor: pointer;
}
.game-card:hover {
  box-shadow: 0 4px 8px 0 #ff6666, 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
