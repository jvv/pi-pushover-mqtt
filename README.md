# PI Pushover MQTT

Simple NodeJS script which can be used to subscribe to messages in the message queue and ship those through Pushover to your phone/desktop. I'm using this to send some outcome of cron scripts I'm running. If you can send data through the message queue you could use this.

## Requirements

- Pushover app (iOS || Android || Desktop client)
- A pushover.net API token/key (created application in pushover.net)
- A place to run nodejs

## Setup:

- Clone it
- `npm install` it
- Copy the .env.example to .env
- Edit the .env with your preferred settings (see below)
- Keep it running on your Pi (or whatever) with your preference (I use forever npm package for this)

### Settings 

| Key | Value |
|-----|-----|
|PUSHOVER_USER| The Pushover user you want to send the push message to |
|PUSHOVER_TOKEN| The token / key of your registered application |
|PUSHOVER_DEFAULT_MSG_TITLE| Title all your push messages will have |
|MQTT_ADDRESS| the MQ address, e.g. mqtt://IP_ADDRESS |
|MQTT_TOPIC| The MQ topic you're sending the messages to |