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
    banners: [],
    //推荐歌曲数据
    songArr: [],
    //排行榜的数据
    sortArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //调用页面中getBanner方法一次
    this.getBanner();
    //调用页面的方法getSongList方法一次获取推荐歌曲的数据
    this.getSongList();
    //调用下面方法获取排行榜的数据
    this.getSort();
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
      banners: result.banners
    })
  },

  //获取首页推荐歌曲的方法
  async getSongList() {
    let songList = await request('/personalized', {
      limit: 20
    });
    //存储推荐歌曲的数据
    this.setData({
      songArr: songList.result
    })
  },
  //获取排行榜的数据
  async getSort() {
    //请求参数:idx决定你获取那个排行榜的数据
    //idx=0新歌榜  idx = 1 热歌榜的数据
    //获取前五个排行榜的数据
    let idx = 0;
    //这个数组将来保存每一个排行榜的数据(对象)
    let arr = [];
    while (idx < 8) {
      let songData = await request("/top/list", {
        idx
      });
      arr.push(songData);
      idx++;
    }
    //处理一下排行榜数组里面数据
    //result:最终是一个数组、数组里面有五个对象
    //每一个对象都是一个排行榜
    let result = arr.map(item => {
        //代表一个排行榜
         return {
           id:item.playlist.id,
           name:item.playlist.name,
           sortSong:item.playlist.tracks.splice(0,3)
         }
    });
     
    //页面存储排行榜的数据
    this.setData({
      sortArr:result
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