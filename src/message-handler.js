import { config } from './config';

const messageHandler = (client, message) => {
  // Check for user command usage with the required prefix
  if (!message.content.startsWith(config.prefix) || message.author.bot) return null;

  /* Process the message for use with controllers later on 
         the first arguement is dictates the controller and
         the remaining arguments are used as parameters */
  let args = message.content.slice(config.prefix.length).split(' ');
  let controllerName = args.shift().toLowerCase();
  let controller =
    client.controllers.get(controllerName) || client.controllers.find(ctr => ctr.aliases && ctr.aliases.includes(controllerName));

  // If no controller to use can be found we return here
  if (!controller) return null;

  // Build an object with our processed desired controller, message and arguments to return
  let response = {
    controller: controller,
    msgProcessed: message,
    msgArgs: args
  };

  return response;
};

export { messageHandler };
