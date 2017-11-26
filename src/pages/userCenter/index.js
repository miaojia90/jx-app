//用户中心 主页
'use strict';
var BaseUtils = require('../../utils/base.js');
const conf = {
  data: {
    userInfo: null,
    isLogin: false,
    sid: null,
    uid: null
  },
  onLoad() {
    //获取用户信息
    var sid = BaseUtils.base.getSessionStorage("sid");
    var uid = BaseUtils.base.getSessionStorage("uid");
    this.setData({
      sid: sid,
      uid: uid
    });
    if (!sid) {
      //提示用户未登录
      wx.redirectTo({
        url: 'register/index'
      })
      return;
    }
    var method = 'user/info',
      params = {
        uid: uid,
        sid: sid
      };
    var that = this;
    BaseUtils.base.getDataPostApi(method, params, function(data) {
      var dataResult = data;
      //注册成功跳转到登录页
      if (dataResult.status == 0) {
        if (dataResult.result.code == '300001') {
          //清除本地的sid和uid
          BaseUtils.base.setSessionStorage("sid", "");
          BaseUtils.base.setSessionStorage("uid", "");
          BaseUtils.base.setSessionStorage("completeInfo", false);
        }
        wx.showModal({
          content: dataResult.result.message,
          showCancel: false,
          success: function(res) {}
        });
        wx.redirectTo({
          url: 'register/index'
        });
        return;
      }
      if (dataResult.status == 1) {
        var dataInfo = dataResult.result.data;
        //显示数据到界面上
        that.setData({
          userInfo: dataInfo
        });

      }
    });
  },
  enterUpdateUser() {
    if (!this.data.sid) {
      wx.redirectTo({
        url: 'register/index'
      });
    }
    //修改资料
    wx.navigateTo({
      url: 'userUpdate/index'
    });
  },
  enterNews() {
    //进入到我的消息模块
    if (!this.data.sid) {
      wx.redirectTo({
        url: 'register/index'
      });
    }
    //修改资料
    wx.navigateTo({
      url: 'news/index'
    });
  },
  enterBusiness() {
    //进入到我的消息模块
    if (!this.data.sid) {
      wx.redirectTo({
        url: 'register/index'
      });
    }
    //业务预约
    wx.navigateTo({
      url: 'reserve/index'
    });
  },
  enterForum() {
    //进入到我的消息模块
    if (!this.data.sid) {
      wx.redirectTo({
        url: 'register/index'
      });
    }
    //修改资料
    wx.navigateTo({
      url: 'forum/index'
    });
  }
}

Page(conf);