import instance from '@/http/index'

export const getAllBaskets = () =>{
  // const { id } = data
  return instance({
      url:'/basket/baskets',
      method:'POST',
  })
}
