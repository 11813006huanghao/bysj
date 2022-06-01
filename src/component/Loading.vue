<template>
  <div id="loading">
    <Icon
      type="ios-loading"
      size="22"
      class="demo-spin-icon-load"
      style="height: 22px"
    ></Icon>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#loading {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6);
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
  color: #ff6666;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
