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
import pinia from '@/stores';``
import { IMPORTANCE,DDL } from '@/const/type';
import type{ Basket,Task } from "@/types/type";
import { resToTasks } from "@/hooks/useTask";

// 获取路由参数
const route = useRoute();
const { type, basketName } = defineProps(['type', 'basketName','basketId']);
console.log('type',type)
console.log('basketName',basketName)
const basketStore= useBasketStore()
const taskStore= useTaskStore()

const {tasks,setTasksData} =resToTasks()

async function loadTasks(basketId:number) {
  try {
    const res = await getAllTaskByBasketId(basketId)
    if(res.status === 2001) {
      if (res.data) {
        setTasksData(res.data)
      }else {
        console.log('没有数据')
      }
    }
  } catch (error) {
    console.error('渲染数据出错了', error);
  }
}

// 星标任务加载
emitter.on('showImportanceTask', async()=>{
  try {
      const res = await getAllStar()
      if(res.status%2===1) {
        setTasksData(res.data)
      }
    } catch (error) {
      console.error('获取所有星标任务失败', error);
    }
})

// 检测路由变化：星标任务的渲染、当前basketId的设置、
const moveItems = ref<Basket[]>([])
watch(()=>route.params,async(newParams)=>{
    const type=Number(newParams.type)
    const basketId = Number(newParams.basketId)
    // 设置当前的basketId的同时更新移动选项
    basketStore.setCurrentBasketId(basketId)
    moveItems.value= basketStore.getMoveItems
    // 后期保留
    loadTasks(basketId);
    // 后期不要：
    // frontInitData(basketId)
},
{ immediate: true }) // 在组件挂载时立即执行一次监听逻辑)

// 新建任务的渲染
emitter.on('createNewTask',handleCreateNewTask)
async function handleCreateNewTask(task) {
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


</script>

<style scoped>

</style>
