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
import { useTaskStore } from "@/stores/task";
import { useBasketStore } from "@/stores/basket";
import { useRoute } from "vue-router";
import { addTask } from "@/api/task";

const route = useRoute()
const taskStore = useTaskStore()
const basketStore = useBasketStore()

const taskName = ref('')
async function handleOk() {
  if(taskName) {
    const basketIds=basketStore.getBasketIdsByRouteKey('entrusts')
    const task={basketId:basketIds[0],taskName}
    try {
      const res= await addTask(task)
      if(res.status % 2 === 2017) {
        basketStore.addTaskToSingleBasket('entrust',res.data.taskId)
        emitter.emit('closeAndTips')
        return
      }
    } catch (error) {
      console.error('新建任务失败', error);
    }

  }


}
</script>

<style scoped>

</style>
