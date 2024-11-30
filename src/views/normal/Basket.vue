<template>
<!-- 主要用于渲染对应basketId下的所有子任务 -->
<div class="nav-ul">
    <div v-for="task in tasks" :key="task.taskId" class="nav-item">
      <TaskComponet :task :moveItems @deleteTask="handleDeleteTask"></TaskComponet>
    </div>
</div>
</template>

<script setup lang="ts" name="">
import { onMounted, ref, watch,computed, reactive,onUnmounted  } from 'vue';
import { useRoute } from 'vue-router';
import TaskComponet from "@/views/menu/components/Task.vue";
import { useBasketStore } from '@/stores/basket';
import { getAllTaskByBasketId,addTask, getAllStar } from "@/api/task";
import emitter from '@/mitt';
import { useTaskStore } from "@/stores/task";
import type { Task } from "@/types/type";
import pinia from '@/stores';
import { IMPORTANCE,DDL } from '@/const/type';
import type{ Basket } from "@/types/type";


// 获取路由参数
const route = useRoute();
const { type, basketName } = defineProps(['type', 'basketName','basketId']);
console.log('type',type)
console.log('basketName',basketName)
const basketStore= useBasketStore()
const taskStore= useTaskStore()

// 放置数据的地方
const tasks = ref<Task[]>([])
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
        remark:'添加备注',//备注
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
        remark:'添加备注',//备注
        deadline:'',
        createTime:'',
        isDrain:1,
      },
    ]

    const basketId = Number(newParams.basketId)
    if(basketId) {
        // 设置当前的basketId的同时更新移动选项
        basketStore.setCurrentBasketId(basketId)
    }else {
      // 星标任务：
      basketStore.setCurrentBasketId(-1)
    }
    moveItems.value= basketStore.getMoveItems
    // 后期保留
    try {
      const res = await getAllStar()
      if(res.status%2===1) {
        tasks.value = res.data
      }

    } catch (error) {
      console.error('获取所有星标任务失败', error);
    }
  }else {
    const basketId = Number(newParams.basketId)
    // 设置当前的basketId的同时更新移动选项
    basketStore.setCurrentBasketId(basketId)
    moveItems.value= basketStore.getMoveItems
    // 后期保留
    loadTasks(basketId);

    // 后期不要：
    // frontInitData(basketId)
  }
},
{ immediate: true }) // 在组件挂载时立即执行一次监听逻辑)

const deadline = computed(()=>taskStore.deadline)
// const currentBasketId = computed(()=>basketStore.currentBasketId)
const currentBasketId = computed(()=>route.params.basketId)
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

// 后期删掉：前端模拟渲染当前页面的数据

</script>

<style scoped>

</style>
