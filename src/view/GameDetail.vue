<template>
  <div id="game-detail">
    <div id="game-intro">
      <div id="video-wrap">
        <video id="video" controls="controls" autoplay="autoplay" muted>
          <source src="../resource/video/video2.mp4" type="video/mp4" />
        </video>
      </div>
      <div id="game-info-wrap">
        <div id="game-name">王者荣耀</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#game-detail {
  margin-top: 100px;
  width: 1100px;
  display: flex;
  flex-direction: column;
}
#game-intro {
  display: flex;
}
#video {
  width: 800px;
}
#game-info-wrap {
  width: 300px;
}
#game-name {
  font-family: "jixiehei";
  font-size: 30px;
}
</style>
