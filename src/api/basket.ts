import instance from '@/http/index'

// 返回示例：
//  basketList:[
//   {
//     type:"importance",
//     basketIds: [0],
//     basketName: '重要',
//   },
//   {
//     type:"ddl",
//     basketIds: [1],
//     basketName: 'DDL',
//   },]
export const getAllBaskets = () =>{
  // const { id } = data
  return instance({
      url:'/basket/baskets',
      method:'POST',
  })
}
