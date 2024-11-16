import { defineStore } from 'pinia';

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
