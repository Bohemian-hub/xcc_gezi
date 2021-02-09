/*
 * @Author: your name
 * @Date: 2020-11-26 21:05:54
 * @LastEditTime: 2021-01-26 10:04:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/grade/grade.js
 */
// pages/grade/grade.js
var turn_status = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gradeList: [],
    which_term: '2020年 学期1',
    gpa: "&&",
    array: ['美国', '中国', '巴西', '日本'],
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 首先去数据库中加载成绩 */
    this.setData({
      student_name: wx.getStorageSync("name")
    })
    this.getgrade(2020, 1)
    var grade = wx.getStorageSync('grade')
    if (grade == "大一") {
      this.setData({
        array: ['大一上']
      })
    } else if (grade == "大二") {
      this.setData({
        array: ['大二上', '大一下', '大一上',]
      })
    } else if (grade == "大三") {
      this.setData({
        array: ['大三上', '大二下', '大二上', '大一下', '大一上',]
      })
    } else if (grade == "大四") {
      this.setData({
        array: ['大四上', '大三下', '大三上', '大二下', '大二上', '大一下', '大一上',]
      })
    }
  },
  getgrade(xnm, xqm) {
    console.log(xnm,xqm);
    wx.showLoading({
      title: '正在加载...',
    })
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8000/info/grade1',
      header: {
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      data: {
        xh: wx.getStorageSync('studentId'),  //评论者的学号
        pswd: wx.getStorageSync('password'),
        xnm: xnm,
        xqm: xqm,
      }, // 向后端发送的数据，后端通过request.data拿到该数据

      success: (ret) => {
        console.log(ret.data);
        that.setData({
          gradeList: ret.data.course,
          gpa: ret.data.gpa,
        })
        for (let index = 0; index < that.data.gradeList.length; index++) {
          const element = that.data.gradeList[index];

          if (element.courseNature == '专业教育') {
            that.setData({
              ['gradeList[' + index + '].courseNature']: "专业",
              ['gradeList[' + index + '].gradePoint']: "绩点" + element.gradePoint
            })
          } else if (element.courseNature == "通识教育") {
            that.setData({
              ['gradeList[' + index + '].courseNature']: "通识",
              ['gradeList[' + index + '].gradePoint']: "绩点" + element.gradePoint
            })
          } else if (element.courseNature == '拓展教育') {
            that.setData({
              ['gradeList[' + index + '].courseNature']: "拓展",
              ['gradeList[' + index + '].gradePoint']: "绩点" + element.gradePoint
            })
          } else {
            that.setData({
              ['gradeList[' + index + '].courseNature']: "其他",
              ['gradeList[' + index + '].gradePoint']: "绩点" + element.gradePoint
            })
          }
        }
        console.log(that.data.gradeList);
        wx.hideLoading()

      },
    });
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    if (e.detail.value == 0) {
      this.getgrade(2020, 1)
    } else if (e.detail.value == 1) {
      this.getgrade(2019, 2)
    } else if (e.detail.value == 2) {
      this.getgrade(2019, 1)
    } else if (e.detail.value == 3) {
      this.getgrade(2018, 2)
    } else if (e.detail.value == 4) {
      this.getgrade(2018, 1)
    } else if (e.detail.value == 5) {
      this.getgrade(2017, 2)
    } else if (e.detail.value == 6) {
      this.getgrade(2017, 1)
    }
  },
  back_index() {
    wx.redirectTo({
      url: '../index/index',
    })
  },
})