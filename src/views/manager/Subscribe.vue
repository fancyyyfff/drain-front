<template>
  <div class="manager-warp">
    <h1  style="text-align: center;">订单管理</h1>
  <el-table  :data="tableData" style="width: 100%" class="shine table-warp">
    <el-table-column type="index" width="50" />
    <el-table-column label="订阅号" prop="subscribeId" />
    <el-table-column label="用户Id" prop="userId" />
    <el-table-column label="订阅时间" prop="createTime" />
    <el-table-column label="订阅截至" prop="deadline" />
    <el-table-column label="是否完成" prop="isFinish" />
    <el-table-column label="金额（元）" prop="count" />
    <el-table-column align="right">
    </el-table-column>
  </el-table>
</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { getAllSubscribe } from "@/api/manager";
interface Subscribe {
  subscribeId:number;
  userId: number|null;
  createTime: string|null;
  deadline:string|null;
  isFinish:boolean|null;
  count:number|null;
}

const tableData=ref<Subscribe[]>([])
onMounted(async()=>{
  try {
    const res = await getAllSubscribe()
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
