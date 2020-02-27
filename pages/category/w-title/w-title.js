Component({

  properties: {
    categories: {
      type: Array,
      value:[]
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    titleTap(e){
      const currentIndex = e.currentTarget.dataset.index;//获取index
      this.setData({
        currentIndex: currentIndex //设置本地index
      })
      this.triggerEvent('titleTap',{currentIndex})//将最新的currentIndex传递到分类界面
    }
  }
})
