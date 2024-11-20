<template>
        <p>首先来看</p>
        <p class="dialog-work-text">{{ workText }}</p>
        <p>你清楚这要干什么吗？</p>
        <div class="clear-btn-wrap">
          <button class="pretty-btn no-btn">再想想</button>
          <button @click="emitter.emit('change','isAction')" class="pretty-btn yes-btn">知道</button>
        </div>
</template>

<script setup lang="ts" name="What">
import emitter from "@/mitt";
import { ref } from "vue";
const workText =ref('获取工作篮的第i项')

</script>

<style scoped>

</style>
