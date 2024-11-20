<template>
  <h4>欢迎进入头脑风暴</h4>
  <p>现在即将进入清空工作篮的头脑风暴，<br>找个安静的时间，跟随我一起清空大脑吧！<br>
    注意：中途不可以放弃哦!</p>
  <div class="clear-btn-wrap">
    <button @click="emitter.emit('closeBrainDialog')" class="pretty-btn no-btn">不了</button>
    <button @click="emitter.emit('change','what')" class="pretty-btn yes-btn">好！</button>
  </div>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";
</script>

<style scoped>

</style>
