<template>
  <p>这个行动能再2分钟内完成吗？</p>
<div class="clear-btn-wrap">
          <button @click="emitter.emit('change','whoTodo')" class="pretty-btn no-btn">否</button>
          <button @click="emitter.emit('change','nowTodo')" class="pretty-btn yes-btn">是</button>
        </div>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";

</script>

<style scoped>

</style>
