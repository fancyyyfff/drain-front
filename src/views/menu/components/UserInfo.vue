<template>
<div class="user-wrap">
  <!-- 头像 -->
   <el-row class="demo-avatar demo-basic" @click="logout">
    <el-col :span="12">
      <div class="demo-basic--circle">
        <div class="block">
          <el-avatar :size="50" :src="circleUrl" />
        </div>
      </div>
    </el-col>
    </el-row>

  <div class="text">
    <div class="name">{{ userStore.user.nickName }}</div>
    <div class="phone">{{ userStore.user.userName }}</div>
  </div>

</div>
</template>

<script setup lang="ts" name="">
import { reactive, toRefs } from 'vue'
import { useUserStore } from "@/stores/user";
const userStore= useUserStore()
const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',

})

function logout() {
  


}
const { circleUrl} = toRefs(state)

</script>

<style scoped>
.user-wrap {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  .text {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    padding-bottom: 10px;
    /* width: 40px; */
    /* justify-content: center; */

    .name {
      margin-bottom: 10px;
    }
  }

}

.demo-basic {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

</style>
