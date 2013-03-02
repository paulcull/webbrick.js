var dgram = require('dgram');
var async = require('async');
var request = require('request');

var packet = [
 'M-SEARCH * HTTP/1.1',
 'HOST:239.255.255.250:2552',
 'MAN:"ssdp:discover"',
 'ST:ssdp:all',
 'MX:1',
 ''
].join('\r\n');

module.exports = function(cb) {

//  var client = dgram.createSocket("udp4");
//  var message = new Buffer(packet);
//  console.log("in discover...");
//  client.bind();
//  createServer(client.address().port,cb);
  createServer(2552,cb);
//  console.log("Sending message...");
//  client.send(message, 0, message.length, 2552, "239.255.255.250",function() {
//    console.log("send back...");
//   client.close();
//  });
};

function createServer(port,cb) {

  var server = dgram.createSocket("udp4");
  var found = [];
  console.log("Setting up server...");

  server.on("message", function (msg, rinfo) {
  console.log("From: " + rinfo.address + ":" + rinfo.port);

    if (found.indexOf(rinfo.address)===-1) {
      console.log("adding "+rinfo.address)
      found.push(rinfo.address);
    }
  });
  server.bind(port);

  setTimeout(function(){
    async.filter(found,WBFinder,cb);
    server.close();
  },5000);
};

function WBFinder(server,cb) {

    
    request('http://'+server+'/wbcfg.xml',function(e,r,b) {
    //console.log(JSON.stringify(b));
    cb({r:b})
  });
};