import { pa } from "element-plus/es/locales.mjs";
import { createRouter,createWebHashHistory } from "vue-router";

const routes = [
  {
    path:'/',
    redirect:'/first'
  },
  {
    path:'/first',
    name:'first',
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
        path:'/brain',
        name:'brain',
        component:()=>import('@/views/menu/Menu.vue'),
        // redirect: 'actions',  // 重定向到默认子路由
        children:[

      {
        path:'actions',
        name:'actions',
        component:()=>import('@/views/actions/Actions.vue'),

    },
    {
      path:'importance',
      name:'importance',
      component:()=>import('@/views/importance/Importance.vue'),
      // props(route:any){
      //   return route.query
      // },
    },
    {
      path:'schedule',
      name:'schedule',
      component:()=>import('@/views/schedule/Schedule.vue')
    },
    {
      path:'works',
      name:'works',
      component:()=>import('@/views/works/Works.vue')
    },
    {
      path:'goals',
      name:'goals',
      component:()=>import('@/views/goals/Goals.vue')
    },
    {
      path:'thoughts',
      name:'thoughts',
      component:()=>import('@/views/thoughts/index.vue')
    },
    {
      path:'entrust',
      name:'entrust',
      component:()=>import('@/views/entrust/Entrust.vue')
    },
    {
      path:'tags',
      name:'tags',
      component:()=>import('@/views/tags/Tags.vue')
    },
        ]
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
{
  path:'/new',
  name:'new',
  component:()=>import('@/views/new/New.vue')
},

]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router;
