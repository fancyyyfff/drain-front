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

import { addTask, updateTaskBasketId } from "@/api/task";
import { useTaskStore } from "@/stores/task";
import { useBasketStore } from "@/stores/basket";
const taskStore = useTaskStore()
const basketStore = useBasketStore()

async function handleThought() {
  // emitter.emit('change','thought')

  const basketId = basketStore.basketList[4].basketId
  const taskId = taskStore.drainTask.taskId

  try {
    const res= await updateTaskBasketId(taskId,basketId)
    if(res.status % 2 === 1) {
      taskStore.resetTask()
      emitter.emit('change','thought')
    }
  } catch (error) {
    console.error('新建任务失败', error);
  }
}

</script>

<style scoped>

</style>
