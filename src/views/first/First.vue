<template>
<Drain>
  <div class="handwriting-animation">
    <span ref="textRef">{{ animatedText }}</span>
  </div>

  <div class="sunrise-animation">
    <div ref="sunRef" class="sun"></div>
  </div>

</Drain>
</template>

<script setup lang="ts" name="">
import Drain from '@/views/first/components/Drain.vue';


import { ref, onMounted, watch } from 'vue';
import anime from 'animejs/lib/anime.es.js';

const textRef = ref(null);
const text = "Drain"; // 你要展示的文字
const animatedText = ref("");
const animationSpeed = 50; // 动画速度，数值越小越快
const sunRef = ref(null);

onMounted(() => {
  let charIndex = 0;
  const interval = setInterval(() => {
    animatedText.value += text[charIndex];
    charIndex++;
    if (charIndex === text.length) {
      clearInterval(interval);
    }
  }, animationSpeed);

  anime({
    targets: sunRef.value,
    translateY: ['100%', '0%'], // 从底部上升到顶部
    easing: 'easeOutElastic(1, .8)', // 弹性效果
    duration: 2000, // 动画持续时间
    loop: false, // 是否循环播放
  });
});

</script>

<style lang="scss" scoped>
.handwriting-animation {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  font-size: 10em; /* 根据需要调整字体大小 */
  font-family: 'Pacifico', cursive;
  /* 其他样式 */
}

/* 可选：模拟手写效果的样式 */
.handwriting-animation span {
  display: inline-block; /* 使其成为块级元素，以便应用动画 */
  animation: handwriting 2s linear forwards; /* handwriting动画，持续2秒，线性，向前播放 */
}

@keyframes handwriting {
  0% {
    transform: translateY(20px); /* 开始时向上偏移 */
    opacity: 0;
  }
  100% {
    transform: translateY(0); /* 结束时回到原位 */
    opacity: 1;
  }
/* 添加一些抖动效果 */

  80%, 100% {
    transform: translateY(0) rotate(0.5deg);
  }
  85% {
    transform: translateY(0) rotate(-0.5deg);
  }
  90% {
    transform: translateY(0) rotate(0.25deg);
  }
  95% {
    transform: translateY(0) rotate(-0.25deg);
  }
}


.sunrise-animation {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
}

.sun {
  width: 100px;
  height: 100px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(255,217,30,1) 0%, rgba(255,165,0,1) 35%, rgba(255,127,80,0) 100%); /* 径向渐变 */
  box-shadow: 0 0 50px rgba(255, 165, 0, 0.8); /* 光晕效果 */
  border-radius: 50%;
}

</style>
