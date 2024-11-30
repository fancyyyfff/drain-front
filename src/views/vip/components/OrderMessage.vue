<template>
  <el-dialog v-model="centerDialogVisible" title="Warning" width="500" center  class="shine">
    <span>
      你想要订阅吗？
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false" class="shine">不了</el-button>
        <el-button type="primary" @click="centerDialogVisible = false" class="shine">
          想！
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import  emitter from "@/mitt";
const centerDialogVisible = ref(false)

emitter.on('openOrderMessage',handleOpenOrderMessage)
function handleOpenOrderMessage() {
  centerDialogVisible.value=true
}
</script>

<style  lang="scss" scoped>

</style>
