/*
 * @Author: your name
 * @Date: 2020-11-28 10:04:46
 * @LastEditTime: 2021-05-13 21:53:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/schedule/schedule.js
 */
// pages/schedule/schedule.js
var turn_status = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courceList: [],
    array: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周', '第21周', '第22周'],
    index: 0,
    now_week: 1,
    mon_cource: [],
    tues_cource: [],
    wes_cource: [],
    thi_cource: [],
    fri_cource: [],
    sta_cource: [],
    sun_cource: [],
    color: ['#ff89c0', '#4ea8fd', '#f69b7b', '#63e453', '#ed8c8f', '#ff89c0', '#4ea8fd', '#f69b7b', '#63e453', '#ed8c8f', '#ff89c0', '#4ea8fd', '#f69b7b', '#63e453', '#ed8c8f', '#ff89c0', '#4ea8fd', '#f69b7b', '#63e453', '#ed8c8f', '#ff89c0', '#4ea8fd', '#f69b7b', '#63e453', '#ed8c8f']

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 这里先发送一个请求吧，问问后端是否保存了他的课表，在此之前我得看看课表怎么存。 */
    this.inspect_has_course()


    this.setData({
      student_name: wx.getStorageSync("name")
    })
    var grade = wx.getStorageSync('grade')
    if (grade == "大一") {       //根据年级显示当前是哪一学期。并不是很常规的方法
      this.setData({
        term: '大一下'
      })
    } else if (grade == "大二") {
      this.setData({
        term: '大二下'
      })
    } else if (grade == "大三") {
      this.setData({
        term: '大三下'
      })
    } else if (grade == "大四") {
      this.setData({
        term: '大四下'
      })
    }

    /* 前端先计算一下现在是第几周 */
    /* 我希望你给我的是第几周 */
    /* 将我们拿到的第几周放进全局变量 */
    let nowweek = this.Computation()
    console.log(nowweek);
    this.setData({
      index: nowweek - 1,
      now_week: nowweek
    })

  },
  inspect_has_course() {
    var that = this
    wx.request({
      url: 'https://www.xiyuangezi.cn/one/get_my_course',
      header: {
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      data: {
        xh: wx.getStorageSync('studentId'),  //评论者的学号
      },

      success: (ret) => {
        console.log(ret.data.length);
        if (ret.data.length == 0) {
          /* 说明并没有保存他的课程信息，我需要加载出验证码 */
          this.get_yanzhengma()   //先去拿到验证码
        } else {
          /* 有数据就整理数据 */
          var stringResult = ret.data[0].fields.includeSection.split(",").map(Number);//输出[123,456,789]
          for (let index = 0; index < ret.data.length; index++) {
            ret.data[index].fields.includeSection = ret.data[index].fields.includeSection.split(",").map(Number);//输出[123,456,789]

          }

          that.setData({
            courceList: ret.data
          })
          console.log(that.data.courceList);
          this.screen2()
          wx.hideLoading();
        }
      },
    });
  },
  yanzheng_login() {  //当验证码正确的时候去获取课表信息。
    wx.showLoading({
      title: '获取中...',
    })
    this.get_schedule()
    /* 三秒钟之后又如果还没有拿到数据那么久重新获取 */
    setTimeout(() => {
      console.log(this.data.courceList);
      if (this.data.courceList.length != 0) {
        console.log('获取到了');
      } else {
        wx.hideLoading();
        console.log('请求超时');
        wx.showModal({
          title: '提示',
          content: '请求超时，是否重新获取？',
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#3CC51F',
          success: (result) => {
            if (result.confirm) {
              wx.redirectTo({
                url: '../schedule/schedule',
              })
            } else {
              wx.switchTab({
                url: '../index/index',
              })
            }
          },
        });
      }
    }, 3000);
  },
  get_yanzhengma() {
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
  Computation() {
    var oDate1, iDays
    var day2 = new Date();
    oDate1 = new Date('2021-02-28')
    /* 这里应该是计算当前是这学期的第几周，上面的日期是开学的日期。 */
    iDays = parseInt(Math.abs(day2 - oDate1) / 1000 / 60 / 60 / 24)
    return Math.ceil(iDays / 7)
  },

  get_schedule() {
    //获取课表数据之前。应该检查本次存储是否有课表的的缓存，
    //首次进入→看缓存→if(no){提示输入验证码→请求课程数据→存入缓存}
    //               if(yes){载入缓存}
    var that = this;

    wx.request({
      url: 'https://www.xiyuangezi.cn/info/schedule',
      header: {
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      data: {
        xh: wx.getStorageSync('studentId'),  //评论者的学号
        pswd: wx.getStorageSync('password'),
        yanzheng: this.data.yanzheng, //new
        tokens: this.data.tokens,   //new
        xnm: 2020,
        xqm: 2,
      }, // 向后端发送的数据，后端通过request.data拿到该数据

      success: (ret) => {
        console.log(ret.statusCode);
        if (ret.statusCode == 500) {
          wx.hideLoading();
          wx.showModal({
            title: '',
            content: '验证码输入错误',
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if (result.confirm) {
                wx.reLaunch({
                  url: '../schedule/schedule',
                })
              }
            },
          });

        }
        that.setData({
          courceList: ret.data.normalCourse
        })
        console.log(that.data.courceList);
        this.screen()
        wx.hideLoading();
      },
    });



  },

  screen() {
    var that = this
    /* 筛选之前先把数据清空 */
    that.setData({
      mon_cource: [],
      tues_cource: [],
      wes_cource: [],
      thi_cource: [],
      fri_cource: [],
      sta_cource: [],
      sun_cource: [],
    })
    for (let index = 0; index < that.data.courceList.length; index++) {
      if (that.data.courceList[index].includeWeeks.indexOf(this.data.now_week) > -1) {
        console.log(that.data.courceList[index]);
        console.log(that.data.color[index]);
        this.setData({
          ['courceList[' + index + '].color']: this.data.color[index]
        })
        if (that.data.courceList[index].courseWeekday == 1) {
          console.log("星期一的课");
          this.setData({
            mon_cource: this.data.mon_cource.concat(that.data.courceList[index])
          })
        }
        if (that.data.courceList[index].courseWeekday == 2) {
          console.log("星期二的课");
          this.setData({
            tues_cource: this.data.tues_cource.concat(that.data.courceList[index])
          })
        }
        if (that.data.courceList[index].courseWeekday == 3) {
          console.log("星期三的课");
          this.setData({
            wes_cource: this.data.wes_cource.concat(that.data.courceList[index])
          })
        }
        if (that.data.courceList[index].courseWeekday == 4) {
          console.log("星期四的课");
          this.setData({
            thi_cource: this.data.thi_cource.concat(that.data.courceList[index])
          })
        }
        if (that.data.courceList[index].courseWeekday == 5) {
          console.log("星期五的课");
          this.setData({
            fri_cource: this.data.fri_cource.concat(that.data.courceList[index])
          })
        }
        if (that.data.courceList[index].courseWeekday == 6) {
          console.log("星期六的课");
          this.setData({
            sta_cource: this.data.sta_cource.concat(that.data.courceList[index])
          })
        }
        if (that.data.courceList[index].courseWeekday == 7) {
          console.log("星期日的课");
          this.setData({
            sun_cource: this.data.sun_cource.concat(that.data.courceList[index])
          })
        }

      }
    }
  },
  screen2() {
    var that = this
    /* 筛选之前先把数据清空 */
    that.setData({
      mon_cource: [],
      tues_cource: [],
      wes_cource: [],
      thi_cource: [],
      fri_cource: [],
      sta_cource: [],
      sun_cource: [],
    })
    for (let index = 0; index < that.data.courceList.length; index++) {
      if (that.data.courceList[index].fields.includeWeeks.indexOf(this.data.now_week) > -1) {
        this.setData({
          ['courceList[' + index + '].fields.color']: this.data.color[index]
        })
        if (that.data.courceList[index].fields.courseWeekday == 1) {
          console.log("星期一的课");
          this.setData({
            mon_cource: this.data.mon_cource.concat(that.data.courceList[index].fields)
          })
        }
        if (that.data.courceList[index].fields.courseWeekday == 2) {
          console.log("星期二的课");
          this.setData({
            tues_cource: this.data.tues_cource.concat(that.data.courceList[index].fields)
          })
        }
        if (that.data.courceList[index].fields.courseWeekday == 3) {
          console.log("星期三的课");
          this.setData({
            wes_cource: this.data.wes_cource.concat(that.data.courceList[index].fields)
          })
        }
        if (that.data.courceList[index].fields.courseWeekday == 4) {
          console.log("星期四的课");
          this.setData({
            thi_cource: this.data.thi_cource.concat(that.data.courceList[index].fields)
          })
        }
        if (that.data.courceList[index].fields.courseWeekday == 5) {
          console.log("星期五的课");
          this.setData({
            fri_cource: this.data.fri_cource.concat(that.data.courceList[index].fields)
          })
        }
        if (that.data.courceList[index].fields.courseWeekday == 6) {
          console.log("星期六的课");
          this.setData({
            sta_cource: this.data.sta_cource.concat(that.data.courceList[index].fields)
          })
        }
        if (that.data.courceList[index].fields.courseWeekday == 7) {
          console.log("星期日的课");
          this.setData({
            sun_cource: this.data.sun_cource.concat(that.data.courceList[index].fields)
          })
        }

      }
    }
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      now_week: Number(e.detail.value) + 1
    })
    this.screen()
  },
  back_index() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  input_yanzheng(e) {
    console.log(e.detail.value);
    this.setData({
      yanzheng: e.detail.value
    })
  }
})