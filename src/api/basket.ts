import instance from '@/http/index'

// 返回示例：
//  routeBaskets:[
//   {
//     routeKey:"importance",
//     basketIds: [0],
//     mainTile: '重要',
//   },
//   {
//     routeKey:"ddl",
//     basketIds: [1],
//     mainTile: 'DDL',
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
