// pages/setting_talkback/setting_talkback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    talkback:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
 getInputValue1(e) {
  console.log(e.detail)// {value: "ff", cursor: 2}  
  this.setData({
    talkback: e.detail
  })
},
submit_talkback(){
  var that = this
  wx.request({
    url: 'https://www.xiyuangezi.cn/info/talkback', //仅为示例，并非真实的接口地址
    data: {
      name: wx.getStorageSync('name'),
      studentId: wx.getStorageSync('studentId'),
      talkback:that.data.talkback.value
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
          title: '感谢您的反馈!',
          icon: 'success',
          duration: 2000,//持续的时间
          success: function () {
            console.log('haha');
            setTimeout(function () {
              //要延时执行的代码
              wx.redirectTo({
                url: '../setting/setting'
              })
            }, 2000) //延迟时间
          }
        })
      }
    }
  })

}

})