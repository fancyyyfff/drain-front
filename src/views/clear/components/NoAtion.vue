<template>
        <p class="dialog-work-text">获取工作篮的第i项</p>
        <p>对你来说，它是垃圾还是想法</p>
        <div class="clear-btn-wrap">
          <button @click="emitter.emit('change','rubbish')" class="pretty-btn no-btn">垃圾</button>
          <button @click="emitter.emit('change','thought')" class="pretty-btn yes-btn">想法</button>
        </div>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";
</script>

<style scoped>

</style>
