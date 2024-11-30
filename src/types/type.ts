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
  taskId: number|null;
  taskName: string|null;       // taskName 为字符串
  star: number|null;           // star 为数字
  isFinish: number|null;        // isFinish 为字面量类型 0 或 1
  basketId: number | null; // basketId 可以是数字或 null
  remark: string|null;         // remark 为字符串
  deadline: string|null;       // deadline 为字符串
  createTime: string|null;     // createTime 为字符串
  isDrain: number|null;         // isDrain 为字面量类型 0 或 1
}

// ====篮子
export interface Basket {
  type:number;
  basketId: number|null;
  basketName: string|null;
}

