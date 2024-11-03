<template>
<p>思考：</p>
        <p class="dialog-work-text">获取工作篮的第i项</p>
        <p>需要对它采取行动吗？</p>
        <div class="clear-btn-wrap">
          <button @click="emitter.emit('change','noAction')" class="pretty-btn no-btn">否</button>
          <button @click="emitter.emit('change','isMultitask')" class="pretty-btn yes-btn">是</button>
        </div>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";

</script>

<style scoped>

</style>
