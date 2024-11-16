import instance from '@/http/index'

// 目前写定了路由名称和对应的任务列表名称
// 通过路由名称获取对应任务列表下所有的任务，路由名称是字符串类型
// 需要结果：数组
export const getAllTaskByListId = (listId:number) =>{
    // const { id } = data
    return instance({
        url:'/task/getAllTaskByListId',
        method:'POST',
        data:{
          listId
        }
    })
}

export const getDDLTask = () =>{

  return instance({
    url:'/task/getDDLTask',
    method:'POST',
    data:{

    }
})
}

export const getImportanTask = () =>{

  return instance({
    url:'/task/getImportanTask',
    method:'POST',
    data:{

    }
})
}

export const getGoalsTask = () =>{

  return instance({
    url:'/task/getGoalsTask',
    method:'POST',
    data:{
    }
})
}

export const addTagList = (tagList:[]) =>{

  return instance({
    url:'/task/addTagList',
    method:'POST',
    data:{
      tagList

    }
})
}

export const getTask = (taskId:number) =>{

  return instance({
    url:'/task/getTask',
    method:'POST',
    data:{
      taskId
    }
})
}

// 修改任务名
export const updateTaskName = (taskId:number) =>{

  return instance({
    url:'/task/updateTaskName',
    method:'POST',
    data:{
      taskId
    }
})
}
// 修改元素的选中状态
export const updateTaskFinish = (taskId:number,finish:number) =>{

  return instance({
    url:'/task/updateTaskName',
    method:'POST',
    data:{
      taskId,
      finish
    }
})
}
