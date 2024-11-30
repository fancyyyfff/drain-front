<template>
  <el-dialog v-model="centerDialogVisible" title="Warning" width="500" center  class="shine">
    <span>
      你想要订阅吗？
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false" class="shine">不了</el-button>
        <el-button type="primary" @click="" class="shine">
          想！
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import  emitter from "@/mitt";
import { useUserStore } from "@/stores/user";
import { updateUserRole } from "@/api/user";
import { VIP } from "@/const/type";


const userStore = useUserStore()
const centerDialogVisible = ref(false)
emitter.on('openOrderMessage',handleOpenOrderMessage)
function handleOpenOrderMessage() {
  centerDialogVisible.value=true
}

async function handleOrder() {
  userStore.setRole(VIP)

  try {
    const res = await updateUserRole(userStore.user.userId,userStore.user.role)
    if(res.status%2===1) {
      userStore.setRole(VIP)
    }
  } catch (error) {
    console.error('更新用户角色失败', error);
  }
  centerDialogVisible.value = false
}
</script>

<style  lang="scss" scoped>

</style>
