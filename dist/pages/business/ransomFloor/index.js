'use strict';
//赎楼
var BaseUtils = require('./../../../utils/base.js');
const ImageUploader = require('../../common/imageUploader/imageUploader.js');
const conf = {
	data: {
		uploadImgObj: ImageUploader.mergeData({
			imageUploadTitle: '资料上传',
			sourceType: ['camera', 'album'], //上传图片的来源，相机/相册
			sizeType: ['compressed'], //上传前是否压缩，默认压缩
			maxCount: 1, //一次选择图片的数量
			//以上三个配置项详情请看小程序文档
			uploadedImagesPaths: [], //保存已上传的图片路径，也可以设置初始时就显示的图片
			uploadParams: {
				url: '', //后台接收上传图片的路径
				name: 'file', //后台依靠这个字段拿到文件对象
				formData: {} //这个字段可以设置传到后台的额外的参数
				//以上三个配置项详情请看小程序文档
			}
		}),
	},
	onLoad() {
		new ImageUploader(this, 'uploadImgObj');
	},
	formSubmit(e) {
		console.log(this.data.uploadImgObj);
		var baseUtils = BaseUtils.base;
		console.log('form发生了submit事件，携带数据为：', e.detail.value);
		var contacts = baseUtils.trimFunction(e.detail.value.contacts);
		var contactsTel = baseUtils.trimFunction(e.detail.value.contactsTel);
		var profession = baseUtils.trimFunction(e.detail.value.profession);
		var buildingName = baseUtils.trimFunction(e.detail.value.buildingName);
		var bank = baseUtils.trimFunction(e.detail.value.bank);
		var money = baseUtils.trimFunction(e.detail.value.money);
		var useDays = baseUtils.trimFunction(e.detail.value.useDays);
		var remark = baseUtils.trimFunction(e.detail.value.remark);
		//提交到服务器

		if (!(!!contacts && contacts.length > 1)) {
			//提示
			wx.showModal({
				content: '请输入联系人！',
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
		if (!(!!profession && profession.length > 1)) {
			//提示
			wx.showModal({
				content: '请输入职业！',
				showCancel: false,
				success: function(res) {}
			});
			return;
		}
		if (!(!!buildingName && buildingName.length > 1)) {
			//提示
			wx.showModal({
				content: '请输入房子所在楼盘名称！',
				showCancel: false,
				success: function(res) {}
			});
			return;
		}
		if (!(!!bank && bank.length > 1)) {
			//提示
			wx.showModal({
				content: '请输入贷款所在银行！',
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
		if (!(!!recentlyDate && recentlyDate.length > 1)) {
			//提示
			wx.showModal({
				content: '请输入最早用款日！',
				showCancel: false,
				success: function(res) {}
			});
			return;
		}
		if (!(!!useDays && useDays.length > 1)) {
			//提示
			wx.showModal({
				content: '请输入预计使用多久！',
				showCancel: false,
				success: function(res) {}
			});
			return;
		}
		var obj = {};
		obj["contacts"] = contacts;
		//获取用户图像信息
		obj["contactsTel"] = contactsTel;
		obj["profession"] = profession;
		obj["buildingName"] = buildingName;
		obj["bank"] = bank;
		obj["money"] = money;
		obj["useDays"] = useDays;
		obj["remark"] = remark;
		var sid = BaseUtils.base.getSessionStorage("sid");
		var uid = BaseUtils.base.getSessionStorage("uid");
		//调用登录接口
		var method = 'home/appointment',
			params = {
				cate: 2,
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
	bindTextAreaBlur(e) {
		console.log(e.detail.value)
	},
	//获取赎楼的信息
	getRansomFloorInfo() {
		var sid = BaseUtils.base.getSessionStorage("sid");
		var uid = BaseUtils.base.getSessionStorage("uid");
		//调用登录接口
		var method = 'appointment/appointment/redeem-building-info',
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