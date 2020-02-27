import { getDetail,
         getRecommends,
         GoodsBaseInfo,
         ShopInfo,
         ParamInfo} from '../../service/detail.js'
const app = getApp()

Page({
  data: {
    iid: null,       //商品总数据
    topImages: [],   //轮播图数据
    baseInfo: {},    //商品信息数据
    shopInfo: {},    //店铺信息数据
    detailInfo: {},  //商品详情数据
    paramInfo: {},   //参数信息数据
    commentInfo: {}, //评论信息数据
    recommends: [],  //推荐数据
  },

 
  onLoad: function (options) {
    // 1.获取传入的iid
    this.setData({
      iid: options.iid
    })   
    //请求详情页总数据
    this._getDetail(this.data.iid)
    //请求推荐的数据
    this._getRecommends()
  },


  //----------------------数据请求-------------------
  _getDetail(iid){
    getDetail(iid).then(res => {  
        const data = res.data.result
        //获取轮播图数据
        const topImages = data.itemInfo.topImages
        //获取Baseinfo宝贝数据
        const baseInfo = new GoodsBaseInfo(data.itemInfo,data.columns,data.shopInfo.services)
        //获取Shopinfo商家数据
        const shopInfo = new ShopInfo(data.shopInfo)
        // 4.获取detailInfo展示信息
        const detailInfo = data.detailInfo;
        // 5.获取ParamInfo参数信息
        const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)
        // 6.获取评论信息
        let commentInfo = {}
        if (data.rate && data.rate.cRate > 0) {
          commentInfo = data.rate.list[0]
        }

        //设置本地数据
        this.setData({
          topImages: topImages,
          baseInfo: baseInfo,
          shopInfo: shopInfo,
          detailInfo: detailInfo,
          paramInfo: paramInfo,
          commentInfo: commentInfo
        })  
    }).catch(err => { console.log('请求失败:' + err.errMsg) })
  },
  //推荐数据请求
  _getRecommends() {
    getRecommends().then(res => {
      this.setData({
        recommends:res.data.data.list
      })
    })
  },
  //-----------------添加购物车---------------------
  onTapAdd() {
    // 1.获取商品对象
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0]; //获取商品图片
    obj.title = this.data.baseInfo.title;  //获取商品标题
    obj.desc = this.data.baseInfo.desc;    //获取商品简介
    obj.price = this.data.baseInfo.realPrice;//获取商品价格

    // 2.加入到购物车列表
    app.addToCart(obj)

    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  }
})