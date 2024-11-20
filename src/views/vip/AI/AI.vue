<template>
<div class="ai-wrap shine">

    <h1>有什么可以帮忙的吗？</h1>
  <input type="text" placeholder="给AI发送消息" class="ai-input shine" >

</div>
</template>

<script setup lang="ts" name="">

</script>

<style scoped>
.ai-wrap {
  display: flex;
  position: fixed;
  top: 50%;
  left:50%;
  /* right: 0; */
  /* bottom: 0; */
  transform: translate(-50%,-50%);

  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 80vh;

  .ai-input {
    border: none;
    outline: none;
    width: 40vw;
    height: 5vh;
    color:white;

  }


}
</style>
