<template>

<SideBar>
  <template #ddl>
    <DateTimePicker></DateTimePicker>
  </template>
</SideBar>
</template>

<script setup lang="ts" name="">
import SideBar from "@/views/menu/components/SideBar.vue";
import DateTimePicker from "@/components/DateTimePicker.vue";
import { useTaskStore } from "@/stores/task";
const taskStore= useTaskStore()
</script>

<style scoped>

</style>
