//index.js

//获取应用实例
const app = getApp();

Page({
  data: {
    hasAuth: true,
    hasMobile:true
  },
  onLoad: function () {
    var that = this;
    app.nicebox.register(that);
    app.nicebox.fun.getAuth(function (result){
      that.setData({ 'authInfo': result});
    });
    



  },
  bindAction: function (e) {
    app.nicebox.action(e);
  },
  getUserInfo: function (e) {
    app.nicebox.fun.getAuth();
  },
  getPhoneNumber: function (e) {
    var that = this;
    e.authInfo = that.data.authInfo;
    app.nicebox.fun.bindPhoneNumber(e);
  }
})
