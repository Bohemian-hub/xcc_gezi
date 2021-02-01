/*
 * @Author: your name
 * @Date: 2020-11-10 20:01:02
 * @LastEditTime: 2021-02-01 18:27:19
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

  back_index: function () {
    wx.wx.navigateBack({
      delta: 1
    });
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
  myorder() {
    wx.navigateTo({
      url: '../setting_order/setting_order',
    })
  },
  talkback() {
    wx.navigateTo({
      url: '../setting_talkback/setting_talkback',
    })
  },
  about() {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  count_down() {
    wx.redirectTo({
      url: '../count_change/count_change',
    })

  }
})