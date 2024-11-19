<template>
  <div class="message-div" v-if="isShow">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps,onMounted,watch } from 'vue';

interface Props {
  message: string;
  duration?: number;
  showMessage: (show: boolean) => void; //  更清晰的类型定义
}

const props = withDefaults(defineProps<Props>(), {
  message: '欢迎使用drain',
  duration: 1500,
  showMessage: (show) => {},
});

const message = props.message;
const isShow = ref(false);


//  父组件调用 showMessage 时，传入 true 或 false 来控制显示
onMounted(() => {
  props.showMessage(true); //  组件挂载后显示消息
});

watch(() => props.showMessage, (newShowMessage) => {
    newShowMessage(isShow.value);
})

watch(isShow, (newIsShowValue) => {
    if(newIsShowValue){
        setTimeout(() => {
            isShow.value = false;
        },props.duration)
    }
})

</script>
