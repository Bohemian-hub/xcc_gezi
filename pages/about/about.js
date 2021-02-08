/*
 * @Author: your name
 * @Date: 2021-01-31 21:03:29
 * @LastEditTime: 2021-02-08 19:44:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/about/about.js
 */
// pages/about/about.js
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

  back() {
    wx.redirectTo({
      url: '../index/index',
    });

  }
})