import { messageHandler } from './message-handler';
import { processClient } from './client-processor';
import { config } from './config';

const DogeBot = class DogeBot {
  constructor() {
    this.client = processClient(config.token);
    this.messageHandler = messageHandler;
  }
};

export { DogeBot };
