import { defineStore } from "pinia";
import { getAllBaskets } from "@/api/basket"; // 假设接口名为 getUserBaskets
import { useUserStore } from "@/stores/user";

// 定义 Basket 接口（可选）
interface Basket {
  basketId?: number;
  basketName?: string;
}
// 主要的作用：获取当前用户下的每个basketId对应的basketName,
export const useBasketStore = defineStore("basket", {
  state: () => ({
    // 存储篮子数据
    baskets: [] as Basket[],
  }),
  actions: {
    // - 对baskets的增删改操作
    // 从后端获取当前用户的所有篮子
    async fetchBaskets() {
      const userStore = useUserStore();
      try {
        const res = await getAllBaskets(userStore.userId as number);
        if (res.status === 1) {
          this.baskets = res.data; // 假设 res.data 是篮子数组
        }
      } catch (error) {
        console.error("获取篮子数据失败：", error);
      }
    },
  },
  getters: {
    /**
     * 根据 basketId 获取对应的 basketName
     */
    getBasketNameById: (state) => (basketId: number) => {
      const basket = state.baskets.find((b) => b.basketId === basketId);
      return basket ? basket.basketName : "未命名篮子";
    },
  },
  // - 退出时的操作：
});
