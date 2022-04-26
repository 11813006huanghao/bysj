import Vue from "vue";
import axios from "axios";
import globalConfig from "./config";
import store from "../js/store";
import router from "../js/router";
let tmpVue = new Vue();

//检测用户当前登陆状态
async function checkLoginStatus() {
  return new Promise((resolve, reject) => {
    axios.post("login", { uid: store.state.uid, operType: 2 }).then((rsp) => {
      if (rsp.data.error === 2) {
        //cookie过期，强制重新登录
        router.push("/login");
        resolve(false);
      } else if (rsp.data.error === 3) {
        //uid过期，和新cookie不匹配
        store.commit("login", rsp.data.uid);
        location.reload();
        resolve(false);
      } else if (rsp.data.error === 5) {
        //用户在cookie有效期内重新打开网页
        store.commit("login", rsp.data.uid);
        resolve(true);
      }
      resolve(true);
    });
  });
}

export async function postRequest(url, payload = {}, callback) {
  let loginStatus = await checkLoginStatus();
  if (!loginStatus) return; //所有非登录页请求在执行前都要校验登录状态
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
