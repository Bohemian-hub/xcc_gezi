/*
 * @Author: your name
 * @Date: 2020-12-06 21:44:10
 * @LastEditTime: 2020-12-06 22:51:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/express_task/express_task.js
 */
// pages/express_task/express_task.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.get_my_catch_order()
  },
  /* 来一个订单的获取 */
  get_my_catch_order() {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/express/get_my_catch_order', //仅为示例，并非真实的接口地址
      data: {
        name: wx.getStorageSync('name'),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res);

        console.log(res.data);
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          console.log(element.fields.order_stadus);

        }
        that.setData({
          orderList: res.data
        })
        console.log(that.data.orderList);


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
    wx.redirectTo({
      url: '../express_task/express_task',
    })
  },
})