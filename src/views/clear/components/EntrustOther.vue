<template>
  <p>请输入你的“下一步行动”，</p>
  <p>我将为你添加到“委托清单”</p>
  <input class="dialog-input shine" type="text" placeholder="请输入要委托别人去做的事">
  <p>建议写明：</p>
  <p>委托谁？何时？何地？干啥？</p>
  <button @click="emitter.emit('closeAndTips')" class="pretty-btn yes-btn">ok了</button>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";

</script>

<style scoped>

</style>
