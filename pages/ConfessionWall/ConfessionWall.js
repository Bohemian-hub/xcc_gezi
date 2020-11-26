/*
 * @Author: your name
 * @Date: 2020-11-13 23:35:52
 * @LastEditTime: 2020-11-26 18:45:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/ConfessionWall/ConfessionWall.js
 */
// pages/ConfessionWall/ConfessionWall.js

//声明工具类对象
var love_onclick_status = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    onclick_love_id: [],
    animationData: {},
    showModalStatus: false,
    comment_onclick_count: '',
    use_List: 'swiperList',
    confessList: [],
    warning1: 0,
    comment_user_comtent: '',
    now_turn_comment_id: '',
    now_comment_all: [],
    now_son_comment_all: [],
    switch_reply: 0,
    conment_index: '',
    reply_words: '',
    reply_son_comment: '',
    which_reply_id: '',
    which_reply_name: '',
    inputValue: null,
    if_focus: false,
    confess_time: '',
    swiperList: [{
      id: 0,
      fields: {
        confess_name: '开发者',
        confess_object: '用户们',
        bg_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606205758291&di=7b39186e74a06925e7448ae5df5e55a7&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F04%2F13%2F99%2F37581ef35b94841.jpg',
        object_img: 'https://s3.ax1x.com/2020/11/24/Dt6Ti9.png',
        confess_content: '暂时还没有表白，点击下方”我要表白”开始一条浪漫的表白吧！开发者希望给你美妙的爱情体验，祝您99999哦',
        love_count: '1024',
        comment_count: '0',
      }
    }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  /* 我准备在这里查询我想要的数据，加载的时候 就显示等待，等成功了就关闭等待，用户可以浏览 */
  onLoad: function (options) {
    var that = this

    var myDate = new Date();

    var y = myDate.getFullYear();    //获取完整的年份(4位,1970-????)

    var mon = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)

    var d = myDate.getDate();        //获取当前日(1-31)

    if (d < 10) {
      d = "0" + String(d)
    }
    if (mon < 10) {
      mon = "0" + String(mon)
    }
    var confesstime = y + '/' + mon + '/' + d

    that.setData({
      confess_time: confesstime
    })


    wx.showLoading({
      title: '正在加载',
    })
    var myDate = new Date();
    var month = myDate.getMonth() + 1
    var daly = myDate.getDate()

    if (daly < 10) {
      daly = "0" + String(daly)
    }
    if (month < 10) {
      month = "0" + String(month)
    }
    var card_day = myDate.getFullYear() + '' + month + '' + daly
    /* 发送一个数据请求，获取表白墙上日期为今天的所有表白数据。 */
    /* 当然是通过向后端传值的方式 */
    wx.request({
      url: 'http://39.100.67.217:8001/confess/get_confess', //仅为示例，并非真实的接口地址
      data: {
        card_date: card_day
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {

        console.log(res.data);
        /* 使用一个循环将所有的 image1 image2 image3 变成相应的图片？ */
        for (let index = 0; index < res.data.length; index++) {
          console.log(res.data[index].fields.object_img);
          /* 表白用图更改  */
          if (res.data[index].fields.object_img == 'image1') {
            res.data[index].fields.object_img = 'https://s3.ax1x.com/2020/11/24/DtJDqx.md.png'

            /*             that.setData({
                          ['confessList[' + index + '].fields.object_img']: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1276922613,2663697467&fm=26&gp=0.jpg'
                        }) */
          } else if (res.data[index].fields.object_img == 'image2') {
            res.data[index].fields.object_img = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3118951955,1143076286&fm=26&gp=0.jpg'

            /*             that.setData({
                          ['confessList[' + index + '].fields.object_img']: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1276922613,2663697467&fm=26&gp=0.jpg'
                        }) */
          } else if (res.data[index].fields.object_img == 'image3') {
            res.data[index].fields.object_img = 'https://s3.ax1x.com/2020/11/24/DtNC24.png'

            /*             that.setData({
                          ['confessList[' + index + '].fields.object_img']: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1276922613,2663697467&fm=26&gp=0.jpg'
                        }) */
          }
          /* 背景图片更改 */
          if (res.data[index].fields.bg_img == '1') {
            res.data[index].fields.bg_img = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606196732259&di=bc5284c644500943f9f96177e5914f44&imgtype=0&src=http%3A%2F%2Fpng.pngtree.com%2Fthumb_back%2Ffw800%2Fbackground%2F20190221%2Fourmid%2Fpngtree-romantic-valentines-day-festival-simple-image_48271.jpg'

            /*             that.setData({
                          ['confessList[' + index + '].fields.object_img']: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1276922613,2663697467&fm=26&gp=0.jpg'
                        }) */
          } else if (res.data[index].fields.bg_img == '2') {
            res.data[index].fields.bg_img = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2614938248,2995799949&fm=26&gp=0.jpg'

            /*             that.setData({
                          ['confessList[' + index + '].fields.object_img']: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1276922613,2663697467&fm=26&gp=0.jpg'
                        }) */
          } else if (res.data[index].fields.bg_img == '3') {
            res.data[index].fields.bg_img = 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3925607489,477783154&fm=26&gp=0.jpg'

            /*             that.setData({
                          ['confessList[' + index + '].fields.object_img']: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1276922613,2663697467&fm=26&gp=0.jpg'
                        }) */
          }
        }

        /* 数据获取完毕，准备渲染 */

        console.log('已经有的：');
        console.log(res.data);
        if (res.data[0]) {
          console.log('有数据');
          that.setData({
            confessList: res.data
          })
        } else {
          console.log('无数据');
          that.setData({
            confessList: that.data.swiperList
          })
        }

        /* 关闭等待框，弹出提示框 */
        wx.hideLoading()

      }
    })
    /* 查询一下哪些卡片我是点了赞的 */
    wx.request({
      url: 'http://39.100.67.217:8001/confess/which_love', //仅为示例，并非真实的接口地址
      data: {
        studentId: wx.getStorageSync('studentId'),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (result) => {
        for (let index = 0; index < result.data.length; index++) {
          /* console.log("点了赞的comment_id：" + result.data[index].fields.comment_id); */
          var peach = result.data[index].fields.comment_id
          for (let index = 0; index < that.data.confessList.length; index++) {
            const element = that.data.confessList[index].fields.comment_id;
            /* console.log(element); */
            if (element == peach) {
              /* console.log("匹配成功"); */
              /* console.log(index); */
              var love_target = index
              that.setData({
                ['onclick_love_id[' + love_target + ']']: 1,
              })
              love_onclick_status[love_target] = 1;
              /* console.log(that.data.onclick_love_id); */
            }

          }
        }
      },
    });


  },
  page_back_index: function () {
    wx.navigateTo({
      url: '../index/index',
      success: function (res) {

      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
  },

  makelove(e) {
    var that = this;
    console.log(e.currentTarget.dataset.id);
    var love_target = e.currentTarget.dataset.id - 1

    if (love_onclick_status[love_target] == 1) {
      /* 下面是将点赞的按钮变回去，但是想在我不想变了，真的很麻烦你知道吗 */
      /*       that.setData({
              ['onclick_love_id[' + love_target + ']']: -1,
            })
            love_onclick_status[love_target] = 0;
            console.log(this.data.onclick_love_id); */

      that.setData({
        warning1: 1
      })
      setTimeout(function () {
        that.setData({
          warning1: 0
        })
      }, 2000);

    } else {
      /* 下面是将点赞的按钮变成红色 */
      that.setData({
        ['onclick_love_id[' + love_target + ']']: 1,
        /*         ['swiperList[' + e.currentTarget.dataset.id + '].love_numbers']: swiperList[e.currentTarget.dataset.id].love_numbers + 1 */
        /* 这里是为了让点赞数量本地+1 */
        ['confessList[' + love_target + '].fields.love_count']: that.data.confessList[love_target].fields.love_count + 1
      })
      love_onclick_status[love_target] = 1;
      console.log(that.data.onclick_love_id);
      console.log('-----------------');
      console.log('-----------------');
      console.log('-----------------');
      console.log(love_target)
      console.log(that.data.confessList[love_target].fields.comment_id);
      console.log('-----------------');
      console.log('-----------------');
      console.log('-----------------');


      /* 下面我就要记录我这个点赞了，也就是发送点赞请求到后端 */
      wx.request({
        url: 'http://39.100.67.217:8001/confess/add_love', //仅为示例，并非真实的接口地址
        data: {
          name: wx.getStorageSync('name'),
          studentId: wx.getStorageSync('studentId'),
          comment_id: that.data.confessList[love_target].fields.comment_id,
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: (result) => {
          console.log("点赞成功");
        },
      });
    }

  },
  makecomment(e) {
    var that = this;
    that.setData({
      switch_reply: 0
    })
    console.log(e.currentTarget.dataset.id);
    var conment_index = e.currentTarget.dataset.id - 1
    console.log(that.data.confessList[conment_index].fields.comment_count);
    that.setData({
      comment_onclick_count: that.data.confessList[conment_index].fields.comment_count,
      now_turn_comment_id: that.data.confessList[conment_index].fields.comment_id,
      conment_index: conment_index,
    })
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
        animationData: animation.export()
      })
    }.bind(this), 0)
    /* 下面 我就要调用后端做查询有那些评论啦，首先请出来我们最爱的正在加载！ */
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: 'http://39.100.67.217:8001/confess/get_comment', //仅为示例，并非真实的接口地址
      data: {
        comment_id: that.data.now_turn_comment_id,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (result) => {
        console.log("获取所有评论成功！");
        that.setData({
          now_comment_all: result.data,
          comment_onclick_count: result.data.length
        })
        console.log(this.data.now_comment_all);
        wx.hideLoading()
      },
    });
    wx.request({
      url: 'http://39.100.67.217:8001/confess/get_comment_son', //仅为示例，并非真实的接口地址
      data: {
        comment_id: that.data.now_turn_comment_id,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (result) => {
        console.log("获取所有子评论成功！");
        console.log(result.data);
        that.setData({
          now_son_comment_all: result.data,
        })
        console.log(that.data.now_son_comment_all);
      },
    });

  },
  close_comment() {
    var that = this;
    /* 要不关的时候也做一个假的数据增加 */

    that.setData({
      ['confessList[' + that.data.conment_index + '].fields.comment_count']: this.data.comment_onclick_count
    })


    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    this.animation.translateY(0).step()
    that.setData({
      animationData: animation.export(),

    })
    setTimeout(function () {
      animation.translateY(520).step()
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
  publish_confess() {
    wx.navigateTo({
      url: '../publish_confess/publish_confess',
    })
  },

  complain_panel() {
    var that = this
    that.setData({
      warning2: 1
    })
    setTimeout(function () {
      that.setData({
        warning2: 0
      })
    }, 2000);
  },

  publish_complain() {
    var that = this
    that.setData({
      warning2: 1
    })
    setTimeout(function () {
      that.setData({
        warning2: 0
      })
    }, 2000);
  },


  close_warning() {
    var that = this
    that.setData({
      warning1: 0,
      warning2: 0
    })
  },
  getInputValue1(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      comment_user_comtent: e.detail
    })
  },
  comment_send() {


    var that = this
    if (that.data.comment_user_comtent) {

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
      console.log(that.data.comment_user_comtent.value);
      console.log(comment_time);
      console.log(wx.getStorageSync('name'));
      console.log(wx.getStorageSync('studentId'));
      console.log(that.data.now_turn_comment_id);

      var comment_time = mon + '-' + d + ' ' + h + ':' + m
      var comment_content = that.data.comment_user_comtent.value
      var comment_id = that.data.now_turn_comment_id
      var son_comment_id_time = wx.getStorageSync('studentId') + mon + d + h + m + s
      console.log(son_comment_id_time);

      /* 下面我要请求后端数据库了，我要将这个评论增加大哦我的评论表中去。 */
      wx.request({
        url: 'http://39.100.67.217:8001/confess/add_comment', //仅为示例，并非真实的接口地址
        data: {
          name: wx.getStorageSync('name'),
          studentId: wx.getStorageSync('studentId'),
          comment_time: comment_time,
          comment_id: comment_id,
          comment_content: comment_content,
          son_comment_id: son_comment_id_time,      //我看还是用时间来区分每一条评论比较合适，当然还是加上学号吧
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
            duration: 2000,//持续的时间
          })
          /* 评论成功之后就要想办法刷新数据了 */
          wx.request({
            url: 'http://39.100.67.217:8001/confess/get_comment', //仅为示例，并非真实的接口地址
            data: {
              comment_id: that.data.now_turn_comment_id,
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: (result) => {
              console.log("获取所有评论成功！");
              that.setData({
                now_comment_all: result.data,
                comment_onclick_count: result.data.length
              })
              console.log(this.data.now_comment_all);
              wx.hideLoading()
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
    if (that.data.reply_son_comment) {
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


      var son_comment_content = that.data.reply_son_comment.value
      var son_comment_id = that.data.which_reply_id
      var son_comment_id_time = wx.getStorageSync('studentId') + mon + d + h + m + s
      var son_comment_to_who = that.data.which_reply_name
      var comment_id = this.data.now_turn_comment_id


      console.log(wx.getStorageSync('name'));
      console.log(wx.getStorageSync('studentId'));
      console.log(son_comment_content);
      console.log(son_comment_id);
      console.log(son_comment_id_time);
      console.log(son_comment_to_who);
      console.log(comment_id);


      /* 下面我要请求后端数据库了，我要将这个评论增加大哦我的评论表中去。 */
      wx.request({
        url: 'http://39.100.67.217:8001/confess/add_son_comment', //仅为示例，并非真实的接口地址
        data: {
          son_name: wx.getStorageSync('name'),   //评论者的姓名
          son_studentId: wx.getStorageSync('studentId'),  //评论者的学号
          son_comment_content: son_comment_content,      //子评论的内容
          son_comment_id: son_comment_id,   //与之关联的评论id
          son_comment_to_who: son_comment_to_who,   //子评论的对象名称
          son_comment_id_time: son_comment_id_time,      //子评论的时间
          comment_id: comment_id,//卡片的comment_id

        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: (result) => {
          console.log("子评论成功！");
        },
      });
      /* 子评论成功了，就重新获取下评论和子评论，然后渲染 */
      /* 先来刷新评论 */
      wx.request({
        url: 'http://39.100.67.217:8001/confess/get_comment', //仅为示例，并非真实的接口地址
        data: {
          comment_id: that.data.now_turn_comment_id,
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: (result) => {
          console.log("获取所有评论成功！");
          that.setData({
            now_comment_all: result.data,
            comment_onclick_count: result.data.length
          })
          console.log(this.data.now_comment_all);
          wx.hideLoading()
        },
      });
      /* 再来刷新子评论 */
      wx.request({
        url: 'http://39.100.67.217:8001/confess/get_comment_son', //仅为示例，并非真实的接口地址
        data: {
          comment_id: that.data.now_turn_comment_id,
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: (result) => {
          console.log("获取所有子评论成功！");
          console.log(result.data);
          that.setData({
            now_son_comment_all: result.data,
          })
          console.log(that.data.now_son_comment_all);
        },
      });
      /* 然后再更改一下发布评论盒子评论的状态 */
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
  reply(e) {
    var that = this
    that.setData({
      switch_reply: 1,
      if_focus: true,
    })

    /* 要准备前往数据库啦，哈哈哈哈，真的太快乐了 */
    console.log(e.currentTarget.dataset.id);
    console.log(e.currentTarget.dataset.name);
    that.setData({
      reply_words: '回复' + e.currentTarget.dataset.name + ':',
      which_reply_id: e.currentTarget.dataset.id,
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
  getInputValue2(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}
    this.setData({
      reply_son_comment: e.detail
    })
  }

});