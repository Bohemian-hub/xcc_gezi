/*
 * @Author: your name
 * @Date: 2021-06-19 21:34:43
 * @LastEditTime: 2021-06-19 23:59:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/ad/ad.js
 */
// pages/ad/ad.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_my_master: false,
    write_invate_code: true,
    my_master: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    /* 请求我的邀请码信息 */
    this.setData({
      studentId: wx.getStorageSync('studentId'),
    })
    /* 现在去获取我的邀请人！！！ */
    wx.request({
      url: 'https://www.xiyuangezi.cn/one/get_invate', //仅为示例，并非真实的接口地址
      data: {
        studentId: wx.getStorageSync('studentId'),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.length == 0) {
          console.log("没有");
          //我没有师傅
          //现在可以填写邀请码
          that.setData({
            show_my_master: false,//不展示我的师傅，因为没有
            write_invate_code: true   //需要填写邀请码
          })
        } else if (res.data == 999) {
          //填写有错，需要重新填写师傅   //检验邀请码填写是否正确
          wx.showModal({
            title: '提示',
            content: '邀请码填写有误，请重新填写！',
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if (result.confirm) {
                wx.navigateTo({
                  url: '../ad/ad',
                });
              }
            },
          });

        } else {
          that.setData({
            show_my_master: true,
            write_invate_code: false,
            my_master: res.data
          })
        }
      }
    })
    wx.request({
      url: 'https://www.xiyuangezi.cn/one/get_howmuch_invate', //仅为示例，并非真实的接口地址
      data: {
        studentId: wx.getStorageSync('studentId'),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.length);
        that.setData({
          howmuch_i_invate :res.data.length,
        })
      }
       
    })
    
  },
  get_studentId(e) {
    console.log(e.detail.value);
    this.setData({
      master_studentId: e.detail.value,
    })
  },

  //实现师傅和徒儿的绑定
  push_invate() {
    console.log(this.data.master_studentId);
    wx.request({
      url: 'https://www.xiyuangezi.cn/one/push_invate', //仅为示例，并非真实的接口地址
      data: {
        studentId: wx.getStorageSync('studentId'),
        master_studentId: this.data.master_studentId
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res);
        if (res.data.loginnum == 200) {
          //已经成功有了师傅
          wx.navigateTo({
            url: '../ad/ad',
          });

        }
      }
    })
  },
  back_index() {
    wx.switchTab({
      url: "../index/index",
    });
  },

})