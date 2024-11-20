<template>
  <p>请输入你的“下一步行动”，</p>
  <p>我将为你添加到“行动清单”</p>
  <input class="dialog-input shine" type="text" placeholder="请输入你要尽快完成的事情">
  <p>建议：</p>
  <p>写得具体，看一眼就能知道怎么做的</p>
  <button @click="emitter.emit('closeAndTips')" class="pretty-btn yes-btn">ok了</button>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";

</script>
