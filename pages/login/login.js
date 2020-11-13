// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  login() {

    wx.request({
      url: 'http://127.0.0.1:8000/info/schedule',
      header:{
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      data:{
        name: "1811030132",
        pwd:"dswl1234"
      }, // 向后端发送的数据，后端通过request.data拿到该数据
      success: res => {
        if (res.statusCode == 200) {
            console.log(res);
        }
      }
    })
  

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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