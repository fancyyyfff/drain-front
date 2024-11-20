import axios from 'axios';
import { useRouter } from 'vue-router'; // Vue Router
import { getCookie, clearCookie } from "@/http/cookie";

// 创建 axios 实例
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8080', // 后端接口地址
  timeout: 6000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    const tokenName = getCookie('tokenName');
    const tokenValue = tokenName ? getCookie(tokenName) : null;

    if (tokenName&&tokenValue) {
      // 如果存在 token，将其附加到请求头
      // config.headers['Authorization'] = `Bearer ${token}`;
      // 动态添加请求头
      config.headers[tokenName] = tokenValue;
    }

    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数
    return response.data; // 直接返回 data，简化调用时的代码
  },
  (error) => {
    const router = useRouter(); // 获取 Vue Router 实例

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
