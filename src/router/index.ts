import { createRouter,createWebHashHistory } from "vue-router";
import { useBasketStore } from "@/stores/basket";
const routes = [
  {
    path:'/',
    // redirect:'/first'  //开始跳转的路径
    redirect:'/menu'
  },
  {
    path:'/first',
    name:'first',//首页
    component:()=>import('@/views/first/First.vue')
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('@/views/user/login/Login.vue')
},
{
  path:'/register',
  name:'register',
  component:()=>import('@/views/user/register/Register.vue')
},
{
  path:'/menu',
  name:'menu',
  component:()=>import('@/views/menu/Menu.vue'),
  //redirect: 'basket',  // 重定向到默认子路由
  children:[
    {
      path:'/basket/:basketId',
      name:'basket',
      component:()=>import('@/views/normal/Basket.vue'),
      // 以下操作通过 meta 动态注入 basketName，再在导航或视图中显示
      meta: { basketName: "" }, // 默认值
      beforeEnter:async (to) => {
        const basketStore = useBasketStore();
        const basketName = basketStore.getBasketNameById(to.params.basketId as number);
        to.meta.basketName = basketName;
      },
    },

    // 特殊的路由：
    {
      path:'/importance',
      name:'importance',
      component:()=>import('@/views/normal/sepcial/importance/Importance.vue'),
      // props(route:any){
      //   return route.query
      // },
    },
    // 三个特殊的路由
    {
      path:'/importance',
      name:'importance',
      component:()=>import('@/views/normal/sepcial/importance/Importance.vue')
    },
    {
      path:'/goals',
      name:'goals',
      component:()=>import('@/views/normal/sepcial/goals/Goals.vue')
    },
    {
      path:'/tags',
      name:'tags',
      component:()=>import('@/views/normal/sepcial/tags/Tags.vue')
    },

    // 两个vip路由：
    {
      path:'/clear',
      name:'clear',
      component:()=>import('@/views/vip/clear/Clear.vue')
   },
    {
      path:'/ai',
      name:'ai',
      component:()=>import('@/views/vip/AI/AI.vue')
    },
  ]
}


]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router;
