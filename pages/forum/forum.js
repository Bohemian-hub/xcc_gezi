/*
 * @Author: your name
 * @Date: 2021-01-06 21:10:31
 * @LastEditTime: 2021-01-22 00:21:07
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
    loading: 0,
    loadingtext: '正在加载中...'

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
    console.log(that.data.get_forum_times);   //显示是第几次去获取数据
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
        /* 正因为页面中没有数据才执行下面这些操作，如果有数据的话，应该追加 */
        if (res.data.length == 0) {      //没有获取到数据
          that.setData({
            loadingtext: '我也是有底线的'
          })
        }
        console.log(res.data);
        for (let index = 0; index < res.data.length; index++) {
          console.log(res.data[index]);
          res.data[index].fields.lover = []
        }
        if (that.data.display_forum_data.length == 0) {     //如果之前display数组中没有数据，则把数据给他
          /* 数组里面没与数据，需要把获取到的数据写进数组 */
          that.setData({
            display_forum_data: res.data
          })
        } else {           //如果之前display数组中有数据，则把刚刚获取到的数据拼接进去
          that.setData({
            display_forum_data: that.data.display_forum_data.concat(res.data)
          })
        }
        /* 下面是有图片的话处理里面的图片数据，将字符创变成数组。似乎并不影响页面数组总数 */
        for (let i = 0; i < that.data.display_forum_data.length; i++) {    //这个
          if (that.data.display_forum_data[i].fields.post_data_pic.length == 0) {
            /* 说明没得图片 */
            that.setData({
              ['display_forum_data[' + i + '].fields.has_pic']: 0    //没得图片
            })
          }

          /* 把他们变成数组 ，让页面可以看得到*/
          var stringResult = that.data.display_forum_data[i].fields.post_data_pic.split(',');
          //console.log(stringResult);
          that.setData({
            ['display_forum_data[' + i + '].fields.post_data_pic2']: stringResult,
          })

        }
        setTimeout(() => {     //等一哈之后再渲染图片，不然会有src异步错误
          that.setData({
            if_display_pic: 1
          })
        }, 100);
        for (let i = 0; i < that.data.display_forum_data.length; i++) {
          if (that.data.display_forum_data[i].fields.topic1 !== "init") {    //一次看五个话题字段是否有值，有值就方到topic_arr里面去
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
        /* 获取我点了哪些帖子的赞 */
        setTimeout(() => {
          console.log('执行获取我点了哪些帖子的赞');
          /* 先是获取一下我点赞了哪些帖子 */
          wx.request({
            url: 'https://www.xiyuangezi.cn/forum/get_love', //仅为示例，并非真实的接口地址
            data: {
              studentId: wx.getStorageSync('studentId'),
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: (result) => {
              for (let index = 0; index < result.data.length; index++) {
                const a = result.data[index].fields.forum_id
                for (let index2 = 0; index2 < that.data.display_forum_data.length; index2++) {
                  if (that.data.display_forum_data[index2].pk == a) {
                    that.setData({
                      ['display_forum_data[' + index2 + '].fields.iflove']: true,
                    })
                  }
                }
              }
            },
          });

        }, 500);


        /* 字段渲染完了，可以准备获取点赞信息了，每次获取点赞信息就获取已有的forum_id 的点赞信息/最新拉取到的forum_id */
        var getloverforumarr = []
        for (let index = 0; index < res.data.length; index++) {
          getloverforumarr = getloverforumarr.concat(res.data[index].pk)
        }
        /* 把这十八条forum_id拿到后台去获取与他们有关的lover */
        console.log(getloverforumarr);
        /* 获取一下有帖子们有哪些人点了赞 */
        setTimeout(() => {
          console.log('现在执行那些帖子有哪些人点赞');
          /* 现在准备获取一下一个帖子有哪些人点赞。真难到一个论坛要去获取三次数据，润次频繁的数据请求？ */
          wx.request({
            url: 'https://www.xiyuangezi.cn/forum/get_all_lover', //仅为示例，并非真实的接口地址
            data: {
              getloverforumarr: getloverforumarr
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: (result) => {
              /* 拿到所有的爱之后，循环这个爱同时匹配display中，有一样的就追加到lover数组中去 */
              console.log(result);
              console.log(that.data.display_forum_data);
              for (let index = 0; index < result.data.length; index++) {
                console.log(result.data[index].fields);
                for (let index2 = 0; index2 < that.data.display_forum_data.length; index2++) {
                  if (that.data.display_forum_data[index2].pk == result.data[index].fields.forum_id) {
                    that.setData({
                      ['display_forum_data[' + index2 + '].fields.lover']: that.data.display_forum_data[index2].fields.lover.concat(result.data[index].fields.lover)
                    })
                  }
                }

              }
              console.log(that.data.display_forum_data);
            },
          });
        }, 1000);

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
      urls: this.data.display_forum_data[Listindex].fields.post_data_pic2 // 需要预览的图片http链接列表  
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

  onReachBottom: function () {
    console.log("哈哈哈");
    /* 现在就说明到达了底部，准备再次获取数据了 */
    /* 首先哈，展示一个加载选项 */
    this.setData({
      loading: 1,
      get_forum_times: this.data.get_forum_times + 1
    })
    /* 马上执行数据获取操作 */
    this.get_forum()

  },
  touchStart() {
    // this.setData({
    //   scrollStart1: this.data.scrollStart
    // })
    /* 开始滑动的时候可以把那个菜单关闭了 */
    this.forum_publish_close()
    this.closeturnmenu()
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
  publish_learn(e) {
    console.log(e.currentTarget.dataset.classify);
    wx.navigateTo({
      url: "../forum_publish/forum_publish?classify=" + e.currentTarget.dataset.classify,
    });
    
  },
  back_index() {
    wx.redirectTo({
      url: "../index/index",
    });
  },
  /* 点赞评论机制等等 */
  tolike(e) {
    var that = this
    console.log(that.data.display_forum_data);
    console.log(e.target.dataset.idx);
    var myDate = new Date();
    var month = myDate.getMonth() + 1
    var daly = myDate.getDate()
    var h = myDate.getHours();       //获取当前小时数(0-23)
    var m = myDate.getMinutes();     //获取当前分钟数(0-59)
    var s = myDate.getSeconds();     //获取当前秒数(0-59)
    if (daly < 10) {
      daly = "0" + String(daly)
    }
    if (month < 10) {
      month = "0" + String(month)
    }
    if (h < 10) {
      h = "0" + String(h)
    }
    if (m < 10) {
      m = "0" + String(m)
    }
    if (s < 10) {
      s = "0" + String(s)
    }
    var love_time = myDate.getFullYear() + '' + month + '' + daly + '' + h + '' + m + '' + s;
    that.setData({
      ['display_forum_data[' + e.target.dataset.idx + '].fields.iflove']: !this.data.display_forum_data[e.target.dataset.idx].fields.iflove
    })
    /* 成功实现了点赞能够让他们梁 */
    /* 下面打算发送请求，把每一个点赞都记录下来，单独用一张论坛点赞表，这样能够让帖子去找到那些人点的赞是自己的，另一方面，也可以让点赞人知道 我点了哪些帖子的赞 */
    /* 现在数据发送到后台， */
    /* 保存此次的点赞信息 */
    console.log(that.data.display_forum_data[e.target.dataset.idx].fields.iflove);    //这个是当前我点的这个东西的点赞情况
    wx.request({
      url: 'https://www.xiyuangezi.cn/forum/love', //仅为示例，并非真实的接口地址
      data: {
        lover: wx.getStorageSync('name'),
        studentId: wx.getStorageSync('studentId'),
        forum_id: that.data.display_forum_data[e.target.dataset.idx].pk,
        love_status: that.data.display_forum_data[e.target.dataset.idx].fields.iflove,
        love_time: love_time
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (result) => {
        /* 这里应该是将这一条数据中的lover清空重新渲染 */
        if (that.data.display_forum_data[e.target.dataset.idx].fields.iflove == true) {
          /* 下面是点赞，前端的呈现数据变化 */
          let myname = wx.getStorageSync('name').split(',')
          that.setData({
            ['display_forum_data[' + e.target.dataset.idx + '].fields.lover']: myname.concat(that.data.display_forum_data[e.target.dataset.idx].fields.lover),
          })
        } else {
          /* 下面是取消赞时候，我需要在数组中删除我的名字 */
          let myname = wx.getStorageSync('name')
          for (let index = 0; index < that.data.display_forum_data[e.target.dataset.idx].fields.lover.length; index++) {
            if (that.data.display_forum_data[e.target.dataset.idx].fields.lover[index] == myname) {
              console.log(index);
            }
            that.data.display_forum_data[e.target.dataset.idx].fields.lover.splice(index, 1);
            this.setData({
              ['display_forum_data[' + e.target.dataset.idx + '].fields.lover']: that.data.display_forum_data[e.target.dataset.idx].fields.lover
            })

          }
        }

        /* 对某一个帖子点了赞或者取消赞，我们只需要发送这个帖子的forum_id获取该帖子的最新点赞情况计科 */
        /* 没必要重新获取点赞列表，直接前端追加显示一下即可 */

      },
    });
  },

})