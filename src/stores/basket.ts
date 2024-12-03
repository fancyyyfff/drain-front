import { defineStore } from "pinia";
import { getAllBaskets } from "@/api/basket";
import type { Basket } from "@/types/type";
// 主要的作用：获取当前用户下所有列表，用于一开始的渲染
export const useBasketStore = defineStore("basket", {
  state: () => ({
    basketList:[
      // {
      //   type:2,
      //   basketId: 1,
      //   basketName: '截至日期',
      // },
      // {
      //   type:3,
      //   basketId: 2,
      //   basketName: '多步骤任务',
      // },
      // {
      //   type:0,
      //   basketId: 3,
      //   basketName: '马上行动',
      // },
      // {
      //   type:0,
      //   basketId: 4,
      //   basketName: '工作篮',
      // },
      // {
      //   type:0,
      //   basketId: 5,
      //   basketName: '委托他人',
      // },
      // {
      //   type:0,
      //   basketId: 6,
      //   basketName: '以后可能会做',
      // },
  ] as Basket[],
  // 移动项目
  moveItems:<Basket[]>[
    // {
    //   type:2,
    //   basketId: 1,
    //   basketName: '截至日期',
    // },
    // {
    //   type:3,
    //   basketId: 2,
    //   basketName: '多步骤任务',
    // },
    // {
    //   type:0,
    //   basketId: 3,
    //   basketName: '马上行动',
    // },
    // {
    //   type:0,
    //   basketId: 4,
    //   basketName: '工作篮',
    // },
    // {
    //   type:0,
    //   basketId: 5,
    //   basketName: '委托他人',
    // },
    // {
    //   type:0,
    //   basketId: 6,
    //   basketName: '以后可能会做',
    // },
  ] as Basket[],
    // basketList: [] as Basket[], // 移动项目
    // moveItems: [] as Basket[],
    // 当前的basketId，随路由变化而变化
    currentBasketId: -1,
  }),
  actions: {
    getCurrentBasketId(){
      return this.currentBasketId
    },
    setBasketList(basketList: Basket[]){
      this.basketList=basketList
    },
    // 设置currentBasketId
    setCurrentBasketId(currentBasketId: number){
      this.currentBasketId=currentBasketId
      this.updateMoveItems()
    },
    // 前端模拟：获取所有任务:
    getBasketList(){
      return this.basketList

    },
    // 过滤出currentBasketId的
    updateMoveItems() {
      this.moveItems = this.basketList.filter(item => item.basketId !== this.currentBasketId);
    },
    // - 对baskets的增删改操作
    // 初始渲染所有的篮子
    async fetchAllBaskets() {
      // 后期删掉：
      this.getBasketList()

      try {
        const res = await getAllBaskets();

        if (res.status % 2 == 1) {
          this.setBasketList(res.data);
          console.log("获取篮子数据成功：", this.basketList);
        }
      } catch (error) {
        console.error("获取篮子数据失败：", error);
      }
    },

  },
  getters: {
    // 获取moveItems，供Vue组件使用
    getMoveItems(state) {
      return state.moveItems;
    },
    // 根据 type 获取对应的 basketId
    getbasketIdBytype: (state) => (type: number) => {
      const basket = state.basketList.find((b) => b.type === type);
      return basket ? basket.basketId : [];
    },
    // 通过type找到对应的routeBasket
    getBasketBytype:(state)=>(type: number)=>{
      // 找到对应的 routeBasket
      const routeBasket = state.basketList.find(
        (basket) => basket.type === type
      );
      return routeBasket ? routeBasket : {};
    }
  },
  // - 退出时的操作：
});
