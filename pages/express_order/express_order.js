/*
 * @Author: your name
 * @Date: 2020-12-05 23:36:24
 * @LastEditTime: 2020-12-07 11:50:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/express_order/express_order.js
 */
// pages/express_order/express_order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.get_order()
  },
  /* 做一个页面加载获取订单信息的函数 */
  get_order() {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/express/get_express', //仅为示例，并非真实的接口地址
      data: {
        studentId: wx.getStorageSync('studentId'),
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
          if (element.fields.order_stadus == 1) {
            element.fields.order_stadus = '待接单'
            element.fields.order_stadus_color = 'red'
          } else if (element.fields.order_stadus == 2) {
            element.fields.order_stadus = '代取中'
            element.fields.order_stadus_color = 'rgb(230, 147, 39)'

          } else if (element.fields.order_stadus == 3) {
            element.fields.order_stadus = '待确认'
            element.fields.order_stadus_color = 'rgb(69, 183, 228)'

          }

        }
        that.setData({
          orderList: res.data
        })


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