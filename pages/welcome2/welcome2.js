/*
 * @Author: your name
 * @Date: 2021-06-15 21:48:27
 * @LastEditTime: 2021-06-18 16:53:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/welcome2/welcome2.js
 */
// pages/welcome2/welcome2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation1: {},
    animation2: {},
    show_which_dian: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //先加载出来把两个动画执行一次
    setTimeout(function () {
      this.animation1.scale(10).step();
      this.animation2.opacity(1).scale(1.3).step();
      this.setData({  //输出动画  
        animation1: this.animation1.export(),
        animation2: this.animation2.export()

      })
    }.bind(this), 300)
    //背景三角动画要重复执行
    let next = true;
    setInterval(function () {
      if (next) {
        this.animation2.opacity(1).scale(1.3).step();
        next = !next;
      } else {
        this.animation2.opacity(0.6).scale(1).step();
        next = !next;
      }
      this.setData({  //输出动画  
        animation2: this.animation2.export()
      })
    }.bind(this), 1200)


  },

  onReady: function () {
    //page1的欢迎使用文字！
    this.animation1 = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-out',
      delay: 10,
      transformOrigin: '50% 0 0'
    })
    this.animation2 = wx.createAnimation({
      duration: 2400,
      timingFunction: 'ease-out',
      delay: 0,
      transformOrigin: '50% 0 0'
    })
    this.animation3 = wx.createAnimation({
      duration: 1200,
      timingFunction: 'ease-out',
      delay: 0,
      transformOrigin: '50% 0 0'
    })
  },
  gotoindex() {
    setInterval(function () {

      this.animation3.opacity(1).scale(100).translateY(-50).step();
      this.setData({  //输出动画  
        animation3: this.animation3.export()
      })
    }.bind(this), 0)
    this.setData({
      noword: 1,
    })
    setTimeout(() => {
      wx.switchTab({
        url: '../index/index',
      });
    }, 500);

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})