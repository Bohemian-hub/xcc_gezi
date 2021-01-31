/*
 * @Author: your name
 * @Date: 2021-01-29 19:02:02
 * @LastEditTime: 2021-01-29 22:12:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/address/address.js
 */
// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    turn_offer: false,
    input_name: '',
    input_desc: '',
    input_tel: '',
    input_qq: '',
    input_weixin: '',
    keyword: '',
    Address_arr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  turn_offer() {
    this.setData({
      turn_offer: true
    })
  },
  close_offer() {
    this.setData({
      turn_offer: false
    })
  },
  input_name(e) {
    console.log(e.detail.value);
    this.setData({
      input_name: e.detail.value
    })
  },
  input_desc(e) {
    console.log(e.detail.value);
    this.setData({
      input_desc: e.detail.value
    })
  },
  input_tel(e) {
    console.log(e.detail.value);
    this.setData({
      input_tel: e.detail.value
    })
  },
  input_qq(e) {
    console.log(e.detail.value);
    this.setData({
      input_qq: e.detail.value
    })
  },
  input_weixin(e) {
    console.log(e.detail.value);
    this.setData({
      input_weixin: e.detail.value
    })
  },
  keyword(e) {
    console.log(e.detail.value);
    this.setData({
      keyword: e.detail.value
    })
  },
  keyword_search() {
    var that = this
    if (that.data.keyword != '') {
      wx.request({
        url: 'https://www.xiyuangezi.cn/one/get_address', //仅为示例，并非真实的接口地址
        data: {
          keyword: that.data.keyword,
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          console.log(res.data);
          that.setData({
            Address_arr: res.data
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入关键词',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#3CC51F',
      });
    }
  },
  publish() {
    var that = this
    if (that.data.input_name != '' && that.data.input_desc != '') {
      console.log("至少填写一种联系方式");
      if (that.data.input_qq != '' || that.data.input_tel != '' || that.data.input_weixin != '') {
        wx.request({
          url: 'https://www.xiyuangezi.cn/one/add_address', //仅为示例，并非真实的接口地址
          data: {
            studentId: wx.getStorageSync('studentId'),
            real_name: wx.getStorageSync('name'),
            input_name: that.data.input_name,
            input_desc: that.data.input_desc,
            input_qq: that.data.input_qq,
            input_tel: that.data.input_tel,
            input_weixin: that.data.input_weixin,
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success(res) {
            console.log(res.data);
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1500,
            });
            that.close_offer()

          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '至少填写一种联系方式哦！',
          showCancel: false,
          confirmText: '确定',
          confirmColor: '#3CC51F',
        });
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '没填完叭！',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#3CC51F',
      });
    }
  },
  back_index() {
    wx.redirectTo({
      url: '../index/index',
    });
  }
})