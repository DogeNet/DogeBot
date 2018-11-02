import DogeService from '../service';

module.exports = {
  name: 'ping',
  description: 'A ping for a pong',
  execute(message, args) {

    let service = new DogeService();
    service
      .doGet('/todos/1')
      .then(result => {
        console.log(result)
        message.channel.send(JSON.stringify(result.data));
      })
      .catch(err => {
        message.channel.send(err.toString());
      });
  }

};
