<template>
<div class="new-task-wrap shine" @click="onClickNew">

            <div class="new-task-text" v-if="showP">
              &nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;新建任务
            </div>
            <div class="new-task-input-wrap" v-if="showInput">
              <div class="task-tick"></div>
               <input type="text" v-model="newTaskInputValue" class="taskInput dialog-input" ref="taskInput" @keyup.enter="createNewTask"
               @blur="closeInput">
            </div>
          </div>

</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";
import { ref,watch,nextTick } from "vue";
const showInput = ref(false)
const showP = ref(true)
const newTaskInputValue = ref('')
const taskInput = ref<HTMLInputElement | null>(null);
// 点击新建任务
const onClickNew = ()=>{
  showInput.value=true
  showP.value=false
}

const createNewTask = ()=>{

  // 触发新建任务事件
  emitter.emit('createNewTask',newTaskInputValue.value)
  newTaskInputValue.value = ''; // 清空输入框
}

function closeInput() {
  showInput.value=false
  showP.value=true
}

// 点击新建任务后，显示输入框，并且自动聚焦
// 监听输入框显示状态
watch(showInput, async (newVal) => {
  if (newVal) {
    newTaskInputValue.value = ''; // 清空输入框内容
    await nextTick();  // 确保 DOM 更新完成后执行
    taskInput.value?.focus();  // 自动聚焦
  }
});
</script>

<style scoped>
  .new-task-wrap {
      display: flex;
      width: 95%;
      height: 90%;
      /* background-color: white; */
      border-radius: 10px;
      .new-task-text {
        display: flex;
        align-items: center;
        /* height: 100%; */
        /* line-height: 100%; */
        font-size: 1.2rem;
        text-align: center;
      }

      .new-task-input-wrap {
        display: flex;
        position: relative;
        width: 100%;
        align-items: center;
        margin-left: 1%;
        justify-content: space-between;

        .taskInput {
          flex:1;
          width: 100%;
          padding-left: 6%;

        }

      }

    }

</style>
