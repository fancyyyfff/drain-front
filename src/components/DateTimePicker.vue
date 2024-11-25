<template>
 <div class="block">
      <el-date-picker
        v-model="taskStore.deadline"
        type="datetime"
        placeholder="Pick a Date"
        format="YYYY-MM-DD HH:mm:ss"
        date-format="MMM DD, YYYY"
        time-format="HH:mm"
        value-format="YYYY-MM-DD HH:mm:ss"
        @change="handleClockChange"
        @click.stop

      />
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useTaskStore } from "@/stores/task";
import { updateTaskDeadline } from '@/api/task';
const taskStore= useTaskStore()

console.log("提醒时间是",taskStore.deadline)
console.log('路由一变化就切换到这里了')

async function handleClockChange() {
  if(taskStore.deadline) {
    try {
      const res = await updateTaskDeadline(taskStore.task.taskId,taskStore.deadline)
    if(res.status===2003) {
      // 更新pinia的值
      updateTaskDeadline(taskStore.task.taskId,taskStore.deadline)
    }
    } catch (error) {
      console.error('修改任务的截至时间失败', error);
    }
  }
}
</script>
<style scoped>
.block {
  text-align: center;
}
:deep(.el-date-picker){
  color: white;
}

</style>
