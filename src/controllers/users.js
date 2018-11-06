module.exports = {
  name: 'users',
  description: 'Returns the server members',
  execute(message, args, doge) {
    if (args.length <= 0 && args.length > 1) {
      return;
    }

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
        doge.services.users
          .getUserProfile(username)
          .then(response => {
            reply = reply.replace('{0}', response);
            message.channel.send(reply);
          })
          .catch(error => console.log('ERROR (User Controller): ', error));

        break;

      case 'create':
        doge.services.users
          .createUserProfile(username)
          .then(response => {
            reply = reply.replace('{0}', response);
            message.channel.send(reply);
          })
          .catch(error => console.log('ERROR (User Controller): ', error));
        break;

      default:
        message.channel.send(```!users list || !users profile <username> || !users create <username>```);
        break;
    }
  }
};
