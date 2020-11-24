/*
 * @Author: your name
 * @Date: 2020-11-13 23:35:52
 * @LastEditTime: 2020-11-24 10:06:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/ConfessionWall/ConfessionWall.js
 */
// pages/ConfessionWall/ConfessionWall.js

//声明工具类对象
var love_onclick_status = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    onclick_love_id: [],
    animationData: {},
    showModalStatus: false,
    comment_onclick_count: '',
    confessList: [],
    warning1: 0,
    swiperList: [{
      id: 0,
      card_from: '张益达',
      card_object: '刘露漫',
      card_bg_url: '',
      card_img_url: '',
      card_content: '我爱你啊我爱你啊我爱你啊我爱你啊我爱你啊我爱你啊我爱你啊我爱你啊我爱你啊我爱你啊我爱你啊',
      love_numbers: '35',
      comment_numbers: '22',
    }, {
      id: 1,
      card_from: '陈建军',
      card_object: '刘德华',
      card_bg_url: '',
      card_img_url: '',
      card_content: '你是傻逼你是傻逼你是傻逼你是傻逼你是傻逼你是傻逼你是傻逼你是傻逼你是傻逼',
      love_numbers: '21',
      comment_numbers: '1000',
    }, {
      id: 2,
      card_from: '阿宝',
      card_object: '蔡蔡',
      card_bg_url: '',
      card_img_url: '',
      card_content: '我是你爸爸',
      love_numbers: '3',
      comment_numbers: '0',
    }, {
      id: 3,
      card_from: '阿小华',
      card_object: '英语',
      card_bg_url: '',
      card_img_url: '',
      card_content: '一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五',
      love_numbers: '10000',
      comment_numbers: '10000',
    }, {
      id: 4,
      card_from: '刘仪伟',
      card_object: '虞姬',
      card_bg_url: '',
      card_img_url: '',
      card_content: '一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五',
      love_numbers: '3',
      comment_numbers: '1',
    }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  /* 我准备在这里查询我想要的数据，加载的时候 就显示等待，等成功了就关闭等待，用户可以浏览 */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    var that = this
    var myDate = new Date();
    var month = myDate.getMonth() + 1
    var daly = myDate.getDate()

    if (daly < 10) {
      daly = "0" + String(daly)
    }
    if (month < 10) {
      month = "0" + String(month)
    }
    var card_day = myDate.getFullYear() + '' + month + '' + daly
    /* 发送一个数据请求，获取表白墙上日期为今天的所有表白数据。 */
    /* 当然是通过向后端传值的方式 */
    wx.request({
      url: 'http://127.0.0.1:8000/confess/get_confess', //仅为示例，并非真实的接口地址
      data: {
        card_date: card_day
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {

        console.log(res.data);
        /* 使用一个循环将所有的 image1 image2 image3 变成相应的图片？ */
        for (let index = 0; index < res.data.length; index++) {
          console.log(res.data[index].fields.object_img);
          /* 表白用图更改  */
          if (res.data[index].fields.object_img == 'image1') {
            res.data[index].fields.object_img = 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3844056729,169452221&fm=26&gp=0.jpg'

            /*             that.setData({
                          ['confessList[' + index + '].fields.object_img']: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1276922613,2663697467&fm=26&gp=0.jpg'
                        }) */
          } else if (res.data[index].fields.object_img == 'image2') {
            res.data[index].fields.object_img = 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3082372117,1837107116&fm=26&gp=0.jpg'

            /*             that.setData({
                          ['confessList[' + index + '].fields.object_img']: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1276922613,2663697467&fm=26&gp=0.jpg'
                        }) */
          } else if (res.data[index].fields.object_img == 'image3') {
            res.data[index].fields.object_img = 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1116313726,3874542020&fm=26&gp=0.jpgg'

            /*             that.setData({
                          ['confessList[' + index + '].fields.object_img']: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1276922613,2663697467&fm=26&gp=0.jpg'
                        }) */
          }
          /* 背景图片更改 */
          if (res.data[index].fields.bg_img == '1') {
            res.data[index].fields.bg_img = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605812047244&di=e565f8d78273cb9158b9c878404acd4a&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180801%2F23%2F1533136367-GBQIhKumqb.jpg'

            /*             that.setData({
                          ['confessList[' + index + '].fields.object_img']: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1276922613,2663697467&fm=26&gp=0.jpg'
                        }) */
          } else if (res.data[index].fields.bg_img == '2') {
            res.data[index].fields.bg_img = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1988607977,452097805&fm=26&gp=0.jpg'

            /*             that.setData({
                          ['confessList[' + index + '].fields.object_img']: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1276922613,2663697467&fm=26&gp=0.jpg'
                        }) */
          } else if (res.data[index].fields.bg_img == '3') {
            res.data[index].fields.bg_img = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605812047241&di=da1737730ae140b30aa382d52809bb31&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190807%2F16%2F1565166837-ASlVtKPhzo.jpg'

            /*             that.setData({
                          ['confessList[' + index + '].fields.object_img']: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1276922613,2663697467&fm=26&gp=0.jpg'
                        }) */
          }
        }

        /* 数据获取完毕，准备渲染 */
        that.setData({
          confessList: res.data
        })
        console.log(that.data.confessList);

        /* 关闭等待框，弹出提示框 */
        wx.hideLoading()

      }
    })
    /* 查询一下哪些卡片我是点了赞的 */
    wx.request({
      url: 'http://127.0.0.1:8000/confess/which_love', //仅为示例，并非真实的接口地址
      data: {
        studentId: wx.getStorageSync('studentId'),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (result) => {
        console.log(result.data);
        for (let index = 0; index < result.data.length; index++) {
          console.log("点了赞的comment_id：" + result.data[index].fields.comment_id);
          var peach = result.data[index].fields.comment_id
          for (let index = 0; index < that.data.confessList.length; index++) {
            const element = that.data.confessList[index].fields.comment_id;
            console.log(element);
            if (element == peach) {
              console.log("匹配成功");
              console.log(index);
              var love_target = index
              that.setData({
                ['onclick_love_id[' + love_target + ']']: 1,
              })
              love_onclick_status[love_target] = 1;
              console.log(that.data.onclick_love_id);
            }

          }
        }
      },
    });


  },
  page_back_index: function () {
    wx.navigateTo({
      url: '../index/index',
      success: function (res) {

      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
  },

  makelove(e) {
    var that = this;
    console.log(e.currentTarget.dataset.id);
    var love_target = e.currentTarget.dataset.id - 1

    if (love_onclick_status[love_target] == 1) {
      /* 下面是将点赞的按钮变回去，但是想在我不想变了，真的很麻烦你知道吗 */
      /*       that.setData({
              ['onclick_love_id[' + love_target + ']']: -1,
            })
            love_onclick_status[love_target] = 0;
            console.log(this.data.onclick_love_id); */

      that.setData({
        warning1: 1
      })
      setTimeout(function () {
        that.setData({
          warning1: 0
        })
      }, 2000);

    } else {
      /* 下面是将点赞的按钮变成红色 */
      that.setData({
        ['onclick_love_id[' + love_target + ']']: 1,
        /*         ['swiperList[' + e.currentTarget.dataset.id + '].love_numbers']: swiperList[e.currentTarget.dataset.id].love_numbers + 1 */
        /* 这里是为了让点赞数量本地+1 */
        ['confessList[' + love_target + '].fields.love_count']: that.data.confessList[love_target].fields.love_count + 1
      })
      love_onclick_status[love_target] = 1;
      console.log(that.data.onclick_love_id);
      console.log('-----------------');
      console.log('-----------------');
      console.log('-----------------');
      console.log(love_target)
      console.log(that.data.confessList[1].fields.comment_id);
      console.log(that.data.confessList[1].fields.id);
      console.log('-----------------');
      console.log('-----------------');
      console.log('-----------------');


      /* 下面我就要记录我这个点赞了，也就是发送点赞请求到后端 */
      wx.request({
        url: 'http://127.0.0.1:8000/confess/add_love', //仅为示例，并非真实的接口地址
        data: {
          name: wx.getStorageSync('name'),
          studentId: wx.getStorageSync('studentId'),
          comment_id: that.data.confessList[love_target].fields.comment_id,
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: (result) => {
          console.log("点赞成功");
        },
      });
    }

  },
  makecomment(e) {
    var that = this;
    console.log(e.currentTarget.dataset.id);
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    this.animation.translateY(520).step()

    that.setData({
      animationData: animation.export(),
      showModalStatus: true,
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 0)
  },
  close_comment() {
    var that = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    this.animation.translateY(0).step()
    that.setData({
      animationData: animation.export(),

    })
    setTimeout(function () {
      animation.translateY(520).step()
      this.setData({
        animationData: animation.export(),
      })
    }.bind(this), 0)
    setTimeout(function () {
      this.setData({
        showModalStatus: false,
      })
    }.bind(this), 300)
  },
  publish_confess() {
    wx.navigateTo({
      url: '../publish_confess/publish_confess',
    })
  },

  complain_panel() {
    var that = this
    that.setData({
      warning2: 1
    })
    setTimeout(function () {
      that.setData({
        warning2: 0
      })
    }, 2000);
  },

  publish_complain() {
    var that = this
    that.setData({
      warning2: 1
    })
    setTimeout(function () {
      that.setData({
        warning2: 0
      })
    }, 2000);
  },


  close_warning() {
    var that = this
    that.setData({
      warning1: 0,
      warning2: 0
    })
  },

});