require('dotenv').config();

const Push = require( 'pushover-notifications' )
const p = new Push( {
    user: process.env['PUSHOVER_USER'],
    token: process.env['PUSHOVER_TOKEN']
});

var mqtt = require('mqtt')
var client  = mqtt.connect(process.env['MQTT_ADDRESS'])

let defaultMessageData = {
    title: "Master, I bring you this message:"
}

// subscribe to topic
client.on('connect', function () {
  client.subscribe('node-y-pi', function (err) {
    if(err) {
        // fuck I dont know what to do :P
        console.error(err);
    }
  })
})
 
// handle messages send to topic
client.on('message', function (topic, message) {
    // create message object
    const messageAsString = message.toString();
    console.log(messageAsString);
    const jsonString = JSON.stringify(messageAsString);
    console.log(jsonString);
    const messageData = JSON.parse(jsonString);
    console.log(messageData);
    const msgToSend = Object.assign({}, defaultMessageData, messageData);
    console.log(msgToSend);

    // send message:
    p.send( msgToSend, function( err, result ) {
        if ( err ) {
            throw err
        }
        console.log( result )
    });
  client.end()
})