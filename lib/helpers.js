var util = require('util');
var XRegExp = require("xregexp").XRegExp;
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser;

function WBError(opts) {
    this.description = opts.description || 'Unkown Error';
    this.type = opts.type || 0;
}
WBError.prototype = new Error;

exports.WBError = WBError;

//
//  helper functions and parsers
//

exports.parseWBResponse = function(r) {

    if (util.isArray(r) && r[0].error) {
        return [new WBError(r[0].error)];
    }

    return [null,r];
};

exports.xpathWBResponse = function(r,xp) {

        this._app.log.debug("xpathWBResponse: Started processing " +  r);
  var _doc = new dom().parseFromString(r);
  var output = xpath.select(xp, _doc).toString();
        this._app.log.debug(_nodes[0].localName + ": " + _nodes[0].firstChild.data);
        this._app.log.debug("node: " + _nodes[0].toString());  
  return output;//[1];
  
};

exports.regexWBResponse = function(r,m) {

  this._app.log.debug("regexWBResponse: Started processing " +  r);
  var _regEx = new RegExp(m);
  var output = _regEx.exec(r);
  this._app.log.debug("regexWBResponse: applied " + _regEx + " and rec'd " + output);//[1]);
  return output;//[1];

};

exports.getValFromResponse = function(response, type) {

  this._app.log.debug("getValFromResponse: Started processing " +  response);
  if (type == "send") {
    var _regEx = new RegExp("<h2>(.*?)</h2>");
  } else {
    var _regEx = new RegExp("<val>(.*?)</val>");
  }
  var output = _regEx.exec(response);
  this._app.log.debug("getValFromResponse: applied " + _regEx + " and rec'd " + output);//[1]);
  return output;//[1];

};

exports.getFromTrueOrFalse = function(text) {
  var _return = "0";
  if (text == "True") {
    //console.log("getFromTrueOrFalse: Found True");
    _return = "1";
  }
  //console.log("getFromTrueOrFalse:: Input: " + text + " Output: " + _return);
  return _return;
};
