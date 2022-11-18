//对于微信提供的wx.request进行二次封装函数,
//将来页面调用这个方法，就像服务器发请求

//将来这个函数:request组件或者页面可以引入使用
//http://127.0.0.1/banner 
//http://127.0.0.1/songList
export const request = (url, data = {}, method = "get") => {
  //发请求:获取服务器的数据
  //Promise对象:异步语句成功以后干什么、异步语句失败以后干什么
  return new Promise((resolve, reject) => {
    //异步语句:成功以后干什么
    wx.request({
      url: 'http://127.0.0.1:3000' + url, //请求地址
      data, //请求携带的参数
      method,
      success(res) {
        //成功返回成功的Promise对象
       resolve(res.data);
      },
      //请求失败
      fail(error){
        reject(error);
      }
    });
    //异步语句:失败以后干什么
  });
}