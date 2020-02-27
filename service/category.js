import request from './network.js'

export function getCategory() {// 1.请求总分类数据
  return request({
    url: '/category'
  })
}

export function getSubcategory(maitKey) {//请求子页面分类数据
  return request({
    url: '/subcategory',
    data: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {//请求子页面分类详情数据
  return request({
    url: '/subcategory/detail',
    data: {
      miniWallkey,
      type
    }
  })
}