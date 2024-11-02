<template>
<div class="new-task-wrap shine" @click="onClickNew">
            <div class="new-task-text" v-if="showP">
              <p>&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;新建任务</p>
            </div>
            <div class="new-task-input-wrap" v-if="showInput">
              <img src="@/assets/task-circle.svg" alt="" class="task-circle">
              <el-input v-model="newTaskInputText" style="width: 240px" class="taskInput" @keyup.enter="createNewComponent"/>
              <div class="task-icons">右侧的三个小图标</div>
            </div>
          </div>

</template>

<script setup lang="ts" name="">
import { ref } from "vue";
const showInput = ref(false)
const showP = ref(true)
const newTaskInputText = ref('')
// 点击新建任务
const onClickNew = ()=>{
  showInput.value=true
  showP.value=false
}

const createNewComponent = ()=>{
  console.log('回车事件，获取用户输入，新建组件')
}

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
        color: rgb(148, 158, 166);
        font-size: 1.2rem;
        text-align: center;
      }

      .new-task-input-wrap {
        display: flex;
        width: 100%;
        align-items: center;
        margin-left: 1%;
        justify-content: space-between;

        .task-circle {
          width: 25px;
        }
        .taskInput {
          flex:1;

        }
        .task-icons {
          width: 120px;
          height: 40px;
        }

      }

    }

</style>
