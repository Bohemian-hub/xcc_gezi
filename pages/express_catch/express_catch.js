/*
 * @Author: your name
 * @Date: 2020-12-06 15:05:19
 * @LastEditTime: 2020-12-07 14:07:03
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
    orderwaitList: [],
    showtable: 0,
    applyname: '',
    applyqq: '',
    applytel: '',
    applyemail: '',
    applywechat: '',
    showcheck: 0,
    nothing: 0

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
    wx.showLoading({
      title: '正在加载',
    })
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
        if (res.data.length == 0) {
          console.log("我还没有注册成为代取员");
          /* 下面是申请板块展示 */
          that.setData({
            /* 展示申请表 */
            showtable: 1
          })
        } else if (res.data[0].fields.check_num == 0) {
          /* 正在审核中 */
          that.setData({
            showcheck: 1
          })

        } else if (res.data[0].fields.check_num == 1) {
          /* 审核通过 */
          that.get_order()

        }
      }
    })
    wx.hideLoading();

  },

  /* 先做一个申请表提交 */
  getInputname(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      applyname: e.detail
    })
  },
  getInputqq(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      applyqq: e.detail
    })
  },
  getInputtel(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      applytel: e.detail
    })
  },
  getInputemail(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      applyemail: e.detail
    })
  },
  getInputwechat(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      applywechat: e.detail
    })
  },
  applysubmit() {
    wx.showLoading({
      title: '正在加载',
    })
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/express/applysubmit', //仅为示例，并非真实的接口地址
      data: {
        name: wx.getStorageSync('name'),
        writename: that.data.applyname.value,
        studentId: wx.getStorageSync('studentId'),
        applyqq: that.data.applyqq.value,
        applytel: that.data.applytel.value,
        applyemail: that.data.applyemail.value,
        applywechat: that.data.applywechat.value,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.loginnum);
        if (res.data.loginnum == 200) {
          /* 重新加载页面 */
          wx.redirectTo({
            url: '../express_catch/express_catch',
          })
        }
      }
    })
    wx.hideLoading();

  },
  get_order() {
    wx.showLoading({
      title: '正在加载',
    })
    var that = this
    /* 获取所有待接订单 */
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
        console.log(that.data.orderwaitList.length);
        if (that.data.orderwaitList.length == 0) {
          that.setData({
            nothing: 1
          })
        }


      }
    })
    wx.hideLoading();

  },
  /* 抢单 */
  scratch(e) {
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: 'http://127.0.0.1:8000/express/scratch', //仅为示例，并非真实的接口地址
      data: {
        name: wx.getStorageSync('name'),
        order_id: e.currentTarget.dataset.id
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.loginnum);
        wx.hideLoading();
        if (res.data.loginnum == 100) {
          /* 已经被抢了 */
          wx.showModal({
            title: '提示',
            content: '该订单已经被抢了！',
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if (result.confirm) {

              }
            },
          });

        } else if (res.data.loginnum == 200) {
          /* 抢单成功 */
          /* 设置一个提示吧！ */
          wx.showModal({
            title: '提示',
            content: '恭喜你，抢到此订单！',
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if (result.confirm) {
                wx.redirectTo({
                  url: '../express_task/express_task',
                })
              }
            },
          });
        }
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