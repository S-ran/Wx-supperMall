App({
  addToCart(obj){
    //定义一个对象将app的数据遍历如果里面有一样的iid则还是该商品
    const oldInfo = this.globalData.cartList.find(item => item.iid === obj.iid)
    if (oldInfo) {//判断是否已经添加进来
      console.log('物品+1')
      oldInfo.count += 1 //有数量+1
    }else {
      console.log('新的物品')
      obj.count = 1       //初始数量1
      obj.checked = true  //添加一个属性判断是否存在该商品
      this.globalData.cartList.push(obj) //将获取的商品数据push到全局数组中
      console.log(this.globalData.cartList)
    }
    // 2.购物车回调
    if (this.addCart) {
      this.addCart()
    }
  },
  globalData: {   //全局数据对象
    cartList: []  //定义一个数组用于存储购物车数据
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
