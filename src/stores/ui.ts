import { defineStore } from 'pinia';
import { useTaskStore } from "@/stores/task";
import SideBar from '@/views/menu/components/SideBar.vue';


const taskStore = useTaskStore()
// 主要用于控制全局共享组件的状态

// sideBar的控制
export const useSideBarStore = defineStore('sideBar', {
  state: () => ({
    sidebarOpen: false,
    render:false, //用来控制是否渲染Sidebar

  }),
  actions: {
    toggleSidebar(task) {
      // 控制渲染
      this.render=!this.render

      // 打开前先放置对象
      if(!this.sidebarOpen) {
        taskStore.setTask(task)
        // taskStore.updateSideBarDeadline(task.taskId)
      }else {
        taskStore.resetTask()
        // taskStore.clearSideBarDeadline()
      }
      // // 最后再打开
      this.sidebarOpen = !this.sidebarOpen;
    },
  },
});
