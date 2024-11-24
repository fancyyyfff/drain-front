import { defineStore } from 'pinia';
import { useTaskStore } from "@/stores/task";

const taskStore = useTaskStore()
// 主要用于控制全局共享组件的状态

// sideBar的控制
export const useSideBarStore = defineStore('sideBar', {
  state: () => ({
    sidebarOpen: false,
  }),
  actions: {
    toggleSidebar(task) {
      // 首先清空，放置数据混合
      taskStore.resetTask()
      // 放置数据到pinia当中
      taskStore.setTask(task)
      this.sidebarOpen = !this.sidebarOpen;
      console.log('在pinia当中点击了ddl组件后的sideBar的状态：',this.sidebarOpen)
    },
  },
});
