/*
 * @Author: your name
 * @Date: 2020-12-08 13:17:20
 * @LastEditTime: 2021-01-31 18:42:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/setting_order/setting_order.js
 */
// pages/setting_order/setting_order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    my_express_data: [],
    get_task_orde: [],
    back_choosse: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_my_express_order()
  },



  back() {
    wx.navigateBack({
      delta: 1
    });

  },
  get_my_express_order() {
    wx.showLoading({
      title: '正在加载',
    })
    var that = this
    wx.request({
      url: 'https://www.xiyuangezi.cn/express/get_my_express_order', //仅为示例，并非真实的接口地址
      data: {
        studentId: wx.getStorageSync('studentId'),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.loginnum);
        console.log(res.data);
        that.setData({
          nothmy_express_dataing: res.data,
          get_task_orde: [],
          back_choosse: 1
        })
        console.log(that.data.nothmy_express_dataing);

      }
    })
    wx.hideLoading();

  },
  get_task_order() {
    wx.showLoading({
      title: '正在加载',
    })
    var that = this
    wx.request({
      url: 'https://www.xiyuangezi.cn/express/get_task_order', //仅为示例，并非真实的接口地址
      data: {
        name: wx.getStorageSync('name'),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.loginnum);
        console.log(res.data);
        that.setData({
          get_task_orde: res.data,
          nothmy_express_dataing: [],
          back_choosse: 2
        })
        console.log(that.data.get_task_orde);

      }
    })
    wx.hideLoading();
  }

})