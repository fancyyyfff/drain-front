<template>
<NewTask>
  <template #right-clock @click.stop>
    <DateTimePicker></DateTimePicker>
  </template>
</NewTask>
</template>

<script setup lang="ts" name="">
import NewTask from "@/views/menu/components/NewTask.vue";
import DateTimePicker from "@/components/DateTimePicker.vue";
import { useTaskStore } from "@/stores/task";
const taskStore= useTaskStore()


</script>

<style scoped>

</style>
