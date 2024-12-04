<template>
  <p>请输入你的“下一步行动”，</p>
  <p>我将为你添加到“截至日期”</p>
  <input class="dialog-input shine" type="text" placeholder="请输入有时间要求的事" v-model="taskName">
  <DateTimePicker></DateTimePicker>
  <p>建议：</p>
  <p>只写对时间有刚性要求的</p>
  <button @click="handleOk" class="pretty-btn yes-btn">ok了</button>
</template>

<script setup lang="ts" name="">
import emitter from "@/mitt";
import dayjs from 'dayjs';
import DateTimePicker from "@/components/DateTimePicker.vue";
import { ref,computed } from "vue";
import { addTask } from "@/api/task";
import { useTaskStore } from "@/stores/task";
import { useBasketStore } from "@/stores/basket";
const taskStore = useTaskStore()
const basketStore = useBasketStore()

const currentDeadline = computed(()=>taskStore.deadline)
const inputDeadline = ref('')
const taskName = ref('')
let deadline = inputDeadline.value
async function handleOk() {

  // emitter.emit('closeAndTips')

  if(taskName) {
    if(deadline) {
        deadline=currentDeadline.value
      }else {
        const currentDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
        console.log("currentDateTime",currentDateTime);
        deadline=currentDateTime
      }
      // 清空，实现复用
      taskStore.clearSideBarDeadline()
    const task = {
      basketId:basketStore.basketList[0].basketId,
      taskName:taskName.value,
      deadline:deadline
    }
    try {
      const res= await addTask(task)
      if(res.status % 2 === 1) {
        // 删除进入工作篮的任务
        const deleteTask = {
          basketId:basketStore.basketList[3].basketId,
          taskId:res.data.taskId
        }
       await taskStore.deleteDrainTask(deleteTask)
        emitter.emit('closeAndTips')
      }
    } catch (error) {
      console.error('新建任务失败', error);
    }
  }
}
</script>

<style scoped>

</style>
