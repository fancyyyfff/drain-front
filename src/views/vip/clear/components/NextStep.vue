<template>
  <p>思考：</p>
          <p class="dialog-work-text">获取工作篮的第i项</p>
          <p>的下一步行动是什么？</p>
          <div class="clear-btn-wrap">
            <button class="pretty-btn no-btn">再想想</button>
            <button @click="emitter.emit('change','isQuickFinish')" class="pretty-btn yes-btn">想好了</button>
          </div>
  </template>

<script setup lang="ts" name="">
import emitter from "@/mitt";

</script>

<style scoped>

</style>
