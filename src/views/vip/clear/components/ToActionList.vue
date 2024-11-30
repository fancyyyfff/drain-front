<template>
  <p>请输入你的“下一步行动”，</p>
  <p>我将为你添加到“马上行动”</p>
  <input class="dialog-input shine" type="text" placeholder="请输入你要尽快完成的事情" v-model="taskName">
  <p>建议：</p>
  <p>写得具体，看一眼就能知道怎么做的</p>
  <button @click="handleOk" class="pretty-btn yes-btn">ok了</button>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";


import { ref } from "vue";
import { createNewTask } from "@/api/task";
import { useTaskStore } from "@/stores/task";
import { useBasketStore } from "@/stores/basket";
const taskStore = useTaskStore()
const basketStore = useBasketStore()

const taskName = ref('')
async function handleOk() {
  emitter.emit('closeAndTips')

  if(taskName) {
    const task = {
      basketId:basketStore.basketList[2].basketId,
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
