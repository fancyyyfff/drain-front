import { defineStore } from 'pinia';
import { watch } from 'vue';
import { useRoute, type RouteRecordName } from 'vue-router'; // 使用 type 导入类型

export const useTaskStore = defineStore('task', {
  state: () => ({
    currentRoute: null as RouteRecordName | null,
    currentBasketName: '',
    routeBasketMap: {
      'actions': '马上行动',
      'schedule': 'DDL',
      'importance': '重要',
      'works': '工作篮',
      'goals': '多任务步骤',
      'thoughts': '想法&愿景',
      'entrust': '委托他人',
      'tags': '标签',
    } as Record<string, string>, // 使用 string 作为键类型，更灵活
  }),
  getters: {
    getCurrentBasketName: (state) => state.currentBasketName,
  },
  actions: {
    updateCurrentRoute(routeName: string | symbol | null | undefined) {
      this.currentRoute = routeName as RouteRecordName | null; // 类型断言
      this.updateCurrentBasketName();
    },
    updateCurrentBasketName() {
      // 使用可选链和空值合并运算符处理空值，并使用 toString() 处理 symbol
      this.currentBasketName = this.routeBasketMap[this.currentRoute?.toString() ?? ''] ?? '';
    },
  },
});
