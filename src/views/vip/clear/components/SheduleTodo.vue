<template>
  <p>请输入你的“下一步行动”，</p>
  <p>我将为你添加到“计划内”</p>
  <input class="dialog-input shine" type="text" placeholder="请输入有时间要求的事">
  <p>建议：</p>
  <p>只写对时间有刚性要求的</p>
  <button @click="emitter.emit('closeAndTips')" class="pretty-btn yes-btn">ok了</button>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";

</script>

<style scoped>

</style>
