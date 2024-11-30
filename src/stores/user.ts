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
  state: ()=> ({
    user:<UserState><unknown>{
      role: 0,
      username: null,
      nickname: null,
    },

  }),
  actions: {
    setUser(user){
      this.user= user
    },
    getRole(){
      return this.user.role
    },
    setRole(role){
      this.user.role = role
    },
    resetUser(){
      this.user=<UserState>{}
    },

  },
});
