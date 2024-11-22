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
      path:'/basket/:routeKey/:mainTile',
      name:'basket',
      component:()=>import('@/views/normal/Basket.vue'),
      props:true
    },

    // 四个特殊的路由
    {
      path:'/basket/importance',
      name:'importance',
      component:()=>import('@/views/normal/sepcial/importance/Importance.vue')
    },
    {
      path:'/basket/ddl',
      name:'ddl',
      component:()=>import('@/views/normal/sepcial/ddl/DDL.vue')
    },
    {
      path:'/basket/goals',
      name:'goals',
      component:()=>import('@/views/normal/sepcial/goals/Goals.vue')
    },
    {
      path:'/basket/tags',
      name:'tags',
      component:()=>import('@/views/normal/sepcial/tags/Tags.vue')
    },


  ]
},
 // 两个vip路由：
 {
  path:'/vip/clear',
  name:'clear',
  component:()=>import('@/views/vip/clear/Clear.vue')
},
{
  path:'/vip/ai',
  name:'ai',
  component:()=>import('@/views/vip/AI/AI.vue')
},


]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router;
