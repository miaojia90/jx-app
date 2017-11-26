//消息列表
'use strict'
var BaseUtils = require('./../../../utils/base.js');
const conf = {
  data: {
    newsItem: null,
    pageInfo: null
  },
  onLoad() {
    //获取最新消息
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
    var method = 'user/message-list',
      params = {
        uid: uid,
        sid: sid,
        page: 1,
        pageSize: 10
      };
    var that = this;
    BaseUtils.base.getDataPostApi(method, params, function(data) {
      var dataResult = data;
      if (dataResult.status == 0) {
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
        var pageInfo = dataInfo.page;
        var dataItems = dataInfo.items;
        //显示数据到界面上
        that.setData({
          newsItem: dataItems
        });
      }
    });
  }
};
Page(conf);