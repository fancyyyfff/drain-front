import { defineStore } from 'pinia';
import { getTask,getAllTaskByBasketId,addTask } from "@/api/task";
import type { Task } from "@/types/type";
import { useRoute } from "vue-router";


// 主要用于控制全局共享组件的状态
// 方便与sidebar共享信息

const route= useRoute()


export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    task:<Task>{
      taskId:-1,
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
    deadline:'',
    // 放置当前页面获取到的所有任务
    tasks:<Task[]>[]
  }),
  actions: {
    // 以下可以对taskId进行crud
    // - 仅限前端当前的task:
    // 设置选中的任务
    setSeletedTask(task: Task) {
      this.task = task;
    },
    // 更新任务信息
    updateTask(updatedTask: Task) {
      const index = this.tasks.findIndex((t) => t.taskId === updatedTask.taskId);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    },
    getTask() {
      return this.task;
    },
    // 从后端加载数据
    async loadTask(taskId) {
      try {
        const res = await getTask(this.taskId);
        if(res.status%2===1) {
          // -- 打印返回对象
          this.task = res.data;
        }

      } catch (error) {
        console.error('Failed to load task:', error);
      }
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

    // - 标记完成
    markTaskAsFinished() {
      this.task.isFinish = 1;
    },
    // 设置备注
    setRemark(remark) {
      this.task.remark = remark;
    },
    // 传入整个task
    setTask(task) {
      this.task= task
    },
    // 与后端同步,更新当前的task

    // 设置ddl
    setDeadline(deadline) {
      this.task.deadline = deadline;
    },
    // 是否被加入到头脑风暴
    setBrainstormStatus(isDrain) {
      this.task.isDrain = isDrain ? 1 : 0 ;
    },
    // // -1表示要删除这个task，但是只是一种标识，但未删除
    // deleteTask() {
    //   this.task.isFinish = -1; // Soft delete
    // },
    // 删除任务
    deleteTask(taskId: number) {
      const indexToRemove = this.tasks.findIndex((task) => task.taskId === taskId);
      if (indexToRemove !== -1) {
        this.tasks.splice(indexToRemove, 1);
      } else {
        console.warn(`任务 ID ${taskId} 不存在于任务列表中`);
      }
    },
    // 添加任务：
    addTask(task) {
      this.tasks.unshift(task);

    },
    
    // ——加载从后端获取到的所有tasks：
    async loadAllTasks(basketId) {
      try {
        const res = await getAllTaskByBasketId(basketId)
        // if(res.status % 2 ==1) {
        //   Object.assign(tasks, res.data); // 正确更新 tasks
        // }
        if (res.status % 2 === 1 && Array.isArray(res.data)) {
           // 清空当前任务数据
            this.tasks.splice(0, this.tasks.length);
            // 把tasks存在store当中
            this.tasks.push(...res.data)

            // tasks.value.push(...res.data); // 将新任务追加到 tasks 中
          }
      } catch (error) {
        console.error('通过basketId获取所有任务失败', error);
      }
    },

    // —— 对tasks的操作，前端模拟数据：
    frontInitData() {
      // 后端没有获取到数据时，呈现的默认任务数据
      // 初期模拟不同页面渲染数据
      if(route.params.routeKey === 'importance') {
        this.tasks = [
          {
          taskId:6,
          taskName:'完成任务管理模块',
          star:1,
          isFinish:0,
          basketId:6,//可以找到对应的basket
          remark:'开始放好伪数据，记得发送请求',//备注
          deadline:'',
          createTime:'',
          isDrain:1,
        },
        {
          taskId:7,
          taskName:'完成头脑风暴模块',
          star:1,
          isFinish:0,
          basketId:7,//可以找到对应的basket
          remark:'开始放好伪数据，记得发送请求',//备注
          deadline:'',
          createTime:'',
          isDrain:1,
        },
      ]
      } else if (route.params.routeKey === 'ddl') {
        this.tasks = [
          {
          taskId:9,
          taskName:'30号周六项目提交',
          star:0,
          isFinish:0,
          basketId:9,//可以找到对应的basket
          remark:'开始放好伪数据，记得发送请求',//备注
          deadline:'',
          createTime:'',
          isDrain:1,
        },
      ]
      }else if (route.params.routeKey === 'goals') {
        this.tasks = [
          {
          taskId:10,
          taskName:'完成drain项目',
          star:0,
          isFinish:0,
          basketId:10,//可以找到对应的basket
          remark:'开始放好伪数据，记得发送请求',//备注
          deadline:'',
          createTime:'',
          isDrain:1,
        },
      ]
      } else if (route.params.routeKey === 'works') {
        this.tasks = [
          {
          taskId:11,
          taskName:'录制视频',
          star:0,
          isFinish:0,
          basketId:11,//可以找到对应的basket
          remark:'项目测试通过后',//备注
          deadline:'',
          createTime:'',
          isDrain:1,
        },
      ]
      } else if (route.params.routeKey === 'thoughts') {
        this.tasks = [
          {
          taskId:12,
          taskName:'完成后想好好休息，啥也不干，发发呆',
          star:0,
          isFinish:0,
          basketId:12,//可以找到对应的basket
          remark:'项目测试通过后',//备注
          deadline:'',
          createTime:'',
          isDrain:1,
        },
      ]
      } else if(route.params.routeKey==='tags') {
        this.tasks=[]
      }else if (route.params.routeKey === 'actions') {
        this.tasks = [
          {
          taskId:13,
          taskName:'删除任务图标',
          star:0,
          isFinish:0,
          basketId:13,//可以找到对应的basket
          remark:'开始放好伪数据，记得发送请求',//备注
          deadline:'',
          createTime:'',
          isDrain:1,
        },
      ]
      }else {
        this.tasks =[
        {
          taskId:1,
          taskName:'完成创建Task',
          star:0,
          isFinish:0,
          basketId:1,//可以找到对应的basket
          remark:'开始放好伪数据，记得发送请求',//备注
          deadline:'',
          createTime:'',
          isDrain:1,//是否可以被加入到头脑风暴
        },
        {
          taskId:2,
          taskName:'实现删除任务',
          star:0,
          isFinish:0,
          basketId:2,//可以找到对应的basket
          remark:'开始放好伪数据，记得发送请求',//备注
          deadline:'',
          createTime:'',
          isDrain:1,
        },
        {
          taskId:3,
          taskName:'实现移动任务',
          star:0,
          isFinish:0,
          basketId:3,//可以找到对应的basket
          remark:'开始放好伪数据，记得发送请求',//备注
          deadline:'',
          createTime:'',
          isDrain:1,
        },
        {
          taskId:4,
          taskName:'实现移动任务',
          star:0,
          isFinish:0,
          basketId:4,//可以找到对应的basket
          remark:'开始放好伪数据，记得发送请求',//备注
          deadline:'',
          createTime:'',
          isDrain:1,
        },
        {
          taskId:5,
          taskName:'实现Task和sideBar数据联动',
          star:0,
          isFinish:0,
          basketId:5,//可以找到对应的basket
          remark:'开始放好伪数据，记得发送请求',//备注
          deadline:'',
          createTime:'',
          isDrain:1,
        },

      ]
      }
    },
  },
});
