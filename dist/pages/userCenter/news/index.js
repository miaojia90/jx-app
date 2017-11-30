//消息列表
'use strict'
var BaseUtils = require('./../../../utils/base.js');
const conf = {
  data: {
    newsItem: null,
    pageInfo: null,
    pageNum: 1,
    pageSize: 30,
    dataLoading: true, //把"上拉加载"的变量设为true，显示 
    dataLoadingComplete: false //把“没有数据”设为false，隐藏 
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
    //获取最新消息数据
    this.getNewsData();
  },
  getNewsData: function() {
    var sid = BaseUtils.base.getSessionStorage("sid");
    var uid = BaseUtils.base.getSessionStorage("uid");
    var method = 'user/message-list',
      params = {
        uid: uid,
        sid: sid,
        page: this.data.pageNum,
        pageSize: this.data.pageSize,
        dataLoading: true, //把"上拉加载"的变量设为true，显示 
        dataLoadingComplete: false //把“没有数据”设为false，隐藏 
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
        if (dataItems) {
          // that.data.newsItem ? dataItems : (dataItems = that.data.dataItems.concat(dataItems));
          that.setData({
            newsItem: dataItems,
            dataLoading: true
          });
        } else {
          that.setData({
            dataLoadingComplete: true, //把“没有数据”设为true，显示 
            dataLoading: false //把"上拉加载"的变量设为false，隐藏 
          });
        }
      }
    });
  },
  //滚动到底部触发事件 
  loadDataScrollLower: function() {
    let that = this;
    if (that.data.dataLoading && !that.data.dataLoadingComplete) {
      that.setData({
        pageNum: parseInt(that.data.pageNum) + 1
      });
      that.getNewsData();
    }
  }
};
Page(conf);