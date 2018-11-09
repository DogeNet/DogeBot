import { messageHandler } from './processors/message-handler';
import { processClient, returnSetCollection } from './processors/client-processors';
import { config } from './config';
import UserService from './service/user-service';
import { checkMessageOnCooldown } from './processors/cooldown-handler';

const DogeBot = class DogeBot {
  constructor() {
    this.client = processClient(config.token);
    this.messageHandler = messageHandler;
    this.cooldownManager = {
      handler: checkMessageOnCooldown,
      collection: returnSetCollection()
    };
    this.services = {
      users: new UserService()
    };
  }
};

export { DogeBot };
