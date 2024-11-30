<template>
  <el-dialog v-model="centerDialogVisible" title="Warning" width="500" center  class="shine">
    <span>
      你想要订阅吗？
    </span>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleOpenDialog" class="shine">不了</el-button>
        <el-button type="primary" @click="showInput=true" class="shine">
          想！
        </el-button>
        <el-input type="text shine" placeholder="请输入金额" v-model="count" v-if="showInput" @keyup.enter="handleOrder"/>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import  emitter from "@/mitt";
import { useUserStore } from "@/stores/user";
import { updateUserRole,subscribe } from "@/api/user";
import { VIP } from "@/const/type";

const showInput= ref(false)
const count= ref('')
const userStore = useUserStore()
const centerDialogVisible = ref(false)
emitter.on('openOrderMessage',handleOpenOrderMessage)
function handleOpenOrderMessage() {
  centerDialogVisible.value=true
}

function handleOpenDialog() {
  centerDialogVisible.value = false
  console.log('centerDialogVisible.value', centerDialogVisible.value);
  centerDialogVisible.value=false
}
// 订阅成功：进入头脑风暴
async function handleOrder() {
  try {
    const res= await subscribe(count.value)
    if(res.status%2===1) {
      const res1 = await updateUserRole(userStore.user.role)
      if(res1.status%2===1) {
        userStore.setRole(VIP)
        emitter.emit('openBrainDialog')
      }
    }
  } catch (error) {
    console.error('更新用户角色失败', error);
  }
  centerDialogVisible.value = false
}
</script>

<style  lang="scss" scoped>

</style>
