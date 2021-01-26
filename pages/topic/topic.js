/*
 * @Author: your name
 * @Date: 2021-01-26 12:28:15
 * @LastEditTime: 2021-01-26 19:21:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/topic/topic.js
 */
// pages/topic/topic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    turn_search: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_topic()
    this.get_hot_topic()
  },

  back() {
    wx.redirectTo({
      url: '../forum/forum',
    })
  },
  get_topic() {
    var that = this
    wx.request({
      url: 'https://www.xiyuangezi.cn/forum/get_topic', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          topicList: res.data
        })
      }
    })
  },
  get_hot_topic() {
    var that = this;
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
    var real_date = myDate.getFullYear() + '' + month + '' + daly;
    wx.request({
      url: 'http://127.0.0.1:8000/forum/get_hot_topic', //仅为示例，并非真实的接口地址
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        real_date: real_date
      },
      success(res) {
        console.log(res.data)
        that.setData({
          hot_topicList: res.data
        })
      }
    })
  },
  search(e) {
    /* 拿到这个值之后与所有的话题做检索 */
    if (e.detail.value == "") {
      console.log(e.detail.value);
      this.setData({
        turn_search: 0
      })
    } else {
      var peach_arr = []
      for (let index = 0; index < this.data.topicList.length; index++) {
        if (this.data.topicList[index].fields.content.indexOf(e.detail.value) != -1) {
          peach_arr = peach_arr.concat(this.data.topicList[index])
        }
      }
      this.setData({
        turn_search: 1,
        peach_arr: peach_arr
      })
    }
  }
})