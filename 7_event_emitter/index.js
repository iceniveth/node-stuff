// https://nodejs.dev/en/learn/the-nodejs-event-emitter/

const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("message", (message) => {
  console.log(`received: ${message}`);
});

eventEmitter.emit("message", "Hello");

// node
// .load index.js
// eventEmitter.emit('message', 'I'm fine, thank you')
