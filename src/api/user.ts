import instance from '@/http/index';

// 4种角色
//订阅：多了AI
// 管理员：单一，订单、
// 未登录：仅注册

// 注册
export const register = (data: { username: string; email:string; password: string }) => {
  return instance({
    url: '/user/register',
    method: 'POST',
    data,
  });
};

// 登录
// export const login = (data: { username: string; password: string }) => {
//   return instance({
//     url: '/user/login',
//     method: 'POST',
//     data,
//   });
// };

export const login = (user) => {
  return instance({
    url: '/user/login',
    method: 'POST',
    data: user
  });
};

// 获取用户信息
export const getUserInfo = () => {
  return instance({
    url: '/user/info',
    method: 'GET',
  });
};

export const logout = () => {
  return instance({
    url: '/user/logout',
    method: 'POST',
  });
};
