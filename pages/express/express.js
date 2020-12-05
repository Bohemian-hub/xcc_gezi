/*
 * @Author: your name
 * @Date: 2020-12-01 10:00:16
 * @LastEditTime: 2020-12-05 17:44:02
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
    fee: '&&',
    warning: '欢迎使用',
    warn_show: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.count_fee()

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
  pay() {
    var that = this
    if (that.data.date == '2020-12-01') {
      console.log("请检查到校日期设置");
      that.setData({
        warning: '请检查到校日期设置',
        warn_show: 1
      })
    } else if (that.data.express_name == '' || that.data.express_tel == '' || that.data.express_code == '') {
      console.log('≈');
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
          url: 'http://39.100.67.217:8001/express/pay',
          data: {
            code: res.code,
            fee: that.data.fee * 100 //传入到后端作为以分为单位的金额
          },
          success: (result) => {
            console.log(result);
            console.log(that.data.express_name);
            wx.request({
              url: 'http://127.0.0.1:8000/express/add_order', //仅为示例，并非真实的接口地址
              data: {
                name: wx.getStorageSync('name'),
                studentId: wx.getStorageSync('studentId'),
                rec_name: that.data.express_name.value,
                rec_tel: that.data.express_tel.value,
                rec_code: that.data.express_code.value,
                rec_message: that.data.express_message.value,
                express_company: that.data.array1[that.data.index1],
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



})