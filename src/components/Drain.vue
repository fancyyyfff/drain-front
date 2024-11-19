<template>
  <div class="wrap">
    <div class="top">
      <div id="help">帮助</div>
      <div id="logo">Drain</div>
      <div class="top-button">
        <button id="login-btn" class="shine pretty-btn" @click="toLogin">登录</button>
        <button id="regiter-btn" class="shine pretty-btn" @click="router.push('/register')">注册</button>
      </div>
    </div>

    <div class="main">
      <!-- 放置组件 -->

      <slot></slot>
      <!-- <div class="display shine">
      </div> -->

      <!-- 画个太阳-->
      <div class="sun"></div>
    </div>

    <footer class="footer-wrap">
      <img src="" alt="" class="show-footer">
      <div class="footer-text"></div>
    </footer>

  </div>
  </template>

  <script setup lang="ts" name="">
  import Login from "@/views/user/login/Login.vue";
  import Register from "@/views/user/register/Register.vue";
  import { useRouter } from "vue-router";
  const router = useRouter()
  function toLogin() {
    router.push('/login')
  }
  </script>

  <style lang="scss"  scoped>
  * {
    margin: 0;
    padding: 0;

  }
  button {
    width: 80px;
    height: 30px;
    border: none;
    outline: none;
    background: none;
    border: 1px solid rgb(200, 197, 197);
    font-size: 14px;
    // box-shadow: 0px 0px 3px rgb(200, 197, 197); /* 50% 透明度 */
    border-radius: 20px;
    color: white;
  }

  .wrap {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-image: linear-gradient(to top,#e8cbc0 0.1%,#636fa4 99.9%);

    .top {
      position: fixed;
      display: flex;
      width: 100%;
      height: 50px;
      justify-content: space-between;
      align-items: center;
      // border-bottom: 2px solid rgb(209, 207, 207);

      .drain {

      }


      #help {
        flex:1;
        text-align: center;
        font-size: 14px;

      }
      #logo {
        flex: 2;
        text-align: center;
        font-size: 25px;
        font-weight: bold; /* 加粗 */
        color: #f9d0c7; /* 字体颜色 */
        text-shadow: 2px 2px 4px rgba(253, 230, 230, 0.3); /* 添加阴影 */
      }

      .top-button {
        display: flex;
        flex:1;
        width: 100%;
        justify-content: space-around;
        align-items: center;
        #login-btn {

        }
        #register-btn {

        }

      }
    }

    .main {
      display: flex;
      position: relative;
    flex-direction: column;
    align-items: center;
    margin-top: 7vh;

    // .

    }


  }


  </style>
