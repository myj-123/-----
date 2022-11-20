import {
  request
} from '../../utils/request'
Page({

  data: {
    //存储导航的数据
    navArr: [],
    //导航标记:现在选中的是谁，选中的导航ID还得收集
    navId: '',
    //songArr:存储视频的数据
    songArr: [],
    //用户存储播放视频的id
    videoId: '',
    //将来我要存储视频上下文对象:控制对应视频的播放、暂停、指定位置、弹幕
    player: null,
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
    //获取某一个导航对应底部的视频的数据
    let videoList = await request('/video/group', {
      id: this.data.navId
    });

    //稍微将服务器返回的数据进行处理
    let arr = videoList.datas.map(video => {
      return {
        flag: true,
        vid: video.data.vid, //每一个视频的ID
        imgUrl: video.data.coverUrl, //视屏顶部图片的地址
        url: video.data.urlInfo.url, //视频的地址
        title: video.data.title, //每个作品的介绍标题
        avatarUrl: video.data.coverUrl, //头像
        nickName: video.data.creator.nickname, //作者名字
        praisedCount: video.data.praisedCount, //收藏的数据
        commentCount: video.data.commentCount, //品论的数据
      }
    });
    //存储数据
    this.setData({
      songArr: arr
    })




  },

  //点击图片的时候触发事件回调
  changeVideoId(event) {
    //获取视频的对象ID
    //获取即将播放视频的id
    let vid = event.currentTarget.dataset.videoid;
    //我先判断视频播放上下文对象是否有没有
    //如果没有视频上下文对象,我就创建一个
    //通过视频的上下文对象通过JS操作视频播放、暂停弹幕
    if (!this.data.player) {
      //没有视频上下文的时候,我创建一个，与相应的video组件进行关联
      //操作相应的video视频组件
      this.data.player = wx.createVideoContext(vid);
      //相应的视频播放
      this.data.player.play();
      //存储当前播放视频的ID
      this.setData({
        videoId: vid
      })
    } else {
      //已有视频播放上下文[说明用户点击过了]
      //二次点击:点击视频(上一次播放的视频)->开始->暂停->开始->暂停来回切换
      //二次点击:点击其他图片,其他视频播放
      //先判断点击的是其他的图片
      //this.data.videoId->存储上一次播放的视频的ID
      //vid:二次点击的时候，相应的视频的ID 
      if (this.data.videoId !== vid) {
        //如果点击其他图片上一次播放视频暂停
        this.data.player.pause();
        //如果点击其他图片上一次视频上下文清空
        this.data.player = null;
        //创建一个新的视频播放上下文，播放新的视频
        this.data.player = wx.createVideoContext(vid);
        //继续播放新的视频
        this.data.player.play();
        //存储最新歌曲的id
        this.setData({
          videoId: vid
        });
      } else {
        //通过id找到数组里面对应的这个视频对象，获取标记
        let result = this.data.songArr.find(item =>item.vid === vid);
        //找到用户二次点击的视频对象
        result.flag?this.data.player.pause(): this.data.player.play();
        result.flag = !result.flag;
      }

    }


  }
})