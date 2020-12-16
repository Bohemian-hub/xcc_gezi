/*
 * @Author: your name
 * @Date: 2020-11-26 21:05:54
 * @LastEditTime: 2020-12-06 14:14:15
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
    something: '',
    turn_choose: 0,
    which_term: '2019年 学期2',
    get_befor: "&&"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 首先去数据库中加载成绩 */
    this.getgrade()
    wx.showLoading({
      title: '正在加载...',
    })
  },
  getgrade() {
    var that = this;
    wx.request({
      url: 'https://www.hedad.cn/info/grade1',
      header: {
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      data: {
        xh: wx.getStorageSync('studentId'),  //评论者的学号
        pswd: wx.getStorageSync('password'),
        xnm: 2019,
        xqm: 2,
      }, // 向后端发送的数据，后端通过request.data拿到该数据

      success: (ret) => {
        console.log(ret.data);
        /* 获取到成绩的第一步我觉得是想记录到数据库中 */
        that.setData({
          gradeList: ret.data.course,
          something: ret.data.gpa,
          get_befor: ''
        })

        console.log(that.data.something);
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
  back_index() {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  turn_choose() {
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

  },
  change_term(e) {
    wx.showLoading({
      title: '正在加载',
    })
    var that = this
    console.log(e.currentTarget.dataset.name);
    that.setData({
      turn_choose: 0
    })
    turn_status = 0
    if (e.currentTarget.dataset.name == '2019年 学期2') {
      var xnm = 2019;
      var xqm = 2
      that.setData({
        which_term: '2019年 学期2'
      })
    } else if (e.currentTarget.dataset.name == '2019年 学期1') {
      var xnm = 2019;
      var xqm = 1
      that.setData({
        which_term: '2019年 学期1'
      })
    } else if (e.currentTarget.dataset.name == '2018年 学期2') {
      var xnm = 2018;
      var xqm = 2
      that.setData({
        which_term: '2018年 学期2'
      })
    } else if (e.currentTarget.dataset.name == '2018年 学期1') {
      var xnm = 2018;
      var xqm = 1
      that.setData({
        which_term: '2018年 学期1'
      })
    }
    wx.request({
      url: 'https://www.hedad.cn/info/grade1',
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
        var that = this
        console.log(ret.data);
        /* 获取到成绩的第一步我觉得是想记录到数据库中 */
        that.setData({
          gradeList: ret.data.course,
          something: ret.data.gpa,
          get_befor: ''
        })
        console.log(that.data.something);
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
      }
    })
  }
})