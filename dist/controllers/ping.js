'use strict';

module.exports = {
  name: 'ping',
  description: 'A ping for a pong',
  execute: function execute(message, args) {
    message.channel.send('Pong!');
  }
};