<template>
  <div id="home-wrap">
    <div id="main-game">
      <div id="carousel-wrap">
        <Carousel
          dots="none"
          loop
          autoplay
          :autoplay-speed="4000"
          v-model="coverIndex"
          @on-change="handleCoverChange"
        >
          <CarouselItem>
            <img
              class="main-game-cover"
              src="../resource/image/game/game2-cover.jpg"
              alt=""
              @click="handleCoverClick"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              class="main-game-cover"
              src="../resource/image/game/game1-cover.jpg"
              alt=""
              @click="handleCoverClick"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              class="main-game-cover"
              src="../resource/image/game/game3-cover.jpg"
              alt=""
              @click="handleCoverClick"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              class="main-game-cover"
              src="../resource/image/game/game4-cover.jpg"
              alt=""
              @click="handleCoverClick"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              class="main-game-cover"
              src="../resource/image/game/game8-cover.jpg"
              alt=""
            />
          </CarouselItem>
          <CarouselItem>
            <img
              class="main-game-cover"
              src="../resource/image/game/game11-cover.jpg"
              alt=""
            />
          </CarouselItem>
          <CarouselItem>
            <img
              class="main-game-cover"
              src="../resource/image/game/game15-cover.jpg"
              alt=""
            />
          </CarouselItem>
        </Carousel>
      </div>
      <div id="carousel-option">
        <CellGroup @on-click="handleMainGameNameClick">
          <Cell
            title="王者荣耀"
            :selected="coverIndex === 0"
            @mouseenter.native="handleMainGameNameHover(0)"
          />
          <Cell
            title="原神"
            :selected="coverIndex === 1"
            @mouseenter.native="handleMainGameNameHover(1)"
          />
          <Cell
            title="穿越火线-逃出生天"
            :selected="coverIndex === 2"
            @mouseenter.native="handleMainGameNameHover(2)"
          />
          <Cell
            title="刺客信条3"
            :selected="coverIndex === 3"
            @mouseenter.native="handleMainGameNameHover(3)"
          />
          <Cell
            title="陈情令手游"
            :selected="coverIndex === 4"
            @mouseenter.native="handleMainGameNameHover(4)"
          />
          <Cell
            title="万王之王"
            :selected="coverIndex === 5"
            @mouseenter.native="handleMainGameNameHover(5)"
          />
          <Cell
            title="霍尔沃兹"
            :selected="coverIndex === 6"
            @mouseenter.native="handleMainGameNameHover(6)"
          />
        </CellGroup>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coverIndex: 0, //轮播图当前展示的游戏封面的序号
    };
  },
  methods: {
    handleCoverClick(e) {
      console.log(e.target);
    },
    // not used now
    handleCoverChange(oldIndex, newIndex) {
      console.log(oldIndex, newIndex);
    },
    handleMainGameNameHover(index) {
      this.coverIndex = index;
    },
    handleMainGameNameClick() {
      console.log("you clicked the main game");
    },
  },
};
</script>

<style>
#main-game {
  margin-top: 50px;
  width: 1100px;
  display: flex;
  position: relative;
}
.ivu-cell-title {
  font-size: 20px;
  line-height: 60px;
}
.ivu-cell {
  padding-left: 50px;
  width: 300px;
  height: 60px;
  padding-top: 0;
  padding-bottom: 0;
  border-right: 1px solid red;
  font-weight: bold;
}
.main-game-cover {
  width: 800px;
  cursor: pointer;
}
#carousel-option {
  width: 300px;
}
.ivu-carousel-item {
  width: 800px;
  height: 420px !important;
  overflow: hidden;
}
.ivu-carousel {
  width: 800px;
  height: 420px;
}
</style>
