/*
 * @Author: your name
 * @Date: 2021-06-04 14:57:54
 * @LastEditTime: 2021-06-10 18:54:50
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
    show_fund_info: false,
    classify: '微信',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.acquire_wallet()
  },
  acquire_wallet() {
    var that = this
    wx.request({
      url: 'https://www.xiyuangezi.cn/express/get_balance',
      data: {
        studentId: wx.getStorageSync('studentId'),
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      success: res => {
        console.log(res.data[0].fields.wallet.toFixed(2));
        let money = res.data[0].fields.wallet.toFixed(2)
        let money2 = res.data[0].fields.wallet2.toFixed(2)
        that.setData({
          wallet_nums: money,
          wallet_nums2: money2
        })
      }
    })
  },




  back() {
    wx.switchTab({
      url: '../my/my',
    })
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
  },
  get_input_name(e) {
    console.log(e.detail.value);
    this.setData({
      get_input_name: e.detail.value
    })
  },
  get_input_account(e) {
    console.log(e.detail.value);
    this.setData({
      get_input_account: e.detail.value
    })
  },
  get_input_money(e) {
    console.log(e.detail.value);
    this.setData({
      get_input_money: e.detail.value
    })
  },
  centain_withdraw() {
    var that = this
    console.log(this.data.get_input_name);
    console.log(this.data.get_input_account);
    console.log(this.data.get_input_money);
    /*     wx.showLoading({
          title: '申请中...',
          mask: true,
        }); */
    /* 现在发送一个后端请求！！！ */
    wx.request({
      url: 'https://www.xiyuangezi.cn/express/withdraw',
      data: {
        get_input_name: that.data.get_input_name,
        get_input_account: that.data.get_input_account,
        get_input_money: that.data.get_input_money,
        deposit_way: that.data.classify,
        studentId: wx.getStorageSync('studentId'),
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      success: res => {
        console.log(res);
      }
    })

  },
  all_withdraw() {
    console.log("allllll");
    this.setData({
      get_input_money: this.data.wallet_nums
    })
  },
  get_fund_info() {
    var that = this
    this.setData({
      show_fund_info: !this.data.show_fund_info
    })
    wx.request({
      url: 'https://www.xiyuangezi.cn/express/get_fund_info',
      data: {
        studentId: wx.getStorageSync('studentId'),
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      success: res => {
        console.log(res.data);
        that.setData({
          info_list: res.data
        })
      }
    })
  }
})