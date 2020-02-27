Component({

  data:{
    isLoad:false
  },
  properties: {
    //推荐数据
    recommends:{
      type:Array,
      value:[],
    }
  },
  methods:{
    //监听图片加载
    imgLoad(){
      if(!this.data.isLoad)
      this.data.isLoad = true
      this.triggerEvent('imageload')
    }
  }
})
