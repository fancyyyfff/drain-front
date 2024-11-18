import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

interface UserState {
  userId: string | null;
  role: string | null; // 用户角色
  token: string | null; // 用于存储用户的 Token
  basketIds: string[]; // 当前用户的 basketIds
  tasks: Record<string, string[]>; // 每个 basketId 对应 taskId 列表
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userId: null,
    role: null,
    token: null,
    basketIds: [],
    tasks: {},
  }),
  actions: {
    login(userId: string, role: string, basketIds: string[], token: string) {
      this.userId = userId;
      this.role = role;
      this.basketIds = basketIds;
      this.token = token;

      // 将 Token 存储到 Cookie 中
      Cookies.set('token', token, { expires: 7 });
    },
    setTasks(basketId: string, taskIds: string[]) {
      this.tasks[basketId] = taskIds;
    },
    logout() {
      this.userId = null;
      this.role = null;
      this.token = null;
      this.basketIds = [];
      this.tasks = {};

      // 清除 Cookie 中的 Token
      Cookies.remove('token');
    },
  },
});
