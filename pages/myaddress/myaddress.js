/*
 * @Author: your name
 * @Date: 2021-03-16 11:26:22
 * @LastEditTime: 2021-03-16 13:59:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/myaddress/myaddress.js
 */
// pages/myaddress/myaddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    input_name: wx.getStorageSync('input_name'),
    input_tel: wx.getStorageSync('input_tel'),
    input_school: '西昌学院',
    input_place: '北校区',
    input_apartment: '',
    input_room: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  input_name(e) {
    console.log(e.detail.value);
    this.setData({
      input_name: e.detail.value
    })
  },
  input_tel(e) {
    console.log(e.detail.value);
    this.setData({
      input_tel: e.detail.value
    })
  },
  input_school(e) {
    console.log(e.detail.value);
    this.setData({
      input_school: e.detail.value
    })
  },
  input_place(e) {
    console.log(e.detail.value);
    this.setData({
      input_place: e.detail.value
    })
  },
  input_apartment(e) {
    console.log(e.detail.value);
    this.setData({
      input_apartment: e.detail.value
    })
  },
  input_room(e) {
    console.log(e.detail.value);
    this.setData({
      input_room: e.detail.value
    })
  },
  save_use() {
    console.log(this.data);
    wx.setStorageSync('input_name', this.data.input_name);
    wx.setStorageSync('input_tel', this.data.input_tel);
    wx.setStorageSync('input_place', this.data.input_school + '' + this.data.input_place + '' + this.data.input_apartment + '-' + this.data.input_room);
    this.return_address()
  },
  backtoindex() {
    wx.navigateBack({
      delta: 1
    });

  },
  return_address() {
    wx.navigateBack({
      delta: 1
    });
  },

})