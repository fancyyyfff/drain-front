<template>
  <div class="common-layout shine">
    <el-container class="contrain-wrap">
      <!-- 左边的侧边栏 -->
      <el-aside class="left-aside" width="200px">
        <el-menu class="el-menu-vertical-demo" router>
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
              <el-menu-item :class="{ 'active': isClicked }" class="action" index="/actions" @click="changeBackColor">
                <el-icon></el-icon>
               <span>马上行动</span>
              </el-menu-item>

              <el-menu-item index="schedule">
                <el-icon></el-icon>
               <span>DDL</span>
              </el-menu-item>

              <el-menu-item index="importance">
                <el-icon></el-icon>
               <span>重要</span>
              </el-menu-item>

              <el-menu-item index="works">
                <el-icon></el-icon>
               <span>工作篮</span>
              </el-menu-item>

              <el-menu-item index="goals">
                <el-icon></el-icon>
               <span>多步骤任务</span>
              </el-menu-item>

              <el-menu-item index="thoughts">
                <el-icon></el-icon>
               <span>想法&愿景</span>
              </el-menu-item>

              <el-menu-item index="entrust">
                <el-icon></el-icon>
               <span>委托他人</span>
              </el-menu-item>

              <el-menu-item index="tags">
                <el-icon></el-icon>
               <span>标签</span>
              </el-menu-item>

        </el-menu>

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

        <el-header class="right-top" >{{ mainTile }}</el-header>
        <!-- 主题内容 -->
      <el-main class="right-main">

          <!-- 以下代码具有参考意义，但对目前来看，不利于逻辑思考 -->
           <!-- <div v-for="task in taskList" :key="task.taskId">
           <Task :taskName="task.taskName"></Task>
          </div> -->
          <router-view></router-view>
      </el-main>
        <el-footer class="right-footer">
          <!-- <div class="footer">

          </div> -->
          <NewTask></NewTask>

        </el-footer>

      </el-container>

      <!-- 放侧边栏 -->

      <SideBar></SideBar>
    </el-container>
  </div>

<!-- 弹窗: -->
<Dialog v-if="brainDialogVisible"></Dialog>


</template>


<script setup lang="ts" name="">
import { useRouter,useRoute } from 'vue-router';
import { ref,reactive, onMounted,watch } from "vue";
import UserInfo from "@/views/menu/components/UserInfo.vue";
import { Search } from '@element-plus/icons-vue'
import NewTask from "@/views/menu/components/NewTask.vue";
import Task from "@/views/menu/components/Task.vue";
import SideBar from "@/views/menu/components/SideBar.vue";
import { fa, tr } from 'element-plus/es/locales.mjs';
import Clear from "@/views/clear/Clear.vue";
import Dialog from "@/views/clear/Dialog.vue";
import emitter from "@/mitt";
import { ElMessage, tabNavEmits } from 'element-plus'
import { v4 as uuidv4 } from 'uuid';
import { getAllTaskByRouteName } from "@/api/task";
import type { RefSymbol } from '@vue/reactivity';
import _ from 'lodash';

interface Task {
  taskId: string;
  taskName: string;
}

const router = useRouter();
const route = useRoute();
const searchText=ref('')
const onClickClear = () => {
  // 弹出对话框，进入流程
  console.log('点击了清除按钮');
};

// 新建任务时实现新建子组件
const taskName = ref('');      // 输入框的值
let taskList = reactive<{taskId:string;taskName:string}[]>([]);       // 存储子组件的值
// 创建新组件的函数
const handlecreateNewTask = (newTaskInputValue:unknown) => {
  // 待：后期还要把新建的任务对象保存，并且在一开始就获取对应导航下的全部任务
  taskName.value=newTaskInputValue as string
  const taskId = uuidv4();
  const task:Task = {
    taskId:taskId,
    taskName:taskName.value
  }
  if (taskName.value.trim()!=='') {
    taskList.unshift(task); // 将输入框的值添加到数组中
    console.log('已把新的对象添加到数组中')
  }
};
onMounted(async ()=>{
  if(routeName.value) {
    // 把路由的名字呈现在右侧主体
    routeToMainTile(routeName.value)
    // 获取开始的路由的列表数据
    const allTask:Task =await getAllTaskByRouteName(routeName.value)
    taskList = _.cloneDeep(allTask);
  }
  emitter.on('createNewTask',handlecreateNewTask)
})

// 打开侧边栏
// const sideBar = ref()

const isClicked = ref(false)
const changeBackColor = ()=>{
  isClicked.value=!isClicked.value
}

// 更换主体的标题
const routeName = ref(route.name)
const mainTile = ref('')  // 转换为字符串，确保类型为 string

// 监听路由变化
watch(route, (newRoute) => {
  routeName.value = newRoute.name
  routeToMainTile(routeName.value)

})

//识别函数的路由
function routeToMainTile(routeName:any) {
  switch (routeName) {
      case 'actions':
        mainTile.value='马上行动'
        break
      case 'schedule':
        mainTile.value='DDL'
        break
      case 'importance':
        mainTile.value='重要'
      break
      case 'works':
        mainTile.value='工作篮'
      break
      case 'goals':
        mainTile.value='多任务步骤'
      break
      case 'thoughts':
        mainTile.value='想法&愿景'
      break
      case 'entrust':
        mainTile.value='委托他人'
      break
      case 'tags':
        mainTile.value='标签'
      break
      default:
        console.log('新建的标题或出错了未捕获的标题')
    }
}

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
})



// ===
// 呼叫AI
const callAI = ()=>{
  router.push('/ai')
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
  overflow-x: hidden; /* 仅隐藏水平溢出 */
  height: 100vh;
  width: 199px;
}
.el-menu {
  height: 100%;
  border: none;
}

.el-menu-item.is-active {
     color: none;
    //  改变对应的背景色
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
