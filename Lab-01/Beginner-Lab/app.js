const math = require('./math');
const myEmitter = require('./emitter');

const result = math.square(5);
console.log(`Sqaure of 5 is: ${result}`);

myEmitter.emit('customEvent');