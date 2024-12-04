<template>
  <h4>欢迎进入头脑风暴</h4>
  <p>现在即将进入清空工作篮的头脑风暴，<br>找个安静的时间，跟随我一起清空大脑吧！<br>
    注意：中途不可以放弃哦!</p>
  <div class="clear-btn-wrap">
    <button @click="emitter.emit('closeBrainDialog')" class="pretty-btn no-btn">不了</button>
    <button @click="emitter.emit('change','what')" class="pretty-btn yes-btn">好！</button>
  </div>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";
import { onMounted } from "vue";
import { getAllTaskByBasketId } from "@/api/task";
import { useTaskStore } from "@/stores/task";
import { useBasketStore } from "@/stores/basket";
const taskStore = useTaskStore()
const basketStore = useBasketStore()
onMounted(async()=>{

  try {
    const res = await getAllTaskByBasketId(basketStore.basketList[3].basketId as number)
    if(res.status%2 ===1) {
      taskStore.setDrainTask(res.data[0])
      return
    }
  } catch (error) {
    console.error('获取任务失败', error);
  }

  // const task = <Task>{
  //       taskId: 25,
  //       taskName: '完成项目核心页面和需求',
  //       star: 0,
  //       isFinish: 0,
  //       basketId: 4,
  //       remark: '',
  //       deadline: '',
  //       createTime: '',
  //       isDrain: 1,
  //     }
  // // 后期删掉
  // taskStore.setDrainTask(task)
  console.log('目前工作篮的任务的名字是',taskStore.drainTask.taskName);
})
</script>

<style scoped>

</style>
