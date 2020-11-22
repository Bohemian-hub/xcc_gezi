/*
 * @Author: your name
 * @Date: 2020-11-18 15:06:45
 * @LastEditTime: 2020-11-20 00:46:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/publish_confess/publish_confess.js
 */
// pages/publish_confess/publish_confess.js
// 引入模块 
var COS = require('../../cos-wx-sdk-v5.js');
var cos = new COS({

      SecretId: 'AKIDYCaiCuKWQRbVzFq6e1IPFpaXEeOyuYWY',
  
      SecretKey: 'WnpDAvPfway2RO50gW7RabOvB6FApAIx',
  
  });

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    filePath:'',
    filename:'',
    choose_image_index: 'image1',
    me:'',
    ta:'',
    content:'',
    radio:1,
    choose_img_url:'',


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  /* 我选择了哪一张表白用图 */
  choose_image(e) {
    console.log(e.currentTarget.dataset.id);
    this.setData({
      choose_image_index: e.currentTarget.dataset.id,
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        var imagename = wx.getStorageSync('studentId')+"_"+Date.parse(new Date())
        /* 这里的if是判断我是否选了图片，然后决定上传按钮是否显示 */
        if (this.data.imgList.length != 0) {
          /* 有图片了，让选择图标消失 */
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths),
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths,
            choose_image_index: 'image4',
            filePath:res.tempFiles[0].path,
            filename:wx.getStorageSync('studentId')+"_"+Date.parse(new Date())+".jpg"
          })
        }
        

      }
    });
  },
  ViewImage(e) {
    this.setData({
      choose_image_index: 'image4',
    })
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

  /* 获取各个地方的值 */
  getInputValue1(e){
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      me:e.detail
    })
  },
  getInputValue2(e){
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      ta:e.detail
    })
  },
  getInputValue3(e){
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.setData({
      content:e.detail
    })
  },
  listenerRadioGroup(e){
    console.log(e.detail.value);
    this.setData({
      radio:e.detail.value
    })
  },
  publish(res){
    var that = this
    /* 表示我选择了自定义的图片，这样才上传图片，否则我不用图片 */
    if(this.data.choose_image_index == 'image4'){
      cos.postObject({
        Bucket: 'xcc-grid-1256135907',
        Region: 'ap-nanjing',
        Key: 'xcc_confess/' + this.data.filename,
        FilePath: that.data.filePath,
        onProgress: function (info) {
            /* 显示进度 */
            console.log(JSON.stringify(info));
        }
      }, function (err, data) {
          console.log(err || data);
          console.log(data.headers.location);
          that.setData({
            choose_img_url:data.headers.location,
          })
          that.add_confess()
      });
    }else{
      that.setData({
        choose_img_url:this.data.choose_image_index,
      })
      that.add_confess()
    }
  },
  add_confess(){
    /* 展示所有即将录入数据库的东西 */
    console.log('----------------------------');
    console.log(wx.getStorageSync('name'));
    console.log(wx.getStorageSync('studentId'));
    console.log(this.data.me.value);
    console.log(this.data.ta.value);
    console.log(this.data.radio);
    console.log(this.data.choose_img_url);
    console.log(this.data.content.value);
    console.log('----------------------------');
  }
  
})