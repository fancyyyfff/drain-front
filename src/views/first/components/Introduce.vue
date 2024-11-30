<template>
  <div class="handwriting-animation">
    <span ref="textRef">{{ animatedText }}</span>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';

const textRef = ref(null);
const text = "Drain"; // 你要展示的文字
const animatedText = ref("");
const animationSpeed = 50; // 动画速度，数值越小越快

onMounted(() => {
  let charIndex = 0;
  const interval = setInterval(() => {
    animatedText.value += text[charIndex];
    charIndex++;
    if (charIndex === text.length) {
      clearInterval(interval);
    }
  }, animationSpeed);
});


import anime from 'animejs/lib/anime.es.js';

onMounted(() => {
 anime({
    targets: textRef.value,
    innerHTML: [0, text.length], // 从0到文本长度
    round: 1, // 四舍五入
    easing: 'easeInOutExpo', // 动画效果
    duration: text.length * animationSpeed, // 动画持续时间
    update: function(anim) {
      animatedText.value = text.substring(0, anim.animations[0].currentValue);
    }
  });
});


</script>

<style scoped>
.handwriting-animation {
  font-size: 2em; /* 根据需要调整字体大小 */
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

</style>

