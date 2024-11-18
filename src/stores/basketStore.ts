import { defineStore } from "pinia";
import { ref } from "vue";
import { getUserBaskets } from "@/api/basket"; // 假设接口名为 getUserBaskets

interface Basket {
  basketId: string;
  basketName: string;
}

export const useBasketStore = defineStore("basket", () => {
  const baskets = ref<Basket[]>([]);

  // 获取当前用户的所有篮子
  const fetchBaskets = async () => {
    try {
      const response = await getUserBaskets();
      baskets.value = response.data; // 假设接口返回的格式是 { data: Basket[] }
    } catch (error) {
      console.error("获取篮子数据失败：", error);
    }
  };

  return {
    baskets,
    fetchBaskets,
  };
});
