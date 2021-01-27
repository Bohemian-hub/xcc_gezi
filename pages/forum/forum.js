/*
 * @Author: your name
 * @Date: 2021-01-06 21:10:31
 * @LastEditTime: 2021-01-27 14:11:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/forum/forum.js
 */
// pages/forum/forum.js
var COS = require('../../cos-wx-sdk-v5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    turnmenu: false,
    scrollIng: '',
    scrollStart: 0,
    scrollStart1: '',
    scrollEnd: '',
    shouldshow: false,
    masking_show: false,
    get_forum_times: 1,
    display_forum_data: [],
    display_temp: [],
    display_temp2: [],
    if_display_pic: 0,
    loading: 0,
    loadingtext: '正在加载中...',
    control_status: 1,
    showModalStatus: 0,
    switch_reply: 0,
    comment_of_forum: '',
    soncomment_of_comment: '',
    inputValue: '',   //输入框内容，用于清空
    now_forum_id: '', // 目前点击的forum的id
    now_display_comment: [],
    now_display_soncomment: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      control_status: 0    //此刻不允许操作
    })
    this.animation1 = wx.createAnimation()
    this.animation2 = wx.createAnimation()
    this.animation3 = wx.createAnimation()
    /* 页面加载的时候获取数据 */
    /* 这里一次性获取20条数据，下面的方法实现上滑一次获取下一个20条数据，上拉一次重新获取第一个二十条数据 */
    /* 这里直接引用一个获取20条数据的函数 */
    this.get_forum()
    /* 首次加载的时候会有加载时禁止操作以及将得到的数据放到 display_temp 中 的操作*/
    setTimeout(() => {
      this.setData({
        display_temp: this.data.display_forum_data,
        control_status: 1  /* 此刻允许操作 */
      })
    }, 2000);
  },
  get_forum() {
    var that = this;
    /* 一次性请求二十条数据，只需要传入第几次获取 */
    console.log(that.data.get_forum_times);   //显示是第几次去获取数据
    wx.request({
      url: 'http://127.0.0.1:8000/forum/get_forum', //仅为示例，并非真实的接口地址
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
        /* 下面是有图片的话处理里面的图片数据，将字符创变成数组。似乎并不影响页面数组总数 */
        for (let i = 0; i < res.data.length; i++) {    //这个
          if (res.data[i].fields.post_data_pic.length == 0) {
            /* 说明没得图片 */
            res.data[i].fields.has_pic = 0
          }
          res.data[i].fields.lover = []
          res.data[i].fields.comment = []
          res.data[i].fields.soncomment = []
          /* 把他们变成数组 ，让页面可以看得到*/
          var stringResult = res.data[i].fields.post_data_pic.split(',');
          //console.log(stringResult);
          res.data[i].fields.post_data_pic2 = stringResult

          res.data[i].fields.topic_arr = []
          if (res.data[i].fields.topic1 !== "init") {    //一次看五个话题字段是否有值，有值就方到topic_arr里面去
            res.data[i].fields.topic_arr[0] = res.data[i].fields.topic1
          }
          if (res.data[i].fields.topic2 !== "init") {
            res.data[i].fields.topic_arr[1] = res.data[i].fields.topic2
          }
          if (res.data[i].fields.topic3 !== "init") {
            res.data[i].fields.topic_arr[2] = res.data[i].fields.topic3
          }
          if (res.data[i].fields.topic4 !== "init") {
            res.data[i].fields.topic_arr[3] = res.data[i].fields.topic4
          }
          if (res.data[i].fields.topic5 !== "init") {
            res.data[i].fields.topic_arr[4] = res.data[i].fields.topic1
          }

          if (res.data[i].fields.post_data_grade == '大一' || res.data[i].fields.post_data_grade == '大二' || res.data[i].fields.post_data_grade == '大三' || res.data[i].fields.post_data_grade == '大四') {
            if (res.data[i].fields.post_data_sex == '男') {
              res.data[i].fields.tag_color = 'skyblue'
            }
            else {
              res.data[i].fields.tag_color = 'pink'
            }
          } else if (res.data[i].fields.post_data_grade == '未知年级') {
            res.data[i].fields.tag_color = 'green'
          } else if (res.data[i].fields.post_data_grade == '总监') {
            res.data[i].fields.tag_color = 'orange'
          } else {
            res.data[i].fields.tag_color = 'purple'
          }

          /* 新获取的数据追加到页面 */
          that.setData({
            display_forum_data: that.data.display_forum_data.concat(res.data[i])
          })
        }
        console.log(that.data.display_forum_data);
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

              for (let index = 0; index < result.data.length; index++) {
                for (let index2 = 0; index2 < that.data.display_forum_data.length; index2++) {
                  if (that.data.display_forum_data[index2].pk == result.data[index].fields.forum_id) {
                    that.setData({
                      ['display_forum_data[' + index2 + '].fields.lover']: that.data.display_forum_data[index2].fields.lover.concat(result.data[index].fields.lover)
                    })
                  }
                }

              }

            },
          });
        }, 1000);
        /* 现在应该获取评论信息了，首先是第一个，大评论 */
        var getloverforumarr = []
        for (let index = 0; index < res.data.length; index++) {
          getloverforumarr = getloverforumarr.concat(res.data[index].pk)
        }
        /* 获取评论 */
        wx.request({
          url: 'http://127.0.0.1:8000/forum/get_comment', //仅为示例，并非真实的接口地址
          data: {
            getloverforumarr: getloverforumarr
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: (result) => {
            console.log(result);
            for (let index = 0; index < result.data.length; index++) {
              for (let index2 = 0; index2 < that.data.display_forum_data.length; index2++) {
                if (that.data.display_forum_data[index2].pk == result.data[index].fields.forum_id) {
                  that.setData({
                    ['display_forum_data[' + index2 + '].fields.comment']: that.data.display_forum_data[index2].fields.comment.concat(result.data[index].fields)
                  })
                }
              }

            }
          },
        });
        /* 获取子评论 */
        wx.request({
          url: 'http://127.0.0.1:8000/forum/get_son_comment', //仅为示例，并非真实的接口地址
          data: {
            getloverforumarr: getloverforumarr
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: (result) => {
            console.log("哈哈");
            console.log(result);
            for (let index = 0; index < result.data.length; index++) {
              for (let index2 = 0; index2 < that.data.display_forum_data.length; index2++) {
                if (that.data.display_forum_data[index2].pk == result.data[index].fields.forum_id) {
                  console.log(result.data[index].fields);
                  that.setData({
                    ['display_forum_data[' + index2 + '].fields.soncomment']: that.data.display_forum_data[index2].fields.soncomment.concat(result.data[index].fields)
                  })
                }
              }

            }
          },
        });
        setTimeout(() => {     //等一哈之后再渲染图片，不然会有src异步错误
          that.setData({
            if_display_pic: 1
          })
        }, 100);

      }
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
      loadingtext: '正在加载中...',
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

  topic_content() {
    wx.navigateTo({
      url: "../topic/topic",
    });
  },
  frank() {
    wx.redirectTo({
      url: '../topic_one/topic_one?name=坦白说'
    })
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
  /* 评论区域的函数 */
  getInputValue1(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      comment_of_forum: e.detail
    })
  },
  getInputValue2(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}
    this.setData({
      soncomment_of_comment: e.detail
    })
  },
  /* 发送评论之前先获取一下头像地址 */
  getuserinfo(e) {
    var that = this
    /* 这里获取之后不如我就上床一下，免得头像地址失效了不可用。*/
    wx.downloadFile({
      url: e.detail.userInfo.avatarUrl,
      success: function (res) {
        console.log(res.tempFilePath)
        that.setData({
          tempavatarUrl: res.tempFilePath
        })
        console.log("执行异步函数")
        that.uploadavatar()
      }
    })
  },
  uploadavatar() {
    var that = this
    /* 后上传头像 */
    var cos1 = new COS({
      getAuthorization: function (options, callback) {
        // 服务端 JS 和 PHP 示例：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
        // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
        // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
        wx.request({
          url: 'https://www.xiyuangezi.cn/confess/credential',
          data: {
            // 可从 options 取需要的参数
          },
          success: function (result) {
            var data = result.data;
            var credentials = data.credentials;
            callback({
              TmpSecretId: credentials.tmpSecretId,
              TmpSecretKey: credentials.tmpSecretKey,
              XCosSecurityToken: credentials.sessionToken,
              ExpiredTime: data.expiredTime,
            });
          }
        });
      }
    });

    console.log(that.data.tempavatarUrl);
    if (that.data.tempavatarUrl) {
      cos1.postObject({
        Bucket: 'xcc-grid-1256135907',
        Region: 'ap-nanjing',
        Key: 'xcc_forum/' + wx.getStorageSync('studentId') + "-touxiang" + ".jpg",
        //下面这个东西就是传入临时地址
        FilePath: that.data.tempavatarUrl,
        onProgress: function (info) {
          /* 显示进度 */
          console.log(JSON.stringify(info.percent));
        }
      }, function (err, data) {
        console.log(err || data.Location);
        /* 将上传的头像返回的地址存放过来。 */
        that.setData({
          post_data_avatarUrl: "https://" + data.Location
        })
        console.log(that.data.post_data_avatarUrl);
      });
    }
  },
  comment_send() {
    var that = this
    if (that.data.comment_of_forum) {
      that.setData({
        inputValue: ''
      })
      var myDate = new Date();
      var mon = myDate.getMonth() + 1
      var d = myDate.getDate()
      var h = myDate.getHours();      //获取当前小时数(0-23)
      var m = myDate.getMinutes();    //获取当前分钟数(0-59)
      var s = myDate.getSeconds();    //获取当前秒数(0-59)
      if (d < 10) {
        d = "0" + String(d)
      }
      if (mon < 10) {
        mon = "0" + String(mon)
      }
      if (h < 10) {
        h = "0" + String(h)
      }
      if (m < 10) {
        m = "0" + String(m)
      }
      var comment_time = mon + '-' + d + ' ' + h + ':' + m
      var comment_id = wx.getStorageSync('studentId') + mon + d + h + m + s

      console.log(that.data.comment_of_forum.value);
      console.log(wx.getStorageSync('name'));
      console.log(wx.getStorageSync('studentId'));
      console.log(that.data.post_data_avatarUrl);
      console.log(comment_time);
      console.log(comment_id);
      console.log(that.data.now_forum_id);


      /* 下面我要请求后端数据库了，我要将这个评论增加大哦我的评论表中去。 */
      wx.request({
        url: 'http://127.0.0.1:8000/forum/add_comment', //仅为示例，并非真实的接口地址
        data: {
          name: wx.getStorageSync('name'),
          studentId: wx.getStorageSync('studentId'),
          post_data_avatarUrl: this.data.post_data_avatarUrl,
          comment_time: comment_time,
          comment_id: comment_id,
          comment_content: that.data.comment_of_forum.value,
          now_forum_id: that.data.now_forum_id

        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: (result) => {
          console.log("评论成功！");
          wx.showToast({
            title: '评论成功！',
            icon: 'success',
            duration: 1000,//持续的时间
          })
          /* 清楚输入框的数据记录 */
          that.setData({
            comment_of_forum: ''
          })
          /* 评论成功之后就要想办法刷新数据了 */
          var getloverforumarr = []
          getloverforumarr = getloverforumarr.concat(that.data.now_forum_id)
          console.log(getloverforumarr);
          /* 现在开始准备对这条forum中的评论清空 */
          for (let index = 0; index < that.data.display_forum_data.length; index++) {   //对已经有的数据的评论数据进行清空
            if (that.data.display_forum_data[index].pk == that.data.now_forum_id) {
              console.log("匹配到啦");
              that.data.display_forum_data[index].fields.comment = []
            }

          }
          wx.request({
            url: 'http://127.0.0.1:8000/forum/get_comment', //仅为示例，并非真实的接口地址
            data: {
              getloverforumarr: getloverforumarr
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: (result) => {
              console.log(result);
              for (let index = 0; index < result.data.length; index++) {
                for (let index2 = 0; index2 < that.data.display_forum_data.length; index2++) {
                  if (that.data.display_forum_data[index2].pk == result.data[index].fields.forum_id) {
                    console.log(result.data[index].fields);
                    that.setData({
                      ['display_forum_data[' + index2 + '].fields.comment']: that.data.display_forum_data[index2].fields.comment.concat(result.data[index].fields)
                    })
                  }
                }
              }
              console.log(that.data.display_forum_data);
              for (let index = 0; index < that.data.display_forum_data.length; index++) {
                if (that.data.display_forum_data[index].pk == this.data.now_forum_id) {
                  this.setData({
                    now_display_comment: that.data.display_forum_data[index].fields.comment,
                    now_display_soncomment: that.data.display_forum_data[index].fields.soncomment,
                    comment_onclick_count: that.data.display_forum_data[index].fields.comment.length + that.data.display_forum_data[index].fields.soncomment.length
                  })
                }

              }

            },
          });


        },
      });
    } else {
      wx.showToast({
        title: '至少写两个字叭',
        icon: 'false',
        duration: 2000
      })
    }
  },
  son_comment_send() {
    var that = this
    if (that.data.soncomment_of_comment) {
      that.setData({
        inputValue: '',
      })
      var myDate = new Date();
      var mon = myDate.getMonth() + 1
      var d = myDate.getDate()
      var h = myDate.getHours();      //获取当前小时数(0-23)
      var m = myDate.getMinutes();    //获取当前分钟数(0-59)
      var s = myDate.getSeconds();    //获取当前秒数(0-59)
      if (d < 10) {
        d = "0" + String(d)
      }
      if (mon < 10) {
        mon = "0" + String(mon)
      }
      if (h < 10) {
        h = "0" + String(h)
      }
      if (m < 10) {
        m = "0" + String(m)
      }
      var son_comment_time = mon + '-' + d + ' ' + h + ':' + m
      var son_comment_id = wx.getStorageSync('studentId') + mon + d + h + m + s
      var son_comment_content = that.data.soncomment_of_comment.value
      var son_comment_to_who = that.data.which_reply_name
      var name = wx.getStorageSync('name')
      var studentId = wx.getStorageSync('studentId')
      var comment_id = this.data.comment_id1
      var forum_id = that.data.forum_id1


      console.log(forum_id);
      console.log(comment_id);
      console.log(name);
      console.log(studentId);
      console.log(son_comment_id);
      console.log(son_comment_content);
      console.log(son_comment_to_who);
      console.log(son_comment_time);


      /* 下面我要请求后端数据库了，我要将这个评论增加大哦我的评论表中去。 */
      wx.request({
        url: 'http://127.0.0.1:8000/forum/add_son_comment', //仅为示例，并非真实的接口地址
        data: {
          forum_id: forum_id,   //帖子id
          comment_id: comment_id,  //主评论的id
          name: name,      //姓名
          studentId: studentId,   //学号
          son_comment_id: son_comment_id,   //子评论的id，方便做子子评论
          son_comment_content: son_comment_content,      //子评论的内容
          son_comment_to_who: son_comment_to_who,//子评论对象
          son_comment_time: son_comment_time,//子评论的时间
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: (result) => {
          console.log("子评论成功！");
          wx.showToast({
            title: '回复成功！',
            icon: 'success',
            duration: 1000,//持续的时间
          })
          that.setData({
            comment_of_forum: ''
          })
          /* 刷新数据！！！ */
          var getloverforumarr = []
          for (let index = 0; index < that.data.display_forum_data.length; index++) {
            getloverforumarr = getloverforumarr.concat(that.data.display_forum_data[index].pk)
            that.setData({
              ['display_forum_data[' + index + '].fields.soncomment']: []     //把他们里面的评论数据先清空
            })
          }
          wx.request({
            url: 'http://127.0.0.1:8000/forum/get_son_comment', //仅为示例，并非真实的接口地址
            data: {
              getloverforumarr: getloverforumarr
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: (result) => {
              console.log(result);
              for (let index = 0; index < result.data.length; index++) {
                for (let index2 = 0; index2 < that.data.display_forum_data.length; index2++) {
                  if (that.data.display_forum_data[index2].pk == result.data[index].fields.forum_id) {
                    console.log(result.data[index].fields);
                    that.setData({
                      ['display_forum_data[' + index2 + '].fields.soncomment']: that.data.display_forum_data[index2].fields.soncomment.concat(result.data[index].fields)
                    })
                  }
                }
              }
              console.log(that.data.display_forum_data);
              for (let index = 0; index < that.data.display_forum_data.length; index++) {
                if (that.data.display_forum_data[index].pk == this.data.now_forum_id) {
                  this.setData({
                    now_display_comment: that.data.display_forum_data[index].fields.comment,
                    now_display_soncomment: that.data.display_forum_data[index].fields.soncomment,
                    comment_onclick_count: that.data.display_forum_data[index].fields.comment.length + that.data.display_forum_data[index].fields.soncomment.length
                  })
                }

              }

            },
          });

        },
      });

      that.setData({
        switch_reply: 0
      })
    } else {
      wx.showToast({
        title: '至少写两个字叭',
        icon: 'false',
        duration: 2000
      })
    }
  },

  makecomment(e) {
    var that = this;
    console.log(e.currentTarget.dataset.id);
    console.log(e.currentTarget.dataset.studentid);
    that.setData({
      switch_reply: 0,
      now_forum_id: e.currentTarget.dataset.id,
      now_turn_studentid_of_forum: e.currentTarget.dataset.studentid
    })

    console.log(that.data.display_forum_data);
    for (let index = 0; index < that.data.display_forum_data.length; index++) {
      if (that.data.display_forum_data[index].pk == e.currentTarget.dataset.id) {
        this.setData({
          now_display_comment: that.data.display_forum_data[index].fields.comment,
          now_display_soncomment: that.data.display_forum_data[index].fields.soncomment,
          comment_onclick_count: that.data.display_forum_data[index].fields.comment.length + that.data.display_forum_data[index].fields.soncomment.length
        })
      }

    }
    console.log(that.data.now_display_comment);

    /* 下面是设置动画的基本操作 */
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    this.animation.translateY(520).step()

    that.setData({
      animationData: animation.export(),
      showModalStatus: true,
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        turn_shadow: 1
      })
    }.bind(this), 0)


    /* 下面 我就要调用后端做查询有那些评论啦，首先请出来我们最爱的正在加载！ */

    // wx.request({
    //   url: '', //仅为示例，并非真实的接口地址
    //   data: {
    //     comment_id: that.data.now_turn_comment_id,
    //   },
    //   method: "POST",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   success: (result) => {
    //     console.log("获取所有评论成功！");

    //     wx.hideLoading()
    //   },
    // });

  },
  /* 回复评论，坐姿评论用 */
  reply(e) {
    var that = this
    that.setData({
      switch_reply: 1,
      if_focus: true,
    })

    /* 要准备前往数据库啦，哈哈哈哈，真的太快乐了 */
    console.log(e.currentTarget.dataset.id);
    console.log(e.currentTarget.dataset.id2);
    console.log(e.currentTarget.dataset.name);
    that.setData({
      reply_words: '回复' + e.currentTarget.dataset.name + ':',
      forum_id1: e.currentTarget.dataset.id,
      comment_id1: e.currentTarget.dataset.id2,
      which_reply_name: e.currentTarget.dataset.name
    })
  },
  change_reply_switch() {
    console.log('点到了');
    var that = this
    that.setData({
      switch_reply: 0
    })
  },
  close_comment() {
    var that = this;
    /* 要不关的时候也做一个假的数据增加 */
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    this.animation.translateY(0).step()
    that.setData({
      animationData: animation.export(),
      turn_shadow: 0
    })
    setTimeout(function () {
      animation.translateY(920).step()
      this.setData({
        animationData: animation.export(),
      })
    }.bind(this), 0)
    setTimeout(function () {
      this.setData({
        showModalStatus: false,
      })
    }.bind(this), 300)
  },
  longPress(e) {
    console.log("长按事件");
    console.log(e.currentTarget.dataset.delete_comment_id);
    console.log(e.currentTarget.dataset.form);
    console.log(e.currentTarget.dataset.studentid);
    /* 判断这条评论是不是我发的 */
    if (e.currentTarget.dataset.studentid == wx.getStorageSync("studentId")) {
      this.setData({
        turn_shadow2: true,
        turn_delete: true,
        delete_comment_form: e.currentTarget.dataset.form,
        delete_comment_id: e.currentTarget.dataset.delete_comment_id
      })
    }

  },
  close_comment_delete() {
    this.setData({
      turn_shadow2: false,
      turn_delete: false
    })
  },
  delete_this_comment() {
    var that = this
    if (this.data.delete_comment_form == 'normal') {
      console.log("是我发的大评论");
      console.log(this.data.delete_comment_id);
      /* 发送请求删除大评论 */
      wx.request({
        url: 'http://127.0.0.1:8000/forum/delete_comment', //仅为示例，并非真实的接口地址
        data: {
          delete_comment_id: this.data.delete_comment_id
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: (result) => {
          this.close_comment_delete()
          console.log(result);
          console.log("评论删除成功！");
          wx.showToast({
            title: '删除成功！',
            icon: 'success',
            duration: 2000,//持续的时间
          })
          /* 清楚输入框的数据记录 */
          that.setData({
            comment_of_forum: ''
          })
          /* 评论成功之后就要想办法刷新数据了 */
          var getloverforumarr = []
          for (let index = 0; index < that.data.display_forum_data.length; index++) {
            getloverforumarr = getloverforumarr.concat(that.data.display_forum_data[index].pk)
            that.setData({
              ['display_forum_data[' + index + '].fields.comment']: []     //把他们里面的评论数据先清空
            })
          }
          wx.request({
            url: 'http://127.0.0.1:8000/forum/get_comment', //仅为示例，并非真实的接口地址
            data: {
              getloverforumarr: getloverforumarr
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: (result) => {
              console.log(result);
              for (let index = 0; index < result.data.length; index++) {
                for (let index2 = 0; index2 < that.data.display_forum_data.length; index2++) {
                  if (that.data.display_forum_data[index2].pk == result.data[index].fields.forum_id) {
                    console.log(result.data[index].fields);
                    that.setData({
                      ['display_forum_data[' + index2 + '].fields.comment']: that.data.display_forum_data[index2].fields.comment.concat(result.data[index].fields)
                    })
                  }
                }
              }
              console.log(that.data.display_forum_data);
              for (let index = 0; index < that.data.display_forum_data.length; index++) {
                if (that.data.display_forum_data[index].pk == this.data.now_forum_id) {
                  this.setData({
                    now_display_comment: that.data.display_forum_data[index].fields.comment,
                    now_display_soncomment: that.data.display_forum_data[index].fields.soncomment,
                    comment_onclick_count: that.data.display_forum_data[index].fields.comment.length + that.data.display_forum_data[index].fields.soncomment.length
                  })
                }

              }

            },
          });

        },
      });


    } else if (this.data.delete_comment_form == 'son') {
      console.log("是我发的子评论");
      console.log(this.data.delete_comment_id);
      /* 发送请求删除子评论 */
      wx.request({
        url: 'http://127.0.0.1:8000/forum/delete_son_comment', //仅为示例，并非真实的接口地址
        data: {
          delete_comment_id: this.data.delete_comment_id
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: (result) => {
          console.log(result);
          this.close_comment_delete()
          console.log("删除评论成功！");
          wx.showToast({
            title: '删除成功！',
            icon: 'success',
            duration: 1000,//持续的时间
          })
          that.setData({
            comment_of_forum: ''
          })
          /* 刷新数据！！！ */
          var getloverforumarr = []
          for (let index = 0; index < that.data.display_forum_data.length; index++) {
            getloverforumarr = getloverforumarr.concat(that.data.display_forum_data[index].pk)
            that.setData({
              ['display_forum_data[' + index + '].fields.soncomment']: []     //把他们里面的评论数据先清空
            })
          }
          wx.request({
            url: 'http://127.0.0.1:8000/forum/get_son_comment', //仅为示例，并非真实的接口地址
            data: {
              getloverforumarr: getloverforumarr
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: (result) => {
              console.log(result);
              for (let index = 0; index < result.data.length; index++) {
                for (let index2 = 0; index2 < that.data.display_forum_data.length; index2++) {
                  if (that.data.display_forum_data[index2].pk == result.data[index].fields.forum_id) {
                    console.log(result.data[index].fields);
                    that.setData({
                      ['display_forum_data[' + index2 + '].fields.soncomment']: that.data.display_forum_data[index2].fields.soncomment.concat(result.data[index].fields)
                    })
                  }
                }
              }
              console.log(that.data.display_forum_data);
              for (let index = 0; index < that.data.display_forum_data.length; index++) {
                if (that.data.display_forum_data[index].pk == this.data.now_forum_id) {
                  this.setData({
                    now_display_comment: that.data.display_forum_data[index].fields.comment,
                    now_display_soncomment: that.data.display_forum_data[index].fields.soncomment,
                    comment_onclick_count: that.data.display_forum_data[index].fields.comment.length + that.data.display_forum_data[index].fields.soncomment.length
                  })
                }

              }

            },
          });
        },
      });
    }
  },
  nevigator_to_topic(e) {
    console.log(e.currentTarget.dataset.name);
    wx.redirectTo({
      url: '../topic_one/topic_one?name=' + e.currentTarget.dataset.name
    })
  },
  frank_publish() {
    wx.redirectTo({
      url: '../frank_publish/frank_publish'
    })
  },
  publish_learn() {
    wx.request({
      url: 'http://127.0.0.1:8000/info/activity', //仅为示例，并非真实的接口地址
      data: {
        studentId: wx.getStorageSync('studentId')
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (result) => {
        console.log(result);
        if (result.data[0].fields.department == 'init') {
          wx.navigateTo({
            url: "../forum_publish/forum_publish?classify=learn&department=init",
          });
        } else {
          console.log(result.data[0].fields.department);
          console.log(result.data[0].fields.position);
          var department = result.data[0].fields.department
          var position = result.data[0].fields.position
          /* 准备页面跳转，记得传三个值过去 */
          wx.navigateTo({
            url: '../forum_publish/forum_publish?classify=learn&department=' + department + '&position=' + position
          })
        }
      }
    })

  },
  activity() {
    /* 验证我的身份 */
    /* 直接去数据库中获取我的身份即可 */
    wx.request({
      url: 'http://127.0.0.1:8000/info/activity', //仅为示例，并非真实的接口地址
      data: {
        studentId: wx.getStorageSync('studentId')
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (result) => {
        console.log(result);
        if (result.data[0].fields.department == 'init') {
          console.log("真不是认证用户");
          wx.showModal({
            title: '提示',
            content: '你是普通学生，没有发布活动的权限，请咨询客服以完成认证'
          })

        } else {
          console.log(result.data[0].fields.department);
          console.log(result.data[0].fields.position);
          var department = result.data[0].fields.department
          var position = result.data[0].fields.position
          /* 准备页面跳转，记得传三个值过去 */
          wx.navigateTo({
            url: '../activity_publish/activity_publish?department=' + department + '&position=' + position
          })
        }
      }
    })

  },


})