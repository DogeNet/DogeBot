import BaseService from './base-service';
import { apiPoints } from './endpoints';

export default class UserService extends BaseService {
  constructor() {
    super();
  }

  async getUserProfile(username) {
    return await new Promise((resolve, reject) => {
      this.api
        .get(`${apiPoints.users}/${username}`)
        .then(response => {
          if (response.data.user) {
            let strBuild = `> User: ${response.data.user.username} - Score: ${response.data.user.score}`;
            resolve(strBuild);
          }
        })
        .catch(error => reject(error));
    });
  }

  async getUserList() {
    return await new Promise((resolve, reject) => {
      this.api
        .get(`${apiPoints.users}`)
        .then(response => {
          let strBuild = '';
          if (response.data.users) {
            let userArr = Object.entries(response.data.users);
            userArr.forEach(u => {
              strBuild += `> User: ${u[1].username} - Score: ${u[1].score}\n\n`;
            });
            resolve(strBuild);
          }
        })
        .catch(error => reject(error));
    });
  }

  async createUserProfile(username) {
    let data = JSON.stringify({
      username: username
    });
    return await new Promise((resolve, reject) => {
      this.api
        .post(`${apiPoints.users}`, data)
        .then(response => {
          let strBuild = `> User: <${username}> successfully created.`;
          resolve(strBuild);
        })
        .catch(error => reject(error));
    });
  }
}
