Component({
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },
  data: {
    isActive:0
  },
  methods: {
      ontap(e){
        this.setData({
          //设置索引
          isActive:e.currentTarget.dataset.index
        })
        //发出事件请求数据
        const data = { index: this.data.isActive}
        this.triggerEvent("tabtap",data,{})
      },
      setIndex(index){
        this.setData({
          isActive:index
        })
      }
  }
})
