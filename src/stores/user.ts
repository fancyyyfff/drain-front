import { defineStore } from 'pinia';
// import Cookies from 'js-cookie';

interface UserState {
  userId: number | null;
  userName: string | null;
  nickName: string | null;
  role: number; // 用户角色
  // basketIds?: number[]; // 当前用户的 basketIds
  // tasks: Record<string, string[]>; // 每个 basketId 对应 taskId 列表

}

export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    userId: null,
    role: 0,
    userName:null,
    nickName:null,
  }),
  actions: {
    getRole(){
      return this.role
    },
    setRole(role){
      this.role = role
    },
    // 登录时保存用户数据的方法
    login(userId: number, role: number,userName:string,nickName:string) {
      this.userId = userId;
      this.role = role;
      this.userName=userName;
      this.nickName=nickName;
    },
  },
});
