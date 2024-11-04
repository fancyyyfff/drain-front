<template>
  <p>完成这个行动必须你亲自来做吗？</p>
<div class="clear-btn-wrap">
          <button @click="emitter.emit('change','entrustOther')" class="pretty-btn no-btn">委托他人</button>
          <button @click="emitter.emit('change','whenTodo')" class="pretty-btn yes-btn">自己最合适</button>
        </div>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";

</script>

<style scoped>

</style>
