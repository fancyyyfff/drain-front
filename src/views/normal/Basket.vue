<template>
<!-- 主要用于渲染对应basketId下的所有子任务 -->
<div class="nav-ul">
    <!-- 循环渲染每个 basket,此时tasks使用的是store的，为了与SideBar共享信息 -->
    <div v-for="task in tasks" :key="task.taskId" class="nav-item">
      <TaskComponet :task :moveItems @deleteTask="handleDeleteTask"></TaskComponet>
    </div>
</div>
</template>

<script setup lang="ts" name="">
import { onMounted, ref, watch,computed, reactive,onUnmounted  } from 'vue';
import { routeLocationKey, useRoute } from 'vue-router';
import TaskComponet from "@/views/menu/components/Task.vue";
import { useBasketStore } from '@/stores/basket';
import { isNumber } from 'element-plus/es/utils/types.mjs';
import { getAllTaskByBasketId,addTask, getAllStar } from "@/api/task";
import emitter from '@/mitt';
import { useTaskStore } from "@/stores/task";
import type { Task } from "@/types/type";
import pinia from '@/stores';
import { IMPORTANCE,DDL } from '@/const/type';
import type{ Basket } from "@/types/type";


// 获取路由参数
const route = useRoute();
const { basketId,type, basketName } = defineProps(['type', 'basketName','basketId']);
console.log('type',type)
console.log('basketName',basketName)
const basketStore= useBasketStore()
const taskStore= useTaskStore()

onMounted(()=>{
  console.log('Basket.vue加载了')
  // loadTasks(route.params.basketId)
  // // 后期删掉：
  // frontInitData(route.params.basketId)
  // taskStore.frontInitData(route.params.type)
})

// 放置数据的地方
const tasks = ref<Task[]>([])
// 点击星标任务就让任务变成这个所有的allStar
// emitter.on('allStar',handleAllStar)
// function handleAllStar() {
//   try {
//     const res = await getAllStar()
//     if(res.status===2006) {
//       tasks.value=res.data
//     }
//   } catch (error) {
//     console.error('加载所有星标任务失败', error);
//   }
// }

async function loadTasks(basketId) {
  try {
    const res = await getAllTaskByBasketId(basketId)
    if(res.status===2001) {
      tasks.value = res.data
    }
  } catch (error) {
    console.error('通过basketId获取所有任务失败', error);
  }
}

const moveItems = ref<Basket[]>([])
watch(()=>route.params,async(newParams)=>{
  const type=Number(newParams.type)
  const basketId = Number(newParams.basketId)
  // 设置当前的basketId的同时更新移动选项
  basketStore.setCurrentBasketId(basketId)
  moveItems.value= basketStore.getMoveItems
  if (!isNaN(type) && type === IMPORTANCE) {
    console.log('进入到星标任务模块');
    // 后期不要：
    tasks.value=[
    {
        taskId:6,
        taskName:'完成任务管理模块',
        star:1,
        isFinish:0,
        basketId:3,//可以找到对应的basket
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
        basketId:3,//可以找到对应的basket
        remark:'开始放好伪数据，记得发送请求',//备注
        deadline:'',
        createTime:'',
        isDrain:1,
      },
    ]

    // 后期保留
    try {
      const res = await getAllStar()
      if(res.status===2006) {
        tasks.value = res.data
      }
    } catch (error) {
      console.error('获取所有星标任务失败', error);
    }

  }else {
    // 后期保留
    loadTasks(basketId);

    // 后期不要：
    frontInitData(basketId)
  }
},
{ immediate: true }) // 在组件挂载时立即执行一次监听逻辑)

const deadline = computed(()=>taskStore.deadline)
const currentBasketId = computed(()=>basketStore.currentBasketId)
const currentType= computed(()=>Number(route.params.type))
// 新建任务：
emitter.on('createNewTask',handleCreateNewTask)
async function handleCreateNewTask(task) {
  // 新建任务逻辑：
  tasks.value.unshift(task)

}


// 删除任务
function handleDeleteTask(taskId) {
  const indexToRemove = tasks.value.findIndex(task => task.taskId === taskId);
  console.log('当前任务的索引',indexToRemove)
  if (indexToRemove !== -1) {
    tasks.value.splice(indexToRemove, 1);
  }
}
emitter.on('deleteTask',handleDeleteTask)

onUnmounted(() => {
  emitter.off('deleteTask', handleDeleteTask); // 组件销毁时解绑事件
});

// 移动任务v                    v v  bbbb
// emitter.on('moveTask',)

// 设置选中任务
const selectTask = (task) => {
  taskStore.setTask(task);
  console.log('pinia当中目前的task是',taskStore.task);
};

// 后期删掉：前端模拟渲染当前页面的数据
function frontInitData(basketId) {
      // 后端没有获取到数据时，呈现的默认任务数据
      // 初期模拟不同页面渲染数据
      if (basketId === 1) {
        tasks.value = [
          {
          taskId:9,
          taskName:'30号周六项目提交',
          star:0,
          isFinish:0,
          basketId:1,//可以找到对应的basket
          remark:'开始放好伪数据，记得发送请求',//备注
          deadline:'',
          createTime:'2024.11.29',
          isDrain:1,
        },
      ]
      }else if (basketId === 2) {
        tasks.value = [
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
      }else if(basketId === 3) {

      tasks.value = [
        {
        taskId:6,
        taskName:'完成任务管理模块',
        star:1,
        isFinish:0,
        basketId:3,//可以找到对应的basket
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
        basketId:3,//可以找到对应的basket
        remark:'开始放好伪数据，记得发送请求',//备注
        deadline:'',
        createTime:'',
        isDrain:1,
      },
      ]
      } else if (basketId === 4) {
        tasks.value = [
          {
          taskId:11,
          taskName:'录制视频',
          star:0,
          isFinish:0,
          basketId:4,//可以找到对应的basket
          remark:'项目测试通过后',//备注
          deadline:'',
          createTime:'',
          isDrain:1,
        },
        {
          taskId:11,
          taskName:'路演',
          star:0,
          isFinish:0,
          basketId:4,//可以找到对应的basket
          remark:'项目测试通过后',//备注
          deadline:'',
          createTime:'',
          isDrain:1,
        },
      ]
      }
      else if (basketId === 5) {
        tasks.value = [
          {
          taskId:16,
          taskName:'拿快递',
          star:0,
          isFinish:0,
          basketId:5,//可以找到对应的basket
          remark:'',//备注
          deadline:'',
          createTime:'',
          isDrain:1,
        },
      ]
      }else if (basketId === 6) {
        tasks.value = [
          {
          taskId:12,
          taskName:'总结过去,展望未来',
          star:0,
          isFinish:0,
          basketId:6,//可以找到对应的basket
          remark:'项目测试通过后',//备注
          deadline:'',
          createTime:'',
          isDrain:1,
        },
      ]
      }
}

</script>

<style scoped>

</style>
