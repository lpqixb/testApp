var app = getApp();

var EARTH_RADIUS = 6378137.0;
var PI = Math.PI;


var _target = {};


var register = function (target) {
  _target = target;
}

var linkWebSocket = function (res) {
  var app = getApp();
  wx.connectSocket({
    url: app.globalData.apiWebSockUrl
  });
  wx.onSocketOpen(function (data) {
    console.log('WebSocket连接已打开！');
    var res2 = JSON.stringify(res);
    wx.sendSocketMessage({
      data: res2
    })
  });

  wx.onSocketMessage(function (data) {
    var objData = JSON.parse(data.data);
    console.log("mydata:", data);
    wx.closeSocket();
  });


  wx.onSocketError(function () {
    console.log('websocket连接失败！');
  });


  wx.onSocketClose(function (res) {
    console.log('WebSocket 已关闭！')
  });
}

var getRad = function (d) {
  return d * PI / 180.0;
}

var getFlatternDistance = function (lat1, lng1, lat2, lng2) {

  var f = getRad((lat1 + lat2) / 2);

  var g = getRad((lat1 - lat2) / 2);
  var l = getRad((lng1 - lng2) / 2);

  var sg = Math.sin(g);
  var sl = Math.sin(l);
  var sf = Math.sin(f);

  var s, c, w, r, d, h1, h2;
  var a = EARTH_RADIUS;
  var fl = 1 / 298.257;

  sg = sg * sg;
  sl = sl * sl;
  sf = sf * sf;

  s = sg * (1 - sl) + (1 - sf) * sl;
  c = (1 - sg) * (1 - sl) + sf * sl;

  w = Math.atan(Math.sqrt(s / c));
  r = Math.sqrt(s * c) / w;
  d = 2 * w * a;
  h1 = (3 * r - 1) / 2 / c;
  h2 = (3 * r + 1) / 2 / s;

  return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
}

var changeUnit = function (i) {
  if (i > 1000) {
    var ii = i / 1000;
    return Math.round(ii * 100) / 100 + "km";
  } else {
    return i + "m";
  }
}

var changeTime = function (i) {
  if (i >= 60) {
    var ii = i / 60;
    return Math.ceil(ii) + "小时";
  } else {
    return i + "分钟";
  }
}


var showToast = function (param) {
  wx.showToast({
    title: param.title,
    icon: param.icon,
    duration: param.duration || 1500,
    success: function (res) {
      typeof param.success == 'function' && param.success(res);
    },
    fail: function (res) {
      typeof param.fail == 'function' && param.fail(res);
    },
    complete: function (res) {
      typeof param.complete == 'function' && param.complete(res);
    }
  })
}

var hideToast = function () {
  wx.hideToast();
}


var showModal = function (param) {
  wx.showModal({
    title: param.title || '',
    content: param.content,
    showCancel: param.showCancel || false,
    cancelText: param.cancelText || '取消',
    cancelColor: param.cancelColor || '#000000',
    confirmText: param.confirmText || '确定',
    confirmColor: param.confirmColor || '#3CC51F',
    success: function (res) {
      if (res.confirm) {
        typeof param.confirm == 'function' && param.confirm(res);
      } else {
        typeof param.cancel == 'function' && param.cancel(res);
      }
    },
    fail: function (res) {
      typeof param.fail == 'function' && param.fail(res);
    },
    complete: function (res) {
      typeof param.complete == 'function' && param.complete(res);
    }
  })
}


