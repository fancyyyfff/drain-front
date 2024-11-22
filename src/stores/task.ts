import { defineStore } from 'pinia';
import {  } from "@/api/task";
// 主要用于控制全局共享组件的状态
// 此处只缓存一个task
// sideBar的控制
export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    task:{
      taskId:null,
      taskName:'',
      star:0,
      isFinish:0,
      basketId:null,//可以找到对应的basket
      remark:'',//备注
      deadline:'',
      createTime:'',
      isDrain:1,//是否有被加入到头脑风暴
    },
    // 用于放置新建任务时的临时数据
    deadline:''
  }),
  actions: {
    // 以下可以对taskId进行crud
    // - 仅限前端当前的task:
    getTask() {
      return this.task;
    },
    // - 重置任务：
    resetTask() {
      this.task = {
        taskId: null,
        taskName: '',
        star: 0,
        isFinish: 0,
        basketId: null,
        remark: '',
        deadline: '',
        createTime: '',
        isDrain: 1,
      };
    },

    // - 标记完成
    markTaskAsFinished() {
      this.task.isFinish = 1;
    },
    // 设置备注
    setRemark(remark) {
      this.task.remark = remark;
    },
    // 与后端同步,更新当前的task
    async loadTask(taskId) {
      try {
        const res = await getTask(this.taskId);
        const taskData = await res.json();
        // -- 打印返回对象
        this.task = taskData;
      } catch (error) {
        console.error('Failed to load task:', error);
      }
    },
    // 设置ddl
    setDeadline(deadline) {
      this.task.deadline = deadline;
    },
    // 是否被加入到头脑风暴
    setBrainstormStatus(isDrain) {
      this.task.isDrain = isDrain ? 1 : 0 ;
    },
    // -1表示要删除这个task，但是只是一种标识，但未删除
    deleteTask() {
      this.task.isFinish = -1; // Soft delete
    },
  },
});
