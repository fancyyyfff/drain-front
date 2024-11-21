<template>
<!-- 主要用于渲染对应basketId下的所有子任务 -->
<div class="nav-ul">
    <!-- 循环渲染每个 basket -->
    <div v-for="task in tasks" :key="task.taskId" class="nav-item">
      <Task :taskId="task.taskId" :taskName="task.taskName"></Task>
    </div>
</div>
</template>

<script setup lang="ts" name="">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Task from "@/views/menu/components/Task.vue";
import { useBasketStore } from '@/stores/basket';
import { isNumber } from 'element-plus/es/utils/types.mjs';

// 获取路由参数
const route = useRoute();
const basketId = ref(route.params.basketId); // 当前 basketId
const tasks = ref([]); // 当前任务
const basketStore= useBasketStore()
// 模拟任务数据
const allTasks = {
  1: [{ id: 1, name: 'Task 1-1' }, { id: 2, name: 'Task 1-2' }],
  2: [{ id: 3, name: 'Task 2-1' }, { id: 4, name: 'Task 2-2' }],
  3: [{ id: 5, name: 'Task 3-1' }],
  4: [{ id: 6, name: 'Task 4-1' }, { id: 7, name: 'Task 4-2' }],
};

// 加载任务
const loadTasks = (basketId:number) => {
  tasks.value = allTasks[basketId] || [];
};
// const loadTasks = (basketId: number) => {
//   if (!Number.isInteger(basketId) || basketId < 0) {
//     console.error('Invalid basketId');
//     tasks.value = [];
//     return;
//   }
//   tasks.value = allTasks[basketId] ?? []; // 使用 Nullish 合并运算符处理数据
// }


// 监听 basketId 变化，重新加载任务
watch(() => route.params.basketId, (newId) => {
  basketId.value = newId;
  loadTasks(newId);
});

// 初次加载
loadTasks(basketId.value);

</script>

<style scoped>

</style>
<!--
<template>
  <div>
    <h1>Tasks for Basket {{ basketId }}</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// 模拟任务数据
const allTasks = {
  1: [{ id: 1, name: 'Task 1-1' }, { id: 2, name: 'Task 1-2' }],
  2: [{ id: 3, name: 'Task 2-1' }, { id: 4, name: 'Task 2-2' }],
  3: [{ id: 5, name: 'Task 3-1' }],
  4: [{ id: 6, name: 'Task 4-1' }, { id: 7, name: 'Task 4-2' }],
};

// 获取路由参数
const route = useRoute();
const basketId = ref(route.params.basketId); // 当前 basketId
const tasks = ref([]); // 当前任务

// 加载任务
const loadTasks = (id) => {
  tasks.value = allTasks[id] || [];
};

// 监听 basketId 变化，重新加载任务
watch(() => route.params.basketId, (newId) => {
  basketId.value = newId;
  loadTasks(newId);
});

// 初次加载
loadTasks(basketId.value);
</script> -->
