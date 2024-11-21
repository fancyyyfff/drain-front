// 为了简化开发，暂时不适用过多的类型校验
// ====用户类型
export interface User {
  username?:string;
  password?:string;
  email?:string;
  confirmPassword?:string;
}
// token设置
interface LoginResponse {
  tokenName: string;
  tokenValue: string;
  tokenTimeout: number; // 毫秒
}

// 用户注册：
export interface RegisterUser {
  username?:string;
  password?:string;
  email?:string;
}

// 管理员登录：
export interface Manage {
  username?:string;
  password?:string;
  confirmPassword?:string;
}

// 可访问项目首页
export interface Global {
  status:1006,//未登录


}
// ====篮子
export interface Basket {

}


