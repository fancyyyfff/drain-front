<template>
  <div class="manager-warp">
    <h1  style="text-align: center;">订阅用户</h1>
  <el-table :data="filterTableData" style="width: 100%" class="shine table-warp">
    <el-table-column label="用户名" prop="username" />
    <el-table-column label="用户" prop="nickname" />
    <el-table-column label="订阅时间" prop="date" />
    <el-table-column label="有效期" prop="valiaDate" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          编辑
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          删除
        </el-button>
        <el-button
          size="small"
          type="success"
          @click="handleAdd(scope.$index, scope.row)"
        >
          添加
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

interface Order {
  date: string
  nickname: string
  username: string
  valiaDate:string
}

const search = ref('')
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.nickname.toLowerCase().includes(search.value.toLowerCase())
  )
)

const handleEdit = (index: number, row: Order) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: Order) => {
  console.log(index, row)
  tableData.value.splice(index, 1); // 从索引 1 开始删除 1 个元素
}
const handleAdd = (index: number, row: Order) => {
  console.log(index, row)
  // const newOrder = {

  // }
  // tableData.value.splice(index, 0, newOrder); // 在索引 1 处插入 newElement，不删除任何元素
}

const tableData=ref<Order[]>( [
  {
    date: '2024-11-18',
    nickname: '于谦',
    username: '18912123321',
    valiaDate:'3个月',
  },
  {
    date: '2024-11-20',
    nickname: '王阳明',
    username: '17823245672',
    valiaDate:'6个月',
  },
  {
    date: '2024-11-25',
    nickname: '朱棣',
    username: '18234689735',
    valiaDate:'1年',
  },
  {
    date: '2024-11-29',
    nickname: '芭比',
    username: '18434728737',
    valiaDate:'6天',
  },


])
</script>

<style lang="scss" scoped>

</style>
