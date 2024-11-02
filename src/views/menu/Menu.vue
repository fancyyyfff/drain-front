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
              <el-menu-item :class="{ 'active': isClicked }" class="action" index="actions" @click="changeBackColor">
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

        <div class="left-footer">
          <div class="function-wrap">
            <div class="brain-wrap" @click="showBrainDialog = true">
              <div class="brain"></div>
              <div class="brain-text" >头脑风暴</div>
            </div>
            <div class="ai-wrap" @click="callAI">
              <img src="@/assets/ai.svg" alt="" class="ai">
              <div class="ai-text">ai帮我做计划</div>
            </div>

          </div>
          <div class="new-wrap">
            <span class="new-text">&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;新建任务</span>
          </div>
        </div>


            <!-- <div class="left-nav-footer">
                <div class="two-specail">
                  <div class="brain-wrap specail" @click="onClickClear">
                    <div class="brain"></div>
                     <img src="@/assets/clear-evail.svg" alt="" class="special-img"/>
                    <p class="specail-p-text brain-text">进入头脑风暴</p>
                  </div>

                  <div class="ai-wrap specail" @click="onClickClear">
                     <img src="@/assets/ai.svg" alt="" class="special-img"/>
                    <img src="@/assets/plan.svg" alt="" class="ai">
                    <p class="specail-p-text ai-text">ai帮我计划</p>
                  </div>

              <div class="new" > +&nbsp;&nbsp;&nbsp;新建列表</div>
              </div>
              </div> -->





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

<!-- 右边的内容 -->
  <el-container class="right">

        <el-header class="right-top">行动清单</el-header>
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
<div v-if="showBrainDialog" class="dialog-wrap">
      <div class="dialog shine" @click.stop>
        <h4>欢迎进入头脑风暴</h4>
        <p>现在即将进入清空工作篮的头脑风暴，<br>找个安静的时间，跟随我一起清空大脑吧！<br>
          注意：中途不可以放弃哦!</p>
        <div class="btn-wrap">
        <button @click="closeBrainDialog" class="pretty-btn">不了</button>
        <button @click="closeBrainDialog" class="pretty-btn">好！</button>
      </div>

      </div>
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
import { tr } from 'element-plus/es/locales.mjs';

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

const isClicked = ref(false)
const changeBackColor = ()=>{
  isClicked.value=!isClicked.value
}
// 开启
const showBrainDialog =ref(false)
const openBrainDialog = ()=>{
  if(showBrainDialog.value===false) {
    showBrainDialog.value=true
  }
}
// 关闭
const closeBrainDialog = ()=>{
  if(showBrainDialog.value) {
    showBrainDialog.value=false
  }
}

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

    .brain-wrap {
      flex:1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .brain {
        flex:2;
        width: 30px;
        height: 30px;
        border-radius: 50%; /* 使其成为圆形 */
        background: radial-gradient(circle, rgb(224, 204, 224) 0%, rgba(87, 71, 98, 0.8) 60%, rgba(106, 104, 104, 0) 100%); /* 紫色渐变 */
        box-shadow: 0 0 30px rgba(83, 51, 83, 0.5), 0 0 60px rgba(73, 52, 87, 0.5); /* 紫色的模糊阴影 */
      }
      .brain-text {
        flex:1;
        font-size: 0.8rem;
      }
    }

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
    border-top: 1px solid #ccc;
  }
}
.contrain-wrap .el-aside .el-menu {
  // background-image: linear-gradient(to top,#e8cbc0 0.1%,#636fa4 99.9%);
  background-image: linear-gradient(to top,#b3c0de 0.1%,#d2dcee 99.9%);
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

// .left-nav-footer {
//   display: flow-root;
//   position: absolute;
//   display: grid;
//   width: 199px;
//   grid-template-rows: 1fr 1fr;
//   height: 150px;
//   // padding-top: 10px;
//   bottom: 0px;
//   left: 0px;

//   .two-specail {
//     display: flex;
//     width: 190px;
//     justify-content: space-around;
//     // margin-top: 20px;


//     .brain-wrap {
//       .brain {
//       width: 30px;
//       height: 30px;
//       margin-left: 30px;
//       border-radius: 50%; /* 使其成为圆形 */
//       background: radial-gradient(circle, rgb(224, 204, 224) 0%, rgba(87, 71, 98, 0.8) 60%, rgba(106, 104, 104, 0) 100%); /* 紫色渐变 */
//       box-shadow: 0 0 30px rgba(83, 51, 83, 0.5), 0 0 60px rgba(73, 52, 87, 0.5); /* 紫色的模糊阴影 */

//     }
//     .brain-text {
//       font-size: 0.7rem;
//       text-align: center;
//       line-height: 30px;
//     }

//     }
//     .ai-wrap {

//       .ai {
//         width: 30px;
//         margin-left: 20%;
//         padding-bottom: -50%;

//       }

//       .ai-text {
//         font-size: 0.8rem;
//         text-align: center;
//         line-height: 30px;

//       }
//     }
//   }





//   .new {
//       // position: absolute;
//       // bottom: 0px;
//       // left: 0;
//       margin-top: 10px;
//       width: 100%;
//       height: 30px;
//       text-align: center;
//       line-height: 30px;
//       border-top: 0.8px solid rgb(165, 164, 164);
//       margin-top: 20px;
//     }

// }


.el-menu-item.is-active {
     color: none;
    //  改变对应的背景色
}

.el-menu-item {
  color:white;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  font-size: 1rem;
}

.action {
  background-image: linear-gradient(to top,#f8e7bb 0.1%,#f9da84 99.9%);
}

.el-menu-item:hover {
  // background-image: linear-gradient(to top,#fceabb 0.1%,#f8b501 99.9%);
  background-image: linear-gradient(to top,#f8e7bb 0.1%,#f9da84 99.9%);

}

.isClicked {
  background-image: linear-gradient(to top,#c6b4b9 0.1%,#636fa4 99.9%);
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
background-image: linear-gradient(to top,#c6b4b9 0.1%,#b3b9d2 99.9%);
color: white;

}

.line {
  width: 100%;
  height: 1px;
  background-color: white;
  transform: translateY(-1vh);
  // border: 1px;
}

// 右边主体
.right {
  position: relative;
  background-image: linear-gradient(to top,#f8e7bb 0.1%,#f9da84 99.9%);
}
.right-main {
    display: flex;
    justify-content: center;

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

.dialog-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7); /* 半透明黑色背景 */
  display: flex;
  justify-content: center;
  align-items: center; /* 垂直居中 */

}

.dialog {
  padding: 20px;
  border-radius: 8px;
  width: 600px; /* 弹窗宽度 */
  text-align: center; /* 文字居中 */
  color: #ccc;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn-wrap {
  width: 60%;
  display: flex;
  justify-content: space-around;
  gap: 50px;
}
</style>
