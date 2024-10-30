<template>
 <!-- 侧边栏 -->
 <aside :class="{ 'sidebar-open': sidebarOpen }" class="sidebar">
      <div class="close" @click="toggleSidebar">
        <img src="@/assets/close.svg" alt="">
      </div>
      <div class="form-wrap">表单内容</div>
      <p>这是一个侧边栏</p>

    </aside>
</template>

<script setup lang="ts" name="">
import { ref,onMounted,onBeforeUnmount } from 'vue';
import emitter from "@/mitt";
const sidebarOpen = ref(false); // 控制侧边栏的状态
// const sidebarOpen = ref(true);
// 切换侧边栏状态
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
const handleToggleSidebar = ()=>{
  // 先切换状态
  toggleSidebar()
  // 如果是打开状态，就渲染数据
  // 待：
}

onMounted(()=>{
  emitter.on('toggleSidebar',handleToggleSidebar)
})

onBeforeUnmount(() => {
  emitter.off('toggleSidebar', handleToggleSidebar); // 清除监听
});
</script>

<style scoped>
/* 布局基础样式 */
.app-container {
  display: flex;
}
/* 侧边栏样式 */
.sidebar {
  position: relative;
  width: 0;
  height: 100vh;
  align-items: center;
  background-color: white;
  overflow: hidden;
  transition: width 0.3s ease; /* 添加过渡效果 */

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .form-wrap {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    align-items: center;

  }
}

.sidebar-open {
  width: 350px; /* 侧边栏打开时的宽度 */
}

/* 主内容样式 */
.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f0f0f0;
}
</style>
