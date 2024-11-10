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

          <div class="detail-wrap shine" >
            <div class="task-tick"></div>
            <p class="task-text">界面优化</p>
            <img src="@/assets/start.svg" class="start" alt="">
          </div>

            <div class="detail-wrap shine add-action" >
                <img src="" alt="">
                <p class="detail-text">添加附件</p>
              </div>

              <!-- 备注 -->
               <!-- <div class="detail-wrap remarks-wrap">
                 <div class="div-edit remarks-div shine" contenteditable="true" @input="onInput" style="display: line-block; width: 100%; min-height: 100px;"></div>
               </div> -->
               <div class="div-edit remarks-div shine" contenteditable="true"
                  :data-placeholder="placeholderText"
                  @input="onInput"
                  @focus="onFocus"
                  @blur="onBlur"
                  ref="editableDiv"
               ></div>
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
import { da } from 'element-plus/es/locales.mjs';
const sidebarOpen = ref(false); // 控制侧边栏的状态
// const sidebarOpen = ref(true);
// 切换侧边栏状态
const toggleSidebar = () => {

  sidebarOpen.value = !sidebarOpen.value;

};
const handleToggleSidebar = (data:unknown)=>{
  // 先切换状态
  toggleSidebar()
  // 如果是打开状态，就渲染数据
  // 待：
  console.log("打开侧边栏时接受到的数据"+data)
}



onBeforeUnmount(() => {
  emitter.off('toggleSidebar', handleToggleSidebar); // 清除监听
});

// div实现的文本编辑框，在其中添加占位的内容
// const editableDiv = ref(null);
const editableDiv = ref<HTMLDivElement | null>(null);
const placeholderText = "请输入内容...";
onMounted(()=>{
  emitter.on('toggleSidebar',handleToggleSidebar)
  // 初始时，如果没有内容，显示 placeholder
  const div = editableDiv.value;
  if (div && div.innerHTML.trim() === '') {
    div.classList.add('placeholder');
  }
})

const onInput = () => {
  const div = editableDiv.value;
  // 当用户输入内容时清除 placeholder
  if (div && div.innerHTML.trim() !== '') {
    div.classList.remove('placeholder');
  } else {
    if(div) div.classList.add('placeholder');
  }
};

const onFocus = () => {
  // 在聚焦时，如果没有内容，显示 placeholder
  const div = editableDiv.value;
  if (div && div.innerHTML.trim() === '') {
    div.classList.add('placeholder');
    div.classList.add('div-edit-focus');

  }
};

const onBlur = () => {
  const div = editableDiv.value;
  if(div) div.classList.remove('div-edit-focus');
  // 当失去焦点时，如果没有内容，则显示 placeholder
  if (div && div.innerHTML.trim() === '') {
    div.classList.add('placeholder');
  }
};


</script>

<style lang="scss" scoped>
/* 文本编辑框中写入的内容 */
@mixin div-edit-before {
        content: attr(data-placeholder);
        color: #d7d6d6;
        position: absolute;
        top: 20px;
        left: 20px;
        pointer-events: none;
}

.sidebar-open {
    width: 350px; /* 侧边栏打开时的宽度 */
}

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
    row-gap: 10px;
    padding-top: 20px;

    /* 文本编辑框 */
    .remarks-div {
      position: relative;
    }

      .placeholder::before {
        @include div-edit-before();

      }

      .placeholder:empty::before {
        @include div-edit-before();
      }


    /* 单个任务的： */
    .detail-wrap {
      display: flex;
      position: relative;
      width: 70%;
      height: 50px;
      padding:0 40px 0 40px;
      gap: 20px;
      border-radius: 10px;
      align-items: center;

      .task-text {
        font-size: 1.5rem;
        font-weight:700;
        margin-left:4%;
      }

      .start {
        position: absolute;
        right: 3%;
      }

      .detail-text {
        font-size: 1.2rem;
      }

    }

  }

  .sidebar-footer {
    display: grid;
    grid-template-rows: 1fr 1fr;
  }

}


</style>
