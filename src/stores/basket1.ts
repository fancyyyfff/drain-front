import { defineStore } from "pinia";
import { getAllRouteBasket } from "@/api/basket"; // 假设接口名为 getUserBaskets
import { useUserStore } from "@/stores/user";
import { addTask,updateTaskBasket,getTask } from "@/api/task";

// 定义 Basket 接口（可选）
interface RouteBasket {
  type:string|null;
  basketIds: []|null;
  basketName: string|null;
}
// 主要的作用：获取当前用户下的每个basketId对应的basketName,
export const useBasketStore = defineStore("basket", {
  state: () => ({
    basketList:[
      {
        type:"importance",
        basketIds: [0],
        basketName: '重要',
      },
      {
        type:"ddl",
        basketIds: [1],
        basketName: 'DDL',
      },
      {
        type:"goals",
        basketIds: [2],
        basketName: '多步骤任务',
      },
      {
        type:"actions",
        basketIds: [3],
        basketName: '马上行动',
      },
      {
        type:"works",
        basketIds: [4],
        basketName: '工作篮',
      },
      {
        type:"entrusts",
        basketIds: [5],
        basketName: '委托他人',
      },
      {
        type:"thoughts",
        basketIds: [6],
        basketName: '以后可能会做',
      },
      {
        type:"tags",
        basketIds: [7],
        basketName: '标签',
      },
      {
        type:"drain",
        basketIds: [8],
        basketName: '头脑风暴',
      },
      {
        type:"ai",
        basketIds: [9],
        basketName: 'ai帮我做计划',
      },
  ],
  drainAndAiRouteBasket: [{
    type:"drain",
    basketIds: [8],
    basketName: '头脑风暴',
  },
  {
    type:"ai",
    basketIds: [9],
    basketName: 'ai帮我做计划',
  },]
  }),
  actions: {
    // - 对baskets的增删改操作
    // 初始渲染所有的篮子
    async fetchAllBaskets() {
      // 此段接通代码后应当不需要，目前只是为了有数据能够渲染
        // 过滤出 drain 和 ai 的篮子
        this.drainAndAiRouteBasket = this.basketList.filter(
          (routeBasket) => routeBasket.type === "drain" || routeBasket.type === "ai"
        );
        // 更新 basketList，移除 drain 和 ai 的篮子
        this.basketList = this.basketList.filter(
          (routeBasket) => routeBasket.type !== "drain" && routeBasket.type !== "ai"
        );

      try {
        const res = await getAllRouteBasket();
        const {basketList}=res.data
        if (res.status % 2 == 1) {
          // 过滤出 drain 和 ai 的篮子
          this.drainAndAiRouteBasket = basketList.filter(
            (routeBasket) => routeBasket.type === "drain" || routeBasket.type === "ai"
          );
          // 更新 basketList，移除 drain 和 ai 的篮子
          this.basketList = basketList.filter(
            (routeBasket) => routeBasket.type !== "drain" && routeBasket.type !== "ai"
          );
        }
      } catch (error) {
        console.error("获取篮子数据失败：", error);
      }
    },
    // 如果一个type对应一个basketId:
    async addTaskToSingleBasket(type,taskId) {
      const basketIds=this.getBasketIdsBytype(type)
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
    // 如果一个type对应多个basketId:
    async addTaskToBaskets(type,taskId){
      const taskToGet = {taskId:taskId,basketId:''}
      const res = await getTask(taskId)
      try {
        if(res.status%2===1) {
          const task = res.data
          if(task.deadline&&type==='importance') {
            this.addBasketIdToBasketIds(task.basketId,type)
          }else if(task.star===1&&type==='importance') {
            this.addBasketIdToBasketIds(task.basketId,type)
          }
        }
      } catch (error) {
        console.error('添加对象到对应的 basketRoute 失败', error);
      }
    },
    // 更新basketIds
    addBasketIdToBasketIds(newBasketId,type) {
      const basketIds = this.getBasketIdsBytype(type)
      if (basketIds) {
        // 检查 basketId 是否已经存在
        if (!basketIds.includes(newBasketId)) {
          basketIds.push(newBasketId);
        } else {
          console.warn(`basketId ${newBasketId} 已存在于 type ${type} 中`);
        }
      } else {
        console.error(`未找到 type 为 ${type} 的 basket`);
      }
    },
  },
  getters: {
    // 根据 type 获取对应的 basketIds
    getBasketIdsBytype: (state) => (type) => {
      const basket = state.basketList.find((b) => b.type === type);
      return basket ? basket.basketIds : [];
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
