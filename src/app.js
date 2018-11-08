import { DogeBot } from './bot';

const doge = new DogeBot();

doge.client.on('ready', () => {
  console.log('DogeBot, operational.');
});

doge.client.on('message', message => {
  let response = doge.messageHandler(doge.client, message);

  if (response === null) return;

  let { controller, msgProcessed, msgArgs } = response;

  controller.execute(msgProcessed, msgArgs, doge);
});
