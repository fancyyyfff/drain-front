<template>
  <div class="common-layout shine">
    <el-container class="contrain-wrap">
      <!-- 左边的侧边栏 -->
      <el-aside class="left-aside" width="200px">
        <div class="user-search">
        <UserInfo>用户信息</UserInfo>
        <!-- <div>搜索框</div> -->
          <el-input
            v-model="searchText"
            placeholder="搜索"
            :suffix-icon="Search"
            class="search-input shine"
          />
            <div class="line"></div>
          </div>
          <!-- 左侧导航栏 -->
           <Navigation></Navigation>
      </el-aside>

<!-- 右边的内容 -->
  <el-container class="right">

        <el-header class="right-top" >{{ route.params.basketName  }}</el-header>
        <!-- 主题内容 -->
      <el-main class="right-main">
        <component :is="currentComponent"></component>
      </el-main>
    </el-container>
</el-container>
</div>



</template>

<script setup lang="ts" name="">
import { useRouter,useRoute } from 'vue-router';
import { ref,shallowRef } from "vue";
import UserInfo from "@/views/menu/components/UserInfo.vue";
import { Search } from '@element-plus/icons-vue'
import emitter from "@/mitt";
import _ from 'lodash';
import Navigation from "@/views/manager/Navigation.vue";
import { useTaskStore } from '@/stores/task';
import { useBasketStore  } from "@/stores/basket";
import { useUserStore } from "@/stores/user";
import Subscribe from "@/views/manager/Subscribe.vue";
import MangeUser from "@/views/manager/MangeUser.vue";
interface Task {
  taskId: string;
  taskName: string;
}

const router = useRouter();
const route = useRoute();
const taskStore = useTaskStore();
const basketStore = useBasketStore();
const userStore = useUserStore()

const searchText=ref('')
const components={
  'manageUser':MangeUser,
  'subscribe':Subscribe,
}
const currentComponent = shallowRef(components.manageUser);

emitter.on('changeComponents', (componentName) => {
  if (componentName === 'manageUser') {
        currentComponent.value = components.manageUser
      } else if (componentName === 'subscribe') {
        currentComponent.value = components.subscribe
      }
});

</script>

<style lang="scss" scoped>

.common-layout {
  position: relative;
  overflow: hidden;
  height: 96vh;
  width: 96vw;
  margin: 2vh 2vw 2vh 2vw;
  // background-color: #fff;
  border-radius: 20px;
  // background-image: linear-gradient(to top,#757F9A 0.1%,#d5d9e0 99.9%);
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.2), /* 外部阴影 */
              0 0 60px rgba(255, 255, 255, 0.5); /* 内部发光效果 */
}

// 固定的导航栏
.left-footer {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100px;
  bottom: 0;
  left: 0;

  .function-wrap {
    flex:2;
    display: flex;

    //头脑风暴的样式

    .ai-wrap {
      flex:1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .ai {
        flex:2;
        width: 30px;
      }

      .ai-text {
        flex:1;
        font-size: 0.8rem;
      }

    }
  }
  // 新建任务
  .new-wrap {
    flex:1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.5px solid white;
  }
}
.contrain-wrap .el-aside .el-menu {
  // background-image: linear-gradient(to top,#e8cbc0 0.1%,#636fa4 99.9%);
  // background-image: linear-gradient(to top,#b3c0de 0.1%,#d2dcee 99.9%);
  // background-image: linear-gradient(to top,#20002c 0.1%, #cbb4d4 99.9%);
  background-image: linear-gradient(to top,#e8cbc0 0.1%,#636fa4 99.9%);
}

.el-aside {
  overflow-x: hidden; /* 仅隐藏垂直溢出 */
  height: 100vh;
  width: 199px;
}


.el-menu-item {
  color:white;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  font-size: 1.2rem;
}

.action {
  background-image: var(--action-back-color);
  box-shadow: var(--shine-shadow);

}

.el-menu-item:hover {
  background-image: var(--action-hover-color);
  // 与主题色一样
  // background-image: linear-gradient(to top, rgba(232, 203, 192, 0.5) 0.05%, rgba(99, 111, 164, 0.8) 99.95%);
}

.isClicked {
  background-image: var(--action-back-color);
  box-shadow: var(--shine-shadow);
}

.search-input {
  transform: translateY(-1.8vh);
}
:deep(.el-input__wrapper) {
  border: 0.5px solid rgb(209, 207, 207);
    background: rgba(255, 255, 255, 0.1); /* 半透明白色背景 */
border-radius: 20px;         /* 圆角 */
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2), /* 外部阴影 */
              0 0 30px rgba(255, 255, 255, 0.5); /* 内部发光效果 */
// background-image: linear-gradient(to top,#c6b4b9 0.1%,#b3b9d2 99.9%);
color: white;
}

.line {
  width: 100%;
  height: 0.5px;
  background-color: white;
  transform: translateY(-1vh);
}

// 右边主体
.right {
  position: relative;
  // background-image: linear-gradient(to top,#aea99b 0.1%,#aa9e7d 99.9%);
  background-image: linear-gradient(to right,rgba(197, 197, 167, 0.7) 0.05%,rgba(212, 211, 221, 0.5) 99.95%);
  // box-shadow: var(--shine-shadow);
}
.right-main {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    row-gap: 10px;

}
.right-footer {
    position: absolute;
    top:calc(650px + 1vh);
    left:0px;
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;

    .footer {
      width: 90%;
      height: 50px;
      background-color: #d2dcee;
    }
  }
.right-top {
  padding: 20px;
  font-size: 2rem;
  font-weight: 800;

}

</style>
