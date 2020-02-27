// pages/category/w-detail/w-detail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subCategories: {//子页面小图片详情
      type: Array,
      value:[]
    },
    categoryDetail: {//子页面图片详情
      type: Array,
      value: []
    },
    // backTop: {
    //   type:Number,
    //   value:0
    // }
  },
  data: {
    back:0
  },
  methods: {
    backTap(){
      this.setData({
        back: 0
      })
    },
  }
})
