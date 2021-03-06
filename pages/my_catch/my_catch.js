/*
 * @Author: your name
 * @Date: 2021-05-01 19:49:17
 * @LastEditTime: 2021-06-14 19:32:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/my_catch/my_catch.js
 */
// pages/my_catch/my_catch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],

    sending: [],
    arieved: [],
    completed: [],
    shangpinpic: [
      'https://xcc-grid-1256135907.cos.ap-nanjing.myqcloud.com/tuchuang/chanpintu/xiaopao.png',
      'https://xcc-grid-1256135907.cos.ap-nanjing.myqcloud.com/tuchuang/chanpintu/kauidi.jpeg',
      'https://xcc-grid-1256135907.cos.ap-nanjing.myqcloud.com/tuchuang/chanpintu/fan.jpeg',
      'https://xcc-grid-1256135907.cos.ap-nanjing.myqcloud.com/tuchuang/chanpintu/dayin.jpeg',
      'https://xcc-grid-1256135907.cos.ap-nanjing.myqcloud.com/tuchuang/chanpintu/xiudiannao.jpeg'
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_my_catch_order()
  },
  /* 来一个订单的获取 */
  get_my_catch_order() {
    var that = this
    wx.request({
      url: 'https://www.xiyuangezi.cn/express/get_my_catch_order', //仅为示例，并非真实的接口地址
      data: {
        name: wx.getStorageSync('name'),
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
          if (element.fields.order_stadus == 2) {
            console.log(element.fields.order_stadus);
            element.fields.order_stadus = '待配送'
            element.fields.status_color = 'red'
            element.fields.confim_button = '送达'
            element.fields.confim_js = 'express_arrive'
            that.data.sending[that.data.sending.length] = element
          } else if (element.fields.order_stadus == 3) {
            console.log(element.fields.order_stadus);
            element.fields.order_stadus = '送达'
            element.fields.status_color = 'rgb(38, 176, 255)'
            element.fields.confim_button = '已送达'
            element.fields.confim_js = 'none'
            that.data.arieved[that.data.arieved.length] = element
          } else if (element.fields.order_stadus >= 4) {
            console.log(element.fields.order_stadus);
            element.fields.order_stadus = '结单'
            element.fields.status_color = 'rgb(33, 209, 86)'
            element.fields.confim_button = '已结单'
            element.fields.confim_js = 'none'
            that.data.completed[that.data.completed.length] = element
          }

        }
        console.log(that.data.sending);
        console.log(that.data.arieved);
        console.log(that.data.completed);
        that.setData({
          orderList: that.data.sending,
          sending: that.data.sending,
          arieved: that.data.arieved,
          completed: that.data.completed,
        })
        if (that.data.orderList.length == 0) {
          that.setData({
            nothing2: 1
          })
        } else {
          that.setData({
            nothing2: 0
          })
        }


      }
    })
  },
  access_info(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../order_info/order_info?transaction_id=' + e.currentTarget.dataset.id,
    })
  },
  back_index() {
    wx.switchTab({
      url: '../my/my',
    })
  },
  choose_one(e) {
    this.setData({
      nothing1: 0
    })
    console.log(e.target.dataset.id);
    if (e.target.dataset.id == 0) {
      this.setData({
        orderList: this.data.sending
      })
    } else if (e.target.dataset.id == 1) {
      this.setData({
        orderList: this.data.arieved
      })
    } else if (e.target.dataset.id == 2) {
      this.setData({
        orderList: this.data.completed
      })
    }
    this.setData({
      choosemenucolor: e.target.dataset.id
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