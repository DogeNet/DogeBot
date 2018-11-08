import { config } from '../config';

const messageHandler = (client, message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return null;

  let args = message.content.slice(config.prefix.length).split(' ');
  let controllerName = args.shift().toLowerCase();
  let controller =
    client.controllers.get(controllerName) || client.controllers.find(ctr => ctr.aliases && ctr.aliases.includes(controllerName));

  if (!controller) return null;

  let response = {
    controller: controller,
    msgProcessed: message,
    msgArgs: args
  };

  return response;
};

export { messageHandler };
