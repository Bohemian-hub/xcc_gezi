/*
 * @Author: your name
 * @Date: 2021-01-06 21:10:31
 * @LastEditTime: 2021-01-09 22:26:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/forum/forum.js
 */
// pages/forum/forum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    monidata: [{
      touxiang: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3335200364,664435613&fm=26&gp=0.jpg',
      name: '张益达',
      sex: '男',
      college: '信息技术学院',
      grade: '大三',
      time: '13分钟前',
      content: '瑞雪兆丰年呢！',
      picture: [
        {
          src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2174384932,1613588892&fm=26&gp=0.jpg'
        },
      ],
      love: [{
        name: '何炅',
      }, {
        name: '刘德华',
      }, {
        name: '谢霆锋',
      }, {
        name: '赵本山',
      }, {
        name: '宋丹丹',
      }, {
        name: '冯巩',
      }, {
        name: '邓紫棋',
      }, {
        name: '张伟',
      }, {
        name: '曾国藩',
      }, {
        name: '谢娜',
      }, {
        name: '张三丰',
      }, {
        name: '罗志祥',
      }],
      comment: [{
        name: '张毅',
        content: '你很牛逼哦！'
      }, {
        name: '谢霆锋 ',
        content: '加油，你很厉害的'
      }, {
        name: '王丽雯',
        content: '哈哈哈'
      }, {
        name: '张益达',
        content: '你真吉尔利害啊，可不可以和我一起玩呀，我可喜欢玩这个了，可是玩不来没大哥哥可不可以带带我啊，我是是的爸爸，我很爱你的哦， 咱们永远 在一起啊吧，我可以给你带来幸福'
      }],
      soncomment: [{
        name: '雷神',
        towho: '张毅',
        content: '你也牛逼'
      }, {
        name: '唐强',
        towho: '张毅',
        content: '你更牛逼些'
      }, {
        name: '冯双',
        towho: '张益达',
        content: '可以挣一百万呢'
      }, {
        name: '虞姬',
        towho: '张益达',
        content: '整他一个亿'
      }],

    }, {
      touxiang: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2905222703,1588432193&fm=26&gp=0.jpg',
      name: '张益达',
      sex: '男',
      college: '信息技术学院',
      grade: '大三',
      time: '13分钟前',
      content: '瑞雪兆丰年呢！',
      picture: [
        {
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1855446114,586757561&fm=26&gp=0.jpg'
        },
        {
          src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=100541962,2833807992&fm=26&gp=0.jpg'
        },
        {
          src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=821379803,1558762353&fm=11&gp=0.jpg'
        },
        {
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3256875674,3691999735&fm=11&gp=0.jpg'
        }
      ],
      love: [{
        name: '何炅',
      }, {
        name: '刘德华',
      }, {
        name: '谢霆锋',
      }, {
        name: '赵本山',
      }, {
        name: '宋丹丹',
      }, {
        name: '冯巩',
      }, {
        name: '邓紫棋',
      }, {
        name: '张伟',
      }, {
        name: '曾国藩',
      }, {
        name: '谢娜',
      }, {
        name: '张三丰',
      }, {
        name: '罗志祥',
      }],
      comment: [{
        name: '张毅',
        content: '你很牛逼哦！'
      }, {
        name: '谢霆锋 ',
        content: '加油，你很厉害的'
      }, {
        name: '王丽',
        content: '哈哈哈'
      }, {
        name: '张益达',
        content: '你真吉尔利害啊，可不可以和我一起玩呀，我可喜欢玩这个了，可是玩不来没大哥哥可不可以带带我啊，我是是的爸爸，我很爱你的哦， 咱们永远 在一起啊吧，我可以给你带来幸福'
      }],
      soncomment: [{
        name: '雷神',
        towho: '张毅',
        content: '你也牛逼'
      }, {
        name: '唐强',
        towho: '张毅',
        content: '你更牛逼些'
      }, {
        name: '冯双',
        towho: '张益达',
        content: '可以挣一百万呢'
      }, {
        name: '虞姬',
        towho: '张益达',
        content: '整他一个亿'
      }],

    }, {
      touxiang: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2017958222,3835362425&fm=11&gp=0.jpg',
      name: '张丽',
      sex: '女',
      college: '信息技术学院',
      grade: '大二',
      time: '.1-6 15:23',
      content: '这些可是世界上最乖的妹儿哦，欧尼酱敲击可爱的呢！',
      picture: [
        { src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4001791683,2216116189&fm=26&gp=0.jpg' },
        { src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=278547510,452014085&fm=26&gp=0.jpg' },
        { src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2317008229,906140941&fm=26&gp=0.jpg' },
        { src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2598405804,875979297&fm=26&gp=0.jpg' },
        { src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2197674299,1839023644&fm=11&gp=0.jpg' },
        { src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1264363610,237150817&fm=26&gp=0.jpg' },
        { src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2857483951,1440537674&fm=26&gp=0.jpg' }
      ],
      love: [{
        name: '何炅',
      }, {
        name: '刘德华',
      }, {
        name: '谢霆锋',
      }, {
        name: '赵本山',
      }, {
        name: '宋丹丹',
      }, {
        name: '冯巩',
      }, {
        name: '邓紫棋',
      }, {
        name: '张伟',
      }, {
        name: '曾国藩',
      }, {
        name: '谢娜',
      }, {
        name: '张三丰',
      }, {
        name: '罗志祥',
      }],
      comment: [{
        name: '张毅',
        content: '你很牛逼哦！'
      }, {
        name: '谢霆锋 ',
        content: '加油，你很厉害的'
      }, {
        name: '王丽',
        content: '哈哈哈'
      }, {
        name: '张益达',
        content: '你真吉尔利害啊，可不可以和我一起玩呀，我可喜欢玩这个了，可是玩不来没大哥哥可不可以带带我啊，我是是的爸爸，我很爱你的哦， 咱们永远 在一起啊吧，我可以给你带来幸福'
      }],
      soncomment: [{
        name: '雷神',
        towho: '张毅',
        content: '你也牛逼'
      }, {
        name: '唐强',
        towho: '张毅',
        content: '你更牛逼些'
      }, {
        name: '冯双',
        towho: '张益达',
        content: '可以挣一百万呢'
      }, {
        name: '虞姬',
        towho: '张益达',
        content: '整他一个亿'
      }],

    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})