//业务预约
'use strict'
var BaseUtils = require('./../../../utils/base.js');
const conf = {
  data: {
    appointmentItem: null,
    pageInfo: null,
    pageNum: 1,
    pageSize: 30
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
    //获取预约的数据
    this.getAppointmentData();
  },
  //获取数据预约
  getAppointmentData: function() {
    var sid = BaseUtils.base.getSessionStorage("sid");
    var uid = BaseUtils.base.getSessionStorage("uid");
    var method = 'user/appointment-list',
      params = {
        uid: uid,
        sid: sid,
        page: page,
        pageSize: pageSize,
        cate: cate
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
        that.setData({
          appointmentItem: dataItems
        });
      }
    });
  }
};
Page(conf);