import { defineStore } from "pinia";
import { getAllBaskets } from "@/api/basket"; // 假设接口名为 getUserBaskets
import { useUserStore } from "@/stores/user";
import { addTask,updateTaskBasket,getTask } from "@/api/task";
import { IMPORTANCE } from "@/const/type";

// 定义 Basket 接口（可选）
interface RouteBasket {
  type:string|null;
  basketId: number|null;
  basketName: string|null;
}
// 主要的作用：获取当前用户下的每个basketId对应的basketName,
export const useBasketStore = defineStore("basket", {
  state: () => ({
    basketList:[
      {
        type:2,
        basketId: 1,
        basketName: '截至日期',
      },
      {
        type:3,
        basketId: 2,
        basketName: '多步骤任务',
      },
      {
        type:0,
        basketId: 3,
        basketName: '马上行动',
      },
      {
        type:0,
        basketId: 4,
        basketName: '工作篮',
      },
      {
        type:0,
        basketId: 5,
        basketName: '委托他人',
      },
      {
        type:0,
        basketId: 6,
        basketName: '以后可能会做',
      },
  ],
  // 当前的basketId，随路由变化而变化
  currentBasketId:-1,
  }),
  actions: {
    getCurrentBasketId(currentBasketId){
      return this.currentBasketId
    },
    // 设置currentBasketId
    setCurrentBasketId(currentBasketId){
      this.currentBasketId=currentBasketId
    },
    // 前端模拟：获取所有任务:
    getBasketList(){
      return this.basketList

    },
    // - 对baskets的增删改操作
    // 初始渲染所有的篮子
    async fetchAllBaskets() {
      // 后期删掉：
      this.getBasketList()

      try {
        const res = await getAllBaskets();
        const {basketList}=res.data
        if (res.status % 2 == 1) {
          this.basketList=basketList
        }
      } catch (error) {
        console.error("获取篮子数据失败：", error);
      }
    },

  },
  getters: {
    // 根据 type 获取对应的 basketId
    getbasketIdBytype: (state) => (type) => {
      const basket = state.basketList.find((b) => b.type === type);
      return basket ? basket.basketId : [];
    },
    // 通过type找到对应的routeBasket
    getBasketBytype:(state)=>(type)=>{
      // 找到对应的 routeBasket
      const routeBasket = state.basketList.find(
        (basket) => basket.type === type
      );
      return routeBasket ? routeBasket : {};
    }


  },
  // - 退出时的操作：
});
