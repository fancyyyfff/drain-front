<template>
<div class="user-wrap">
  <!-- 头像 -->
   <el-row class="demo-avatar demo-basic" @click="toLogout">
    <el-col :span="12">
      <div class="demo-basic--circle">
        <div class="block">
          <el-avatar :size="50" :src="circleUrl" />
        </div>
      </div>
    </el-col>
    </el-row>

  <div class="text">
    <div class="name">{{ nickname }}</div>
    <div class="phone">{{ username}}</div>
  </div>

</div>
</template>

<script setup lang="ts" name="">
import { reactive, toRefs,ref, onMounted } from 'vue'
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { logout,getUserInfo } from "@/api/user";

const router = useRouter()
const userStore= useUserStore()
const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',

})

const username = ref('');
const nickname = ref('');

onMounted(async() => {
  try{
    const res = await getUserInfo()
    if(res.status%2===1)  {
      nickname.value= res.data.nickname
      username.value= res.data.username
    }

  }catch(error){
    console.error('获取用户信息失败',error)
  }

})



async function toLogout() {
  userStore.resetUser()
  try {
    const res = await logout()
    if(res.status%2 ===1) {
      alert('退出登录成功')
      router.push('login')
    }
  } catch (error) {
    console.error('退出登录失败', error);
  }
  // // 后期删掉`
  // router.push('login')
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
