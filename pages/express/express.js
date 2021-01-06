/*
 * @Author: your name
 * @Date: 2020-12-01 10:00:16
 * @LastEditTime: 2021-01-06 20:07:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/express/express.js
 */
// pages/express/express.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array1: ['韵达--17栋', '中通--6栋', '申通--开水房', '圆通--菜鸟驿站', '顺丰--避风塘', '邮政--主题邮局', '学生之家', '京东'],
    array2: ['小件(1-3kg)', '中件(3-5kg)', '大件(5-10kg)', '超大件(>10kg)'],
    date: '2020-12-01',
    array4: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
    index1: 0,
    index2: 0,
    index4: 0,
    clause_switch: 0,
    express_name: '',
    express_tel: '',
    express_code: '',
    express_message: '',
    express_place: '',
    fee: '&&',
    warning: '欢迎使用',
    warn_show: 0,
    expressshowwhat: 0,
    choosemenucolor: 0,
    express_info_text_name: '',
    express_info_text_tel: '',
    express_info_text_code: '',
    /* 下面是第二个页面展示的 */
    orderList: [],
    nothing: 0,
    catcher_infor: [],
    catcher_show: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.count_fee()

  },
  back_index() {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  turn_page_neworder() {
    this.setData({
      expressshowwhat: 0,
      choosemenucolor: 0,
      express_info_text_name: '',     //清空这些地方的值
      express_info_text_tel: '',
      express_info_text_code: '',
    })

  },
  turn_page_myorder() {
    /* 让填单的view不显示，让订单的view显示 */
    this.setData({
      expressshowwhat: 1,
      choosemenucolor: 1
    })
    this.get_order()  //获取订单

  },
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
    this.count_fee()
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerChange4: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index4: e.detail.value
    })
    this.count_fee()
  },
  turn_clause() {
    var that = this
    that.setData({
      clause_switch: 1
    })
  },
  close_clause() {
    var that = this
    that.setData({
      clause_switch: 0
    })
  },
  /* 来获取我们每个输入框的值 */
  getInputValue1(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      express_name: e.detail
    })
  },
  getInputValue2(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      express_tel: e.detail
    })
  },
  getInputValue3(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      express_code: e.detail
    })
  },
  getInputValue4(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      express_message: e.detail
    })
  },
  getInputValue5(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      express_place: e.detail
    })
  },
  count_fee() {
    var that = this
    console.log(that.data.index2);
    console.log(that.data.array2[that.data.index2]);
    console.log(that.data.array4[that.data.index4]);
    if (that.data.index2 == 0) {
      that.setData({
        fee: 1 + that.data.array4[that.data.index4]
      })
    } else if (that.data.index2 == 1) {
      that.setData({
        fee: 2 + that.data.array4[that.data.index4]
      })
    } else if (that.data.index2 == 2) {
      that.setData({
        fee: 4 + that.data.array4[that.data.index4]
      })
    } else if (that.data.index2 == 3) {
      that.setData({
        fee: 5 + that.data.array4[that.data.index4]
      })
    }


  },
  get_order() {
    wx.showLoading({
      title: '正在加载',
    })
    var that = this
    wx.request({
      url: 'https://www.xiyuangezi.cn/express/get_express', //仅为示例，并非真实的接口地址
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


          }

        }
        that.setData({
          orderList: res.data
        })
        console.log(that.data.orderList.length);
        if (that.data.orderList.length == 0) {
          that.setData({
            nothing1: 1
          })
        } else {
          that.setData({
            nothing1: 0
          })
        }


      }
    })
    wx.hideLoading()
  },
  pay() {
    var that = this
    if (that.data.date == '2020-12-01') {
      console.log("请检查到校日期设置");
      that.setData({
        warning: '请检查到校日期设置',
        warn_show: 1
      })
    } else if (that.data.express_name == '' || that.data.express_tel == '' || that.data.express_code == '' || that.data.express_place == '') {
      that.setData({
        warning: '请检查信息填写是否完善',
        warn_show: 1
      })
    } else {
      that.pay_money()
    }
    setTimeout(() => {
      that.setData({
        warn_show: 0
      })
    }, 2000);
  },
  pay_money() {
    this.count_fee()
    var that = this
    console.log("wechat pay!!!")
    wx.login({
      success(res) {
        console.log(res);
        wx.request({
          url: 'https://www.xiyuangezi.cn/express/pay',
          data: {
            code: res.code,
            //fee: that.data.fee * 100 //传入到后端作为以分为单位的金额
            fee: 1 //传入到后端作为以分为单位的金额
          },
          success: (result) => {
            console.log(result);
            console.log(that.data.express_name);
            wx.request({
              url: 'https://www.xiyuangezi.cn/express/add_order', //仅为示例，并非真实的接口地址
              data: {
                name: wx.getStorageSync('name'),
                studentId: wx.getStorageSync('studentId'),
                rec_name: that.data.express_name.value,
                rec_tel: that.data.express_tel.value,
                rec_code: that.data.express_code.value,
                rec_message: that.data.express_message.value,
                express_company: that.data.array1[that.data.index1],
                express_place: that.data.express_place.value,
                express_size: that.data.array2[that.data.index2],
                express_date: that.data.date,
                express_small_fee: that.data.array4[that.data.index4],
                express_total_fee: that.data.fee,
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
                  wx.requestPayment({
                    timeStamp: result.data.timeStamp,
                    nonceStr: result.data.nonceStr,
                    package: result.data.package,
                    signType: result.data.signType,
                    paySign: result.data.paySign,
                    success: (ret) => {
                      console.log("成功！", ret);
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
                            wx.redirectTo({
                              url: '../index/index',
                            })
                          }

                        }

                      })
                    },
                  });
                }

              }
            })
            // 真正的调起微信支付接口


          }
        });
      }
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
  /* 删除已经完成的订单 */
  delete_already_order(e) {
    var that = this
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
                that.turn_page_myorder()
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
                that.turn_page_myorder()
              }
              else if (res.data.loginnum == 100) {
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




})