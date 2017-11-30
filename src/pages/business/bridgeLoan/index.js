'use strict';
//过桥业务 Add by:major
var BaseUtils = require('./../../../utils/base.js');
const conf = {
	data: {
		isProperty: false
	},
	onLoad() {

	},
	//单选框
	checkChange(e) {
		console.log('radio发生change事件，携带value值为：', e.detail.value);
		if (!this.data.isProperty) {
			this.setData({
				isProperty: true
			});
		} else {
			this.setData({
				isProperty: false
			});
		}
	},
	formSubmit(e) {
		var baseUtils = BaseUtils.base;
		console.log('form发生了submit事件，携带数据为：', e.detail.value);
		var name = baseUtils.trimFunction(e.detail.value.name);
		var contacts = baseUtils.trimFunction(e.detail.value.contacts);
		var contactsTel = baseUtils.trimFunction(e.detail.value.contactsTel);
		var money = baseUtils.trimFunction(e.detail.value.money);
		var appointmentDate = baseUtils.trimFunction(e.detail.value.appointmentDate);
		var useDays = baseUtils.trimFunction(e.detail.value.useDays);
		var recentlyDate = baseUtils.trimFunction(e.detail.value.recentlyDate);
		var lastDate = baseUtils.trimFunction(e.detail.value.lastDate);
		var isProperty = this.data.isProperty;
		if (!(!!name && name.length > 1)) {
			//提示
			wx.showModal({
				content: '请输入借款主体名称！',
				showCancel: false,
				success: function(res) {}
			});
			return;
		}
		if (!(!!contacts && contacts.length > 1)) {
			//提示
			wx.showModal({
				content: '请输入联系人名称！',
				showCancel: false,
				success: function(res) {}
			});
			return;
		}
		if (!(!!contactsTel && contactsTel.length > 1)) {
			//提示
			wx.showModal({
				content: '请输入联系人电话！',
				showCancel: false,
				success: function(res) {}
			});
			return;
		}
		if (!(!!money && money.length > 1)) {
			//提示
			wx.showModal({
				content: '请输入资金缺口！',
				showCancel: false,
				success: function(res) {}
			});
			return;
		}
		if (!(!!appointmentDate && appointmentDate.length > 1)) {
			//提示
			wx.showModal({
				content: '请输入预约用款日！',
				showCancel: false,
				success: function(res) {}
			});
			return;
		}
		if (!(!!useDays && useDays.length > 1)) {
			//提示
			wx.showModal({
				content: '请输入预计使用天数！',
				showCancel: false,
				success: function(res) {}
			});
			return;
		}
		if (!(!!recentlyDate && recentlyDate.length > 1)) {
			//提示
			wx.showModal({
				content: '请输入最早用款日！',
				showCancel: false,
				success: function(res) {}
			});
			return;
		}
		if (!(!!lastDate && lastDate.length > 1)) {
			//提示
			wx.showModal({
				content: '请输入最迟用款日！',
				showCancel: false,
				success: function(res) {}
			});
			return;
		}
		var obj = {};
		obj["name"] = name;
		//获取用户图像信息
		obj["contacts"] = contacts;
		obj["contactsTel"] = contactsTel;
		obj["money"] = money;
		obj["appointmentDate"] = appointmentDate;
		obj["useDays"] = useDays;
		obj["recentlyDate"] = recentlyDate;
		obj["lastDate"] = lastDate;
		obj["property"] = isProperty;
		var sid = BaseUtils.base.getSessionStorage("sid");
		var uid = BaseUtils.base.getSessionStorage("uid");
		//调用登录接口
		var method = 'home/appointment',
			params = {
				cate: 1,
				uid: uid,
				sid: sid,
				content: JSON.stringify(obj)
			};
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
				//提示数据到界面上
				if (dataInfo) {
					wx.showModal({
						content: "提交成功",
						showCancel: false,
						success: function(res) {}
					});
				} else {
					wx.showModal({
						content: "提交失败",
						showCancel: false,
						success: function(res) {}
					});
				}
			} else {
				wx.showModal({
					content: "提交失败",
					showCancel: false,
					success: function(res) {}
				});
			}
		});
	},
	//获取过桥的信息
	getBridgeLoanInfo() {
		var sid = BaseUtils.base.getSessionStorage("sid");
		var uid = BaseUtils.base.getSessionStorage("uid");
		//调用登录接口
		var method = 'appointment/bridge-loan-info',
			params = {
				uid: uid,
				sid: sid,
				id: id
			};
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
				//获取用户需要显示的预约详情

			} else {

			}
		});
	}
};

Page(conf);