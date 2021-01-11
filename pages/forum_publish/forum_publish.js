/*
 * @Author: your name
 * @Date: 2021-01-11 09:56:30
 * @LastEditTime: 2021-01-11 23:20:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/forum_publish/forum_publish.js
 */
// pages/forum_publish/forum_publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    topicList: [],
    input_content: '',
    add_topic_content: '',
    card_time: ''
  },
  ChooseImage() {
    wx.chooseImage({
      count: 9, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  onLoad: function () {
    /* 页面在加载的时候从和后台数据库中请求数据 */
    this.get_topic()
  },
  get_topic() {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/forum/get_topic', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          topicList: res.data
        })
      }
    })
  },
  add_topic_text(e) {
    console.log(e.detail.value);
    this.setData({
      add_topic_content: '#' + e.detail.value + '#'
    })
  },
  bind_input_content(e) {
    console.log(e.detail.value);
    this.setData({
      input_content: e.detail.value
    })
  },
  add_this_topic(e) {
    /* 添加点击的话题 */
    console.log(e.currentTarget.dataset.topic);
    this.setData({
      /* 追加到 content ,话题就在内容中了，传到后端等他自己想吧*/
      input_content: this.data.input_content + e.currentTarget.dataset.topic
    })

  },
  publish(res) {
    var that = this
    /* 开启等待框 */
    if (that.data.content) {

      wx.showLoading({
        title: '正在上传中！！！',
      })
      var myDate = new Date();
      var month = myDate.getMonth() + 1
      var daly = myDate.getDate()
      var h = myDate.getHours();       //获取当前小时数(0-23)
      var m = myDate.getMinutes();     //获取当前分钟数(0-59)
      var s = myDate.getSeconds();     //获取当前秒数(0-59)
      if (daly < 10) {
        daly = "0" + String(daly)
      }
      if (month < 10) {
        month = "0" + String(month)
      }
      if (h < 10) {
        h = "0" + String(h)
      }
      if (m < 10) {
        m = "0" + String(m)
      }
      if (s < 10) {
        s = "0" + String(s)
      }
      var card_time = myDate.getFullYear() + '' + month + '' + daly + '' + h + '' + m + '' + s;
      that.setData({
        card_time: card_time,
      })
      /* 表示我选择了自定义的图片，这样才上传图片，否则我不用图片 */
      if (this.data.choose_image_index == 'image4') {
        // 去某个地方获取一个临时密钥
        var cos = new COS({
          getAuthorization: function (options, callback) {
            // 服务端 JS 和 PHP 示例：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
            // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
            // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
            wx.request({
              url: 'https://www.xiyuangezi.cn/confess/credential',
              data: {
                // 可从 options 取需要的参数
              },
              success: function (result) {
                var data = result.data;
                var credentials = data.credentials;
                callback({
                  TmpSecretId: credentials.tmpSecretId,
                  TmpSecretKey: credentials.tmpSecretKey,
                  XCosSecurityToken: credentials.sessionToken,
                  ExpiredTime: data.expiredTime,
                });
              }
            });
          }
        });
        cos.postObject({
          Bucket: 'xcc-grid-1256135907',
          Region: 'ap-nanjing',
          Key: 'xcc_confess/' + this.data.filename,
          FilePath: that.data.filePath,
          onProgress: function (info) {
            /* 显示进度 */
            console.log(JSON.stringify(info.percent));
          }
        }, function (err, data) {
          console.log(err || data);
          console.log(data.Location);
          that.setData({
            choose_img_url: "https://" + data.Location,
          })
          that.add_confess()
        });
      } else {
        that.setData({
          choose_img_url: this.data.choose_image_index,
        })
        that.add_confess()
      }
    } else {
      wx.showToast({
        title: '没填完叭',
        icon: 'warn',
        duration: 2000
      })
    }
  },
})