var nicebox = require('./nicebox/nicebox.js');
//app.js
App({
  nicebox: nicebox,
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
  },
  globalData: {
    userInfo: null
  }
})

