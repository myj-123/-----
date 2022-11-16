// pages/home/home.js
Page({


  //按钮点击的事件回调
  getUserInfo(){
    //微信平台提供接口能力,本身系统自带的
    //获取用户信息接口函数(头像、用户名字....)
    wx.getUserProfile({
       //获取用户个人信息描述
       desc:'获取用户个人信息,开发使用',
       //获取用户信息成功的回调，当用户同意获取用户信息成功,成功的回调会执行一次
       success:(user)=>{
         console.log(user)
         //修改页面响应式数据
         this.setData({
            nickName:user.userInfo.nickName,
            avatarUrl:user.userInfo.avatarUrl
         })
       }
    })
  },
  //点击头像跳转到详情页面
  //图片的点击事件回调
  //事件回调也有事件对象:但是与原生DOM事件对象还是有区别的
  goDetail(event){
    //跳转到详情页面
    //首页跳转到详情页面，但是需要注意
    //url地址:前面的需要携带反斜杠，app.json里面配置路由,是没有斜杠的
    //wx.navigateTo a->b a页面不会销毁   
    //wx.redirectTo a->b a页面会销毁的，b页面返回的a时候[a已经不是原来的那个a]
    //切记这两个方法都不能向tabbar页面跳转
    wx.navigateTo({
      url: '/pages/detail/detail?a=1&b=2&c=3',
      success:()=>{
      }
    })
  },

 /**
  * 页面的初始数据
  */
 data: {
   //响应式数据
   nickName:'',//存储用户名字
   avatarUrl:'',//存储用户的头像
 },

 
 /**
  * 生命周期函数--监听页面加载
  */
 onLoad(options) {
console.log('页面钩子onload：监听页面加载',options);
 },

 /**
  * 生命周期函数--监听页面初次渲染完成
  */
 onReady() {

 },

 /**
  * 生命周期函数--监听页面显示
  */
 onShow() {

 },

 /**
  * 生命周期函数--监听页面隐藏
  */
 onHide() {

 },

 /**
  * 生命周期函数--监听页面卸载
  */
 onUnload() {

 },

 /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
 onPullDownRefresh() {

 },

 /**
  * 页面上拉触底事件的处理函数
  */
 onReachBottom() {

 },

 /**
  * 用户点击右上角分享
  */
 onShareAppMessage() {

 }
})