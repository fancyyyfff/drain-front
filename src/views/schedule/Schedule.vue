<template>
<SideBar>
  <template #ddl>
    <div>
      ddl
    </div>
  </template>
</SideBar>
</template>

<script setup lang="ts" name="schedule">
import  SideBar from "@/views/menu/components/SideBar.vue";
console.log('ddl组件挂载')
// import { onMounted } from "vue";
// import emitter from "@/mitt";
// import { useSideBarStore } from "@/stores/ui";

// const sideBarStore = useSideBarStore()
//   emitter.on('scheduleOpenSideBar', () => {
//     sideBarStore.toggleSidebar();
//   });


</script>

<style scoped>

</style>
