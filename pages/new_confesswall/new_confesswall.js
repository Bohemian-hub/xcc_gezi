/*
 * @Author: your name
 * @Date: 2020-12-16 20:57:02
 * @LastEditTime: 2020-12-21 11:45:24
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
    my_confess: [],
    confess_tome: [],
    color: '1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.get_new_confess()
  },
  my_confess() {
    this.get_new_confess()
  },
  get_new_confess() {
    /* 发送一个请求去获取我的表白 */
    wx.request({
      url: 'https://www.xiyuangezi.cn/confess/get_new_confess', //仅为示例，并非真实的接口地址
      data: {
        studentId: wx.getStorageSync('studentId'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      success: (result) => {
        console.log(result.data);
        this.setData({
          my_confess: result.data,
          color: '1'
        })
        console.log(this.data.my_confess);
      },
    });
  },
  confess_tome() {

    wx.request({
      url: 'https://www.xiyuangezi.cn/confess/get_confess_tome', //仅为示例，并非真实的接口地址
      /* 这里传入的值包括专业院系等等 */
      data: {
        name: wx.getStorageSync('name'),
        college: wx.getStorageSync('college'),
        major: wx.getStorageSync('major'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      success: (result) => {
        console.log(result.data);
        this.setData({
          my_confess: result.data,
          color: '2'
        })
      },
    });
  },
  confessone() {
    wx.navigateTo({
      url: '../new_publish_confess/new_publish_confess',
    })
  },
  back() {
    wx.redirectTo({
      url: '../index/index',
    })
  }


})