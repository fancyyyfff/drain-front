import { defineStore } from "pinia";
import { getAllRouteBasket } from "@/api/basket"; // 假设接口名为 getUserBaskets
import { useUserStore } from "@/stores/user";
import { addTask,updateTaskBasket,getTask } from "@/api/task";

// 定义 Basket 接口（可选）
interface RouteBasket {
  routeKey:string|null;
  basketIds: []|null;
  mainTitle: string|null;
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
        mainTitle: '重要',
      },
      {
        routeKey:"ddl",
        basketIds: [1],
        mainTitle: 'DDL',
      },
      {
        routeKey:"goals",
        basketIds: [2],
        mainTitle: '多步骤任务',
      },
      {
        routeKey:"actions",
        basketIds: [3],
        mainTitle: '马上行动',
      },
      {
        routeKey:"works",
        basketIds: [4],
        mainTitle: '工作篮',
      },
      {
        routeKey:"entrusts",
        basketIds: [5],
        mainTitle: '委托他人',
      },
      {
        routeKey:"thoughts",
        basketIds: [6],
        mainTitle: '以后可能会做',
      },
      {
        routeKey:"tags",
        basketIds: [7],
        mainTitle: '标签',
      },
      {
        routeKey:"drain",
        basketIds: [8],
        mainTitle: '头脑风暴',
      },
      {
        routeKey:"ai",
        basketIds: [9],
        mainTitle: 'ai帮我做计划',
      },
  ],
  drainAndAiRouteBasket: [{
    routeKey:"drain",
    basketIds: [8],
    mainTitle: '头脑风暴',
  },
  {
    routeKey:"ai",
    basketIds: [9],
    mainTitle: 'ai帮我做计划',
  },]
  }),
  actions: {
    // - 对baskets的增删改操作
    // 初始渲染所有的篮子
    async fetchAllBaskets() {
      // 此段接通代码后应当不需要，目前只是为了有数据能够渲染
        // 过滤出 drain 和 ai 的篮子
        this.drainAndAiRouteBasket = this.routeBaskets.filter(
          (routeBasket) => routeBasket.routeKey === "drain" || routeBasket.routeKey === "ai"
        );
        // 更新 routeBaskets，移除 drain 和 ai 的篮子
        this.routeBaskets = this.routeBaskets.filter(
          (routeBasket) => routeBasket.routeKey !== "drain" && routeBasket.routeKey !== "ai"
        );

      try {
        const res = await getAllRouteBasket();
        const {routeBaskets}=res.data
        if (res.status % 2 == 1) {
          // 过滤出 drain 和 ai 的篮子
          this.drainAndAiRouteBasket = routeBaskets.filter(
            (routeBasket) => routeBasket.routeKey === "drain" || routeBasket.routeKey === "ai"
          );
          // 更新 routeBaskets，移除 drain 和 ai 的篮子
          this.routeBaskets = routeBaskets.filter(
            (routeBasket) => routeBasket.routeKey !== "drain" && routeBasket.routeKey !== "ai"
          );
        }
      } catch (error) {
        console.error("获取篮子数据失败：", error);
      }
    },
    // 如果一个routeKey对应一个basketId:
    async addTaskToSingleBasket(routeKey,taskId) {
      const basketIds=this.getBasketIdsByRouteKey(routeKey)
      // 仅有一个就是当前的这一个
      const basketId= basketIds[0]
      try {
        const task = {taskId:taskId,basketId:basketId}
        const res = await updateTaskBasket(taskId,basketId)
        if(res.status%2 ===1) {
          return true
        }else {
          return false
        }
      } catch (error) {
        console.error('修改任务到指定篮子失败', error);
      }
    },
    // 如果一个routeKey对应多个basketId:
    async addTaskToBaskets(routeKey,taskId){
      const taskToGet = {taskId:taskId,basketId:''}
      const res = await getTask(taskId)
      try {
        if(res.status%2===1) {
          const task = res.data
          if(task.deadline&&routeKey==='importance') {
            this.addBasketIdToBasketIds(task.basketId,routeKey)
          }else if(task.star===1&&routeKey==='importance') {
            this.addBasketIdToBasketIds(task.basketId,routeKey)
          }
        }
      } catch (error) {
        console.error('添加对象到对应的 basketRoute 失败', error);
      }
    },
    // 更新basketIds
    addBasketIdToBasketIds(newBasketId,routeKey) {
      const basketIds = this.getBasketIdsByRouteKey(routeKey)
      if (basketIds) {
        // 检查 basketId 是否已经存在
        if (!basketIds.includes(newBasketId)) {
          basketIds.push(newBasketId);
        } else {
          console.warn(`basketId ${newBasketId} 已存在于 routeKey ${routeKey} 中`);
        }
      } else {
        console.error(`未找到 routeKey 为 ${routeKey} 的 basket`);
      }
    },
  },
  getters: {
    // 根据 routeKey 获取对应的 basketIds
    getBasketIdsByRouteKey: (state) => (routeKey) => {
      const basket = state.routeBaskets.find((b) => b.routeKey === routeKey);
      return basket ? basket.basketIds : [];
    },
    // 通过routeKey找到对应的routeBasket
    getBasketByRouteKey:(state)=>(routeKey)=>{
      // 找到对应的 routeBasket
      const routeBasket = state.routeBaskets.find(
        (basket) => basket.routeKey === routeKey
      );
      return routeBasket ? routeBasket : {};
    }


  },
  // - 退出时的操作：
});
