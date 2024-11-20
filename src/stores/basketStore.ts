import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { getAllBaskets } from "@/api/basket"; // 假设接口名为 getUserBaskets
import { useUserStore } from "@/stores/user";

// interface Basket {
//   basketId: string;
//   basketName: string;
// }

const userStore = useUserStore()

export const useBasketStore = defineStore("basket", () => {
  // const baskets = ref<Basket[]>([]);
  const baskets = reactive([])

  // 获取当前用户的所有篮子
  const fetchBaskets = async () => {
    try {
      const res = await getAllBaskets(userStore.userId);
      if(res.status===1) {
        

      }
    } catch (error) {
      console.error("获取篮子数据失败：", error);
    }
  };

  return {
    baskets,
    fetchBaskets,
  };
});
