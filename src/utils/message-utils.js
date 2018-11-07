const template = '```{0}```';

const processMessageIntoTemplate = message => {
  let reply = template.replace('{0}', message);
  return reply;
};

export { processMessageIntoTemplate };
