Node Webbrick Module
---

## To install
```
npm install webbrick.js
```

## To use
```javascript
var WB = require('webbrick.js');
```

## Discover Webbricks
```javascript

WB.discover(function(bricks) {

  console.log(bricks);
});
```

## Register your app
```javascript

var client = WB.createClient({
  brickIp:station, // Retrieved from the previous step
  appName:appName // Any alpha numeric name for your app
});

client.lights(function(err,lights) {

  if (err && err.type === 1) {
    // App has not been registered

    console.log("Please go and press the link button on your base station(s)");
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
```

## WB API
### WB.createClient(opts)
`opts` being 
  `stationIp` ip address and an 
  `appName`. Returns a hue `client`.

### WB.Discover(cb)
Discovers hue bridges on your local network.

## Client API

### client.register(opts,cb)
Attempt to register your app with the base station. `opts` has 2 properties, `interval` - the amount of time to wait in milliseconds before attempting to register again, and `attempts` the number of attempts to try before giving up. This will error out if registration was not successful.

### client.anOut(ch,cb)
Fetch the state data about 1 analogue output channel and will be a result of between 1 and 100

### client.anOutOn(ch,cb) client.anOutOff(ch,cb)
Turn on/off that analogue output channel

### client.anOutlevel(ch,lvl,cb)
Set level to that analogue output channel

### client.temp(ch,cb)
Fetch the temp level for sensor
