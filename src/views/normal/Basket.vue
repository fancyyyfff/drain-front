<template>
<!-- 主要用于渲染对应basketId下的所有子任务 -->
<div class="nav-ul">
    <!-- 循环渲染每个 basket,此时tasks使用的是store的，为了与SideBar共享信息 -->
    <div v-for="task in taskStore.tasks" :key="task.taskId" class="nav-item">
      <TaskComponet :task  @click="selectTask(task)"></TaskComponet>
    </div>
</div>
</template>

<script setup lang="ts" name="">
import { onMounted, ref, watch,computed, reactive,onUnmounted  } from 'vue';
import { routeLocationKey, useRoute } from 'vue-router';
import TaskComponet from "@/views/menu/components/Task.vue";
import { useBasketStore } from '@/stores/basket';
import { isNumber } from 'element-plus/es/utils/types.mjs';
import { getAllTaskByBasketId,addTask } from "@/api/task";
import emitter from '@/mitt';
import { useTaskStore } from "@/stores/task";
import type { Task } from "@/types/type";
import pinia from '@/stores';

// 获取路由参数
const route = useRoute();
const { routeKey, mainTitle } = defineProps(['routeKey', 'mainTitle']);
console.log('routeKey',routeKey)
console.log('mainTitle',mainTitle)
const basketStore= useBasketStore()
const taskStore= useTaskStore()

onMounted(()=>{
  console.log('Basket.vue加载了')
  loadTasks(route.params.routeKey)
  // 后期删掉：
  taskStore.frontInitData(route.params.routeKey)
})
// 加载任务
// const loadTasks = (basketId:number) => {
//   tasks.value = allTasks[basketId] || [];
// };

function loadTasks(routeKey) {
  // 使用 Getter 获取对应的 basketIds
  const basketIds = computed(() =>
      basketStore.getBasketIdsByRouteKey(routeKey)
    );
  const basketIdsArray = basketIds.value; // 获取数组

    // 遍历 basketIds
  basketIdsArray.forEach((basketId) => {
    // 已把taskStroe中的tasks更新了
  taskStore.loadAllTasks(basketId)
  });

};

// 使用 computed 属性包装 routeKey
const currentRouteKey = computed(() => routeKey);

// 监听 routeKey 的变化
watch(currentRouteKey, (newRouteKey) => {
  //先清空pinia中的tasks和task对象
  taskStore.tasks=[]
  taskStore.resetTask()
  taskStore.deadline=''
  loadTasks(newRouteKey); // 在路由键变化时加载任务
  // 后期不要：
  taskStore.frontInitData(newRouteKey)
  console.log('pinia中加载的tasks是',taskStore.tasks);
});

// 新建任务：
emitter.on('createNewTask',handleCreateNewTask)
async function handleCreateNewTask(task) {
  taskStore.createNewTask(task)
}


// 删除任务
function handleDeleteTask(taskId) {
  console.log('删除前当前页面的数组',taskStore.tasks);
  const indexToRemove = taskStore.tasks.findIndex(task => task.taskId === taskId);
  console.log('当前任务的索引',indexToRemove)
  if (indexToRemove !== -1) {
    taskStore.tasks.splice(indexToRemove, 1);
  }
  console.log('删除后当前页面的数组：',taskStore.tasks);
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

</script>

<style scoped>

</style>
