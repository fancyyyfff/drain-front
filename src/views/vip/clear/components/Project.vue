<template>
<!-- <p>已把</p> -->
        <!-- <p class="dialog-work-text">{{ taskStore.drainTask.taskName }}</p> -->
        <p>已添加到“多步骤任务”清单</p>
        <p>你可以选择“思考下一步”</p>
        <div class="clear-btn-wrap">
          <button @click="emitter.emit('closeBrainDialog')" class="pretty-btn no-btn">结束</button>
          <button @click="emitter.emit('change','nextStep')" class="pretty-btn yes-btn">下一步</button>
        </div>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";
import { useTaskStore } from "@/stores/task";
const taskStore = useTaskStore()

</script>

<style scoped>

</style>
