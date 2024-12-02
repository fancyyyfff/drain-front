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

// 获取到的Task类型
export interface Task {
  taskId: number;
  taskName: string | null;
  star: number | null;
  isFinish: number | null;
  basketId: number|null;
  remark: string | null;
  deadline: string | null;
  createTime: string | null;
  isDrain: number | null;
}

// ====篮子
export interface Basket {
  type:number;
  basketId: number|null;
  basketName: string;
}


// == 管理员页面
export interface ManageUser {
  username: string|null;
  nickname: string|null;
  createTime: string|null;
  email:string|null;
  role:number;
}

export interface Subscribe {
  subscribeId:number;
  userId: number|null;
  createTime: string|null;
  deadline:string|null;
  isFinish:boolean|null;
  count:number|null;
}
