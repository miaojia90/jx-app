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
		arrayItemType: ['请选择', '国土抵押加急', '国土注册加急', '国土过户加急', '公证加急', '做流水', '做主体', '跨行过桥', '抵押', '淘宝拍卖'],
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
	}
};

Page(conf);