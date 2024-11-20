<template>
<p>恭喜你，清除了大脑的一个垃圾，减轻了负担！</p>
        <div class="clear-btn-wrap">
          <button @click="emitter.emit('closeBrainDialog')" class="pretty-btn">谢谢</button>
        </div>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";

</script>

<style scoped>

</style>
