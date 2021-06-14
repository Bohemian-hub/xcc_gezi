/*
 * @Author: your name
 * @Date: 2021-03-30 11:02:43
 * @LastEditTime: 2021-06-14 19:01:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/my/my.js
 */
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    wait_order: [],
    ing_order: [],
    already_order: [],
    complete_order: [],
    refund_order: [],
    show_order_panel: false,
    shangpinpic: ['https://s3.ax1x.com/2021/03/12/6N4zx1.png', 'https://z3.ax1x.com/2021/04/02/cmlGAf.jpg', 'https://s3.ax1x.com/2021/03/12/6N4vG9.jpg', 'https://z3.ax1x.com/2021/04/02/cmlgCF.jpg', 'https://z3.ax1x.com/2021/04/02/cml234.jpg']

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nickname: wx.getStorageSync('name'),
    })
    this.get_order()
    this.Iamcatcher()
  },
  Iamcatcher() {
    var that = this
    wx.request({
      url: 'https://www.xiyuangezi.cn/express/ifapply', //仅为示例，并非真实的接口地址
      data: {
        studentId: wx.getStorageSync('studentId'),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data[0].fields.check_num == 1) {
          that.setData({
            show_order_panel: true
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
        console.log(res);

        console.log(res.data);

        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          console.log(element.fields.order_stadus);
          /* 增加图片地址 */
          if (element.fields.express_name == '快递代取') {
            element.fields.connect_way = that.data.shangpinpic[1]
          } else if (element.fields.express_name == '小跑') {
            element.fields.connect_way = that.data.shangpinpic[0]
          } else if (element.fields.express_name == '专业带饭') {
            element.fields.connect_way = that.data.shangpinpic[2]
          } else if (element.fields.express_name == '快速打印') {
            element.fields.connect_way = that.data.shangpinpic[3]
          } else if (element.fields.express_name == '上门电脑维修') {
            element.fields.connect_way = that.data.shangpinpic[4]
          }
          /* 根据订单状态分类 */

          if (element.fields.order_stadus == 1) {
            element.fields.order_stadus = '待接单'
            element.fields.order_stadus_color = 'red'
            that.data.wait_order[that.data.wait_order.length] = element
          } else if (element.fields.order_stadus == 2) {
            element.fields.order_stadus = '代取中'
            element.fields.order_stadus_color = 'rgb(230, 147, 39)'
            element.fields.confim_button = ''
            that.data.ing_order[that.data.ing_order.length] = element
          } else if (element.fields.order_stadus == 3) {
            element.fields.order_stadus = '送达待确认'
            element.fields.order_stadus_color = 'rgb(69, 183, 228)'
            element.fields.confim_button = '确认收件'
            that.data.already_order[that.data.already_order.length] = element
          } else if (element.fields.order_stadus == 4 || element.fields.order_stadus == 6) {
            element.fields.order_stadus = '已确认'
            element.fields.order_stadus_color = 'green'
            that.data.complete_order[that.data.complete_order.length] = element
          } else if (element.fields.order_stadus == 10) {
            element.fields.order_stadus = '已退款'
            element.fields.order_stadus_color = 'red'
            that.data.refund_order[that.data.refund_order.length] = element
          } else if (element.fields.order_stadus == 9) {
            element.fields.order_stadus = '退款失败'
            element.fields.order_stadus_color = 'red'
            that.data.refund_order[that.data.refund_order.length] = element
          }
        }
        console.log(that.data.wait_order);
        console.log(that.data.ing_order);
        console.log(that.data.already_order);
        console.log(that.data.complete_order);
        console.log(that.data.refund_order);
        that.setData({
          wait_order: that.data.wait_order,
          ing_order: that.data.ing_order,
          already_order: that.data.already_order,
          complete_order: that.data.complete_order,
          refund_order: that.data.refund_order,
        })
        /* 要是待接单数组中没有数据那就把渲染数据改成正在接单的数据，或者待确认的订单。 */
        if (that.data.wait_order.length != 0) {
          that.setData({
            orderList: that.data.wait_order
          })
        } else if (that.data.ing_order.length != 0) {
          that.setData({
            orderList: that.data.ing_order
          })
        } else if (that.data.already_order.length != 0) {
          that.setData({
            orderList: that.data.already_order
          })
        } else {
          /* 说明没有合适的订单 */
          that.setData({
            orderList: []
          })
        }




      }
    })
    wx.hideLoading()
  },
  setting() {

    wx.navigateTo({
      url: '../setting/setting',
    })

  },
  apply_catch() {
    wx.navigateTo({
      url: '../express_catch/express_catch',
    })
  },
  notice() {
    wx.navigateTo({
      url: '../notice/notice',
    })
  },
  about() {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  about() {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  talkback() {
    wx.navigateTo({
      url: '../setting_talkback/setting_talkback',
    })
  },
  express_order() {
    wx.navigateTo({
      url: '../express/express',
    })
  },
  makemoney() {
    wx.navigateTo({
      url: '../express_catch/express_catch?state=2',
    })
  },
  my_catch() {
    wx.navigateTo({
      url: '../my_catch/my_catch',
    })
  },
  mt_wallet() {
    wx.navigateTo({
      url: '../wallet/wallet',
    })
  },
  myaddress() {
    wx.navigateTo({
      url: '../myaddress/myaddress',
    })
  },
  count_down() {
    wx.navigateTo({
      url: '../count_change/count_change',
    })
  },
  loginout() {
    wx.clearStorage();
    wx.reLaunch({
      url: '../login/login'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      orderList: [],
      wait_order: [],
      ing_order: [],
      already_order: [],
      complete_order: [],
      refund_order: [],
    })
    this.get_order()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})