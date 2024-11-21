<template>
<div class="nav-ul">
    <!-- 循环渲染每个 basket -->
    <div v-for="basket in basketStore.baskets" :key="basket.basketId" class="nav-item">
      <router-link
        :to="`/basket/${basket.basketId}`"
        class="nav-link"
      >
        {{ basket.basketName }}
      </router-link>
    </div>
</div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { useBasketStore } from "@/stores/basket";

const basketStore = useBasketStore();

const userStore = useUserStore();
const router = useRouter();

const basketIds = userStore.basketIds;
// 这个方法会自动从后端获取数据并且更新在pinia中的 baskets
// 从而实现baskets在前后端数据都同时更新
await basketStore.fetchBaskets();
</script>

<style scoped>

/* 以下是原来菜单页的可能样式，可以参考以下 */
.nav-ul {
  display: flex;
  width:199px;
  flex-direction: column;
  margin: 0;
}

.nav-item {
  width: 100%;
  height: 45px;
}

.nav-link {
  text-decoration: none; /* 移除默认下划线 */
  color: white; /* 默认颜色 */
}

/* 设置鼠标悬停时的样式 */
.nav-link:hover {
  background-color: rgba(163, 163, 116, 0.451);
}

</style>
