/*
 * @Author: your name
 * @Date: 2021-01-26 12:28:15
 * @LastEditTime: 2021-01-26 13:50:22
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
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/forum/get_hot_topic', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          hot_topicList: res.data
        })
      }
    })
  },
})