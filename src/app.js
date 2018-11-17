import { DogeBot } from './bot';
import { processMessageIntoTemplate, getMessageScore } from './utils/message-utils';

const doge = new DogeBot();

doge.client.on('ready', () => {
  console.log('DogeBot, operational.');
});

doge.client.on('message', message => {
  let response = doge.messageHandler(doge.client, message);

  if (response === null) return;

  let { controller, msgProcessed, msgArgs } = response;

  let validated = doge.cooldownManager.handler(message, controller, doge.cooldownManager.collection);

  if (validated === false) return;

  controller.execute(msgProcessed, msgArgs, doge);
  doge.services.users.updateUserProfileAdd(msgArgs[1], //Maybe a better way to reference or hold the username?
    getMessageScore(msgProcessed));
});

doge.client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'general');
  if (!channel) return;
  channel.send(processMessageIntoTemplate(`Wow, much potential, such failed dreams, ${member}.`));
});
