<template>
  <div
    class="task-tick"
    :style="{
      backgroundColor: taskIsFinish===1 ? checkedColor : '',
      borderColor: taskIsFinish===1 ? checkedColor : borderColor,
      width: `${size}px`,
      height: `${size}px`,
    }"
    @click="toggleTick"
  >
    <ion-icon v-if="taskIsFinish===1" :name="iconName" :color="iconColor"></ion-icon>
  </div>
</template>

<script lang="ts" setup>
import { updateTaskFinish } from '@/api/task';
import { useTaskStore } from '@/stores/task';
import { computed, withDefaults } from 'vue';

const taskStore = useTaskStore()

// 以下属性都是可选的
interface Props {
  iconName?: string;
  iconColor?: string;
  checkedColor?: string;
  borderColor?: string;
  defaultChecked?: boolean;
  size?: number;
  taskId:number
}
// 设置了默认值，父组件可以重新定义
const props = withDefaults(defineProps<Props>(), {
  iconName: 'checkmark-done',
  iconColor: '#d0c7c7',
  checkedColor: '#aeabab',
  borderColor: '#e9e3e3',
  defaultChecked: false,
  size: 18,
  taskId: -1,
});

// 获取对应 taskId 的任务（使用 computed 保持响应式）
// const task = computed(() => taskStore.getTaskById(props.taskId));

// 获取当前任务的完成状态
const taskIsFinish = computed(() => {
  const task = taskStore.getTaskById(props.taskId);
  return task ? task.isFinish : false;  // 默认返回false，避免undefined错误
});


async function toggleTick  () {
  // 后期删掉：
  taskStore.toggleTaskFinish(props.taskId)

  // 切换前 先更新状态，发送请求
  try {
    const res = await updateTaskFinish(task.taskId)
    // 点击的时候，先改变状态，接收值
    if(res.status===2019) {
      // 切换值，使用传入的taskId
      taskStore.toggleTaskFinish(taskId)
    }
  } catch (error) {
    console.error('更新任务的选中状态失败', error);
  }

};


</script>

<style scoped>
.task-tick {
  border-radius: 50%;
  border: 2px solid;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.task-tick:hover {
  background-color: #e0e0e0;
  color: #d0c7c7;
  color: rgb(174, 171, 171);
}

.task-tick .ion-icon {
  font-size: 18px;
}
</style>

