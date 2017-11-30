'use strict';
const ImageUploader = require('../../common/imageUploader/imageUploader.js');
const conf = {
	data: {
		uploadImgObj: ImageUploader.mergeData({
			imageUploadTitle: '上传受理回执',
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
		arrayItemType: ['未知', '国土抵押加急', '国土注册加急', '国土过户加急', '公证加急', '做流水', '做主体', '跨行过桥', '抵押', '淘宝拍卖'],
		itemTypeIndex: 0,
	},
	onLoad() {
		new ImageUploader(this, 'uploadImgObj');
	},
	bindTextAreaBlur(e) {
		console.log(e.detail.value)
	},
	bindPickerChange(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			itemTypeIndex: e.detail.value
		});
	},
	checkboxChange: function(e) {
		console.log('checkbox发生change事件，携带value值为：', e.detail.value)
	},
	formSubmit(e) {
		var baseUtils = BaseUtils.base;
		console.log('form发生了submit事件，携带数据为：', e.detail.value);
		var contacts = baseUtils.trimFunction(e.detail.value.contacts);
		var contactsTel = baseUtils.trimFunction(e.detail.value.contactsTel);
		var remark = baseUtils.trimFunction(e.detail.value.remark);
		var cate = this.data.itemTypeIndex;
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
		var obj = {};
		//获取用户图像信息
		obj["contacts"] = contacts;
		obj["contactsTel"] = contactsTel;
		obj["remark"] = remark;
		obj["cate"] = cate;
		var sid = BaseUtils.base.getSessionStorage("sid");
		var uid = BaseUtils.base.getSessionStorage("uid");
		//调用登录接口
		var method = 'home/appointment',
			params = {
				cate: 4,
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
	getOtherInfo() {
		var sid = BaseUtils.base.getSessionStorage("sid");
		var uid = BaseUtils.base.getSessionStorage("uid");
		//调用登录接口
		var method = 'appointment/other-info',
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