// pages/home/home.js
Page({

  /**
   * 页面的初始数据--响应式数据
   * 类似于v2data配置项
   * data定义页面属性[数据]的地方
   */
  data: {
    count: 10
  },
  //这里即为当前页面方法的地方
  add() {
    //微信小程序是跑在手机设备当中，没有浏览器概念
    //没有window|document概念,导致没有alert

    //函数体this，可以认为页面实例->属性、方法
    //底下这种操作是错误的，数据确实发生变化，但是页面不更新
    //this.data.count++
    //如果想让响应式数据发生变化，需要调用页面实例setData方法实现页面数据响应式更新
   let count = this.data.count + 1;
   //更新响应式数据
    this.setData({
       count
    })
  },
  //减去1的方法
  minus(){
     //获取上一次状态的数据，在他的基础之上减去1
     let count = this.data.count - 1;
     //通过setData方法更新响应式数据
     this.setData({
       count
     })
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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