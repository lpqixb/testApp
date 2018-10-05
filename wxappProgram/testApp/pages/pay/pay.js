// pages/pay/pay.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasAuth: true,
    array: ['0.01','0.88','5.20','16.80', '100.00'],
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.nicebox.register(that);
    app.nicebox.fun.getAuth(function (result) {
      console.log("ressss:", result);
      that.setData(result);
      if (result['hasMobile'] == false) {
        app.nicebox.fun.turnToPage("/pages/bindmobile/bindmobile");
      }
    });


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindAction: function (e) {
    app.nicebox.action(e);
  },
  getUserInfo: function (e) {
    app.nicebox.fun.getAuth(function (result) {
      console.log("ressss:", result);
      if (result['hasMobile'] == false) {
        app.nicebox.fun.turnToPage("/pages/bindmobile/bindmobile", true);
      }
    });
  },
  bindPickerChange: function(e){

    var index = e.detail.value;
    // var price = this.data.array[index];
    this.setData({
      index: index
    })
    // console.log("bindPickerChange:", e);
    // console.log('picker发送选择改变，携带值为', e.detail.value);
    // console.log("price:", price);



  },
  formSubmit: function (e) {
    var that = this;
    var val = e.detail.value;
    
    if (val.input == ""){
      app.nicebox.fun.showModal({ content:'请输入你的大名'});
      return;
    }

    var json={};
    json['value'] = that.data.array[val['picker']];
    json['username'] = val.input;
    json['openid'] = that.data.openid;
    json['mobile'] = that.data.mobile;
    json['uid'] = that.data.user_id;
    

    app.nicebox.api.RequestAPI('pay', 'index', json, function (res) {
      var result = res.data;
      wx.requestPayment(
        {
          'timeStamp': result['timeStamp'],
          'nonceStr': result['nonceStr'],
          'package': result['package'],
          'signType': result['signType'],
          'paySign': result['paySign'],
          'success': function (res) {
            // console.log('sss1：', res);
            app.nicebox.fun.showToast({
              title: '谢谢打赏'
            });
          },
          'fail': function (res) {
            app.nicebox.fun.showToast({
              title: '打赏失败'
            });
          },
          'complete': function (res) {
            
          }
        })

    });
    
  }
})