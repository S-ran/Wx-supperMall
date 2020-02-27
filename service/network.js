export default function(config){
 return new Promise((resolve,reject)=>{
   wx.request({
     //公共地址以及超时时间
     url: 'http://106.54.54.237:8000/api/hy'+config.url,
     timeout: 5000,
     //请求方法
     methods: config.methods || 'get',
     //片段连接
     data: config.data || {},
     //响应处理
     success: resolve,
     fail:reject
  })
 })
}