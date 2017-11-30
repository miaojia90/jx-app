//论坛文章
'use strict'
var BaseUtils = require('./../../../utils/base.js');
const conf = {
  data: {
    publishArticleItem: null,
    commentArticleItem: null,
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
    //获取最新消息数据
    this.getArticleData(1, 1, 30);
  },
  getArticleData: function(cate, page, pageSize) {
    var sid = BaseUtils.base.getSessionStorage("sid");
    var uid = BaseUtils.base.getSessionStorage("uid");
    var method = 'user/article-list',
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
        //显示数据到界面上
        if (cate == 1) {
          //发表的文章
          that.setData({
            publishArticleItem: dataItems
          });
        } else {
          //评论文章
          that.setData({
            commentArticleItem: dataItems
          });
        }
      }
    });
  }
};
Page(conf);