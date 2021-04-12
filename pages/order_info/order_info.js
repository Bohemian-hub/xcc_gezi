/*
 * @Author: your name
 * @Date: 2020-12-08 13:17:20
 * @LastEditTime: 2021-04-12 11:19:22
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
    shangpinpic: ['https://s3.ax1x.com/2021/03/12/6N4zx1.png', 'https://z3.ax1x.com/2021/04/02/cmlGAf.jpg', 'https://s3.ax1x.com/2021/03/12/6N4vG9.jpg', 'https://z3.ax1x.com/2021/04/02/cmlgCF.jpg', 'https://z3.ax1x.com/2021/04/02/cml234.jpg']

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.transaction_id);
    this.get_this_order(options.transaction_id)
  },

  back() {
    wx.redirectTo({
      url: '../express/express',
    });
  },
  get_this_order(transaction_id) {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/express/get_express', //仅为示例，并非真实的接口地址
      data: {
        transaction_id: transaction_id
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        const element = res.data[0]
        /* 将状态码变更为状态 */
        if (element.fields.order_stadus == 1) {
          element.fields.order_stadus = '待接单'
          element.fields.order_stadus_color = 'red'
        } else if (element.fields.order_stadus == 2) {
          element.fields.order_stadus = '代取中'
          element.fields.order_stadus_color = 'rgb(230, 147, 39)'
          element.fields.confim_button = ''


        } else if (element.fields.order_stadus == 3) {
          element.fields.order_stadus = '送达待确认'
          element.fields.order_stadus_color = 'rgb(69, 183, 228)'
          element.fields.confim_button = '确认收件'


        } else if (element.fields.order_stadus == 4 || element.fields.order_stadus == 6) {
          element.fields.order_stadus = '已确认'
          element.fields.order_stadus_color = 'green'
        } else if (element.fields.order_stadus == 10) {
          element.fields.order_stadus = '已退款'
          element.fields.order_stadus_color = 'red'
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
  }


})