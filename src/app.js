// Setup modules required for DogeBot
import Discord from 'discord.js';
import fs from 'fs';
import { config } from './config';

// Instantiate client and process controller files to be used later on with commands
const client = processClient();

// Initialise DogeBot using config token
client
  .login(config.token)
  .then(data => {
    console.log(`Success ${data}`);
  })
  .catch(error => console.log(`Failure ${error}`));

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

function processClient() {
  const client = new Discord.Client();
  const controllerFiles = fs.readdirSync('../src/controllers');
  client.controllers = new Discord.Collection();

  for (let file of controllerFiles) {
    let controller = require(`./controllers/${file}`);
    client.controllers.set(controller.name, controller);
  }
  return client;
}
