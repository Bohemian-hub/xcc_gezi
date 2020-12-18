/*
 * @Author: your name
 * @Date: 2020-12-16 22:19:42
 * @LastEditTime: 2020-12-18 23:50:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /miniprogram-5/pages/new_publish_confess/new_publish_confess.js
 */
// pages/new_publish_confess/new_publish_confess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: '',
    college: '',
    major: '',
    name: '',
    desc: '',
    content: '',
    which_sex1_class: 'sex_button',
    which_sex2_class: 'sex_button',
    ifquestion1show: 'block',
    ifquestion2show: 'none',
    ifquestion3show: 'none',
    ifquestion4show: 'none',
    bottom_text: '重新填写',
    bywho: '',
    information_college: ['计算机科学与技术', '电子科学与技术', '电子信息工程'],    //信息技术学院
    language_college: ['英语', '翻译', '商务英语'],         //外国语学院
    civil_college: ['土木工程', '工程管理', '水利水电工程', '给排水科学与工程'],          //土木与水利工程学院
    yi_college: [
      '中国少数名族语言文学',
      '中国少数名族语言文化',
      '数学与应用数学(彝加)',
      '电子信息工程(彝加)',
      '计算机科学与技术(彝加)',
      '行政管理(彝加)',
      '动物科学(彝加)',
      '烟草(彝加)',
      '农学(彝加)',
      '土木工程(彝加)',
      '物理学(彝加)'
    ],   //彝语言文化学院
    culture_college: ['汉语言文学', '网络与新媒体'],    //文化传媒学院
    economics_college: ['财务管理', '工商管理', '电子商务', '国际经济与贸易', '市场营销'],    //经济管理学院
    art_college: ['音乐学', '美术学', '舞蹈学', '播音与主持艺术', '视觉传达设计', '园艺'],    //艺术学院
    teacher_college: [
      '小学教育',
      '语文教育',
      '学前教育*',
      '学前教育',
      '应用心理学',
      '英语教育',
      '数学教育(一类模式)',
      '语文教育(一类模式)',
      '英语教育'
    ],    //教师教育学院
    agriculture_college: ['风景园林', '农学', '烟草', '食品质量与安全', '烟草', '园艺'],    //农业科学学院
    mechanical_college: ['电气工程及其自动化', '机械电子工程', '汽车服务工程'],   //机械与电气工程学院
    math_college: ['数学与应用数学', '化学'],   //理学院
    pe_college: ['体育教育', '体育教育(专)', '社会体育指导与管理'],   //体育学院
    animal_college: [
      '动物科学',
      '动物医学',
      '水产养殖学',
      '制药工程',
    ],   //动物科学学院
    travel_college: ['旅游管理', '行政管理', '城乡规划', '酒店管理'],   //旅游与城乡规划学院
    source_college: ['环境科学与工程', '环境设计', '土地资源管理'],    //资源与环境学院

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 项目加载的时候就执行创建这个动画 */
    this.setData({
      bywho: wx.getStorageSync('name')
    })

  },
  onReady: function () {
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 100,
      transformOrigin: '50% 0% 0'
    })
    this.animation2 = wx.createAnimation({
      duration: 1600,
      timingFunction: 'ease',
      delay: 0,
      transformOrigin: '50% 50% 0'
    })
    this.animation3 = wx.createAnimation({
      duration: 1600,
      timingFunction: 'ease',
      delay: 0,
      transformOrigin: '50% 50% 0'
    })
    this.animation4 = wx.createAnimation({
      duration: 1600,
      timingFunction: 'ease',
      delay: 0,
      transformOrigin: '50% 50% 0'
    })
    this.animation.scale(2, 2).opacity(1).step()
    this.setData({ animation: this.animation.export() })
  },
  /* 点击重新填写，相当于把页面上面的数据都删除掉 */
  last_step() {
    wx.redirectTo({
      url: '../new_publish_confess/new_publish_confess',
    })
    this.setData({
      sex: '',
      college: '',
      major: '',
      name: '',
      desc: '',
    })
  },
  /* 点击男生 */
  sex(e) {
    /* 让这个东西显示上面的消失 */
    this.animation.scale(.5, .5).opacity(0).step()
    this.setData({ animation: this.animation.export(), sex: e.currentTarget.dataset.sex, })
    if (e.currentTarget.dataset.sex == 'boy') {
      this.setData({
        which_sex1_class: 'sex_button_after',
      })
    } else {
      this.setData({
        which_sex2_class: 'sex_button_after',
      })
    }
    setTimeout(() => {
      this.setData({
        ifquestion1show: 'none',
        ifquestion2show: 'block',
      })
    }, 1000);
    setTimeout(() => {
      this.animation2.scale(2, 2).opacity(1).step()
      this.setData({ animation2: this.animation2.export() })
    }, 1200);

  },

  college(e) {
    /* 让这个东西显示上面的消失 */
    this.animation2.scale(.5, .5).opacity(0).step()
    this.setData({ animation2: this.animation2.export(), college: e.currentTarget.dataset.college, })
    console.log(this.data.college);
    this.setData({
      college: this.data[e.currentTarget.dataset.college],
    })
    setTimeout(() => {
      this.setData({
        ifquestion2show: 'none',
        ifquestion3show: 'block',
      })
    }, 1000);
    setTimeout(() => {
      this.animation3.scale(2, 2).opacity(1).step()
      this.setData({ animation3: this.animation3.export() })
    }, 1200);

  },


  major(e) {
    /* 让这个东西显示上面的消失 */
    this.animation3.scale(.5, .5).opacity(0).step()
    this.setData({ animation3: this.animation3.export(), major: e.currentTarget.dataset.major, })

    setTimeout(() => {
      this.setData({
        ifquestion3show: 'none',
        ifquestion4show: 'block',

      })

    }, 1000);
    setTimeout(() => {
      this.animation4.scale(2, 2).opacity(1).step()
      this.setData({ animation4: this.animation4.export() })
    }, 1200);
  },

  back() {
    wx.redirectTo({
      url: '../new_confesswall/new_confesswall',
    })
  }
})