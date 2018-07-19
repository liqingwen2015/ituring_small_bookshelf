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

const saveUserInfo = baseUrl + 'account/v1/save';

const submitComment = baseUrl + 'comment/v1/submit';

const getComments = baseUrl + 'comment/v1/list';

module.exports = {
    getBooksOfIndex: getBooksOfIndex,
    getBooksByShowType: getBooksByShowType,
    getBook: getBook,
    saveUserInfo: saveUserInfo,
    submitComment: submitComment,
    getComments: getComments
};