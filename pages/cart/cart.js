const app = getApp()

Page({
  data: {
    cartList: [],     //商品数据
    isSelectAll: false,//是否勾选
    totalPrice: 0,    //总价格
    totalCounter: 0   //商品种类数量
  },


  onLoad: function (options) {
    //1.将全局商品数据添加到本地
    this.setData({
      cartList: app.globalData.cartList
    })
    //创建时更新数据
    app.addCart = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
    }
    this.getPrice()   //计算
    this.onSelectAll()//更新全选按钮
    //设置修改某个商品的回调
    app.changeGoods = (index, goods) => {
      // 1.修改某一项的选中状态
      this.setData({
        [`cartList[${index}]`]: goods
      })
      const selectAll = !this.data.cartList.find(item => !item.checked)//遍历返回一个checked为假的对象
      this.setData({              //修改当前为假的样式
        isSelectAll: selectAll
      })
      this.getPrice()             //算次帐
      this.onShow()               //更新导航栏数量
    } 
  },
  //获取总价格
  getPrice(){
    // 1.获取所有选中数据
    let totalPrice = 0;  //价格
    let counter = 0;     //数量
    //遍历商品数据，取出每个商品的价格数量相乘，最终返回一个总价格
    for (let item of this.data.cartList) {
      if (item.checked) {//选中的才处理
        counter++
        totalPrice += item.price * item.count
        // console.log(totalPrice)
      }
    }
    // 2.修改数据
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice.toFixed(2) //价格保留两位小数
    })
  },
  onSelectAll() {
    // 1.判断是否是全部选中
    if (this.data.isSelectAll) { //目前全部选中
      this.data.cartList.forEach(item => {
        item.checked = false    //遍历取反
      })
      this.setData({            //设置本地数据
        cartList: this.data.cartList,
        isSelectAll: false       
      })
    } else {                    // 某些没选中
      this.data.cartList.forEach(item => {
        item.checked = true     //遍历取反
      })
      this.setData({            //设置本地数据
        cartList: this.data.cartList,
        isSelectAll: true
      })
    } 
    this.getPrice()             //算次帐
    this.onShow()               //更新导航栏数量
  },
  onShow() {                    //设置标题
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.totalCounter})`,//获取商品种类数量
    })
    this.getPrice()             //算次帐
  },
  onClean(){                  //清空购物车
    this.setData({            //设置本地数据
      cartList: [],
      isSelectAll: false,
      totalCounter:0,
      totalPrice: 0
    })
    this.onShow()               //更新导航栏数量
  },
  
})