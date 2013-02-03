var util         = require('util')
//var Crypto       = require('crypto');
  , request      = require('request')
  , EventEmitter = require('events').EventEmitter
  , Helpers      = require('./helpers.js')
//  , wbReq        = require("./httpHelper").httpRequest
  , bitMask      = require('bit-mask');


module.exports = WB;
util.inherits(WB,EventEmitter);

function WB(config) {
  EventEmitter.call(this);

  if (!config.brickIp)
    throw new Error('Brick IP is required');

  if (!config.appName)
    throw new Error('Application name is required');

  this._station = config.brickIp;
  this._app = config.appName;
  //this._key = Crypto.createHash('md5').update(config.appName).digest("hex");
  this._key = '';
  this._authenticated = false;
};


WB.prototype.anOut = function(ch,cb) {

  if (0<ch>3) throw new Error('Analogue channel must be between 0 and 3');

  var opts = {
    method:'GET',
    url:'http://'+this._station+'/wbstatus.xml',
    json:{on:false},
    timeout:30000
  };

  var _path = "//AO[id='"+ch+ "']";

  request(opts,function(e,r,b) {

    if (e) cb(e)
    else if (typeof cb === "function") cb.apply(this,Helpers.xpathWBResponse(b,_path));
  });
  return this;
}

WB.prototype.temp = function(ch,cb) {

  if (0<ch>3) throw new Error('Temp channel must be between 1 and 5');

  var opts = {
    method:'GET',
    url:'http://'+this._station+'/wbstatus.xml',
    json:{on:false},
    timeout:30000
  };

  var _path = "//Tmp[id='"+ch+ "']";

  request(opts,function(e,r,b) {

    if (e) cb(e)
    else if (typeof cb === "function") {
        var _xRawTmp = Helpers.xpathWBResponse(b,_path);
        var _tmp = (_xRawTmp.parseFloat())/16

        cb.apply(this,_tmp);
        }
  });
  return this;
}


// WB.prototype.light = function(light,cb) {

//   var opts = {
//     method:'GET',
//     //url:'http://'+this._station+'/cfg.spi?com=AA'+light,
//     url:'http://'+this._station+'/cfg.spi?com=AA'+light,
//     json:{on:true},
//     timeout:30000
//   };

//   request(opts,function(e,r,b) {

//     if (e) cb(e)
//     else if (typeof cb === "function") cb.apply(this,Helpers.parseWBResponse(b));
//   });
//   return this;
// }

WB.prototype.anOutOn = function(ch,cb) {

  var opts = {
    method:'PUT',
    url:'http://'+this._station+'/hid.spi?COM=AA'+ch+';85:',
    json:{on:true},
    timeout:30000
  };

  request(opts,function(e,r,b) {

    if (e) cb(e)
    else if (typeof cb === "function") cb.apply(this,Helpers.parseWBResponse(b));
  });
  return this;
};

WB.prototype.anOutLevel = function(ch,lvl,cb) {

  var opts = {
    method:'PUT',
    url:'http://'+this._station+'/hid.spi?COM=AA'+ch+';'+lvl+':',
    json:{on:true},
    timeout:30000
  };

  request(opts,function(e,r,b) {

    if (e) cb(e)
    else if (typeof cb === "function") cb.apply(this,Helpers.parseWBResponse(b));
  });
  return this;
};

WB.prototype.anOutOff = function(light,cb) {
  var opts = {
    method:'PUT',
    url:'http://'+this._station+'/hid.spi?COM=AA'+ch+';0:',
    json:{on:false},
    timeout:30000
  };

  request(opts,function(e,r,b) {
    if (e) cb(e)
    else if (typeof cb === "function") cb.apply(this,Helpers.parseWBResponse(b));
  });
  return this;
};

// WB.prototype.rgb = function(light,r,g,b,cb) {

//   var hsv = Helpers.rgb2hsv(r,g,b);
//   var params = {
//     WB:182*hsv[0],
//     sat:Math.ceil(254*hsv[1]),
//     bri:Math.ceil(254*hsv[2])
//   }

//   var opts = {
//     method:'PUT',
//     url:'http://'+this._station+'/cfg.spi?com=AA'+light+'/state',
//     json:params,
//     timeout:30000
//   };

//   request(opts,function(e,r,b) {
//     if (e) cb(e)
//     else if (typeof cb === "function") cb.apply(this,Helpers.parseWBResponse(b));
//   });
//   return this;
// };

//WB.prototype.register = function(_opts,cb) {

//   if (typeof _opts === "function") {
//     cb = _opts;
//     _opts = {};
//   }

//   var a = 0;  // Attempt counter
//   var _defaults = {
//     interval:3000,
//     attempts:0
//   };

//   for (var i in _opts) _defaults[i] = _opts[i];
//   var opts = _defaults;

//   var params = {
//     url:'http://'+this._station+'//cfg.spi?com=AA',
//     method:'POST',
//     json: {
//       devicetype:this._app,
//       username:this._key
//     }
//   };

//   var makeRequest = function() {

//     request(params,function(e,r,b) {
//       if (e) {
//         setTimeout(makeRequest,opts.interval);
//         return;
//       }
//       var resp = b[0];
//       if (resp.error && resp.error.type === 101) {
//         if (opts.attempts === 0 || a<=opts.attempts) {
//           a++;
//           setTimeout(makeRequest,opts.interval);
//           return;
//         }
//       }

//       cb.apply(this,Helpers.parseWBResponse(b));
//     });
//   }

//   makeRequest();
//   return this;
// }