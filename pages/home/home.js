//home首页引入二次封装的wx.request方法
import {
  request
} from '../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
     //页面存储服务器数据
     //首页轮播图的数据
     banners:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //调用页面中getBanner方法一次
    this.getBanner();
  },

  //首页:获取轮播图的数据
  async getBanner() {
    //测试发请求:获取轮播图的数据
    //request函数体中返回Promise对象:异步成功 、异步失败
    let result = await request('/banner', {
      type: 2
    })
    
    //页面存储服务器数据---轮播图
    this.setData({
       banners:result.banners
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