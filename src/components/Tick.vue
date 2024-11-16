<template>
  <div
    class="task-tick"
    :style="{
      backgroundColor: isChecked ? checkedColor : '',
      borderColor: isChecked ? checkedColor : borderColor,
      width: `${size}px`,
      height: `${size}px`,
    }"
    @click="toggleTick"
  >
    <ion-icon v-if="isChecked" :name="iconName" :color="iconColor"></ion-icon>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, withDefaults } from 'vue';

// 以下属性都是可选的
interface Props {
  iconName?: string;
  iconColor?: string;
  checkedColor?: string;
  borderColor?: string;
  defaultChecked?: boolean;
  size?: number;
}
// 设置了默认值，父组件可以重新定义
const props = withDefaults(defineProps<Props>(), {
  iconName: 'checkmark-done',
  iconColor: '#d0c7c7',
  checkedColor: '#aeabab',
  borderColor: '#e9e3e3',
  defaultChecked: false,
  size: 18,
});
// 当选中时触发的事件，会暴露出去，父组件可重写
const emit = defineEmits<{
  (e: 'update:checked', value: boolean): void;
}>();

// 切换选中的状态
const isChecked = ref(props.defaultChecked);

const toggleTick = () => {
  isChecked.value = !isChecked.value;
  emit('update:checked', isChecked.value);
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

