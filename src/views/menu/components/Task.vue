<template>
<div class="task-wrap shine" @click="openSideBar">
  <div class="task-tick"></div>
  <!-- <p class="task-text">{{taskValue}}</p> -->
  <p class="task-text">界面优化</p>
  <img src="@/assets/start.svg" class="start" alt="">
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
      position: relative;
      width: 96%;
      height: 50px;
      padding:0 20px 0 20px;
    background: rgba(244, 231, 231, 0.2); /* 半透明白色背景 */
      border-radius: 10px;
      align-items: center;

      .task-tick {
        position: absolute;
        width: 20px;
        height: 20px;
        left: 2%;
        border-radius: 50% ;
        border: 3px solid rgb(254, 246, 246);
        background-color: transparent;
      }

      .task-text {
        font-size: 1.5rem;
        color: rgb(174, 164, 164);
        font-weight:700;
        margin-left:4%;
      }

      .start {
        position: absolute;
        right: 3%;
      }
}
</style>
