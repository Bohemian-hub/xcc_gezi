/*
 * @Author: your name
 * @Date: 2021-01-11 09:56:30
 * @LastEditTime: 2021-02-08 19:14:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/forum_publish/forum_publish.js
 */
// pages/forum_publish/forum_publish.js
var COS = require('../../cos-wx-sdk-v5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classify: 'learn',
    imgList: [],
    topicList: [],
    input_content: '',
    add_topic_content: '',
    card_time: '',
    real_time: '',
    real_date: '',
    filename: '',
    post_data_pic: [],
    post_data_name: '',
    post_data_grade: '',
    post_data_college: '',
    post_data_sex: '',
    tempavatarUrl: '',
    post_data_avatarUrl: '',
    topic_show: 1,
    topic_content: []

  },
  ChooseImage() {
    var that = this
    wx.chooseImage({
      count: 9, //默认9
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
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
        /* 选完图片我看看到底imgList是啥？ */
        console.log(this.data.imgList);   //其实就是个图片地址的数组
        /* 装好了图片之后我借给他压缩了先，再放进去 */
        wx.showLoading({
          title: '压缩图片中！！！',
        })
        /* 单独用一个for循环来实现这个压缩图片 */
        for (let index = 0; index < that.data.imgList.length; index++) {
          wx.compressImage({
            src: that.data.imgList[index], // 图片路径
            quality: 20, // 压缩质量
            success: res => {
              that.setData({
                ['imgList[' + index + ']']: res.tempFilePath
              })
              console.log("最终结果：---------------------");
              console.log(res.tempFilePath);
              console.log(that.data.imgList);
              console.log("最终结果：---------------------");


            }
          })
        }
        console.log("压缩完成：");
        console.log(that.data.imgList);
        wx.hideLoading()
        wx.hideLoading()
        wx.hideLoading()
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
      title: '同学',
      content: '确定要删除这张图片吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
          console.log(this.data.imgList);
        }
      }
    })
  },
  onLoad: function (options) {
    /* 页面在加载的时候从和后台数据库中请求数据 */
    this.get_topic()
    console.log(options);
    console.log(options.classify);
    console.log(options.department);
    console.log(options.position);
    this.setData({
      post_data_name: wx.getStorageSync('name'),
      post_data_sex: wx.getStorageSync('sex'),
      classify: options.classify
    })
    if (options.department == 'init') {
      this.setData({
        post_data_grade: wx.getStorageSync('grade'),
        post_data_college: wx.getStorageSync('college'),
      })
    } else {
      this.setData({
        post_data_grade: options.position,
        post_data_college: options.department,
      })
    }
  },
  back_index() {
    wx.redirectTo({
      url: '../forum/forum'
    })
  },
  getuserinfo(e) {
    var that = this
    /* 这里获取之后不如我就上床一下，免得头像地址失效了不可用。*/


    wx.downloadFile({
      url: e.detail.userInfo.avatarUrl,
      success: function (res) {
        console.log(res.tempFilePath)
        that.setData({
          tempavatarUrl: res.tempFilePath
        })
        console.log("执行异步函数")
        that.uploadavatar()
      }
    })
  },
  get_topic() {
    var that = this
    wx.request({
      url: 'https://www.xiyuangezi.cn/forum/get_topic', //仅为示例，并非真实的接口地址
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
    /* 无论如何，只要add了，就记得把这个打开 */
    /* 判断数组是否包含某一个元素 */
    if (this.data.topic_content.length > 4) {
      console.log("已经五个元素了，不能再增加了");
      wx.showToast({
        title: '不能再多了',
        icon: 'none',
        duration: 1500,
      });

    } else {
      if (this.data.topic_content.indexOf(e.currentTarget.dataset.topic) > -1) {
        console.log("已经包含这个 元素了");
        wx.showToast({
          title: '已选',
          icon: 'none',
          duration: 1500,
        });
      } else {
        this.data.topic_content[this.data.topic_content.length] = e.currentTarget.dataset.topic
        console.log(this.data.topic_content);
        wx.showToast({
          title: '选择成功',
          icon: 'none',
          duration: 1500,
        });
        this.setData({
          topic_show: 1,
          topic_content: this.data.topic_content
        })
      }
    }
  },
  clear_topic(e) {
    console.log(e.currentTarget.dataset.index);
    this.data.topic_content.splice(e.currentTarget.dataset.index, 1);
    if (this.data.topic_content.length == 0) {
      this.setData({
        topic_show: 0,
        topic_content: this.data.topic_content
      })
    } else {
      this.setData({
        topic_content: this.data.topic_content
      })
    }
  },
  publish(res) {

    var that = this
    /* 开启等待框 */
    if (that.data.input_content) {
      wx.showLoading({
        title: '正在上传中！！！',
      })
      /* ----------------------这里是算时间----------------------- */
      that.get_publish_time()
      /* 表示我选择了自定义的图片，这样才上传图片，否则我不用图片 */

      /* 现在分情况看是否上传图片 */
      if (this.data.imgList.length > 0) {
        // 去某个地方获取一个临时密钥cos
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



        /* 现在通过循环上传选择了的图片 */
        for (var i = 0; i < that.data.imgList.length; i++) {
          console.log("送到腾讯云的图片地址：-------------top---------");
          console.log(that.data.imgList[i]);
          console.log("送到腾讯云的图片地址：-------------bottom---------");
          /* 这是真正的上传图片 */
          cos.postObject({
            Bucket: 'xcc-grid-1256135907',
            Region: 'ap-nanjing',
            Key: 'xcc_forum/' + that.data.filename + "" + i + ".jpg",
            //下面这个东西就是传入临时地址
            FilePath: that.data.imgList[i],
            onProgress: function (info) {
              /* 显示进度 */
              console.log(JSON.stringify(info.percent));
            }
          }, function (err, data) {
            console.log(data);
            console.log(data.Location);
            /* 将上传的图片返回的地址存放过来。 */
            that.data.post_data_pic[that.data.post_data_pic.length] = "https://" + data.Location     //图片准备工作完成了
            console.log(that.data.post_data_pic.length);
            if (that.data.post_data_pic.length == that.data.imgList.length) {
              //看看需要的数据上传是否正确
              console.log("-------*-*-*-*-*----------");
              that.preparedata_to_post()
              console.log("-------*-*-*-*-*----------");
            }
          });
        }




      } else {
        /* 没有图片的话，要做的事这里 */
        //看看需要的数据上传是否正确
        console.log("-------*-*-*-*-*----------");
        that.preparedata_to_post()
        console.log("-------*-*-*-*-*----------");
      }
    } else {
      /* 没有填写完成的话，走这里 */
      wx.showToast({
        title: '没填完叭',
        icon: 'warn',
        duration: 2000
      })
    }
  },
  uploadavatar() {
    var that = this
    /* 后上传头像 */
    var cos1 = new COS({
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

    console.log(that.data.tempavatarUrl);
    if (that.data.tempavatarUrl) {
      cos1.postObject({
        Bucket: 'xcc-grid-1256135907',
        Region: 'ap-nanjing',
        Key: 'xcc_forum/' + wx.getStorageSync('studentId') + "-touxiang" + ".jpg",
        //下面这个东西就是传入临时地址
        FilePath: that.data.tempavatarUrl,
        onProgress: function (info) {
          /* 显示进度 */
          console.log(JSON.stringify(info.percent));
        }
      }, function (err, data) {
        console.log(err || data.Location);
        /* 将上传的头像返回的地址存放过来。 */
        that.setData({
          post_data_avatarUrl: "https://" + data.Location
        })
        that.publish()
      });
    }
  },
  get_publish_time() {
    var that = this;
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
    var format_time = myDate.getFullYear() + '-' + month + '-' + daly + ' ' + h + ':' + m + ':' + s;
    var real_time = h + ':' + m;
    var real_date = myDate.getFullYear() + '' + month + '' + daly;
    that.setData({
      card_time: card_time,
      real_time: real_time,
      real_date: real_date,
      format_time: format_time,
      filename: wx.getStorageSync('studentId') + "_" + card_time,
    })
  },
  preparedata_to_post() {

    /* 数据已经拿到了，现在准备向后端发送请求，现在先把数据传入后端 */
    wx.request({
      url: 'https://www.xiyuangezi.cn/forum/add_forum', //仅为示例，并非真实的接口地址
      data: {
        classify: this.data.classify,
        studentId: wx.getStorageSync('studentId'),
        post_data_name: this.data.post_data_name,
        post_data_sex: this.data.post_data_sex,
        post_data_grade: this.data.post_data_grade,
        post_data_college: this.data.post_data_college,
        input_content: this.data.input_content,
        topic_content: this.data.topic_content,
        post_data_pic: JSON.stringify(this.data.post_data_pic),
        post_data_pic1: this.data.post_data_pic,
        post_data_avatarUrl: this.data.post_data_avatarUrl,
        card_time: this.data.card_time,
        real_time: this.data.real_time,
        real_date: this.data.real_date,
        format_time: this.data.format_time,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.loginnum == 87014) {
          wx.hideLoading()
          wx.showToast({
            title: res.data.ret,
            icon: 'none',
            duration: 2000
          })

        } else {
          wx.hideLoading()
          wx.showToast({
            title: '发布成功！',
            icon: 'success',
            duration: 2000
          })
          /* 返回到论坛首页 */
          setTimeout(() => {
            wx.reLaunch({
              url: '../forum/forum'
            })
          }, 2000);

        }
      }
    })
  }

})