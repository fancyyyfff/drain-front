<template>
  <span class="login-tile">登&nbsp;&nbsp;录</span>
  <div class="login-main">
    <div class="login-main-item">
      <span class="title">用户名</span>
      <div class="input-wrap shine">
        <input type="text" class="user-input username-input" v-model="user.username" />
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
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'; // 引入 Pinia 的用户状态管理
import { login } from '@/api/user'; // API 请求方法

const router = useRouter();
const userStore = useUserStore();

const user = reactive({
  username: '',
  password: '',
});

async function toLogin() {
  try {
    const res = await login(user);

    if (res.data.code === 1001) {
      alert('登录成功');
      const { userId, role, basketIds, token } = res.data;

      // 保存登录信息到 Pinia
      userStore.login(userId, role, basketIds, token);

      // 跳转到菜单页面
      router.push('/menu');
    } else {
      alert('登录失败');
    }
  } catch (error) {
    console.error('登录失败:', error);
    alert('登录失败，请重试！');
  }
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
