'use strict';
const ImageUploader = require('../../common/imageUploader/imageUploader.js');
const conf = {
	data: {
		uploadImgObj: ImageUploader.mergeData({
			imageUploadTitle: '上传物业现状图片（定位截图、路、正面、大厅、房间、阳台景观）',
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
		arrayItemType: ['请选择', '厂房', '土地', '自建房', '商品房', '商铺'],
		arrayItemAttribute: ['请选择', '商业', '商住', '住宅', '划拨'],
		itemTypeIndex: 0,
		itemAttributeIndex: 0,
		propertyItem: null,
		itemsLoanProperty: [{
			name: '0',
			value: '未知',
			checked: 'true'
		}, {
			name: '1',
			value: '一般物业【没有贷款】'
		}, {
			name: '2',
			value: '贷款物业【正常贷款】'
		}, {
			name: '3',
			value: '已逾期'
		}, {
			name: '4',
			value: '已查封'
		}, {
			name: '5',
			value: '已判决'
		}, {
			name: '6',
			value: '已在淘宝拍卖'
		}]
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
	attributeBindPickerChange(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			itemAttributeIndex: e.detail.value
		});
	},
	checkboxChange: function(e) {
		console.log('checkbox发生change事件，携带value值为：', e.detail.value);
		var propertyItem = e.detail.value;
		var propertyItemStr = null;
		for (var i = 0; i < propertyItem.length; i++) {
			propertyItemStr = propertyItemStr + propertyItem[i] + ',';
		}
		propertyItemStr = propertyItemStr.substring(0, propertyItemStr.length - 1);
		this.setData({
			propertyItem: propertyItemStr
		});
	},
	formSubmit(e) {
		var baseUtils = BaseUtils.base;
		console.log('form发生了submit事件，携带数据为：', e.detail.value);
		var owner = baseUtils.trimFunction(e.detail.value.owner);
		var contacts = baseUtils.trimFunction(e.detail.value.contacts);
		var contactsTel = baseUtils.trimFunction(e.detail.value.contactsTel);
		var landArea = baseUtils.trimFunction(e.detail.value.landArea);
		var buildingArea = baseUtils.trimFunction(e.detail.value.buildingArea);
		var cate = this.data.itemTypeIndex;
		var cateProperty = this.data.itemAttributeIndex;
		var property = this.data.propertyItem;
		// var property=
		if (!(!!owner && owner.length > 1)) {
			//提示
			wx.showModal({
				content: '请输入业主名称！',
				showCancel: false,
				success: function(res) {}
			});
			return;
		}
		if (!(!!contacts && contacts.length > 1)) {
			//提示
			wx.showModal({
				content: '请输入联系人(与业主关系)！',
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
		if (!(!!landArea && landArea.length > 1)) {
			//提示
			wx.showModal({
				content: '请输入土地面积！',
				showCancel: false,
				success: function(res) {}
			});
			return;
		}
		if (!(!!buildingArea && buildingArea.length > 1)) {
			//提示
			wx.showModal({
				content: '请输入建筑面积！',
				showCancel: false,
				success: function(res) {}
			});
			return;
		}
		var obj = {};
		obj["cate"] = cate;
		//获取用户图像信息
		obj["cateProperty"] = cateProperty;
		obj["contactsTel"] = contactsTel;
		obj["owner"] = owner;
		obj["contacts"] = contacts;
		obj["contactsTel"] = contactsTel;
		obj["landArea"] = landArea;
		obj["buildingArea"] = buildingArea;
		obj["property"] = property;
		var sid = BaseUtils.base.getSessionStorage("sid");
		var uid = BaseUtils.base.getSessionStorage("uid");
		//调用登录接口
		var method = 'home/appointment',
			params = {
				cate: 3,
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
	//获取物业的信息
	getPropertyInfo() {
		var sid = BaseUtils.base.getSessionStorage("sid");
		var uid = BaseUtils.base.getSessionStorage("uid");
		//调用登录接口
		var method = 'appointment/estate-info',
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