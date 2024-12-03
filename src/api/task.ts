import instance from '@/http/index'

// 目前写定了路由名称和对应的任务列表名称
// 通过路由名称获取对应任务列表下所有的任务，路由名称是字符串类型
// 需要结果：数组


// ============get
export const getAllTaskByBasketId = (basketId:number) =>{
    // const { id } = data
    return instance({
        url:'/task/getAllTaskByBasketId',
        method:'POST',
        data:{
          basketId
        }
    })
}


export const getTask = (taskId:number) =>{
  // const { id } = data
  return instance({
      url:'/task/get',
      method:'POST',
      data:{
        taskId
      }
  })
}

export const getAllStar = () =>{
  // const { id } = data
  return instance({
      url:'/task/star',
      method:'POST',
  })
}

// ============add
export const addTask = (task) =>{
  // const { id } = data
  return instance({
      url:'/task/add',
      method:'POST',
      data:task //basketId  taskName
  })
}

// ============update
export const updateTaskBasketId = (taskId,basketId) =>{
  // const { id } = data
  return instance({
      url:'/task/update/basketId',
      method:'POST',
      data:{
        taskId,
        basketId
      }
  })
}

export const updateTaskFinish = (taskId) =>{
  // const { id } = data
  return instance({
      url:'/task/update/finished',
      method:'POST',
      data:{
        taskId
      }
  })
}

export const updateTaskStar = (taskId) =>{
  // const { id } = data
  return instance({
      url:'/task/update/star',
      method:'POST',
      data:{
        taskId
      }
  })
}

export const updateTaskDeadline = (taskId,deadline) =>{
  // const { id } = data
  return instance({
      url:'/task/update/ddl',
      method:'POST',
      data:{
        taskId,
        deadline
      }
  })
}

export const updateTaskBasket = (taskId,basketId) =>{
  // const { id } = data
  return instance({
      url:'/task/update/basketId',
      method:'POST',
      data:{
        taskId,
        basketId
      }
  })
}

export const updateTaskRemark  = (taskId,remark) =>{
  // const { id } = data
  return instance({
      url:'/task/update/remark',
      method:'POST',
      data:{
        taskId,
        remark
      }
  })
}

// ============ delete
export const deleteTask = (deleteTask) =>{
  // const { id } = data
  return instance({
      url:'/task/delete',
      method:'POST',
      data:{
        taskId:deleteTask.taskId,
        basketId:deleteTask.basketId
      }
  })
}



// --
export const getDDLTask = () =>{

  return instance({
    url:'/task/getDDLTask',
    method:'POST',
    data:{

    }
})
}

export const getImportantTask = () =>{

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
