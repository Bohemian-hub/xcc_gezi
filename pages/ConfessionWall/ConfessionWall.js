/*
 * @Author: your name
 * @Date: 2020-11-13 23:35:52
 * @LastEditTime: 2020-11-17 19:18:41
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
    animationDataB: [], //动画数组
    swiperList: [{
      id: 0,
      card_from: '张益达',
      card_object: '刘露漫',
      card_bg_url: '',
      card_img_url: '',
      card_content: '我爱你啊我爱你啊我爱你啊我爱你啊我爱你啊我爱你啊我爱你啊我爱你啊我爱你啊我爱你啊我爱你啊',
      love_numbers: '35',
      comment_numbers: '22',
    }, {
      id: 1,
      card_from: '陈建军',
      card_object: '刘德华',
      card_bg_url: '',
      card_img_url: '',
      card_content: '你是傻逼你是傻逼你是傻逼你是傻逼你是傻逼你是傻逼你是傻逼你是傻逼你是傻逼',
      love_numbers: '21',
      comment_numbers: '1000',
    }, {
      id: 2,
      card_from: '阿宝',
      card_object: '蔡蔡',
      card_bg_url: '',
      card_img_url: '',
      card_content: '我是你爸爸',
      love_numbers: '3',
      comment_numbers: '0',
    }, {
      id: 3,
      card_from: '阿小华',
      card_object: '英语',
      card_bg_url: '',
      card_img_url: '',
      card_content: '一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五',
      love_numbers: '10000',
      comment_numbers: '10000',
    }, {
      id: 4,
      card_from: '刘仪伟',
      card_object: '虞姬',
      card_bg_url: '',
      card_img_url: '',
      card_content: '一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五',
      love_numbers: '3',
      comment_numbers: '1',
    }],
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
    var nowIndex = e.currentTarget.dataset.index;//获取当前点击的子项index
    if (moveFlag) {
      if (endX - startX > 50) {
        console.log("move right");
        this.move2right(nowIndex);
        moveFlag = false;
      }
      if (startX - endX > 50) {
        console.log("move left");
        this.move2left(nowIndex);
        moveFlag = false;
      }
    }

  },
  // 触摸结束事件
  touchEnd: function (e) {
    moveFlag = true; // 回复滑动事件
  },

  move2left(nowIndex) {
    console.log(nowIndex);
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: "ease-in",
      delay: 0
    })
    this.animation = animation
    this.animation.translate(-120, -1).step()
    this.data.animationDataB[nowIndex] = animation.export(); //导出当前选择子项的动画队列
    this.setData({
      animationDataB: this.data.animationDataB // 修改新的动画数组
    })

  },

  move2right(nowIndex) {
    console.log(nowIndex);
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: "ease-in",
      delay: 0
    })
    this.animation = animation
    this.animation.translate(120, -1).step()
    this.data.animationDataB[nowIndex] = animation.export(); //导出当前选择子项的动画队列
    this.setData({
      animationDataB: this.data.animationDataB // 修改新的动画数组
    })

  },
});