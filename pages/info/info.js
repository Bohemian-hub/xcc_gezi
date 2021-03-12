/*
 * @Author: your name
 * @Date: 2021-03-12 10:06:04
 * @LastEditTime: 2021-03-12 12:30:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edi
 * @FilePath: /miniprogram-5/pages/info/info.js
 */
// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*     cardCur: 0, */

    product_infor_express: {
      price: '1.88-5.88',
      send_fee: '0',
      switch_brought: 0,
      swiperList: [{
        id: 0,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      }, {
        id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      }, {
        id: 2,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
      }, {
        id: 3,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
      }, {
        id: 4,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
      }],
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  switch_brought() {
    var that = this
    that.setData({
      switch_brought: !that.data.switch_brought
    })
  }
})