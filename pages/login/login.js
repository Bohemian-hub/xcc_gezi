/*
 * @Author: your name
 * @Date: 2020-11-08 23:33:47
 * @LastEditTime: 2021-06-18 16:55:20
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
    turn_input_yanzhengma: 0
  },
  onLoad: function () {
    /* 这里向后端发送一个请求获取验证码！ */
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
            'codeimg': 'https://xcc-grid-1256135907.cos.ap-nanjing.myqcloud.com/tuchuang/wrong.png',
          })
        }
      },
    });
  },


  loginForm: function (data) {
    var that = this;
    console.log(data.detail.value)//  {username: "hgj", password: "fsdfsd"}
    var username = data.detail.value.username;
    var password = data.detail.value.password;
    var yanzheng = data.detail.value.yanzheng;
    var tokens = this.data.tokens;
    wx.showLoading({
      title: '登录中',
    })
    /* 先去我的数据库拿用户数据即可，若是新用户，则采用注册式登录 */
    if (this.data.turn_input_yanzhengma == 1) {
      /* 去请求教务系统获取信息 */
      var that = this
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
              var sex = that.boyorgirl(res.data.ret.idNumber)/* 根据身份证号码判断男女 */
              var grade = that.sumgrade(res.data.ret.grade)/* 将18装成大三 */
              wx.setStorageSync('username', username)
              wx.setStorageSync('password', password)
              wx.setStorageSync('sex', sex)
              wx.setStorageSync('grade', grade)
              wx.setStorageSync('name', res.data.ret.name)
              wx.setStorageSync('studentId', res.data.ret.studentId)
              wx.setStorageSync('college', res.data.ret.collegeName)
              wx.setStorageSync('major', res.data.ret.majorName)


              wx.redirectTo({
                url: '../welcome2/welcome2?usercount=' + res.data.usercount,
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
    } else {
      wx.request({
        url: 'https://www.xiyuangezi.cn/info/login',
        header: {
          "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
        },
        method: "POST",
        data: {
          username: username,
          pwd: password,
        },
        success: res => {
          console.log(res.data);
          wx.hideLoading()
          if (res.data.length == 1) {
            /* 说明是老用户了，直接整理数据为他登陆 */

            that.setData({
              loginstatus: '1',
            })
            var aaa = res.data[0].fields.className
            var ccc = aaa.match(/[0-9]+/g)
            console.log(ccc[0])     //["666","88","99"]  
            var sex = that.boyorgirl(res.data[0].fields.idNumber)
            var grade = that.sumgrade(ccc[0])
            wx.setStorageSync('username', username)
            wx.setStorageSync('password', password)
            wx.setStorageSync('sex', sex)
            wx.setStorageSync('grade', grade)
            wx.setStorageSync('name', res.data[0].fields.name)
            wx.setStorageSync('studentId', username)
            wx.setStorageSync('college', res.data[0].fields.collegeName)
            wx.setStorageSync('major', res.data[0].fields.majorName)


            wx.switchTab({
              url: '../index/index',
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 1500)


          } else {
            if (this.data.turn_input_yanzhengma == 0) {
              this.get_yanzhengma()
              that.setData({
                turn_input_yanzhengma: 1
              })
            }

          }
        }
      })
    }


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
  about() {
    wx.navigateTo({
      url: '../about/about',
    });

  },
  project_mode(e) {
    console.log(e);
    if (e.detail.value == 888888) {
      console.log("工程模式启动");
      wx.setStorageSync('name', '工程测试模式');
      wx.reLaunch({
        url: '../index/index',

      })
    }
  }
})