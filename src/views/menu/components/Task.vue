<template>
<div class="task-wrap shine" @click="openSideBar">
  <!-- <Tick v-model="task.isFinish" icon-name="checkmark-done"  :taskId="task.taskId" @click.stop/> -->
  <Tick icon-name="checkmark-done"  :taskId="task.taskId" @click.stop/>
  <!-- <p class="task-text">{{taskValue}}</p> -->
  <p class="task-text" :style="textStyle" >{{ task.taskName }}</p>
  <div class="moveTo-warp" @click.stop>
    <el-dropdown>
    <span class="el-dropdown-link shine">
      moveTo
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>

      <template #dropdown >
      <el-dropdown-menu >
        <template v-for="moveItem in moveItems" :key="moveItem.name">
          <el-dropdown-item >{{ moveItem.name }}</el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  </div>
  <ion-icon name="trash-outline" class="delete-icon" @click="toDeleteTask" @click.stop></ion-icon>
  <Star v-model:starred="task.star" star-color="#efe299" :size="'1.5rem'" @click.stop />

</div>
</template>


<script setup lang="ts" name="">
import { ref,reactive,computed,watch, onMounted, onUnmounted } from 'vue'
import emitter from "@/mitt";
import { deleteTask,getTask,updateTaskName,updateTaskFinish } from "@/api/task";
import Tick from '@/components/Tick.vue';
// import { tourStepEmits } from 'element-plus/lib/components/index.js';
import Star from "@/components/Star.vue";
import { useTaskStore } from '@/stores/task';
import { useSideBarStore } from "@/stores/ui";
import { ArrowDown } from '@element-plus/icons-vue'
import { useRoute } from "vue-router";
const sideBarStore = useSideBarStore()
const taskStore = useTaskStore();
const route = useRoute()
 // 使用 defineProps 来接收来自父组件的 task 对象
const {task}=defineProps({
  task: {
    type: Object,
    required: false
  }
})



const finish = ref(false);
const drawer = ref(false)

function openSideBar() {

  // 先让sidebar渲染
  sideBarStore.render=!sideBarStore.render;
  sideBarStore.toggleSidebar(task.taskId)

}


emitter.on('addTagSign',addTagSign)
// ==
function addTagSign() {
  console.log('添加标签的符号到任务卡')
}

// 打勾的组件：

const textStyle = computed(() => {
  return {
    'text-decoration': task.isFinish===1? 'line-through' : 'none',
    'text-shadow': task.isFinish===1 ? 'none':'0 0 2px rgba(255, 255, 255, 0.5), 0 0 2px rgba(255, 255, 255, 0.5)' , // 添加发光效果
    'color': task.isFinish===1 ?  'gray':'white'
  };
});
async function handleTaskChange (isChecked:boolean)  {
  finish.value=isChecked
  // == 完成的任务放到最后面：
  if(finish.value===true) {
    console.log('需要把当前任务的id放到页面渲染数组的最后面')
  }
}

const moveItems = [
  {
    name:'马上行动',
  },
  {
    name:'DDL',
  }
]


// 控制星星
const item = ref({
  isStarred: false,
  // ... other item data
});

async function toDeleteTask() {
  emitter.emit('deleteTask',task.taskId)
  const taskDeleted = {
        taskId:task.taskId,
        basketId:task.basketId
      }
      // 前端模拟，后期删除：
  try {
    const res = await deleteTask(taskDeleted)
    if(res.status === 2015) {
      emitter.emit('deleteTask',task.taskId)
      alert('删除成功')
    }else {
      alert('删除失败，请检查网络')
    }
  } catch (error) {
    console.error('删除任务失败', error);
  }
}
</script>

<style lang="scss" scoped>
.task-wrap {
      display: flex;
      position: relative;
      width: 96%;
      height: 50px;
      padding:0 20px 0 20px;
      background: rgba(130, 127, 127, 0.2); /* 半透明白色背景 */
      border-radius: 10px;
      align-items: center;

      /* 移动项目的位置 */
      .moveTo-warp {
        position: absolute;
        right: 13%;
      }

      /* 删除图标的位置 */
      .delete-icon {
        position: absolute;
        right: 10%;
      }

      .task-text {
        font-size: 1.5rem;
        font-weight:700;
        margin-left:4%;
      }
}
/* 改变el组件的样式 */
.el-dropdown-link.shine {
  outline: none; /* 移除聚焦时的外框 */
  border: none; /* 移除边框 */
}

.el-dropdown-link.shine:focus,
.el-dropdown-link.shine:hover,
.el-dropdown-link.shine:active {
  outline: none; /* 鼠标悬停或点击时 */
  border: none; /* 同时移除边框 */
  box-shadow: none; /* 移除阴影效果 */
}

.example-showcase,.el-dropdown-link {
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  border: none;
  background:none;
}

</style>
