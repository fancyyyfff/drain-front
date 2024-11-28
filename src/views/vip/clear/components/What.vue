<template>
        <p>首先来看</p>
        <p class="dialog-work-text">{{ taskStore.task.taskName }}</p>
        <p>你清楚这要干什么吗？</p>
        <div class="clear-btn-wrap">
          <button class="pretty-btn no-btn">再想想</button>
          <button @click="emitter.emit('change','isAction')" class="pretty-btn yes-btn">知道</button>
        </div>
</template>

<script setup lang="ts" name="What">
import emitter from "@/mitt";
import { ref,onMounted } from "vue";
import { useTaskStore } from "@/stores/task";
import { useBasketStore } from "@/stores/basket";
import { selectGroupKey } from "element-plus";
import { useRoute,useRouter } from "vue-router";

const route=useRoute()
const router = useRouter()
const taskStore = useTaskStore()
const basketStore = useBasketStore()

onMounted(()=>{
  // if(route.params.type!=='works') {
  //   router.push('/basket/works/工作篮')
  // }
  taskStore.tasks=[]
  taskStore.resetTask()
  const basketIds=basketStore.getBasketIdsBytype('works')
  taskStore.loadAllTasks(basketIds[0],"works")
  // 后期删掉
  taskStore.frontInitData('works')
  taskStore.setTask(taskStore.tasks[0])
  console.log('目前工作篮的任务是',taskStore.task);
})

</script>

<style scoped>

</style>
