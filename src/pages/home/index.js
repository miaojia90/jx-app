'use strict';
var choose_year = null,
	choose_month = null;
const conf = {
	data: {
		hasEmptyGrid: false,
		showPicker: false
	},
	onLoad() {
		const date = new Date();
		const cur_year = date.getFullYear();
		const cur_month = date.getMonth() + 1;
		const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
		this.calculateEmptyGrids(cur_year, cur_month);
		this.calculateDays(cur_year, cur_month);
		this.setData({
			cur_year,
			cur_month,
			weeks_ch
		});
	},
	getThisMonthDays(year, month) {
		return new Date(year, month, 0).getDate();
	},
	getFirstDayOfWeek(year, month) {
		return new Date(Date.UTC(year, month - 1, 1)).getDay();
	},
	calculateEmptyGrids(year, month) {
		const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
		let empytGrids = [];
		if (firstDayOfWeek > 0) {
			for (let i = 0; i < firstDayOfWeek; i++) {
				empytGrids.push(i);
			}
			this.setData({
				hasEmptyGrid: true,
				empytGrids
			});
		} else {
			this.setData({
				hasEmptyGrid: false,
				empytGrids: []
			});
		}
	},
	calculateDays(year, month) {
		let days = [];

		const thisMonthDays = this.getThisMonthDays(year, month);

		for (let i = 1; i <= thisMonthDays; i++) {
			days.push({
				day: i,
				choosed: false
			});
		}

		this.setData({
			days
		});
	},
	handleCalendar(e) {
		const handle = e.currentTarget.dataset.handle;
		const cur_year = this.data.cur_year;
		const cur_month = this.data.cur_month;
		if (handle === 'prev') {
			let newMonth = cur_month - 1;
			let newYear = cur_year;
			if (newMonth < 1) {
				newYear = cur_year - 1;
				newMonth = 12;
			}

			this.calculateDays(newYear, newMonth);
			this.calculateEmptyGrids(newYear, newMonth);

			this.setData({
				cur_year: newYear,
				cur_month: newMonth
			});

		} else {
			let newMonth = cur_month + 1;
			let newYear = cur_year;
			if (newMonth > 12) {
				newYear = cur_year + 1;
				newMonth = 1;
			}

			this.calculateDays(newYear, newMonth);
			this.calculateEmptyGrids(newYear, newMonth);

			this.setData({
				cur_year: newYear,
				cur_month: newMonth
			});
		}
	},
	tapDayItem(e) {
		const idx = e.currentTarget.dataset.idx;
		const days = this.data.days;
		days[idx].choosed = !days[idx].choosed;
		this.setData({
			days,
		});
	},
	chooseYearAndMonth() {
		const cur_year = this.data.cur_year;
		const cur_month = this.data.cur_month;
		let picker_year = [],
			picker_month = [];
		for (let i = 1900; i <= 2100; i++) {
			picker_year.push(i);
		}
		for (let i = 1; i <= 12; i++) {
			picker_month.push(i);
		}
		const idx_year = picker_year.indexOf(cur_year);
		const idx_month = picker_month.indexOf(cur_month);
		this.setData({
			picker_value: [idx_year, idx_month],
			picker_year,
			picker_month,
			showPicker: true,
		});
	},
	pickerChange(e) {
		const val = e.detail.value;
		choose_year = this.data.picker_year[val[0]];
		choose_month = this.data.picker_month[val[1]];
	},
	tapPickerBtn(e) {
		const type = e.currentTarget.dataset.type;
		const o = {
			showPicker: false,
		};
		if (type === 'confirm') {
			o.cur_year = choose_year;
			o.cur_month = choose_month;
			this.calculateEmptyGrids(choose_year, choose_month);
			this.calculateDays(choose_year, choose_month);
		}

		this.setData(o);
	},
	bindBridgeLoan(e) {
		var type = e.currentTarget.dataset.type;
		switch (type) {
			case 'bridge':
				//跳转到相对于的页面
				wx.navigateTo({
					url: '../business/bridgeLoan/index'
				});
				break;
			case 'floor':
				//跳转到相对于的页面
				wx.navigateTo({
					url: '../business/ransomFloor/index'
				});
				break;
			case 'property':
				//跳转到相对于的页面
				wx.navigateTo({
					url: '../business/property/index'
				});
				break;
			case 'others':
				//跳转到相对于的页面
				wx.navigateTo({
					url: '../business/others/index'
				});
				break;
		}
	},
	//获取月排表数据
	getMonthTable() {
		var d = new Date();
		var strDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
		var method = 'home/month-table',
			params = {
				size: 30,
				date: strDate
			};
		BaseUtils.base.getDataGetApi(method, params, function(data) {
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
				var dataInfo = dataResult.result.data;
				//提示数据到界面上 获取月排表数据

			} else {
				return;
			}
		});
	}
};

Page(conf);