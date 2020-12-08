/*
 * @Author: your name
 * @Date: 2020-11-28 10:04:46
 * @LastEditTime: 2020-12-08 19:57:08
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
    change_day: 1,
    courceList: [],
    today_course: [],
    MON: '',
    TUES: '',
    WES: '',
    THUR: '',
    FRI: '',
    SAT: '',
    SUN: '',
    mon_course: [],
    tue_course: [],
    wes_course: [],
    thu_course: [],
    fri_course: [],
    sat_course: [],
    sun_course: [],
    turn_choose: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    this.get_schedule()
    this.cal_time()
    var date = new Date()
    var week = date.getDay()
    /* 获取今天星期几 */
    console.log(week); //0

    this.setData({
      change_day: week
    })
  },
  /* 做一个页面数据请求 */
  cal_time() {
    wx.showLoading({
      title: '正在加载',
    })
    var that = this
    wx.request({
      url: 'http://39.100.67.217:8001/info/cal_time',
      header: {
        'content-type': 'application/x-www-form-urlencoded'		//使用POST方法要带上这个header
      },
      method: "GET",

      success: (ret) => {
        console.log(ret.data);
        that.setData({
          now_week: ret.data.weekth
        })

        that.with_week_enter_date()
      },
    });
    wx.hideLoading();

  },
  change_week_course(e) {
    wx.showLoading({
      title: '正在加载',
    })
    var that = this
    console.log(e.currentTarget.dataset.id);
    that.setData({
      turn_choose: 0,
      now_week: e.currentTarget.dataset.id,
      today_course: []
    })
    turn_status = 0
    /* 现在我点了第十四周，那我就要为之付出代价，那就是更改数据 */
    for (let index = 0; index < that.data.courceList.normalCourse.length; index++) {
      const element = that.data.courceList.normalCourse[index];
      if (element.courseWeekday == that.data.change_day) {
        for (var j = 0; j < element.includeWeeks.length; j++) {
          if (element.includeWeeks[j] == that.data.now_week) {
            console.log(element);
            that.data.today_course.push(element)
            that.setData({
              today_course: that.data.today_course
            })

          }
        }
      }
    }
    /* 现在的这个对象就是赛选出来的今天的所有课程了 */
    console.log(that.data.today_course);
    that.with_week_enter_date()

    that.find_thisweek_howmuchcourse()

    wx.hideLoading();


  },
  turn_choose() {
    wx.showLoading({
      title: '正在加载',
    })
    if (turn_status == 0) {
      this.setData({
        turn_choose: 1
      })
      turn_status = 1
    } else {
      this.setData({
        turn_choose: 0
      })
      turn_status = 0
    }
    wx.hideLoading();

  },
  get_schedule() {
    wx.showLoading({
      title: '正在加载',
    })
    var that = this;
    wx.request({
      url: 'http://39.100.67.217:8001/info/schedule',
      header: {
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      data: {
        xh: wx.getStorageSync('studentId'),  //评论者的学号
        pswd: wx.getStorageSync('password'),
        xnm: 2020,
        xqm: 1,
      }, // 向后端发送的数据，后端通过request.data拿到该数据

      success: (ret) => {
        that.setData({
          courceList: ret.data
        })
        console.log(that.data.courceList);


        for (let index = 0; index < that.data.courceList.normalCourse.length; index++) {
          const element = that.data.courceList.normalCourse[index];
          if (element.courseWeekday == that.data.change_day) {
            for (var j = 0; j < element.includeWeeks.length; j++) {
              if (element.includeWeeks[j] == that.data.now_week) {
                console.log(element);
                that.data.today_course.push(element)
                that.setData({
                  today_course: that.data.today_course
                })

              }
            }
          }
        }
        /* 现在的这个对象就是赛选出来的今天的所有课程了 */
        console.log(that.data.today_course);

        /* 找出所有本周课程 */
        that.find_thisweek_howmuchcourse()
        console.log("星期五的课程");
        console.log(that.data.fri_course);

      },
    });
    wx.hideLoading();

  },
  find_thisweek_howmuchcourse() {
    wx.showLoading({
      title: '正在加载',
    })
    var that = this
    /* 先把本周课程清零 */
    that.setData({
      mon_course: [],
      tue_course: [],
      wes_course: [],
      thu_course: [],
      fri_course: [],
      sat_course: [],
      sun_course: [],
    })
    for (let index = 0; index < that.data.courceList.normalCourse.length; index++) {
      const element = that.data.courceList.normalCourse[index];
      for (var j = 0; j < element.includeWeeks.length; j++) {
        if (element.includeWeeks[j] == that.data.now_week) {
          /* 星期一的所有课 */
          if (element.courseWeekday == 1) {

            that.data.mon_course.push(element)
            that.setData({
              mon_course: that.data.mon_course
            })
          } else if (element.courseWeekday == 2) {

            that.data.tue_course.push(element)
            that.setData({
              tue_course: that.data.tue_course
            })
          } else if (element.courseWeekday == 3) {

            that.data.wes_course.push(element)
            that.setData({
              wes_course: that.data.wes_course
            })
          } else if (element.courseWeekday == 4) {

            that.data.thu_course.push(element)
            that.setData({
              thu_course: that.data.thu_course
            })
          } else if (element.courseWeekday == 5) {

            that.data.fri_course.push(element)
            that.setData({
              fri_course: that.data.fri_course
            })
          } else if (element.courseWeekday == 6) {

            that.data.sat_course.push(element)
            that.setData({
              sat_course: that.data.sat_course
            })
          } else if (element.courseWeekday == 0) {

            that.data.sun_course.push(element)
            that.setData({
              sun_course: that.data.sun_course
            })
          }

        }
      }
    }
    wx.hideLoading();
      
  },
  with_week_enter_date() {
    var that = this
    if (that.data.now_week == 13) {
      this.setData({
        MON: 23,
        TUES: 24,
        WES: 25,
        THUR: 26,
        FRI: 27,
        SAT: 28,
        SUN: 29
      })
    } else if (that.data.now_week == 14) {
      this.setData({
        MON: 30,
        TUES: 1,
        WES: 2,
        THUR: 3,
        FRI: 4,
        SAT: 5,
        SUN: 6
      })
    } else if (that.data.now_week == 15) {
      this.setData({
        MON: 7,
        TUES: 8,
        WES: 9,
        THUR: 10,
        FRI: 11,
        SAT: 12,
        SUN: 13
      })
    } else if (that.data.now_week == 16) {
      this.setData({
        MON: 14,
        TUES: 15,
        WES: 16,
        THUR: 17,
        FRI: 18,
        SAT: 19,
        SUN: 20
      })
    } else if (that.data.now_week == 17) {
      this.setData({
        MON: 21,
        TUES: 22,
        WES: 23,
        THUR: 24,
        FRI: 25,
        SAT: 26,
        SUN: 27
      })
    } else if (that.data.now_week == 18) {
      this.setData({
        MON: 28,
        TUES: 29,
        WES: 30,
        THUR: 31,
        FRI: 1,
        SAT: 2,
        SUN: 3
      })
    } else if (that.data.now_week == 19) {
      this.setData({
        MON: 4,
        TUES: 5,
        WES: 6,
        THUR: 7,
        FRI: 8,
        SAT: 9,
        SUN: 10
      })
    } else if (that.data.now_week == 20) {
      this.setData({
        MON: 11,
        TUES: 12,
        WES: 13,
        THUR: 14,
        FRI: 15,
        SAT: 16,
        SUN: 17
      })
    }
  },
  change_day(e) {
    var that = this
    console.log(e.currentTarget.dataset.id);

    this.setData({
      change_day: e.currentTarget.dataset.id,
      today_course: []
    })
    for (let index = 0; index < that.data.courceList.normalCourse.length; index++) {
      const element = that.data.courceList.normalCourse[index];
      if (element.courseWeekday == that.data.change_day) {
        for (var j = 0; j < element.includeWeeks.length; j++) {
          if (element.includeWeeks[j] == that.data.now_week) {
            console.log(element);
            that.data.today_course.push(element)
            that.setData({
              today_course: that.data.today_course
            })
          }
        }
      }
    }
    /* 现在的这个对象就是赛选出来的今天的所有课程了 */
    console.log(that.data.today_course);


  },
  back_index() {
    wx.redirectTo({
      url: '../index/index',
    })
  },
})