'use strict';

/* --------------------------------------------------------------------------------------------------------------- */
/* Setup                                                                                                           */
/* --------------------------------------------------------------------------------------------------------------- */

var fs = require('fs');
var ytdl = require('ytdl-core');
var net = require('net');
var Discord = require('discord.js');

var _require = require('./config.json'),
    prefix = _require.prefix,
    token = _require.token,
    server = _require.server,
    port = _require.port;

var userManager = require('./user-manager.js');

var client = new Discord.Client();
client.commands = new Discord.Collection();
var cooldowns = new Discord.Collection();
var commandFiles = fs.readdirSync('./commands');

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = commandFiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var file = _step.value;

    var command = require('./commands/' + file);
    client.commands.set(command.name, command);
  }

  /* --------------------------------------------------------------------------------------------------------------- */
  /* dogeBot ready check                                                                                             */
  /* --------------------------------------------------------------------------------------------------------------- */
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

client.on('ready', function () {
  console.log('dogeBot, standing by!');
});

/* --------------------------------------------------------------------------------------------------------------- */
/* Client message handler                                                                                          */
/* --------------------------------------------------------------------------------------------------------------- */

client.on('message', function (message) {

  // Any mention of doge will summon a doge pic
  if (message.content.match(/doge/i) && !message.author.bot && message.toString().substring(0, 1) != '!') {
    message.channel.send('*Very* doge', {
      files: ["./images/doge.jpg"]
    });
  }

  // Past here we check for real command usage with prefix
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  var args = message.content.slice(prefix.length).split(/ +/);
  var commandName = args.shift().toLowerCase();

  var command = client.commands.get(commandName) || client.commands.find(function (cmd) {
    return cmd.aliases && cmd.aliases.includes(commandName);
  });

  if (!command) return;

  // No arguements / invalid command management
  if (command.args && !args.length) {

    var reply = '`No arguments given, such useless, wow`';

    if (command.usage) {
      reply += '\n`The following use would be correct: ' + prefix + command.name + ' ' + command.usage + ' \n wow`';
    }

    return message.channel.send(reply);
  }

  /* --------------------------------------------------------------------------------------------------------------- */
  /* Cooldown Management                                                                                             */
  /* --------------------------------------------------------------------------------------------------------------- */

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  var now = Date.now();
  var timestamps = cooldowns.get(command.name);
  var cooldownAmount = (command.cooldown || 3) * 1000;

  if (!timestamps.has(message.author.id)) {
    timestamps.set(message.author.id, now);
    setTimeout(function () {
      return timestamps.delete(message.author.id);
    }, cooldownAmount);
  } else {
    var expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      var timeLeft = (expirationTime - now) / 1000;
      return message.reply('`Much patience, ' + timeLeft.toFixed(1) + ' more second(s) before reusing `' + command.name + '`, very wait.`');
    }

    timestamps.set(message.author.id, now);
    setTimeout(function () {
      return timestamps.delete(message.author.id);
    }, cooldownAmount);
  }

  try {

    /* --------------------------------------------------------------------------------------------------------------- */
    /* Socket connection event handles                                                                                 */
    /* --------------------------------------------------------------------------------------------------------------- */

    var socket = new net.Socket();
    socket.message = message;
    socket.client = client;

    socket.connect(port, server, function () {

      console.log('Connected to: ' + server + ':' + port);
      console.log(socket.message.toString());
      console.log(socket.client.toString());

      socket.message.channel.send('Debug # **Connected to:** ' + server + ':' + port);
    });

    socket.on('connect', function () {

      socket.message.channel.send('Debug # **Sending:** ' + message.toString() + ' - to the server to see what the F to do...');
      socket.write(message.toString() + ' <EOF>');
    });

    socket.on('data', function (data) {

      console.log('Data: ' + data);
      socket.message.channel.send('Debug # **Data from server recieved:** ' + data.toString() + ' - Passing into the command handler to tell it what to do!');

      socket.data = data.toString();

      //userManager.rewardUser(socket, args);
      command.execute(socket, args);

      // Close the socket socket completely
      socket.destroy();
    });

    socket.on('close', function () {
      console.log('Dogebot connection closed');
      socket.message.channel.send('\n\nDebug # **Dogebot connection closed, lata**');
    });
  } catch (error) {
    console.error(error);
    message.reply('Much error, wow.');
  }
});

/* --------------------------------------------------------------------------------------------------------------- */
/* Server greeting                                                                                                 */
/* --------------------------------------------------------------------------------------------------------------- */

// Create an event listener for new guild members
client.on('guildMemberAdd', function (member) {
  // Send the message to a designated channel on a server:
  var channel = message.member.guild.channels.find('name', 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send('wow, many potential, such failed dreams, ' + member + '.');
});

client.login(token);