/*
 * @Author: your name
 * @Date: 2021-03-30 11:02:43
 * @LastEditTime: 2021-04-06 19:55:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/my/my.js
 */
// pages/my/my.js
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
    this.setData({
      nickname: wx.getStorageSync('name'),
    })

  },
  setting() {

    wx.navigateTo({
      url: '../setting/setting',
    })

  },
  notice() {
    wx.navigateTo({
      url: '../notice/notice',
    })
  },
  about() {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  about() {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  talkback() {
    wx.navigateTo({
      url: '../setting_talkback/setting_talkback',
    })
  },
  express_order() {
    wx.navigateTo({
      url: '../express/express',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})