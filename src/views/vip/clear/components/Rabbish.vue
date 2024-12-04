<template>
<p>恭喜你，清除了大脑的一个垃圾，减轻了负担！</p>
        <div class="clear-btn-wrap">
          <button @click="emitter.emit('closeBrainDialog')" class="pretty-btn">谢谢</button>
        </div>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";
import { addTask } from "@/api/task";

import { onMounted } from "vue";
import { useTaskStore } from "@/stores/task";
import { useBasketStore } from "@/stores/basket";
const taskStore = useTaskStore()
const basketStore = useBasketStore()

onMounted(async()=>{
  const deleteTask = {
          basketId:basketStore.basketList[3].basketId,
          taskId:taskStore.drainTask.taskId
        }
  // 删除任务
  taskStore.resetDrainTask()
  // return
  await taskStore.deleteDrainTask(deleteTask)
})
</script>

<style scoped>

</style>
