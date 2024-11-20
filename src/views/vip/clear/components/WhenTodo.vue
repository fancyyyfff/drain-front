<template>
  <p>这个行动必须要在某个时间做吗？还是尽快完成？</p>
<div class="clear-btn-wrap">
          <button @click="emitter.emit('change','sheduleTodo')" class="pretty-btn no-btn">某个时间做</button>
          <button @click="emitter.emit('change','toActionList')" class="pretty-btn yes-btn">尽快完成</button>
        </div>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";

</script>

<style scoped>

</style>
