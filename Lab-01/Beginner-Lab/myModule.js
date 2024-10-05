/*
exports.myFunction = () => {
    // Code goes here
};

exports.myVariable = 'Hello, Node.js';
*/

// OR - Using module.exports approach

module.exports = {
    myFunction: () => {
        // The function code goes here
    },
    myVariable: 'Hello, Node.js!',
}