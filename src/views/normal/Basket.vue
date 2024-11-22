<template>
<!-- 主要用于渲染对应basketId下的所有子任务 -->
<div class="nav-ul">
    <!-- 循环渲染每个 basket -->
    <div v-for="task in tasks" :key="task.taskId" class="nav-item">
      <Task :task></Task>
    </div>
</div>
</template>

<script setup lang="ts" name="">
import { onMounted, ref, watch,computed, reactive  } from 'vue';
import { useRoute } from 'vue-router';
import Task from "@/views/menu/components/Task.vue";
import { useBasketStore } from '@/stores/basket';
import { isNumber } from 'element-plus/es/utils/types.mjs';
import { getAllTaskByBasketId } from "@/api/task";
// 获取路由参数
const route = useRoute();
const { routeKey, mainTitle } = defineProps(['routeKey', 'mainTitle']);
console.log('routeKey',routeKey)
console.log('mainTitle',mainTitle)
const basketStore= useBasketStore()

// 只为了让数据可视化，暂时不使用类型绑定
interface Task {
  taskId: number | null;  // taskId 可以是数字或 null
  taskName: string;       // taskName 为字符串
  star: number;           // star 为数字
  isFinish: 0 | 1;        // isFinish 为字面量类型 0 或 1
  basketId: number | null; // basketId 可以是数字或 null
  remark: string;         // remark 为字符串
  deadline: string;       // deadline 为字符串
  createTime: string;     // createTime 为字符串
  isDrain: 0 | 1;         // isDrain 为字面量类型 0 或 1
}

// 后端没有获取到数据时，呈现的默认任务数据
const tasks = reactive([
  {
    taskId:1,
    taskName:'完成创建Task',
    star:0,
    isFinish:0,
    basketId:null,//可以找到对应的basket
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
    basketId:null,//可以找到对应的basket
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
    basketId:null,//可以找到对应的basket
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
    basketId:null,//可以找到对应的basket
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
    basketId:null,//可以找到对应的basket
    remark:'开始放好伪数据，记得发送请求',//备注
    deadline:'',
    createTime:'',
    isDrain:1,
  },

]);

onMounted(()=>{
  console.log('Basket.vue加载了')
  loadTasks(routeKey)
  console.log('tasks',tasks)
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
    // 已把tasks更新
    getAllTasks(basketId)
  });

};

async function getAllTasks(basketId) {
  try {
    const res = await getAllTaskByBasketId(basketId)
    // if(res.status % 2 ==1) {
    //   Object.assign(tasks, res.data); // 正确更新 tasks
    // }
    if (res.status % 2 === 1 && Array.isArray(res.data)) {
       // 清空当前任务数据
        tasks.splice(0, tasks.length);

        tasks.push(...res.data); // 将新任务追加到 tasks 中
      }
  } catch (error) {
    console.error('通过basketId获取所有任务失败', error);
  }
}
// const loadTasks = (basketId: number) => {
//   if (!Number.isInteger(basketId) || basketId < 0) {
//     console.error('Invalid basketId');
//     tasks.value = [];
//     return;
//   }
//   tasks.value = allTasks[basketId] ?? []; // 使用 Nullish 合并运算符处理数据
// }


// 监听 routeKey 变化，重新加载任务
watch(() => routeKey, (newRouteKey) => {
  routeKey.value = newRouteKey;
  loadTasks(newRouteKey);
});



</script>

<style scoped>

</style>
