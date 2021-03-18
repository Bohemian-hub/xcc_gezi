/*
 * @Author: your name
 * @Date: 2021-03-16 11:26:22
 * @LastEditTime: 2021-03-16 20:20:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/myaddress/myaddress.js
 */
// pages/myaddress/myaddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array1: ['韵达--17栋', '中通--6栋', '申通--开水房', '圆通--菜鸟驿站', '顺丰--避风塘', '邮政--主题邮局', '学生之家', '京东'],
    express_company: '韵达--17栋',
    index1: 0,
    input_code: '',
    input_tel: '',
    input_qq: ''


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.product_name);
    if (options.product_name == '快递代取') {
      this.setData({
        mode: 1
      })
    } else if (options.product_name == '快速打印') {
      this.setData({
        mode: 2
      })
    }
  },

  input_code(e) {
    console.log(e.detail.value);
    this.setData({
      input_code: e.detail.value
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
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      express_company: this.data.array1[e.detail.value]
    })
  },

  back() {
    wx.navigateBack({
      delta: 1
    });
  },
  centain() {
    if (this.data.mode == 1) {
      if (this.data.input_code == '') {
        wx.showModal({
          title: '提示',
          content: '取件码不能为空！',
          showCancel: false,
          confirmText: '确定',
          confirmColor: '#3CC51F',
        });

      } else if (this.data.input_tel == '') {
        wx.showModal({
          title: '提示',
          content: '手机尾号不能为空！',
          showCancel: false,
          confirmText: '确定',
          confirmColor: '#3CC51F',
        });
      } else {
        /* 信息完整，准备返送 */
        console.log(this.data);
        wx.setStorageSync('qujianma', this.data.input_code);
        wx.setStorageSync('weihao', this.data.input_tel);
        wx.setStorageSync('express', this.data.express_company);
        wx.navigateBack({
          delta: 1
        });
      }


    } else if (this.data.mode == 2) {
      if (this.data.input_qq == '') {
        wx.showModal({
          title: '提示',
          content: 'QQ号不能为空！',
          showCancel: false,
          confirmText: '确定',
          confirmColor: '#3CC51F',
        });
      } else {
        /* 信息完整，准备返送 */
        console.log(this.data);
        wx.setStorageSync('qq', this.data.input_qq);
        wx.navigateBack({
          delta: 1
        });

      }
    }
  }

})