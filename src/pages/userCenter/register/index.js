'use strict';
const conf = {
  data: {
    arrayItemType: ['请选择', '客户经理', '地产中介', '内部人员', '其他'],
    itemTypeIndex: 0
  },
  onLoad() {},
  bindStartEnterApp() {
    wx.switchTab({
      url: '../../home/index'
    });
  }
};

Page(conf);