'use strict';

var _bot = require('./bot');

// Instantiate client and process controller files to be used later on with commands
const doge = new _bot.DogeBot();

// The ready event - once triggered the bot is then operational for use
// Setup modules required for DogeBot
doge.client.on('ready', () => {
  console.log('DogeBot, operational.');
});

doge.client.on('message', message => {
  let response = doge.messageHandler(doge.client, message);

  if (response === null) return;

  let { controller, msgProcessed, msgArgs } = response;
  // Execute the required controller passing in the user message
  controller.execute(msgProcessed, msgArgs, doge);
});