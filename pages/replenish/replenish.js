/*
 * @Author: your name
 * @Date: 2021-03-15 09:56:56
 * @LastEditTime: 2021-03-19 16:41:02
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
    send_fee: '',
    addition_status: '已填写',
    showbuchong: true,
    liuyan: ''
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
    if (options.product_name == '专业带饭') {
      /* 不显示补充信息  */
      this.setData({
        showbuchong: false
      })
    }
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
      get_code: wx.getStorageSync('qujianma'),
      get_weihao: wx.getStorageSync('weihao'),
      get_express: wx.getStorageSync('express'),
      get_qq: wx.getStorageSync('qq'),
    })
    if (this.data.product_name == "专业带饭") {

    } else {
      if (wx.getStorageSync('qujianma') != "" || wx.getStorageSync('qq') != "") {
        this.setData({
          addition_status: '已填写'
        })
      } else {
        this.setData({
          addition_status: '未填写'
        })
      }
    }

    /* 值传达到位之后就清空了,避免下次被传入后端 */
    setTimeout(() => {
      wx.setStorageSync('qujianma', "");
      wx.setStorageSync('weihao', "");
      wx.setStorageSync('express', "");
      wx.setStorageSync('qq', "");
    }, 1000);
    console.log(this.data);
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
  add_infor() {
    wx.navigateTo({
      url: '../order_addition/order_addition?product_name=' + this.data.product_name,
    })
  },
  input_essay(e) {
    console.log(e.detail.value);
    this.setData({
      liuyan: e.detail.value
    })
  },
  prepare_pay() {
    console.log("已经获取到的信息：");
    console.log(this.data.product_name);
    console.log(this.data.product_size);
    console.log(this.data.nums);
    console.log(this.data.send_fee);
    console.log(this.data.total_fee);
    console.log(this.data.liuyan);
    console.log(this.data.send_name);
    console.log(this.data.send_tel);
    console.log(this.data.send_place);
    console.log(this.data.get_code);
    console.log(this.data.get_weihao);
    console.log(this.data.get_express);
    console.log(this.data.get_qq);

    if (this.data.send_name == '' || this.data.send_tel == '' || this.data.send_place == '' || this.data.addition_status == "未填写") {
      /* 有任何一个数据没有填写的话那就直接信息填写不完善! */
      wx.showModal({
        title: '提示',
        content: '请检查数据填写是否完整！',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#3CC51F',
      });
    } else {
      console.log("准备向后端发送数据！");
      /*       this.pay_money() */
    }
  },
  pay_money() {
    var that = this
    console.log("大喊一声：wechat pay!!!")
    wx.login({
      success(res) {
        wx.request({
          url: 'http://127.0.0.1:8000/express/pay',
          data: {
            code: res.code,
            fee: that.data.total_fee * 100 //传入到后端作为以分为单位的金额
            //fee: 1 //传入到后端作为以分为单位的金额
          },
          success: (result) => {
            console.log(result);
            console.log(that.data.express_name);
            wx.request({
              url: 'http://127.0.0.1:8000/express/add_order', //仅为示例，并非真实的接口地址
              data: {
                connect_way: that.data.send_tel,
                studentId: wx.getStorageSync('studentId'),
                rec_name: that.data.send_name,
                rec_tail: that.data.get_weihao,
                rec_code: that.data.get_code,
                rec_qq: that.data.get_qq,
                rec_message: that.data.liuyan,
                express_company: that.data.get_express,
                express_place: that.data.send_place,
                express_name: that.data.product_name,
                express_size: that.data.product_size,
                express_nums: that.data.nums,
                express_send_fee: that.data.send_fee,
                express_total_fee: that.data.total_fee,
                nonceStr: result.data.nonceStr,
                order_stadus: 0
              },
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success(res) {
                console.log(res.data.loginnum)
                if (res.data.loginnum == 200) {
                  /*                   wx.requestPayment({
                                      timeStamp: result.data.timeStamp,
                                      nonceStr: result.data.nonceStr,
                                      package: result.data.package,
                                      signType: result.data.signType,
                                      paySign: result.data.paySign,
                                      success: (ret) => {
                                        console.log("成功！", ret);
                                        //此时可以隐藏loading
                                        wx.hideLoading()
                                        wx.showModal({
                                          title: '下单成功',
                                          content: '查看订单信息？',
                                          showCancel: true,//是否显示取消按钮
                                          cancelText: "返回",//默认是“取消”
                                          cancelColor: 'skyblue',//取消文字的颜色
                                          confirmText: "确定",//默认是“确定”
                                          confirmColor: 'skyblue',//确定文字的颜色
                                          success: function (res) {
                                            if (res.confirm) {//这里是点击了确定以后
                                              console.log('用户点击确定')
                                              that.turn_page_myorder()
                                            } else {//这里是点击了取消以后
                                              console.log('用户点击取消')
                                              wx.switchTab({
                                                url: '../index/index',
                                              })
                                            }
                  
                                          }
                  
                                        })
                                      },
                                    }); */
                }

              }
            })
            // 真正的调起微信支付接口


          }
        });
      }
    })
  },
})