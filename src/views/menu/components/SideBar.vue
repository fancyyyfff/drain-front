<template>
 <!-- 侧边栏 -->
 <aside :class="{ 'sidebar-open': sidebarOpen }" class="sidebar">
      <div class="sidebar-content-wrap">
        <div class="close" @click="toggleSidebar">
        <img src="@/assets/close.svg" alt="">
          </div>
        <div class="main-content">
          <div class="task-wrap shine" >
            <div class="task-tick"></div>
  <!-- <p class="task-text">{{taskValue}}</p> -->
                <p class="task-text">界面优化</p>
              <img src="@/assets/start.svg" class="start" alt="">
            </div>

            <div class="task-wrap shine add-action" >
            <img src="" alt="">
  <!-- <p class="task-text">{{taskValue}}</p> -->
                <p class="sidebar-text">加到行动清单</p>
            </div>

            <div class="task-wrap shine add-action" >
            <img src="" alt="">
  <!-- <p class="task-text">{{taskValue}}</p> -->
                <p class="sidebar-text">添加提醒日期</p>
            </div>

            <div class="task-wrap shine add-action" >
            <img src="" alt="">
  <!-- <p class="task-text">{{taskValue}}</p> -->
                <p class="sidebar-text">添加附件</p>
            </div>

            <div class="task-wrap shine add-action" id="other">
            <img src="" alt="">
  <!-- <p class="task-text">{{taskValue}}</p> -->
                <p class="sidebar-text">添加备注</p>
            </div>

            <div class="task-wrap shine add-action" >
            <img src="" alt="">
  <!-- <p class="task-text">{{taskValue}}</p> -->
                <p class="sidebar-text">#&nbsp;&nbsp;添加标签</p>
            </div>

          </div>

        <footer class="create">创建于2024年11月1日</footer>
  </div>

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

/* 布局基础样式
.app-container {
  display: flex;
} */
/* 侧边栏样式 */
.sidebar {
  position: relative;
  width: 0;
  height: 98vh;
  align-items: center;
  background-image: linear-gradient(to top,#e2dede 0.1%, #aaa5ae 99.9%);
  /* background-color: white; */
  overflow: hidden;
  transition: width 0.3s ease; /* 添加过渡效果 */

  .sidebar-content-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 736px;

    .close {
    flex:1;
    position: absolute;
    right: 10px;
    top: 10px;
    }
  .main-content {
    flex:8;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* margin-top: 50px; */
    align-items: center;

    }

  .create {
    flex:1;
    border-top: 1px solid white;
  }

  }



}

.sidebar-open {
  width: 350px; /* 侧边栏打开时的宽度 */
}

/* 主内容样式 */
.main-content {
  display: flex;
  align-items: center;
  flex: 1;
  margin-top: 40px;
  background-color: #f0f0f0;


  }

  /* 单个任务的： */
  .task-wrap {
      display: flex;
      position: relative;
      width: 70%;
      height: 50px;
      padding:0 40px 0 40px;
    background: rgba(244, 231, 231, 0.2); /* 半透明白色背景 */
      border-radius: 10px;
      align-items: center;
      gap: 20px;

      .task-tick {
        position: absolute;
        width: 20px;
        height: 20px;
        left: 2%;
        border-radius: 50% ;
        border: 3px solid rgb(254, 246, 246);
        background-color: transparent;
      }

      .task-text {
        font-size: 1.5rem;
        color: rgb(174, 164, 164);
        font-weight:700;
        margin-left:4%;
      }

      .start {
        position: absolute;
        right: 3%;
      }
}

.sidebar-text {
  font-size: 1.2rem;
  color: #afa5a5;
}

#other {
  height: 20%;
}
</style>
