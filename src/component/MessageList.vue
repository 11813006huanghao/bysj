<template>
  <div id="message-list">
    <div v-for="(item, i) in messageList" :key="i" class="message-item">
      <div class="message-content">{{ item.content }}</div>
      <div class="message-sender">
        来自
        <img class="sender-avatar" :src="item.sender.avatarUrl" alt="" />
        <div class="sender-name">
          <div>{{ item.sender.userName }}</div>
          <div>{{ item.sender.sendTime }}</div>
        </div>
      </div>
      <div class="reply-button-wrap">
        <Button class="reply-btn" @click="handleClickReply(item)">回复</Button>
      </div>
    </div>
    <Modal
      v-model="showReplyMessageModal"
      title="回复留言"
      @on-ok="handleReplyMessage"
    >
      <Input
        type="textarea"
        v-model="replyMessage"
        placeholder="留点什么..."
        :rows="4"
        show-word-limit
        maxlength="100"
      />
    </Modal>
  </div>
</template>

<script>
import { requestWithAuth } from "../js/request";
import { buildAvatarSrc, getStandardTimeStr } from "../js/util";
export default {
  props: ["isSelf"],
  data() {
    return {
      messageList: [],
      currentPage: 1,
      messageTotal: 0,
      showReplyMessageModal: false, //展示回复留言对话框
      replyMessage: "", //回复的内容
      replyToUid: "", //被回复的人的id
    };
  },
  created() {
    this.isSelf && setTimeout(this.getMessageList, 500);
  },
  methods: {
    getMessageList() {
      requestWithAuth(
        "getMessage",
        {
          operType: 1,
          page: this.currentPage,
          receiverUid: this.$store.state.uid,
        },
        (data) => {
          if (data.error === 1) {
            this.messageList = data.messageList;
            this.messageTotal = data.total;
            for (let item of this.messageList) {
              console.log(item);
              item.sender.sendTime = getStandardTimeStr(
                new Date(Number(item.sender.timeStamp)),
                true
              );
              item.sender.avatarUrl = buildAvatarSrc(
                item.sender.uid,
                item.sender.avatarUrl
              );
            }
          } else this.$Message.error("获取留言列表失败");
        }
      );
    },
    handleReplyMessage() {
      requestWithAuth(
        "getMessage",
        {
          operType: 2,
          senderUid: this.$store.state.uid,
          receiverUid: this.replyToUid,
          content: this.replyMessage,
          timeStamp: String(new Date().getTime()),
        },
        (data) => {
          if (data.error === 2) this.$Message.success("回复成功");
          else this.$Message.error("回复失败");
        }
      );
    },
    handleClickReply(message) {
      this.showReplyMessageModal = true;
      this.replyToUid = message.sender.uid;
    },
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
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
}
.reply-btn {
  box-shadow: 0 0 4px #ff6666;
  width: 100px;
  height: 30px;
}
</style>
