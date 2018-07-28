// 提示

// 显示消息提示框
const showToast = (title, icon = 'none', callback = () => {}) => {
    wx.showToast({
        title: title,
        icon: icon,
        duration: 2000,
        mask: true,
        success: callback
    });

}

// 显示模态弹窗
const showModal = (title, content, callback = () => {}) => {
    wx.showModal({
        title: title,
        content: content,
        success: callback
    });

}

module.exports = {
    showToast: showToast,
    showModal: showModal
}