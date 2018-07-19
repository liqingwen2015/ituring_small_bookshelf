// pages/books/books.js

// 获取服务器接口地址
const api = require('../../config/config.js');
const nvgt = require('../../utils/navigator.js');
const tip = require('../../utils/tip.js');
// 获取app应用实例
const app = getApp();


Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasLogin: wx.getStorageSync('loginFlag') ? true : false
    },

    // 跳转到 关于
    goAbout: function () {
        nvgt.navigateTo('../about/about');
    },

    // 跳转到 评论
    goComment: function () {
        nvgt.navigateTo('../comment/comment');
    },

    // 跳转到 评论列表
    goCommentList: function () {
        nvgt.navigateTo('../commentList/commentList');

    },

    // 检查登录状态
    checkLoginStatus: function () {
        let that = this;
        let loginFlag = wx.getStorageSync('loginFlag');

        if (loginFlag) {
            // 检查 session_key 是否过期
            wx.checkSession({
                // session_key 有效(未过期)
                success: function () {
                    // 获取用户头像/昵称等信息
                    that.getUserInfo();
                },

                // session_key 已过期
                fail: function () {
                    that.setData({
                        hasLogin: false
                    });
                }
            });

        } else {
            that.setData({
                hasLogin: false
            });
        }
    },

    /**
     * 执行登录操作
     */
    doLogin: function (e) {
        let that = this;

        wx.showLoading({
            title: '登录中...',
            mask: true
        });

        app.doLogin(that.getUserInfo, e.detail.userInfo);
    },

    /**
     * 从 globalData 中获取 userInfo
     */
    getUserInfo: function () {
        let that = this;
        let userInfo = app.globalData.userInfo;

        if (userInfo) {
            that.setData({
                hasLogin: true,
                userInfo: userInfo
            });
            
            wx.hideLoading();

        } else {
            console.log('globalData中userInfo为空');
        }
    },

    onLoad: function () {
        this.checkLoginStatus();
    },

    onShow: function () {
        let that = this;
        that.setData({
            userInfo: app.globalData.userInfo
        });
    }
});