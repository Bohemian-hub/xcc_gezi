/*
 * @Author: your name
 * @Date: 2021-03-15 09:56:56
 * @LastEditTime: 2021-03-16 13:47:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/replenish/replenish.js
 */
// pages/replenish/replenish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_name: '',
    product_size: '',
    nums: '',
    product_price: '',
    all_price: '',
    send_fee: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.product_name);
    console.log(options.product_size);
    console.log(options.product_nums);
    console.log(options.product_price);
    console.log(options.send_fee);
    this.setData({
      product_name: options.product_name,
      product_size: options.product_size,
      nums: Number(options.product_nums),
      product_price: options.product_price,
      all_price: (options.product_nums * options.product_price).toFixed(2),
      send_fee: Number(options.send_fee).toFixed(2),
      total_fee: (Number(options.send_fee) + options.product_nums * options.product_price).toFixed(2)
    })
    /* 页面加载的时候，我要读取本地是否保存了地址信息  */
    this.setData({
      send_name: wx.getStorageSync('input_name'),
      send_tel: wx.getStorageSync('input_tel'),
      send_place: wx.getStorageSync('input_place'),
    })
  },
  onShow() {
    this.setData({
      send_name: wx.getStorageSync('input_name'),
      send_tel: wx.getStorageSync('input_tel'),
      send_place: wx.getStorageSync('input_place'),
    })
  },
  de_nums() {
    if (this.data.nums == 1) {

    } else {
      this.setData({
        nums: this.data.nums -= 1,
        all_price: (this.data.nums * this.data.product_price).toFixed(2),
        total_fee: (Number(this.data.send_fee) + this.data.nums * this.data.product_price).toFixed(2)
      })
    }

  },
  backtoindex() {
    wx.redirectTo({
      url: '../info/info',
    })

  },
  change_address() {
    wx.navigateTo({
      url: '../myaddress/myaddress',
    })
  },
  add_nums() {
    console.log(this.data.product_name);
    console.log(this.data.nums);
    if (this.data.product_name == '快递代取') {
      wx.showModal({
        title: '提示',
        content: '代取快递请单件一一下单！',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#3CC51F',
      });

    } else if (this.data.product_name == '专业带饭') {
      if (this.data.nums == 4) {
        wx.showModal({
          title: '提示',
          content: '暂时支持最多四份',
          showCancel: false,
          confirmText: '确定',
          confirmColor: '#3CC51F',
        });
      } else {
        this.setData({
          nums: this.data.nums += 1,
          all_price: (this.data.nums * this.data.product_price).toFixed(2),
          total_fee: (Number(this.data.send_fee) + this.data.nums * this.data.product_price).toFixed(2)
        })
      }
    } else if (this.data.product_name == '快速打印') {
      this.setData({
        nums: this.data.nums += 1,
        all_price: (this.data.nums * this.data.product_price).toFixed(2),
        total_fee: (Number(this.data.send_fee) + this.data.nums * this.data.product_price).toFixed(2)

      })
    }

  },
})