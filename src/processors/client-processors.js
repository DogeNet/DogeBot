import Discord from 'discord.js';
import fs from 'fs';

const processClient = token => {
  const client = new Discord.Client();
  processControllers(client);
  client.login(token).catch(error => console.log(`Failed: ${error}`));

  return client;
};

const processControllers = client => {
  const controllerFiles = fs.readdirSync('../src/controllers');
  client.controllers = new Discord.Collection();

  for (let file of controllerFiles) {
    let controller = require(`../controllers/${file}`);
    client.controllers.set(controller.name, controller);
  }
};

const returnSetCollection = () => {
  return new Set();
};
export { processClient, returnSetCollection };
