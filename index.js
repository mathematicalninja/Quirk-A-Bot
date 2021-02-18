/* eslint-disable import/no-unresolved, no-global-assign */
require = require( 'esm' )( module ); // enable modern ES6 module import/export

console.log(__filename, '\n\tesm initialised');
module.exports = require('./packages/discord-bot/src/main.js'); // start main program
