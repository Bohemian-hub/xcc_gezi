/*
 * @Author: your name
 * @Date: 2020-11-13 23:35:52
 * @LastEditTime: 2021-01-27 22:30:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/ConfessionWall/ConfessionWall.js
 */
// pages/ConfessionWall/ConfessionWall.js

//声明工具类对象
var love_onclick_status = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    confessList: [{}],
    if_show_infor: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  /* 我准备在这里查询我想要的数据，加载的时候 就显示等待，等成功了就关闭等待，用户可以浏览 */
  onLoad: function () {


    /* 发送一个数据请求，获取表白墙上日期为今天的所有表白数据。 */
    /* 当然是通过向后端传值的方式 */
    // wx.request({
    //   url: 'https://www.xiyuangezi.cn/confess/get_confess', //仅为示例，并非真实的接口地址
    //   data: {
    //     card_date: card_day
    //   },
    //   method: "POST",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   success(res) {
    //   }
    // })



  },
  back: function () {
    wx.redirectTo({
      url: '../index/index',
      success: function (res) {
      }
    })
  },

  publish_confess() {
    wx.navigateTo({
      url: '../publish_confess/publish_confess',
    })
  },
  turn_infor() {
    this.setData({
      if_show_infor: !this.data.if_show_infor
    })
  }

});