import { messageHandler } from './processors/message-handler';
import { processClient } from './processors/client-processor';
import { config } from './config';
import DogeService from './service/service';

const DogeBot = class DogeBot {
  constructor() {
    this.client = processClient(config.token);
    this.messageHandler = messageHandler;
    this.dogeService = new DogeService();
  }
};

export { DogeBot };
