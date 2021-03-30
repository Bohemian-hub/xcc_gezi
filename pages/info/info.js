/*
 * @Author: your name
 * @Date: 2021-03-12 10:06:04
 * @LastEditTime: 2021-03-30 20:23:25
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
    switch_brought: 0,
    show_infor: {},
    nums: 1,
    choose_what: '请选择',
    product_one: [],
    product_infor_express: {
      title: '加载中...',
      price: '0.00-9.99',
      send_fee: 0,
      type_options: '大小/尺寸',
      options: [{
        name: '普通小包裹 2元/件',
        price: 2.00,
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      }, {
        name: '大包裹 4元/件',
        price: 4.00,
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg'
      }, {
        name: '超大件 6元/件',
        price: 6.00,

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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.name);
    /* 首先加载一个默认的视图，以避免等待数据是造成的页面不完整问题 */
    that.setData({
      product_one: that.data.product_infor_express,
      choose_url: that.data.product_infor_express.options[0].url,
      choose_price: that.data.product_infor_express.options[0].price.toFixed(2)
    })
    /* 现在发送一个请求，获取我当前的商品的信息。 */
    wx.request({
      url: 'https://www.xiyuangezi.cn/product/get_product', //仅为示例，并非真实的接口地址
      data: {
        product: options.name
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data);
        /* 拿到数据之后要对数据进行处理，将字符串格式转化成数组 */
        res.data[0].fields.options_arr = res.data[0].fields.options_arr.split(',')
        res.data[0].fields.options_image_arr = res.data[0].fields.options_image_arr.split(',')
        res.data[0].fields.options_price_arr = res.data[0].fields.options_price_arr.split(',')
        res.data[0].fields.infoList0 = res.data[0].fields.infoList.split(',')
        res.data[0].fields.swiperList0 = res.data[0].fields.swiperList.split(',')
        res.data[0].fields.options = []
        res.data[0].fields.swiperList = []
        res.data[0].fields.infoList = []
        for (let i = 0; i < res.data[0].fields.options_arr.length; i++) {
          res.data[0].fields.options[i] = {
            name: res.data[0].fields.options_arr[i],
            price: Number(res.data[0].fields.options_price_arr[i]),
            url: res.data[0].fields.options_image_arr[i]
          }
        }
        for (let i = 0; i < res.data[0].fields.swiperList0.length; i++) {
          res.data[0].fields.swiperList[i] = {
            id: i + 1,
            type: 'image',
            url: res.data[0].fields.swiperList0[i]
          }

        }
        for (let i = 0; i < res.data[0].fields.infoList0.length; i++) {
          res.data[0].fields.infoList[i] = {
            id: i + 1,
            type: 'image',
            url: res.data[0].fields.infoList0[i]
          }

        }
        that.setData({
          product_one: res.data[0].fields
        })
        console.log(that.data.product_one);
      }
    })
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
    console.log(e);
    this.setData({
      choose_what: e.currentTarget.dataset.tag,
      choose_url: e.currentTarget.dataset.url,
      choose_price: e.currentTarget.dataset.price.toFixed(2),
      now_price: e.currentTarget.dataset.price.toFixed(2)
    })

  },
  de_nums() {
    if (this.data.nums == 1) {

    } else {
      this.setData({
        nums: this.data.nums -= 1,
        total_price: this.data.now_price
      })
    }

  },
  add_nums() {
    console.log(this.data.product_one.title);
    if (this.data.product_one.title == '快递代取') {
      wx.showModal({
        title: '提示',
        content: '代取快递请单件一一下单！',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#3CC51F',
      });

    } else if (this.data.product_one.title == '专业带饭') {
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
          total_price: this.data.now_price
        })
      }
    } else if (this.data.product_one.title == '快速打印') {
      this.setData({
        nums: this.data.nums += 1,
        total_price: this.data.now_price

      })
    }

  },
  bought_centain() {
    /* 这里准备提交订单了，把订购的商品、金额发到另一个页面 */
    if (!this.data.now_price) {
      wx.showModal({
        title: '提示',
        content: '请选择规格/款式',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#3CC51F',
      });

    } else {
      /* 信息填写完整可以继续 */
      console.log(this.data.product_one.title);
      console.log(this.data.product_one.code);
      console.log(this.data.choose_url);
      console.log(this.data.choose_what);
      console.log(this.data.nums);
      console.log(this.data.choose_price);
      console.log(this.data.product_one.send_fee);

      /* 跳转确认支付页面 */
      wx.navigateTo({
        url: '../replenish/replenish?product_name=' + this.data.product_one.title + '&choose_url=' + this.data.choose_url + '&product_code=' + this.data.product_one.code + '&product_size=' + this.data.choose_what + '&product_nums=' + this.data.nums + '&product_price=' + this.data.choose_price + '&send_fee=' + this.data.product_one.send_fee,
      })


    }

  }
})