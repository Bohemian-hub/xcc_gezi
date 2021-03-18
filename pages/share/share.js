// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pswd = ''
    console.log(options.xh);
    console.log(options.pswd);
    pswd = options.pswd;
    pswd = decodeURIComponent(pswd)
    /* 做一个数据库查询，查询是否有这个用户 */
    if(wx.getStorageSync('username') == options.xh){
      wx.switchTab({
        url: '../index/index',
      })
    }else{
      /* this.searchuser(options.xh,pswd) */
      wx.navigateTo({
        url: '../login/login',
      })
    }

  },
/* 查询是否有这个用户 */
  searchuser(xh,pswd){
    var that = this
    wx.request({
      url: 'https://www.xiyuangezi.cn/info/pinfo',
      header: {
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      data: {      
        name: xh,  
        pwd: pswd,
      }, // 

      success: (res) => {
        if (res.statusCode == 200) {
          console.log(res.data);
          /* 下面是正常请求到服务器后的if分支，我将在后端完成对后台数据的渲染 */
          if (res.data.loginnum == 1) {
            that.setData({
              loginstatus: '1',
            })
            var sex = that.boyorgirl(res.data.ret.idNumber)
            var grade = that.sumgrade(res.data.ret.grade)
            wx.setStorageSync('username', xh)
            wx.setStorageSync('password', pswd)
            wx.setStorageSync('sex', sex)
            wx.setStorageSync('grade', grade)
            wx.setStorageSync('name', res.data.ret.name)
            wx.setStorageSync('studentId', res.data.ret.studentId)
            wx.setStorageSync('college', res.data.ret.collegeName)
            wx.setStorageSync('major', res.data.ret.majorName)


            wx.switchTab({
              url: '../index/index',
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 1500)
          } else if (res.data.loginnum == 2) {
            /* 这他娘的是个新用户 */
            that.setData({
              loginstatus: '1',
            })
            var sex = that.boyorgirl(res.data.ret.idNumber)
            var grade = that.sumgrade(res.data.ret.grade)
            wx.setStorageSync('username', username)
            wx.setStorageSync('password', password)
            wx.setStorageSync('sex', sex)
            wx.setStorageSync('grade', grade)
            wx.setStorageSync('name', res.data.ret.name)
            wx.setStorageSync('studentId', res.data.ret.studentId)
            wx.setStorageSync('college', res.data.ret.collegeName)
            wx.setStorageSync('major', res.data.ret.majorName)


            wx.redirectTo({
              url: '../welcome/welcome?usercount=' + res.data.usercount,
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 1500)

          } else if (res.data.loginnum == 400) {
            that.setData({
              loginstatus: '400',
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 500)
          } else if (res.data.loginnum == 500) {
            that.setData({
              loginstatus: '500',
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 500)
          }
        } else {
          console.log('服务器请求异常' + res.data.loginnum);
          that.setData({
            loginstatus: '900',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 500)
        }
        setTimeout(function () {
          that.setData({
            loginstatus: 'ok',
          })
        }, 2500)
      }
    })
  },
  boyorgirl(a) {
    var sexAndAge = {};
    var userCard = a;
    //如果身份证号码为undefind则返回空
    console.log(userCard);
    //获取性别
    if (parseInt(userCard.substr(16, 1)) % 2 == 1) {
      sexAndAge.sex = '男'
    } else {
      sexAndAge.sex = '女'
    }

    return sexAndAge.sex;
  },
  sumgrade(e) {
    var grade = e;
    var hangrade = '';
    if (grade == 20) {
      hangrade = "大一"
    } else if (grade == 19) {
      hangrade = "大二"

    } else if (grade == 18) {
      hangrade = "大三"
    } else if (grade == 17) {
      hangrade = "大四"
    }
    return hangrade;
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