// Setup modules required for DogeBot

import { config } from './config';
import { processClient } from './client-processor';

// Instantiate client and process controller files to be used later on with commands
const client = processClient(config);

// The ready event - once triggered the bot is then operational for use
client.on('ready', () => {
  console.log('DogeBot, operational.');
});

client.on('message', message => {
  // Check for user command usage with the required prefix
  if (!message.content.startsWith(config.prefix) || message.author.bot) {
    return;
  }

  /* Process the message for use with controllers later on 
     the first arguement is dictates the controller and
     the remaining arguments are used as parameters */
  let args = message.content.slice(config.prefix.length).split(' ');
  let controllerName = args.shift().toLowerCase();
  let controller =
    client.controllers.get(controllerName) || client.controllers.find(ctr => ctr.aliases && ctr.aliases.includes(controllerName));

  // If no controller to use can be found we return here
  if (!controller) {
    return;
  }

  // Execute the required controller passing in the user message
  controller.execute(message, args);
});
