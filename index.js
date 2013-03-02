var WB = require('./lib/WB');

exports.discover = require('./lib/Discoverer');

exports.createClient = function(config) {
 return new WB(config);
};