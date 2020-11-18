/*
 * @Author: your name
 * @Date: 2020-11-13 23:35:52
 * @LastEditTime: 2020-11-18 15:08:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/ConfessionWall/ConfessionWall.js
 */
// pages/ConfessionWall/ConfessionWall.js

//声明工具类对象
var love_onclick_status = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    onclick_love_id: [],
    animationData: {},
    showModalStatus: false,
    comment_onclick_count: '',

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

  makelove(e) {
    var that = this;
    if (love_onclick_status[e.currentTarget.dataset.id] == 1) {
      that.setData({
        ['onclick_love_id[' + e.currentTarget.dataset.id + ']']: -1,
      })
      love_onclick_status[e.currentTarget.dataset.id] = 0;
      console.log(this.data.onclick_love_id);

    } else {
      console.log(e.currentTarget.dataset.id);
      that.setData({
        ['onclick_love_id[' + e.currentTarget.dataset.id + ']']: e.currentTarget.dataset.id,
        /*         ['swiperList[' + e.currentTarget.dataset.id + '].love_numbers']: swiperList[e.currentTarget.dataset.id].love_numbers + 1 */
      })
      love_onclick_status[e.currentTarget.dataset.id] = 1;
      console.log(this.data.onclick_love_id);
    }

  },
  makecomment(e) {
    var that = this;
    console.log(e.currentTarget.dataset.id);
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    this.animation.translateY(520).step()

    that.setData({
      animationData: animation.export(),
      showModalStatus: true,
      comment_onclick_count: this.data.swiperList[e.currentTarget.dataset.id].comment_numbers,
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 0)
  },
  close_comment() {
    var that = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    this.animation.translateY(0).step()
    that.setData({
      animationData: animation.export(),

    })
    setTimeout(function () {
      animation.translateY(520).step()
      this.setData({
        animationData: animation.export(),
      })
    }.bind(this), 0)
    setTimeout(function () {
      this.setData({
        showModalStatus: false,
      })
    }.bind(this), 300)
  },
  publish_confess() {
    wx.navigateTo({
      url: '../publish_confess/publish_confess',
    })
  }

});