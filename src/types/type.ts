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

export interface Task {
  taskId: number;
  taskName: string;       // taskName 为字符串
  star: number;           // star 为数字
  isFinish: 0 | 1 ;        // isFinish 为字面量类型 0 或 1
  basketId: number | null; // basketId 可以是数字或 null
  remark: string;         // remark 为字符串
  deadline: string;       // deadline 为字符串
  createTime: string;     // createTime 为字符串
  isDrain: 0 | 1 ;         // isDrain 为字面量类型 0 或 1
}

// 可访问项目首页
export interface Global {
  status:1006,//未登录


}
// ====篮子
export interface Basket {

}


