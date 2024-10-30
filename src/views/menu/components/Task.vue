<template>
<div class="task-wrap" @click="openSideBar">
  <div class="task-tick">|>|</div>
  <!-- <p class="task-text">{{taskValue}}</p> -->
  <p class="task-text">任务</p>
  <div class="start">*</div>
</div>
</template>

<script setup lang="ts" name="">
import { ref } from 'vue'
import { defineProps } from 'vue';
import emitter from "@/mitt";
// defineProps({
//   taskValue: {
//     type: String,
//     required: true,
//   },
// })
const drawer = ref(false)

const openSideBar = ()=>{
  emitter.emit('toggleSidebar','传输的任务数据')
}

defineExpose({
  openSideBar,
})

</script>

<style scoped>
.task-wrap {
  display: flex;
      width: 96%;
      height: 50px;
      background-color: white;
      border-radius: 10px;
      align-items: center;

      .task-tick {
        width: 20px;
        height: 20px;
      }
}
</style>
