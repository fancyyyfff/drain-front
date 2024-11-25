<template>
<div class="new-task-wrap shine" @click="onClickNew">

            <div class="new-task-text" v-if="showP">
              &nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;新建任务
            </div>
            <div class="new-task-input-wrap" v-if="showInput">
              <div class="task-tick"></div>
               <input type="text" v-model="newTaskInputValue" class="taskInput dialog-input" ref="taskInput" @keyup.enter="createNewTask"
               @blur="closeInput" @input="sendSlotClock">
               <slot name="right-clock"></slot>
            </div>
          </div>
          
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";
import { inputEmits } from "element-plus";
import { fa } from "element-plus/es/locales.mjs";
import { ref,watch,nextTick,computed } from "vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "@/stores/task";

const taskStore= useTaskStore()
const route = useRoute()
const showInput = ref(false)
const showP = ref(true)
const newTaskInputValue = ref('')
const taskInput = ref<HTMLInputElement | null>(null);

const currentRouteKey = computed(() => route.params.routeKey as string || '');
// 点击新建任务
const onClickNew = ()=>{
  showInput.value=true
  showP.value=false
}

function createNewTask (){
  if(newTaskInputValue.value.trim()===''){
    return
  }
  let taskName=newTaskInputValue.value
  let basketId=-1
  let deadline='' //默认 ''
  const task = {taskName,basketId,deadline}
   // 获取当前路由键，避免依赖计算属性
   const routeKey = route.params.routeKey as string || '';
  // 处理ddl的新建任务
  if( routeKey==='ddl') {
      if(taskStore.deadline) {
        task.deadline=taskStore.deadline
        emitter.emit('createNewTask',task)
        // 清空，实现复用
        taskStore.deadline=''
        newTaskInputValue.value = ''; // 清空输入框
        return
      }else {
        alert('DDL清单必须要有截至时间设定哦！')
        console.error('DDL清单添加任务时没有截至时间设定')
        return
      }
    }else {
        emitter.emit('createNewTask',task)
    }

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

const showClock = ref(false)
function sendSlotClock() {
  // 如果是ddl就展示右侧有时间提醒的组件
  showClock.value=true;
}
</script>

<style scoped>
  .new-task-wrap {
      display: flex;
      position: relative;
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
        /* position: relative; */
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
