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
import Enter from "@/views/vip/clear/components/Enter.vue";
import What from "@/views/vip/clear/components/What.vue";
import IsAction from "@/views/vip/clear/components/IsAction.vue";
import NoAtion from "./components/NoAtion.vue";
import Thought from "@/views/vip/clear/components/Thought.vue";
import Rabbish from "@/views/vip/clear/components/Rabbish.vue";
import IsMultitask from "@/views/vip/clear/components/IsMultitask.vue";
import Project from "@/views/vip/clear/components/Project.vue";
import NextStep from "@/views/vip/clear/components/NextStep.vue";
import IsQuickFinish from "@/views/vip/clear/components/IsQuickFinish.vue";
import NowTodo from "@/views/vip/clear/components/NowTodo.vue";
import WhoTodo from "@/views/vip/clear/components/WhoTodo.vue";
import EntrustOther from "@/views/vip/clear/components/EntrustOther.vue";
import WhenTodo from "@/views/vip/clear/components/WhenTodo.vue";
import SheduleTodo from "@/views/vip/clear/components/SheduleTodo.vue";
import ToActionList from "@/views/vip/clear/components/ToActionList.vue";
const components = {
  enter:Enter,
  what:What,
  isAction:IsAction,
  noAction:NoAtion,
  thought:Thought,
  rubbish:Rabbish,
  isMultitask:IsMultitask,
  project:Project,
  nextStep:NextStep,
  isQuickFinish:IsQuickFinish,
  nowTodo:NowTodo,
  whoTodo:WhoTodo,
  entrustOther:EntrustOther,
  whenTodo:WhenTodo,
  sheduleTodo:SheduleTodo,
  toActionList:ToActionList

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
