const util = require('../../utils/util.js')
var app = getApp();
// pages/common/food/diancai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  onLoad: function (options) {
  var that = this;
  var outurl = decodeURIComponent(options.outurl);
  that.setData({
    outurl: outurl
  })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
  


  },

  returnFalse:function(e){
    return false;
  },

  
})