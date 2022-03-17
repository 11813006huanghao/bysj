<template>
  <div id="message-list">
    <div class="message-item">
      <div class="message-content">今天是你的生日吗？祝你生日快乐鸭</div>
      <div class="message-sender">
        来自
        <img class="sender-avatar" src="../resource/image/avatar.png" alt="" />
        <div class="sender-name">
          <div>红红火火恍恍惚惚或或</div>
          <div>2021-10-21</div>
        </div>
      </div>
      <div class="item-border"></div>
      <div class="reply-button-wrap">
        <Button>回复</Button>
      </div>
    </div>
    <div class="message-item">
      <div class="message-content">今天是你的生日吗？祝你生日快乐鸭</div>
      <div class="message-sender">
        来自
        <img class="sender-avatar" src="../resource/image/avatar.png" alt="" />
        <div class="sender-name">
          <div>红红火火恍恍惚惚或或</div>
          <div>2021-10-21</div>
        </div>
      </div>
      <div class="item-border"></div>
      <div class="reply-button-wrap">
        <Button>回复</Button>
      </div>
    </div>
    <div class="message-item">
      <div class="message-content">今天是你的生日吗？祝你生日快乐鸭</div>
      <div class="message-sender">
        来自
        <img class="sender-avatar" src="../resource/image/avatar.png" alt="" />
        <div class="sender-name">
          <div>红红火火恍恍惚惚或或</div>
          <div>2021-10-21</div>
        </div>
      </div>
      <div class="item-border"></div>
      <div class="reply-button-wrap">
        <Button>回复</Button>
      </div>
    </div>
    <Page :total="100" show-elevator />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.message-item {
  width: 600px;
}
.item-border {
  margin-top: 2px;
  width: 600px;
  border-bottom: 1px solid #fb8c00;
}
.sender-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 20px;
  margin-right: 10px;
  cursor: pointer;
}
.message-sender {
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 390px;
  padding-top: 10px;
}
.sender-name {
  font-size: 10px;
  color: #fb8c00;
  cursor: pointer;
}
.reply-button-wrap {
  padding-left: 540px;
  padding-top: 5px;
  margin-bottom: 40px;
}
#message-list {
  height: 900px;
  width: 600px;
  background-color: aqua;
}
</style>
