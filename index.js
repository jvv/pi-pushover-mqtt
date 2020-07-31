require('dotenv').config();

const Push = require( 'pushover-notifications' )
const p = new Push( {
    user: process.env['PUSHOVER_USER'],
    token: process.env['PUSHOVER_TOKEN']
});

const mqtt = require('mqtt')
const client  = mqtt.connect(process.env['MQTT_ADDRESS'])

let defaultMessageData = {
    title: "Master, I bring you this message:"
}

// subscribe to topic
client.on('connect', function () {
  client.subscribe(process.env['MQTT_TOPIC'], function (err) {
    if(err) {
        // fuck I dont know what to do :P
        console.error(err);
    }
  })
})
 
// handle messages send to topic
client.on('message', function (topic, message) {
    const messageData = JSON.parse(message.toString());
    const msgToSend = Object.assign({}, defaultMessageData, messageData);
    // send message:
    p.send( msgToSend, function( err, result ) {
        if ( err ) {
            throw err
        }
        console.log( result )
    });
})