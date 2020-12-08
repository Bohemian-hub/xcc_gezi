/*
 * @Author: your name
 * @Date: 2020-12-08 13:16:59
 * @LastEditTime: 2020-12-08 21:26:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editget
 * @FilePath: /miniprogram-5/pages/setting_infor/setting_infor.js
 */
// pages/setting_infor/setting_infor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infor_data: [],
    studentId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getinfor()
  },

  getinfor() {
    wx.showLoading({
      title: '正在加载',
    })
    var that = this
    wx.request({
      url: 'http://39.100.67.217:8001/info/pinfo2',
      header: {
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      data: {
        studentId: wx.getStorageSync('studentId'),
      }, // 向后端发送的数据，后端通过request.data拿到该数据
      success: res => {
        if (res.statusCode == 200) {
          console.log(res.data);
          that.setData({
            infor_data: res.data[0].fields,
            studentId: res.data[0].pk
          })
          console.log(that.data.infor_data);
        }
      },
    })
    wx.hideLoading();

  },
  backttosetting() {
    wx.redirectTo({
      url: '../setting/setting',
    })

  }
})