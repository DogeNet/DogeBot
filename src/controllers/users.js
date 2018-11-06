import { validateUserControllerInput, validateUserControllerParams } from '../utils/validation-util';
module.exports = {
  name: 'users',
  description: 'Returns the server members',
  execute(message, args, doge) {
    if (!validateUserControllerInput(args)) return;

    let command = args[0].toLowerCase();
    let username = args[1];
    let reply = '```{0}```';

    switch (command) {
      case 'list':
        doge.services.users
          .getUserList()
          .then(response => {
            reply = reply.replace('{0}', response);
            message.channel.send(reply);
          })
          .catch(error => console.log('ERROR (User Controller): ', error));

        break;

      case 'profile':
        if (!validateUserControllerParams(args)) {
          message.channel.send('```> Please user the following format: !users profile <username>```');
          return;
        }

        doge.services.users
          .getUserProfile(username)
          .then(response => {
            reply = reply.replace('{0}', response);
            message.channel.send(reply);
          })
          .catch(error => console.log('ERROR (User Controller): ', error));

        break;

      case 'create':
        if (!validateUserControllerParams(args)) {
          message.channel.send('```> Please user the following format: !users create <username>```');
          return;
        }

        doge.services.users
          .createUserProfile(username)
          .then(response => {
            reply = reply.replace('{0}', response);
            message.channel.send(reply);
          })
          .catch(error => console.log('ERROR (User Controller): ', error));
        break;

      default:
        message.channel.send('```> !users list || !users profile <username> || !users create <username>```');
        break;
    }
  }
};
