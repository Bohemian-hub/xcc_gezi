/*
 * @Author: your name
 * @Date: 2020-12-05 23:36:24
 * @LastEditTime: 2021-01-06 18:41:57
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
    orderList: [],
    nothing: 0,
    catcher_infor: [],
    catcher_show: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.get_order()
  },
  /* 做一个页面加载获取订单信息的函数 */

  receive_express(e) {
    /* 这里是用户确认收件，在代取员将状态从接单2变成3时，我这里就提示带我确认了 */
    /* 来一个事件将订单状态 改成4，就是已经完结 */
    wx.request({
      url: 'https://www.xiyuangezi.cn/express/receive_express', //仅为示例，并非真实的接口地址
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
        if (res.data.loginnum == 200) {
          wx.redirectTo({
            url: '../express_order/express_order',
          })
        }
      }
    })
  },
  /* 删除已经完成的订单 */
  delete_already_order(e) {
    wx.showModal({
      title: '',
      content: '删除订单后可以在设置中查看历史订单！',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          /* 点了确认，发送请求更改数据库的数据为3 */
          wx.request({
            url: 'https://www.xiyuangezi.cn/express/delete_order_user', //仅为示例，并非真实的接口地址
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
              if (res.data.loginnum == 200) {
                wx.redirectTo({
                  url: '../express_order/express_order',
                })
              }
            }
          })

        }
      },
    });

  },
  cancel_order(e) {
    /* 用户取消还没有人取的订单 */
    var that = this
    wx.showModal({
      title: '',
      content: '确定取消此订单？（退款将收取5%手续费）',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          /* 点了确认，发送请求更改数据库的数据为3 */
          wx.request({
            url: 'https://www.xiyuangezi.cn/express/cancel_order', //仅为示例，并非真实的接口地址
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
              if (res.data.loginnum == 200) {
                wx.redirectTo({
                  url: '../express_order/express_order',
                })
              }
              else if (res.data.loginnum == 100) {
                wx.showModal({
                  title: '',
                  content: '此订单已经被接单，如需退单请联系您的代取员！',
                  showCancel: false,
                  confirmText: '确定',
                  confirmColor: '#3CC51F',
                  success: (result) => {
                    if (result.confirm) {
                      wx.redirectTo({
                        url: '../express_order/express_order',
                      })
                    }
                  },
                });
              }
            }
          })

        }
      },
    });


  },
  catcher_infomation(e) {
    var that = this
    /* 展示代取员的信息 */
    wx.showLoading({
      title: '正在获取',
    })
    wx.request({
      url: 'https://www.xiyuangezi.cn/express/catcher_infomation', //仅为示例，并非真实的接口地址
      data: {
        name: e.currentTarget.dataset.id
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.length == 1) {
          that.setData({
            catcher_infor: res.data[0].fields,
            catcher_show: 1
          })
        }
        else {

        }
        console.log(that.data.catcher_infor);
      }
    })


  },
  close_infor() {

    this.setData({
      catcher_show: 0
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