<template>
 <!-- 侧边栏 -->
 <aside :class="{ 'sidebar-open': sidebarOpen }" class="sidebar">

  <!-- 顶部固定的关闭和标签 -->
      <!-- 顶部 -->
      <header class="sidebar-header">
        <div class="close" @click="toggleSidebar">
        <img src="@/assets/close.svg" alt="" class="close-img">
        </div>

        <div class="sidebar-tag">
          <div class="sidebar-tag-text-wrap">
            <div>标签1</div>
          </div>
          <div class="sidebar-tag-more">></div>
        </div>
      </header>

        <!-- 主要内容： -->
        <div class="sidebar-main-content">
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

          <!-- 底部 -->
        <footer class="sidebar-footer">
          <div class="sidebar-tag"># 点击输入</div>
          <div class="sidebar-create">创建于2024年11月1日</div>
        </footer>

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
/* 侧边栏样式 */
.sidebar {

  width: 0;
  height: 96vh;
  min-height: 250px;
  /* align-items: center; */
  overflow: hidden;
  transition: width 0.3s ease; /* 添加过渡效果 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .sidebar-header,.sidebar-footer {
    width: 350px;
    height: 70px;
  }

  /* 侧边栏头部部分 */
  .sidebar-header {
    display: grid;
    grid-template-rows: 0.9fr 1.1fr;

    .close {
      position: relative;

      .close-img {
        position: absolute;
        right: 15px;
        top: 10px;
      }
    }

    /* 标签 */
    .sidebar-tag {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 10px;
      padding-right: 25px;
      border-top: 0.5px solid rgba(255, 255, 255, 0.2);
      border-bottom: 0.5px solid  rgba(255, 255, 255, 0.2);

      /* 包裹的标签文字 */
      .sidebar-tag-text-wrap {


      }

      .sidebar-tag-more {
        width: 20px;
        height: 20px;

      }

    }
    
  }

  /* 侧边栏主体部分 */
  .sidebar-main-content {
    flex:1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* margin-top: 50px; */
    align-items: center;

    }


  }




.sidebar-open {
  width: 350px; /* 侧边栏打开时的宽度 */
}

/* 主内容样式 */
.sidebar-main-content {
  display: flex;
  align-items: center;
  flex: 1;
  margin-top: 40px;
  }

  /* 单个任务的： */
  .task-wrap {
      display: flex;
      position: relative;
      width: 70%;
      height: 50px;
      padding:0 40px 0 40px;
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
}

#other {
  height: 20%;
}
</style>
