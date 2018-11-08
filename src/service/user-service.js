import BaseService from './base-service';
import { apiPoints } from './endpoints';

export default class UserService extends BaseService {
  constructor() {
    super();
  }

  async getUserProfile(username) {
    return await new Promise((resolve, reject) => {
      this.api
        .get(`${apiPoints.users.get}/${username}`)
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
        .get(`${apiPoints.users.get}`)
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
        .post(`${apiPoints.users.post}`, data)
        .then(response => {
          let strBuild = `> User: <${username}> successfully created.`;
          resolve(strBuild);
        })
        .catch(error => reject(error));
    });
  }

  async updateUserProfile(username, score){
    let data = JSON.stringify({
      score: score
    })
    return await new Promise((resolve, reject) => {
      this.api
        .patch(`${(apiPoints.users.patch).replace('{0}', username)}`, data)
        .then(response => {
          let strBuild = `> User: <${username}> successfully updated.`;
          resolve(strBuild);
        })
        .catch(error => reject(error));
    });
  }
}
