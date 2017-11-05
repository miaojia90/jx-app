'use strict';
var BaseUtils = require('./../../../utils/base.js');
const conf = {
  data: {
    arrayItemType: ['请选择注册类型', '客户经理', '地产中介', '内部人员', '其他'],
    itemTypeIndex: 0,
    registerFlag: false,
    typeFlag: false,
    userInfo: null
  },
  onLoad() {
    this.getUserImg();
  },
  changeRegister(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      this.setData({
        registerFlag: true
      })
    } else {
      this.setData({
        registerFlag: false
      })
    }
  },
  getUserImg() {
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        that.setData({
          userInfo: userInfo
        });
      }
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      itemTypeIndex: e.detail.value
    });
    if (this.data.itemTypeIndex == 1 || this.data.itemTypeIndex == 3) {
      this.setData({
        typeFlag: true
      });
    }
  },
  formSubmit(e) {
    var baseUtils = BaseUtils.base;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var name = baseUtils.trimFunction(e.detail.value.userName);
    if (this.data.registerFlag) {
      var phone = e.detail.value.userPhone;
      var inviteCode = e.detail.value.inviteCode;
      //注册
      if (!(!!name && name.length > 1)) {
        //提示
        wx.showModal({
          content: '请输入昵称！',
          showCancel: false,
          success: function(res) {}
        });
        return;
      }
      if (this.data.itemTypeIndex == 0) {
        //提示
        wx.showModal({
          content: '请选择您需要注册的类型！',
          showCancel: false,
          success: function(res) {}
        });
        return;
      } else {
        if (this.data.itemTypeIndex == 1 || this.data.itemTypeIndex == 3) {
          if (!(!!inviteCode && inviteCode.length > 1)) {
            wx.showModal({
              content: '请输入从超级管理处获取的邀请码！',
              showCancel: false,
              success: function(res) {}
            });
            return;
          }
        }
      }
    } else {
      if (!(!!name && name.length > 1)) {
        //提示
        wx.showModal({
          content: '请输入昵称！',
          showCancel: false,
          success: function(res) {}
        });
        return;
      }
    }
    wx.switchTab({
      url: '../../home/index'
    });
  }
};

Page(conf);