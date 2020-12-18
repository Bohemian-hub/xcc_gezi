/*
 * @Author: your name
 * @Date: 2020-12-16 20:57:02
 * @LastEditTime: 2020-12-19 00:05:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/new_confesswall/new_confesswall.js
 */
// pages/new_confesswall/new_confesswall.js
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

  },
  confessone() {
    wx.navigateTo({
      url: '../new_publish_confess/new_publish_confess',
    })
  },
  back() {
    wx.redirectTo({
      url: '../new_confesswall/new_confesswall',
    })
  }


})