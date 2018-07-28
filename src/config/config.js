const key = require('const.js');

// 服务器域名
const baseUrl = key.urlPrefix.server;
//const baseUrl = key.urlPrefix.local;

//获取首页的图书
const getBooksOfIndex = baseUrl + 'books/v1/index';

//获取图书列表
const getBooksByShowType = baseUrl + 'books/v1/list';

//获取图书
const getBook = baseUrl + 'books/v1/detail';

// 保存用户信息
const saveUserInfo = baseUrl + 'account/v1/save';

// 提交评论
const submitComment = baseUrl + 'comment/v1/submit';

// 获取评论
const getComments = baseUrl + 'comment/v1/list';

// 获取历史上的今天
const getTodayOfHistory = baseUrl + 'home/v1/today';

module.exports = {
    getBooksOfIndex: getBooksOfIndex,
    getBooksByShowType: getBooksByShowType,
    getBook: getBook,
    saveUserInfo: saveUserInfo,
    submitComment: submitComment,
    getComments: getComments,
    getTodayOfHistory: getTodayOfHistory
};