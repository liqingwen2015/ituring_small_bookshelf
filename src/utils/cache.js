// http 请求

// 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口
const set = (key, data) => {
    wx.setStorage({
        key: key,
        data: data
    })
}

// 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
const setSync = (key, data) => {
    try {
        wx.setStorageSync(key, data)
    } catch (e) {
        console.log(e);
    }
}

// 从本地缓存中异步获取指定 key 对应的内容。
const get = (key, callback) => {
    wx.getStorage({
        key: key,
        success: callback
    })
}

// 从本地缓存中同步获取指定 key 对应的内容。
const getSync = (key) => {
    try {
        return wx.getStorageSync(key);
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
    set: set,
    setSync: setSync,
    get: get,
    getSync: getSync
}