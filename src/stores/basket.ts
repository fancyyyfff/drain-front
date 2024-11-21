import { defineStore } from "pinia";
import { getAllRouteBasket } from "@/api/basket"; // 假设接口名为 getUserBaskets
import { useUserStore } from "@/stores/user";

// 定义 Basket 接口（可选）
interface RouteBasket {
  routeKey:string|null;
  basketIds: []|null;
  mainTile: string|null;
}
// 主要的作用：获取当前用户下的每个basketId对应的basketName,
export const useBasketStore = defineStore("basket", {
  state: () => ({
    // 存储所有篮子数据,每个对象，只包含basketId和basketName
    // baskets: [] as Basket[],
    // // 对任务的伪分类，在数据库中不存在，只作为对路由的渲染
    // // 主要分为
    // circleBaskets: [] as Basket[],
    // singleBaskets: [{
    //   ddlBaskets:[] as Basket[],
    //   starBaskets:[] as Basket[],
    //   goalsBaskets:[] as Basket[],
    //   tagsBaskets:[] as Basket[],
    //   drainBaskets:[] as Basket[],
    //   aiBaskets:[] as Basket[],
    // }],
    routeBaskets:[
      {
        routeKey:"importance",
        basketIds: [0],
        mainTile: '重要',
      },
      {
        routeKey:"ddl",
        basketIds: [1],
        mainTile: 'DDL',
      },
      {
        routeKey:"goals",
        basketIds: [2],
        mainTile: '多步骤任务',
      },
      {
        routeKey:"actions",
        basketIds: [3],
        mainTile: '马上行动',
      },
      {
        routeKey:"works",
        basketIds: [4],
        mainTile: '工作篮',
      },
      {
        routeKey:"thoughts",
        basketIds: [5],
        mainTile: '想法',
      },
      {
        routeKey:"tags",
        basketIds: [6],
        mainTile: '标签',
      },
  ],

  }),
  actions: {
    // - 对baskets的增删改操作
    async fetchAllBaskets() {
      const userStore = useUserStore();
      try {
        const res = await getAllRouteBasket();
        const {routeBaskets}=res.data
        if (res.status % 2 == 1) {
          this.routeBaskets = routeBaskets; // 假设 res.data 是篮子数组
        }
      } catch (error) {
        console.error("获取篮子数据失败：", error);
      }
    },
  },
  getters: {
    /**可能暂时不用：
     * 根据 routeKey 获取对应的 mainTile
     */
    getBasketNameById: (state) => (routeKey: string) => {
      const basket = state.routeBaskets.find((b) => b.routeKey === routeKey);
      return basket ? basket.mainTile : "未命名篮子";
    },
  },
  // - 退出时的操作：
});
