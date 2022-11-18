import {
  request
} from '../../utils/request'
Page({
  data: {
    //响应式数据收集收集号码与密码
    phone: '17720125002',
    password: 'Laojia1011%'
  },
  //登录按钮的回调
  async Userlogin() {
    //点击登录按钮,发请求
    //发请求之前，先把表单元素的内容进行表单验证
    const {
      phone,
      password
    } = this.data;

    //表单没有任何内容:提示信息，后面语句不在执行[不在发ajax请求了]
    if (!phone) {
      //消息提示框
      wx.showToast({
        title: '号码不能为空', //提示框显示文字内容
        icon: 'error', //图标的设置,如果设置图标标题最多七个汉字
      });
      //如果用户连手机号码啥都没输入,后面不需要发请求，仅仅来一个提示
      return;
    }

    //密码至少用户需要输入内容，如果没有内容，给提示，后面语句也不在执行[不用发ajax请求]
    if (!password) {
      //消息提示框
      wx.showToast({
        title: '密码不能为空', //提示框显示文字内容
        icon: 'error', //图标的设置,如果设置图标标题最多七个汉字
      });
      //如果用户连手机号码啥都没输入,后面不需要发请求，仅仅来一个提示
      return;
    }

    //用户输入内容,不符合手机号码格式
    let reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
    //如果输入文本内容但是不符合手机号码规则
    if (!reg.test(phone)) {
      wx.showToast({
        title: '不符合手机规则',
        icon: 'error'
      });
      return;
    }

    //如果输入的密码:必须包含字母、数字和特殊字符的
    let reg1 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
    if (!reg1.test(password)) {
      wx.showToast({
        title: '不符合密码规则',
        icon: 'error'
      });
      return;
    }

    //发起登录请求:接口
    //如果登录成功->调回到个人中
    //如果登录失败->提示信息
    //发请求-进行登录
    //由于网易云音乐人家登录接口不对外开发，导致咱们模拟登录
    //let result = await request("/login/cellphone",{phone,password});
    //如果登录成功
    let result = {
      code: 200,
      profile: {
        nickName: '豪哥很帅',
        userId: "7958174368",
        avatarUrl: 'https://p1.music.126.net/Qg2QJBskP1_uk52mxtLWHA==/109951167737474304.jpg'
      },
     
    };
    //如果登录成功跳转到个人中心tarbar页面
    if (result.code == 200) {
     //思考问题:login->tabbar页面center
     //navigateTo|redirectTo:不能跳转到tabbar页面
     //wx.reLaunch:关闭所有页面，打开到应用内的某个页面

     //微信小程序本地存储技术:只要是应用的页面就可以共享本地存储的数据
     //微信小程序本地存储上线10M
      wx.setStorageSync('USER', result);
      wx.reLaunch({
        url: '/pages/center/center',
      });
    } else {
      //登录失败错误提示新信息
      wx.showToast({
        title: '登录失败',
        icon: 'error'
      })
    }

  }
})