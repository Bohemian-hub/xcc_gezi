/*
 * @Author: your name
 * @Date: 2020-11-08 23:33:47
 * @LastEditTime: 2021-01-27 10:48:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/login/login.js
 */
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginstatus: '',
  },
  loginForm: function (data) {
    var that = this;
    console.log(data.detail.value)//  {username: "hgj", password: "fsdfsd"}
    var username = data.detail.value.username;
    var password = data.detail.value.password;
    wx.showLoading({
      title: '登录中',
    })
    wx.request({
      url: 'https://www.xiyuangezi.cn/info/pinfo',
      header: {
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      data: {
        name: username,
        pwd: password,
      }, // 向后端发送的数据，后端通过request.data拿到该数据
      success: res => {
        if (res.statusCode == 200) {
          console.log(res.data.ret);
          /* 下面是正常请求到服务器后的if分支，我将在后端完成对后台数据的渲染 */
          if (res.data.loginnum == 1) {
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
              url: '../index/index',
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
      },
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
  }

})