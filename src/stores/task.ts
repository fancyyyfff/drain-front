import { defineStore } from 'pinia';
import { getTask,getAllTaskByBasketId,addTask, updateTaskDeadline,deleteTask, updateTaskRemark } from "@/api/task";
import type { Task } from "@/types/type";
import { useBasketStore } from "@/stores/basket";
const basketStore = useBasketStore()
// 主要用于控制全局共享组件的状态
// 方便与sidebar共享信息

export const useTaskStore = defineStore('taskStore',{
  state: () => ({
    task:<Task>{
      taskId:-1,
      taskName:'',
      star:0,
      isFinish:1,
      basketId:null,//可以找到对应的basket
      remark:'',//备注
      deadline:'',
      createTime:'',
      isDrain:1,//是否有被加入到头脑风暴
    },
    // 用于放置新建任务时的临时数据
    deadline:'',
    // 放置当前进入工作篮的一项任务：
    drainTask:<Task>{},
  }),
  actions: {
    // 清空时间选择器的 deadline
    clearSideBarDeadline(){
      this.deadline=''
    },
     // - 重置任务：
     resetTask() {
      this.task = {
        taskId: -1,
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

    // 设置选中的任务
    setSeletedTask(task: Task) {
      this.task = task;
    },

    // - 切换完成状态
    toggleTaskFinish() {
      if(this.task.isFinish===1){
        this.task.isFinish=0
      }else {
        this.task.isFinish=1
      }
    },
    // - 切换标星状态
    toggleTaskStar() {
      if(this.task.star===1){
        this.task.star=0
      }else {
        this.task.star=1
      }
    },
    // 设置备注
    setRemark(remark) {
      this.task.remark = remark;
    },
    // 传入整个task
    setTask(task:Task) {
      this.task= task
    },
    // 与后端同步,更新当前的task
    // 是否被加入到头脑风暴
    setBrainstormStatus(isDrain) {
      this.task.isDrain = isDrain ? 1 : 0 ;
    },
     // 更新暂存时间选择器里的 deadline ，渲染SideBar
     updateSideBarDeadline(taskId: number) {
      if (taskId) {
        // 获取到的共有的任务
        this.deadline = this.task.deadline;
      } else {
        console.warn(`任务 ID ${taskId} 不存在`);
      }
    },
    getTask() {
      return this.task;
    },
    // 处理头脑风暴的工作：
    // 头脑风暴的Task:
    setDrainTask(drainTask:Task) {
      this.drainTask = drainTask
    },
    resetDrainTask(){
      this.drainTask=<Task>{}
    }
    ,
    async deleteDrainTask(task){
      try {
        const res = await deleteTask(task)
        if(res.status%2 ===1) {
          this.resetDrainTask()
          return true
        }
      } catch (error) {
        console.error('通过basketId获取所有任务失败', error);
      }
    },
  },
});
