<template>
<span class="login-tile">注&nbsp;&nbsp;册</span>
  <div class="login-main">

    <div class="login-main-item">
      <span class="title">用户名</span>
        <div class="input-wrap shine">
        <input type="text" class=" user-input username-input">
      </div>
    </div>

    <div class="login-main-item">
      <span class="title">密码</span>
        <div class="input-wrap shine">
        <input type="text" class=" user-input password-input">
      </div>
    </div>

    <div class="login-main-item">
      <span class="title">确认密码</span>
        <div class="input-wrap shine">
        <input type="text" class=" user-input password-input">
      </div>
    </div>

    <button type="submit" class="pretty-btn go">ok!</button>

    <div class="login-footer-wrap">
      <button type="button" class="pretty-btn">微信注册</button>
      <button type="button" class="pretty-btn">短信注册</button>
  </div>

</div>
</template>

<script setup lang="ts" name="">

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
  }
}
.title {
  margin-left: -30%;
  font-size: 14px;
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
