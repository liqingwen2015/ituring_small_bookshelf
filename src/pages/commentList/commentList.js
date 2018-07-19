const api = require('../../config/config.js');
const nvgt = require('../../utils/navigator.js');
const http = require('../../utils/http.js');
const cache = require('../../utils/cache.js');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        isLoading: true
    },

    // 跳转到评论页
    goComment: function () {
        nvgt.redirectTo('../comment/comment');
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
    onShow: function () {
        let that = this;
        let key = `CommentList`;
        http.get(api.getComments, function (data) {
            that.setData({
                list: data,
                isLoading: false
            })
            cache.set(key, data);
        }, function () {
            let val = cache.getSync(key);

            if (val) {
                that.setData({
                    list: val,
                    isLoading: false
                });
            }
        })
    }
});