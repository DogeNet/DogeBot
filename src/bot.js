import { messageHandler } from './processors/message-handler';
import { processClient } from './processors/client-processor';
import { config } from './config';
import UserService from './service/user-service';

const DogeBot = class DogeBot {
  constructor() {
    this.client = processClient(config.token);
    this.messageHandler = messageHandler;
    this.services = {
      users: new UserService()
    };
  }
};

export { DogeBot };
