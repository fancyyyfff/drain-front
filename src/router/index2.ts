import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/user/login/Login.vue';
import DashboardPage from '../views/DashboardPage.vue';
import Menu from '@/views/menu/Menu.vue';
import TaskListPage from '../views/TaskListPage.vue';
import { useUserStore } from '../store/userStore';
import Cookies from 'js-cookie';
// import axios from 'axios';
import axios from '@/http';

const routes = [
  { path: '/', component: Login },
  { path: '/menu', component: Menu },
];

// -- --- 此处放置需要登录的路由,还有需要控制用户权限的路由
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
    // next('/');
    return next('/login'); // 没有 token 时跳转到登录页面
  } else if (token && !userStore.userId) {
    try {
      // // 如果存在 Token 但用户未登录，自动验证 Token
      // const response = await axios.get('/api/validate-token', {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      // 使用自定义的 axios 实例验证 token
      const response = await axios.get('/api/validate-token');

      // --- 打印响应体确认对接
      if (response.data.code === 200) {
        // 如果 token 验证成功，继续导航
        const { userId, role, basketIds } = response.data;
        // 自动登录并设置用户状态
        // -- 畅通后:加上用户的名字和昵称
        userStore.login(userId, role, basketIds, token);
        return next();
      } else {
        // 如果 token 无效，跳转到登录页面
        localStorage.removeItem('token');
        return next('/login');
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      Cookies.remove('token'); // 清除无效 Token
      return next('/login');
    }
  } else {
    // 如果没有需要验证 token 的情况，直接继续
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
