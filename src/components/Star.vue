<template>
  <ion-icon :name="isStarred ? 'star' : 'star-outline'" @click="toggleStar" :style="starStyle"></ion-icon>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import { useTaskStore } from "@/stores/task";
import { updateTaskStar } from "@/api/task";
const taskStore = useTaskStore()
const props = defineProps({
  // initialStarred: {
  //   type: Boolean,
  //   default: false
  // },
  starColor: {
    type: String,
    default: '#f7db70'
  },
  outlineColor: {
    type: String,
    default: 'var(--ion-color-medium)'
  },
  size: {
    type: String,
    default: '2rem'
  },
  star: {
    type: Number,
    default: 0
  },
  taskId: {
    type: Number,
    default: -1
  },

});

const emit = defineEmits(['update:star']);

const isStarred = computed(()=>props.star)

const starStyle = computed(() => {
  return {
    color: isStarred.value ? props.starColor : props.outlineColor,
    fontSize: props.size,
    '--ionicon-stroke-width': isStarred.value ? '40px' : '15px',
    filter: isStarred.value ? `drop-shadow(0 0 5px ${props.starColor})` : 'none'
  };
});


async function toggleStar  () {
  const newIsStarred = isStarred.value === 1 ? 0 : 1;
  // 后期删掉：
//   // 通知父组件任务完成状态的变化
//   emit('update:star', newIsStarred);

  // taskStore.toggleTaskStar()
  // ---
  // 切换前 发送请求
  try {
    const res = await updateTaskStar(props.taskId)
    // 点击的时候，先改变状态，接收值
    if(res.status===2013) {
       // 通知父组件任务完成状态的变化
       emit('update:star',newIsStarred);
    }
  } catch (error) {
    console.error('更新任务的选中状态失败', error);
  }

};

</script>

<style lang="scss" scoped>
ion-icon {
  position: absolute;
  right: 3%;
}

</style>
