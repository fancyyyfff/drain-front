import { createRouter,createWebHashHistory } from "vue-router";
import { useBasketStore } from "@/stores/basket";
const routes = [
  {
    path:'/',
    redirect:'/first'  //开始跳转的路径
    // redirect:'/menu'
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
    // 任务全部渲染到Basket
    {
      path:'/basket/:basketId/:type/:basketName',
      name:'basket',
      component:()=>import('@/views/normal/Basket.vue'),
      props:true
      // props: route => {
      //   const type = Number(route.params.type);
      //   return { type: !isNaN(type) ? type : 0 };  // 如果转换失败，给一个默认值
      // }
    },
    {
      path:'/basket/:type/:basketName',
      name:'importance',
      component:()=>import('@/views/normal/Basket.vue'),
      props:true
      // props: route => {
      //   const type = Number(route.params.type);
      //   return { type: !isNaN(type) ? type : 0 };  // 如果转换失败，给一个默认值
      // }
    },
  ]
},
 // 两个vip路由：
//  {
//   path:'/vip/:basketId/:type/:basketName',
//   name:'drain',
//   component:()=>import('@/views/vip/clear/Clear.vue'),
//   props:true
// },
{
  path:'/vip/ai',
  name:'ai',
  component:()=>import('@/views/vip/AI/AI.vue'),
},

{
  path:'/manager',
  name:'manager',
  component:()=>import('@/views/manager/Manger.vue'),
},

]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router;
