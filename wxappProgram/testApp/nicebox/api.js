var _target = {};


var register = function (target) {
  _target = target;
}


var RequestAPI = function(name, ctrl, params, callback){
  var app = getApp();
  var data = params || {};
  app.nicebox.fun.showToast({
    title: 'loading',
    icon: 'loading'
  });
  
  wx.request({
    url: 'https://www.eesaler.com/test_app/api.php?mod='+name+'&act='+ctrl, //仅为示例，并非真实的接口地址
    data: data,
    method:'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success(res) {
      //console.log(res.data)
      if (typeof callback == 'function') {
        callback(res);
        return;
      }
    },
    fail(res){

      //console.log(res)
    },
    complete(res) {
      app.nicebox.fun.hideToast();
    }
  })



}







module.exports = {
  register: register,
  RequestAPI: RequestAPI
}