<template>
        <p>我已为你添加到“想法”清单，定期回顾它吧！</p>
        <div class="clear-btn-wrap">
          <button @click="emitter.emit('closeBrainDialog')" class="pretty-btn">谢谢</button>
        </div>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";

</script>

<style scoped>

</style>
