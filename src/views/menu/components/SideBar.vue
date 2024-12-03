<template>
  <div v-if="sideBarStore.render">
  <!-- 侧边栏 -->
  <aside :class="{ 'sidebar-open': sideBarStore.sidebarOpen }" class="sidebar">


       <header class="sidebar-header">
         <div class="close" @click="sideBarStore.toggleSidebar">
         <img src="@/assets/close.svg" alt="" class="close-img">
         </div>

         <div class="sidebar-tag">
           <div class="sidebar-tag-text-wrap">
             <div v-for="tag in tagList" key="index">
               <span class="add-tage">#</span>
               {{ tag }}
             </div>
           </div>
           <div class="sidebar-tag-more">></div>
         </div>
       </header>

         <!-- 主要内容： -->
         <div class="sidebar-main-content">

           <div class="detail-wrap shine" >
             <!-- <Tick v-model="task.isFinish" icon-name="checkmark-done"  :taskId="task.taskId" @click.stop/> -->
             <Tick icon-name="checkmark-done"   :taskId="task.id" v-model:isFinish="task.isFinish"  @click.stop/>
             <input class="task-input" :style="textStyle" v-model="task.taskName"/>
             <Star :taskId="task.id" v-model:star="task.star" star-color="#efe299" :size="'1.5rem'" @click.stop />
           </div>

           <!-- 提醒插槽，由DDL的组件定义 -->
           <slot name="ddl"></slot>

           <!-- 附件 -->
             <div class="detail-wrap shine add-action" >
                 <ion-icon name="attach-outline" class="detail-icon"></ion-icon>
                 <p class="detail-text" @click="addAttachment">添加附件</p>
               </div>

               <!-- 备注 -->
                <!-- <div class="detail-wrap remarks-wrap">
                  <div class="div-edit remarks-div shine" contenteditable="true" @input="onInput" style="display: line-block; width: 100%; min-height: 100px;"></div>
                </div> -->
                <div class="div-edit remarks-div shine" contenteditable="true"
                   :data-placeholder="placeholderText"
                   @input="onInput"
                   @focus="onFocus"
                   @blur="onBlur"
                   ref="editableDiv"
                >{{ task.remark }}</div>
           </div>

           <!-- 底部 -->
         <footer class="sidebar-footer">
           <div class="sidebar-tag">
             <span class="add-tag">#</span>
             <input type="text" placeholder="添加标签" class="shine tag-input" v-model="tagValue" @keydown.enter="addTag">
           </div>
           <div class="sidebar-create">创建于{{ task.createTime }}</div>
         </footer>
     </aside>
    </div>
 </template>

 <script setup lang="ts" name="">
 import { ref,onMounted,onBeforeUnmount, reactive,watchEffect,computed,watch  } from 'vue';
 import emitter from "@/mitt";
 import { updateTaskRemark } from "@/api/task";
 import Star from "@/components/Star.vue";
 import Tick from '@/components/Tick.vue';
 import { useSideBarStore } from "@/stores/ui";
 import { useTaskStore } from "@/stores/task";
 import type { Task } from "@/types/type";

 const sideBarStore = useSideBarStore()
 const taskStore = useTaskStore()
 const task = computed(()=>taskStore.task)

 // div实现的文本编辑框，在其中添加占位的内容
 const editableDiv = ref<HTMLDivElement | null>(null);
 const  placeholderText = ref('');
 onMounted(()=>{
   // 初始时，如果没有内容，显示 placeholder
   const div = editableDiv.value;
   if (div && div.innerHTML.trim() === '') {
     div.classList.add('placeholder');
   }
  //  清空备注的占位：
  if(task && task.value.remark) {
    placeholderText.value=''
  }else {
    placeholderText.value='请输入内容...'

  }
 })

 const onInput = () => {
   const div = editableDiv.value;
   // 当用户输入内容时清除 placeholder
   if (div && div.innerHTML.trim() !== '') {
     div.classList.remove('placeholder');
   } else {
     if(div) div.classList.add('placeholder');
   }
 };

 const onFocus = () => {
   // 在聚焦时，如果没有内容，显示 placeholder
   const div = editableDiv.value;
   if (div && div.innerHTML.trim() === '') {
     div.classList.add('placeholder');
     div.classList.add('div-edit-focus');

   }
 };

 const onBlur = async () => {
   const div = editableDiv.value;
   if(div) div.classList.remove('div-edit-focus');
  //  修改备注：
  //  taskStore.modifyTaskRemark(task.value?.taskId,task.value?.remark)
   // 当失去焦点时，如果没有内容，则显示 placeholder
   if (div && div.innerHTML.trim() === '') {
     div.classList.add('placeholder');
   }
   try {
    const res = await updateTaskRemark(task.value?.taskId,div.innerHTML.trim())
    taskStore.setRemark(div.innerHTML.trim())
    if(res.status % 2 === 1) {
      console.log(res.message);
    }else {
      ElMessage({
        message: res.data.message,
        type: 'error',
      })
    }
   } catch (error) {
    console.log(error);
   }

 };

 // 添加标签：
 const tagList = reactive<string[]>(['前端'])
 const tagValue = ref('')
 async function addTag() {
   tagList.push(tagValue.value)
   tagValue.value=''

 }

 // 添加附件
 function addAttachment() {
   // ==
   console.log('添加附件逻辑')
 }

 // == 控制星星
 const item = ref({
   isStarred: false,
   // ... other item data
 });

 // == 控制完成
 // 完成与否的文字变化效果切换
 const textStyle = computed(() => {
   return {
     'text-decoration': task.value.isFinish===1 ? 'line-through' : 'none',
     'color': task.value.isFinish===1 ?  'gray':'white'
   };
 });

 </script>

 <style lang="scss" scoped>
 /* 文本编辑框中写入的内容 */
 @mixin div-edit-before {
         content: attr(data-placeholder);
         color: #d7d6d6;
         position: absolute;
         top: 20px;
         left: 20px;
         pointer-events: none;
 }

 /* 侧边栏样式 */
 .sidebar {
   width: 0;
   height: 96vh;
   min-height: 250px;
   /* align-items: center; */
   overflow: hidden;
   transition: width 0.3s ease; /* 添加过渡效果 */
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;

   .sidebar-header,.sidebar-footer {
     width: 350px;
     height: 70px;
   }

   /* 侧边栏头部部分 */
   .sidebar-header {
     display: grid;
     grid-template-rows: 0.9fr 1.1fr;

     .close {
       position: relative;

       .close-img {
         position: absolute;
         right: 15px;
         top: 10px;
       }
     }

     /* 标签 */
     .sidebar-tag {
       display: flex;
       justify-content: space-between;
       align-items: center;
       padding-left: 10px;
       padding-right: 25px;
       border-top: 0.5px solid rgba(255, 255, 255, 0.2);
       border-bottom: 0.5px solid  rgba(255, 255, 255, 0.2);

       /* 包裹的标签文字 */
       .sidebar-tag-text-wrap {
         display: flex;
         justify-content: flex-start;
         align-items: center;
         column-gap:20px;

         >div {
           font-size: 1rem;
           color: rgb(178, 181, 140);

         }

       }

       .sidebar-tag-more {
         width: 20px;
         height: 20px;

       }

     }

   }

   /* 侧边栏主体部分 */
   .sidebar-main-content {
     flex:1;
     overflow-x: hidden;
     overflow-y: auto;
     display: flex;
     flex-direction: column;
     width: 100%;
     /* margin-top: 50px; */
     align-items: center;
     row-gap: 10px;
     padding-top: 20px;

     /* 文本编辑框 */
     .remarks-div {
       position: relative;
     }

       .placeholder::before {
         @include div-edit-before();

       }

       .placeholder:empty::before {
         @include div-edit-before();
       }

     /* 单个任务的： */
     .detail-wrap {
       display: flex;
       position: relative;
       width: 70%;
       height: 50px;
       padding:0 40px 0 40px;
       gap: 20px;
       border-radius: 10px;
       align-items: center;

       .task-input {
         // color: white;
         font-size: 1.5rem;
         font-weight:700;
         margin-left:4%;
         background: none;
         outline: none;
         border: none;
         color: white;
       }

       .start {
         position: absolute;
         right: 3%;
       }

       .detail-text {
         font-size: 1.2rem;
         margin-left: 10px;
       }

     }

   }

   .sidebar-footer {
     display: grid;
     grid-template-rows: 1fr 1fr;
     justify-content: center;
     align-items: center;

     .sidebar-tag {
       display: flex;
       position: relative;
       // width: 90%;

       .add-tag {
         position: absolute;
         top: 3px;
         left: 5px;
       }

       .tag-input {
         width: 100%;
         height: 25px;
         padding: 0 10px 0 20px;
         border: none;
         outline: none;
         color: white;
         background: none;
       }

       .tag-input::placeholder {
         color: white;
       }

     }

     .sidebar-create {
       border-top: 0.5px solid white; /* 1px 细的白色上边框 */
     }

   }

 }
 // #符号的样式：
 .add-tage {
   font-size: 1rem;
   color: rgb(178, 181, 140);
 }

 .sidebar-open {
     width: 350px ; /* 侧边栏打开时的宽度 */
 }
 </style>
