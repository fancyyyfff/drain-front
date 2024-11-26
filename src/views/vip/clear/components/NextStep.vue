<template>
  <p>思考：</p>
          <p class="dialog-work-text">{{ taskStore.task.taskName }}</p>
          <p>的下一步行动是什么？</p>
          <div class="clear-btn-wrap">
            <button class="pretty-btn no-btn">再想想</button>
            <button @click="emitter.emit('change','isQuickFinish')" class="pretty-btn yes-btn">想好了</button>
          </div>
  </template>

<script setup lang="ts" name="">
import emitter from "@/mitt";
import { useTaskStore } from "@/stores/task";
const taskStore = useTaskStore()
</script>

<style scoped>

</style>
