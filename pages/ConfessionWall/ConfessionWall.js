/*
 * @Author: your name
 * @Date: 2020-11-13 23:35:52
 * @LastEditTime: 2020-11-16 23:03:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/ConfessionWall/ConfessionWall.js
 */
// pages/ConfessionWall/ConfessionWall.js

//声明工具类对象

var startX, endX;
var moveFlag = true;// 判断执行滑动事件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confess_makelove_icon: 'https://s3.ax1x.com/2020/11/15/DFhpB4.png',
    confess_makecomment_icon: '../../image_icon/comment.png',
    animation_index: '',
    array: [{
      id: '7294',
    }, {
      id: '7295',
    }, {
      id: '7296',
    }, {
      id: '7297',
    }, {
      id: '7298',
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  page_back_index: function () {
    wx.navigateTo({
      url: '../index/index',
      success: function (res) {

      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
  },
  makelove() {
    var that = this;
    that.setData({
      confess_makelove_icon: 'https://s3.ax1x.com/2020/11/15/DFhSuF.png',
    })
  },
  makecomment() {
    var that = this;
    that.setData({
      confess_makecomment_icon: '../../image_icon/comment_after.png',
    })
  },



  touchStart: function (e) {
    startX = e.touches[0].pageX; // 获取触摸时的原点
    moveFlag = true;
  },
  // 触摸移动事件
  touchMove: function (e) {
    endX = e.touches[0].pageX; // 获取触摸时的原点
    if (moveFlag) {
      if (endX - startX > 50) {
        console.log("move right");
        this.move2right(e.currentTarget.dataset.id);
        moveFlag = false;
      }
      if (startX - endX > 50) {
        console.log("move left");
        this.move2left(e.currentTarget.dataset.id);
        moveFlag = false;
      }
    }

  },
  // 触摸结束事件
  touchEnd: function (e) {
    moveFlag = true; // 回复滑动事件
  },

  move2left(animation_index) {
    console.log(animation_index);
    var animation_index = wx.createAnimation({
      duration: 100,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation_index
    this.animation.translate(-320, -1).step()
    this.setData({
      animation_index: this.animation.export(),
    })
  },
  move2right(animation_index) {
    console.log(animation_index);
    var animation_index = wx.createAnimation({
      duration: 100,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation_index
    this.animation.translate(320, -1).step()
    this.setData({
      animation_index: this.animation.export()
    })
  }

});