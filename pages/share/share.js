/*
 * @Author: your name
 * @Date: 2021-02-09 22:29:27
 * @LastEditTime: 2021-03-30 23:06:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/share/share.js
 */
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
    if (wx.getStorageSync('username') == options.xh) {
      wx.switchTab({
        url: '../index/index',
      })
    } else {
      /* this.searchuser(options.xh,pswd) */
      /*       wx.navigateTo({
              url: '../login/login',
            }) */
      /* 收集验证码做登录 */
      this.get_yanzhengma()
      this.setData({
        username: options.xh,
        password: options.pswd
      })
    }

  },
  get_yanzhengma() {
    this.setData({
      loginstatus: '123',
    })
    wx.request({
      url: 'https://www.xiyuangezi.cn/info/get_yanzhengma',
      header: {
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      success: res => {
        if (res.data.loginnum == 1) {
          console.log(res.data);
          this.setData({
            'tokens': res.data.tokens
          })
          //声明文件系统
          const fs = wx.getFileSystemManager();
          //随机定义路径名称
          var times = new Date().getTime();
          var codeimg = wx.env.USER_DATA_PATH + '/' + times + '.png';
          fs.writeFile({
            filePath: codeimg,
            data: res.data.base64_data,
            encoding: 'base64',
            success: (res) => {
              //写入成功了的话，新的图片路径就能用了
              console.log(res)
              console.log(codeimg)
              this.setData({
                'codeimg': codeimg,
                loginstatus: '',
              })
              console.log(this.data.tokens);
              /*               console.log(this.data.codeimg); */
            }
          });
        } else {
          console.log("加载不出来了");
          this.setData({
            loginstatus: '500',
          })
        }
      },
    });
  },
  access() {
    /* 检查不为空 */
    console.log(this.data.yanzhen);
    if (this.data.yanzhen) {
      this.loginForm()
    }
  },
  loginForm: function (data) {
    var that = this;
    console.log(data.detail.value)//  {username: "hgj", password: "fsdfsd"}
    var username = this.data.username;
    var password = this.data.password;
    var yanzheng = this.data.yanzhen;
    var tokens = this.data.tokens;
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
        yanzheng: yanzheng, //new
        tokens: tokens,   //new
      }, // 向后端发送的数据，后端通过request.data拿到该数据
      success: res => {

        if (res.statusCode == 200) {
          console.log(res.data);
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

          } else {
            that.setData({
              loginstatus: res.data.loginnum,
            })

            setTimeout(function () {
              wx.hideLoading()
              that.get_yanzhengma()
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
  inspect_yanzhengma(e) {
    console.log(e.detail.value);
    this.setData({
      yanzhen: e.detail.value
    })
  }

})