<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu class="el-menu-vertical-demo" router>
        <div class="user-search">
          <UserInfo>用户信息</UserInfo>
        <!-- <div>搜索框</div> -->
        <el-input
      v-model="searchText"
      placeholder="搜索"
      :suffix-icon="Search"
       class="search-input"
    />
        </div>
              <el-menu-item index="actions">
                <el-icon><House /></el-icon>
               <span>行动清单</span>
              </el-menu-item>

              <el-menu-item index="importance">
                <el-icon><House /></el-icon>
               <span>重要</span>
              </el-menu-item>

              <el-menu-item index="schedule">
                <el-icon><House /></el-icon>
               <span>计划内</span>
              </el-menu-item>

              <el-menu-item index="works">
                <el-icon><House /></el-icon>
               <span>工作篮</span>
              </el-menu-item>

              <el-menu-item index="goals">
                <el-icon><House /></el-icon>
               <span>项目</span>
              </el-menu-item>

              <el-menu-item index="thoughts">
                <el-icon><House /></el-icon>
               <span>想法</span>
              </el-menu-item>

              <el-menu-item index="entrust">
                <el-icon><House /></el-icon>
               <span>委托</span>
              </el-menu-item>

              <el-menu-item index="tags">
                <el-icon><House /></el-icon>
               <span>标签</span>
              </el-menu-item>



        </el-menu>
            <div class="left-nav-footer">
                <div class="two-specail">
                  <div class="evail-wrap" @click="onClickClear">
                    <img src="@/assets/clear-evail.svg" alt="" class="special-img"/>
                    <p class="specail-p-text">进入头脑风暴</p>
                  </div>

                  <div class="ai-wrap" @click="onClickClear">
                    <img src="@/assets/ai.svg" alt="" class="special-img"/>
                    <p class="specail-p-text">ai帮我计划</p>
                  </div>

              </div>

              <div class="new" > +&nbsp;&nbsp;&nbsp;新建列表</div>

              </div>





              <!-- <footer class="left-nav-footer">
                <div class="two-specail">
                  <div class="clear-wrap" @click="onClickClear">
                    <img src="@/assets/clear-evail.svg" alt="" class="clear-evail"/>
                    <p class="clear-p-text">进入头脑风暴</p>
                  </div>

                  <div class="ai-wrap" @click="onClickClear">
                    <img src="@/assets/ai.svg" alt="" class="ai-img"/>
                    <p class="ai-p-text">ai帮我计划</p>
                  </div>

              </div>

              <div class="new" > +  新建列表</div>

              </footer> -->
      </el-aside>


  <el-container class="right">

        <el-header class="right-top">Header</el-header>
        <!-- 主题内容 -->
      <el-main class="right-main">
        <router-view>
          <!-- <Task v-for="(taskValue, index) in tasks"
        :key="index"
        :taskValue="taskValue"></Task> -->

          <Task ref="sideBar"></Task>


        </router-view>
      </el-main>
        <el-footer class="right-footer">
          <NewTask></NewTask>
        </el-footer>

      </el-container>

      <!-- 放侧边栏 -->

      <SideBar></SideBar>




    </el-container>
  </div>

</template>


<script setup lang="ts" name="">
import { useRouter,useRoute } from 'vue-router';
import { ref,reactive } from "vue";
import UserInfo from "@/views/menu/components/UserInfo.vue";
import { Search } from '@element-plus/icons-vue'
import NewTask from "@/views/menu/components/NewTask.vue";
import Task from "@/views/menu/components/Task.vue";
import SideBar from "@/views/menu/components/SideBar.vue";

const router = useRouter();
const route = useRoute();
const searchText=ref('')
const title=route.query.title
// defineProps(['title'])
const onClickClear = () => {
  // 弹出对话框，进入流程
  console.log('点击了清除按钮');
};

// 新建任务时实现新建子组件
const inputValue = ref('');      // 输入框的值
const tasks = ref<string[]>([]);       // 存储子组件的值
// 创建新组件的函数
const createNewComponent = () => {
  if (inputValue.value.trim()) {
    tasks.value.push(inputValue.value); // 将输入框的值添加到数组中
    inputValue.value = ''; // 清空输入框
  }
};

// 打开侧边栏
const sideBar = ref()

</script>

<style lang="scss" scoped>
// 左侧底部两个小功能的样式
@mixin two-specail-common {

      width: 80px;
      height: 100px;
      display: flex;
      flex-direction: column;

      .specail-img {
        // width: 80px;
        height: 70px;
        flex:1;
        justify-content: center;

      }

      .specail-p-text {
        display: inline-block;
        font-size: calc(0.3rem + 0.5vw);
        text-align: center;
        // line-height:20%;
      }

}
.common-layout {
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}

.el-aside {
  overflow-x: hidden; /* 仅隐藏水平溢出 */
  height: 100vh;
  width: 199px;
}
.el-menu {
  height: 100%;
  border: none;
}
/* 左侧导航栏 */
.left-nav-footer {
  display: flow-root;
  position: fixed;
  display: grid;
  width: 199px;
  grid-template-rows: 1fr 1fr;
  height: 150px;
  bottom: 0px;
  left: 0px;

  .two-specail {
    display: flex;
    width: 190px;
    justify-content: space-around;

    .evail-wrap {
      @include two-specail-common;
    }
    .ai-wrap {
      @include two-specail-common;
    }
  }

  .new {
      margin-top: 10px;
      width: 100%;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-top: 0.8px solid rgb(165, 164, 164);
      margin-top: 20px;
    }

}

// :deep(.search-input__wrapper) {
//   width: 100%;
//   border: none;
//   border-bottom: 2px solid #dcdfe6;
//   transition: border-color 0.3s;
// }

// :deep(.search-input__inner:focus) {
//   border-bottom-color: #409eff; /* 设置聚焦时的边框颜色 */
//   box-shadow: none; /* 去除默认的阴影 */
// }


// 右边主体
.right {
  background-color: #cffdf6;
  border-top-left-radius: 10px;


}
.right-main {
    display: flex;
    justify-content: center;

  }
  .right-footer {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
  }
</style>
