/*
 * @Author: your name
 * @Date: 2021-02-01 18:03:35
 * @LastEditTime: 2021-03-12 09:50:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/count_change/count_change.js
 */
// pages/count_change/count_change.js
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    var count_what = wx.getStorageSync("count")
    if (!count_what) {
      console.log("没有设置count");
      that.setData({
        count_text: "2022考研"
      })
    } else if (count_what == 'summer') {
      that.setData({
        count_text: '放暑假'
      })
    } else if (count_what == 'cet') {
      that.setData({
        count_text: '2021四六级'
      })
    } else if (count_what == 'kaoyan') {
      that.setData({
        count_text: '2022考研'
      })
    } else if (count_what == 'teacher') {
      that.setData({
        count_text: '教资'
      })
    } else if (count_what == 'computer') {
      that.setData({
        count_text: '计算机二级'
      })
    } else if (count_what == 'tem4') {
      that.setData({
        count_text: '专业英语四级'
      })
    } else if (count_what == 'tem8') {
      that.setData({
        count_text: '专业英语八级'
      })
    }
  },
  change_count(e) {
    console.log(e.currentTarget.dataset.countthing);
    wx.setStorageSync('count', e.currentTarget.dataset.countthing)
    /* 设置完了之后就关闭这个页面 */
    wx.reLaunch({
      url: '../index/index',
    });

  },
  back_index() {
    wx.navigateBack({
      delta: 1,
    })
  },

})