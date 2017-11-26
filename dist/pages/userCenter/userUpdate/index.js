'use strict';
var BaseUtils = require('./../../../utils/base.js');
const conf = {
	data: {
		userInfo: null,
		isLogin: false,
		sid: null,
		uid: null
	},
	onLoad() {
		//获取用户原始数据
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
	getThisMonthDays() {},
	formSubmit(e) {
		var baseUtils = BaseUtils.base;
		console.log('form发生了submit事件，携带数据为：', e.detail.value);
		var name = baseUtils.trimFunction(e.detail.value.userName);
		// var password = baseUtils.trimFunction(e.detail.value.password);
		var phone = baseUtils.trimFunction(e.detail.value.userPhone);
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
		var obj = {};
		obj["nickname"] = name;
		//获取用户图像信息
		// obj["password"] = password;
		obj["tel"] = phone;
		//对接接口
		var method = 'user/complete-info',
			params = {
				type: '2',
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
				//跳转到个人主页 后退一个页面
				wx.navigateBack({
					delta: 1
				});
			}
		});
	}
};

Page(conf);