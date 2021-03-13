/*
 * @Author: your name
 * @Date: 2021-03-12 10:06:04
 * @LastEditTime: 2021-03-13 22:58:07
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
    switch_brought: 1,
    show_infor: {},
    choose_what: '请选择',
    product_infor_express: {
      title: '快递代取',
      price: '2.00-8.00',
      send_fee: 0,
      type_options: '大小/尺寸',
      options: [{
        name: '普通小包裹',
        price: 2.00,
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      }, {
        name: '大包裹',
        price: 4.00,
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg'
      }, {
        name: '超大件',
        price: 8.00,

        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      }],
      swiperList: [{    /*轮播图图组 */
        id: 0,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      }, {
        id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      }],
      infoList: [   /*详情图组 */
        {
          id: 0,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        }, {
          id: 1,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        }, {
          id: 2,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        }],
    },
    product_infor_rice: {
      title: '专业带饭',
      price: '8.00-14.00',
      send_fee: 2,
      type_options: '份数/菜品',
      options: [{
        name: '黄焖鸡',
        price: 14.00,
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      }, {
        name: '一荤一素',
        price: 8.00,
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg'
      }, {
        name: '两荤一素',
        price: 10.00,
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      }],
      swiperList: [{    /*轮播图图组 */
        id: 0,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      }, {
        id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      }],
      infoList: [   /*详情图组 */
        {
          id: 0,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        }, {
          id: 1,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        }, {
          id: 2,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        }],
    },
    product_infor_print: {
      title: '快速打印',
      price: '0.30-0.80',
      send_fee: 2,
      type_options: '色彩/方式',
      options: [{
        name: '黑白单面',
        price: 0.30,
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      }, {
        name: '黑色双面',
        price: 0.50,
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg'
      }, {
        name: '彩色单面',
        price: 0.50,
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      }, {
        name: '彩色双面',
        price: 0.80,
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg'
      }],
      swiperList: [{    /*轮播图图组 */
        id: 0,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      }, {
        id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      }],
      infoList: [   /*详情图组 */
        {
          id: 0,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        }, {
          id: 1,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        }, {
          id: 2,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        }],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.name);
    that.setData({
      show_infor: that.data.product_infor_express,
      choose_url: that.data.product_infor_express.options[0].url
    })
    if (options.name == 'rice') {
      console.log("带饭");
      that.setData({
        show_infor: that.data.product_infor_rice,
        choose_url: that.data.product_infor_rice.options[0].url
      })
    } else if (options.name == 'print') {
      console.log("打印");
      that.setData({
        show_infor: that.data.product_infor_print,
        choose_url: that.data.product_infor_print.options[0].url
      })
    }
  },

  switch_brought() {
    var that = this
    that.setData({
      switch_brought: !that.data.switch_brought
    })
  },
  backtoindex() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  choose_tag(e) {
    this.setData({
      choose_what: e.currentTarget.dataset.tag,
      choose_price: e.currentTarget.dataset.price,
      choose_url: e.currentTarget.dataset.url,
      total_price: e.currentTarget.dataset.price + this.data.show_infor.send_fee
    })

  }
})