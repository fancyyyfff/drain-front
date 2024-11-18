import axios from 'axios';

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
    // 从 localStorage 中获取 token
    const token = localStorage.getItem('token');

    if (token) {
      // 如果存在 token，将其附加到请求头
      config.headers['Authorization'] = `Bearer ${token}`;
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
    // 超出 2xx 范围的状态码都会触发该函数
    if (error.response?.status === 401) {
      // 如果后端返回 401 未授权，清除 token 并跳转到登录页
      localStorage.removeItem('token');
      window.location.href = '/login'; // 根据你的项目路由修改
    }
    return Promise.reject(error);
  }
);

export default instance;
