/*
 * @Author: your name
 * @Date: 2020-11-13 23:35:52
 * @LastEditTime: 2021-03-09 13:53:16
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
    var that = this

    var myDate = new Date();
    myDate.setDate(myDate.getDate() - 6);
    var month = myDate.getMonth() + 1
    var daly = myDate.getDate()
    if (daly < 10) {
      daly = "0" + String(daly)
    }
    if (month < 10) {
      month = "0" + String(month)
    }
    var love_time = myDate.getFullYear() + '' + month + '' + daly
    wx.request({
      url: 'https://www.xiyuangezi.cn/confess/get_confess', //仅为示例，并非真实的接口地址
      data: {
        love_time: love_time
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          confessList: res.data
        })
      }
    })



  },
  back_index: function () {
    wx.redirectTo({
      url: '../index/index',
      success: function (res) {
      }
    })
  },

  publish_confess() {
    /* 先判断我最近七天有咩有发布过档案 */
    var myDate = new Date();
    myDate.setDate(myDate.getDate() - 6);
    var month = myDate.getMonth() + 1
    var daly = myDate.getDate()
    if (daly < 10) {
      daly = "0" + String(daly)
    }
    if (month < 10) {
      month = "0" + String(month)
    }
    var love_time = myDate.getFullYear() + '' + month + '' + daly
    wx.request({
      url: 'https://www.xiyuangezi.cn/confess/has_confess', //仅为示例，并非真实的接口地址
      data: {
        studentId: wx.getStorageSync('studentId'),
        love_time: love_time
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.length > 0) {
          wx.showModal({
            title: '提示',
            content: '你的档案还在有效期内,请于加入档案后第七天再试！',
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#3CC51F',
          });
        } else {
          wx.redirectTo({
            url: '../publish_confess/publish_confess',
          })
        }
      }
    })

  },
  turn_infor(e) {
    console.log(e.currentTarget.dataset.content);
    this.setData({
      if_show_infor: !this.data.if_show_infor,
      content: e.currentTarget.dataset.content,
      month: e.currentTarget.dataset.month,
      dayly: e.currentTarget.dataset.dayly,
      contact: e.currentTarget.dataset.contact,
    })
  },
  close_infor() {

    this.setData({
      if_show_infor: false
    })
  }

});