/*
 * @Author: your name
 * @Date: 2020-11-18 15:06:45
 * @LastEditTime: 2021-01-28 18:15:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/publish_confess/publish_confess.js
 */
// pages/publish_confess/publish_confess.js
// 引入模块 
var COS = require('../../cos-wx-sdk-v5.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    age: '',
    star: '',
    sex: '',
    sexto: '',
    college: '',
    contact: '',
    content: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  back: function () {
    wx.redirectTo({
      url: '../ConfessionWall/ConfessionWall'
    })
  },
  /* 获取各个地方的值 */
  getInputValue1(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      name: e.detail.value
    })
  },
  getInputValue2(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      age: e.detail.value
    })
  },
  getInputValue3(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      star: e.detail.value
    })
  },
  getInputValue4(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      sex: e.detail.value
    })
  },

  getInputValue5(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      sexto: e.detail.value
    })
  },

  getInputValue6(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      college: e.detail.value
    })
  },

  getInputValue7(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      contact: e.detail.value
    })
  },

  getInputValue8(e) {
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      content: e.detail.value
    })
  },


  add_confess() {
    var that = this
    if (that.data.name == '' || that.data.age == '' || that.data.star == '' || that.data.sex == '' || that.data.sexto == '' || that.data.college == '' || that.data.contact == '' || that.data.content == '') {
      console.log("空");
      wx.showModal({
        title: '提示',
        content: '你有信息没有填完哦，若你有不愿意透露的信息，请使用“*”表示',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
      });


    } else {
      /* 获取时间 */
      var myDate = new Date();
      var month = myDate.getMonth() + 1
      var daly = myDate.getDate()
      var h = myDate.getHours();       //获取当前小时数(0-23)
      var m = myDate.getMinutes();     //获取当前分钟数(0-59)
      var s = myDate.getSeconds();     //获取当前秒数(0-59)
      if (daly < 10) {
        daly = "0" + String(daly)
      }
      if (month < 10) {
        month = "0" + String(month)
      }
      if (h < 10) {
        h = "0" + String(h)
      }
      if (m < 10) {
        m = "0" + String(m)
      } if (s < 10) {
        s = "0" + String(s)
      }
      var love_time = myDate.getFullYear() + '' + month + '' + daly
      var record_time = myDate.getFullYear() + '' + month + '' + daly + '' + h + '' + m + '' + s
      wx.request({
        url: 'https://www.xiyuangezi.cn/confess/add_confess', //仅为示例，并非真实的接口地址
        data: {
          realname: wx.getStorageSync('name'),
          studentId: wx.getStorageSync('studentId'),
          name: that.data.name,
          age: that.data.age,
          star: that.data.star,
          sex: that.data.sex,
          sexto: that.data.sexto,
          college: that.data.college,
          contact: that.data.contact,
          content: that.data.content,
          time: love_time,
          month: month,
          dayly: daly,
          record_time: record_time

        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          console.log(res.data.loginnum)
          if (res.data.loginnum == 200) {
            /* 关闭等待框，弹出提示框 */
            wx.hideLoading()
            wx.showToast({
              title: '发布成功!',
              icon: 'success',
              duration: 2000,//持续的时间
              success: function () {
                console.log('haha');
                setTimeout(function () {
                  //要延时执行的代码
                  wx.redirectTo({
                    url: '../ConfessionWall/ConfessionWall'
                  })
                }, 2000) //延迟时间
              }
            })
          }
        }
      })
    }





  },


})