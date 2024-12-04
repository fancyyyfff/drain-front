<template>
<div class="nav-ul">
    <div class="nav-item" @click="showImportanceView()">
      {{ importanceName }}
    </div>
    <!-- 循环渲染每个 basket -->
    <template  v-for="basket in basketStore.basketList" :key="basket.basketId">
    <div class="nav-item">
      <router-link
        :to="{
          name: 'basket',
          params:{
            basketId:basket.basketId,
            type:basket.type,
            basketName:basket.basketName,
          }
        }"
        class="nav-link"
      >
        {{ basket.basketName }}
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
import { IMPORTANCE } from '@/const/type';
const basketStore = useBasketStore();
const router = useRouter();
// 这个方法会自动从后端获取数据并且更新在pinia中的 baskets
// 从而实现baskets在前后端数据都同时更新
onMounted( ()=>{
  basketStore.fetchAllBaskets();
})
// interface ImportanceBasket {
//   type:number;
//   basketName:string;
// }
// const importanceBasket=ref<ImportanceBasket>({type:1,basketName:'重要'})
const importanceName = ref('重要')
function showImportanceView(){
      router.push({
        name: 'importance',
        params: {
          type:IMPORTANCE,
          basketName: importanceName.value
        }
      })

  // try {
  //   const res = await getAllStar()
  //   if(res.status===2006) {
  //     emitter.emit('allStar',res.data)
  //     router.push({
  //       name: 'importance',
  //       params: {
  //         basketName: importanceName.value
  //       }
  //     })

  //   }
  // } catch (error) {
  //   console.error('通过basketId获取所有任务失败', error);
  // }

}
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
