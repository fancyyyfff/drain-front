<template>
<Drain>
<div class="display shine">
  <span class="login-tile">登&nbsp;&nbsp;录</span>
  <div class="login-main">
    <div class="login-main-item">
      <span class="title">用户名</span>
<<<<<<< HEAD
      <div class="input-wrap shine">
        <input type="text" class="user-input username-input" v-model="user.username" />
=======
        <div class="input-wrap shine">
        <input type="text" class=" user-input username-input" v-model="user.username">
>>>>>>> feat-input-element
      </div>
    </div>

    <div class="login-main-item">
      <span class="title">密码</span>
      <div class="input-wrap shine">
        <input type="password" class="user-input password-input" v-model="user.password" />
      </div>
    </div>

    <button type="button" class="pretty-btn go" @click="toLogin">go!</button>

    <div class="login-footer-wrap">
      <button type="button" class="pretty-btn">微信登录</button>
      <button type="button" class="pretty-btn">短信登录</button>
    </div>
  </div>

</div>

</div>
</Drain>
</template>

<script setup lang="ts" name="">
import { reactive, ref } from "vue";
import { login } from "@/api/user";
import { useRouter } from "vue-router";
import type { User } from "@/types/user";
import { useUserInfo } from "@/stores/user";
import { setCookie,getCookie,clearCookie } from "@/http/cookie";
import { userInfo } from "os";
const router = useRouter()
// const username = ref('')
// const password = ref('')
const user = reactive<User>({
  username:'',
  password:''
})

interface TokenType {
  tokenName: string;
  tokenValue: string;
  tokenTimeout: number; // 毫秒
}

// --- 待优化,pinia,token,动态路由,角色判断,权限控制
async function toLogin() {
  try{
    const res =await login(user)
    console.log("登录响应",res)
    if(res.data.status==1001) {
      const { tokenName, tokenValue, tokenTimeout } = res.data.data

    setCookie('tokenName', res.data.data.tokenName, res.data.data.tokenTimeout);
    setCookie(tokenName, tokenValue, tokenTimeout);
    // 保存到pinia
    userInfo.userId=res.data.data.userId
    
    alert('登录成功')

    router.push('/menu')
    }

  }catch (error) {
    alert('登录失败，请检查用户名或密码');
  }

  // const code =1
  // if(code){
  //   router.push('/menu')
  // }else {
  //   alert('登录失败')
  // }
}

/**
 * 登出逻辑
 */
 export function logout() {
  clearCookie('tokenName');
  const tokenName = getCookie('tokenName');
  if (tokenName) clearCookie(tokenName);
  alert('您已退出登录');
}
</script>


<style lang="scss" scoped>
.login-tile {
  // padding-top: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}
.login-main {
  display: flex;
  width: 90%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.login-main-item {
  display: flex;
  width: 300px;
  height: 80px;
  flex-direction: column;
  align-items: center;
.input-wrap {
  // position: relative;
  display: flex;
  flex-direction: column;
  width: 180px;               /* 盒子宽度 */
  height: 30px;              /* 盒子高度 */
  transform: translateY(50%);

  .user-input {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    background: none;
    padding: 0 20px 0 20px;
  }
}
.title {
  margin-left: -30%;
  font-size: 14px;
  // position: absolute;         /* 绝对定位 */
  // top: 0;                    /* 顶部对齐 */
  // left: 0;                   /* 左侧对齐 */
  // transform: translate(18%, -50%); /* 调整位置，使文本居中于边框 */
  // padding: 5px;              /* 内边距，可选 */
  // // background:rgb(144, 147, 179);
}

}

.go {
  margin-top: 20px;
  font-size: 1.2rem;
}

.login-footer-wrap {
  display: flex;
  width: 80%;
  gap: 20px;
  margin-left: 40px;
  margin-top: 65px;
}


</style>
