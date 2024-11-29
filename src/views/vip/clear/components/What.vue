<template>
        <p>首先来看</p>
        <p class="dialog-work-text">{{ taskStore.drainTask.taskName }}</p>
        <p>你清楚这要干什么吗？</p>
        <div class="clear-btn-wrap">
          <button class="pretty-btn no-btn">再想想</button>
          <button @click="emitter.emit('change','isAction')" class="pretty-btn yes-btn">知道</button>
        </div>
</template>

<script setup lang="ts" name="What">
import emitter from "@/mitt";
import { useTaskStore } from "@/stores/task";

const taskStore = useTaskStore()



</script>

<style scoped>

</style>
