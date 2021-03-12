/*
 * @Author: your name
 * @Date: 2020-12-06 15:05:19
 * @LastEditTime: 2021-03-12 09:51:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/express_catch/express_catch.js
 */
// pages/express_catch/express_catch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderwaitList: [],
    showtable: 0,
    applyname: '',
    applyqq: '',
    applytel: '',
    applyemail: '',
    applywechat: '',
    showcheck: 0,
    earnshowwhat: 0,
    choosemenucolor: 0,
    nothing1: 0,
    nothing2: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.Iamcatcher()
  },
  /* 把本机的studentID传入，确定我有咩有提交代取员申请 */
  Iamcatcher() {
    wx.showLoading({
      title: '正在加载',
    })
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
        if (res.data.length == 0) {
          console.log("我还没有注册成为代取员");
          /* 下面是申请板块展示 */
          that.setData({
            /* 展示申请表 */
            showtable: 1
          })
        } else if (res.data[0].fields.check_num == 0) {
          /* 正在审核中 */
          that.setData({
            showcheck: 1
          })

        } else if (res.data[0].fields.check_num == 1) {
          /* 审核通过 */
          that.get_order()

        }
      }
    })
    wx.hideLoading();

  },

  /* 先做一个申请表提交 */
  getInputname(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      applyname: e.detail
    })
  },
  getInputqq(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      applyqq: e.detail
    })
  },
  getInputtel(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      applytel: e.detail
    })
  },
  getInputemail(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      applyemail: e.detail
    })
  },
  getInputwechat(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      applywechat: e.detail
    })
  },
  applysubmit() {
    wx.showLoading({
      title: '正在加载',
    })
    var that = this
    wx.request({
      url: 'https://www.xiyuangezi.cn/express/applysubmit', //仅为示例，并非真实的接口地址
      data: {
        name: wx.getStorageSync('name'),
        writename: that.data.applyname.value,
        studentId: wx.getStorageSync('studentId'),
        applyqq: that.data.applyqq.value,
        applytel: that.data.applytel.value,
        applyemail: that.data.applyemail.value,
        applywechat: that.data.applywechat.value,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.loginnum);
        if (res.data.loginnum == 200) {
          /* 重新加载页面 */
          wx.redirectTo({
            url: '../express_catch/express_catch',
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
    /* 获取所有待接订单 */
    wx.request({
      url: 'https://www.xiyuangezi.cn/express/get_all_express', //仅为示例，并非真实的接口地址
      data: {
        studentId: wx.getStorageSync('studentId'),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          orderwaitList: res.data
        })
        console.log(that.data.orderwaitList.length);
        if (that.data.orderwaitList.length == 0) {
          that.setData({
            nothing1: 1
          })
        }


      }
    })
    wx.hideLoading();

  },
  /* 抢单 */
  scratch(e) {
    var that = this
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: 'https://www.xiyuangezi.cn/express/scratch', //仅为示例，并非真实的接口地址
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
        if (res.data.loginnum == 100) {
          /* 已经被抢了 */
          wx.showModal({
            title: '提示',
            content: '该订单已经被抢了！',
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if (result.confirm) {

              }
            },
          });

        } else if (res.data.loginnum == 200) {
          /* 抢单成功 */
          /* 设置一个提示吧！ */
          wx.showModal({
            title: '提示',
            content: '恭喜你，抢到此订单！',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if (result.confirm) {
                that.turn_page_myself()
              }
            },
          });
        }
      }
    })



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
          if (element.fields.order_stadus == 2) {
            console.log(element.fields.order_stadus);
            element.fields.order_stadus = '待配送'
            element.fields.status_color = 'red'
            element.fields.confim_button = '送达'
            element.fields.confim_js = 'express_arrive'
          } else if (element.fields.order_stadus == 3) {
            console.log(element.fields.order_stadus);
            element.fields.order_stadus = '待确认'
            element.fields.status_color = 'rgb(38, 176, 255)'
            element.fields.confim_button = '已送达'
            element.fields.confim_js = 'none'
          } else if (element.fields.order_stadus == 4 || element.fields.order_stadus == 5) {
            console.log(element.fields.order_stadus);
            element.fields.order_stadus = '客户已确认收到'
            element.fields.status_color = 'rgb(33, 209, 86)'
            element.fields.confim_button = '已结单'
            element.fields.confim_js = 'none'
          }

        }
        that.setData({
          orderList: res.data
        })
        console.log(that.data.orderList);
        console.log(that.data.orderList.length);
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
  cancel_catch(e) {
    var that = this
    wx.showModal({
      title: '',
      content: '确定取消此订单？（或将面临被投诉的风险，请主动联系客户解释情况）',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          /* 点了确认，发送请求更改数据库的数据为3 */
          wx.request({
            url: 'https://www.xiyuangezi.cn/express/cancel_catch', //仅为示例，并非真实的接口地址
            data: {
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
                that.turn_page_myself()
              }
            }
          })

        }
      },
    });
  },
  express_arrive(e) {
    /* 展示一个模态框，你确定express_arrive？ */
    var that = this
    wx.showModal({
      title: '',
      content: '已将包裹送至客户手中？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          /* 点了确认，发送请求更改数据库的数据为3 */
          wx.request({
            url: 'https://www.xiyuangezi.cn/express/express_arrive', //仅为示例，并非真实的接口地址
            data: {
              name: wx.getStorageSync('name'),
              order_id: e.currentTarget.dataset.id
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success(res) {
              console.log(res.data);
              that.turn_page_myself()
            }
          })

        }
      },
    });

  },
  none() {

  },
  /* 这个是从代取员的自己主页中删除掉这个订单 */
  delete_order_catcher(e) {
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
            url: 'https://www.xiyuangezi.cn/express/delete_order_catcher', //仅为示例，并非真实的接口地址
            data: {
              name: wx.getStorageSync('name'),
              order_id: e.currentTarget.dataset.id
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success(res) {
              console.log(res.data);
              that.turn_page_myself()


            }
          })
        }
      },
    });


  },

  back_index() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  turn_page_catchorder() {
    this.setData({
      earnshowwhat: 0,
      choosemenucolor: 0
    })
    this.Iamcatcher()
  },
  turn_page_myself() {
    this.setData({
      earnshowwhat: 1,
      choosemenucolor: 1
    })
    this.get_my_catch_order()
  },
})