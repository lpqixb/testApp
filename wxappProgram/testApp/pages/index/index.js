//index.js

//获取应用实例
const app = getApp();

Page({
  data: {
    hasAuth: true,
    xlogo: "icon-iconset0143",
    date_cur: '0000-00-00',
    date_start: '0000-00-00',
    date_end: '0000-00-00'
  },
  onLoad: function () {

  },
  onShow:function(){
    var that = this;
    app.nicebox.register(that);
    app.nicebox.fun.getAuth(function (result) {
      if (result['hasMobile'] == false) {
        app.nicebox.fun.turnToPage("/pages/bindmobile/bindmobile", true);
      }
    });
    var date = that.getDate();
    that.setData({ "date_cur": date });
    that.setData({ "date_end": date });
  },
  bindDateChange: function(e){
    var that = this;
    var date = e.detail.value;
    that.setData({ "date_cur": date });
    console.log("bindDateChange:", e);
  },
  bindAction: function(e){
    app.nicebox.action(e);
  },
  getUserInfo: function (e) {
    app.nicebox.fun.getAuth(function (result) {
      if (result['hasMobile'] == false) {
        app.nicebox.fun.turnToPage("/pages/bindmobile/bindmobile", true);
      }
    });
  },
  getDate: function () {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var clock = year + "-";
    if (month < 10)
      clock += "0";
    clock += month + "-";
    if (day < 10)
      clock += "0";
    clock += day;
    return clock;
  },
  testClick:function(){
    var that = this;
    var date = that.data.date_cur;
    app.nicebox.api.RequestAPI('index', 'testresult', { "date": date}, function (res) {
      var result = res.data;
      if (result['code'] == 200){
        that.setData({
          hasResult: true,
          xname: result['xname'],
          xdesc: result['xdesc'],
          xlogo: result['xlogo'],
        });
      }
    });

  },
  retestClick:function(){
    var that = this;
    that.setData({
      hasResult: false,
      xname: "",
      xdesc: "",
      xlogo: "icon-iconset0143",
    });
  }
})
