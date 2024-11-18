import instance from '@/http/index';

// 注册
export const register = (data: { account: string; password: string }) => {
  return instance({
    url: '/register',
    method: 'POST',
    data,
  });
};

// 登录
export const login = (data: { username: string; password: string }) => {
  return instance({
    url: '/user/login',
    method: 'POST',
    data,
  });
};

// 获取用户信息
export const getUserInfo = () => {
  return instance({
    url: '/user/info',
    method: 'GET',
  });
};
