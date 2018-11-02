'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageHandler = undefined;

var _config = require('./config');

var messageHandler = function messageHandler(client, message) {
  console.log('hello from message handler');
  // Check for user command usage with the required prefix
  if (!message.content.startsWith(_config.config.prefix) || message.author.bot) return null;

  /* Process the message for use with controllers later on 
         the first arguement is dictates the controller and
         the remaining arguments are used as parameters */
  var args = message.content.slice(_config.config.prefix.length).split(' ');
  var controllerName = args.shift().toLowerCase();
  var controller = client.controllers.get(controllerName) || client.controllers.find(function (ctr) {
    return ctr.aliases && ctr.aliases.includes(controllerName);
  });

  // If no controller to use can be found we return here
  if (!controller) return null;

  // Build an object with our processed desired controller, message and arguments to return
  var response = {
    controller: controller,
    message: message,
    arguments: args
  };

  return response;
};

exports.messageHandler = messageHandler;