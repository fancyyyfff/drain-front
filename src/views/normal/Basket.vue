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
import { getAllTaskByBasketId,addTask } from "@/api/task";
import emitter from '@/mitt';

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

const tasks1 = reactive([
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

let tasks = tasks1
function frontInitData() {
// 初期模拟不同页面渲染数据
if(route.params.routeKey === 'importance') {
  tasks = [
    {
    taskId:6,
    taskName:'完成任务管理模块',
    star:1,
    isFinish:0,
    basketId:null,//可以找到对应的basket
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
    basketId:null,//可以找到对应的basket
    remark:'开始放好伪数据，记得发送请求',//备注
    deadline:'',
    createTime:'',
    isDrain:1,
  },
]
} else if (route.params.routeKey === 'ddl') {
  tasks = [
    {
    taskId:9,
    taskName:'30号周六项目提交',
    star:0,
    isFinish:0,
    basketId:null,//可以找到对应的basket
    remark:'开始放好伪数据，记得发送请求',//备注
    deadline:'',
    createTime:'',
    isDrain:1,
  },
]
}else if (route.params.routeKey === 'goals') {
  tasks = [
    {
    taskId:10,
    taskName:'完成drain项目',
    star:0,
    isFinish:0,
    basketId:null,//可以找到对应的basket
    remark:'开始放好伪数据，记得发送请求',//备注
    deadline:'',
    createTime:'',
    isDrain:1,
  },
]
} else if (route.params.routeKey === 'works') {
  tasks = [
    {
    taskId:11,
    taskName:'录制视频',
    star:0,
    isFinish:0,
    basketId:null,//可以找到对应的basket
    remark:'项目测试通过后',//备注
    deadline:'',
    createTime:'',
    isDrain:1,
  },
]
} else if (route.params.routeKey === 'thoughts') {
  tasks = [
    {
    taskId:12,
    taskName:'完成后想好好休息，啥也不干，发发呆',
    star:0,
    isFinish:0,
    basketId:null,//可以找到对应的basket
    remark:'项目测试通过后',//备注
    deadline:'',
    createTime:'',
    isDrain:1,
  },
]
} else if(route.params.routeKey==='tags') {
  tasks=[]
}else if (route.params.routeKey === 'actions') {
  tasks = [
    {
    taskId:13,
    taskName:'删除任务图标',
    star:0,
    isFinish:0,
    basketId:null,//可以找到对应的basket
    remark:'开始放好伪数据，记得发送请求',//备注
    deadline:'',
    createTime:'',
    isDrain:1,
  },
]
}


}


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
// 使用 computed 属性包装 routeKey
const currentRouteKey = computed(() => routeKey);

// 监听 routeKey 的变化
watch(currentRouteKey, (newRouteKey) => {
  loadTasks(newRouteKey); // 在路由键变化时加载任务
  frontInitData()
});

// 新建任务：
emitter.on('createNewTask',handleCreateNewTask)
async function handleCreateNewTask(task) {
  const res= await addTask(task)
  try {
    if(res.status % 2 === 1) {
      tasks.unshift(res.data)
    }
  } catch (error) {
    console.error('新建任务失败', error);
  }

  // 只用于初期渲染，后期连接后端删掉：
  tasks.unshift(task)
}

</script>

<style scoped>

</style>
