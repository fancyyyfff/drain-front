<template>
  <div class="manager-warp">
    <h1  style="text-align: center;">用户管理</h1>
  <el-table style="width: 100%" class="shine table-warp">
    <el-table-column type="index" width="50" />
    <el-table-column label="用户名" prop="username" />
    <el-table-column label="用户昵称" prop="nickname" />
    <el-table-column label="注册时间" prop="createTime" />
    <el-table-column label="邮箱" prop="email" />
    <el-table-column label="角色" prop="role" />
    <el-table-column align="right">
    </el-table-column>
  </el-table>
</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { getAllMangeUser } from "@/api/manager";
interface ManageUser {
  username: string|null;
  nickname: string|null;
  createTime: string|null;
  email:string|null;
  role:number;
}

const tableData=ref<ManageUser[]>([])
onMounted(async()=>{
  try {
    const res = await getAllMangeUser()
    if(res.status % 2 ===1) {
      tableData.value=res.data
    }
  } catch (error) {
    console.error('通过basketId获取所有任务失败', error);
  }
})

</script>

<style lang="scss" scoped>

</style>

