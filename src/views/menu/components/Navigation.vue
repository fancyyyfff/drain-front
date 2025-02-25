<template>
<div class="nav-ul">
    <div class="nav-item" @click="handleImportance()">
      <p class="nav-text">重要</p>
    </div>
    <!-- 循环渲染每个 basket -->
    <template  v-for="basket in basketStore.basketList" :key="basket.basketId">
    <div class="nav-item">
      <router-link
        :to="{
          name: 'basket',
          params:{
            basketId:basket.basketId,
            t:'t',
            type:basket.type,
          }
        }"
        class="nav-link"
        @click="basketStore.title = basket.basketName"
      >
      <p class="nav-text">{{ basket.basketName }}</p>
      </router-link>
    </div>
    </template>

    <!-- 标签：(后续处理) -->
     <!-- <div   v-for="tag in basketStore.tags" :key="tag.tagId" class="tags" @click="getAllTags">
      <router-link
        :to="{
          name: 'basket',
          params:{
            type:basket.type,
            basketName:basket.basketName,
          }
        }"
        class="nav-tag shine"
      >
        {{ tag.tagName }}
      </router-link>

     </div> -->
</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useBasketStore } from "@/stores/basket";
import { onMounted,ref } from 'vue';
import { DEFAULT, IMPORTANCE } from '@/const/type';
import { getImportantTask } from "@/api/task";
import emitter from "@/mitt";

const basketStore = useBasketStore();
const router = useRouter();

onMounted( ()=>{
  basketStore.fetchAllBaskets();
})

function handleImportance(){
  basketStore.title = '重要'
  emitter.emit('showImportanceTask')
}

</script>

<style lang="scss" scoped>

/* 以下是原来菜单页的可能样式，可以参考以下 */
.nav-ul {
  display: flex;
  width:199px;
  flex-direction: column;
  align-items: flex-end;
  margin: 0;
  overflow: hidden;
}

.nav-item {
  width: 100%;
  height: 45px;
  border: 50% 0 0 50%;
}
.nav-text {
  padding-left: 20%;
  text-align: left;
  line-height: 100%;
  height: 100%;
}

.nav-link {
  text-decoration: none; /* 移除默认下划线 */
  color: white; /* 默认颜色 */
}

/* 设置鼠标悬停时的样式 */
.nav-item:hover {
  /* background-color: rgba(163, 163, 116, 0.451); */
  background-color: var(--theme-color);
}

</style>
