import instance from '@/http/index'

export const getAllBaskets = (userId:number) =>{
  // const { id } = data
  return instance({
      url:'/task/getAllBaskets',
      method:'GET',
      data:{
        userId
      }
  })
}
