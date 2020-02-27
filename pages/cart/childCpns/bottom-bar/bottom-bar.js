Component({
  properties: {
    selected: {
      type: Boolean,
      value: true
    },
    price: {
      type: Number
    },
    counter: {
      type: Number
    }
  },
  methods: {
    onclick(){
      this.triggerEvent('onSelectAll',{},{})//发射事件更新全选按钮状态
    },
    ontap(){
      this.triggerEvent('onClean', {}, {})  //发射事件清空购物车
    }
  }
})
