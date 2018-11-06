import BaseService from './service-base';
import { apiPoints } from './endpoints';

export default class UserService extends BaseService {
  getUserList = async () => {
    return await this.doGet(apiPoints.users)
      .then(result => {
        let strBuild = '';
        if (result.data.users) {
          let userArr = Object.entries(result.data.users);
          userArr.forEach(u => {
            strBuild += `> User: ${u[1].username} - Score: ${u[1].score}\n\n`;
          });
          return strBuild;
        }
      })
      .catch(err => {
        return err.toString();
      });
  };

  getUserProfile = async username => {
    return await this.doGet(apiPoints.users, username)
      .then(result => {
        if (result.data.user) {
          let strBuild = `> User: ${result.data.user.username} - Score: ${result.data.user.score}`;
          return strBuild;
        }
      })
      .catch(err => {
        return err.toString();
      });
  };

  createUserProfile = async username => {
    let data = JSON.stringify({
      username: username
    });
    return await this.doPost(`${apiPoints.users}`, data)
      .then(result => {
        let strBuild = `> User: <${username}> successfully created.`;
        return strBuild;
      })
      .catch(err => {
        response = err.toString();
      });
  };
}
