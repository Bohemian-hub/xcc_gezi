/*
 * @Author: your name
 * @Date: 2021-01-06 21:10:31
 * @LastEditTime: 2021-01-17 22:36:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/forum/forum.js
 */
// pages/forum/forum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    monidata: [{
      touxiang: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3335200364,664435613&fm=26&gp=0.jpg',
      name: '张益达',
      sex: '男',
      college: '信息技术学院',
      grade: '大三',
      time: '13分钟前',
      content: '瑞雪兆丰年呢！',
      picture: [

        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2174384932,1613588892&fm=26&gp=0.jpg'

      ],
      love: [{
        name: '何炅',
      }, {
        name: '刘德华',
      }, {
        name: '谢霆锋',
      }, {
        name: '赵本山',
      }, {
        name: '宋丹丹',
      }, {
        name: '冯巩',
      }, {
        name: '邓紫棋',
      }, {
        name: '张伟',
      }, {
        name: '曾国藩',
      }, {
        name: '谢娜',
      }, {
        name: '张三丰',
      }, {
        name: '罗志祥',
      }],
      comment: [{
        name: '张毅',
        content: '你很牛逼哦！'
      }, {
        name: '谢霆锋 ',
        content: '加油，你很厉害的'
      }, {
        name: '王丽雯',
        content: '哈哈哈'
      }, {
        name: '张益达',
        content: '你真吉尔利害啊，可不可以和我一起玩呀，我可喜欢玩这个了，可是玩不来没大哥哥可不可以带带我啊，我是是的爸爸，我很爱你的哦， 咱们永远 在一起啊吧，我可以给你带来幸福'
      }],
      soncomment: [{
        name: '雷神',
        towho: '张毅',
        content: '你也牛逼'
      }, {
        name: '唐强',
        towho: '张毅',
        content: '你更牛逼些'
      }, {
        name: '冯双',
        towho: '张益达',
        content: '可以挣一百万呢'
      }, {
        name: '虞姬',
        towho: '张益达',
        content: '整他一个亿'
      }],

    }, {
      touxiang: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2905222703,1588432193&fm=26&gp=0.jpg',
      name: '张益达',
      sex: '男',
      college: '信息技术学院',
      grade: '大三',
      time: '13分钟前',
      content: '瑞雪兆丰年呢！',
      picture: [

        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1855446114,586757561&fm=26&gp=0.jpg',


        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=100541962,2833807992&fm=26&gp=0.jpg',


        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=821379803,1558762353&fm=11&gp=0.jpg',


        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3256875674,3691999735&fm=11&gp=0.jpg'

      ],
      love: [{
        name: '何炅',
      }, {
        name: '刘德华',
      }, {
        name: '谢霆锋',
      }, {
        name: '赵本山',
      }, {
        name: '宋丹丹',
      }, {
        name: '冯巩',
      }, {
        name: '邓紫棋',
      }, {
        name: '张伟',
      }, {
        name: '曾国藩',
      }, {
        name: '谢娜',
      }, {
        name: '张三丰',
      }, {
        name: '罗志祥',
      }],
      comment: [{
        name: '张毅',
        content: '你很牛逼哦！'
      }, {
        name: '谢霆锋 ',
        content: '加油，你很厉害的'
      }, {
        name: '王丽',
        content: '哈哈哈'
      }, {
        name: '张益达',
        content: '你真吉尔利害啊，可不可以和我一起玩呀，我可喜欢玩这个了，可是玩不来没大哥哥可不可以带带我啊，我是是的爸爸，我很爱你的哦， 咱们永远 在一起啊吧，我可以给你带来幸福'
      }],
      soncomment: [{
        name: '雷神',
        towho: '张毅',
        content: '你也牛逼'
      }, {
        name: '唐强',
        towho: '张毅',
        content: '你更牛逼些'
      }, {
        name: '冯双',
        towho: '张益达',
        content: '可以挣一百万呢'
      }, {
        name: '虞姬',
        towho: '张益达',
        content: '整他一个亿'
      }],

    }, {
      touxiang: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2017958222,3835362425&fm=11&gp=0.jpg',
      name: '张丽',
      sex: '女',
      college: '信息技术学院',
      grade: '大二',
      time: '.1-6 15:23',
      content: '这些可是世界上最乖的妹儿哦，欧尼酱敲击可爱的呢！',
      picture: [
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4001791683,2216116189&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=278547510,452014085&fm=26&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2317008229,906140941&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2598405804,875979297&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2197674299,1839023644&fm=11&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1264363610,237150817&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2857483951,1440537674&fm=26&gp=0.jpg'
      ],
      love: [{
        name: '何炅',
      }, {
        name: '刘德华',
      }, {
        name: '谢霆锋',
      }, {
        name: '赵本山',
      }, {
        name: '宋丹丹',
      }, {
        name: '冯巩',
      }, {
        name: '邓紫棋',
      }, {
        name: '张伟',
      }, {
        name: '曾国藩',
      }, {
        name: '谢娜',
      }, {
        name: '张三丰',
      }, {
        name: '罗志祥',
      }],
      comment: [{
        name: '张毅',
        content: '你很牛逼哦！'
      }, {
        name: '谢霆锋 ',
        content: '加油，你很厉害的'
      }, {
        name: '王丽',
        content: '哈哈哈'
      }, {
        name: '张益达',
        content: '你真吉尔利害啊，可不可以和我一起玩呀，我可喜欢玩这个了，可是玩不来没大哥哥可不可以带带我啊，我是是的爸爸，我很爱你的哦， 咱们永远 在一起啊吧，我可以给你带来幸福'
      }],
      soncomment: [{
        name: '雷神',
        towho: '张毅',
        content: '你也牛逼'
      }, {
        name: '唐强',
        towho: '张毅',
        content: '你更牛逼些'
      }, {
        name: '冯双',
        towho: '张益达',
        content: '可以挣一百万呢'
      }, {
        name: '虞姬',
        towho: '张益达',
        content: '整他一个亿'
      }],

    }],
    turnmenu: false,
    scrollIng: '',
    scrollStart: 0,
    scrollStart1: '',
    scrollEnd: '',
    shouldshow: false,
    masking_show: false,
    get_forum_times: 1,
    display_forum_data: [],
    if_display_pic: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.animation1 = wx.createAnimation()
    this.animation2 = wx.createAnimation()
    this.animation3 = wx.createAnimation()
    /* 页面加载的时候获取数据 */
    /* 这里一次性获取20条数据，下面的方法实现上滑一次获取下一个20条数据，上拉一次重新获取第一个二十条数据 */
    /* 这里直接引用一个获取20条数据的函数 */
    this.get_forum()
  },
  get_forum() {
    var that = this;
    /* 一次性请求二十条数据，只需要传入第几次获取 */
    wx.request({
      url: 'https://www.xiyuangezi.cn/forum/get_forum', //仅为示例，并非真实的接口地址
      data: {
        get_forum_times: that.data.get_forum_times,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        that.setData({
          display_forum_data: res.data
        })
        for (let i = 0; i < that.data.display_forum_data.length; i++) {
          if (that.data.display_forum_data[i].fields.post_data_pic.length == 0) {
            /* 说明没得图片 */
            that.setData({
              ['display_forum_data[' + i + '].fields.has_pic']: 0    //没得图片
            })
          }

          /* 把他们变成数组 */
          var stringResult = that.data.display_forum_data[i].fields.post_data_pic.split(',');
          //console.log(stringResult);
          that.setData({
            ['display_forum_data[' + i + '].fields.post_data_pic']: stringResult,

          })

        }
        setTimeout(() => {
          that.setData({
            if_display_pic: 1
          })
        }, 100);
        console.log(that.data.display_forum_data);
        for (let i = 0; i < that.data.display_forum_data.length; i++) {
          if (that.data.display_forum_data[i].fields.topic1 !== "init") {
            that.setData({
              ['display_forum_data[' + i + '].fields.topic_arr[0]']: that.data.display_forum_data[i].fields.topic1
            })
          } else {
            that.setData({
              ['display_forum_data[' + i + '].fields.topic_arr']: []
            })
          }
          if (that.data.display_forum_data[i].fields.topic2 !== "init") {
            that.setData({
              ['display_forum_data[' + i + '].fields.topic_arr[1]']: that.data.display_forum_data[i].fields.topic2
            })
          }
          if (that.data.display_forum_data[i].fields.topic3 !== "init") {
            that.setData({
              ['display_forum_data[' + i + '].fields.topic_arr[2]']: that.data.display_forum_data[i].fields.topic3
            })
          }
          if (that.data.display_forum_data[i].fields.topic4 !== "init") {
            that.setData({
              ['display_forum_data[' + i + '].fields.topic_arr[3]']: that.data.display_forum_data[i].fields.topic4
            })
          }
          if (that.data.display_forum_data[i].fields.topic5 !== "init") {
            that.setData({
              ['display_forum_data[' + i + '].fields.topic_arr[4]']: that.data.display_forum_data[i].fields.topic5
            })
          }

        }
        console.log(that.data.display_forum_data[0].fields.topic_arr.length);



      }
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    var Listindex = e.target.dataset.index;
    console.log(current);
    console.log(Listindex);
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.display_forum_data[Listindex].fields.post_data_pic // 需要预览的图片http链接列表  
    })
  },
  turnmenu() {

    if (!this.data.turnmenu) {
      this.setData({
        turnmenu: !this.data.turnmenu
      })
      this.translate1()
      setTimeout(() => {
        this.setData({
          shouldshow: true
        })
      }, 300);
    } else {
      this.closeturnmenu()
    }
  },
  closeturnmenu() {
    this.setData({
      shouldshow: false
    })
    this.translate2()
    setTimeout(() => {
      this.setData({
        turnmenu: false
      })
    }, 300);
  },

  onPageScroll(e) {
    this.setData({
      scrollStart: e.scrollTop,
      scrollIng: true
    })
    //console.log(this.data.scrollStart - this.data.scrollStart1);
    if (this.data.scrollStart - this.data.scrollStart1 > 50) {
      console.log("向上滑动了");
      this.closeturnmenu()
      /* 调用缩放动画 */
    } else if (this.data.scrollStart - this.data.scrollStart1 < -50) {
      console.log("向下滑动了");
      this.closeturnmenu()
    }

  },
  touchStart() {
    this.setData({
      scrollStart1: this.data.scrollStart
    })
    /* 开始滑动的时候可以把那个菜单关闭了 */
    this.forum_publish_close()
  },
  myCatchTouch() {
    console.log('prvent user scroll it!');
    return
  },

  translate1() {
    this.animation2.translate(0, -140).step()
    this.animation3.translate(0, -70).step()
    this.setData({ animation2: this.animation2.export() })
    this.setData({ animation3: this.animation3.export() })
  },
  translate2() {
    this.animation2.translate(0, 0).step()
    this.animation3.translate(0, 0).step()
    this.setData({ animation2: this.animation2.export() })
    this.setData({ animation3: this.animation3.export() })
  },
  /* 回到顶部 */
  totop() {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  forum_publish() {
    /* 这里产生一个动画，可以将那个东西显示出来 */
    this.animation_classify = wx.createAnimation()
    this.animation_classify.translate(0, -405).step()
    this.setData({ animation_classify: this.animation_classify.export() })
    /* 显示的同时也可以将背景混成透明 */
    this.setData({
      masking_show: true
    })
  },
  forum_publish_close() {
    /* 这里产生一个动画，可以将那个东西显示出来 */
    this.animation_classify = wx.createAnimation()
    this.animation_classify.translate(0, 0).step()
    this.setData({ animation_classify: this.animation_classify.export() })
    this.setData({
      masking_show: false
    })
  },
  /* 发布内容跳转 */
  publish_learn() {
    wx.navigateTo({
      url: "../forum_publish/forum_publish?classify=learn",
    });

  },
  back_index() {
    wx.redirectTo({
      url: "../index/index",
    });
  }
})