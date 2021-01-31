/*
 * @Author: your name
 * @Date: 2020-11-28 10:04:46
 * @LastEditTime: 2021-01-31 16:12:46
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
    this.get_schedule()
    this.setData({
      student_name: wx.getStorageSync("name")
    })
    var grade = wx.getStorageSync('grade')
    if (grade == "大一") {
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
  },
  /* 做一个页面数据请求 */
  /*   cal_time() {    //获取目前是第几周这个东西，因为还没时间暂时不可用
      wx.showLoading({
        title: '正在加载',
      })
      var that = this
      wx.request({
        url: 'https://www.xiyuangezi.cn/info/cal_time',
        header: {
          'content-type': 'application/x-www-form-urlencoded'		//使用POST方法要带上这个header
        },
        method: "GET",
  
        success: (ret) => {
          console.log(ret.data);
          that.setData({
            now_week: ret.data.weekth
          })
  
        },
      });
      wx.hideLoading();
  
    }, */

  get_schedule() {
    wx.showLoading({
      title: '正在加载',
    })
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
        xnm: 2020,
        xqm: 2,
      }, // 向后端发送的数据，后端通过request.data拿到该数据

      success: (ret) => {
        that.setData({
          courceList: ret.data.normalCourse
        })
        console.log(that.data.courceList);
        this.screen()
      },
    });
    wx.hideLoading();

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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      now_week: Number(e.detail.value) + 1
    })
    this.screen()
  },
  back_index() {
    wx.redirectTo({
      url: '../index/index',
    })
  },
})