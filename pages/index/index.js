/*
 * @Author: your name
 * @Date: 2020-11-08 23:29:46
 * @LastEditTime: 2021-02-01 19:02:53
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
    passagearr: [],
    count_text: '2021新年'
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
    wx.redirectTo({
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

    if (event.currentTarget.dataset.id == '教务') {
      console.log(1);
      this.setData({
        showwhat: 'jiaowu',
      })
    } else if (event.currentTarget.dataset.id == '生活') {
      console.log(2);

      this.setData({
        showwhat: 'server',
      })
    } else if (event.currentTarget.dataset.id == '好物') {
      console.log(3);

      this.setData({
        showwhat: 'goods',
      })
    } else if (event.currentTarget.dataset.id == '工具') {
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
  grade() {
    wx.navigateTo({
      url: '../grade/grade',
    })
  },
  express() {
    wx.navigateTo({
      url: '../express/express',
    })
  },
  makemoney() {
    wx.redirectTo({
      url: '../express_catch/express_catch',
    })
  },
  coursetable() {
    wx.navigateTo({
      url: '../schedule/schedule',
    })
  },
  new_confesswall: function () {
    wx.navigateTo({
      url: '../new_confesswall/new_confesswall',
    })
  },
  single() {
    wx.navigateTo({
      url: '../ConfessionWall/ConfessionWall',
    })
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

    var value = wx.getStorageSync('name')
    // if是说明如果没有本地信息,需要客户进行第一次认证,反之则不需要认证
    if (!value) {
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      this.setData({
        student_name: wx.getStorageSync('name'),
      })
    }

    /* 这里调用函数来请求新闻 */

    this.get_passage()


    /* 加载one一个接口获取数据 */
    const that = this;
    const index = 0;
    that.Get_time();  //页面加载的时候获取一次时间，后面就每60秒在调用一次时间获取时间了
    /*     that.jiaowu(); */
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
        if (!res.data.content) {
          that.setData({
            sentence: "这个年龄段你睡得着觉？"
          })
        } else {
          if (res.data.content.length < 50) {
            that.setData({
              sentence_size: '22rpx',
            })
          }
        }

      }
    })

    var ref = "";
    ref = setInterval(function () {
      that.Get_time();

    }, 300000);

    /* 请求倒计时相关，默认请求新年倒计时 */
    that.get_count_time()

  },
  get_count_time() {
    var that = this
    var count_what = wx.getStorageSync("count")
    if (!count_what) {
      console.log("没有设置count");
      count_what = 'newyear'
      that.setData({
        count_what: "2021新年"
      })
    } else if (count_what == 'newyear') {
      that.setData({
        count_text: '2021年新年'
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
    }
    wx.request({
      url: 'http://127.0.0.1:8000/info/count_time', //仅为示例，并非真实的接口地址
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
  get_passage() {
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
  },
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

  jump: function () {
    wx.navigateTo({
      url: '../setting/setting',
    })
  },
  turn_news(e) {
    console.log(e.currentTarget.dataset.src);
    var src = e.currentTarget.dataset.src
    wx.navigateTo({
      url: '../index_passage/index_passage?src=' + src,
    })
  },


})
