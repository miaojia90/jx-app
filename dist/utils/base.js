/*
 * 公共的基础类
 * @Author   major.miao
 * @DateTime 2016-11-25
 */
var Base = {
    // routerUrl: "https://wx.jinfuzi.net/",
    routerUrl: 'https://wx.jinfuzi.com/',
    //加密的Key值
    publicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJHooMe+cMSx/thsHtXv7ZzhD7h/7eyuC7Qc0j99mwNeoOLu1PBe/gZL4x/Dix2sykvqs0ED6vma5+cPfiGUdAh/aANoSvGG4VpczHIvhz/yEPJ5pgWGjiI8m9fezzKHuarmBLiRqit+yLbLPpTSeaY5EjxUaUF/ltWpwn6+LpQwIDAQAB",
    //公共的数据
    data: {
        storageKeys: {}
    },
    //去掉字符串前后空格
    trimFunction: function(str) {
        if (!name) {
            return "";
        }
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    getNowFormatDate: function() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + (date.getHours() > 9 ? date.getHours() : "0" + date.getHours()) + seperator2 + (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()) + seperator2 + (date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds());
        return currentdate;
    },
    // 同步储存数据到sesstionStorage
    setSessionStorage: function(name, value) {
        if (!name) {
            return;
        }
        return wx.setStorageSync(name, value);

    },
    // 同步获取sesstionStorage数据到
    getSessionStorage: function(name) {
        if (!name) {
            return;
        }
        return wx.getStorageSync(name);
    },
    //手机号码检查
    checkMobile: function(phoneNumer) {
        var re = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;
        var flag = false;
        if (re.test(phoneNumer)) {
            flag = true;
        } else {
            flag = false;
        }
        return flag;
    },
    //邮箱检查
    checkEmail: function(mail) {
        var flag = false;
        var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (reg.test(mail)) {
            flag = true;
        } else {
            flag = false;
        }
        return flag;
    },
    //密码检查
    checkPwd: function(password) {
        // var re = /^(?=.{6,16})(?=.*[a-zA-Z])(?=.*[0-9])[0-9a-zA-Z]*$/ ;
        var flag = false;
        if (password.length >= 6 && password.length <= 20) {
            flag = true;
        } else {
            flag = false;
        }
        return flag;

        return true;
    },
    //验证码检查
    checkCode: function(codeNumber) {
        var re = /^\d{6}$/;
        var flag = false;
        if (re.test(codeNumber)) {
            flag = true;
        } else {
            flag = false;
        }
        return flag;
    },
    //验证身份证号码
    checkIDCard: function(idCard) {
        var re = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        var flag = false;
        if (re.test(idCard)) {
            flag = true;
        } else {
            flag = false;
        }
        return flag;
    },
    // 获取 url 中的参数值
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    },
    //过滤特殊字符正则表达式
    filterSpecialCode: function(str) {
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
        var rs = "";
        for (var i = 0; i < str.length; i++) {
            rs = rs + str.substr(i, 1).replace(pattern, '');
        }
        return rs;
    },
    formartPhone: function(phone) {
        var phoneNum = phone;
        //手机分割
        var checkPhoneNum = /^1[3|4|5|8][0-9]\d+$/;
        if (checkPhoneNum.test(phoneNum) && phoneNum.length == 4) {
            return phoneNum.substring(0, 3) + "-" + phoneNum.substring(3, phoneNum.length);
        }
        checkPhoneNum = /^1[3|4|5|8][0-9]-\d{5}$/;
        if (checkPhoneNum.test(phoneNum) && phoneNum.length == 9) {
            return phoneNum.substring(0, 8) + "-" + phoneNum.substring(8, phoneNum.length);
        }
        checkPhoneNum = /^1[3|4|5|8][0-9]-\d{4}-\d{5}$/;
        if (checkPhoneNum.test(phoneNum) && phoneNum.length == 14) {
            return phoneNum.replace(/-/g, '');
        }
    },
    //去掉字符串前后空格
    trimFunction: function(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    //替换全部
    replaceAll: function(obj, str1, str2) {
        var result = obj.replace(new RegExp(str1, "gm"), str2);
        return result;
    },
    //过滤特殊字符
    stripscript: function() {

    },
    toDecimal: function(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    },
    //身份证号码识别年龄
    getAgeByIdCard: function(idCard) {
        var year = idCard.substring(6, 10);
        var month = idCard.substring(10, 12);
        var day = idCard.substring(12, 14);
        var myDate = new Date();
        var myMonth = myDate.getMonth() + 1;
        var myDay = myDate.getDate();
        var age = myDate.getFullYear() - year - 1;
        if (month < myMonth || month == myMonth && myDay <= day) {
            age++;
        }
        return age;
    },
    //json 转化
    json2Form: function(json) {
        var str = [];
        for (var p in json) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
        }
        return str.join("&");
    },
    //确认弹出框 add by:miaojia 2016-12-08
    openConfirm: function(titleTxt, contentTxt, confirmTxt, cancelTxt, successCallBack) {
        wx.showModal({
            title: titleTxt,
            content: contentTxt,
            confirmText: confirmTxt,
            cancelText: cancelTxt,
            success: function(res) {
                typeof successCallBack == 'function' && successCallBack(res.confirm);
            }
        });
    },
    //提示弹出框 Add by:miaojia 2016-12-08
    openAlert: function(contentTxt, succesCallback) {
        wx.showModal({
            content: contentTxt,
            showCancel: false,
            success: function(res) {
                typeof successCallBack == 'funciton' && succesCallback(res.confirm);
            }
        });
    },
    //toast 开发提示
    openToast: function(titleTxt) {
        wx.showToast({
            title: titleTxt,
            icon: 'success',
            duration: 30000
        });
    },
    //toast loading提示
    openLoading: function(titleTxt) {
        wx.showToast({
            title: titleTxt,
            icon: 'loading',
            duration: 3000
        });
    },
    openSelToast: function(that, toastText) {
        that.setData({
            toastFlag: true,
            toastTxt: toastText
        });
        setTimeout(function() {
            that.setData({
                toastFlag: false,
                toastTxt: null
            });
        }, 2000);
    },
    //两位小数
    //post请求封装
    getDataPostApi: function(method, params, succesCallback, errorCallback) {
        wx.getNetworkType({
            success: function(res) {
                // 返回网络类型, 有效值：
                // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
                var networkType = res.networkType
                if (networkType == 'none') {
                    wx.showModal({
                        title: '提示',
                        content: '当前网络没有连接，请连接网络后重试。'
                    });
                    return;
                } else {
                    var routerUrl = Base.routerUrl;
                    // openkey=wxsid
                    // jsonString={"cityname": "上海", "key": "1430ec127e097e1113259c5e1be1ba70"}
                    var openkey = Base.getSessionStorage(Base.data.storageKeys.wxId);
                    params = params.replace('jsonString=', "");
                    params = params.substring(0, params.length - 1);
                    params = params + ',"openkey":"' + openkey + '"}';
                    routerUrl += method;
                    wx.request({
                        url: routerUrl,
                        header: {
                            'content-type': 'application/json'
                        },
                        method: "POST",
                        data: params,
                        success: function(res) {
                            typeof succesCallback == 'function' && succesCallback(res.data);
                        },
                        fail: function(res) {
                            console.log('网络请求失败');
                            typeof errorCallback == 'function' && errorCallback();
                            return;
                        }
                    });
                }
            }
        });
    },
    //get请求封装
    getDataGetApi: function(method, params, succesCallback, errorCallback) {
        wx.getNetworkType({
            success: function(res) {
                // 返回网络类型, 有效值：
                // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
                var networkType = res.networkType
                if (networkType == 'none') {
                    wx.showModal({
                        title: '提示',
                        content: '当前网络没有连接，请连接网络后重试。'
                    });
                    return;
                } else {
                    var routerUrl = Base.routerUrl;
                    routerUrl += method;
                    var openkey = Base.getSessionStorage(Base.data.storageKeys.wxId);
                    var jsonstring = null;
                    jsonstring = params.replace('jsonString={"', "?");
                    jsonstring = Base.replaceAll(jsonstring, '":"', '=');
                    jsonstring = Base.replaceAll(jsonstring, '","', '&');
                    jsonstring = Base.replaceAll(jsonstring, '"}', '');
                    jsonstring = jsonstring + "&openkey=" + openkey;
                    routerUrl += jsonstring;
                    //微信小程序请求
                    wx.request({
                        url: routerUrl,
                        header: {
                            'content-type': 'application/json'
                        },
                        method: "GET",
                        complete: function(res) {
                            typeof succesCallback == 'function' && succesCallback(res.data);
                        },
                        fail: function(res) {
                            console.log('网络请求失败');
                            typeof errorCallback == 'function' && errorCallback();
                            return;
                        }
                    });
                }
            }
        });
    }
};

module.exports = {
    base: Base
}