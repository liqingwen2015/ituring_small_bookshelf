// 文件

// 新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
const openDocument = (filePath) => {
    wx.openDocument({
        filePath: filePath,
        success: function (res) {
            //console.log('打开文档成功')
        }
    })
}



module.exports = {
    openDocument: openDocument,

}