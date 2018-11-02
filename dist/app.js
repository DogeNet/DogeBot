'use strict';

var _bot = require('./bot');

var _util = require('util');

// Instantiate client and process controller files to be used later on with commands
// Setup modules required for DogeBot
var doge = new _bot.DogeBot();

// The ready event - once triggered the bot is then operational for use
doge.client.on('ready', function () {
  console.log('DogeBot, operational.');
});

doge.client.on('message', function (message) {
  var response = doge.messageHandler(doge.client, message);

  if (response === null) return;
  // Execute the required controller passing in the user message
  response.controller.execute(response.message, response.args);
});