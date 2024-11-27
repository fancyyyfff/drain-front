<template>
  <div
    class="task-tick"
    :style="{
      backgroundColor: taskIsFinish ? checkedColor : '',
      borderColor: taskIsFinish ? checkedColor : borderColor,
      width: `${size}px`,
      height: `${size}px`,
    }"
    @click="toggleTick"
  >
    <ion-icon v-if="taskIsFinish" :name="iconName" :color="iconColor"></ion-icon>
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
  taskId:number;
  isFinish: number;
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

// 定义事件
const emit = defineEmits(['update:isFinish']);

// 任务完成状态（父组件传递进来的值）
const taskIsFinish = computed(() => props.isFinish);

async function toggleTick  () {
  // 后期删掉：
 const newIsFinish = taskIsFinish.value === 1 ? 0 : 1;
  // 通知父组件任务完成状态的变化
  emit('update:isFinish', newIsFinish);
  // taskStore.toggleTaskFinish()
  // 切换前 发送请求
  try {
    const res = await updateTaskFinish(props.taskId)
    // 点击的时候，先改变状态，接收值
    if(res.status===2019) {
       // 通知父组件任务完成状态的变化
       emit('update:isFinish',newIsFinish);
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

