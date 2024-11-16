<template>
  <ion-icon :name="isStarred ? 'star' : 'star-outline'" @click="toggleStar" :style="starStyle"></ion-icon>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  initialStarred: {
    type: Boolean,
    default: false
  },
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
  }
});

const emit = defineEmits(['update:starred']);

const isStarred = ref(props.initialStarred);

const starStyle = computed(() => {
  return {
    color: isStarred.value ? props.starColor : props.outlineColor,
    fontSize: props.size,
    '--ionicon-stroke-width': isStarred.value ? '40px' : '15px',
    filter: isStarred.value ? `drop-shadow(0 0 5px ${props.starColor})` : 'none'
  };
});

const toggleStar = () => {
  isStarred.value = !isStarred.value;
  emit('update:starred', isStarred.value);
};
</script>

<style lang="scss" scoped>
ion-icon {
  position: absolute;
  right: 3%;
}

</style>
