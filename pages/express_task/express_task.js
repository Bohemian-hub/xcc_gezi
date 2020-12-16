/*
 * @Author: your name
 * @Date: 2020-12-06 21:44:10
 * @LastEditTime: 2020-12-07 23:33:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/express_task/express_task.js
 */
// pages/express_task/express_task.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    status_color: 'red',
    confim_button: 'express_arrive',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.get_my_catch_order()
  },
  /* 来一个订单的获取 */
  get_my_catch_order() {
    var that = this
    wx.request({
      url: 'https://www.hedad.cn/express/get_my_catch_order', //仅为示例，并非真实的接口地址
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
            nothing: 1
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
            url: 'https://www.hedad.cn/express/cancel_catch', //仅为示例，并非真实的接口地址
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
                wx.redirectTo({
                  url: '../express_task/express_task',
                })
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
            url: 'https://www.hedad.cn/express/express_arrive', //仅为示例，并非真实的接口地址
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
            url: 'https://www.hedad.cn/express/delete_order_catcher', //仅为示例，并非真实的接口地址
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
              wx.redirectTo({
                url: '../express_task/express_task',
              })

            }
          })
        }
      },
    });


  },

  back_index() {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  turn_page_neworder() {
    wx.redirectTo({
      url: '../express/express',
    })
  },
  turn_page_myorder() {
    wx.redirectTo({
      url: '../express_order/express_order',
    })
  },
  turn_page_catchorder() {
    wx.redirectTo({
      url: '../express_catch/express_catch',
    })
  },
  turn_page_myself() {
    wx.redirectTo({
      url: '../express_task/express_task',
    })
  },
})