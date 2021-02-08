/*
 * @Author: your name
 * @Date: 2021-02-08 19:44:56
 * @LastEditTime: 2021-02-08 21:44:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/welcome/welcome.js
 */
// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showtimes: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.usercount);
    this.setData({
      usercount: options.usercount
    })
  },
  tip() {
    var that = this
    that.setData({
      showtimes: that.data.showtimes += 1
    })
  },
  gotoindex() {
    wx.redirectTo({
      url: '../index/index',
    });

  }

})