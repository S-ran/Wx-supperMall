import request from './network.js'

//请求轮播图相关数据
export function getMultiData(){
  return request({
    url: '/home/multidata'
  })
}
//请求三大分类数据
export function getHomeGoods(type,page){
  return request({
    url: '/home/data',
    data: {
      type, page
    }
  })
}