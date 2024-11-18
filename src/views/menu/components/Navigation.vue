<template>
  <div>
    <ul>
      <li v-for="basketId in basketIds" :key="basketId">
        <router-link :to="`/dashboard/${basketId}`">Basket {{ basketId }}</router-link>
      </li>
    </ul>
    <button @click="logout">Logout</button>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '../store/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const basketIds = userStore.basketIds;

const logout = () => {
  userStore.logout();
  router.push('/');
};
</script>
