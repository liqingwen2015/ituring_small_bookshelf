// http 请求

const tip = require('tip.js');

// get
const get = (url, success = () => {}, fail = () => {}) => {
    wx.request({
        url: url,
        method: "GET",
        success: function (res) {
            if (res.statusCode === 200) {
                success(res.data.data);
                return true;
            }

            console.log(res);
            return false;
        },
        fail: function (err) {
            fail();
            tip.showToast('貌似网络不好哦！请在网络顺畅的时候重新操作！');
            console.log(err);
        }
    });
}

/**
 *  封装 post
 */
const post = (url, data, success = () => {}, fail = () => {}) => {
    wx.request({
        url: url,
        data: data,
        method: "POST",
        success: function (res) {
            if (res.statusCode === 200) {
                success();
                return true;
            }

            console.log(res);
            return false;
        },
        fail: function (err) {
            fail();
            console.log(err);
            tip.showToast('貌似网络不好哦！请在网络顺畅的时候重新操作！');
        }
    });
}

// 下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
const downloadFile = (url, success = () => {}, fail = () => {}, complete = () => {}) => {
    wx.downloadFile({
        url: url,
        success: function (res) {
            if (res.statusCode === 200) {
                success(res.tempFilePath);
                return true;
            }

            return false;
        },
        fail: function (err) {
            fail();
            tip.showToast("貌似失败了，请重试！多次失败请联系开发人员");
            console.log(err)
        },
        complete: function () {
            complete();
        }
    })
}

module.exports = {
    post: post,
    get: get,
    downloadFile: downloadFile
}