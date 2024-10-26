<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"><el-menu class="el-menu-vertical-demo" router>
        <div class="user-search">固定在左上角的用户信息和搜索框</div>
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



              <footer class="left-nav-footer">
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

              <div class="new" > +  新建列表</div>

              </footer>

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



    </el-menu></el-aside>

    <!-- 主题内容 -->
      <el-main>
        <el-header>顶部固定</el-header>
        <router-view></router-view>
      </el-main>

    </el-container>
  </div>

</template>


<script setup lang="ts" name="">
import { Search } from '@element-plus/icons-vue'
import { useRouter,useRoute } from 'vue-router';
import { ref,reactive } from "vue";
const router = useRouter();
const route = useRoute();
// const query=reactive({})
// const navigate= (path:string,query:any) =>{

//   router.push({path,query})
// }

// const navigate= (path:string,query:any) =>{

// router.push({ path: '/importance', query: { title: '重要' } })
// }



const title=route.query.title
// defineProps(['title'])

const onClickClear = () => {
  // 弹出对话框，进入流程
  console.log('点击了清除按钮');
};

</script>

<style lang="scss" scoped>
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
}

/* 左侧导航栏 */
.left-nav-footer {
  position: fixed;
  display: grid;
  width: 199px;
  grid-template-rows: 1fr 1fr;
  height: 15vh;
  bottom: 0px;
  left: 0px;

  .two-specail {
    display: flex;
    width: 199px;
    justify-content: space-around;

    .evail-wrap {
      @include two-specail-common;
    }
    .ai-wrap {
      @include two-specail-common;
    }
    /* 小恶魔 */
//     .clear-wrap {
//   width: 80px;
//   height: 100px;
//   flex:1;
//   background-color:white;
//   cursor: pointer;

//   .clear-p-text {
//   font-size: calc(0.3rem + 0.5vw)
// }

// .clear-evail {
//   width: 50px;
// }
//     }

    /* ai */
    // .ai-wrap {
    //   width: 80px;
    //   height: 100px;
    //   flex:1;
    //   display: flex;
    //   flex-direction: column;


    //   .ai-img {
    //     width: 100%;
    //     height: 70%;
    //     justify-content: center;

    //   }

    //   .ai-p-text {
    //     display: inline-block;
    //     font-size: calc(0.3rem + 0.5vw);
    //     text-align: center;
    //     line-height: 100%;
    //   }
    // }

  }

}

</style>
