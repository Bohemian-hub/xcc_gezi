/*
 * @Author: your name
 * @Date: 2020-12-08 13:17:20
 * @LastEditTime: 2021-05-02 21:33:37
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
    shangpinpic: ['https://s3.ax1x.com/2021/03/12/6N4zx1.png', 'https://z3.ax1x.com/2021/04/02/cmlGAf.jpg', 'https://s3.ax1x.com/2021/03/12/6N4vG9.jpg', 'https://z3.ax1x.com/2021/04/02/cmlgCF.jpg', 'https://z3.ax1x.com/2021/04/02/cml234.jpg'],
    catcher_show: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.transaction_id);
    this.get_this_order(options.transaction_id)
  },

  back() {
    wx.navigateBack({
      complete: (res) => { },
    })
  },
  get_this_order(transaction_id) {
    var that = this
    wx.request({
      url: 'https://www.xiyuangezi.cn/express/get_express', //仅为示例，并非真实的接口地址
      data: {
        transaction_id: transaction_id
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        const element = res.data[0]
        console.log(res);
        /* 将状态码变更为状态 */
        if (element.fields.order_stadus == 1) {
          element.fields.order_stadus = '待接单'
          element.fields.order_stadus_color = 'red'
          element.fields.order_status_warning = '请耐心等待订单被接单，你如果另有打算，也可以在未被接单前取消订单！'
        } else if (element.fields.order_stadus == 2) {
          element.fields.order_stadus = '代取中'
          element.fields.order_stadus_color = 'rgb(230, 147, 39)'
          element.fields.confim_button = ''
          element.fields.order_status_warning = '订单已经被接单，请耐心等待商品到达，有问题请联系代取同学！'


        } else if (element.fields.order_stadus == 3) {
          element.fields.order_stadus = '送达待确认'
          element.fields.order_stadus_color = 'rgb(69, 183, 228)'
          element.fields.confim_button = '确认收件'
          element.fields.order_status_warning = '订单已经送达，请及时点击收货哦！'

        } else if (element.fields.order_stadus == 4 || element.fields.order_stadus == 6) {
          element.fields.order_stadus = '已确认'
          element.fields.order_stadus_color = 'green'
          element.fields.order_status_warning = '你已完成确认，欢迎再次使用！'
        } else if (element.fields.order_stadus == 10) {
          element.fields.order_stadus = '已退款'
          element.fields.order_stadus_color = 'red'
          element.fields.order_status_warning = '你已完成退款，请耐心等待退款到账，如有问题请联系客服！'
        } else if (element.fields.order_stadus == 9) {
          element.fields.order_stadus = '退款失败'
          element.fields.order_stadus_color = 'red'
          element.fields.order_status_warning = '退款失败，可能是软件账户资金不足，请联系客服处理哦！'
        }

        /* 增加图片地址 */
        if (element.fields.express_name == '快递代取') {
          element.fields.studentId = that.data.shangpinpic[1]
        } else if (element.fields.express_name == '小跑') {
          element.fields.studentId = that.data.shangpinpic[0]
        } else if (element.fields.express_name == '专业带饭') {
          element.fields.studentId = that.data.shangpinpic[2]
        } else if (element.fields.express_name == '快速打印') {
          element.fields.studentId = that.data.shangpinpic[3]
        } else if (element.fields.express_name == '上门电脑维修') {
          element.fields.studentId = that.data.shangpinpic[4]
        }
        that.setData({
          order_info: res.data[0].fields
        })
        console.log(that.data.order_info);

      }
    })
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
  receive_express(e) {
    var that = this
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
          that.turn_page_myorder()
        }
      }
    })
  },
  cancel_order(e) {
    /* 用户取消还没有人取的订单 */
    var that = this
    var out_trade_no = e.currentTarget.dataset.id
    console.log(out_trade_no);
    wx.showModal({
      title: '',
      content: '确定取消此订单？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          /* 点了确认，发送请求更改数据库的数据为3 */
          /* 取消订单这里我就把退款同时做了，避免 多次请求 */
          wx.request({
            url: 'https://www.xiyuangezi.cn/express/cancel_order', //仅为示例，并非真实的接口地址
            data: {
              order_id: e.currentTarget.dataset.id,
              fee: e.currentTarget.dataset.fee * 100
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success(res) {
              console.log(res.data.statusnum);
              wx.hideLoading();
              if (res.data.statusnum == 200) {
                /* 这里是取消成功，下面准备调用退款函数 */
                wx.showModal({
                  title: '提示',
                  content: '取消成功，退款将在五分钟内返还至您的账户!',
                  showCancel: false,
                  confirmText: '确定',
                  confirmColor: '#3CC51F',
                  success: () => {
                    that.turn_page_myorder()
                  },
                });
              } else if (res.data.statusnum == 500) {
                wx.showModal({
                  title: '提示',
                  content: '退款异常，请联系开发者：qq:2605191106',
                  showCancel: false,
                  confirmText: '确定',
                  confirmColor: '#3CC51F',
                  success: () => {
                    that.turn_page_myorder()
                  },
                });
              }
              else if (res.data.statusnum == 100) {
                wx.showModal({
                  title: '',
                  content: '此订单已经被接单，如需退单请联系您的代取员！',
                  showCancel: false,
                  confirmText: '确定',
                  confirmColor: '#3CC51F',
                  success: () => {
                    that.turn_page_myorder()
                  },
                });
              }
            }
          })

        }
      },
    });

  },
  turn_page_myorder() {
    wx.navigateTo({
      url: '../express/express',
    })
  },


})