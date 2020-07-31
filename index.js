require('dotenv').config();

const Push = require( 'pushover-notifications' )
const p = new Push( {
    user: process.env['PUSHOVER_USER'],
    token: process.env['PUSHOVER_TOKEN']
});

const mqtt = require('mqtt')
const client  = mqtt.connect(process.env['MQTT_ADDRESS'])

let defaultMessageData = {
    title: process.env['PUSHOVER_DEFAULT_MSG_TITLE']
}

// subscribe to topic
client.on('connect', function () {
  client.subscribe(process.env['MQTT_TOPIC'], function (err) {
    if(err) {
        // Ooops
        console.error(err);
    }
  })
})
 
// handle messages send to topic
client.on('message', function (topic, message) {
    // Parse the incoming data to JSON object
    const messageData = JSON.parse(message.toString());
    // Combine with the default message data (title, currently)
    const msgToSend = Object.assign({}, defaultMessageData, messageData);
    // send message:
    p.send( msgToSend, function( err, result ) {
        if ( err ) {
            throw err
        }
        console.log( result )
    });
})