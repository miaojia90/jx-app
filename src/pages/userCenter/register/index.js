'use strict';
var BaseUtils = require('./../../../utils/base.js');
const conf = {
  data: {
    arrayItemType: ['请选择注册类型', '客户经理', '内部人员', '地产中介', '其他'],
    itemTypeIndex: 0,
    registerFlag: false,
    typeFlag: false,
    userInfo: null,
    uid: null,
    sid: null
  },
  onLoad() {
    this.getUserImg();
    //获取本地存储的用户信息
    var sid = BaseUtils.base.getSessionStorage("sid");
    var uid = BaseUtils.base.getSessionStorage("uid");
    this.setData({
      sid: sid,
      uid: uid
    });
    var completeInfo = BaseUtils.base.getSessionStorage("completeInfo");
    if (sid) {
      if (completeInfo) {
        //直接跳转到首页
        wx.switchTab({
          url: '../../home/index'
        });
      } else {
        this.setData({
          registerFlag: true
        });
      }
      return;
    }
    //获取用户登录凭证 使用code换取openid和session_key
    var that = this;
    wx.login({
      success: function(res) {
        if (res.code) {
          //得到code  发送微信授权登录的接口
          var method = 'user/we-chat-login',
            params = {
              code: res.code
            };
          BaseUtils.base.getDataPostApi(method, params, function(data) {
            var dataResult = data;
            if (dataResult.status == 1) {
              if (!dataResult.result.data.sid) {
                return;
              }
              //微信授权成功 查看是否完善资料 将信息写入到local
              BaseUtils.base.setSessionStorage("sid", dataResult.result.data.sid);
              BaseUtils.base.setSessionStorage("uid", dataResult.result.data.uid);
              BaseUtils.base.setSessionStorage("completeInfo", dataResult.result.data.completeInfo);
              if (dataResult.result.data.completeInfo) {
                //直接跳转到首页
                wx.switchTab({
                  url: '../../home/index'
                });
              } else {
                //跳转到完善资料的页面
                that.setData({
                  registerFlag: false
                });
              }
            } else {
              //没有获取到code数据 什么都不做
              wx.getSetting({
                success(res) {
                  if (!res.authSetting['scope.userInfo']) {
                    wx.authorize({
                      scope: 'scope.userInfo',
                      success() {
                        wx.getUserInfo();
                      }
                    })
                  }
                }
              });
            }
          });

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
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
    if (this.data.itemTypeIndex == 1 || this.data.itemTypeIndex == 2) {
      this.setData({
        typeFlag: true
      });
    } else {
      this.setData({
        typeFlag: false
      });
    }
  },
  formSubmit(e) {
    wx.switchTab({
      url: '../../home/index'
    });
    return;

    var baseUtils = BaseUtils.base;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var name = baseUtils.trimFunction(e.detail.value.userName);
    // var password = baseUtils.trimFunction(e.detail.value.password);
    var password = '123456';
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
      // if (!(!!password && password.length > 1)) {
      //   //提示
      //   wx.showModal({
      //     content: '请输入密码',
      //     showCancel: false,
      //     success: function(res) {}
      //   });
      //   return;
      // }
      if (this.data.itemTypeIndex == 0) {
        //提示
        wx.showModal({
          content: '请选择您需要注册的类型！',
          showCancel: false,
          success: function(res) {}
        });
        return;
      } else {
        if (this.data.itemTypeIndex == 1 || this.data.itemTypeIndex == 2) {
          if (!(!!inviteCode && inviteCode.length > 1)) {
            wx.showModal({
              content: '请输入从超级管理处获取的邀请码！',
              showCancel: false,
              success: function(res) {}
            });
            return;
          }
        }
        var obj = {};
        obj["nickname"] = name;
        //获取用户图像信息
        obj["headPhoto"] = this.data.userInfo.avatarUrl;
        obj["password"] = password;
        obj["sex"] = this.data.userInfo.gender;
        obj["tel"] = baseUtils.trimFunction(e.detail.value.userPhone);
        obj["type"] = this.data.itemTypeIndex;
        //对接接口
        var method = 'user/complete-info',
          params = {
            type: '1',
            uid: this.data.uid,
            sid: this.data.sid,
            inviteCode: '',
            data: JSON.stringify(obj)
          };
        BaseUtils.base.getDataPostApi(method, params, function(data) {
          var dataResult = data;
          //注册成功跳转到登录页
          if (dataResult.status == 0) {
            wx.showModal({
              content: dataResult.result.message,
              showCancel: false,
              success: function(res) {}
            });
            return;
          }
          if (dataResult.status == 1) {
            BaseUtils.base.setSessionStorage("completeInfo", true);
            //跳转到主页
            wx.switchTab({
              url: '../../home/index'
            });
          }
        });
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
      if (!(!!password && password.length > 1)) {
        //提示
        wx.showModal({
          content: '请输入密码！',
          showCancel: false,
          success: function(res) {}
        });
        return;
      }
      //调用登录接口
      var method = 'user/login',
        params = {
          username: name,
          password: password
        };
      BaseUtils.base.getDataPostApi(method, params, function(data) {
        var dataResult = data;
        //TODO:还未实现
        //注册成功跳转到登录页
        wx.switchTab({
          url: '../../home/index'
        });
      });
    }
  }
};

Page(conf);