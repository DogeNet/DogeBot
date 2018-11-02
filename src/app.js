// Setup modules required for DogeBot
import { DogeBot } from './bot';

// Instantiate client and process controller files to be used later on with commands
const doge = new DogeBot();

// The ready event - once triggered the bot is then operational for use
doge.client.on('ready', () => {
  console.log('DogeBot, operational.');
});

doge.client.on('message', message => {
  let response = doge.messageHandler(doge.client, message);

  if (response === null) return;
  // Execute the required controller passing in the user message
  response.controller.execute(response.message, response.args);
});
