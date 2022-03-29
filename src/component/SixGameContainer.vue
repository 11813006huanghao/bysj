<template>
  <div id="six-game-container">
    <div id="game-category-title">
      <div id="category-name">竞技类</div>
      <Button style="margin-left: 850px; color: #ff6666">更多</Button>
    </div>
    <div id="test1" class="game-card">
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
      <div
        class="mouse-area"
        @mouseenter="handleGameCardHover('test1')"
        @mouseleave="handleGameCardLeave('test1')"
      ></div>
    </div>
    <div class="game-card" id="test2">
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
      <div
        class="mouse-area2"
        @mouseenter="handleGameCardHover('test2')"
        @mouseleave="handleGameCardLeave('test2')"
      ></div>
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
    <div id="test4" class="game-card">
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
      <div
        class="mouse-area4"
        @mouseenter="handleGameCardHover('test4')"
        @mouseleave="handleGameCardLeave('test4')"
      ></div>
    </div>
    <div id="test4" class="game-card">
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
      <div
        class="mouse-area4"
        @mouseenter="handleGameCardHover('test4')"
        @mouseleave="handleGameCardLeave('test4')"
      ></div>
    </div>
    <div id="test4" class="game-card">
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
      <div
        class="mouse-area4"
        @mouseenter="handleGameCardHover('test4')"
        @mouseleave="handleGameCardLeave('test4')"
      ></div>
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
    handleGameCardHover(id) {
      let cardDOM = document.getElementById(id);
      cardDOM.style.marginTop = "-10px";
      cardDOM.style.boxShadow =
        "0 4px 8px 0 #ff6666, 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
      this.showGameDsc = true;
    },
    handleGameCardLeave(id) {
      let cardDOM = document.getElementById(id);
      cardDOM.style.marginTop = "0px";
      cardDOM.style.boxShadow = "0 0px 0px 0 #ff6666";
      this.showGameDsc = false;
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
  top: 100px;
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
