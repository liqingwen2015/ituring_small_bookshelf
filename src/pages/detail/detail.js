// 获取服务器接口地址
const api = require('../../config/config.js');
const key = require('../../config/const.js');
const http = require('../../utils/http.js');
const file = require('../../utils/file.js');
const cache = require('../../utils/cache.js');
const tip = require('../../utils/tip.js');

Page({
    data: {
        bookIsBuy: 0,
        downloading: false,
        book: {},
        id: '',
        showLoading: true,
        isAllowDownload: false, //是否允许下载
        isDownloading: false //下载中标识
    },

    // 获取书籍
    getBook: function (id) {
        let that = this;
        let key = `Book_${id}`;
        let val = cache.getSync(key);
        let obj = {
            showLoading: false
        };

        if (val) {
            if (val.pdfUrl && val.pdfUrl.trim() !== '') {
                obj.isAllowDownload = true;
            }

            obj.book = val;
            that.setData(obj);
            return;
        }

        http.get(api.getBook + `/${id}`, function (data) {
            if (data.pdfUrl && data.pdfUrl.trim() !== '') {
                obj.isAllowDownload = true;
            }

            obj.book = data;
            that.setData(obj);

            cache.set(key, data);
        });
    },

    // 下载
    download: function () {
        let that = this;

        if (that.data.isDownloading) {
            tip.showToast('下载中，请稍安勿躁！！！');
            return;
        }

        let cachekey = `Book_PDF_${that.id}`;
        let path = cache.getSync(cachekey);

        if (!path) {
            that.setData({
                isDownloading: true
            });

            let pdfUrl = that.data.book.pdfUrl.split(',');
            
            http.downloadFile(key.urlPrefix.file + pdfUrl[0],
                function (filePath) {
                    file.openDocument(filePath);
                    cache.set(cachekey, filePath);
                },
                function () {
                    that.setData({
                        isDownloading: false
                    });
                });

            tip.showToast('已经开始下载，下载完毕后将自动打开，请稍后！！！');
            return;
        }

        file.openDocument(path);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let id = options.id;

        that.getBook(id);
        that.setData({
            id: id
        });
    },
});