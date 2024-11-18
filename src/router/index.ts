import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import DashboardPage from '../views/DashboardPage.vue';
import MenuPage from '../views/MenuPage.vue';
import TaskListPage from '../views/TaskListPage.vue';
import { useUserStore } from '../store/userStore';
import Cookies from 'js-cookie';
import axios from 'axios';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/menu', component: MenuPage },
];

const dynamicRoutes = [
  {
    path: '/dashboard/:basketId',
    component: DashboardPage,
    meta: { requiresAuth: true }, // 需要登录权限
  },
  {
    path: '/tasks/:taskId',
    component: TaskListPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const token = Cookies.get('token');

  if (to.meta.requiresAuth && !token) {
    // 如果需要登录但没有 Token，跳转到登录页面
    next('/');
  } else if (token && !userStore.userId) {
    try {
      // 如果存在 Token 但用户未登录，自动验证 Token
      const response = await axios.get('/api/validate-token', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { userId, role, basketIds } = response.data;

      // 自动登录并设置用户状态
      userStore.login(userId, role, basketIds, token);

      next();
    } catch (error) {
      console.error('Token validation failed:', error);
      Cookies.remove('token'); // 清除无效 Token
      next('/');
    }
  } else {
    next();
  }
});

// 动态添加路由
export function setupDynamicRoutes(basketIds: string[]) {
  basketIds.forEach((basketId) => {
    router.addRoute({
      path: `/dashboard/${basketId}`,
      component: DashboardPage,
    });
  });
}

export default router;
