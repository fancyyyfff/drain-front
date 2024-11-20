import instance from '@/http/index'

export const getAllBaskets = (userId:number) =>{
  // const { id } = data
  return instance({
      url:'/task/getAllBaskets',
      method:'POST',
      data:{
        userId
      }
  })
}
