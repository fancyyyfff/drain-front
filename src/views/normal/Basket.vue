<template>
<!-- 主要用于渲染对应basketId下的所有子任务 -->
<div class="nav-ul">
    <!-- 循环渲染每个 basket,此时tasks使用的是store的，为了与SideBar共享信息 -->
    <div v-for="task in tasks" :key="task.taskId" class="nav-item">
      <TaskComponet :task></TaskComponet>
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
  frontInitData(route.params.routeKey)
  // taskStore.frontInitData(route.params.routeKey)
})

// 放置数据的地方
const tasks = ref<Task[]>([])
function loadTasks(routeKey) {
  // 使用 Getter 获取对应的 basketIds
  const basketIds = computed(() =>
      basketStore.getBasketIdsByRouteKey(routeKey)
    );
  const basketIdsArray = basketIds.value; // 获取数组

    // 遍历 basketIds
  basketIdsArray.forEach((basketId) => {
    loadAllTasks(basketId)
  });
};

async function loadAllTasks(basketId) {
  try {
    const res = await getAllTaskByBasketId(basketId)
    if(res.status===2001) {
      tasks.value = res.data
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
  // 后期不要：
  // taskStore.frontInitData(newRouteKey)
  frontInitData(newRouteKey)

});

// 新建任务：
emitter.on('createNewTask',handleCreateNewTask)
async function handleCreateNewTask(task) {
  // 新建任务逻辑：
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
function frontInitData(routeKey) {
      // 后端没有获取到数据时，呈现的默认任务数据
      // 初期模拟不同页面渲染数据
      if(routeKey === 'importance') {
        tasks.value = [
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
        tasks.value = [
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
      } else if (routeKey === 'works') {
        tasks.value = [
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
        tasks.value = [
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
        tasks.value=[]
      }else if (routeKey === 'actions') {
        tasks.value = [
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
      } else if (routeKey === 'entrusts') {
        tasks.value = [
          {
          taskId:14,
          taskName:'拿快递',
          star:0,
          isFinish:0,
          basketId:13,//可以找到对应的basket
          remark:'',//备注
          deadline:'',
          createTime:'',
          isDrain:1,
        },
      ]
      } else {
        tasks.value =[
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
}
</script>

<style scoped>

</style>
