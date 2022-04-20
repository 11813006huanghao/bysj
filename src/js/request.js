import Vue from "vue";
let axios = Vue.prototype.$axios;
let Message = Vue.prototype.$Message;
export function postRequest(url, payload = {}, callback) {
  axios
    .post(url, payload)
    .then((rsp) => {
      if (rsp.data.error === 11) Message.error("服务器错误，请稍后再试");
      else callback && callback(rsp.data);
    })
    .catch((error) => {
      Message.error("网络请求出错，请稍后再试");
      console.error(error);
    });
}

export function getRequest() {
  console.log("this is getRequest() func");
}
