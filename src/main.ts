import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import pinia from '@/stores'
import router from "./router";
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "@/assets/css/style.css";
const app = createApp(App)
app.use(pinia)
app.use(router)
// app.use(createPinia())
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
