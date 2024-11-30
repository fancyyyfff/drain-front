<template>
        <p class="dialog-work-text">{{ taskStore.drainTask.taskName }}</p>
        <p>对你来说，它是垃圾还是想法</p>
        <div class="clear-btn-wrap">
          <button @click="emitter.emit('change','rubbish')" class="pretty-btn no-btn">垃圾</button>
          <button @click="handleThought" class="pretty-btn yes-btn">想法</button>
        </div>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";

import { createNewTask } from "@/api/task";
import { useTaskStore } from "@/stores/task";
import { useBasketStore } from "@/stores/basket";
const taskStore = useTaskStore()
const basketStore = useBasketStore()

async function handleThought() {
  emitter.emit('change','thought')
  
  const task = {
      basketId:basketStore.basketList[5].basketId,
      taskName:taskStore.drainTask.taskName,
      deadline:''
    }
    try {
      const res= await createNewTask(task)
      if(res.status % 2 === 1) {
        // 删除进入工作篮的任务
        const deleteTask = {
          basketId:basketStore.basketList[3].basketId,
          taskId:res.data.taskId
        }
       await taskStore.deleteDrainTask(deleteTask)
       emitter.emit('change','thought')
      }
    } catch (error) {
      console.error('新建任务失败', error);
    }
}

</script>

<style scoped>

</style>
