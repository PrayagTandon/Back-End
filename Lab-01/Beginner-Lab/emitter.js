const EventEmmitter = require('events');

class MyEmitter extends EventEmmitter { }

const myEmitter = new MyEmitter();

myEmitter.on('customEvent', () => {
    console.log('Custom Event was emitted!')
});

module.exports = myEmitter;