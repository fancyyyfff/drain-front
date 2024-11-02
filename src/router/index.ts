import { pa } from "element-plus/es/locales.mjs";
import { createRouter,createWebHashHistory } from "vue-router";

const routes = [
  {
    path:'/',
    redirect:'/menu'
  },
  {
    path:'/index',
    name:'index',
    component:()=>import('@/views/index/Index.vue')
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
        children:[

      {
        path:'/actions',
        name:'actions',
        component:()=>import('@/views/actions/Actions.vue'),

    },
    {
      path:'/importance/',
      name:'importance',
      component:()=>import('@/views/importance/Importance.vue'),
      // props(route:any){
      //   return route.query
      // },
    },
    {
      path:'/schedule',
      name:'schedule',
      component:()=>import('@/views/schedule/Schedule.vue')
    },
    {
      path:'/works',
      name:'works',
      component:()=>import('@/views/works/Works.vue')
    },
    {
      path:'/goals',
      name:'goals',
      component:()=>import('@/views/goals/Goals.vue')
    },
    {
      path:'/thoughts',
      name:'thoughts',
      component:()=>import('@/views/thoughts/Thoughts.vue')
    },
    {
      path:'/entrust',
      name:'entrust',
      component:()=>import('@/views/entrust/Entrust.vue')
    },
    {
      path:'/tags',
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


// 在导航守卫中添加query数据
// router.beforeEach((to, from, next) => {
//   if (to.path === '/importance' && !to.query.title) {
//     next({ ...to, query: { title: '重要' } });
//   } else {
//     next();
//   }
// });

export default router;
