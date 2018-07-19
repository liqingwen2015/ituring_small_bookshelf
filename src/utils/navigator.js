// 导航

// Tip
// 1: wx.navigateTo 和 wx.redirectTo 不允许跳转到 tabbar 页面，只能用 wx.switchTab 跳转到 tabbar 页面

// 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面
const navigateTo = (url, obj) => {
    wx.navigateTo({
        url: handleUrl(url, obj)
    })
}

// 关闭当前页面，跳转到应用内的某个页面
const redirectTo = (url, obj) => {
    wx.redirectTo({
        url: url
    })
}

// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
const switchTab = (url) => {
    wx.switchTab({
        url: url
    })
}

// 处理 url
const handleUrl = (url, obj) => {
    if (obj) {
        url = url + '?';
        for (let key in obj) {
            obj[key] = encodeURIComponent(obj[key]);
            url += key + '=' + obj[key] + '&';
        }

        return url = url.substring(0, url.length - 1);
    }
    return url;
}

// 关闭当前页面，返回上一页面或多级页面
const navigateBack = (delta) => {
    wx.navigateBack({
        delta: delta
    })
}

module.exports = {
    navigateTo: navigateTo,
    redirectTo: redirectTo,
    switchTab: switchTab,
    navigateBack: navigateBack
}