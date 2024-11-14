import instance from '@/http/index'

// 目前写定了路由名称和对应的任务列表名称
// 通过路由名称获取对应任务列表下所有的任务，路由名称是字符串类型
// 需要结果：数组
export const getAllTaskByListId = (listId:number) =>{
    // const { id } = data
    return instance({
        url:'/drain/task/getAllTaskByRouteName',
        method:'POST',
        data:{
          listId
        }
    })
}
