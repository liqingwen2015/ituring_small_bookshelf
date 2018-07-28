const api = require('../../config/config.js');
const cache = require('../../utils/cache.js');
const tip = require('../../utils/tip.js');
const http = require('../../utils/http.js');



Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        today: '',
        isLoading: true
    },

    // 加载数据
    loadData: function () {
        let that = this;
        let key = 'Today';

        http.get(api.getTodayOfHistory, function (res) {
            that.setData({
                list: res.result,
                today: res.today,
                isLoading: false
            });

            cache.set(key, res);
        })
    },

    onLoad: function () {
        //this.loadData();
    },

    onShow: function () {
        this.loadData();
    }
});