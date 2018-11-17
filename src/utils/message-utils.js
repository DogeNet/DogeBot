const template = '```{0}```';
import { config } from '../config';

const processMessageIntoTemplate = message => {
  let reply = template.replace('{0}', message);
  return reply;
};

const getMessageScore = (message) => {
    let result = message.length * config.letterValue;
}

export { processMessageIntoTemplate };
export { getMessageScore };