var turnToPage = function (url, isRedirect) {
  if (!url) return;
  // if (url.substr(0, 1) == '?') {
  //   var page = getCurPage();
  //   url = '/' + page.route + url;
  // }
  // var checkurl = url;
  // var app = getApp();
  // if (checkurl.indexOf('?') > -1) {
  //   checkurl = url.substr(0, url.indexOf('?'));
  //   var query = url.substr(url.indexOf('?') + 1);
  //   app.globalData.pageQuery = query;
  // } else {
  //   app.globalData.pageQuery = '';
  // }
  // var tabBarPagePathArr = JSON.parse(getApp().globalData.tabBarPagePathArr);

  // if (tabBarPagePathArr.indexOf(checkurl) != -1) {
  //   var pageurl = getCurrentPageUrl();
  //   if (pageurl == checkurl) {
  //     wx.reLaunch({
  //       url: checkurl
  //     });
  //   } else {
  //     wx.switchTab({
  //       url: checkurl
  //     });
  //   }
  //   return;
  // }
  // var pages = getCurrentPages();
  // if (pages.length >= 5) isRedirect = true;

  if (!isRedirect) {
    wx.navigateTo({
      url: url
    });
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

var turnBack = function (options) {
  wx.navigateBack({
    delta: options ? (options.delta || 1) : 1
  });
}


var formDataCheck = function (regOption, e) {

  for (var i in regOption) {
    var item = regOption[i];
    if (item.ismust && item.check) {
      var val = e.detail.value[item.name];
      if (typeof val == 'undefined' || val.length == 0) {
        showModal({ content: '请填写' + item.text });
        return false;
      }
      var reg = new RegExp(item.check, "i");
      if (!reg.test(val)) {
        showModal({
          content: item.warning
        });

        return false;
      }
    }
  }

  return true;
}


var formInputCheck = function (e) {
  var sReg = e.target.dataset.check;
  if (sReg) {
    var reg = new RegExp(sReg, "i");
    if (!reg.test(e.detail.value)) {

      showModal({
        content: e.target.dataset.warning
      });
      return false;
    } else {

    }
  }
  return true;
}


var getCurPage = function () {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  return page;
}


var getCurrentPageUrl = function (noquery) {
  var page = getCurPage();
  var url = "/" + page.route;
  if (page.options && !noquery) {
    url += "?";
    for (var key in page.options) {
      url += key + "=" + page.options[key] + "&";
    }
    url = url.substr(0, url.length - 1);
  }
  return url;
}


var contactObject = function (obj1, obj2) {
  if (!obj1) return obj2;
  if (!obj2) return obj1;
  var length = obj1.length;
  for (var i in obj2) {
    obj1[length + parseInt(i)] = obj2[i];
  }
  return obj1;
}


var loadMore = function (cb) {
  var reload = false;
  var page = _target.data.currentPage;
  if (!page) {
    reload = true;
    page = 1;
  } else {
    page++;
  }

  _target.data.isReloadMore = reload;

  if (!_target.data.loadMore && !reload) {
    return;
  }

  _target.setData({ isMoreLoading: true });

  if (typeof cb == 'function') {
    cb(page);
  } else {
    _target.loadData(page);
  }
}


var loadMoreReturn = function (objCurrent, objRes, res) {

  _target.setData({ isMoreLoading: false });
  if (objRes && objRes.length > 0) {
    _target.setData({ loadMore: true });
  } else {
    _target.setData({ loadMore: false });
  }

  var alldata = {};
  if (_target.data.isReloadMore) {
    alldata = objRes;
    _target.data.currentPage = 1;
  } else {
    alldata = contactObject(objCurrent, objRes);
    if (!_target.data.currentPage) _target.data.currentPage = 1;
    _target.data.currentPage++;
  }


  if (res && res.page && res.pagenum && res.page >= res.pagenum) {
    _target.setData({ loadMore: false });
  }

  return alldata;
}


var getHomePageUrl = function () {
  return getApp().globalData.homePageUrl;
}


var isObjectSame = function (a, b) {

  if (a === b) {

    return a !== 0 || 1 / a === 1 / b;
  }

  if (a == null || b == null) {
    return a === b;
  }

  var classNameA = toString.call(a),
    classNameB = toString.call(b);

  if (classNameA !== classNameB) {
    return false;
  }

  switch (classNameA) {
    case '[object RegExp]':
    case '[object String]':

      return '' + a === '' + b;
    case '[object Number]':

      if (+a !== +a) {
        return +b !== +b;
      }

      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b;
  }

  if (classNameA == '[object Object]') {

    var propsA = Object.getOwnPropertyNames(a),
      propsB = Object.getOwnPropertyNames(b);
    if (propsA.length != propsB.length) {
      return false;
    }
    for (var i = 0; i < propsA.length; i++) {
      var propName = propsA[i];

      if (a[propName] !== b[propName]) {
        return false;
      }
    }
    return true;
  }

  if (classNameA == '[object Array]') {
    if (a.toString() == b.toString()) {
      return true;
    }
    return false;
  }
};


var parseStr = function (str, array) {
  var strArr = str.replace(/^&/, '').replace(/&$/, '').split('&');
  var sal = strArr.length;
  var i;
  var j;
  var ct;
  var p;
  var lastObj;
  var obj;
  var undef;
  var chr;
  var tmp;
  var key;
  var value;
  var postLeftBracketPos;
  var keys;
  var keysLen;
  var _fixStr = function (str) {
    return decodeURIComponent(str.replace(/\+/g, '%20'));
  }
  if (!array) {
    array = {};
  }
  for (i = 0; i < sal; i++) {
    tmp = strArr[i].split('=');
    key = _fixStr(tmp[0]);
    value = (tmp.length < 2) ? '' : _fixStr(tmp[1]);
    while (key.charAt(0) === ' ') {
      key = key.slice(1);
    }
    if (key.indexOf('\x00') > -1) {
      key = key.slice(0, key.indexOf('\x00'));
    }
    if (key && key.charAt(0) !== '[') {
      keys = [];
      postLeftBracketPos = 0;
      for (j = 0; j < key.length; j++) {
        if (key.charAt(j) === '[' && !postLeftBracketPos) {
          postLeftBracketPos = j + 1;
        } else if (key.charAt(j) === ']') {
          if (postLeftBracketPos) {
            if (!keys.length) {
              keys.push(key.slice(0, postLeftBracketPos - 1));
            }
            keys.push(key.substr(postLeftBracketPos, j - postLeftBracketPos))
            postLeftBracketPos = 0;
            if (key.charAt(j + 1) !== '[') {
              break;
            }
          }
        }
      }
      if (!keys.length) {
        keys = [key];
      }
      for (j = 0; j < keys[0].length; j++) {
        chr = keys[0].charAt(j);
        if (chr === ' ' || chr === '.' || chr === '[') {
          keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1);
        }
        if (chr === '[') {
          break;
        }
      }
      obj = array;
      for (j = 0, keysLen = keys.length; j < keysLen; j++) {
        key = keys[j].replace(/^['"]/, '').replace(/['"]$/, '');
        lastObj = obj;
        if ((key !== '' && key !== ' ') || j === 0) {
          if (obj[key] === undef) {
            obj[key] = {};
          }
          obj = obj[key];
        } else {

          ct = -1;
          for (p in obj) {
            if (obj.hasOwnProperty(p)) {
              if (+p > ct && p.match(/^\d+$/g)) {
                ct = +p;
              }
            }
          }
          key = ct + 1;
        }
      }
      lastObj[key] = value;
    }
  }
  return array;
}


var isTabBarPage = function () {
  var pageurl = getCurrentPageUrl();
  var tabBarPagePathArr = JSON.parse(getApp().globalData.tabBarPagePathArr);
  if (tabBarPagePathArr.indexOf(pageurl) > -1) {
    return true;
  }
  return false;
}


var getTabBarPage = function () {
  var app = getApp();
  var tabBar = app.globalData.tabBar;
  if (!tabBar) return;


  var pageurl = getCurrentPageUrl(true);
  for (var i in tabBar['list']) {
    var tab = tabBar['list'][i];

    if (pageurl == tab['pagePath']) tabBar['list'][i]['active'] = true;
    else tabBar['list'][i]['active'] = false;
  }

  return tabBar;
}

var getAuth = function(cb){
  var app = getApp();
  wx.getSetting({
    success: res => {

      if (res.authSetting['scope.userInfo']) {
        console.log("getUserInfo5.1", res);
        _target.setData({ hasAuth: true });
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        // wx.checkSession({
        //   success: res=>{
        //     console.log("wx.checkSession1:",res);
        //   },
        //   fail: res=>{
        //     console.log("wx.checkSession2:", res);
        //   },
        //   complete: res=>{
        //     console.log("wx.checkSession3:", res);
        //   }
        // });
        wx.login({
          success: res => {
            var code = res.code;
            wx.getUserInfo({
              success: res => {
                console.log("getUserInfo3:", res);
                // 可以将 res 发送给后台解码出 unionId
                var userInfo = res.userInfo;
                _target.setData({
                  userInfo: userInfo
                });
                // console.log('userInfo:', userInfo);
                // userInfo = JSON.stringify(userInfo);
                var json = {};
                json.code = code;
                json.userInfo = JSON.stringify(userInfo);
                app.nicebox.api.RequestAPI('index', 'login', json, function (res) {
                  var result = res.data;
                  _target.setData({hasMobile: result['hasMobile']});
                  if (typeof cb == 'function') {
                    cb(result);
                  }
                });
              },
              fail: res => {
                console.log("getUserInfo4:", res);
              }
            })
            

          }
        });

        
      } else {
        console.log("getUserInfo5.2", res);
        _target.setData({ hasAuth: false });
      }
    }
  })
}


var bindPhoneNumber = function (e) {
  console.log("getPhoneNumber:", e);
  var app = getApp();
  var PostData = {};
  PostData['iv'] = e.detail.iv;
  PostData['encryptedData'] = e.detail.encryptedData;
  PostData['session_key'] = e.authInfo.session_key;
  PostData['user_id'] = e.authInfo.user_id;
  app.nicebox.api.RequestAPI('index', 'bindmobile', PostData, function (res) {
    
    var result = res.data;
    console.log("sss:", result);

    if (result.code == 200) {
      showModal({
        content: "注册成功",
        confirm: function () {
          var gourl = "/pages/index/index";
          turnToPage(gourl, true);
        },
        confirmText: '确定'
      });
    }
  });
  

}

var actionArr = [
  'goUrl', 'loadMore', 'goTop', 'callPhone', 'openLocation', 'goHome', 'goBack', 'webview', 'openBlock', 'previewImage','getAuth'
];


var action = function (e, cb) {
  var app = getApp();
  var act = e.currentTarget.dataset.action;


  if (act == 'goUrl') {
    var url = e.currentTarget.dataset.url;

    if (url.indexOf("loadAddCart:") > -1) {

      var arr = url.split(":");
      app.nicebox.shopcart.loadAddCart(arr[1], arr[2] == 'true' ? false : true);
      return;
    }

    var isRedirect = e.currentTarget.dataset.direct == 'true' ? true : false;
    turnToPage(e.currentTarget.dataset.url, isRedirect);
  }

  else if (act == 'goTop') {
    var scrollTop = e.currentTarget.dataset.top;
    if (typeof scrollTop == 'undefined') scrollTop = 0;
    wx.pageScrollTo({
      scrollTop: scrollTop
    });
  }

  else if (act == 'callPhone') {
    var tel = e.currentTarget.dataset.tel;
    if (typeof tel == 'undefined') tel = '15976974235';
    wx.makePhoneCall({
      phoneNumber: tel
    })
  }

  else if (act == 'openLocation') {
    var latitude = e.currentTarget.dataset.latitude;
    var lname = e.currentTarget.dataset.lname;
    var longitude = e.currentTarget.dataset.longitude;
    var address = e.currentTarget.dataset.address;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        wx.openLocation({
          latitude: Number(latitude),
          longitude: Number(longitude),
          name: lname,
          address: address,
          scale: 18
        })
      }
    })
  }

  else if (act == 'loadMore') {
    loadMore(cb);
  }

  else if (act == 'goHome') {
    var isRedirect = e.currentTarget.dataset.direct == 'true' ? true : false;
    var url = getHomePageUrl();
    turnToPage(url, isRedirect);
  }

  else if (act == 'goBack') {
    var delta = e.currentTarget.dataset.delta ? e.currentTarget.dataset.delta : 1;
    turnBack({ delta: delta });
  }

  else if (act == 'webview') {
    var title = e.currentTarget.dataset.title;
    var url = e.currentTarget.dataset.url;
    url = encodeURIComponent(url);
    var gourl = "/pages/webbox/webbox?outurl=" + url;
    turnToPage(gourl, false);
  }

  else if (act == 'openBlock'){
    var isshowblock = _target.data.showblock.isshowblock;
    console.log("isshowblock:", isshowblock);
    if (isshowblock == "none"){
      _target.setData({ showblock: { isshowblock: 'block', title: e.currentTarget.dataset.title, info: e.currentTarget.dataset.info} });
    }else{
      _target.setData({ showblock: { isshowblock: 'none' } });
    }
  }

  else if (act == 'previewImage'){
    wx.previewImage({
      urls: [e.currentTarget.dataset.src] // 需要预览的图片http链接列表     
    })
  }

  else if (act == 'getAuth'){
    getAuth();
  }

}



module.exports = {
  register: register,
  showToast: showToast,
  hideToast: hideToast,
  showModal: showModal,
  turnToPage: turnToPage,
  turnBack: turnBack,
  formInputCheck: formInputCheck,
  formDataCheck: formDataCheck,
  getCurrentPageUrl: getCurrentPageUrl,
  getCurPage: getCurPage,
  action: action,
  actionArr: actionArr,
  contactObject: contactObject,
  loadMore: loadMore,
  loadMoreReturn: loadMoreReturn,
  getHomePageUrl: getHomePageUrl,
  isObjectSame: isObjectSame,
  parseStr: parseStr,
  isTabBarPage: isTabBarPage,
  getTabBarPage: getTabBarPage,
  linkWebSocket: linkWebSocket,
  getFlatternDistance: getFlatternDistance,
  changeUnit: changeUnit,
  changeTime: changeTime,
  getAuth: getAuth,
  bindPhoneNumber: bindPhoneNumber
}