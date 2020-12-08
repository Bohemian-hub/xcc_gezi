/*
 * @Author: your name
 * @Date: 2020-11-18 15:06:45
 * @LastEditTime: 2020-12-08 19:57:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/publish_confess/publish_confess.js
 */
// pages/publish_confess/publish_confess.js
// 引入模块 
var COS = require('../../cos-wx-sdk-v5.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    filePath: '',
    filename: '',
    choose_image_index: 'image1',
    me: '',
    ta: '',
    content: '',
    radio: 1,
    choose_img_url: '',
    card_id: '',
    card_day: '',
    warn_display: 1,
    warn_display2: 0,
    publish_chance: ''


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    /* 首先我的获取一下我的card_date */
    var that = this
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
    that.setData({
      card_day: card_day
    })

    /* 再打开页面的时候就向服务器发送一个请求，确认今天发送的表白墙的数量，不是每一条表白墙都有记录吗，哈哈哈 */
    /* 只需要传入我的学号就好啦 */
    wx.request({

      url: 'http://39.100.67.217:8001/confess/count', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      /* 当然还要传入今天的日期啦 */
      data: {
        studentId: wx.getStorageSync('studentId'),  //评论者的学号
        card_day: that.data.card_day
      },
      success(res) {
        console.log(res.data.length)
        if (res.data.length == 0) {
          that.setData({
            publish_chance: 2
          })
        } else if (res.data.length == 1) {
          that.setData({
            publish_chance: 1
          })
        } else if (res.data.length == 2) {
          that.setData({
            publish_chance: 0
          })
        }
      }
    })
    wx.hideLoading();

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
  /* 我选择了哪一张表白用图 */
  choose_image(e) {
    console.log(e.currentTarget.dataset.id);
    this.setData({
      choose_image_index: e.currentTarget.dataset.id,
    })
  },
  ChooseImage() {
    var that = this
    /* 获取一个格式化的日期，方便后面的使用 */
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
    var card_time = myDate.getFullYear() + '' + month + '' + daly + '' + h + '' + m + '' + s;
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        /* 这里的if是判断我是否选了图片，然后决定上传按钮是否显示 */
        if (this.data.imgList.length != 0) {
          /* 有图片了，让选择图标消失 */
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths),
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths,
            choose_image_index: 'image4',
            filePath: res.tempFiles[0].path,
            filename: wx.getStorageSync('studentId') + "_" + card_time + ".jpg",
          })
        }


      }
    });
  },
  ViewImage(e) {
    this.setData({
      choose_image_index: 'image4',
    })
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  /* 获取各个地方的值 */
  getInputValue1(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      me: e.detail
    })
  },
  getInputValue2(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      ta: e.detail
    })
  },
  getInputValue3(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      content: e.detail
    })
  },
  listenerRadioGroup(e) {
    console.log(e.detail.value);
    this.setData({
      radio: e.detail.value
    })
  },
  publish(res) {
    var that = this
    /* 开启等待框 */
    if (that.data.me && that.data.ta && that.data.content) {

      wx.showLoading({
        title: '正在上传中！！！',
      })
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
      var card_time = myDate.getFullYear() + '' + month + '' + daly + '' + h + '' + m + '' + s;
      var card_day = myDate.getFullYear() + '' + month + '' + daly
      that.setData({
        card_id: card_time,
        card_day: card_day
      })
      /* 表示我选择了自定义的图片，这样才上传图片，否则我不用图片 */
      if (this.data.choose_image_index == 'image4') {
        // 去某个地方获取一个临时密钥
        var cos = new COS({
          getAuthorization: function (options, callback) {
            // 服务端 JS 和 PHP 示例：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
            // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
            // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
            wx.request({
              url: 'http://39.100.67.217:8001/confess/credential',
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
        cos.postObject({
          Bucket: 'xcc-grid-1256135907',
          Region: 'ap-nanjing',
          Key: 'xcc_confess/' + this.data.filename,
          FilePath: that.data.filePath,
          onProgress: function (info) {
            /* 显示进度 */
            console.log(JSON.stringify(info.percent));
          }
        }, function (err, data) {
          console.log(err || data);
          console.log(data.Location);
          that.setData({
            choose_img_url: "https://" + data.Location,
          })
          that.add_confess()
        });
      } else {
        that.setData({
          choose_img_url: this.data.choose_image_index,
        })
        that.add_confess()
      }
    } else {
      wx.showToast({
        title: '没填完叭',
        icon: 'warn',
        duration: 2000
      })
    }
  },
  add_confess() {
    var that = this
    /* 展示所有即将录入数据库的东西 */
    console.log('----------------------------');
    console.log(wx.getStorageSync('name'));
    console.log(wx.getStorageSync('studentId'));
    console.log(that.data.me.value);
    console.log(that.data.ta.value);
    console.log(that.data.radio);
    console.log(that.data.choose_img_url);
    console.log(that.data.content.value);
    console.log(that.data.card_id);
    console.log(that.data.card_day);
    console.log('----------------------------');
    /* 传值到后端，后端入库 */
    if (that.data.publish_chance == 0) {
      wx.hideLoading()
      that.setData({
        warn_display2: 1
      })

    } else {
      wx.request({
        url: 'http://39.100.67.217:8001/confess/add_confess', //仅为示例，并非真实的接口地址
        data: {
          name: wx.getStorageSync('name'),
          studentId: wx.getStorageSync('studentId'),
          confess_name: that.data.me.value,
          confess_object: that.data.ta.value,
          bg_img: that.data.radio,
          object_img: that.data.choose_img_url,
          confess_content: that.data.content.value,
          comment_id: that.data.card_id,
          card_date: that.data.card_day
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          console.log(res.data.loginnum)
          if (res.data.loginnum == 200) {
            /* 关闭等待框，弹出提示框 */
            wx.hideLoading()
            wx.showToast({
              title: '发布成功!',
              icon: 'success',
              duration: 2000,//持续的时间
              success: function () {
                console.log('haha');
                setTimeout(function () {
                  //要延时执行的代码
                  wx.redirectTo({
                    url: '../ConfessionWall/ConfessionWall'
                  })
                }, 2000) //延迟时间
              }
            })
          }
        }
      })
    }



  },
  close_warn() {
    this.setData({
      warn_display: 0
    })
  },
  close_warn2() {
    this.setData({
      warn_display2: 0
    })
  }

})