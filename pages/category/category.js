import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '../../service/category.js'

Page({
  data: {
    categories: [], //标题
    categoryData: {},//详情数据
    currentIndex: 0, //点击索引
  },

  onLoad: function (options) {
    this._getData()
  },
//----------------数据请求------------------
_getData(){
  //请求总数据
  getCategory().then(res => {
    const categories = res.data.data.category.list
    //定义变量接收分类数据
    const categoryDate = {}
    //初始化该变量使得有对应的属性
    for (let i=0;i<categories.length;i++) {
      categoryDate[i] = {
        subCategories: [],  //子页面小图片详情
        categoryDetail: []  //子页面图片详情
      }
    }
    //console.log(categoryDate)
    //修改data中的数据
    this.setData({
      categories: categories,
      categoryData: categoryDate
    })
    //console.log(this.data.categories)
    //请求第一个子页面分类数据
    this._getSubcategory(0)
    //请求第一个子页面分类详情数据
    this._getCategoryDetail(0)
  })
},
//请求第一个子页面分类数据
 _getSubcategory(index){
   const key = this.data.categories[index].maitKey;//获取index对应的maitKey请求数据
   getSubcategory(key).then(res =>{
     const detailData = this.data.categoryData;    //定义一个变量等于本地categoryData
     detailData[index].subCategories = res.data.data.list //将对应索引的subCategories属性设置为接收的数据
     this.setData({         //设置本地数据
       categoryData: detailData
     })
   }).catch(err => { console.log('请求失败:' + err.errMsg) })
},
//请求第一个子页面分类详情数据
_getCategoryDetail(index){
    const key = this.data.categories[index].miniWallkey;//获取index对应的miniWallkey请求数据
    getCategoryDetail(key,'pop').then(res =>{
      const detailDate = this.data.categoryData   // 定义一个变量等于本地categoryData
      detailDate[index].categoryDetail = res.data //将对应索引的categoryDetail属性设置为接收的数据
      this.setData({         //设置本地数据
        categoryData: detailDate
      })
      // console.log(this.data.categoryData)
    }).catch(err => { console.log('请求失败:' + err.errMsg) })
  },
  //-------------------点击请求相关分类数据---------------
  titleTap(e){//接收组件传来的索引值
    const currentIndex = e.detail.currentIndex;
    this.selectComponent('.backTo').backTap()//回顶操作
    this.setData({
      currentIndex: currentIndex //设置本地index
    })
    //请求对应的子页面分类数据
    this._getSubcategory(currentIndex)
    //请求对应的子页面分类详情数据
    this._getCategoryDetail(currentIndex)
  }
})