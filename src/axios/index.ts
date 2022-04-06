import axios from 'axios';
import { ElMessage, ElNotification } from 'element-plus';
// 封装axios
const ajax = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin-Type': '*',
  },
  timeout: 1000 * 60,
  baseURL: 'http://127.0.0.1:8080/api/company',
  withCredentials: false,
});

ajax.interceptors.request.use(
  (config) => {
    if (localStorage.token) {
      config.headers = { Authorization: `bearer ${localStorage.token}` };
    }
    return config;
  },
  (e) => {
    console.log(e);
  },
);

ajax.interceptors.response.use(
  (response) => response,
  (e) => {
    showError(e);
  },
);

function showError(e: any): void {
  let elTitle: string;
  let elMessage = '';
  if (e.response !== undefined) {
    const { statusCode, error, message } = e.response.data;
    elTitle = `${'服务器错误' + ' : '}${error}`;
    if (statusCode >= 500) {
      elMessage = message;
      showElNotification(elMessage, elTitle);
    } else if (statusCode >= 400 && statusCode < 500) {
      elMessage = message;
      if (elMessage === 'Unauthorized') {
        elMessage = '登录已失效，请重新登录！';
      }
      showElMessage(elMessage);
    }
  } else {
    {
      elTitle = '本地网络错误';
      {
        elMessage = '请检查您的本地网络设置,或者联系网络管理员';
        showElNotification(elMessage, elTitle);
      }
    }
  }
}

// 网络或者服务器错误采用通知框
const showElNotification = (elMessage: string, elTitle: string) => {
  ElNotification({
    title: elTitle,
    message: elMessage,
    type: 'error',
  });
};

const showElMessage = (elMessage: string) => {
  ElMessage({
    type: 'error',
    message: elMessage,
  });
};

export default ajax;
