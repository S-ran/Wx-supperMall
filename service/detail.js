import request from './network.js'


export function getDetail(iid) {
  return request({
    url: '/detail',
    data: {
      iid
    }
  })
}
//更多推荐
export function getRecommends() {
  return request({
    url: '/recommend'
  })
}
//创建类(获取每个info中的自定义数据)
export class GoodsBaseInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title       //标题
    this.desc = itemInfo.desc         //简介
    this.newPrice = itemInfo.price    //价格
    this.oldPrice = itemInfo.oldPrice //旧价格
    this.discount = itemInfo.discountDesc //价格类型
    this.columns = columns            //销量等信息
    this.services = services          //快递相关

    this.realPrice = itemInfo.lowNowPrice
  }
}
export class ShopInfo {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;   //logo图片
    this.name = shopInfo.name;       //店名
    this.fans = shopInfo.cFans;      //
    this.sells = shopInfo.cSells;    //销量
    this.score = shopInfo.score;     //信誉度
    this.goodsCount = shopInfo.cGoods//全部宝贝
  }
}
export class ParamInfo {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : '';//参数图片某些商品有值, 某些没有值
    this.infos = info.set;       //表格参数
    this.sizes = rule.tables;    //相关说明
  }
}
