<template>
<Drain>

    <div class="display shine">


    <span class="login-tile">注&nbsp;&nbsp;册</span>
  <div class="login-main">

    <div class="login-main-item">
      <span class="title">用户名</span>
        <div class="input-wrap shine">
        <input type="text" class=" user-input username-input" placeholder="请输入用户名" v-model="username">
      </div>
    </div>

    <div class="login-main-item">
      <span class="title">密码</span>
        <div class="input-wrap shine">
        <input type="text" class=" user-input password-input"  placeholder="请输入密码" v-model="password">
      </div>
    </div>

    <div class="login-main-item">
      <span class="title">确认密码</span>
        <div class="input-wrap shine">
        <input type="text" class=" user-input password-input" placeholder="请再次输入密码" v-model="confirmPassword">
      </div>
    </div>

    <button type="button" class="pretty-btn go" @click="register">ok!</button>

    <div class="login-footer-wrap">
      <button type="button" class="pretty-btn">微信注册</button>
      <button type="button" class="pretty-btn">短信注册</button>
  </div>
</div>

</div>

</Drain>

<!-- <Messages :showMessage="showMessage" :message="message"></Messages> -->

</template>

<script setup lang="ts" name="">
import { reactive } from "vue";
import type { User } from '@/types/user';
import { useRouter } from "vue-router";
import Message from "@/components/Message.vue";
import Drain from "@/components/Drain.vue";
const router = useRouter()
const user = reactive<User>({
  username: '',
  password:'',
  confirmPassword:''
});

function register() {
  // --- 发送请求
  // const res = await register(user)
  // 成功:
  let code =1
  if(code===1) {
    router.push('/login')
  }else {
    alert('注册失败')
  }

}
</script>

<style lang="scss" scoped>

.login-tile {
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
}

}

.go {
  margin-top: 10px;
  font-size: 1.2rem;
}

.login-footer-wrap {
  display: flex;
  width: 80%;
  gap: 20px;
  margin-left: 40px;
  margin-top: 30px;
}
</style>
