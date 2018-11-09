import { processMessageIntoTemplate } from '../utils/message-utils';

const checkMessageOnCooldown = (message, controller, collection) => {
  const cooldownAmount = (controller.cooldown || 2) * 1000;

  if (collection.has(message.author.id)) {
    message.reply(processMessageIntoTemplate(`Much patience, you are still on cooldown.`));
    return false;
  }

  collection.add(message.author.id);

  setTimeout(() => {
    collection.delete(message.author.id);
  }, cooldownAmount);
};

export { checkMessageOnCooldown };
