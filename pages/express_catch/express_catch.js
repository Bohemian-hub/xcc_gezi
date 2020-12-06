/*
 * @Author: your name
 * @Date: 2020-12-06 15:05:19
 * @LastEditTime: 2020-12-06 17:48:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/express_catch/express_catch.js
 */
// pages/express_catch/express_catch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderwaitList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.Iamcatcher()
  },
  /* 把本机的studentID传入，确定我有咩有提交代取员申请 */
  Iamcatcher() {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/express/ifapply', //仅为示例，并非真实的接口地址
      data: {
        studentId: wx.getStorageSync('studentId'),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.length);
        if (res.data.length == 0) {
          console.log("我还没有注册成为代取员");
          /* 下面是申请板块展示 */
        }
      }
    })
  },
  get_order() {
    var that = this
    wx.request({
      url: 'http://39.100.67.217:8001/express/get_all_express', //仅为示例，并非真实的接口地址
      data: {
        studentId: wx.getStorageSync('studentId'),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        //console.log(res.data);
        that.setData({
          orderwaitList: res.data
        })
        console.log(that.data.orderwaitList);


      }
    })
  },

  back_index() {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  turn_page_neworder() {
    wx.redirectTo({
      url: '../express/express',
    })
  },
  turn_page_myorder() {
    wx.redirectTo({
      url: '../express_order/express_order',
    })
  },
  turn_page_catchorder() {
    wx.redirectTo({
      url: '../express_catch/express_catch',
    })
  },
  turn_page_myself() {
    // 本来要切换页面的, 但是还没做好
    /*     wx.navigateTo({
          url: '../express/express',
        }) */
  },
})