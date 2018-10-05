var _api = require('./api.js');
var _fun = require('./fun.js');


var action = function(e, cb){
  var act = e.target.dataset.action;
  if (!act) act = e.currentTarget.dataset.action;
  
  if (_fun.actionArr && _fun.actionArr.indexOf(act)>-1){
    _fun.action(e, cb);
  
  }else{
    console.log('未知的事件：' + act);
  }
}


var nicebox = {
  api: _api,
  fun: _fun,
  action: action
}

nicebox.register = function (d) {
  _api.register(d);
  _fun.register(d);

  d.setData({
    showblock: {
      isshowblock: 'none'
    }
  })


  // var app = getApp();
  // if (!app.globalData.homePageUrl){
  //   app.globalData.homePageUrl = '/'+d.route;
  // }
}

module.exports = nicebox;