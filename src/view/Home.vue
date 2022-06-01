<template>
  <div id="home-wrap">
    <Input
      size="large"
      search
      enter-button
      placeholder="输入游戏名进行搜索"
      style="margin-top: 50px"
    />
    <div id="main-game">
      <div id="carousel-wrap">
        <Carousel
          dots="none"
          loop
          autoplay
          :autoplay-speed="4000"
          v-model="coverIndex"
          @on-change="handleCoverChange"
          @on-click="handleCoverClick"
        >
          <CarouselItem>
            <img
              class="main-game-cover"
              src="../resource/image/game/game2-cover.jpg"
              alt=""
            />
          </CarouselItem>
          <CarouselItem>
            <img
              class="main-game-cover"
              src="../resource/image/game/game1-cover.jpg"
              alt=""
            />
          </CarouselItem>
          <CarouselItem>
            <img
              class="main-game-cover"
              src="../resource/image/game/game3-cover.jpg"
              alt=""
            />
          </CarouselItem>
          <CarouselItem>
            <img
              class="main-game-cover"
              src="../resource/image/game/game4-cover.jpg"
              alt=""
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
    <SixGameContainer
      categoryName="竞技类"
      :gameList="competitiveGameList"
      style="margin-top: 100px"
    ></SixGameContainer>

    <SixGameContainer
      categoryName="休闲类"
      :gameList="relaxGameList"
      style="margin-top: 100px"
    ></SixGameContainer>
  </div>
</template>

<script>
import SixGameContainer from "../component/SixGameContainer.vue";
import Config from "../js/config";
export default {
  data() {
    return {
      coverIndex: 0, //轮播图当前展示的游戏封面的序号
      gidList: [
        "5299093911",
        "7480850710",
        "8856403211",
        "4365253061",
        "9219094631",
        "8073099655",
        "2150308583",
      ],
      competitiveGameList: [
        { name: "波西利亚时光", rate: 3.6, raterNum: 2111, src: "game3.jpg" },
        { name: "英雄联盟", rate: 4.6, raterNum: 12571, src: "game2.jpg" },
        { name: "伊苏白金", rate: 4.0, raterNum: 254, src: "game5.jpg" },
        { name: "围攻", rate: 3.9, raterNum: 294, src: "game7.jpg" },
        { name: "绝地求生", rate: 4.2, raterNum: 22589, src: "game9.jpg" },
        { name: "CF", rate: 4.4, raterNum: 8541, src: "game13.jpg" },
      ],
      relaxGameList: [
        { name: "游戏世界", rate: 3.2, raterNum: 624, src: "game4.jpg" },
        { name: "云幻古界", rate: 3.8, raterNum: 461, src: "game5-cover.jpg" },
        { name: "剑灵", rate: 4.4, raterNum: 14262, src: "game8.jpg" },
        { name: "黄金之路", rate: 3.9, raterNum: 8621, src: "game10.jpg" },
        { name: "和平精英", rate: 4.1, raterNum: 22549, src: "game12.jpg" },
        {
          name: "枪战之王",
          rate: 4.0,
          raterNum: 7492,
          src: "game16-cover.jpg",
        },
      ],
    };
  },
  components: {
    SixGameContainer,
  },
  created() {
    for (let game of this.competitiveGameList) {
      game.src = Config.resourceUrlSuffix + "/game/" + game.src;
    }
    for (let game of this.relaxGameList) {
      game.src = Config.resourceUrlSuffix + "/game/" + game.src;
    }
  },
  methods: {
    handleCoverClick(index) {
      console.log(index);
      let newTab = this.$router.resolve({
        path: "/gamedetail/" + this.gidList[index],
      });
      window.open(newTab.href, "_blank");
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
