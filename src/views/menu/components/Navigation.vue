<template>
    <div class="nav-ul">
      <div  v-for="basket in baskets" :key="basket.basketId">
        <router-link :to="{ name: 'BasketTasks', params: { basketId: id, } }">
          Basket {{ id }}
        </router-link>
      </div>
      <!-- <li v-for="id in basketIds" :key="id">
        <router-link :to="{ name: 'BasketTasks', params: { basketId: id } }">
          Basket {{ id }}
        </router-link>
      </li> -->
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const basketIds = userStore.basketIds;

</script>

<style scoped>

/* 以下是原来菜单页的可能样式，可以参考以下 */
.nav-ul {
  display: flex;
  width:199px;
  flex-direction: column;
}
.nav-ul>div {
  list-style: none;
  width: 100%;
  height: 43px;
  border: 2px solid black;
}
</style>
