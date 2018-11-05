import { apiPoints } from '../service/endpoints';

module.exports = {
  name: 'users',
  description: 'Returns the server members',
  execute(message, args, dogeService) {
    if (args.length < 0 && args.length > 2) {
      return;
    }

    let username = '';
    let response = '```{0}```';

    switch (args[0].toLowerCase()) {
      case 'list':
        dogeService
          .doGet(`${apiPoints.users}`)
          .then(result => {
            let strBuild = '';

            if (result.data.users) {
              let userArr = Object.entries(result.data.users);
              userArr.forEach(u => {
                strBuild += `> User: ${u[1].username} - Score: ${u[1].score}\n\n`;
              });
              message.channel.send(response.replace('{0}', strBuild));
            }
          })
          .catch(err => {
            console.log('HELLO');
            message.channel.send(err.toString());
          });

        break;

      case 'profile':
        username = args[1];

        dogeService
          .doGet(`${apiPoints.users}`, username)
          .then(result => {
            if (result.data.user) {
              let strBuild = $`> User: ${result.data.user.username} - Score: ${result.data.user.score}`;
              message.channel.send(response.replace('{0}', strBuild));
            }
          })
          .catch(err => {
            message.channel.send(err.toString());
          });
        break;
      case 'create':
        username = args[1];
        let data = JSON.stringify({
          username: username
        });

        dogeService
          .doPost(`${apiPoints.users}`, data)
          .then(result => {
            message.channel.send($`User: <${username}> successfully created.`);
          })
          .catch(err => {
            message.channel.send(err.toString());
          });
        break;

      default:
        message.channel.send(```!users list || !users profile <username> || !users create <username>```);
        break;
    }
  }
};
