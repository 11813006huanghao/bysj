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

      <div class="reply-button-wrap">
        <Button class="reply-btn">回复</Button>
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
      <div class="reply-button-wrap">
        <Button class="reply-btn">回复</Button>
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
      <div class="reply-button-wrap">
        <Button class="reply-btn">回复</Button>
      </div>
    </div>
    <div class="message-item">
      <div class="message-content">
        今天是你的生日吗？祝你生日快乐鸭
        红红火火恍恍惚惚或或或或或或或或或或或或或或 红红火火恍恍惚惚或或或或
        红红火火恍恍惚惚或或或或或或或或或或或或或或或或或或或或或红红火火恍恍惚惚或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或
      </div>
      <div class="message-sender">
        来自
        <img class="sender-avatar" src="../resource/image/avatar.png" alt="" />
        <div class="sender-name">
          <div>红红火火恍恍惚惚或或</div>
          <div>2021-10-21</div>
        </div>
      </div>
      <div class="reply-button-wrap">
        <Button class="reply-btn">回复</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.message-item {
  width: 600px;
  word-wrap: break-word;
  border-bottom: 1px solid #fb8c00;
}
.message-content {
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  color: #666666;
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
  padding-top: 20px;
}
.sender-name {
  font-size: 10px;
  color: #fb8c00;
  cursor: pointer;
}
.reply-button-wrap {
  padding-left: 480px;
  padding-top: 15px;
  margin-bottom: 10px;
}
#message-list {
  width: 600px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
.reply-btn {
  box-shadow: 0 0 4px #ff6666;
  width: 100px;
  height: 30px;
}
</style>
