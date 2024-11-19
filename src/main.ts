import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import pinia from '@/stores'
import router from "./router";
import App from './App.vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "@/assets/css/style.css";
import Message from "@/components/Message.vue";

const app = createApp(App)

app.use(pinia)
app.use(router)
// 全局注册组件自定义的消息弹窗
app.component('Message', Message);

// app.use(createPinia())
// app.use(ElementPlus, {
//   locale: zhCn,
// })

app.mount('#app')
