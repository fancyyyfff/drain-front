<template>
<div class="nav-ul">
    <!-- 循环渲染每个 basket -->
    <template  v-for="routeBasket in basketStore.routeBaskets" :key="routeBasket.routeKey">
      <div v-if="routeBasket.routeKey === 'importance'"  class="nav-item">
      <router-link
        :to="{
          name: 'importance',
          params:{
            routeKey:routeBasket.routeKey,
            mainTile:routeBasket.mainTile,
          }
        }"
        class="nav-link"
      >
        {{ routeBasket.mainTile }}
      </router-link>
    </div>

    <div v-else-if="routeBasket.routeKey === 'ddl'"  class="nav-item">
      <router-link
        :to="{
          name: 'ddl',
          params:{
            routeKey:routeBasket.routeKey,
            mainTile:routeBasket.mainTile,
          }
        }"
        class="nav-link"
      >
        {{ routeBasket.mainTile }}
      </router-link>
    </div>

    <div v-else-if="routeBasket.routeKey === 'goals'"  class="nav-item">
      <router-link
        :to="{
          name: 'goals',
          params:{
            routeKey:routeBasket.routeKey,
            mainTile:routeBasket.mainTile,
          }
        }"
        class="nav-link"
      >
        {{ routeBasket.mainTile }}
      </router-link>
    </div>

    <div v-else-if="routeBasket.routeKey === 'tags'" class="nav-item">
      <router-link
        :to="{
          name: 'tags',
          params:{
            routeKey:routeBasket.routeKey,
            mainTile:routeBasket.mainTile,
          }
        }"
        class="nav-link"
      >
        {{ routeBasket.mainTile }}
      </router-link>
    </div>

    <div v-else  class="nav-item">
      <router-link
        :to="{
          name: 'basket',
          params:{
            routeKey:routeBasket.routeKey,
            mainTile:routeBasket.mainTile,
          }
        }"
        class="nav-link"
      >
        {{ routeBasket.mainTile }}
      </router-link>
    </div>
    </template>
</div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { useBasketStore } from "@/stores/basket";
import { onMounted } from 'vue';

const basketStore = useBasketStore();
const router = useRouter();
// 这个方法会自动从后端获取数据并且更新在pinia中的 baskets
// 从而实现baskets在前后端数据都同时更新
onMounted( ()=>{
  basketStore.fetchAllBaskets();
})
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
.nav-link:hover {
  background-color: rgba(163, 163, 116, 0.451);
}

</style>
