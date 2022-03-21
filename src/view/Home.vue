<template>
  <div id="home-wrap">
    <div id="main-game">
      <div id="carousel-wrap">
        <Carousel style="width: 800px; height: 200px">
          <CarouselItem style="width: 800px; height: 360px; background: blue">
            <div>111111111111111111111</div>
          </CarouselItem>
          <CarouselItem>
            <div>2</div>
          </CarouselItem>
          <CarouselItem>
            <div>3</div>
          </CarouselItem>
          <CarouselItem>
            <div>4</div>
          </CarouselItem>
        </Carousel>
      </div>
      <div id="carousel-option">
        <CellGroup style="margin-left: 50px">
          <Cell title="马克波罗" style="width: 300px; height: 60px" />
          <Cell title="英雄联盟" selected style="width: 300px; height: 60px" />
          <Cell title="围攻" style="width: 300px; height: 60px" />
          <Cell title="绝地求生" style="width: 300px; height: 60px" />
          <Cell title="剑灵" style="width: 300px; height: 60px" />
          <Cell title="我的世界" style="width: 300px; height: 60px" />
        </CellGroup>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#main-game {
  width: 1100px;
  border: 1px solid black;
  display: flex;
}
.ivu-cell-title {
  font-size: 20px;
  font-weight: bold;
  line-height: 60px;
}
</style>
