<template>
  <p>请输入你的“下一步行动”，</p>
  <p>我将为你添加到“委托清单”</p>
  <input class="dialog-input shine" type="text" placeholder="请输入要委托别人去做的事" v-model="taskName">
  <p>建议写明：</p>
  <p>委托谁？何时？何地？干啥？</p>
  <button @click="handleOk" class="pretty-btn yes-btn">ok了</button>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";
import { onUnmounted,ref } from "vue";
import { addTask } from "@/api/task";

import { useTaskStore } from "@/stores/task";
import { useBasketStore } from "@/stores/basket";
const taskStore = useTaskStore()
const basketStore = useBasketStore()

const taskName = ref('')
async function handleOk() {
  emitter.emit('closeAndTips')

  if(taskName) {
    const task = {
      basketId:basketStore.basketList[4].basketId,
      taskName:taskName.value,
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
        emitter.emit('closeAndTips')
      }
    } catch (error) {
      console.error('新建任务失败', error);
    }
  }

}
</script>

<style scoped>

</style>
