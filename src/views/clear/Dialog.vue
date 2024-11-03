<template>
<div class="dialog-wrap">
  <div class="dialog shine" @click.stop>
    <div class="component-wrap">
      <component :is="currentComponent"></component>
    </div>

  </div>
</div>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";
import { ref,computed } from "vue";
import Enter from "@/views/clear/components/Enter.vue";
import What from "@/views/clear/components/What.vue";
import IsAction from "@/views/clear/components/IsAction.vue";
import NoAtion from "./components/NoAtion.vue";
import Thought from "@/views/clear/components/Thought.vue";
import Rabbish from "@/views/clear/components/Rabbish.vue";
const components = {
  enter:Enter,
  what:What,
  isAction:IsAction,
  noAction:NoAtion,
  thought:Thought,
  rubbish:Rabbish,
}

const currentComponent =ref(components.enter)
emitter.on('change',(componentName)=>{
  if(typeof componentName === 'string' && componentName in components){
    currentComponent.value=components[componentName as keyof typeof components]

  }
})

</script>

<style scoped>
.dialog-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7); /* 半透明黑色背景 */
  display: flex;
  justify-content: center;
  align-items: center; /* 垂直居中 */

}

.dialog {
  border-radius: 8px;
  width: 600px; /* 弹窗宽度 */
}
.component-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center; /* 文字居中 */
  color: #ccc;
  height: 500px;
  row-gap: 2vh;
}



</style>
