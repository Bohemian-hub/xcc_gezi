/*
 * @Author: your name
 * @Date: 2020-11-08 23:29:46
 * @LastEditTime: 2021-06-19 00:45:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/index/index.js
 */
//index.js
//获取应用实例
const app = getApp()
var hidden_turn_status = 0
Page({
  data: {

    imageone_src: '',
    sentence: '',
    one_date: '',
    one_week: '',
    sentence_size: '',
    greeting: '',
    student_name: '',
    now_time: '',
    showModalStatus: false,
    animationData: {},
    son_menu_of_title: '',
    bodylock: '',
    showwhat: '',
    username: '',
    hidden_onetext_on_onepic: 'no',
    wendu: '',
    weather_condition: '',
    weather_wendy_condition: '',
    weather_condition_src: '',
    /*     passagearr: [], */
    count_text: '2022考研',
    newnotice: false,
    importance_show: false,
    product_list: [
      {
        title: '小跑',
        code: 'run',
        run_price: '￥3.00',
        pay_number: '12854人付款',
        image: 'https://xcc-grid-1256135907.cos.ap-nanjing.myqcloud.com/info_arr/xiaopao/xiaopao.jpeg'
      }, {
        title: '快递代取',
        code: 'express',
        run_price: '￥2.00',
        pay_number: '12854人付款',
        image: 'https://xcc-grid-1256135907.cos.ap-nanjing.myqcloud.com/info_arr/daiqu/cmlGAf.jpg'
      }, {
        title: '专业代买饭',
        code: 'rice',
        run_price: '￥2.00',
        pay_number: '12854人付款',
        image: 'https://xcc-grid-1256135907.cos.ap-nanjing.myqcloud.com/info_arr/maifan/6N4vG9.jpg'
      }, {
        title: '复印打印（包邮到寝）',
        code: 'print',
        run_price: '￥0.30',
        pay_number: '12854人付款',
        image: 'https://xcc-grid-1256135907.cos.ap-nanjing.myqcloud.com/info_arr/print/cmlgCF.jpg'
      }, {
        title: '上门电脑维修',
        code: 'computer',
        run_price: '￥10',
        pay_number: '12854人付款',
        image: 'https://xcc-grid-1256135907.cos.ap-nanjing.myqcloud.com/info_arr/xiu_computer/cml234.jpg'
      }
    ],
  },


  Get_time() {
    var that = this
    /* 加载时间日期 */
    var myDate = new Date();
    var month = myDate.getMonth() + 1
    var date = month + "-" + myDate.getDate();
    var h = myDate.getHours();       //获取当前小时数(0-23)
    var m = myDate.getMinutes();     //获取当前分钟数(0-59)
    var week = '';
    if (myDate.getDay() == 1) {
      week = 'Mon.';
    } else if (myDate.getDay() == 2) {
      week = 'Tues.';
    } else if (myDate.getDay() == 3) {
      week = 'Wed.';
    } else if (myDate.getDay() == 4) {
      week = 'Thur.';
    } else if (myDate.getDay() == 5) {
      week = "Fri.";
    } else if (myDate.getDay() == 6) {
      week = 'Sat.';
    } else if (myDate.getDay() == 0) {
      week = 'Sun.';
    }
    if (h < 10) {
      h = "0" + String(h)
    }
    if (m < 10) {
      m = "0" + String(m)
    }
    const time = h + "时" + m + '分';

    var greet = '';
    if (h < 6) {
      greet = "夜深啦 快快休息！"
    } else if (h < 9) {
      greet = "早安，新的一天啦(*^▽^*)"
    } else if (h < 12) {
      greet = "上午好 加油学习"
    } else if (h < 14) {
      greet = "别太忙，休息休息(๑′ᴗ‵๑)"
    } else if (h < 17) {
      greet = "坚持就是胜利(＾－＾)V"
    } else if (h < 21) {
      greet = "饭后走走，去减肥(*╹▽╹*)"
    } else if (h < 23) {
      greet = "晚上吃东西要胖的呢"
    } else if (h = 23) {
      greet = "今天又快结束啦！"
    }
    /* 加载获取天气 */
    wx.request({

      url: 'https://www.xiyuangezi.cn/weather/', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.data)
        that.setData({
          wendu: res.data.data.wendu,
          weather_condition: res.data.data.forecast[0].type,
          weather_wendy_condition: res.data.data.forecast[0].fengxiang,
        })
        if (res.data.data.forecast[0].type == '大雨') {
          that.setData({
            weather_condition_src: '../../image_icon/weather/dayu.png'
          })
        } else if (res.data.data.forecast[0].type == '多云') {
          that.setData({
            weather_condition_src: '../../image_icon/weather/duoyun.png'
          })
        } else if (res.data.data.forecast[0].type == '雷阵雨') {
          that.setData({
            weather_condition_src: '../../image_icon/weather/leizhenyu.png'
          })
        } else if (res.data.data.forecast[0].type == '晴') {
          that.setData({
            weather_condition_src: '../../image_icon/weather/qing.png'
          })
        } else if (res.data.data.forecast[0].type == '小雨') {
          that.setData({
            weather_condition_src: '../../image_icon/weather/xiaoyu.png'
          })
        } else if (res.data.data.forecast[0].type == '阴') {
          that.setData({
            weather_condition_src: '../../image_icon/weather/yin.png'
          })
        } else if (res.data.data.forecast[0].type == '月亮') {
          that.setData({
            weather_condition_src: '../../image_icon/weather/moon.png'
          })
        } else if (res.data.data.forecast[0].type == '阵雨') {
          that.setData({
            weather_condition_src: '../../image_icon/weather/zhenyu.png'
          })
        } else if (res.data.data.forecast[0].type == '中雨') {
          that.setData({
            weather_condition_src: '../../image_icon/weather/zhongyu.png'
          })
        } else if (res.data.data.forecast[0].type == '霾') {
          that.setData({
            weather_condition_src: '../../image_icon/weather/mai.png'
          })
        }
      }
    })


    this.setData({
      one_date: date,
      one_week: week,
      greeting: greet,
      now_time: time
    })

  },
  show_choose_counttime() {
    wx.navigateTo({
      url: '../count_change/count_change',
    })
  },
  notdofunction() {
    wx.showModal({
      title: '提示',
      content: '该功能暂未开放，敬请期待',
      showCancel: false,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {

      },
    });

  },
  jiaowu(event) {
    console.log(event.currentTarget.dataset.id);
    var that = this;
    // 显示遮罩层 
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    this.animation.rotate(0).step()
    this.animation.scale(2, 2).step()

    if (event.currentTarget.dataset.id == '更多工具') {
      console.log(4);

      this.setData({
        showwhat: 'strive',
      })
    } else {
      this.setData({
        showwhat: 'else',
      })
    }
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
      bodylock: 'bodylock',
      son_menu_of_title: event.currentTarget.dataset.id
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 0)

  },
  close_jiaowu() {

    var that = this;
    // 隐藏遮罩层 
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    this.animation.rotate(0).step()
    this.animation.scale(0.4, 0.4).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,
        bodylock: '',
      })
    }.bind(this), 100)

  },
  xiyuanzhushou() {
    wx.navigateToMiniProgram({
      appId: 'wx26418d06c615ba66',
      path: '/pages/share/share?xh=' + wx.getStorageSync('username') + '&pswd=' + encodeURIComponent(wx.getStorageSync('password')),
      envVersion: 'release',// 打开正式版
    })
  },
  coursetable() {
    wx.navigateTo({
      url: '../schedule/schedule',
    })
  },
  /*   express() {
      wx.navigateTo({
        url: '../express/express',
      })
    }, */
  makemoney() {
    wx.navigateTo({
      url: '../express_catch/express_catch?state=1',
    })
  },
  /*   new_confesswall: function () {
      wx.navigateTo({
        url: '../new_confesswall/new_confesswall',
      })
    }, */
  single() {
    wx.navigateTo({
      url: '../ConfessionWall/ConfessionWall',
    })
  },
  part_job() {

  },
  forum() {
    wx.navigateTo({
      url: '../forum/forum',
    })
  },
  address() {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  onLoad: function () {
    
    var myDate = new Date();
    var month = myDate.getMonth() + 1
    var date = month + "-" + myDate.getDate();
    this.setData({
      student_name: wx.getStorageSync('name'),
    })
    // if是说明如果没有本地信息,需要客户进行第一次认证,反之则不需要认证
    if (!this.data.student_name) {
      wx.redirectTo({
        url: '../login/login',
      })
    }
    /* 加载one一个接口获取数据 */
    const that = this;
    const index = 0;
    that.get_switch()
    that.Get_time();  //页面加载的时候获取一次时间，后面就每60秒在调用一次时间获取时间了,就是获取天气其情况
    /*     that.jiaowu(); */
    if (wx.getStorageSync('imageone_src') && wx.getStorageSync('one_set_data') == date) {
      /* 有图片链接并且是今天的图片链接    ，  就不用获取新的图片 */
      that.setData({
        imageone_src: wx.getStorageSync('imageone_src'),
        sentence_size: wx.getStorageSync('sentence_size'),
        sentence: wx.getStorageSync('sentence'),
      })
      console.log("已经有one图片了");
    } else {
      that.Get_one();
    }

    that.get_notice()
    var ref = "";
    /*     ref = setInterval(function () {
          that.Get_time();
     
        }, 300000); */   //暂时取消五分钟获取一次天气，没有必要。

    /* 请求倒计时相关，默认请求新年倒计时 */
    that.get_count_time()



  },
  get_switch(){
    const that = this;
    wx.request({

      url: 'http://127.0.0.1:8000/one/get_switch', //仅为示例，并非真实的接口地址
      data: {
        what: 'express'
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data[0].fields.what);
        console.log(res.data[0].fields.transformation_nums);
        that.setData({
          express_switch:res.data[0].fields.transformation_nums
        })
      }
    })
  },
  Get_one() {
    /* 发送获取one 请求 */
    var myDate = new Date();
    var month = myDate.getMonth() + 1
    var date = month + "-" + myDate.getDate();
    var that = this
    wx.request({

      url: 'https://www.xiyuangezi.cn/one/', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          imageone_src: res.data.img_src,
          sentence: res.data.content
        })
        /* ai the same time ,I save this pic_src to storage */

        wx.setStorageSync('imageone_src', res.data.img_src);
        wx.setStorageSync('sentence', res.data.content);
        wx.setStorageSync('one_set_data', date);
        if (!res.data.content) {
          that.setData({
            sentence: "这个年龄段你睡得着觉？"
          })
          wx.setStorageSync('sentence', "这个年龄段你睡得着觉？");
        } else {
          if (res.data.content.length < 50) {
            that.setData({
              sentence_size: '22rpx',
            })
            wx.setStorageSync('sentence_size', "22rpx");
          }
        }

      }
    })
  },
  downloadImg: function () {　　　　　　　　　　　　　　　　//触发函数

    wx.downloadFile({
      url: '',　　　　　　　//需要下载的图片url
      success: function (res) {　　　　　　　　　　　　//成功后的回调函数
        wx.saveImageToPhotosAlbum({　　　　　　　　　//保存到本地
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                  }
                }
              })
            }
          }
        })
      }
    });
  },
  get_share() {
    wx.getClipboardData({
      success: function (res) {
        console.log(res.data);
        var string = res.data
        var number = Number(string.replace(/[^0-9]/ig, ''))
        console.log(number);
        if (number > 100 && number < 888) {
          if (wx.getStorageSync('copyforumid') != number) {
            /* 剪切板有东西  */
            console.log("获取到了帖子id");
            /* 马上跳转过去获取这个帖子 */

            wx.navigateTo({
              url: '../topic_one/topic_one?forum_id=' + number + '&name=分享内容',
            })
          }

        }



      }
    })
  },
  get_notice() {
    var that = this
    wx.request({
      url: 'https://www.xiyuangezi.cn/passage/notice', //仅为示例，并非真实的接口地址
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        /*take the first news to panel */
        that.setData({
          inportance_notice: res.data[0]
        })

        if (wx.getStorageSync("randomKey") != res.data[0].fields.randomKey) {
          /* has news */
          that.setData({
            newnotice: true
          })
          /* 如果首条信息是重大通知就展示重大通知页面 */
          if (res.data[0].fields.importance == 2) {
            console.log("重大消息！");
            /* 展示这条消息 */
            that.setData({
              importance_show: true,
            })
          }
        }

        that.setData({
          notice: res.data
        })
        console.log(that.data.notice);
      }
    })
  },
  know_notice() {
    var that = this
    wx.setStorageSync('randomKey', this.data.inportance_notice.fields.randomKey);
    that.setData({
      importance_show: false
    })
  },
  get_count_time() {
    var that = this
    var count_what = wx.getStorageSync("count")
    if (!count_what) {
      console.log("没有设置count");
      count_what = 'kaoyan'
      that.setData({
        count_what: "2022考研"
      })
    } else if (count_what == 'summer') {
      that.setData({
        count_text: '放暑假'
      })
    } else if (count_what == 'cet') {
      that.setData({
        count_text: '2021四六级'
      })
    } else if (count_what == 'kaoyan') {
      that.setData({
        count_text: '2022考研'
      })
    } else if (count_what == 'teacher') {
      that.setData({
        count_text: '教资'
      })
    } else if (count_what == 'computer') {
      that.setData({
        count_text: '计算机二级'
      })
    } else if (count_what == 'tem4') {
      that.setData({
        count_text: '专业英语四级'
      })
    } else if (count_what == 'tem8') {
      that.setData({
        count_text: '专业英语八级'
      })
    }
    wx.request({
      url: 'https://www.xiyuangezi.cn/info/count_time', //仅为示例，并非真实的接口地址
      data: {
        count: count_what
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          count_time: res.data
        })
      }
    })
  },
  /*   get_passage() {
      var that = this
      wx.request({
   
        url: 'https://www.xiyuangezi.cn/passage/get_passage', //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data)
          that.setData({
            passagearr: res.data
          })
          console.log(that.data.passagearr);
        }
      })
    }, */
  hidden_onetext_on_onepic() {
    if (hidden_turn_status == 0) {
      this.setData({
        hidden_onetext_on_onepic: 'yes',
      })
      hidden_turn_status = 1
    } else {
      this.setData({
        hidden_onetext_on_onepic: 'no',
      })
      hidden_turn_status = 0
    }

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /* 跳转到设置 */
  jump: function () {
    wx.navigateTo({
      url: '../setting/setting',
    })
  },
  /* 跳转到设置 */
  notice() {
    wx.navigateTo({
      url: '../notice/notice',
    })
  },
  /*   turn_news(e) {
      console.log(e.currentTarget.dataset.src);
      var src = e.currentTarget.dataset.src
      wx.redirectTo({
        url: '../index_passage/index_passage?src=' + src,
      })
    }, */
  toinfo(e) {
    console.log(e.currentTarget.dataset.name);
    wx.navigateTo({
      url: '../info/info?name=' + e.currentTarget.dataset.name,
    })
  }


})
