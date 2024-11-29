<template>
<p>你认为</p>
        <p class="dialog-work-text">{{ taskStore.drainTask.taskName }}</p>
        <p>是一个多步骤任务吗？</p>
        <div class="clear-btn-wrap">
          <button @click="emitter.emit('change','nextStep')" class="pretty-btn no-btn">否</button>
          <button @click="handleProject" class="pretty-btn yes-btn">是</button>
        </div>
</template>
emitter.emit('change','project')
<script setup lang="ts" name="">
import emitter from "@/mitt";

import { createNewTask } from "@/api/task";
import { useTaskStore } from "@/stores/task";
import { useBasketStore } from "@/stores/basket";
const taskStore = useTaskStore()
const basketStore = useBasketStore()

async function handleProject() {
    const task = {
      basketId:basketStore.basketList[1].basketId,
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
       emitter.emit('change','project')
      }
    } catch (error) {
      console.error('新建任务失败', error);
    }

}


</script>

<style scoped>

</style>
