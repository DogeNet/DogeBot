import { config } from '../config';
import { processMessageIntoTemplate } from '../utils/message-utils';

module.exports = {
  name: 'help',
  description: 'Help controller to display available actions to the user.',
  aliases: ['controllers'],
  usage: '',
  cooldown: 5,
  execute(message, args) {
    const { controllers } = message.client;
    let data = [];

    if (!args.length) {
      data.push('List of avaliable DogeBot commands:\n\nPrefix the following with: ' + config.prefix + '\n\n');
      data.push(controllers.map(controller => '' + controller.name + '').join('\n'));
      data.push(`\n\nYou can also send ${config.prefix}help [controller name] to get info on a specific command.`);
    } else {
      if (!controllers.has(args[0])) {
        return message.reply("That's not a valid command");
      }

      const controller = controllers.get(args[0]);

      data.push(`Name: ${controller.name}`);

      if (controller.description) data.push(`Description: ${controller.description}`);
      if (controller.aliases) data.push(`Aliases: ${controller.aliases.join(', ')}`);
      if (controller.usage) data.push(`Usage: ${prefix}${controller.name} ${controller.usage}`);

      data.push(`Cooldown: ${controller.cooldown || 3} second(s)`);
    }

    let string = data.join();
    string = processMessageIntoTemplate(string);

    message.author
      .send(string)
      .then(() => {
        if (message.channel.type !== 'dm') {
          message.channel.send(
            processMessageIntoTemplate('Check your direct messages, a list of available commands has been sent to you')
          );
        }
      })
      .catch(() => message.reply(processMessageIntoTemplate('DogeBot is unable to DM you, dogeBot is sad.')));
  }
};
