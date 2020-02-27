import {getMultiData,getHomeGoods} from '../../service/home.js'

Page({
  data: {
    banners: [],//轮播图数据
    recommends: [],//推荐数据
    titles: ['流行', '新款', '精选'], //分类标题
    goods: {       //分类数据
      'pop':{ page: 0, list:[]},
      'new':{ page: 0, list:[]},
      'sell':{ page: 0, list:[]},
    },
    currentType:'pop',//网络请求自定义分类索引
    showBackTop:false, //backtap显示相关
    backTop:0,         //设置回顶
    showTap:false,    //Tap显示相关
    tabScrollTop:0   //图片加载完获取top上边距
  },


  onLoad: function (options) {
    //请求轮播图相关数据
    this._getMultiData()
    //请求分类数据
    this._getHomeGoods('pop')
    this._getHomeGoods('new')
    this._getHomeGoods('sell')
  },
//------------------------请求数据--------------------
  //--------------请求轮播图与推荐数据-----------------
  _getMultiData(){
    getMultiData().then(res =>{
      //将轮播图数据暂存
      //取出每个图片数据将每个数据进行map()遍历,并且返回保存在banners
      const banners = res.data.data.banner.list.map(i =>{
        return i.image
      })
      //将数据保存在本地home
      this.setData({
        banners:banners,
        recommends:res.data.data.recommend.list
      })
    }).catch(err =>{console.log('请求失败:'+err.errMsg)})
  },
  //-------------------请求分类数据-------------------
  _getHomeGoods(type){
    //请求商品数据
    const page = this.data.goods[type].page += 1;
    getHomeGoods(type,page).then(res =>{
      //将获取的分类暂存,并添加到对应分类数组中
       const list=res.data.data.list
      const goods = this.data.goods 
       goods[type].list.push(...list)
       //设置本地数据
       this.setData({
         goods:goods
       })
    }).catch(err => { console.log('请求失败:' + err.errMsg) })
  },
  //-------------------上拉请求更多数据---------------------
  bindscrolltolower(){
      this._getHomeGoods(this.data.currentType)
  },
  //---------------------点击tab索引时切换数据---------------------
  tabtap(e){
    let indexType = ''      //定义一个变量通过索引选择对应type
    switch(e.detail.index){ 
      case 0: indexType = 'pop'; break;
      case 1: indexType = 'new'; break;
      case 2: indexType = 'sell'; break;
    }
    this.setData({         //设置本地的type
      currentType:indexType
    })
    //设置两个tab的索引值同步
    this.selectComponent('.tab-show').setIndex(e.detail.index)//获取组件对象调用方法
    this.selectComponent('.tab').setIndex(e.detail.index)
  },
  //---------------------回顶操作-------------------------------
  //监听底部距离
  // onPageScroll(options){
  //   const flag = options.scrollTop >= 1220
  //   if (flag !=this.data.showBackTop){
  //     this.setData({
  //       showBackTop: flag
  //     })
  //   }
  //   }
  // },
  //scroll-view的相关事件监听
  //通过view-scroll的bindscroll来监听上边距
  scrollPosition(e){

    //判断预定距离，如果到达则为true，先临时存储在进行判断处理提高性能
    const flag = e.detail.scrollTop >= 1220
    const flag1 = e.detail.scrollTop >= this.data.tabScrollTop
    //决定回顶小图标的显示
    if (flag !=this.data.showBackTop){
      this.setData({
        showBackTop: flag
      })
    }
    //决定隐藏的tab是否显示
    if (flag1 !=this.data.showTap){
      this.setData({
        showTap: flag1
      })
    }
  },
  //点击back-tap回到顶部
  backTap() {
    this.setData({
      backTop: 0
    })
  },
  //图片加载完获取top上边距
  homeimgLoad(){
    wx.createSelectorQuery().select('.tab').boundingClientRect((rect) => {
      this.setData({
        tabScrollTop: rect.top
      })
    }).exec()
  }
})