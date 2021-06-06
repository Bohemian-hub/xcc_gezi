/*
 * @Author: your name
 * @Date: 2021-06-04 14:57:54
 * @LastEditTime: 2021-06-06 23:06:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/wallet/wallet.js
 */
// pages/wallet/wallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_deposit: false,
    classify: '微信',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  tixian(e) {
    /* 提出提现选项；要求输入支付宝账号、 */
    console.log(e);
    if (e.target.dataset.classify == 'alipay') {
      this.setData({
        classify: '支付宝'
      })
    } else if (e.target.dataset.classify == 'wechatpay') {
      this.setData({
        classify: '微信'
      })
    }
    this.setData({
      show_deposit: !this.data.show_deposit
    })
  }
})