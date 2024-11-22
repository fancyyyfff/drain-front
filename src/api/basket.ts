import instance from '@/http/index'

// 返回示例：
//  routeBaskets:[
//   {
//     routeKey:"importance",
//     basketIds: [0],
//     mainTitle: '重要',
//   },
//   {
//     routeKey:"ddl",
//     basketIds: [1],
//     mainTitle: 'DDL',
//   },]
export const getAllRouteBasket = () =>{
  // const { id } = data
  return instance({
      url:'/basket/baskets',
      method:'GET',
      data:{

      }
  })
}
