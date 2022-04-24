import Vue from "vue";
import axios from "axios";
import globalConfig from "./config";
let tmpVue = new Vue();
export function postRequest(url, payload = {}, callback) {
  axios.post(url, payload).then(
    (rsp) => {
      if (rsp.data.error === 11)
        tmpVue.$Message.error("服务器错误，请稍后再试");
      else callback && callback(rsp.data);
    },
    (error) => {
      tmpVue.$Message.error("网络请求出错，请稍后再试");
      console.error(error);
    }
  );
  //注意上面不要写成axios.post.then.catch的形式，否则如果then中调用callback报错了catch也会执行
}

export function getRequest() {
  console.log("this is getRequest() func");
}

export function getAvatarUrl(vueObj) {
  postRequest(
    "getUserInfo",
    { uid: vueObj.$store.state.uid, operType: 2 },
    (data) => {
      vueObj.avatarUrl = globalConfig.resourceUrlSuffix + "/" + data.avatarUrl;
    }
  );
}
