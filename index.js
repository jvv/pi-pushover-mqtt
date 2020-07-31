
const Push = require( 'pushover-notifications' )
const p = new Push( {
    user: process.env['PUSHOVER_USER'],
    token: process.env['PUSHOVER_TOKEN']
});

var mqtt = require('mqtt')
var client  = mqtt.connect(process.env['MQTT_ADDRESS'])
 
// subscribe to topic
client.on('connect', function () {
  client.subscribe('node-y-pi', function (err) {
    if(err) {
        console.error(err);
    }
  })
})
 
// handle messages send to topic
client.on('message', function (topic, message) {
  console.log(message)
  console.log(message.toString())
  client.end()
})