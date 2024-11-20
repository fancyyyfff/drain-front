<template>
  <p>立即执行这个行动把！</p>
  <p>不然它会耗费你的心志的！</p>
  <button @click="emitter.emit('closeAndTips')" class="pretty-btn no-btn">现在就去！</button>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";
</script>

<style scoped>

</style>
