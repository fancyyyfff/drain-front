<template>
<NewTask>
  <template #right-clock @click.stop>
    <div class="block">
      <el-date-picker
        v-model="taskStore.deadline"
        type="datetime"
        placeholder="Pick a Date"
        format="YYYY-MM-DD HH:mm:ss"
        date-format="MMM DD, YYYY"
        time-format="HH:mm"
        value-format="YYYY-MM-DD HH:mm:ss"
        visible-change="true"
        @click.stop

      />
    </div>
  </template>
</NewTask>
</template>

<script setup lang="ts" name="">
import NewTask from "@/views/menu/components/NewTask.vue";
import { ref,computed, watch } from "vue";
import DateTimePicker from "@/components/DateTimePicker.vue";
import { useTaskStore } from "@/stores/task";
const taskStore= useTaskStore()
const clockText=ref('今天8点')
console.log("提醒时间是",taskStore.deadline)
console.log('路由一变化就切换到这里了')
</script>

<style scoped>
.block {
  z-index:999;
  padding: 30px 0;
  text-align: center;
  position: absolute;
  right: 10px;
  /* top: 2px;
  bottom: 2px; */
}
</style>
