//定义一个JS全局变量:全局变量可以在任意地方使用
let startY = 0;
import {
  request
} from '../../utils/request';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    y: 0,
    //过渡动画
    transition: '',
    //头像
    avatar: '',
    //用户名字
    nickName: '',
    //用户登录成功以后ID
    userId: '',
    //存储用户最新听过歌曲
    arr: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取用户登录成功以后本地存储数据
    //微信小程序本地存储：可以存储对象  PC端本地localStraoge务必字符串
    let userInfo = wx.getStorageSync('USER');
    //如果登录成功才会有用户信息，如果有用户信息，个人中心保存用户头像、名字、用户ID
    if (userInfo) {
      //用户登录存储用户基本信息
      this.setData({
        avatar: userInfo.profile.avatarUrl,
        nickName: userInfo.profile.nickName,
        userId: userInfo.profile.userId
      });
      //在获取用户最新听过歌曲->发请求
      this.getUserMusic();
    }
  },
  //手指头触摸开始
  start(event) {
    //清除过渡动画
    this.setData({
      transition: ''
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
    if (idy <= 0) idy = 0;
    //y数值务必正数，但是不能太大
    if (idy >= 80) idy = 80;
    //修改响应式数据y
    this.setData({
      y: idy
    })
  },
  end() {
    //手指抬起将响应式数据y数值变为零
    this.setData({
      y: 0,
      transition: 'all .2s linear'
    })
  },
  //点击头像跳转到登录页面
  login() {
    //tabbar页面个人中心->跳转到并非tabbar页面login
    //问题:能否使用wx.navigateTo|redirectTo?
    if (!this.data.nickName) {
      //只有用户未登录，才能从个人中心去登录页面
      //如果用户登陆了，不需要在去登录页面
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  //获取用户最近听过哪些过去接口函数
  async getUserMusic() {
    //发请求获取用户最新听过哪些歌曲
    //因为咱们的登录模拟的,userId,是从网易云音乐人家项目当中拷贝过来
    //这个接口:除了需要携带userId、type参数之外。还有一个参数cookie
    //cookie哪里来的?
    //userId:去网易云音乐去找 
    //cookie：去网易云音乐去找  自己的账号
    let result = await request('/user/record', {
      uid: this.data.userId,
      type: 1
    });
    this.setData({
      arr: result.weekData
    })
  }

})