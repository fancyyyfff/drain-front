import instance from '@/http/index'

export const getAllSubscribe = () =>{
  return instance({
      url:'/manager/subscribe',
      method:'POST',
  })
}

export const getAllMangeUser = () =>{
  return instance({
      url:'/manager/mangeUser',
      method:'POST',
  })
}

