var util         = require('util')
//var Crypto       = require('crypto');
  , request      = require('request')
  , EventEmitter = require('events').EventEmitter
//  , bitMask      = require('bit-mask');
//  , wbReq        = require("./httpHelper").httpRequest
  , Helpers      = require('./helpers.js');


module.exports = WB;
util.inherits(WB,EventEmitter);

function WB(config) {
  EventEmitter.call(this);
console.log("in WB...");
  if (!config.brickIp)
    throw new Error('Brick IP is required');

  if (!config.appName)
    throw new Error('Application name is required');

  this._brick = config.brickIp;
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

// WB.prototype.temp = function(ch,cb) {

//   if (0<ch>3) throw new Error('Temp channel must be between 1 and 5');

//   var opts = {
//     method:'GET',
//     url:'http://'+this._station+'/wbstatus.xml',
//     json:{on:false},
//     timeout:30000
//   };

//   var _path = "//Tmp[id='"+ch+ "']";

//   request(opts,function(e,r,b) {

//     if (e) cb(e)
//     else if (typeof cb === "function") {
//         var _xRawTmp = Helpers.xpathWBResponse(b,_path);
//         var _tmp = (_xRawTmp.parseFloat())/16

//         cb.apply(this,_tmp);
//         }
//   });
//   return this;
// }


// // WB.prototype.light = function(light,cb) {

// //   var opts = {
// //     method:'GET',
// //     //url:'http://'+this._station+'/cfg.spi?com=AA'+light,
// //     url:'http://'+this._station+'/cfg.spi?com=AA'+light,
// //     json:{on:true},
// //     timeout:30000
// //   };

// //   request(opts,function(e,r,b) {

// //     if (e) cb(e)
// //     else if (typeof cb === "function") cb.apply(this,Helpers.parseWBResponse(b));
// //   });
// //   return this;
// // }

// WB.prototype.anOutOn = function(ch,cb) {

//   var opts = {
//     method:'PUT',
//     url:'http://'+this._station+'/hid.spi?COM=AA'+ch+';85:',
//     json:{on:true},
//     timeout:30000
//   };

//   request(opts,function(e,r,b) {

//     if (e) cb(e)
//     else if (typeof cb === "function") cb.apply(this,Helpers.parseWBResponse(b));
//   });
//   return this;
// };

// WB.prototype.anOutLevel = function(ch,lvl,cb) {

//   var opts = {
//     method:'PUT',
//     url:'http://'+this._station+'/hid.spi?COM=AA'+ch+';'+lvl+':',
//     json:{on:true},
//     timeout:30000
//   };

//   request(opts,function(e,r,b) {

//     if (e) cb(e)
//     else if (typeof cb === "function") cb.apply(this,Helpers.parseWBResponse(b));
//   });
//   return this;
// };

// WB.prototype.anOutOff = function(light,cb) {
//   var opts = {
//     method:'PUT',
//     url:'http://'+this._station+'/hid.spi?COM=AA'+ch+';0:',
//     json:{on:false},
//     timeout:30000
//   };

//   request(opts,function(e,r,b) {
//     if (e) cb(e)
//     else if (typeof cb === "function") cb.apply(this,Helpers.parseWBResponse(b));
//   });
//   return this;
// };
