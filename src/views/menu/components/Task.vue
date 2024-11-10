<template>
<div class="task-wrap shine" @click="openSideBar">
  <div class="task-tick"></div>
  <!-- <p class="task-text">{{taskValue}}</p> -->
  <p class="task-text">{{ taskName }}</p>
  <img src="@/assets/start.svg" class="start" alt="">
</div>
</template>

<script setup lang="ts" name="">
import { ref } from 'vue'
import { defineProps } from 'vue';
import emitter from "@/mitt";
defineProps({
  taskName: {
    type: String,
    required: true,
  },
})
const drawer = ref(false)

const openSideBar = ()=>{

  emitter.emit('toggleSidebar','传输的任务数据')
}

// defineExpose({
//   openSideBar,
// })

</script>

<style scoped>
.task-wrap {
      display: flex;
      position: relative;
      width: 96%;
      height: 50px;
      padding:0 20px 0 20px;
    background: rgba(130, 127, 127, 0.2); /* 半透明白色背景 */
      border-radius: 10px;
      align-items: center;

      .task-text {
        font-size: 1.5rem;
        color: rgb(255, 255, 255);
        text-shadow:
    0 0 2px rgba(255, 255, 255, 0.5), /* 轻微的白色光晕 */
    0 0 3px rgba(255, 255, 255, 0.3); /* 更大的模糊光晕 */
        font-weight:700;
        margin-left:4%;
      }

      .start {
        position: absolute;
        right: 3%;
      }
}
</style>
