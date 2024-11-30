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

        <div class="left-footer">
          <div class="function-wrap">
            <Clear></Clear>
            <div class="ai-wrap" @click="callAI">
              <img src="@/assets/ai.svg" alt="" class="ai">
              <div class="ai-text">ai帮我做计划</div>
            </div>

          </div>
          <div class="new-wrap">
            <span class="new-text">+&nbsp;&nbsp;&nbsp;新建任务</span>
          </div>
        </div>

      </el-aside>

<!-- 右边的内容 -->
  <el-container class="right">

        <el-header class="right-top" >{{ route.params.basketName  }}</el-header>
        <!-- 主题内容 -->
      <el-main class="right-main">
        <router-view/>
        <!-- </router-view> -->
      </el-main>
        <el-footer class="right-footer">
          <!-- <div class="footer">

          </div> -->
          <component :is="currentNewTask"/>

        </el-footer>

  </el-container>
      <!-- 放侧边栏 -->
      <component :is="currentSideBar"/>
       <!-- <DdlSideBar></DdlSideBar> -->

</el-container>
</div>

<!-- 弹窗: -->
<Dialog v-if="brainDialogVisible"></Dialog>

<OrderMessage v-if="OrderMessageVisible"/>

</template>

<script setup lang="ts" name="">
import { useRouter,useRoute } from 'vue-router';
import { ref,reactive, onMounted,watch,computed } from "vue";
import UserInfo from "@/views/menu/components/UserInfo.vue";
import { Search } from '@element-plus/icons-vue'
import NewTask from "@/views/menu/components/NewTask.vue";
import DdlNewTask from "@/views/menu/components/DdlNewTask.vue";
import Task from "@/views/menu/components/Task.vue";
import SideBar from "@/views/menu/components/SideBar.vue";
import Clear from "@/views/vip/clear/Clear.vue";
import Dialog from "@/views/vip/clear/Dialog.vue";
import emitter from "@/mitt";
import { ElMessage, tabNavEmits } from 'element-plus'
import _ from 'lodash';
import Navigation from "@/views/menu/components/Navigation.vue";
import { useTaskStore } from '@/stores/task';
import { useBasketStore  } from "@/stores/basket";
import { addTask } from "@/api/task";
import  DdlSideBar  from "@/views/menu/components/DdlSideBar.vue";
import { useSideBarStore } from '@/stores/ui';
import { useUserStore } from "@/stores/user";
import { VIP,DDL } from "@/const/type";
import OrderMessage from "@/views/vip/components/OrderMessage.vue";

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

const onClickClear = () => {
  // 弹出对话框，进入流程
  console.log('点击了清除按钮');
};
// 新建任务组件切换
// 动态计算当前的新建任务组件
const currentNewTask = computed(()=>{
  console.log("新建任务type",route.params.type)
  return Number(route.params.type)===DDL?DdlNewTask:NewTask
}
)

const currentType= computed(()=>Number(route.params.type))
// 动态计算当前侧边栏组件：
const currentSideBar = computed(()=>{
  console.log("侧边栏type",currentType.value)
  return currentType.value===DDL?DdlSideBar:SideBar
})

// 侧边栏组件切换
onMounted(()=>{

})

// 打开侧边栏
const sideBar = ref()

const isClicked = ref(false)
const changeBackColor = ()=>{
  isClicked.value=!isClicked.value
}

// ===订阅盒子的弹窗
const OrderMessageVisible =ref(false)
function openOrderMessage() {
  OrderMessageVisible.value=true
}
emitter.on('openOrderMessage',openOrderMessage)
// ===
// 头脑风暴的弹窗
const brainDialogVisible =ref(false)
function closeDialog() {
  brainDialogVisible.value=false
}
function successTips() {
  ElMessage({
    dangerouslyUseHTMLString: true,
    // message: '<strong>This is <i>HTML</i> string</strong>',
    message: ' <p>恭喜你！<br><br>又为你大脑减轻了负担！<br><br> 以更轻盈的姿态继续前进吧！</p>',
    type: 'success',
    plain: true,
  })
}

// 通过Clear来打开弹窗这个弹窗
emitter.on('openBrainDialog',()=>{
  brainDialogVisible.value=true
})
// 孙组件通知父组件关闭弹窗
emitter.on('closeBrainDialog',closeDialog)

emitter.on('closeAndTips',()=>{

  closeDialog()
  successTips()
  // ElMessage({
  //   message: '恭喜你！又为你大脑减轻了负担！以更轻盈的姿态继续前进吧！',
  //   grouping: true,
  //   type: 'success',
  // })

})

const role = computed(()=>userStore.getRole())
// ===
// 呼叫AI
function callAI (){
  console.log('进入到AI页面');
      if(role.value===VIP){
      router.push({
        name: "ai"
      });
    } else {
      openOrderMessage()
      // emitter.on('openOrderMessage',openOrderMessage)
      // alert("ai功能是vip用户独有的哦！欢迎您订阅！");
    }
}

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
