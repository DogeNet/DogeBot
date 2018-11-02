module.exports = {
  name: 'ping',
  description: 'A ping for a pong',
  execute(message, args) {
    message.channel.send('Pong!')
  }
};
