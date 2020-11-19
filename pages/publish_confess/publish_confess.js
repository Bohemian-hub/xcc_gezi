/*
 * @Author: your name
 * @Date: 2020-11-18 15:06:45
 * @LastEditTime: 2020-11-20 00:46:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/publish_confess/publish_confess.js
 */
// pages/publish_confess/publish_confess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    choose_image_index: '',
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
  choose_image(e) {
    console.log(e.currentTarget.dataset.id);
    this.setData({
      choose_image_index: e.currentTarget.dataset.id,
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths,
            choose_image_index: 'image4',
          })
        }
      }
    });
  },
  ViewImage(e) {
    this.setData({
      choose_image_index: 'image4',
    })
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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