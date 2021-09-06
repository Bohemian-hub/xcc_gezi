/*
 * @Author: your name
 * @Date: 2021-06-04 14:57:54
 * @LastEditTime: 2021-06-19 20:32:12
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
    get_input_money: ''
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
        console.log(res.data);
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
    /* 判断当前是否可以提现，如果有未到账的资金，就不能提现 */
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
  yuantofen(val) {
    var s = val.split(".")
    var yuan = parseInt(s[0]) * 100;
    var fen = 0;
    if (s.length > 1) {
      let fenVal = (parseInt(s[1].substr(0, 1))) * 10;
      fen += fenVal;
      if (s[1].length > 1) {
        fen += parseInt(s[1].substr(1, 1));
      }
    }
    var fee = yuan + fen;
    return fee;
  },
  get_input_money(e) {
    console.log(e.detail.value);
    this.setData({
      get_input_money: e.detail.value
    })
  },
  centain_withdraw() {
    var that = this
    if (Number(that.data.get_input_money)<1||Number(that.data.get_input_money)>30) {
      wx.showModal({
        title: '提示',
        content: '请输入提现金额1-30元。',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {

          }
        },
      });
    }else{



    console.log("提现金额（yuan）");
    console.log((Number(that.data.get_input_money)).toFixed(2));
    console.log("提现金额（fen）");
    console.log(that.yuantofen((Number(that.data.get_input_money)).toFixed(2)));
    /*     wx.showLoading({
          title: '申请中...',
          mask: true,
        }); */
    /* 现在发送一个后端请求！！！ */
    wx.login({
      success(res) {
        wx.request({
          url: 'https://www.xiyuangezi.cn/express/withdraw',
          data: {
            code: res.code,
            get_input_money: that.yuantofen((Number(that.data.get_input_money)).toFixed(2)),
            deposit_way: that.data.classify,
            studentId: wx.getStorageSync('studentId'),
            name: wx.getStorageSync('name'),
          },
          header: {
            "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
          },
          method: "POST",
          success: res => {
            console.log(res.data.statusnum);
            if (res.data.statusnum == 200) {
              /* 第一步关闭提现窗口。 */
              that.setData({
                show_deposit: !that.data.show_deposit
              })
              /* 展示提示框 */
              wx.showModal({
                title: '提示',
                content: '提现已成功发起，预计五分钟内到账！',
                showCancel: false,
                confirmText: '确定',
                confirmColor: '#3CC51F',
                success: (result) => {
                  if (result.confirm) {
    
                  }
                },
              });
    
            }else{
              wx.showModal({
                title: '提示',
                content: '提现失败，请联系客服或稍后重试!',
                showCancel: false,
                confirmText: '确定',
                confirmColor: '#3CC51F',
                success: (result) => {
                  if (result.confirm) {
    
                  }
                },
              });
            }
          }
        })
      }
    })

  }
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
      url: 'http://127.0.0.1:8000/express/get_fund_info',
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