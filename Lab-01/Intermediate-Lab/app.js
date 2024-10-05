// IMPORTING THE MODULES
const fsModule = require('./modules/fileSystem');
const eventEmitterModule = require('./modules/eventEmitter');
const cryptoModule = require('./modules/crypto');

// USING THE FILE SYSTEM MODULE
fsModule.writeToFile('example.txt', 'Hello, File System!');
const content = fsModule.readFromFile('example.txt');
console.log(`File content: ${content}`);

// USING THE EVENT EMITTER MODULE
eventEmitterModule.listenForCustomEvent((message) => {
    console.log(`Received custom event: ${message}`);
});
eventEmitterModule.emitCustomEvent(`Hello, Node.js!`);

// USING THE CRYPTO MODULE
const hashPassword = cryptoModule.hashPassword('MySecurePassword');
console.log(`Hashed password: ${hashPassword}`);