<template>
<div class="brain-wrap" @click="emitter.emit('openBrainDialog')">
              <div class="brain">

              </div>
              <div class="brain-text" >头脑风暴</div>
</div>

</template>

<script setup lang="ts" name="">
import { ref,computed } from "vue";
import Dialog from "@/views/clear/Dialog.vue";
import emitter from "@/mitt";


</script>

<style scoped>
.brain-wrap {
      flex:1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .brain {
        flex:2;
        width: 30px;
        height: 30px;
        border-radius: 50%; /* 使其成为圆形 */
        background: radial-gradient(circle, rgb(224, 204, 224) 0%, rgba(87, 71, 98, 0.8) 60%, rgba(106, 104, 104, 0) 100%); /* 紫色渐变 */
        box-shadow: 0 0 30px rgba(83, 51, 83, 0.5), 0 0 60px rgba(73, 52, 87, 0.5); /* 紫色的模糊阴影 */
      }
      .brain-text {
        flex:1;
        font-size: 0.8rem;
      }
}

</style>
