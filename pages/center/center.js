//定义一个JS全局变量:全局变量可以在任意地方使用
let startY = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    y: 0,
    //过渡动画
    transition:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  //手指头触摸开始
  start(event) {
    //清除过渡动画
    this.setData({
      transition:''
    })
    //event对象身上touchs属性:数组->数组里面每一个对象即为一个手指头
    //手指触摸屏幕那一刻，手指头的位置
    startY = event.touches[0].pageY;
  },
  move(event) {
    //获取手指头在屏幕当中移动的时候位置
    //idy:计算出来的是手指头开始位置与手指移动之间插值
    let idy = event.touches[0].pageY - startY;
    //y数值务必是正数，负数不行
    if(idy<=0) idy = 0;
    //y数值务必正数，但是不能太大
    if(idy>=80)idy = 80;
    //修改响应式数据y
    this.setData({
        y:idy
    })
  },
  end() {
    //手指抬起将响应式数据y数值变为零
    this.setData({
       y:0,
       transition:'all .2s linear'
    })
  },

  //点击头像跳转到登录页面
  login() {
    //tabbar页面个人中心->跳转到并非tabbar页面login
    //问题:能否使用wx.navigateTo|redirectTo?
    wx.navigateTo({
      url: '/pages/login/login',
    })
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