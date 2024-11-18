import instance from '@/http/index'

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
