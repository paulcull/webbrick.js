var WebBrick = require('../index.js');

var appName = "My App";
var util = require('util')

WebBrick.discover(function(brickConf) {
//	console.log(JSON.stringify(brickIP));
	console.log(JSON.stringify(brickConf));
//	console.log(brickConf);
//  brickConf.forEach(fetchBricks);
});

function fetchBricks(brick) {

 var brick = WebBrick.createClient({
    brickIp:brick,
    appName:appName
  });



  brick.anOut(0,function(err,lights) {

    if (err && err.type === 1) {
      // App has not been registered

      console.log("Please go and press the link button on your base station(s)");
      console.log(err.toString());

      client.register(function(err) {

        if (err) {
          // Could not register
        } else {
          // Registered, carry on
        }
      });
    } else {
      console.log(lights);
    }
  });
};


// hue.lights(function(lights) {
//     Object.keys(lights).forEach(function(l) {
//         hue.on()
//         // hue.rgb(l,20,150,66);
//     });
// });