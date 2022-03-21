<template>
  <div id="game-list">
    <div class="game-item">
      <div class="game-picture-wrap">
        <img
          class="game-picture"
          src="../resource/image/game/game1.jpg"
          alt=""
        />
      </div>
      <div class="game-info">
        <div class="game-name">马可波罗</div>
        <div class="game-dsc">
          这是一款休闲的射击小游戏，让你感受畅汗淋漓的战斗！
        </div>
        <div class="game-star-rate">
          <Rate show-text allow-half :value="3.6">
            <span style="color: #f5a623">3.6</span>
          </Rate>
        </div>
      </div>
      <div class="item-border"></div>
      <Button class="game-detail-btn" style="color: #ff6666">更多详情</Button>
    </div>
    <div class="game-item">
      <div class="game-picture-wrap">
        <img
          class="game-picture"
          src="../resource/image/game/game2.jpg"
          alt=""
        />
      </div>
      <div class="game-info">
        <div class="game-name">英雄联盟</div>
        <div class="game-dsc">
          全新的竞技游戏模式，在操作和意识中不断的较量，拔得水晶头筹，获得胜利！
        </div>
        <div class="game-star-rate">
          <Rate show-text allow-half :value="4.1">
            <span style="color: #f5a623">4.1</span>
          </Rate>
        </div>
        <div class="game-label"></div>
      </div>
      <div class="item-border"></div>
      <Button class="game-detail-btn" style="color: #ff6666">更多详情</Button>
    </div>
    <div class="game-item">
      <div class="game-picture-wrap">
        <img
          class="game-picture"
          src="../resource/image/game/game3.jpg"
          alt=""
        />
      </div>
      <div class="game-info">
        <div class="game-name">波西亚时光</div>
        <div class="game-dsc">清爽休闲的小游戏，在疲惫时来这里好好放松吧</div>
        <div class="game-star-rate"></div>
        <div class="game-label"></div>
      </div>
      <div class="item-border"></div>
      <Button class="game-detail-btn" style="color: #ff6666">更多详情</Button>
    </div>
    <div class="game-item">
      <div class="game-picture-wrap">
        <img
          class="game-picture"
          src="../resource/image/game/game4.jpg"
          alt=""
        />
      </div>
      <div class="game-info">
        <div class="game-name">我的世界</div>
        <div class="game-dsc">在我的世界中发现更大游戏世界</div>
        <div class="game-star-rate">
          <Rate show-text allow-half :value="2.6">
            <span style="color: #f5a623">2.6</span>
          </Rate>
        </div>
        <div class="game-label"></div>
      </div>
      <div class="item-border"></div>
      <Button class="game-detail-btn" style="color: #ff6666">更多详情</Button>
    </div>
    <div class="game-item">
      <div class="game-picture-wrap">
        <img
          class="game-picture"
          src="../resource/image/game/game5.jpg"
          alt=""
        />
      </div>
      <div class="game-info">
        <div class="game-name">伊苏白金</div>
        <div class="game-dsc">
          这是一款游戏合集，有着超真实的还原度，带给你全方位的沉浸式体验
        </div>
        <div class="game-star-rate">
          <Rate show-text allow-half :value="3.0">
            <span style="color: #f5a623">3.0</span>
          </Rate>
        </div>
        <div class="game-label"></div>
      </div>
      <div class="item-border"></div>
      <Button class="game-detail-btn" style="color: #ff6666">更多详情</Button>
    </div>
    <div class="game-item">
      <div class="game-picture-wrap">
        <img
          class="game-picture"
          src="../resource/image/game/game6.jpg"
          alt=""
        />
      </div>
      <div class="game-info">
        <div class="game-name">游戏一</div>
        <div class="game-dsc">新的版本即将上线，敬请期待！</div>
        <div class="game-star-rate"></div>
        <div class="game-label"></div>
      </div>
      <div class="item-border"></div>
      <Button class="game-detail-btn" style="color: #ff6666">更多详情</Button>
    </div>
    <div class="game-item">
      <div class="game-picture-wrap">
        <img
          class="game-picture"
          src="../resource/image/game/game7.jpg"
          alt=""
        />
      </div>
      <div class="game-info">
        <div class="game-name">围攻</div>
        <div class="game-dsc">多人合作，选边站队，围攻城墙</div>
        <div class="game-star-rate">
          <Rate show-text allow-half :value="5.0">
            <span style="color: #f5a623">5.0</span>
          </Rate>
        </div>
        <div class="game-label"></div>
      </div>
      <div class="item-border"></div>
      <Button class="game-detail-btn" style="color: #ff6666">更多详情</Button>
    </div>
    <div class="game-item">
      <div class="game-picture-wrap">
        <img
          class="game-picture"
          src="../resource/image/game/game8.jpg"
          alt=""
        />
      </div>
      <div class="game-info">
        <div class="game-name">剑灵</div>
        <div class="game-dsc">满满的仙侠游戏风，快来用手中之剑，漫游天涯</div>
        <div class="game-star-rate">
          <Rate show-text allow-half :value="4.8">
            <span style="color: #f5a623">4.8</span>
          </Rate>
        </div>
        <div class="game-label"></div>
      </div>
      <div class="item-border"></div>
      <Button class="game-detail-btn" style="color: #ff6666">更多详情</Button>
    </div>
    <div class="game-item">
      <div class="game-picture-wrap">
        <img
          class="game-picture"
          src="../resource/image/game/game9.jpg"
          alt=""
        />
      </div>
      <div class="game-info">
        <div class="game-name">绝地求生</div>
        <div class="game-dsc">
          加油特种兵，在残酷陌生的环境下做最后的生存者吧，更多惊喜在前方等待着你！
        </div>
        <div class="game-star-rate"></div>
        <div class="game-label"></div>
      </div>
      <div class="item-border"></div>
      <Button class="game-detail-btn" style="color: #ff6666">更多详情</Button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.game-item {
  display: flex;
  width: 600px;
  margin-bottom: 30px;
}
#game-list {
  width: 600px;
}
.game-picture {
  height: 80px;
}
.game-picture-wrap {
  height: 80px;
  width: 130px;
  overflow: hidden;
  border-radius: 10px;
}
.game-info {
  width: 250px;
  margin-left: 46px;
}
.game-name {
  color: #fb8c00;
  font-weight: bold;
  font-size: 15px;
}
.game-dsc {
  font-size: 8px;
  color: #999999;
}
.item-border {
  margin-left: 50px;
  height: 80px;
  border-right: 1px solid #ff6666;
}
.game-detail-btn {
  margin-top: 48px;
  margin-left: 8px;
}
</style>
