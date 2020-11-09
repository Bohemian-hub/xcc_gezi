/*
 * @Author: your name
 * @Date: 2020-11-08 23:29:46
 * @LastEditTime: 2020-11-09 14:50:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/index/index.js
 */
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imageone_src: '',
    sentence: '',
    one_date: '',
    one_week: '',
    sentence_size: '',
    greeting: '',
    student_name: '',
    now_time: '',
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  Get_time() {
    /* 加载时间日期 */
    var myDate = new Date();
    var month = myDate.getMonth() + 1
    var date = month + "-" + myDate.getDate();
    var h = myDate.getHours();       //获取当前小时数(0-23)
    var m = myDate.getMinutes();     //获取当前分钟数(0-59)
    var week = '';
    if (myDate.getDay() == 1) {
      week = 'Mon.';
    } else if (myDate.getDay() == 2) {
      week = 'Tues.';
    } else if (myDate.getDay() == 3) {
      week = 'Wed.';
    } else if (myDate.getDay() == 4) {
      week = 'Thur.';
    } else if (myDate.getDay() == 5) {
      week = "Fri.";
    } else if (myDate.getDay() == 6) {
      week = 'Sat.';
    } else if (myDate.getDay() == 0) {
      week = 'Sun.';
    }


    if (h < 10) {
      h = "0" + String(h)
    }
    if (m < 10) {
      m = "0" + String(m)
    }
    const time = h + "时" + m + '分';

    var greet = '';
    if (h < 6) {
      greet = "夜深啦 快快休息！"
    } else if (h < 9) {
      greet = "早上好 现在是:"
    } else if (h < 12) {
      greet = "上午好 加油学习"
    } else if (h < 14) {
      greet = "中午休息一下!"
    } else if (h < 17) {
      greet = "最忙碌的下午来啦 现在是:"
    } else if (h < 21) {
      greet = "饭后走走，减肥(*╹▽╹*)"
    } else if (h < 23) {
      greet = "晚上吃东西要胖的"
    } else if (h = 23) {
      greet = "今天又快结束啦！"
    }

    this.setData({
      one_date: date,
      one_week: week,
      greeting: greet,
      now_time: time
    })

  },


  onLoad: function () {

    /* 获取头像昵称信息等等 */
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    /* 加载one一个接口获取数据 */

    const that = this;
    const index = 3;
    that.Get_time();  //页面加载的时候获取一次时间，后面就每60秒在调用一次时间获取时间了
    wx.request({

      url: 'http://api.youngam.cn/api/one.php', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          imageone_src: res.data.data[index].src,
          sentence: res.data.data[index].text
        })
        if (res.data.data[index].text.length < 50) {
          that.setData({
            sentence_size: '22rpx',
          })
        }
      }
    })

    var ref = "";
    ref = setInterval(function () {
      that.Get_time();
    }, 60000);
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
