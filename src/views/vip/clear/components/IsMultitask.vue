<template>
<p>你认为</p>
        <p class="dialog-work-text">获取工作篮的第i项</p>
        <p>是一个多步骤任务吗？</p>
        <div class="clear-btn-wrap">
          <button @click="emitter.emit('change','nextStep')" class="pretty-btn no-btn">否</button>
          <button @click="emitter.emit('change','project')" class="pretty-btn yes-btn">是</button>
        </div>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";

</script>

<style scoped>

</style>
