<template>
<NewTask>
  <template #right-clock="slotProps">
    <div class="new-task-clock" @click.stop v-if="slotProps.showClock">
      <div>
        <!-- <ion-icon name="alarm-outline" class="clock-icon"></ion-icon> -->
         <DateTimePicker ref="clock"/>
        <p>{{ clockText }}</p>
      </div>
      <div>
      <ion-icon name="calendar-outline" class="date-icon"></ion-icon>
      <p></p>
    </div>
    <div>
      <ion-icon name="reload-outline" class="circle-icon"></ion-icon>
      <p></p>
    </div>
    </div>
  </template>
</NewTask>
</template>

<script setup lang="ts" name="">
import NewTask from "@/views/menu/components/NewTask.vue";
import { ref } from "vue";
import DateTimePicker from "@/components/DateTimePicker.vue";
const clockText=ref('今天8点')
const clock = ref('')
console.log("提醒时间是",clock.value)
</script>

<style scoped>
.new-task-clock {
  display: flex;
  gap: 5%;
  margin-right: 2%;
}
.clock-icon,.date-icon,.circle-icon {
  font-size: 28px;
}
</style>
