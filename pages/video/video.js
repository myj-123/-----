import {
  request
} from '../../utils/request'
Page({

  data: {
    //存储导航的数据
    navArr: [],
    //导航标记:现在选中的是谁，选中的导航ID还得收集
    navId: '',
    //songArr:存储视频数据
    songArr:[],
    //用户存储播放视频的id
    videoId:''
  },
  //页面加载的时候:发请求,获取导航的列表数据
  onLoad(options) {
    //获取视频导航列表的数据
    this.getNavList();
  },
  //获取视频模块顶部导航的数据
  async getNavList() {
    let result = await request('/video/group/list');
    //截取30个
    let navArr = result.data.splice(0, 30);
    //存储导航数据
    this.setData({
      navArr,
      navId: navArr[0].id
    });
    //保证现场ID已有,在获取现场第一下的视频的数据
    this.getVideoList();

  },
  //点击导航,进行点击导航内容拥有active高亮效果
  changeNavId(event) {
    //通过事件对象,获取相应导航view的ID
    this.setData({
      navId: event.currentTarget.dataset.navid
    });
    //当用户再次点击其他导航按钮的时候,保证navId，存储用户点击的导航ID
    //再次获取对应导航底部的视频的数据
    this.getVideoList();

  },
  //获取导航对应底下视频的数据
  async getVideoList() {

    let videoList = await request('/video/group', {
      id: this.data.navId
    });
    //将服务器返回的数据进行处理
    let arr = videoList.datas.map(video=>{
      return {
          vid:video.data.vid,//每一个视频的ID
          imgUrl:video.data.coverUrl,//视屏顶部图片的地址
          url:video.data.urlInfo.url,//视频的地址
          title:video.data.title,//每个作品的介绍标题
          avatarUrl:video.data.coverUrl,//头像
          nickName:video.data.creator.nickname,//作者名字
          praisedCount:video.data.praisedCount,//收藏的数据
          commentCount:video.data.commentCount,//品论的数据
      }
  });
  //存储数据
  this.setData({
    songArr:arr
  })
},
//点击图片的时候触发事件回调
changeVideoId(event){
  //获取视频的对象ID
  //获取即将播放视频的id
  let videoId = event.currentTarget.dataset.videoid;
  //存储当前即将要播放视频的ID
  this.setData({
      videoId
  })
 }
})