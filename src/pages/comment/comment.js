/** pages/comment/comment.js **/

// 获取服务器接口地址
const api = require('../../config/config.js');
const tip = require('../../utils/tip.js');
const http = require('../../utils/http.js');
const nvgt = require('../../utils/navigator.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        comment: '',

    },

    /**
     * 用户输入评论
     */
    inputComment: function (ev) {
        let that = this;
        that.setData({
            comment: ev.detail.value
        });
    },

    /**
     * 检查输入是否为空
     */
    checkEmpty: function (input) {
        return input === '';
    },

    /**
     *  检查用户是否输入了非法字符
     */
    checkIllegal: function (input) {
        let patern = /[`#^<>:"?{}\/;'[\]]/im;
        let _result = patern.test(input);
        return _result;
    },

    /**
     * 检查用户输入
     */
    checkUserInput: function () {
        let that = this;
        let comment = that.data.comment;
        let showToastFlag = true;
        let toastWording = '';

        if (that.checkEmpty(comment)) {
            toastWording = '输入不能为空';
        } else if (that.checkIllegal(comment)) {

            toastWording = '含有非法字符';
        } else if (comment.length > 300) {
            toastWording = '长度超出限制';
        } else if (comment.length < 5) {
            toastWording = '不能少于5个字哦';
        } else {
            showToastFlag = false;
        }

        if (showToastFlag) {
            tip.showToast(toastWording);
            return false;
        } else {
            return true;
        }
    },

    /**
     * 提交评论内容
     */
    submitComment: function (ev) {

        let that = this;

        let formId = ev.detail.formId;

        let userId = wx.getStorageSync('userId');

        if (!userId) {
            let toastWording = '请先登录';
            tip.showToast(toastWording);
            return false;
        }

        if (that.checkUserInput()) {
            let requestData = {
                content: that.data.comment,
                wxUserId: userId
            };

            http.post(api.submitComment, requestData, function () {
                tip.showToast('成功！', 'success');
                nvgt.redirectTo('../commentList/commentList');
            });

        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {;
    }
});