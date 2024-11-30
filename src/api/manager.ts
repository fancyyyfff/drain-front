import instance from '@/http/index'

export const getAllSubscribe = () =>{
  return instance({
      url:'/subscribe/subscribes',
      method:'POST',
  })
}

export const getAllMangeUser = () =>{
  return instance({
      url:'/user/users',
      method:'POST',
  })
}

