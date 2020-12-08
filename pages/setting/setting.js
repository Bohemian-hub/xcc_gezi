/*
 * @Author: your name
 * @Date: 2020-11-10 20:01:02
 * @LastEditTime: 2020-12-08 20:05:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/setting/setting.js
 */
// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */

  page_back_index: function () {
    wx.redirectTo({
      url: '../index/index',
      success: function (res) {

      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
  },
  notdofunction() {
    wx.showModal({
      title: '提示',
      content: '该功能暂未开发，敬请期待',
      showCancel: false,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {

      },
    });

  },
  onLoad: function (options) {

  },
  myinfor() {
    wx.redirectTo({
      url: '../setting_infor/setting_infor',
    })
  },
  myorder() {
    wx.redirectTo({
      url: '../setting_order/setting_order',
    })
  },
  talkback() {
    wx.redirectTo({
      url: '../setting_talkback/setting_talkback',
    })
  }
})