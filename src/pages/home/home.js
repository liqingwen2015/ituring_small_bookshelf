// pages/books/books.js

// 获取服务器接口地址
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
        indicatorDots: false, // 是否显示轮播指示点
        autoplay: true, // 是否自动播放轮播
        interval: 5000, // 轮播间隔
        duration: 1000, // 轮播播放延迟
        circular: true, // 是否采用衔接滑动
        sideMargin: '100rpx', // 幻灯片前后边距
        isLoading: true // 是否显示loading态
    },

    /**
     * 打开书籍详情页面
     */
    goDetail: function (ev) {
        let info = ev.currentTarget.dataset;
        nvgt.navigateTo('../detail/detail', info);
    },

    // 获取首页的书籍
    getBooksOfIndex: function () {
        let that = this;
        let key = 'BooksOfHome';
        var res = cache.getSync(key);

        if (!res) {
            http.get(api.getBooksOfIndex, function (res) {
                that.setData({
                    list: res.books,
                    isLoading: false
                });

                cache.set(key, res.books)
            });
        } else {
            that.setData({
                list: res,
                isLoading: false
            });
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that = this;
        if (that.list == null || that.list.length == 0) {
            that.getBooksOfIndex();
        }
    },

    /**
     * 设置页面转发信息
     */
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '小书架首页',
            path: '/pages/books/books',
            imageUrl: '/images/bookstore.png',
            success: function (res) {
                // 转发成功
                console.log('转发成功');
            },
            fail: function (res) {
                // 转发失败
                console.log('转发失败')
            }
        }
    }
});