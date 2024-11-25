import { defineStore } from 'pinia';
import { getTask,getAllTaskByBasketId,addTask, updateTaskDeadline,deleteTask } from "@/api/task";
import type { Task } from "@/types/type";

// 主要用于控制全局共享组件的状态
// 方便与sidebar共享信息

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
  getters: {
    // 定义一个 Getter，传入 taskId 返回对应任务
    getTaskById: (state) => {
      return (taskId: number) => state.tasks.find((task) => task.taskId === taskId);
    },
  },
  actions: {
    // 以下可以对taskId进行crud
    // - 仅限前端当前的task:
    // 设置选中的任务
    setSeletedTask(task: Task) {
      this.task = task;
    },
    // 清空时间选择器的 deadline
    clearSideBarDeadline(){
      this.deadline=''

    },
    // 从任务中获取截至时间
     // 更新暂存时间选择器里的 deadline ，渲染SideBar
     updateSideBarDeadline(taskId: number) {
      if (taskId) {
        // 获取到的共有的任务
        this.deadline = this.task.deadline;
      } else {
        console.warn(`任务 ID ${taskId} 不存在`);
      }
    },
    // 更新任务信息
    updateTask(updatedTask: Task) {
      const index = this.tasks.findIndex((t) => t.taskId === updatedTask.taskId);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    },

    updateTaskFinish(updatedTask: Task) {
      const index = this.tasks.findIndex((t) => t.taskId === updatedTask.taskId);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    },
    // 切换选中的isFinish的值：
    toggleTaskFinish(taskId) {
      const index = this.tasks.findIndex((t) => t.taskId === taskId);
      if (index !== -1) {
        if(this.tasks[index].isFinish===1 && this.task.isFinish===1) {
          this.tasks[index].isFinish = 0;
          this.task.isFinish=0;
        }else if(this.tasks[index].isFinish===0 && this.task.isFinish===0){
          this.tasks[index].isFinish = 1;
          this.task.isFinish=1;
        }
        }
    },
    getTask() {
      return this.task;
    },
    // 从后端加载数据
    // async loadTask(taskId) {
    //   try {
    //     const res = await getTask(this.taskId);
    //     if(res.status%2===1) {
    //       // -- 打印返回对象
    //       this.task = res.data;
    //     }

    //   } catch (error) {
    //     console.error('Failed to load task:', error);
    //   }
    // },
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
    // 删除当前页面渲染的任务，仅前端
    deleteTask(taskId: number) {
      const indexToRemove = this.tasks.findIndex((task) => task.taskId === taskId);
      if (indexToRemove !== -1) {
        this.tasks.splice(indexToRemove, 1);
      } else {
        console.warn(`任务 ID ${taskId} 不存在于任务列表中`);
      }
    },
    // 在当前页面添加任务：
    addTask(task) {
      this.tasks.unshift(task);
    },
    // ——前后联动：
    // 创建新的task：
    async createNewTask(task) {
      const res= await addTask(task)
      try {
        if(res.status % 2 === 1) {
          this.addTask(res.data)
        }
      } catch (error) {
        console.error('新建任务失败', error);
      }
    },
    // 删除指定taskId的任务：
    async deleteTaskByTaskId(taskId) {
      try {
        const res = await deleteTask(taskId)
        if(res.status === 2015) {
          // 同时把Pinia的也删掉：
          this.deleteTask(taskId)
          return true
        }
      } catch (error) {
        console.error('通过basketId获取所有任务失败', error);
      }

    },
   // —— 对tasks的操作，
    // ——加载从后端获取到的所有tasks：
    async loadAllTasks(basketId,routeKey) {
      try {
        const res = await getAllTaskByBasketId(basketId)
        // if(res.status % 2 ==1) {
        //   Object.assign(tasks, res.data); // 正确更新 tasks
        // }
        if (res.status % 2 === 1 && Array.isArray(res.data)) {
           // 清空当前任务数据
            this.tasks.splice(0, this.tasks.length);
            // 把tasks存在store当中
            
            if(routeKey==='works') {
              this.tasks.unshift(...res.data)
            }else {
              this.tasks.push(...res.data)
            }
            // tasks.value.push(...res.data); // 将新任务追加到 tasks 中
          }
      } catch (error) {
        console.error('通过basketId获取所有任务失败', error);
      }
    },

    // 在当前页面中找到特定的task



    // 前端模拟数据：
    frontInitData(routeKey) {
      // 后端没有获取到数据时，呈现的默认任务数据
      // 初期模拟不同页面渲染数据
      if(routeKey === 'importance') {
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
      } else if (routeKey === 'ddl') {
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
      }else if (routeKey === 'goals') {
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
      } else if (routeKey === 'works') {
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
      } else if (routeKey === 'thoughts') {
        this.tasks = [
          {
          taskId:12,
          taskName:'总结过去,展望未来',
          star:0,
          isFinish:0,
          basketId:12,//可以找到对应的basket
          remark:'项目测试通过后',//备注
          deadline:'',
          createTime:'',
          isDrain:1,
        },
      ]
      } else if(routeKey==='tags') {
        this.tasks=[]
      }else if (routeKey === 'actions') {
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
