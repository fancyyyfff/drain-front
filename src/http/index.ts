import axios from 'axios';
import router from '@/router'; // Vue Router
import { getCookie, clearCookie } from "@/http/cookie";

// 创建 axios 实例
const instance = axios.create({
  baseURL: 'http://localhost:8080', // 后端接口地址
  timeout: 6000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数
    return response.data; // 直接返回 data，简化调用时的代码
  },
  (error) => {

    if (error.response) {
      const { status } = error.response;

      if (status === 1006) {
        // 提示重新登录
        alert('登录已过期，请重新登录');

        clearCookie('tokenName');
        const tokenName = getCookie('tokenName');
        if (tokenName) clearCookie(tokenName);

        // 跳转到登录页
        router.push('/login');
      }

      if (status === 401) {
        alert('未授权，请登录后重试');
        router.push('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
