/*
 * @Author: your name
 * @Date: 2021-02-08 17:37:17
 * @LastEditTime: 2021-02-08 18:58:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/notice/notice.js
 */
// pages/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/passage/notice', //仅为示例，并非真实的接口地址
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          notice: res.data
        })
        console.log(that.data.notice);
      }
    })
  },
  back() {
    wx.redirectTo({
      url: '../index/index',
    });
  }
})