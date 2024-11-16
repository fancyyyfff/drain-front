<template>
<div class="task-wrap shine" @click="openSideBar">
  <!-- <div class="task-tick"></div> -->
  <Tick v-model:checked="finish" icon-name="checkmark-done" @update:checked="handleTaskChange" @click.stop/>
  <!-- <p class="task-text">{{taskValue}}</p> -->
  <p class="task-text" :style="textStyle" >{{ taskName }}</p>
  <Star v-model:starred="item.isStarred" star-color="#efe299" :size="'1.5rem'" @click.stop />
</div>
</template>

<script setup lang="ts" name="">
import { ref,computed } from 'vue'
import { defineProps } from 'vue';
import emitter from "@/mitt";
import { getTask,updateTaskName,updateTaskFinish } from "@/api/task";
import Tick from '@/components/Tick.vue';
import { tourStepEmits } from 'element-plus/lib/components/index.js';
import Star from "@/components/Star.vue";
defineProps({
  taskName: {
    type: String,
    required: true,
  },
})
const finish = ref(false);
const drawer = ref(false)

const openSideBar = ()=>{
  emitter.emit('toggleSidebar','传输的任务数据')
}

emitter.on('addTagSign',addTagSign)
// ==
function addTagSign() {
  console.log('添加标签的符号到任务卡')
}

// ===获取任务：
// 如何获取到当前的taskId？首先获取到listId,判断包含与否
// 不如统一放到pinia
emitter.on('getTask',fetchTask)
async function fetchTask() {
      // const res=await getTask(taskId)
      // if(res.data.code==1) {
      //   emitter.emit('resTask',res.data.Task)
      // }
}

// defineExpose({
//   openSideBar,
// })

// 打勾的组件：

const textStyle = computed(() => {
  return {
    'text-decoration': finish.value ? 'line-through' : 'none',
    'text-shadow': finish.value ? 'none':'0 0 2px rgba(255, 255, 255, 0.5), 0 0 2px rgba(255, 255, 255, 0.5)' , // 添加发光效果
    'color': finish.value ?  'gray':'white'
  };
});
async function handleTaskChange (isChecked:boolean)  {
  finish.value=isChecked
  // == 完成的任务放到最后面：
  if(finish.value===true) {
    console.log('需要把当前任务的id放到页面渲染数组的最后面')
  }
  // === 发送请求更改任务的完成状态
  // == 获取当前元素的taskId
  // try {
  //   const res = await updateTaskFinish(taskId, !finish.value);
  //   if (res.code===1) {
  //     finish.value = !finish.value;
  //   } else {
  //     // 处理可能的错误响应
  //     console.error(`更新失败：${res.message || '未知错误'}`, 'error');
  //   }
  // } catch (err) {
  //   // 捕获意外的异常并处理
  //   console.error('更新任务失败:', err);
  // }
}


// 控制星星
const item = ref({
  isStarred: false,
  // ... other item data
});
</script>

<style scoped>
.task-wrap {
      display: flex;
      position: relative;
      width: 96%;
      height: 50px;
      padding:0 20px 0 20px;
    background: rgba(130, 127, 127, 0.2); /* 半透明白色背景 */
      border-radius: 10px;
      align-items: center;

      .task-text {
        font-size: 1.5rem;
        font-weight:700;
        margin-left:4%;
      }
}
</style>
