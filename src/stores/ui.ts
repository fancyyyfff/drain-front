import { defineStore } from 'pinia';
// 主要用于控制全局共享组件的状态

// sideBar的控制
export const useSideBarStore = defineStore('sideBar', {
  state: () => ({
    sidebarOpen: false,
  }),
  actions: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
      console.log('在pinia当中点击了ddl组件后的sideBar的状态：',this.sidebarOpen)
    },
  },
});
