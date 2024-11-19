<template>
<NewTask>
  <template #right-clock>
    <div class="new-task-clock">
      <ion-icon name="alarm-outline" class="clock-icon"></ion-icon>
      <ion-icon name="calendar-outline" class="date-icon"></ion-icon>
      <ion-icon name="reload-outline" class="circle-icon"></ion-icon>
    </div>
  </template>
</NewTask>
</template>

<script setup lang="ts" name="">
import NewTask from "@/views/menu/components/NewTask.vue";
</script>

<style scoped>
.new-task-clock {
  display: flex;
  gap: 5%;
}
.clock-icon,.date-icon,.circle-icon {
  font-size: 28px;
}
</style>
