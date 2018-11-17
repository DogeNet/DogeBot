import { validateUserControllerInput, validateUserControllerParams } from '../utils/validation-util';
import { processMessageIntoTemplate, getMessageScore } from '../utils/message-utils';

module.exports = {
  name: 'users',
  description: 'Returns the server members',
  execute(message, args, doge) {
    if (!validateUserControllerInput(args)) return;

    let command = args[0].toLowerCase();
    let username = args[1];
    let score = args[2];
    let commandBonus = 10; //default command bonus, should be configurable

    const runService = command => {
      let services = {
        list: () => {
          doge.services.users
            .getUserList()
            .then(response => {
              message.channel.send(processMessageIntoTemplate(response));
            })
            .catch(error => {
              message.channel.send(processMessageIntoTemplate('> There was an error processing your request, please try again.'));
              console.log(error);
            });
        },
        profile: () => {
          if (!validateUserControllerParams(args)) {
            message.channel.send(processMessageIntoTemplate('> Please user the following format: !users profile <username>'));
            return;
          }
          doge.services.users
            .getUserProfile(username)
            .then(response => {
              message.channel.send(processMessageIntoTemplate(response));
            })
            .catch(error => {
              message.channel.send(processMessageIntoTemplate(`> Username: <${username}> does not exist - please check case sensitivity.`));
              console.log(error);
            });
        },
        create: () => {
          if (!validateUserControllerParams(args)) {
            message.channel.send(processMessageIntoTemplate('> Please user the following format: !users create <username>'));
            return;
          }
          doge.services.users
            .createUserProfile(username)
            .then(response => {
              message.channel.send(processMessageIntoTemplate(response));
            })
            .catch(error => {
              message.channel.send(processMessageIntoTemplate(`> Username: <${username}> already exists or is invalid.`));
              console.log(error);
            });
        },


        //leaving these in but will a user be able to manually update their scores or should it just be done automatically
        update: () => {
          doge.services.users
            .updateUserProfile(username, score)
            .then(response => {
              message.channel.send(processMessageIntoTemplate(response));
            })
            .catch(error => {
              message.channel.send(processMessageIntoTemplate(`> Username: <${username}> invalid or does not exist.`));
              console.log(error);
            });
        },
        add: () => {
          let score = getMessageScore(message, commandBonus);
          doge.services.users
            .updateUserProfileAdd(username, score)
            .then(response => {
              message.channel.send(processMessageIntoTemplate(response));
            })
            .catch(error => {
              message.channel.send(processMessageIntoTemplate(`> Username: <${username}> invalid or does not exist.`));
              console.log(error);
            });
        }
      };
      return services[command]();
    };

    // execute the required service from the command
    runService(command);
  }
};
