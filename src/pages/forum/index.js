// pages/component/common/emptySearch/emptySearch.js
Page({
  data: {},
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
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
})