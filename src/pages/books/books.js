// pages/books/books.js

// 获取服务器接口地址
const api = require('../../config/config.js');
const nvgt = require('../../utils/navigator.js');
const http = require('../../utils/http.js');
// 获取app应用实例
const app = getApp();


Page({

    /**
     * 页面的初始数据
     */
    data: {
        indicatorDots: false, // 是否显示轮播指示点
        autoplay: true, // 是否自动播放轮播
        interval: 5000, // 轮播间隔
        duration: 1000, // 轮播播放延迟
        circular: true, // 是否采用衔接滑动
        sideMargin: '100rpx', // 幻灯片前后边距
        showLoading: true, // 是否显示loading态
        isNewest: true,
        isHot: false,
        isCommendatory: false,
        list: [],
    },

    // 切换类型
    toggelType(ev) {
        let that = this;
        let info = ev.currentTarget.dataset;

        let typeObj = {
            isNewest: false,
            isHot: false,
            isCommendatory: false,
            showLoading: false
        };

        switch (info.type) {
            case '1':
                typeObj.isNewest = true;
                break;
            case '2':
                typeObj.isHot = true;
                break;
            case '3':
                typeObj.isCommendatory = true;
                break;
            default:
                typeObj.isNewest = true;
                break;
        }

        that.getList(info.type);
        that.setData(typeObj);
    },

    // 跳转到详情页面
    goDetail: function (ev) {
        let info = ev.currentTarget.dataset;
        nvgt.navigateTo('../detail/detail', info);
    },

    // 获取列表
    getList: function (type) {
        type = type || 1;
        let that = this;

        http.get(that.createRequestUrlOfGetList(type), function (res) {
            that.setData({
                list: res.books
            });
        })

    },

    // 生成请求 url
    createRequestUrlOfGetList: function (type) {
        return api.getBooksByShowType + `/${type}/1`;
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        that.getList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },

    /**
     * 设置页面转发信息
     */
    onShareAppMessage: function (res) {
        console.log(res);

        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }

        return {
            title: '图灵书籍',
            path: '/pages/home/home',
            imageUrl: '/images/bookstore.png',
            success: function (res) {
                console.log('转发成功');
            },
            fail: function (res) {
                console.log('转发失败')
            }
        }
    }
});