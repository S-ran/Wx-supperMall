const app = getApp()

Component({
  properties: {
    goods: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value:0
    }
  },
  methods: {
    onClick(e){
      // 1.查找到对应的商品
      const goods = app.globalData.cartList.find(item => item.iid == this.properties.goods.iid)
      goods.checked = !goods.checked   //将该属性取反,改变样式  
      const index = e.currentTarget.dataset.index  // 2.获取当前商品的index
      // console.log(goods.checked)
      // console.log(this.properties.goods.checked)
      app.changeGoods(index,goods)     //设置回调更新全选按钮
    }
  }
})
