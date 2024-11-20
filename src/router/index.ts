import { createRouter,createWebHashHistory } from "vue-router";

const routes = [
  {
    path:'/',
    redirect:'/first'
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
        redirect: 'basket',  // 重定向到默认子路由
        children:[
          {
            path:'/basket',
            name:'basket',
            component:()=>import('@/views/normal/Basket.vue')
          },

    // 特殊的路由：
    {
      path:'importance',
      name:'importance',
      component:()=>import('@/views/normal/sepcial/importance/Importance.vue'),
      // props(route:any){
      //   return route.query
      // },
    },
    {
      path:'goals',
      name:'goals',
      component:()=>import('@/views/goals/Goals.vue')
    },
    {
      path:'tags',
      name:'tags',
      component:()=>import('@/views/tags/Tags.vue')
    },
  ]
  // 两个特殊功能的路由：
    },
    {
      path:'/clear',
      name:'clear',
      component:()=>import('@/views/clear/Clear.vue')
    },
    {
      path:'/ai',
      name:'ai',
      component:()=>import('@/views/AI/AI.vue')
    },
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router;
