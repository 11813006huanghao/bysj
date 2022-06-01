<template>
  <div id="dynamic-list">
    <div class="dynamic-item" v-for="(item, i) in dynamicList" :key="i">
      <div class="dynamic-content">{{ item.content }}</div>
      <div class="dynamic-footer">
        {{ "发布于 " + item.postTime }}
        <Button
          v-if="isSelf"
          @click="confirmDelete(item.id)"
          style="height: 30px; margin-left: 10px"
          >删除</Button
        >
      </div>
    </div>
    <Modal
      title="删除"
      v-model="showDeleteConfirmModal"
      @on-ok="handleDelete"
      :styles="{ top: '200px' }"
    >
      确认删除这条动态吗？
    </Modal>
  </div>
</template>

<script>
import { postRequest, requestWithAuth } from "../js/request";
import { getStandardTimeStr } from "../js/util";
export default {
  props: ["isSelf"],
  data() {
    return {
      dynamicList: [],
      currentPage: 1,
      showDeleteConfirmModal: false,
      deletedDynamicId: null,
    };
  },
  created() {
    this.uid = this.$route.params.uid;
    setTimeout(this.getDynamic, 600);
  },
  methods: {
    getDynamic() {
      postRequest(
        "getDynamic",
        { uid: this.uid, operType: 1, page: this.currentPage },
        (data) => {
          if (data.error === 1) {
            this.dynamicList = data.dynamicList;
            for (let item of this.dynamicList) {
              item.postTime = getStandardTimeStr(
                new Date(Number(item.timeStamp)),
                true
              );
            }
          } else this.$Message.error("获取动态失败");
        }
      );
    },
    confirmDelete(id) {
      this.showDeleteConfirmModal = true;
      this.deletedDynamicId = id;
    },
    handleDelete() {
      requestWithAuth(
        "getDynamic",
        { operType: 3, dynamicId: this.deletedDynamicId },
        (data) => {
          if (data.error === 3) {
            this.$Message.success("删除成功");
            this.getDynamic();
          } else this.$Message.error("删除失败");
        }
      );
    },
  },
};
</script>

<style scoped>
#dynamic-list {
  width: 600px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
}
.dynamic-item {
  width: 600px;
  word-wrap: break-word;
  border-bottom: 1px solid #fb8c00;
}
.dynamic-content {
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  color: #666666;
}
.dynamic-footer {
  font-size: 10px;
  margin-left: 360px;
  color: #fb8c00;
}
</style>
