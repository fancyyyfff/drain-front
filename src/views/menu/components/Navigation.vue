<template>
  <div>
    <ul>
      <li v-for="basketId in basketIds" :key="basketId">
        <router-link :to="`/dashboard/${basketId}`">Basket {{ basketId }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const basketIds = userStore.basketIds;

</script>
