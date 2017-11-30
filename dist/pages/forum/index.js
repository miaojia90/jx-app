'use strict';
//过桥业务 Add by:major
var BaseUtils = require('./../../../utils/base.js');
const conf = {
  data: {
    isProperty: false
  },
  onLoad() {

  },
  //获取文章列表的信息
  getArticleInfo() {
    var sid = BaseUtils.base.getSessionStorage("sid");
    var uid = BaseUtils.base.getSessionStorage("uid");
    //调用登录接口
    var method = 'forum/article-list',
      params = {
        cate: 1,
        type: 'new',
        page: 1,
        pageSize: 5
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
        wx.redirectTo({
          url: 'register/index'
        });
        return;
      }
      if (dataResult.status == 1) {
        var dataInfo = dataResult.result.data;
        //获取用户需要显示的预约详情

      } else {

      }
    });

    var method = 'forum/article-list',
      params = {
        cate: 1,
        type: 'hot',
        page: 1,
        pageSize: 5
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
        wx.redirectTo({
          url: 'register/index'
        });
        return;
      }
      if (dataResult.status == 1) {
        var dataInfo = dataResult.result.data;
        //获取用户需要显示的预约详情

      } else {

      }
    });
  },
  bindEditForum: function() {
    wx.navigateTo({
      url: './forumOperate/forumComment/index'
    });
  },
  bindForumList: function() {
    wx.navigateTo({
      url: './forumOperate/forumList/index'
    });
  },
  bindForumItemDetail: function() {
    wx.navigateTo({
      url: './forumOperate/forumItemDetail/index'
    });
  }
};

Page(conf);