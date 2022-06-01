import Vue from "vue";
import axios from "axios";
import store from "../js/store";
import router from "../js/router";
import { buildAvatarSrc } from "./util";
let tmpVue = new Vue();

//检测用户当前登陆状态
export async function checkLoginStatus() {
  return new Promise((resolve, reject) => {
    axios.post("login", { uid: store.state.uid, operType: 2 }).then(
      (rsp) => {
        resolve(rsp.data);
        /**
         * data.error值含义
         * 2，没有cookie或者cookie过期
         * 3，uid和cookie都存在但是不匹配
         * 4，uid和cookie都存在且匹配
         * 5，cookie存在但uid为空
         */
      },
      (error) => tmpVue.$Message.error("网络错误，请稍后重试")
    );
  });
}

//封装后的axios.post请求，对后端返回值进行了统一校验
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
      console.log("出错的请求：", url, payload);
    }
  );
  //注意上面不要写成axios.post.then.catch的形式，否则如果then中调用callback报错了catch也会执行
}

//注意该方法用于需要先校验用户权限才允许发送网路请求的情况，否则请直接使用postRequest函数
export async function requestWithAuth(url, payload = {}, callback) {
  let loginStatusRsp = await checkLoginStatus(); //发起请求之前先校验登录状态
  if (loginStatusRsp.error === 2) {
    tmpVue.$Message.warning("请先登录");
    router.push("/login");
    return;
  } else if (loginStatusRsp.error === 3) {
    location.reload();
    return;
  } else if (loginStatusRsp.error === 5) {
    tmpVue.$store.commit("login", loginStatusRsp.uid);
    payload.uid = loginStatusRsp.uid;
  }
  postRequest(url, payload, callback);
}

export function getRequest() {
  console.log("this is getRequest() func");
}

export function setAvatarSrc(uid, vueObj) {
  if (uid === "") return;
  axios.post("getUserInfo", { uid, operType: 2 }).then((rsp) => {
    let data = rsp.data;
    vueObj.avatarUrl = buildAvatarSrc(uid, data.avatarUrl);
  });
}
