

/* --------------------------------------------------------------------------------------------------------------- */
/* Setup                                                                                                           */
/* --------------------------------------------------------------------------------------------------------------- */

const fs = require('fs');
const ytdl = require('ytdl-core');
var net = require('net');
const Discord = require('discord.js');
const { prefix, token, server, port } = require('./config.json');
const userManager = require('./user-manager.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

/* --------------------------------------------------------------------------------------------------------------- */
/* dogeBot ready check                                                                                             */
/* --------------------------------------------------------------------------------------------------------------- */

client.on('ready', () => {
  console.log('dogeBot, standing by!');
});

/* --------------------------------------------------------------------------------------------------------------- */
/* Client message handler                                                                                          */
/* --------------------------------------------------------------------------------------------------------------- */

client.on('message', message => {

  // Any mention of doge will summon a doge pic
  if (message.content.match(/doge/i) && !message.author.bot && message.toString().substring(0, 1) != '!') {
    message.channel.send(`*Very* doge`, {
      files: [
        "./images/doge.jpg"
      ]
    });
  }

  // Past here we check for real command usage with prefix
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  // No arguements / invalid command management
  if (command.args && !args.length) {

    let reply = `\`No arguments given, such useless, wow\``;

    if (command.usage) {
      reply += `\n\`The following use would be correct: ${prefix}${command.name} ${command.usage} \n wow\``;
    }

    return message.channel.send(reply);
  }

  /* --------------------------------------------------------------------------------------------------------------- */
  /* Cooldown Management                                                                                             */
  /* --------------------------------------------------------------------------------------------------------------- */

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (!timestamps.has(message.author.id)) {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }
  else {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`\`Much patience, ${timeLeft.toFixed(1)} more second(s) before reusing \`${command.name}\`, very wait.\``);
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  try {

    /* --------------------------------------------------------------------------------------------------------------- */
    /* Socket connection event handles                                                                                 */
    /* --------------------------------------------------------------------------------------------------------------- */ 

    var socket = new net.Socket();
    socket.message = message;
    socket.client = client

    socket.connect(port, server, function() {

        console.log('Connected to: ' + server + ':' + port);
        console.log(socket.message.toString())
        console.log(socket.client.toString())

        socket.message.channel.send('Debug # **Connected to:** ' + server + ':' + port);
    });

    socket.on('connect', function() {
      
      socket.message.channel.send('Debug # **Sending:** ' + message.toString() + ' - to the server to see what the F to do...');
      socket.write(message.toString() + ' <EOF>');

    });

    socket.on('data', function(data) {
    
      console.log('Data: ' + data);
      socket.message.channel.send('Debug # **Data from server recieved:** '+ data.toString() + ' - Passing into the command handler to tell it what to do!');

      socket.data = data.toString();

      //userManager.rewardUser(socket, args);
      command.execute(socket, args);

      // Close the socket socket completely
      socket.destroy();

  });

  socket.on('close', function() {
    console.log('Dogebot connection closed');
    socket.message.channel.send('\n\nDebug # **Dogebot connection closed, lata**');
  });

  }
  catch (error) {
    console.error(error);
    message.reply('Much error, wow.');
  }

});

/* --------------------------------------------------------------------------------------------------------------- */
/* Server greeting                                                                                                 */
/* --------------------------------------------------------------------------------------------------------------- */

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = message.member.guild.channels.find('name', 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`wow, many potential, such failed dreams, ${member}.`);
});

client.login(token);

