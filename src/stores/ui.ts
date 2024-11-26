import { defineStore } from 'pinia';
import { useTaskStore } from "@/stores/task";
import SideBar from '@/views/menu/components/SideBar.vue';

const taskStore = useTaskStore()
// 主要用于控制全局共享组件的状态

// sideBar的控制
export const useSideBarStore = defineStore('sideBar', {
  state: () => ({
    sidebarOpen: false,
    taskId:-1,
    render:false, //用来控制是否渲染Sidebar
  }),
  actions: {
    toggleSidebar(taskId) {
      // 处理deadline
      // 开始未打开，想要打开，所以渲染数据
      if(this.sidebarOpen===false) {
        // 开始 sidebarOpen 默认值为false，即使sidebarOpen还没有渲染，依然有这个值，
        // 如果想要渲染，开始是false，改为true之前，先让render渲染sideBar
        this.render=true
        this.taskId = taskId
        taskStore.updateSideBarDeadline(taskId)
      }else {
        taskStore.clearSideBarDeadline()
      }
      this.sidebarOpen = !this.sidebarOpen;
    },
  },
});
