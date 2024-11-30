<template>
  <div class="nav-ul" >
      <div class="nav-item" @click="emitter.emit('changeComponents','manageUser')">
        用户管理
      </div>
      <div class="nav-item" @click="emitter.emit('changeComponents','subscribe')">
       订单管理
      </div>
  </div>
  </template>

<script lang="ts" setup>
  import { useUserStore } from '@/stores/user';
  import { useRouter } from 'vue-router';
  import { useBasketStore } from "@/stores/basket";
  import { onMounted,ref } from 'vue';
  import emitter from "@/mitt";
  const basketStore = useBasketStore();
</script>

  <style scoped>

  /* 以下是原来菜单页的可能样式，可以参考以下 */
  .nav-ul {
    display: flex;
    width:199px;
    flex-direction: column;
    align-items: flex-end;
    margin: 0;
    overflow-x: hidden;
  }

  .nav-item {
    width: 90%;
    height: 45px;
    border: 50% 0 0 50%;
  }

  .nav-link {
    text-decoration: none; /* 移除默认下划线 */
    color: white; /* 默认颜色 */
  }

  /* 设置鼠标悬停时的样式 */
  .nav-item:hover {
    background-color: rgba(163, 163, 116, 0.451);
  }

  </style>
