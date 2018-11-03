import { apiPoints } from '../service/endpoints';

module.exports = {
  name: 'users',
  description: 'Returns the server members',
  execute(message, args, dogeService) {
    let username = '';
    if (args.length > 0) {
      username = '/' + args[0];
    } else if (args.length < 2) {
      message.channel.send('Too many users requested, please only request one username.');
    }
    dogeService
      .doGet(apiPoints.users.get + username)
      .then(result => {
        let response = '';

        if (result.data.users) {
          let userArr = Object.entries(result.data.users);
          userArr.forEach(u => {
            response += u[1].username + ': ' + u[1].score + '\n\n';
          });
        } else {
          response += result.data.user.username + ': ' + result.data.user.score;
        }
        message.channel.send(response);
      })
      .catch(err => {
        message.channel.send(err.toString());
      });
  }
};
