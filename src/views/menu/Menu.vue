<template>
  <div class="common-layout">
    <el-container class="contrain-wrap">
      <!-- 左侧导航 -->
      <el-aside class="left-aside">
        <ul class="menu-list">
          <li
            v-for="basket in baskets"
            :key="basket.basketId"
            :class="{ active: currentBasketId === basket.basketId }"
            @click="navigateToBasket(basket)"
          >
            {{ basket.basketName }}
          </li>
        </ul>
      </el-aside>

      <!-- 右侧内容 -->
      <el-container class="right">
        <el-header class="right-top">
          {{ currentBasketName }}
        </el-header>
        <el-main class="right-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useBasketStore } from "@/stores/basket";
import { useRouter, useRoute } from "vue-router";

const basketStore = useBasketStore();
const router = useRouter();
const route = useRoute();

// 获取所有篮子数据
const baskets = computed(() => basketStore.baskets);
const currentBasketId = ref(route.params.basketId || "");
const currentBasketName = computed(() => {
  const basket = baskets.value.find((b) => b.basketId === currentBasketId.value);
  return basket ? basket.basketName : "未命名篮子";
});

// 动态导航到篮子
const navigateToBasket = (basket) => {
  currentBasketId.value = basket.basketId;
  router.push(`/basket/${basket.basketId}`);
};

// 初始化时拉取篮子数据
onMounted(async () => {
  if (!basketStore.baskets.length) {
    await basketStore.fetchBaskets();
  }
});
</script>

<style lang="scss" scoped>
.common-layout {
  display: flex;
  height: 96vh;
  margin: 2vh 2vw;
  border-radius: 20px;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.2);
}

.left-aside {
  width: 200px;
  background: #f0f0f0;
}

.menu-list {
  list-style: none;
  padding: 0;
}

.menu-list li {
  padding: 10px;
  cursor: pointer;
}

.menu-list li.active {
  background: #e8e8e8;
  font-weight: bold;
}

.right {
  flex: 1;
  background: #fff;
}

.right-main {
  padding: 20px;
}
</style>
